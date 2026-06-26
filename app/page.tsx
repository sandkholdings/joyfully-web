import Image from "next/image";
import ContactForm from "./components/ContactForm";

function AppStoreBadge({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {/* Apple official App Store badge */}
      <img
        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ja-jp?size=250x83"
        alt="Download on the App Store"
        height={40}
        style={{ height: 40, width: "auto" }}
      />
    </a>
  );
}

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto" style={{ width: 260 }}>
      {/* Phone frame */}
      <div className="relative rounded-[44px] overflow-hidden shadow-2xl ring-1 ring-white/10"
           style={{ background: "#1a1a1a", padding: "12px 12px", aspectRatio: "9/19.5" }}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="relative h-full w-full rounded-[34px] overflow-hidden">
          <Image src={src} alt={alt} fill className="object-cover object-top" />
        </div>
      </div>
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
              人が使いたくなる<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">
                アプリをつくる。
              </span>
            </h1>
          </div>
          {/* App screenshots */}
          <div className="flex justify-center gap-8 md:gap-16 items-end">
            <div className="translate-y-6">
              <PhoneMockup src="/ishigakipay-screen.png" alt="IshigakiPay app" />
            </div>
            <div className="translate-y-6">
              <PhoneMockup src="/bluereel-real-1.png" alt="Blue Reel app" />
            </div>
          </div>
        </div>
      </section>

      {/* IshigakiPay */}
      <section className="py-28 px-6 bg-gradient-to-br from-amber-950 via-orange-950 to-slate-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <PhoneMockup src="/ishigakipay-screen.png" alt="IshigakiPay" />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-amber-400 text-xl font-bold mb-3">IshigakiPay</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              "ありがとう" を、<br />島で使えるポイントに。
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              メンバーへの感謝を、石垣島の地元店舗で使えるポイントとして贈れるサービス。
              従業員特典・地域メンバー特典など、組織の「ありがとう」を形にします。
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://ishigakipay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                サービスを見る
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blue Reel */}
      <section className="py-28 px-6 bg-gradient-to-br from-slate-950 via-sky-950 to-blue-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-sky-400 text-xl font-bold mb-3">Blue Reel</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              30秒の動画で、<br />人柄から出会う。
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              リゾート接客の求人マッチングアプリ。
              履歴書ではなく30秒の動画で応募。
              人柄が伝わるから、いい出会いが生まれる。
            </p>
            <div className="flex flex-wrap gap-4">
              <AppStoreBadge href="https://bluereel.app" />
              <a
                href="https://bluereel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors py-3"
              >
                詳しく見る
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <PhoneMockup src="/bluereel-real-1.png" alt="Blue Reel" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">お問い合わせ</h2>
          <p className="text-gray-500 mb-10">ご質問・ご相談はこちらからお気軽にどうぞ。</p>
          <ContactForm />
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

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold text-white">Joyfully</span>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Joyfully. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
