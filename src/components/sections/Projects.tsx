import { useNavigate, useParams } from "react-router-dom";
import { projectCardOrder, projects, type Project } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { useTranslation } from "react-i18next";

export function Projects() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { lang = "en" } = useParams<{ lang: string }>();
    const projectTranslations = lang === "fr"
        ? t("projects.items", { returnObjects: true }) as Record<string, Partial<Project>>
        : {};
    const orderedProjects = projectCardOrder
        .map((id) => projects.find((project) => project.id === id))
        .filter((project): project is Project => project !== undefined);

    return (
        <section id="projects" className="mx-auto w-11/12 max-w-[1600px] py-20 xl:w-10/12">
            <div className="mb-8 max-w-2xl">
                <p className="font-mono text-base font-bold uppercase tracking-[0.25em] text-secondary">{t("projects.title")}</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-5xl">{t("projects.heading")}</h2>
                <p className="mt-4 text-base leading-8 text-white/80">{t("projects.subtitle")}</p>
            </div>
            <div className="grid gap-6 xl:auto-rows-fr xl:grid-cols-2">
                {orderedProjects.map((project, index) => {
                    const localizedContent = lang === "fr" ? projectTranslations[String(project.id)] : undefined;
                    const displayProject = localizedContent ? { ...project, ...localizedContent } : project;
                    return (
                    <ProjectCard
                        key={project.id}
                        project={displayProject}
                        index={index}
                        onOpen={(p) => navigate(`/${lang}/projects/${p.id}`)}
                    />
                    );
                })}
            </div>
        </section>
    );
}
