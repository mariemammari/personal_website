import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Project } from "../../data/projects";

function StatusBadge({ status }: { status: Project["status"] }) {
    const { t } = useTranslation();

    const labels = {
        live: t("projects.status.live"),
        wip: t("projects.status.wip"),
        experiment: t("projects.status.experiment"),
    } as const;

    return (
        <span className="rounded-full border border-border bg-white/5 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-secondary">
            {labels[status]}
        </span>
    );
}

export function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen?: (project: Project) => void }) {
    const { t } = useTranslation();
    const gallery = project.gallery ?? [];
    const hasGallery = gallery.length > 0;
    const hasMultiple = gallery.length > 1;
    const [activeIndex, setActiveIndex] = useState(0);
    const pointerStartX = useRef<number | null>(null);
    const swipeGuard = useRef(false);
    const coverImage = hasGallery ? `url(${gallery[activeIndex]})` : project.image;
    const canOpen = Boolean(onOpen);

    const goNext = () => {
        if (!hasMultiple) return;
        setActiveIndex((value) => (value + 1) % gallery.length);
    };

    const goPrev = () => {
        if (!hasMultiple) return;
        setActiveIndex((value) => (value - 1 + gallery.length) % gallery.length);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!hasMultiple) return;
        swipeGuard.current = false;
        pointerStartX.current = event.clientX;
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!hasMultiple || pointerStartX.current === null) return;
        const delta = event.clientX - pointerStartX.current;
        pointerStartX.current = null;
        if (Math.abs(delta) < 40) return;
        swipeGuard.current = true;
        if (delta < 0) {
            goNext();
        } else {
            goPrev();
        }
    };

    const handlePointerLeave = () => {
        pointerStartX.current = null;
    };

    const handleOpen = () => {
        if (!onOpen) return;
        if (swipeGuard.current) {
            swipeGuard.current = false;
            return;
        }
        onOpen(project);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (!onOpen) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpen();
        }
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
            className={`group overflow-y-auto overflow-x-hidden max-h-[700px] flex flex-col rounded-[28px] border border-border bg-surface/90 p-6 md:p-8 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.22)] ${canOpen ? "cursor-pointer" : ""
                } scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent`}
            onClick={handleOpen}
            onKeyDown={handleKeyDown}
            tabIndex={canOpen ? 0 : -1}
            role={canOpen ? "button" : undefined}
            aria-label={canOpen ? `View details for ${project.title}` : undefined}
        >
            <div
                className="relative mb-6 h-64 md:h-[340px] shrink-0 overflow-hidden rounded-2xl border border-border"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerLeave}
                onPointerLeave={handlePointerLeave}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.05]"
                    style={{ backgroundImage: coverImage }}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-black/40 to-black/70" />
                {canOpen ? (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            View details
                        </span>
                    </div>
                ) : null}
                {project.coverTitle ? (
                    <div className="pointer-events-none absolute inset-x-4 bottom-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Demo</p>
                        <p className="mt-1 text-sm font-semibold text-white">{project.coverTitle}</p>
                        {project.coverSubtitle ? (
                            <p className="mt-1 text-xs text-white/70">{project.coverSubtitle}</p>
                        ) : null}
                    </div>
                ) : null}
            </div>
            {hasMultiple ? (
                <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
                    {gallery.map((src, idx) => (
                        <button
                            key={`${project.title}-gallery-${idx}`}
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                setActiveIndex(idx);
                            }}
                            className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border bg-surface/80 transition ${idx === activeIndex ? "border-primary" : "border-border"
                                }`}
                            aria-label={`${project.title} screenshot ${idx + 1}`}
                        >
                            <img
                                src={src}
                                alt={`${project.title} screenshot ${idx + 1}`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>
            ) : null}
            <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    {project.tagline && (
                        <p className="mt-0.5 text-xs text-white/70 line-clamp-1">{project.tagline}</p>
                    )}
                </div>
                <StatusBadge status={project.status} />
            </div>
            <p className="text-sm leading-6 text-white/70">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-primary/30 bg-primary-dim px-3 py-1 text-xs text-white">
                        {tag}
                    </span>
                ))}
            </div>
            {project.year ? (
                <div className="mt-4 flex items-center gap-3">
                    {project.year && (
                        <span className="text-[11px] text-white/70 border border-border rounded-full px-2 py-0.5">{project.year}</span>
                    )}
                </div>
            ) : null}
            <div className="mt-4 flex items-center gap-4 text-sm font-medium">
                <a
                    className="inline-flex items-center gap-1 text-white transition hover:text-primary"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                >
                    <FaGithub className="h-4 w-4" />
                    {t("contact.github")}
                    <ArrowUpRight className="h-4 w-4" />
                </a>
                {project.demo ? (
                    <a
                        className="inline-flex items-center gap-1 text-secondary transition hover:text-white"
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {t("projects.liveDemo")}
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                ) : null}
            </div>
        </motion.article>
    );
}
