import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Achievements } from "@/components/portfolio/Achievements";
import { Education } from "@/components/portfolio/Education";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { Footer } from "@/components/portfolio/Footer";
import { Toaster } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Munim Ahmed — Software Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Munim Ahmed — software engineer working at the intersection of full-stack development, design systems and applied data science. NASA Space Apps Global Champion '22.",
      },
      { property: "og:title", content: "Munim Ahmed — Software Engineer & Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Designing intelligent digital experiences through code, data and human-centered design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Education />
      <ContactForm />
      <Footer />
      <Toaster position="bottom-right" richColors />
    </main>
  );
}
