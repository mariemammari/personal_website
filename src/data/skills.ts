export type SkillTone = "primary" | "secondary" | "success" | "amber" | "muted";

export type SkillCategory = {
    title: string;
    tone: SkillTone;
    items: string[];
};

export const skillCategories: SkillCategory[] = [
    {
        title: "Frontend",
        tone: "primary",
        items: ["React", "Angular 17", "TypeScript", "TailwindCSS", "Bootstrap"],
    },
    {
        title: "Design",
        tone: "primary",
        items: ["Figma", "UX Research", "Wireframing", "Prototyping", "Brand Identity"],
    },
    {
        title: "Backend & APIs",
        tone: "secondary",
        items: ["NestJS", "Node.js", "Spring Boot", "REST APIs", "Microservices"],
    },
    {
        title: "DevOps",
        tone: "secondary",
        items: ["Docker", "Kubernetes", "Jenkins", "SonarQube"],
    },
    {
        title: "Databases",
        tone: "secondary",
        items: ["MySQL", "MongoDB", "SQL Server"],
    },
    {
        title: "Data & ML",
        tone: "success",
        items: [
            "Web Scraping",
            "Data Processing",
            "Model Selection",
            "Hyperparameter Tuning",
            "Scikit-learn",
            "Pandas",
        ],
    },
    {
        title: "Observability",
        tone: "amber",
        items: ["Grafana", "Prometheus"],
    },
    {
        title: "Languages",
        tone: "muted",
        items: ["JavaScript", "Java", "Python", "C#", "Dart", "PHP"],
    },
    {
        title: "Prior Frameworks",
        tone: "muted",
        items: ["Symfony", "ASP.NET Core", "Flutter"],
    },
    {
        title: "Workflow",
        tone: "muted",
        items: ["Git", "GitHub", "Scrum", "Kanban", "Agile Collaboration"],
    },
];
