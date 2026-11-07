import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Masked word-by-word heading reveal. Use "\n" for line breaks. */
export function SplitHeading({ text, className = "", as: Tag = "h2", immediate = false, delay = 0 }: {
  text: string; className?: string; as?: "h1" | "h2" | "h3"; immediate?: boolean; delay?: number;
}) {
  const lines = text.split("\n");
  let i = 0;
  const anim = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px" } };
  return (
    <Tag className={className} aria-label={text.replace(/\n/g, " ")}>
      <motion.span initial="hide" {...anim} className="block" aria-hidden>
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((w, wi) => {
              const idx = i++;
              return (
                <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={{ hide: { y: "110%" }, show: { y: "0%", transition: { duration: 1, delay: delay + idx * 0.08, ease } } }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className}`}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export function Cursor() {
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setHover(!!(e.target as HTMLElement).closest("a,button,[data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-primary mix-blend-difference"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: hover ? 56 : 14, height: hover ? 56 : 14, backgroundColor: hover ? "transparent" : "var(--primary)" }}
      transition={{ duration: 0.25 }}
    />
  );
}

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1400); return () => clearTimeout(t); }, []);
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background"
      initial={{ y: 0 }}
      animate={done ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease }}
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      <div className="overflow-hidden">
        <motion.p
          className="font-display text-2xl font-bold uppercase tracking-tight md:text-4xl"
          initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease }}
        >
          Ameer Taha Khurram<span className="text-primary">.</span>
        </motion.p>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 h-px w-40 -translate-x-1/2 origin-left bg-primary"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease }}
      />
    </motion.div>
  );
}
