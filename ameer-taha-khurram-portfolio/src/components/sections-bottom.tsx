import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, Mail, Briefcase as Linkedin, Camera as Instagram, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SplitHeading, ease } from "./motion-kit";
import { LimeButton } from "./sections-top";
import { categories, projects, services, images, influencerImages, CONTACT, type Project } from "@/lib/portfolio-data";
import ameerPortrait from "@/assets/media/ameer-portrait-2.jpg";

export function Work({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) {
  const [open, setOpen] = useState<Project | null>(null);
  const list = filter === "All Work" ? projects : projects.filter((p) => p.category === filter);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
      <p className="label-caps mb-6">Selected work — concept & spec</p>
      <SplitHeading text={"Selected\ncreative work."} className="display-lg" />
      <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c} role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}
            className={`border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${filter === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"}`}
          >{c}</button>
        ))}
      </div>
      <motion.div layout className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.article
              key={p.id} layout
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease }}
              className={i % 2 === 1 ? "md:mt-24" : ""}
            >
              <button onClick={() => setOpen(p)} className="group block w-full text-left" data-cursor aria-label={`View project ${p.title}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-card">
                  {p.video ? (
                    <video src={p.video} muted loop playsInline autoPlay preload="metadata" aria-label={`${p.title} video`} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                  ) : (
                    <img src={p.image} alt={`${p.title} — ${p.category} concept visual`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex size-24 items-center justify-center rounded-full bg-primary font-display text-xs font-bold uppercase text-primary-foreground">View</span>
                  </div>
                  {!p.video && <span className="absolute left-4 top-4 border border-border-strong bg-background/70 px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">Concept</span>}
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="label-caps text-primary">{p.category}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold uppercase md:text-3xl">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                  <ArrowUpRight className="mt-1 size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={open.title}
            className="fixed inset-0 z-[65] overflow-y-auto bg-background"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.8, ease }}
          >
            <button onClick={() => setOpen(null)} aria-label="Close project" className="fixed right-6 top-6 z-10 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><X /></button>
            <div className="relative h-[70vh]">
              {open.video ? <video src={open.video} muted loop playsInline autoPlay className="h-full w-full object-cover" /> : <img src={open.image} alt={open.title} className="h-full w-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-10 left-6 md:left-10">
                <p className="label-caps text-primary">{open.category} · Concept / spec work</p>
                <h2 className="display-lg mt-4">{open.title}</h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 md:grid-cols-3 md:px-10">
              {([["Project overview", open.overview], ["Creative objective", open.objective], ["Visual direction", open.direction], ["Concept development", open.concept]] as const).map(([k, v]) => (
                <div key={k} className="border-t border-border pt-6">
                  <p className="label-caps mb-3">{k}</p>
                  <p className="text-lg">{v}</p>
                </div>
              ))}
              <div className="border-t border-border pt-6">
                <p className="label-caps mb-3">Final deliverables</p>
                <ul className="space-y-1">{open.deliverables.map((d) => <li key={d} className="flex items-center gap-2 text-lg"><span className="size-1.5 bg-primary" />{d}</li>)}</ul>
              </div>
            </div>
            <div className="mx-auto grid max-w-[1440px] gap-6 px-6 pb-24 md:grid-cols-2 md:px-10">
              {open.galleryVideos?.map((v) => <video key={v} src={v} controls playsInline className="mx-auto max-h-[85vh] w-full bg-card object-contain md:col-span-2" />)}
              {open.gallery.map((g, i) => <img key={i} src={g} alt={`${open.title} gallery image ${i + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Influencer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} className="grid min-h-screen border-y border-border md:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-24 md:px-16">
        <p className="label-caps mb-6">AI Influencer</p>
        <SplitHeading text={"Meet the next\ngeneration\nof creators."} className="display-lg" />
        <div className="mt-12 grid grid-cols-2 gap-px bg-border">
          {[["Creator identity", "A consistent face, voice and style across every campaign."], ["Visual personality", "Art-directed aesthetics tailored to your audience."], ["Product integration", "Your product, naturally placed in the creator's world."], ["Short-form video", "Vertical previews built for Reels and TikTok."]].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="bg-background p-5">
              <h3 className="font-display text-sm font-bold uppercase text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border">
        {influencerImages.map((src, i) => (
          <div key={src} className="relative aspect-[2/3] overflow-hidden bg-background">
            <motion.img style={i % 2 ? { y } : {}} src={src} alt={`AI influencer portrait ${i + 1}`} loading="lazy" className="absolute inset-0 h-[110%] w-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  ["01", "Discover", "Understand the product, audience, positioning, and advertising objective."],
  ["02", "Concept", "Develop creative directions, hooks, scripts, storyboards, and visual references."],
  ["03", "Produce", "Create AI UGC, product visuals, CGI concepts, and commercial videos."],
  ["04", "Deliver", "Provide polished advertising assets in the required formats and specifications."],
];

export function Process() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
      <p className="label-caps mb-6">Process</p>
      <SplitHeading text="From idea to impact." className="display-lg" />
      <div className="relative mt-20">
        <motion.div className="absolute left-3 top-0 h-full w-px origin-top bg-primary md:left-0 md:top-3 md:h-px md:w-full md:origin-left"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} />
        <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} delay={0.3 + i * 0.15}>
              <li className="relative pl-12 md:pl-0 md:pt-14">
                <span className="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full border border-primary bg-background md:top-0"><span className="size-2 rounded-full bg-primary" /></span>
                <p className="font-display text-6xl font-bold text-subtle/40">{n}</p>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase">{t}</h3>
                <p className="mt-3 text-muted-foreground">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="border-t border-border bg-surface py-28 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="sticky top-28">
            <div className="aspect-[4/5] overflow-hidden border border-border-strong bg-card">
              <img src={ameerPortrait} alt="Ameer Taha Khurram" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="label-caps mb-6">About</p>
          <SplitHeading text={"Creativity meets\nartificial intelligence."} className="display-lg" />
          <Reveal className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>I'm <span className="text-foreground">Ameer Taha Khurram</span>, an AI creative specialist focused on producing modern advertising visuals for brands.</p>
            <p>My work combines creative direction, AI-powered production, visual storytelling, and advertising strategy.</p>
            <p className="font-display text-2xl font-bold uppercase leading-tight text-foreground">
              Great advertising should do more than look beautiful. It should communicate value, capture attention, and give people a reason to <span className="text-primary">take action.</span>
            </p>
          </Reveal>
          <Reveal className="mt-12 border-t border-border pt-8">
            <p className="label-caps mb-4">Services overview</p>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => <span key={s.n} className="border border-border px-3 py-1.5 text-sm">{s.title}</span>)}
            </div>
            <div className="mt-10"><LimeButton href="#contact">Start a project <ArrowUpRight className="size-4" /></LimeButton></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [sending, setSending] = useState(false);
  const socials = [
    { label: "Email", href: CONTACT.email ? `mailto:${CONTACT.email}` : "", icon: Mail },
    { label: "WhatsApp", href: CONTACT.whatsapp, icon: MessageCircle },
    { label: "LinkedIn", href: CONTACT.linkedin, icon: Linkedin },
    { label: "Instagram", href: CONTACT.instagram, icon: Instagram },
  ];
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const message = String(f.get("message") || "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
      toast.error("Please add your name, a valid email, and a short project description.");
      return;
    }
    if (!CONTACT.email) {
      toast.info("Contact email not set up yet — your message wasn't sent.");
      return;
    }
    setSending(true);
    const body = `Name: ${name}\nEmail: ${email}\nBrand: ${f.get("brand") || "-"}\nService: ${f.get("service")}\n\n${message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`New project — ${name}`)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => setSending(false), 1200);
  };
  const field = "w-full border-b border-border-strong bg-transparent py-4 text-lg text-foreground placeholder:text-subtle focus:border-primary focus:outline-none transition-colors";

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="ambient-lime absolute -right-40 top-0 -z-10 size-[60vw] rounded-full blur-3xl" />
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-2 md:px-10">
        <div>
          <p className="label-caps mb-6">Contact</p>
          <SplitHeading text={"Have a product?\nLet's make it\nunforgettable."} className="display-lg" />
          <p className="mt-8 max-w-md text-lg text-muted-foreground">Let's create something your audience won't scroll past.</p>
          <ul className="mt-12 space-y-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 font-display text-lg uppercase hover:text-primary">
                    <Icon className="size-5" /> {label} <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-3 font-display text-lg uppercase text-subtle"><Icon className="size-5" /> {label} — coming soon</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={onSubmit} className="space-y-2" noValidate>
          <label className="sr-only" htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Your name" maxLength={100} className={field} />
          <label className="sr-only" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email address" maxLength={255} className={field} />
          <label className="sr-only" htmlFor="brand">Brand / company</label>
          <input id="brand" name="brand" placeholder="Brand / company" maxLength={100} className={field} />
          <label className="sr-only" htmlFor="service">Service</label>
          <select id="service" name="service" className={`${field} appearance-none`} defaultValue={services[0]?.title}>
            {services.map((s) => <option key={s.n} className="bg-card">{s.title}</option>)}
            <option className="bg-card">Not sure yet</option>
          </select>
          <label className="sr-only" htmlFor="message">Project description</label>
          <textarea id="message" name="message" rows={4} maxLength={2000} placeholder="Tell me about your product and goals" className={`${field} resize-none`} />
          <div className="pt-8"><LimeButton>{sending ? "Opening mail…" : "Send inquiry"} <ArrowUpRight className="size-4" /></LimeButton></div>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-display text-sm font-bold uppercase">Ameer Taha Khurram<span className="text-primary">.</span></p>
        <p className="label-caps">AI Creative Specialist · © 2026</p>
        <a href="#home" className="label-caps hover:text-primary">Back to top ↑</a>
      </div>
    </footer>
  );
}
