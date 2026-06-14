import hrdi from "@/assets/project-hrdi.jpg";
import peace from "@/assets/project-peace.jpg";
import media from "@/assets/project-media.jpg";
import textutils from "@/assets/project-textutils.jpg";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  features: string[];
  image: string;
  live: string;
  github: string;
  accent: "electric" | "plasma" | "ember";
}

export const projects: Project[] = [
  {
    slug: "hrdi",
    title: "HRDI Website",
    tagline: "Healthcare research, made readable.",
    description:
      "A research-driven platform for the Health & Research Development Institute — built around clarity, accessibility and a calm editorial voice.",
    tech: ["React", "Tailwind CSS", "Django", "MySQL"],
    features: [
      "Editorial CMS for ongoing research publications",
      "Accessible navigation tested to WCAG AA",
      "Server-rendered SEO surfaces & sitemap automation",
    ],
    image: hrdi,
    live: "https://example.com/hrdi",
    github: "https://github.com/ayonmunim",
    accent: "electric",
  },
  {
    slug: "peace",
    title: "PEACE — Meditation App",
    tagline: "A quiet place inside your pocket.",
    description:
      "A meditation and mindfulness companion designed around ritual, breath and a soft, ambient interface language.",
    tech: ["React Native", "Expo", "Node.js", "MongoDB"],
    features: [
      "Guided breathwork with haptic pacing",
      "Daily streaks and gentle mood journaling",
      "Soundscape engine with seamless crossfade",
    ],
    image: peace,
    live: "https://example.com/peace",
    github: "https://github.com/ayonmunim",
    accent: "plasma",
  },
  {
    slug: "media",
    title: "Media Video App",
    tagline: "Streaming, choreographed.",
    description:
      "A cinematic video discovery app with a touch-first browsing experience and adaptive bitrate streaming.",
    tech: ["React", "TypeScript", "HLS.js", "Express"],
    features: [
      "Adaptive HLS playback with offline cache",
      "Personalized rails with collaborative filtering",
      "Glass overlay player with motion-aware controls",
    ],
    image: media,
    live: "https://example.com/media",
    github: "https://github.com/ayonmunim",
    accent: "ember",
  },
  {
    slug: "textutils",
    title: "TEXTUTILS",
    tagline: "Text, transformed.",
    description:
      "A focused suite of writer-grade text utilities — case, count, clean, convert — wrapped in a minimal editor surface.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    features: [
      "Real-time transforms with diff preview",
      "Keyboard-first command palette",
      "Privacy-first: everything runs in the browser",
    ],
    image: textutils,
    live: "https://example.com/textutils",
    github: "https://github.com/ayonmunim",
    accent: "electric",
  },
];
