import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Cursor, Loader } from "@/components/motion-kit";
import { Hero, Marquee, Nav, Services, Showreel } from "@/components/sections-top";
import { About, Contact, Footer, Influencer, Process, Work } from "@/components/sections-bottom";

const title = "Ameer Taha Khurram | AI Creative Specialist & Advertising Portfolio";
const description =
  "Explore AI UGC ads, AI influencer campaigns, cinematic AI commercials, CGI product advertisements, and premium AI product photography by Ameer Taha Khurram.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState("All Work");
  return (
    <div className="grain">
      <Loader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Showreel />
        <Services
          onExplore={(c) => {
            setFilter(c);
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <Work filter={filter} setFilter={setFilter} />
        <Influencer />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
