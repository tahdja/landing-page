import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Play, Pause, Maximize, ArrowRight } from "lucide-react";
import { Magnetic, Reveal, SplitHeading, ease } from "./motion-kit";
import { images, services, SHOWREEL_URL } from "@/lib/portfolio-data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function LimeButton({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) {
  const cls = "inline-flex items-center gap-2 bg-primary px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-shadow hover:glow-lime focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
  return <Magnetic>{href ? <a href={href} className={cls}>{children}</a> : <button onClick={onClick} className={cls}>{children}</button>}</Magnetic>;
}

export function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Magnetic>
      <a href={href} className="inline-flex items-center gap-2 border border-border-strong px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary">
        {children}
      </a>
    </Magnetic>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : "bg-transparent"}`}>
        <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10" aria-label="Main">
          <a href="#home" className="font-display text-sm font-bold uppercase tracking-tight">Ameer Taha Khurram<span className="text-primary">.</span></a>
          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block"><LimeButton href="#contact">Let's create <ArrowUpRight className="size-4" /></LimeButton></div>
          <button className="md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col bg-background px-6 py-6"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold uppercase">ATK<span className="text-primary">.</span></span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}><X /></button>
            </div>
            <ul className="mt-16 space-y-2">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.07, ease }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="display-lg block hover:text-primary">{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto"><LimeButton href="#contact" onClick={() => setOpen(false)}>Let's create <ArrowUpRight className="size-4" /></LimeButton></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mx = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const px = useTransform(mx, (v) => v * -20);
  const py = useTransform(my, (v) => v * -20);
  const fx = useTransform(mx, (v) => v * 40);
  const fy = useTransform(my, (v) => v * 40);

  return (
    <section
      id="home" ref={ref}
      className="relative flex min-h-screen items-end overflow-hidden pb-16 pt-28 md:items-center"
      onMouseMove={(e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); }}
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <motion.img
          src={images.hero} alt="Floating products in a dark cinematic environment lit with lime light"
          width={1920} height={1088} fetchPriority="high"
          className="h-[110%] w-full scale-110 object-cover object-[70%_center] opacity-80"
          style={{ x: px, y: py }}
          initial={{ scale: 1.25, opacity: 0 }} animate={{ scale: 1.1, opacity: 0.8 }} transition={{ duration: 2.4, delay: 1.2, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </motion.div>
      <motion.div aria-hidden className="ambient-lime absolute right-[15%] top-[30%] -z-10 size-[40vw] rounded-full blur-3xl" style={{ x: fx, y: fy }} />
      <motion.div aria-hidden style={{ x: fx, y: fy }} className="absolute right-[8%] top-[22%] hidden size-3 bg-primary md:block" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
      <motion.div aria-hidden style={{ x: px, y: py }} className="absolute bottom-[30%] right-[40%] hidden size-20 rounded-full border border-primary/40 md:block" />

      <motion.div style={{ opacity: fade }} className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <motion.p className="label-caps mb-8 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <span className="h-px w-10 bg-primary" /> AI Creative Production / 2026
        </motion.p>
        <SplitHeading as="h1" immediate delay={1.4} text={"We make\nbrands\nimpossible to ignore."} className="display-xl max-w-5xl" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.9, ease }} className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg text-muted-foreground">
            From AI UGC to cinematic commercials, I create next-generation advertising visuals built to make products stand out.
          </p>
          <div className="flex flex-wrap gap-4">
            <LimeButton href="#work">Explore my work <ArrowUpRight className="size-4" /></LimeButton>
            <GhostButton href="#contact">Let's talk</GhostButton>
          </div>
        </motion.div>
      </motion.div>

      <a href="#showreel" aria-label="Scroll down" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="label-caps">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-border-strong">
          <motion.span className="absolute left-0 top-0 h-1/2 w-full bg-primary" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </a>
    </section>
  );
}

export function Marquee() {
  const items = services.map((s) => s.title);
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-6" aria-hidden>
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-3xl font-bold uppercase text-subtle md:text-5xl">
            {t} <span className="size-2 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Showreel() {
  const vid = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasVideo = !!SHOWREEL_URL;
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

  const toggle = () => {
    const v = vid.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section id="showreel" className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
      <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <p className="label-caps mb-6">Showreel</p>
          <SplitHeading text={"Visuals that make\npeople stop."} className="display-lg" />
        </div>
        <Reveal className="md:justify-self-end md:text-right">
          <h3 className="font-display text-xl font-bold uppercase">From concept to commercial.</h3>
          <p className="mt-3 max-w-md text-muted-foreground">Explore a collection of AI-powered advertising visuals, product films, UGC concepts, and creative experiments.</p>
        </Reveal>
      </div>
      <motion.div ref={wrap} style={{ scale }} className="group relative aspect-video overflow-hidden border border-border bg-card">
        {hasVideo ? (
          <video ref={vid} src={SHOWREEL_URL} poster={images.commercial} muted loop playsInline autoPlay onPlay={() => setPlaying(true)} className="h-full w-full object-cover" />
        ) : (
          <img src={images.commercial} alt="Showreel poster: cinematic watch product film still" loading="lazy" width={1280} height={720} className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 md:p-8">
          <div className="flex items-center gap-4">
            <button
              onClick={toggle} disabled={!hasVideo}
              aria-label={playing ? "Pause showreel" : "Play showreel"}
              className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110 disabled:opacity-60 md:size-20"
            >
              {playing ? <Pause className="size-6" /> : <Play className="size-6 translate-x-0.5" />}
            </button>
            <span className="label-caps">{hasVideo ? "Showreel 2026" : "Showreel — coming soon"}</span>
          </div>
          <button
            aria-label="Fullscreen" disabled={!hasVideo}
            onClick={() => vid.current?.requestFullscreen()}
            className="flex size-11 items-center justify-center border border-border-strong text-foreground hover:border-primary hover:text-primary disabled:opacity-40"
          >
            <Maximize className="size-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export function Services({ onExplore }: { onExplore: (cat: string) => void }) {
  return (
    <section id="services" className="border-t border-border bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="label-caps mb-6">Services</p>
            <SplitHeading text="What I create." className="display-lg" />
          </div>
          <p className="max-w-sm text-muted-foreground">Six production disciplines, one goal: advertising that earns attention.</p>
        </div>
        <div className="grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 0.1} className="border-b border-r border-border">
              <article className="group relative flex h-full flex-col overflow-hidden p-6 md:p-8" data-cursor>
                <div className="relative mb-8 aspect-[4/3] overflow-hidden">
                  {s.video ? (
                    <video src={s.video} muted loop playsInline autoPlay preload="metadata" aria-label={`${s.title} preview video`} className="h-full w-full object-cover grayscale-[60%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" />
                  ) : (
                    <img src={s.image} alt={`${s.title} preview visual`} loading="lazy" className="h-full w-full object-cover grayscale-[60%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" />
                  )}
                  <span className="absolute left-3 top-3 bg-background/80 px-2 py-1 font-display text-xs font-bold text-primary backdrop-blur">{s.n}</span>
                </div>
                <h3 className="font-display text-2xl font-bold uppercase">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-subtle">
                  {s.points.map((p) => <li key={p} className="flex items-center gap-2"><span className="size-1 bg-primary" />{p}</li>)}
                </ul>
                <button onClick={() => onExplore(s.category)} className="mt-8 inline-flex items-center gap-2 self-start font-display text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:text-primary">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
