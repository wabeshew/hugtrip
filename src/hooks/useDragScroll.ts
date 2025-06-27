import { useCallback, useRef } from 'react'

interface UseDragScrollOptions {
  direction?: 'horizontal' | 'vertical' | 'both'
  inertia?: boolean
  friction?: number
}

/**
 * ScrollAreaでドラッグスクロールと慣性スクロールを実現するカスタムフック
 * 
 * @param options - 設定オプション
 * @param options.direction - スクロール方向 ('horizontal' | 'vertical' | 'both')
 * @param options.inertia - 慣性スクロールの有効/無効
 * @param options.friction - 慣性の摩擦係数 (0.0-1.0、小さいほど早く停止)
 */
export function useDragScroll({
  direction = 'horizontal',
  inertia = true,
  friction = 0.95,
}: UseDragScrollOptions = {}) {
  // ScrollAreaコンポーネントへの参照
  const scrollRef = useRef<HTMLDivElement>(null)
  
  // ドラッグ状態の管理
  const isDragging = useRef(false)
  
  // ドラッグ開始時の座標とスクロール位置
  const startX = useRef(0)
  const startY = useRef(0)
  const scrollLeft = useRef(0)
  const scrollTop = useRef(0)
  
  // 慣性スクロール用の速度計算
  const velocityX = useRef(0)
  const velocityY = useRef(0)
  const lastX = useRef(0)
  const lastY = useRef(0)
  const lastTime = useRef(0)
  
  // アニメーションフレームID（慣性スクロール用）
  const animationId = useRef<number | null>(null)

  /**
   * Radix UI ScrollAreaの実際のスクロールコンテナ（viewport）を取得
   * ScrollAreaは複数のDOM要素で構成されており、実際にスクロールするのはviewport要素
   */
  const getTargetElement = useCallback(() => {
    return scrollRef.current?.querySelector(
      '[data-radix-scroll-area-viewport]',
    ) as HTMLElement | null
  }, [])

  /**
   * 慣性スクロールアニメーションを開始
   * ドラッグ終了時の速度を元に、摩擦を適用しながら徐々に減速するアニメーション
   */
  const startInertia = useCallback(() => {
    // 慣性が無効、または速度が十分小さい場合は実行しない
    if (
      !inertia ||
      (Math.abs(velocityX.current) < 0.1 && Math.abs(velocityY.current) < 0.1)
    )
      return

    const animate = () => {
      const viewport = getTargetElement()
      if (!viewport) return

      // 速度に基づいてスクロール位置を更新
      if (direction === 'horizontal' || direction === 'both') {
        viewport.scrollLeft += velocityX.current
        velocityX.current *= friction // 摩擦により速度を減衰
      }
      if (direction === 'vertical' || direction === 'both') {
        viewport.scrollTop += velocityY.current
        velocityY.current *= friction // 摩擦により速度を減衰
      }

      // 速度が十分小さくなるまでアニメーションを継続
      if (
        Math.abs(velocityX.current) > 0.1 ||
        Math.abs(velocityY.current) > 0.1
      ) {
        animationId.current = requestAnimationFrame(animate)
      }
    }

    animationId.current = requestAnimationFrame(animate)
  }, [direction, friction, inertia, getTargetElement])

  /**
   * マウス移動時の処理
   * ドラッグ中のスクロール実行と慣性用の速度計算
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return

      const viewport = getTargetElement()
      if (!viewport) return

      e.preventDefault()

      const currentTime = Date.now()
      const x = e.pageX
      const y = e.pageY
      
      // ドラッグ開始点からの移動距離
      const walkX = x - startX.current
      const walkY = y - startY.current

      // 水平方向のスクロール処理
      if (direction === 'horizontal' || direction === 'both') {
        // スクロール位置を更新（初期位置 - 移動距離）
        viewport.scrollLeft = scrollLeft.current - walkX

        // 慣性用の速度計算（前回の位置との差分から算出）
        if (inertia && lastTime.current > 0) {
          const deltaTime = currentTime - lastTime.current
          if (deltaTime > 0) {
            // 速度 = 移動距離 / 時間 * 16（60FPS補正）
            velocityX.current = ((lastX.current - x) / deltaTime) * 16
          }
        }
        lastX.current = x
      }

      // 垂直方向のスクロール処理
      if (direction === 'vertical' || direction === 'both') {
        viewport.scrollTop = scrollTop.current - walkY

        if (inertia && lastTime.current > 0) {
          const deltaTime = currentTime - lastTime.current
          if (deltaTime > 0) {
            velocityY.current = ((lastY.current - y) / deltaTime) * 16
          }
        }
        lastY.current = y
      }

      lastTime.current = currentTime
    },
    [direction, inertia, getTargetElement],
  )

  /**
   * マウスボタン離した時の処理
   * ドラッグ終了とイベントリスナーの削除、慣性スクロール開始
   */
  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return

    const viewport = scrollRef.current?.querySelector(
      '[data-radix-scroll-area-viewport]',
    ) as HTMLElement
    if (viewport) {
      isDragging.current = false
      viewport.style.cursor = 'grab' // カーソルを通常状態に戻す
      viewport.style.removeProperty('user-select') // テキスト選択を再有効化
    }

    // documentレベルのイベントリスナーを削除
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    // 慣性スクロールを開始
    if (inertia) {
      startInertia()
    }
  }, [handleMouseMove, inertia, startInertia])

  /**
   * マウスボタン押下時の処理
   * ドラッグ開始の初期化と状態設定
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const viewport = getTargetElement()
      if (!viewport) return

      // 既存の慣性アニメーションを停止
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
        animationId.current = null
      }

      // ドラッグ状態を開始
      isDragging.current = true
      
      // 初期位置とスクロール位置を記録
      startX.current = e.pageX
      startY.current = e.pageY
      scrollLeft.current = viewport.scrollLeft
      scrollTop.current = viewport.scrollTop
      
      // 速度計算用の初期値をリセット
      velocityX.current = 0
      velocityY.current = 0
      lastX.current = e.pageX
      lastY.current = e.pageY
      lastTime.current = Date.now()

      // ドラッグ中のUI状態を設定
      viewport.style.cursor = 'grabbing' // つかんでいる状態のカーソル
      viewport.style.userSelect = 'none' // テキスト選択を無効化

      // documentレベルでマウスイベントを監視（要素外でも動作するため）
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [handleMouseMove, handleMouseUp, getTargetElement],
  )

  // フックの戻り値
  return {
    scrollRef, // ScrollAreaコンポーネントにrefとして渡す
    onMouseDown: handleMouseDown, // マウスダウンイベントハンドラー
    style: { cursor: 'grab' }, // 通常時のカーソルスタイル
  }
}
