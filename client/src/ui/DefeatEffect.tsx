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

/**
 * 撃破時の演出（GSAP）。リング拡散 + スプライト縮小・回転・フェード。
 * z-index を最前面にし、context.revert で初動が潰れないよう timeline を明示的に管理。
 */
export function DefeatEffect({ fxKey, x, y, src, onRemove }: Props): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const onRemoveRef = useRef(onRemove);
  onRemoveRef.current = onRemove;

  useEffect(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    const ring = ringRef.current;
    if (!root || !img || !ring) return;

    let tl: gsap.core.Timeline | null = null;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      onRemoveRef.current(fxKey);
    };

    const raf = requestAnimationFrame(() => {
      gsap.set([img, ring], { transformOrigin: "50% 50%" });
      gsap.set(img, { scale: 1, opacity: 1, rotation: 0, clearProps: "filter" });
      gsap.set(ring, { scale: 1, opacity: 0.95 });

      tl = gsap.timeline({
        onComplete: finish,
        defaults: { overwrite: "auto" },
      });

      tl.to(img, { scale: 1.2, duration: 0.12, ease: "power2.out" })
        .to(
          img,
          {
            scale: 0.05,
            opacity: 0,
            rotation: 40,
            duration: 0.5,
            ease: "power3.in",
          },
          "<0.03",
        )
        .to(
          ring,
          {
            scale: 3,
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          0,
        );
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
      <div
        ref={ringRef}
        class="absolute rounded-full border-2 border-amber-300 w-16 h-16 shadow-[0_0_24px_rgba(251,191,36,0.95)]"
      />
      <img
        ref={imgRef}
        src={src}
        alt=""
        class="relative h-12 w-auto max-w-[80px] object-contain drop-shadow-lg"
        draggable={false}
      />
    </div>
  );
}
