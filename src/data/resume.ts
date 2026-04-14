export interface ResumeRole {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface ResumeInternship {
  company: string;
  team: string;
  period: string;
}

export interface ResumeEducation {
  degree: string;
  school: string;
  location: string;
  period: string;
  notes: string[];
}

export interface ResumeData {
  roles: ResumeRole[];
  internships: ResumeInternship[];
  education: ResumeEducation[];
  skills: Record<string, string[]>;
}

export const resumeData: ResumeData = {
  roles: [
    {
      title: "Solutions Engineering Consultant",
      company: "Slalom, Innovation Lab",
      period: "Feb 2022 – Present",
      location: "New York, NY",
      bullets: [
        "Led evaluation, design, and deployment of AI, analytics, and agentic tooling across 8+ enterprise clients, identifying automation opportunities with clear ROI metrics.",
        "Designed and delivered 300+ executive and technical workshops translating AI agents, robotics, and emerging technologies into scalable business solutions.",
        "Built and optimized production-grade Python pipelines, SQL-backed analytics workflows, and REST API integrations to support AI-driven decision systems and real-time data ingestion.",
        "Partnered with data science, engineering, product, and sales teams to assess emerging technologies, define governance standards, and drive adoption of new tooling.",
        "Established best practices for performance monitoring, system usability, and adoption KPIs for analytics and AI-enabled platforms.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Moody's Investor Service, ESG Team",
      period: "Jul 2021 – Feb 2022",
      location: "New York, NY",
      bullets: [
        "Developed and optimized React-based analytics applications integrating large-scale ESG and climate datasets via RESTful APIs.",
        "Collaborated with product, analytics, and data teams in an agile environment to translate business requirements into scalable technical solutions.",
        "Improved data accessibility and usability to accelerate insights for internal and external stakeholders.",
      ],
    },
    {
      title: "Associate Software Engineer",
      company: "Moody's Analytics, UXD Team",
      period: "Aug 2019 – Jul 2021",
      location: "New York, NY",
      bullets: [
        "Implemented secure Okta SSO integrations across 5+ enterprise applications, improving authentication workflows and governance.",
        "Built reusable UI components and internal tooling to increase development velocity and platform consistency.",
        "Supported CI/CD workflows and collaborated closely with engineering teams on scalable system design.",
      ],
    },
  ],
  internships: [
    { company: "News Corp", team: "SEO Team", period: "Jun 2018 – Jan 2019" },
    { company: "Metro North MTA", team: "Security Technology Team", period: "Jun 2017 – Dec 2017" },
    { company: "Girls Who Code at Goldman Sachs", team: "Teaching Assistant", period: "Jun 2016 – Aug 2016" },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Marist College",
      location: "Poughkeepsie, NY",
      period: "2015 – 2019",
      notes: [
        "Goldman Sachs–Duet Family Technology Full Scholarship (one of five recipients)",
        "Minors: Data Science and Analytics, Information Technology",
        "Study Abroad: Lorenzo de Medici Institute, Florence, Italy",
        "Selected as one of twenty girls in the second class of Girls Who Code (2013)",
      ],
    },
  ],
  skills: {
    "Languages & Frameworks": ["Python", "JavaScript / React / Node", "HTML / CSS", "SQL"],
    "Cloud & Infrastructure": ["AWS", "GCP", "Azure", "Docker", "CI/CD / Git"],
    "AI & Data": ["Gemini / GPT / Claude", "Nvidia Isaac Sim / Isaac Lab"],
    "Robotics": ["Boston Dynamics SPOT SDK", "Robotics"],
    "Design & Tools": ["Miro", "Figma", "Jira"],
  },
};
