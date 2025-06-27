export default function About() {
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About HUGTRIP</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground mb-4">
            HUGTRIPは、ファミリー向けに特化した宿泊施設検索アプリケーションです。
          </p>
          <p className="mb-4">
            家族での旅行をより楽しく、より便利にするために、
            家族に優しい宿泊施設を簡単に見つけることができます。
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">主な機能</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>ファミリー向け宿泊施設の検索</li>
            <li>子供の年齢に応じた施設フィルタリング</li>
            <li>アクセシビリティ情報の提供</li>
            <li>口コミ・評価システム</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
