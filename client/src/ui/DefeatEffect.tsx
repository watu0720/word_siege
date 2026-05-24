import type { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import gsap from "gsap";

type Props = {
  fxKey: string;
  x: number;
  y: number;
  src: string;
  onRemove: (key: string) => void;
};

const SHARD_COUNT = 14;

/**
 * 撃破時の演出（GSAP）。二重リング + 白フラッシュ + 破片飛散 + スプライト収束。
 */
export function DefeatEffect({ fxKey, x, y, src, onRemove }: Props): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const onRemoveRef = useRef(onRemove);
  onRemoveRef.current = onRemove;

  useEffect(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    const ring = ringRef.current;
    const ring2 = ring2Ref.current;
    const flash = flashRef.current;
    if (!root || !img || !ring || !ring2 || !flash) return;

    let tl: gsap.core.Timeline | null = null;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      onRemoveRef.current(fxKey);
    };

    const raf = requestAnimationFrame(() => {
      const shards = root.querySelectorAll<HTMLElement>(".defeat-shard");
      gsap.set([img, ring, ring2, flash], { transformOrigin: "50% 50%" });
      gsap.set(img, { scale: 1, opacity: 1, rotation: 0, clearProps: "filter" });
      gsap.set(ring, { scale: 0.4, opacity: 0.95 });
      gsap.set(ring2, { scale: 0.55, opacity: 0.75 });
      gsap.set(flash, { scale: 0.2, opacity: 0 });
      gsap.set(shards, { x: 0, y: 0, opacity: 0, rotation: 0, scaleX: 1, scaleY: 1 });

      const timeline = gsap.timeline({
        onComplete: finish,
        defaults: { overwrite: "auto" },
      });
      tl = timeline;

      timeline.to(flash, { opacity: 0.85, scale: 1.35, duration: 0.07, ease: "power2.out" })
        .to(flash, { opacity: 0, scale: 2.2, duration: 0.22, ease: "power2.in" }, "<0.02")
        .to(
          ring2,
          {
            scale: 4.2,
            opacity: 0,
            rotation: 55,
            duration: 0.62,
            ease: "power2.out",
          },
          0,
        )
        .to(
          ring,
          {
            scale: 3.4,
            opacity: 0,
            rotation: -35,
            duration: 0.58,
            ease: "power2.out",
          },
          0.02,
        )
        .to(
          img,
          { scale: 1.18, filter: "brightness(1.35) saturate(1.2)", duration: 0.1, ease: "power2.out" },
          0,
        )
        .to(
          img,
          {
            scale: 0.02,
            opacity: 0,
            rotation: 48,
            filter: "brightness(0.4) blur(1px)",
            duration: 0.52,
            ease: "power3.in",
          },
          0.08,
        );

      shards.forEach((sh, i) => {
        const base = (i / SHARD_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.55;
        const dist = 52 + Math.random() * 56;
        const mid = 18 + Math.random() * 14;
        timeline.to(
          sh,
          {
            opacity: 1,
            duration: 0.05,
            x: Math.cos(base) * mid,
            y: Math.sin(base) * mid,
            rotation: (Math.random() - 0.5) * 40,
            ease: "power1.out",
          },
          0.02 + i * 0.008,
        ).to(
          sh,
          {
            x: Math.cos(base) * dist,
            y: Math.sin(base) * dist,
            opacity: 0,
            rotation: `+=${140 + Math.random() * 100}`,
            scaleX: 0.35,
            scaleY: 1.4,
            duration: 0.48,
            ease: "power2.out",
          },
          0.07 + i * 0.006,
        );
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      if (tl) tl.kill();
      if (!done) finish();
    };
  }, [fxKey]);

  return (
    <div
      ref={rootRef}
      class="absolute pointer-events-none flex items-center justify-center z-[60]"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      aria-hidden
    >
      {Array.from({ length: SHARD_COUNT }, (_, i) => (
        <div
          key={i}
          class="defeat-shard absolute left-1/2 top-1/2 w-1.5 h-3.5 rounded-sm -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_rgba(251,191,36,0.9)]"
          style={{
            background: i % 3 === 0 ? "linear-gradient(180deg,#fff7ed,#fbbf24)" : i % 3 === 1 ? "linear-gradient(180deg,#fce7f3,#f472b6)" : "linear-gradient(180deg,#e0f2fe,#38bdf8)",
          }}
        />
      ))}
      <div
        ref={ring2Ref}
        class="absolute rounded-full border-2 border-fuchsia-400/90 w-[4.5rem] h-[4.5rem] shadow-[0_0_28px_rgba(232,121,249,0.75)]"
      />
      <div
        ref={ringRef}
        class="absolute rounded-full border-2 border-amber-300 w-16 h-16 shadow-[0_0_24px_rgba(251,191,36,0.95)]"
      />
      <div
        ref={flashRef}
        class="absolute rounded-full w-24 h-24 bg-white mix-blend-screen pointer-events-none"
      />
      <img
        ref={imgRef}
        src={src}
        alt=""
        class="relative h-12 w-auto max-w-[80px] object-contain drop-shadow-lg z-[1]"
        draggable={false}
      />
    </div>
  );
}
