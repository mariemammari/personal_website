export type ExperienceItem = {
    id: number;
    type: "work" | "education" | "certification";
    title: string;
    organization: string;
    date: string;
    bullets: string[];
    tags?: string[];
};

export const experience: ExperienceItem[] = [
    {
        id: 1,
        type: "work",
        title: "Full Stack Developer Intern",
        organization: "ERNST Tunisia",
        date: "Feb 2024 – May 2024",
        bullets: [
            "Project: multi-platform queue management system for Orange Tunisia.",
            "Platforms: ASP.NET Core MVC web app for agents and administrators; Flutter mobile app for remote ticket booking; WPF desktop app for local ticket issuance.",
            "Responsibilities: UML requirements analysis, system architecture design, UI/UX prototyping in Figma, full-stack development, API integration, performance testing.",
        ],
        tags: ["ASP.NET Core", "Flutter", "WPF", "Figma", "REST APIs"],
    },
    {
        id: 2,
        type: "work",
        title: "UI/UX & Flutter Developer Intern",
        organization: "ERNST Tunisia",
        date: "Jun 2023 – Sep 2023",
        bullets: [
            "Project: mobile e-commerce application from concept to delivery.",
            "Responsibilities: UI/UX design and branding (logo, color palette, Figma), Flutter frontend development, API integration, client communication, sprint reviews.",
        ],
        tags: ["Flutter", "Figma", "UI/UX", "Branding", "API Integration"],
    },
    {
        id: 3,
        type: "work",
        title: "Freelance UI/UX Designer",
        organization: "Remote, international clients",
        date: "2022 – Present",
        bullets: [
            "Responsibilities: requirements gathering, wireframing, Figma prototyping, brand identity design, client alignment through delivery.",
            "Notable: Tunisian Labor Laws digital platform — UX research (benchmarking international solutions), information architecture, UX flows, full UI design.",
        ],
        tags: ["Figma", "UX Research", "Wireframing", "Prototyping", "Brand Identity"],
    },
];
