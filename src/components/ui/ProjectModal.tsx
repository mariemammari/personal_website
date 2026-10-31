import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, GitBranch, Terminal, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import type { Project } from "../../data/projects";
import { heroGlassButtonCompact, heroGlassCard, heroGlassPanel } from "./glassStyles";

function StatusBadge({ status }: { status: Project["status"] }) {
    const { t } = useTranslation();

    const labels = {
        live: t("projects.status.live"),
        wip: t("projects.status.wip"),
        experiment: t("projects.status.experiment"),
    } as const;

    const colors = {
        live: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
        wip: "border-amber-500/40 bg-amber-500/10 text-amber-400",
        experiment: "border-sky-500/40 bg-sky-500/10 text-sky-400",
    } as const;

    return (
        <span className={`rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.2em] ${colors[status]}`}>
            {labels[status]}
        </span>
    );
}

type ProjectModalProps = {
    project: Project | null;
    onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const { t } = useTranslation();
    const gallery = project?.gallery ?? [];
    const hasGallery = gallery.length > 0;
    const hasMultiple = gallery.length > 1;
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<"overview" | "features" | "devops">("overview");

    useEffect(() => {
        setActiveIndex(0);
        setActiveTab("overview");
    }, [project?.id]);

    useEffect(() => {
        if (!project) return undefined;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [project, onClose]);

    const heroStyle: CSSProperties | undefined =
        project && !hasGallery ? { backgroundImage: project.image } : undefined;

    const tabs = [
        { key: "overview" as const, label: "Overview" },
        ...(project?.features?.length ? [{ key: "features" as const, label: "Features" }] : []),
        ...(project?.devops ? [{ key: "devops" as const, label: "DevOps" }] : []),
    ];

    return (
        <AnimatePresence>
            {project ? (
                <motion.div
                    className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 10 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className={`${heroGlassPanel} flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden`}
                    >
                        {/* ── Header ── */}
                        <div className="flex shrink-0 items-start justify-between border-b border-white/15 px-6 py-5">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
                                        Project
                                    </p>
                                    {project.year && (
                                        <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-white/70">
                                            {project.year}
                                        </span>
                                    )}
                                </div>
                                <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                                {project.tagline && (
                                    <p className="mt-1 text-sm text-white/70">{project.tagline}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-3 ml-4 shrink-0">
                                <StatusBadge status={project.status} />
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-cyan-100/50 hover:text-white"
                                    aria-label="Close project details"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* ── Tabs ── */}
                        {tabs.length > 1 && (
                            <div className="flex shrink-0 gap-1 border-b border-white/15 px-6 pt-3 pb-0">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`pb-3 px-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                                                ? "border-cyan-100 text-white"
                                                : "border-transparent text-white/60 hover:text-white"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* ── Body ── */}
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">

                            {/* OVERVIEW TAB */}
                            {activeTab === "overview" && (
                                <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.1fr_0.9fr]">
                                    {/* Left — image / gallery */}
                                    <div>
                                        {hasGallery ? (
                                            <div className="space-y-4">
                                                <img
                                                    src={gallery[activeIndex]}
                                                    alt={`${project.title} screenshot ${activeIndex + 1}`}
                                                    className="h-56 w-full rounded-2xl border border-white/20 object-cover"
                                                />
                                                {hasMultiple && (
                                                    <div className="flex gap-2 overflow-x-auto pb-1">
                                                        {gallery.map((src, idx) => (
                                                            <button
                                                                key={`${project.title}-modal-${idx}`}
                                                                type="button"
                                                                onClick={() => setActiveIndex(idx)}
                                                                className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition ${idx === activeIndex
                                                                        ? "border-cyan-100 ring-2 ring-cyan-100/20"
                                                                        : "border-white/20"
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
                                                )}
                                            </div>
                                        ) : (
                                            <div
                                                className="h-56 w-full rounded-2xl border border-white/20 bg-cover bg-center"
                                                style={heroStyle}
                                            />
                                        )}
                                    </div>

                                    {/* Right — description, tags, links */}
                                    <div className="space-y-5">
                                        <p className="text-sm leading-7 text-white/80">
                                            {project.longDescription ?? project.description}
                                        </p>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border border-cyan-100/20 bg-cyan-100/10 px-3 py-1 font-mono text-xs text-cyan-50"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* My role */}
                                        {project.role && (
                                            <div className={`${heroGlassCard} p-4`}>
                                                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
                                                    My Contribution
                                                </p>
                                                <p className="text-xs leading-6 text-white/75">{project.role}</p>
                                            </div>
                                        )}

                                        {/* Links */}
                                        <div className="flex flex-wrap gap-3 pt-1">
                                            <a
                                                className={heroGlassButtonCompact}
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {t("contact.github")}
                                                <ArrowUpRight className="h-4 w-4" />
                                            </a>
                                            {project.demo && (
                                                <a
                                                    className={`${heroGlassButtonCompact} border-cyan-100/35 bg-cyan-100/10 text-cyan-50 hover:bg-cyan-100/20`}
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {t("projects.liveDemo")}
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* FEATURES TAB */}
                            {activeTab === "features" && project.features && (
                                <div className="px-6 py-6">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {project.features.map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className={`${heroGlassCard} flex items-start gap-3 p-4`}
                                            >
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-100" />
                                                <p className="text-sm leading-6 text-white/80">{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* DEVOPS TAB */}
                            {activeTab === "devops" && project.devops && (
                                <div className="px-6 py-6 space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <GitBranch className="h-4 w-4 text-cyan-100" />
                                        <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
                                            DevOps & Infrastructure
                                        </h4>
                                    </div>

                                    {/* Pipeline steps rendered from devops string */}
                                    <div className={`${heroGlassCard} p-5`}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Terminal className="h-3.5 w-3.5 text-cyan-100" />
                                            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
                                                Pipeline & Infrastructure
                                            </span>
                                        </div>
                                        <p className="whitespace-pre-line text-sm leading-7 text-white/80">
                                            {project.devops}
                                        </p>
                                    </div>

                                    {/* DevOps tags */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tags
                                            .filter((t) =>
                                                [
                                                    "Docker", "Kubernetes", "Jenkins", "Vercel",
                                                    "Cloudflare", "CI/CD", "DevOps", "Docker Compose",
                                                    "kubeadm", "SonarQube", "Prometheus", "Grafana",
                                                ].includes(t)
                                            )
                                            .map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 font-mono text-xs text-secondary"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
