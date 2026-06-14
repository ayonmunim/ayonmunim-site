export const resume = {
  name: "Munim Ahmed",
  role: "Aspiring Software Engineer / Full-Stack Developer",
  tagline:
    "Designing Intelligent Digital Experiences Through Code, Data, and Human-Centered Design.",
  location: "Arlington, VA",
  email: "ayonmunim26@gmail.com",
  github: "https://github.com/ayonmunim",
  handle: "@ayonmunim",
  summary:
    "Software engineer at the intersection of UI/UX, full-stack development and applied data science. I build interfaces that feel intentional and systems that scale — with React, Django, Python, MySQL and a growing toolkit in ML & AI.",
  skills: {
    Languages: ["TypeScript", "JavaScript", "Python", "SQL", "Java", "C++"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Figma"],
    Backend: ["Django", "Node.js", "Express", "REST APIs", "GraphQL"],
    "Data & ML": ["MySQL", "PostgreSQL", "pandas", "scikit-learn", "TensorFlow", "Power BI"],
    Tools: ["Git", "Docker", "Vercel", "Linux", "Jira", "Postman"],
  },
  experience: [
    {
      role: "Full-Stack Developer",
      company: "IT Department",
      period: "2024 — Present",
      location: "Remote",
      bullets: [
        "Built and maintained internal tooling using React, Django and MySQL serving multi-departmental workflows.",
        "Designed RESTful APIs and optimized database queries, reducing dashboard load times by 40%.",
        "Collaborated with stakeholders to translate requirements into accessible, responsive interfaces.",
      ],
    },
    {
      role: "Product Engineer / Front-End Developer",
      company: "Team Diamonds",
      period: "2023 — 2024",
      location: "Hybrid",
      bullets: [
        "Shipped high-fidelity React interfaces with motion-driven micro-interactions and design-system rigor.",
        "Partnered with designers to convert Figma flows into production-ready components.",
        "Implemented accessibility (WCAG AA) and performance improvements across the marketing surface.",
      ],
    },
  ],
  education: [
    {
      degree: "MSc, Data Management & Analytics",
      school: "Washington University of Science & Technology",
      period: "Present",
      detail: "CGPA 4.00 / 4.00",
    },
    {
      degree: "BSc, Software Engineering",
      school: "Daffodil International University",
      period: "Completed",
      detail: "Focus: Full-stack development, HCI, data systems.",
    },
  ],
  achievements: [
    {
      title: "Global Champion — NASA Space Apps Challenge",
      year: "2022",
      detail:
        "Recognized as the global winner among 25,000+ participants from 162 countries for a space-data driven product.",
      featured: true,
    },
    {
      title: "National Champion — NASA Space Apps Challenge",
      year: "2022",
      detail: "Top national team representing Bangladesh.",
    },
    {
      title: "Top 5 — Data Science Summit Idea Contest",
      year: "2022",
      detail: "Finalist for an applied analytics product concept.",
    },
    {
      title: "Top 3 — Machine Learning Contest",
      year: "2021",
      detail: "Podium finish for a supervised-learning prediction task.",
    },
    {
      title: "Top 10 — National Math Olympiad",
      year: "Bangladesh",
      detail: "Top performer in nationwide olympiad mathematics.",
    },
  ],
  activities: [
    {
      role: "President, Data Science Club",
      detail: "Led curriculum, workshops and an active community of student data scientists.",
    },
    {
      role: "Event Host & Coordinator",
      detail: "Hosted and produced tech events, hackathons and panels.",
    },
  ],
};

export type Resume = typeof resume;
