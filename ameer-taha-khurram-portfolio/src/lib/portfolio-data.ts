import hero from "@/assets/hero.jpg";
import influencer from "@/assets/influencer.jpg";
import product from "@/assets/work-product.jpg";
import cgi from "@/assets/work-cgi.jpg";
import v1 from "@/assets/media/ugc-video-1b.mp4";
import v2 from "@/assets/media/ugc-video-2.mp4";
import v3 from "@/assets/media/ugc-video-3.mp4";
import v4 from "@/assets/media/ugc-video-4.mp4";

import c1 from "@/assets/media/commercial-film-1.mp4";
import c2 from "@/assets/media/commercial-film-2.mp4";
import c3 from "@/assets/media/commercial-film-3.mp4";
import c4 from "@/assets/media/commercial-film-4.mp4";

import g1 from "@/assets/media/cgi-video-1.mp4";
import g2 from "@/assets/media/cgi-video-2.mp4";
import g3 from "@/assets/media/cgi-video-3.mp4";

import inf1 from "@/assets/media/influencer-1.png";
import inf2 from "@/assets/media/influencer-2.png";
import inf3 from "@/assets/media/influencer-3.png";
import inf4 from "@/assets/media/influencer-4.png";

export const influencerImages = [inf1, inf2, inf3, inf4];
import pp1 from "@/assets/media/product-photo-1.png";
import pp2 from "@/assets/media/product-photo-2.png";
import pp3 from "@/assets/media/product-photo-3.png";

import mc1 from "@/assets/media/meta-creative-1.png";
import mc2 from "@/assets/media/meta-creative-2.png";
import mc3 from "@/assets/media/meta-creative-3.png";
import mc4 from "@/assets/media/meta-creative-4.png";

export const metaCreatives = [mc1, mc2, mc3, mc4];

export const productPhotos = [pp1, pp2, pp3];
export const commercialVideos = [c1, c2, c3, c4];
export const ugcVideos = [v1, v2, v3, v4];
export const cgiVideos = [g1, g2, g3];
import commercial from "@/assets/work-commercial.jpg";

export const images = { hero, influencer, product, cgi, commercial };

/** Replace these placeholders with your real contact details. */
export const CONTACT = {
  email: "ameertahakhurram00@gmail.com",
  whatsapp: "", // e.g. "https://wa.me/923000000000"
  linkedin: "https://www.linkedin.com/in/ameer-taha-khurram-/",
  instagram: "", // e.g. "https://instagram.com/your-handle"
};

/** Set a showreel video URL (mp4) to enable playback. */
export const SHOWREEL_URL = "";

export type Category =
  | "AI UGC"
  | "AI Influencer"
  | "Commercials"
  | "CGI Ads"
  | "Product Photography"
  | "Meta Ad Creatives";

export const services: {
  n: string;
  title: string;
  category: Category;
  desc: string;
  points: string[];
  image: string;
  video?: string;
}[] = [
  { n: "01", title: "AI UGC Ads", category: "AI UGC", image: "", video: v1,
    desc: "Authentic-looking AI-generated creator advertisements designed to showcase products, communicate benefits, and engage audiences.",
    points: ["AI-generated creator videos", "Product demonstrations", "Testimonial-style concepts", "Hook-based ad variations", "Different creator environments"] },
  { n: "02", title: "AI Influencer", category: "AI Influencer", image: influencer,
    desc: "Virtual personalities and AI-generated influencers that help brands develop consistent creator-led advertising.",
    points: ["Virtual influencer portraits", "Lifestyle scenes", "Product integrations", "Consistent character identity", "Social media campaign concepts"] },
  { n: "03", title: "AI Commercials", category: "Commercials", image: "", video: c1,
    desc: "Cinematic, premium advertising films that transform ordinary products into visually compelling brand experiences.",
    points: ["Cinematic product films", "Luxury advertising visuals", "Lifestyle commercials", "Brand storytelling", "Dramatic lighting and transitions"] },
  { n: "04", title: "AI Product Photography", category: "Product Photography", image: pp1,
    desc: "High-end product visuals created with AI-powered art direction, studio lighting, and premium compositions.",
    points: ["Studio product photography", "Luxury product compositions", "Lifestyle photography", "E-commerce product visuals", "Campaign imagery"] },
  { n: "05", title: "CGI & 3D Product Ads", category: "CGI Ads", image: "", video: g1,
    desc: "Eye-catching CGI-inspired product advertisements featuring immersive environments, product animation, and cinematic 3D visuals.",
    points: ["Floating product animations", "3D product rotations", "Exploded product views", "Liquid and particle effects", "Creative product environments"] },
  { n: "06", title: "Meta Ad Creative Production", category: "Meta Ad Creatives", image: mc1,
    desc: "Creative concepts, hooks, visual variations, and advertising assets designed for brands running Meta campaigns.",
    points: ["9:16 vertical creatives", "4:5 advertising visuals", "1:1 static creatives", "Creative variations", "Hook and concept testing"] },
];

