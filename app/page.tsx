import ContactForm from "./components/ContactForm";
import { MiniPhone } from "./components/MiniPhone";
import { Hero } from "./components/Hero";

type Product = {
  name: string;
  accent: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
  appStoreHref?: string;
};

const PRODUCTS: Product[] = [
  {
    name: "IshigakiPay",
    accent: "text-amber-400",
    tagline: "\"ありがとう\"を、島で使えるポイントに。",
    description: "メンバーへの感謝を、石垣島の地元店舗で使えるポイントとして贈れるサービス。",
    image: "/ishigakipay-screen.png",
    href: "https://ishigakipay.com",
    appStoreHref: "https://apps.apple.com/jp/app/ishigaki-pay/id6783578773",
  },
  {
    name: "Blue Reel",
    accent: "text-sky-400",
    tagline: "30秒の動画で、人柄から出会う。",
    description: "履歴書ではなく30秒の動画で応募する、リゾート接客の求人マッチングアプリ。",
    image: "/bluereel-real-1.png",
    href: "https://bluereel.app",
  },
  {
    name: "駅調整",
    accent: "text-emerald-400",
    tagline: "飲み会、どこ集合にする？",
    description: "参加者の最寄り駅を入れるだけで、ちょうどいい集合駅を提案する無料サービス。",
    image: "/ekichousei-screen.png",
    href: "https://ekichousei.com",
  },
  {
    name: "石垣市データブック",
    accent: "text-rose-400",
    tagline: "石垣島の統計を、ひと目で。",
    description: "人口・観光・財政・産業構造など公的統計をインタラクティブなグラフで再構成。",
    image: "/ishigakidata-screen.png",
    href: "https://ishigaki-data.com",
  },
];

function ProductCard({ p }: { p: Product }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] p-6 transition-colors"
    >
      <MiniPhone src={p.image} alt={p.name} width={90} />
      <div className="min-w-0 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <h3 className={`text-sm font-bold ${p.accent}`}>{p.name}</h3>
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="shrink-0 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <p className="text-white font-semibold mt-1 leading-snug">{p.tagline}</p>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">{p.description}</p>
        {p.appStoreHref && <span className="text-xs text-slate-500 mt-3">App Storeでも配信中</span>}
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-gray-900">Joyfully</span>
        </div>
      </nav>

      {/* Hero */}
      <Hero />

      {/* Products */}
      <section id="products" className="py-20 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-8">Products</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">会社概要</h2>
          <dl className="divide-y divide-gray-100">
            {[
              { dt: "社名", dd: "Joyfully株式会社" },
              { dt: "代表取締役", dd: "瀬沼 健吾" },
              { dt: "設立", dd: "2021年2月" },
              { dt: "資本金", dd: "650万円（資本準備金等含む）" },
              { dt: "所在地", dd: "沖縄県石垣市字登野城510番地" },
              { dt: "事業内容", dd: "モバイルアプリの企画・開発・運営" },
            ].map(({ dt, dd }) => (
              <div key={dt} className="py-5 grid grid-cols-3 gap-4">
                <dt className="text-sm font-semibold text-gray-500">{dt}</dt>
                <dd className="text-sm text-gray-900 col-span-2 whitespace-pre-line">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">お問い合わせ</h2>
          <p className="text-gray-500 mb-10">ご質問・ご相談はこちらからお気軽にどうぞ。</p>
          <div className="max-w-xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold text-white">Joyfully</span>
          <a href="https://sandkholdings.co.jp/" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            S&amp;K Holdings グループ
          </a>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Joyfully. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
