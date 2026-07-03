import Image from "next/image";

export function MiniPhone({
  src,
  alt,
  tilt = "",
  width = 130,
}: {
  src: string;
  alt: string;
  tilt?: string;
  width?: number;
}) {
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
