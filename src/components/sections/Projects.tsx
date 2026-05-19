import { useNavigate, useParams } from "react-router-dom";
import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { useTranslation } from "react-i18next";

export function Projects() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { lang = "en" } = useParams<{ lang: string }>();

    return (
        <section id="projects" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
            <div className="mb-10 max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.35em] text-secondary">{t("projects.title")}</p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{t("projects.heading")}</h2>
                <p className="mt-4 text-sm leading-7 text-white/70">{t("projects.subtitle")}</p>
            </div>
            <div className="grid gap-10 xl:grid-cols-2">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        onOpen={(p) => navigate(`/${lang}/projects/${p.id}`)}
                    />
                ))}
            </div>
        </section>
    );
}