export type Project = {
  id: string;
  title: string;
  category: Category;
  desc: string;
  image: string;
  video?: string;
  overview: string;
  objective: string;
  direction: string;
  concept: string;
  deliverables: string[];
  gallery: string[];
  galleryVideos?: string[];
};

export const projects: Project[] = [
  ...commercialVideos.map((url, i): Project => ({
    id: `ai-commercial-${i + 1}`, title: `AI Commercial — Film ${String(i + 1).padStart(2, "0")}`, category: "Commercials", image: "", video: url,
    desc: "Cinematic AI-produced commercial film.",
    overview: "An AI-produced cinematic advertising film presenting a product as a brand experience.",
    objective: "Turn a product into a visually compelling, premium story.",
    direction: "Cinematic lighting, dramatic transitions, premium pacing.",
    concept: "Storyboard → AI shot generation → edit and grade.",
    deliverables: ["Commercial film"], gallery: [], galleryVideos: [url],
  })),
  ...ugcVideos.map((url, i): Project => ({
    id: `ai-ugc-${i + 1}`, title: `AI UGC Ad — Film ${String(i + 1).padStart(2, "0")}`, category: "AI UGC", image: "", video: url,
    desc: "AI-generated creator-style video ad.",
    overview: "An AI-generated UGC-style advertisement featuring a creator presenting a product.",
    objective: "Deliver authentic, scroll-stopping creator content without a physical shoot.",
    direction: "Natural creator delivery, vertical framing, social-first pacing.",
    concept: "Hook script → AI creator generation → edit.",
    deliverables: ["9:16 video ad"], gallery: [], galleryVideos: [url],
  })),
  ...productPhotos.map((url, i): Project => ({
    id: `ai-product-photo-${i + 1}`, title: `AI Product Photography — ${String(i + 1).padStart(2, "0")}`, category: "Product Photography", image: url,
    desc: "AI-directed studio product photography.",
    overview: "A premium AI-generated product still with studio lighting and art direction.",
    objective: "Deliver campaign-quality imagery without a physical shoot.",
    direction: "Studio lighting, premium composition, rich textures.",
    concept: "Lighting references → AI generation → retouch.",
    deliverables: ["Product still"], gallery: [url],
  })),
  ...cgiVideos.map((url, i): Project => ({
    id: `cgi-ad-${i + 1}`, title: `CGI & 3D Product Ad — ${String(i + 1).padStart(2, "0")}`, category: "CGI Ads", image: "", video: url,
    desc: "CGI-inspired 3D product advertisement video.",
    overview: "A CGI-style product advertisement featuring immersive environments and cinematic 3D visuals.",
    objective: "Turn the product into an eye-catching, scroll-stopping visual.",
    direction: "Product animation, cinematic lighting, premium rendering.",
    concept: "3D concept → product animation → edit and grade.",
    deliverables: ["CGI product film"], gallery: [], galleryVideos: [url],
  })),
  { id: "virtual-muse", title: "Virtual Muse", category: "AI Influencer", image: influencer,
    desc: "A consistent AI persona for fashion-led campaigns.",
    overview: "Concept development for a recurring virtual creator identity.",
    objective: "Maintain identity consistency across scenes and products.",
    direction: "Editorial portraits, leather, lime accent light.",
    concept: "Persona bible → portrait sets → lifestyle scenes.",
    deliverables: ["Portrait set", "Lifestyle scenes", "Post templates"], gallery: [influencer, product] },
  ...metaCreatives.map((url, i): Project => ({
    id: `meta-creative-${i + 1}`, title: `Meta Ad Creative — ${String(i + 1).padStart(2, "0")}`, category: "Meta Ad Creatives", image: url,
    desc: "Static ad creative designed for Meta placements.",
    overview: "A static advertising creative designed for paid social placements.",
    objective: "Stop the scroll and drive action in the feed.",
    direction: "Bold composition, premium art direction, clear offer.",
    concept: "Concept → visual design → format adaptation.",
    deliverables: ["Static creative"], gallery: [url],
  })),
];

export const categories = ["All Work", "AI UGC", "AI Influencer", "Commercials", "CGI Ads", "Product Photography", "Meta Ad Creatives"] as const;
