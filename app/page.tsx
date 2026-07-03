import Image from "next/image";
import ContactForm from "./components/ContactForm";

// プロダクトが増えたらここに1行追加するだけで下の流れ・一覧に自動で乗る
const APP_SCREENSHOTS = [
  { src: "/ishigakipay-screen.png", alt: "IshigakiPay" },
  { src: "/bluereel-real-1.png", alt: "Blue Reel" },
  { src: "/ekichousei-screen.png", alt: "駅調整" },
  { src: "/ishigakidata-screen.png", alt: "石垣市データブック" },
];

const MINI_PHONE_TILTS = [
  "-rotate-6 translate-y-3",
  "rotate-3 -translate-y-2",
  "rotate-0 translate-y-1",
];

function MiniPhone({ src, alt, tilt = "", width = 130 }: { src: string; alt: string; tilt?: string; width?: number }) {
  return (
    <div
      className={`relative shrink-0 rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-white/10 ${tilt}`}
      style={{ width, aspectRatio: "9/19.5", background: "#1a1a1a", padding: Math.round(width * 0.06) }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-b-xl z-10"
        style={{ width: width * 0.38, height: width * 0.12 }}
      />
      <div className="relative h-full w-full rounded-[20px] overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover object-top" />
      </div>
    </div>
  );
}

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

// ループの折り返し（1周分の幅）が画面幅より狭いと、-50%移動時に右側が空白になる
// （大画面で「右半分だけ流れてない」ように見える）ため、十分な回数だけ複製して幅を確保する
const MARQUEE_REPEAT = 10;

function AppMarqueeRow({ reverse = false }: { reverse?: boolean }) {
  // 同じ並びをN連結したものを2連結して -50% でループさせるので、継ぎ目が見えない
  const half = Array.from({ length: MARQUEE_REPEAT }, () => APP_SCREENSHOTS).flat();
  const items = [...half, ...half];
  return (
    <div className={`flex w-max gap-6 ${reverse ? "marquee-row marquee-row--reverse" : "marquee-row"}`}>
      {items.map((app, i) => (
        <MiniPhone key={`${app.src}-${i}`} src={app.src} alt={app.alt} tilt={MINI_PHONE_TILTS[i % MINI_PHONE_TILTS.length]} />
      ))}
    </div>
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
      <section className="relative pt-28 pb-0 overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <Image src="/hero-bg.png" alt="" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              小さなうれしいを、<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">
                プロダクトに。
              </span>
            </h1>
          </div>
        </div>
        {/* App screenshots — 増え続けるプロダクト群を、特定の1つに固定せず流れで見せる */}
        <div className="relative space-y-6 pb-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <AppMarqueeRow />
          <AppMarqueeRow reverse />
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-6 bg-slate-950">
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
