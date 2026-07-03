"use client";

import { useRef } from "react";
import { motion, MotionConfig, useMotionValue, useSpring } from "motion/react";

// 各文字を「下からワイプイン」させるキネティックタイポ。文字ごとにoverflow-hiddenの
// マスクを被せ、中のmotion.spanだけを動かすことでマスク効果を出す。
function KineticChars({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const chars = Array.from(text);
  return (
    <span aria-label={text}>
      {chars.map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: startDelay + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// プロダクト群のアクセントカラー(amber/sky/emerald/rose)をそのまま背景の浮遊ブロブに使い、
// Hero単体で完結させずProductsセクションと視覚的に地続きにする
const BLOBS = [
  { color: "bg-amber-300", size: 460, top: "2%", left: "-4%", duration: 15, delay: 0 },
  { color: "bg-sky-300", size: 380, top: "42%", left: "82%", duration: 19, delay: -4 },
  { color: "bg-emerald-300", size: 320, top: "66%", left: "6%", duration: 17, delay: -9 },
  { color: "bg-rose-300", size: 360, top: "0%", left: "62%", duration: 21, delay: -13 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 50);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 50);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#faf9f5] pt-24"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {BLOBS.map((b, i) => (
            <div
              key={i}
              className="hero-blob-drift absolute"
              style={{
                top: b.top,
                left: b.left,
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
              }}
            >
              <motion.div
                className={`rounded-full ${b.color} opacity-40 blur-3xl`}
                style={{ width: b.size, height: b.size, x: sx, y: sy }}
              />
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <h1
            className="font-bold leading-[0.95] tracking-tight text-[#141414]"
            style={{ fontSize: "clamp(2.75rem, 9vw, 6.5rem)" }}
          >
            <KineticChars text="小さなうれしいを、" />
            <br />
            <motion.span
              className="kinetic-gradient-text inline-block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              プロダクトに。
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-8 max-w-md text-base leading-relaxed text-gray-500 md:text-lg"
          >
            沖縄・石垣島発。日常のちいさなうれしさを増やすプロダクトを、企画から開発まで一気通貫でつくっています。
          </motion.p>

          <motion.a
            href="#products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="mt-14 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-gray-900"
          >
            Products
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </motion.svg>
          </motion.a>
        </div>
      </section>
    </MotionConfig>
  );
}
