"use client";

import { useEffect, useState } from "react";
import { MiniPhone } from "./MiniPhone";

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

// MiniPhone(幅130px) + gap-6(24px) の1枚あたりの実測幅
const PHONE_STEP = 130 + 24;
const GROUP_WIDTH = APP_SCREENSHOTS.length * PHONE_STEP;

// SSR/初回描画時点ではウィンドウ幅が分からないため、一般的な画面幅で
// ギャップが出ない値を暫定値にしておく（マウント後に実測値へ補正される）
const SAFE_DEFAULT_REPEAT = 10;

// 1周期の幅は画面幅に応じて変わるため、animation-durationを固定値のままにすると
// 大画面ほど速く・小画面ほど遅く流れて見えてしまう。px/秒の速度を固定し、
// 1周期の実幅から逆算してdurationを決めることで、画面幅によらず体感速度を一定に保つ
const MARQUEE_SPEED_PX_PER_SEC = 29; // 元の実装(924px/32s)相当の速さ
const MARQUEE_SPEED_PX_PER_SEC_REVERSE = 26; // 元の実装(924px/36s)相当の速さ

// ループの折り返し（1周分の幅 = GROUP_WIDTH * repeat）が画面幅より狭いと、
// translateX(-50%) 移動時に右側が空白になる（大画面で「右半分だけ流れてない」
// ように見える不具合）。固定回数だと画面がそれより広いモニタで必ず再発するため、
// 実際のウィンドウ幅から必要な複製回数をその都度計算する（モニタ幅が
// どれだけ大きくても、1周期の幅は常にウィンドウ幅を上回るようにする）。
function repeatForWidth(width: number) {
  return Math.max(SAFE_DEFAULT_REPEAT, Math.ceil(width / GROUP_WIDTH) + 2);
}

function useMarqueeRepeat() {
  const [repeat, setRepeat] = useState(SAFE_DEFAULT_REPEAT);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const update = () => setRepeat(repeatForWidth(window.innerWidth));
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(update, 150);
    };
    update();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return repeat;
}

export function AppMarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const repeat = useMarqueeRepeat();
  // 同じ並びをN連結したもの(1周期)をさらに2連結して -50% でループさせるので、継ぎ目が見えない
  const half = Array.from({ length: repeat }, () => APP_SCREENSHOTS).flat();
  const items = [...half, ...half];
  const periodWidth = GROUP_WIDTH * repeat;
  const speed = reverse ? MARQUEE_SPEED_PX_PER_SEC_REVERSE : MARQUEE_SPEED_PX_PER_SEC;
  const duration = periodWidth / speed;
  return (
    <div
      className={`flex w-max gap-6 ${reverse ? "marquee-row marquee-row--reverse" : "marquee-row"}`}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      {items.map((app, i) => (
        <MiniPhone key={`${app.src}-${i}`} src={app.src} alt={app.alt} tilt={MINI_PHONE_TILTS[i % MINI_PHONE_TILTS.length]} />
      ))}
    </div>
  );
}
