# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code) へのガイダンスを提供します。

## 重要なルール
- 回答は常に日本語

## プロジェクト概要

HUGTRIP（ファミリー向けに宿泊施設に特化した検索アプリ）は、Next.js、TypeScript、Biomeを使用して構築されたファミリー向け宿泊施設検索アプリケーションです。

## 技術スタック

- **Next.js 15** - App Routerを使用するReactフレームワーク
- **TypeScript** - 型安全なJavaScript
- **Tailwind CSS 4** - ユーティリティファーストCSSフレームワーク
- **Biome** - 高速なフォーマッター、リンター、インポート整理ツール
- **React 19** - 最新版React
- **Jotai** - アトミック状態管理

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動（Turbopack使用）
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start

# コード品質チェック・フォーマット
npm run lint      # コード品質チェック
npm run format    # フォーマットのみ
npm run check     # チェック＆修正
npm run ci        # CI用チェック（修正なし）
```

## コード品質

このプロジェクトはBiomeを使用しています：
- **フォーマット**: 2スペースインデント、シングルクォート、必要に応じてセミコロン
- **リント**: アクセシビリティ、セキュリティ、パフォーマンスを含む包括的なルール
- **インポート整理**: 自動インポートソート

## プロジェクト構造

- `src/app/` - Next.js App Routerページとレイアウト
- `src/atoms/` - 状態管理用Jotai atoms
- `src/components/` - 再利用可能なReactコンポーネント
- `src/types/` - TypeScript型定義
- `src/` - ソースコードディレクトリ
- `biome.json` - Biome設定
- `tailwind.config.ts` - Tailwind CSS設定
- `next.config.js` - Next.js設定
- `tsconfig.json` - TypeScript設定

## 開発ノート

- Next.js App Router使用（Pages Routerではない）
- `@/*` インポートエイリアスを設定済み
- Turbopackで高速開発ビルドを有効化
- 高いコード品質のためBiome推奨ルールをすべて有効化

## 状態管理

このプロジェクトはJotaiを状態管理に使用：
- グローバルatomsは `src/atoms/index.ts` に定義
- 型定義は `src/types/accommodation.ts` に配置
- `useAtom()` フックでatom値の読み書き
- `useAtomValue()` で読み取り専用アクセス
- `useSetAtom()` で書き込み専用アクセス
- SSRが必要な場合は `src/components/providers.tsx` のJotai Providerを使用可能

## スタイリング

このプロジェクトはTailwind CSS 4を使用：
- グローバルスタイルは `src/app/globals.css` に配置
- 設定は `tailwind.config.ts` で管理
- コンポーネントのスタイリングにはユーティリティクラスを使用
- テーマ用のカスタムCSS変数が利用可能

## 設計思想

###　明確な関心の分離
- 機能別にディレクトリを分割
- 共通コンポーネントと機能固有コンポーネントを明確に区別
- API、UI、ビジネスロジックの責務を分離

###　拡張性重視の構造
- 新機能追加時に既存コードへの影響を最小化
- コンポーネントの再利用性を重視
- チーム開発に適した組織化
- コードサイズよりも可読性を重視

###　命名規則
- コンポーネント名はパスカルケース
- コンポーネント名は{動詞}+{名詞}

## 推奨ディレクトリ構造

```
my-nextjs-project/
├── src/
│   ├── app/                      # App Router - ルーティングとページ
│   │   ├── (auth)/               # ルートグループ - 認証関連
│   │   ├── (dashboard)/          # ルートグループ - ダッシュボード
│   │   ├── products/             # 商品機能
│   │   │   ├── [id]/             # 動的ルート - 詳細ページ
│   │   │   └── _components/      # プライベートフォルダ - 機能固有UI
│   │   ├── blog/                 # ブログ機能
│   │   │   ├── [slug]/           # 記事詳細
│   │   │   └── _components/      # ブログ専用コンポーネント
│   │   └── api/                  # API Routes
│   │
│   ├── components/               # 共通コンポーネント
│   │   ├── ui/                   # 基本UIコンポーネント
│   │   └── features/             # 機能横断コンポーネント
│   │
│   ├── lib/                      # 設定・ユーティリティ
│   ├── hooks/                    # カスタムReactフック
│   ├── stores/                   # 状態管理
│   ├── types/                    # TypeScript型定義
│   └── utils/                    # ヘルパー関数
│
├── public/                       # 静的ファイル
└── 設定ファイル群                  # next.config.js, tsconfig.json等
```

## App Router 概念

### ファイル規約
| ファイル | 用途 | 例 |
|---------|------|---|
| `layout.tsx` | 共通レイアウト | ヘッダー・サイドバー |
| `page.tsx` | ページコンテンツ | メインコンテンツ |
| `loading.tsx` | ローディング状態 | スケルトンUI |
| `error.tsx` | エラー状態 | エラーメッセージ |
| `not-found.tsx` | 404状態 | 見つからない場合 |

### 特殊フォルダ
- **`(groupName)`**: ルートグループ（URLに影響なし）
- **`_folderName`**: プライベートフォルダ（ルーティング対象外）
- **`[param]`**: 動的ルート（URLパラメータ）

## コンポーネント設計パターン

### 階層化された構造
```typescript
// 基本UIコンポーネント
components/ui/Button/Button.tsx
components/ui/Card/Card.tsx

// 機能固有コンポーネント
app/products/_components/ProductCard.tsx
app/blog/_components/ArticleCard.tsx

// 機能横断コンポーネント
components/features/auth/LoginForm.tsx
```

### インデックスファイルの活用
```typescript
// components/ui/index.ts
export * from './Button'
export * from './Card'
export * from './Modal'

// 使用時
import { Button, Card, Modal } from '@/components/ui'
```

## API設計パターン

### RESTful API Routes
```typescript
// 一覧・作成
/api/products/route.ts
  GET  /api/products      # 一覧取得
  POST /api/products      # 新規作成

// 詳細・更新・削除
/api/products/[id]/route.ts  
  GET    /api/products/123  # 詳細取得
  PUT    /api/products/123  # 更新
  DELETE /api/products/123  # 削除
```

### API Client パターン
```typescript
// lib/api/products.ts
export async function getProducts(params: GetProductsParams) {
  const response = await fetch(`/api/products?${new URLSearchParams(params)}`)
  return response.json()
}

// hooks/useProducts.ts
export function useProducts(params: GetProductsParams) {
  // データ取得ロジック + 状態管理
}
```

## カスタムフック設計

### 主要パターン
```typescript
// データ取得
useProducts(filters)    // 商品一覧取得
useProduct(id)         // 商品詳細取得

// UI状態管理
usePagination()        // ページネーション
useSearch()           // 検索機能
useModal()            // モーダル制御

// ビジネスロジック
useAuth()             // 認証状態
useCart()             // カート管理
```

## 📝 型安全性の確保
### ブレンデット型
```typescript
type Branded<T, Brand> = T & { readonly __brand: Brand };
```

### TypeScript + Zod
```typescript
// 型定義
types/product.ts
export interface Product {
  id: string
  name: string
  price: number
  // ...
}

// バリデーション
lib/validations/product.ts
export const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  // ...
})

// 型推論
export type ProductInput = z.infer<typeof productSchema>
```

## パフォーマンス最適化

### 重要な手法
- Next.js Image コンポーネント**: 自動最適化
- 動的インポート**: コード分割
- Server Components**: サーバーサイドレンダリング
- Suspense境界**: ローディング状態の最適化

```typescript
// 動的インポート例
const Modal = lazy(() => import('./Modal'))

// Suspenseでラップ
<Suspense fallback={<Loading />}>
  <Modal />
</Suspense>
```

## SEO最適化

### メタデータとOGP
```typescript
// app/products/[id]/page.tsx
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id)
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      images: [product.imageUrl],
    },
  }
}
```

### 構造化データ
```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  // ...
}
```

## 避けるべきアンチパターン

### やってはいけないこと
- 深すぎるネスト: `components/features/dashboard/widgets/weather/current/small/`
- 巨大なutilsファイル: 2000行の`utils.ts`
- すべてをappディレクトリに: 適切な分離を無視
- コンポーネントの爆発: 200+のファイルを未分類

### 推奨事項
- 平坦な構造: 最大3-4階層まで
- 機能別グループ化: 関連ファイルをまとめる
- 一貫した命名: プロジェクト全体で統一
- Co-location: 関連するものは近くに配置

## Semantic Commit Messages

コミットメッセージを一貫性のある形式で記述するためのルール。メッセージは常に日本語で記述してください。

### フォーマット
```
<type>(<scope>): <subject>
```

- `<scope>` はオプション
- `<subject>` は現在形で記述

### タイプ一覧
- **✨ feat**: 新機能追加（ユーザー向け）
- **🐛 fix**: バグ修正（ユーザー向け）
- **📚 docs**: ドキュメント変更
- **💄 style**: フォーマット、セミコロン等（機能に影響なし）
- **♻️ refactor**: 機能に影響しないコードの改善（変数名変更等）
- **🧪 test**: テスト追加・修正（機能に影響なし）
- **🔧 chore**: ビルドタスク更新等（機能に影響なし）

### 例
```bash
feat: add hat wobble
fix(auth): resolve login timeout issue
docs: update API documentation
style: fix missing semicolons
refactor: rename getUserData to fetchUserProfile
test: add unit tests for user service
chore: update webpack config
```
