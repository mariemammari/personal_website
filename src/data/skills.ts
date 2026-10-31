export type SkillTone = "primary" | "secondary" | "success" | "amber" | "muted";

export const skillCategoryOrder = [
    "frontend",
    "devops",
    "backend",
    "databases",
    "dataMl",
    "languages",
    "priorFrameworks",
    "workflow",
    "currentlyLearning",
] as const;

export type SkillCategoryKey = (typeof skillCategoryOrder)[number];

export const skillCategoryTones: Record<SkillCategoryKey, SkillTone> = {
    frontend: "primary",
    devops: "secondary",
    backend: "secondary",
    databases: "secondary",
    dataMl: "success",
    languages: "muted",
    priorFrameworks: "muted",
    workflow: "muted",
    currentlyLearning: "muted",
};
