import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowUpRight,
    Box,
    Calendar,
    CheckCircle2,
    Package,
    ExternalLink,
    GitBranch,
    Globe,
    Layers,
    Server,
    Sparkles,
    Terminal,
    Zap,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { BackgroundLayers } from "../components/ui/BackgroundLayers";
import { projects } from "../data/projects";
import i18n from "../i18n";

/* ─────────────── helpers ─────────────── */
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

function StatusDot({ status }: { status: "live" | "wip" | "experiment" }) {
    const cfg = {
        live: { label: "Live", cls: "bg-emerald-400", ring: "ring-emerald-400/30" },
        wip: { label: "In Progress", cls: "bg-amber-400", ring: "ring-amber-400/30" },
        experiment: { label: "Experiment", cls: "bg-sky-400", ring: "ring-sky-400/30" },
    }[status];
    return (
        <span className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-white ring-2 ${cfg.ring}`}>
            <span className={`inline-block h-2 w-2 rounded-full ${cfg.cls}`} />
            {cfg.label}
        </span>
    );
}

function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="mb-8 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                {icon}
            </span>
            <h2 className="text-xl font-semibold tracking-wide text-white">{label}</h2>
            <div className="ml-4 h-px flex-1 bg-white/6" />
        </div>
    );
}

function Tag({ children, accent = false }: { children: string; accent?: boolean }) {
    return (
        <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${accent
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-white/5 text-white/70"
                }`}
        >
            {children}
        </span>
    );
}

function FeatureCard({ text }: { text: string }) {
    /* split "🏡 Title — rest" or "🏡 Title: rest" into emoji+title / body */
    const dashIdx = text.indexOf(" — ");
    const colonIdx = text.indexOf(": ");
    const splitAt = dashIdx !== -1 ? dashIdx : colonIdx !== -1 ? colonIdx : -1;

    let heading = text;
    let body = "";
    if (splitAt !== -1) {
        heading = text.slice(0, splitAt);
        body = text.slice(splitAt + (dashIdx !== -1 ? 3 : 2));
    }

    return (
        <div className="group rounded-2xl border border-border bg-white/[0.03] p-5 transition duration-300 hover:border-primary/40 hover:bg-primary/5">
            <div className="mb-2 flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm font-semibold text-white">{heading}</p>
            </div>
            {body && <p className="pl-6 text-xs leading-6 text-white/70">{body}</p>}
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex flex-col gap-2 rounded-2xl border border-border bg-white/[0.03] p-5">
            <span className="text-primary">{icon}</span>
            <p className="text-xs uppercase tracking-widest text-white/60">{label}</p>
            <p className="text-lg font-semibold text-white">{value}</p>
        </div>
    );
}

/* ─────────────── main page ─────────────── */
export function ProjectDetailPage() {
    const { lang = "en", id } = useParams<{ lang: string; id: string }>();
    const navigate = useNavigate();

    // Sync i18n language from URL param (fixes deep-link language bug)
    useEffect(() => {
        if (lang === "en" || lang === "fr") {
            void i18n.changeLanguage(lang);
            document.documentElement.lang = lang;
        }
    }, [lang]);

    // Redirect invalid lang params
    if (lang !== "en" && lang !== "fr") {
        return <Navigate to={`/en/projects/${id}`} replace />;
    }

    const project = projects.find((p) => String(p.id) === id);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [id]);

    useEffect(() => {
        if (!project) navigate(`/${lang}`, { replace: true });
    }, [project, lang, navigate]);

    if (!project) return null;

    const hasGallery = (project.gallery?.length ?? 0) > 0;
    const devopsLines = project.devops?.split(". ").filter(Boolean) ?? [];

    /* derive tech categories from tags heuristically */
    const devopsTags = project.tags.filter((t) =>
        ["Docker", "Kubernetes", "Jenkins", "Vercel", "Cloudflare", "CI/CD",
            "Docker Compose", "SonarQube", "Prometheus", "Grafana", "kubeadm"].includes(t)
    );
    const mlTags = project.tags.filter((t) =>
        ["XGBoost", "Scikit-learn", "FastAPI", "Python", "Pandas",
            "Machine Learning", "Web Scraping", "Data Engineering"].includes(t)
    );
    const coreTags = project.tags.filter(
        (t) => !devopsTags.includes(t) && !mlTags.includes(t)
    );

    return (
        <div className="relative min-h-screen overflow-hidden bg-background text-white">
            <BackgroundLayers />

            <div className="relative z-10">

                {/* ── Sticky top bar ── */}
                <div className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 md:px-8">
                        <Link
                            to={`/${lang}#projects`}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs font-semibold text-white transition hover:border-primary/50 hover:text-primary"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Back to portfolio
                        </Link>
                        <div className="hidden items-center gap-3 md:flex">
                            <StatusDot status={project.status} />
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:border-primary/50"
                            >
                                <FaGithub className="h-3.5 w-3.5" />
                                GitHub
                            </a>
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/20"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Hero ── */}
                <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 md:px-8 md:pt-24">
                    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
                        {/* left */}
                        <div>
                            <motion.div {...fadeUp(0)} className="mb-4 flex flex-wrap items-center gap-3">
                                <StatusDot status={project.status} />
                                {project.year && (
                                    <span className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-white/70">
                                        {project.year}
                                    </span>
                                )}
                            </motion.div>

                            <motion.h1
                                {...fadeUp(0.07)}
                                className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                            >
                                {project.title}
                            </motion.h1>

                            {project.tagline && (
                                <motion.p {...fadeUp(0.12)} className="mb-6 text-lg text-primary/90">
                                    {project.tagline}
                                </motion.p>
                            )}

                            <motion.p
                                {...fadeUp(0.16)}
                                className="max-w-2xl text-sm leading-8 text-white/70"
                            >
                                {project.longDescription ?? project.description}
                            </motion.p>

                            <motion.div {...fadeUp(0.2)} className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-primary hover:bg-primary/10"
                                >
                                    <FaGithub className="h-4 w-4" />
                                    View on GitHub
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary hover:text-background"
                                    >
                                        <Globe className="h-4 w-4" />
                                        Watch Demo
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                )}
                            </motion.div>
                        </div>

                        {/* right — cover image / stats */}
                        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4">
                            {/* Cover image */}
                            <div
                                className="h-52 w-full rounded-2xl border border-border bg-cover bg-center shadow-xl shadow-black/40"
                                style={{
                                    backgroundImage: hasGallery
                                        ? `url(${project.gallery![0]})`
                                        : project.image,
                                }}
                            />
                            {/* stat cards */}
                            <div className="grid grid-cols-2 gap-3">
                                <StatCard
                                    icon={<Calendar className="h-4 w-4" />}
                                    label="Year"
                                    value={project.year ?? "—"}
                                />
                                <StatCard
                                    icon={<Layers className="h-4 w-4" />}
                                    label="Tech stack"
                                    value={`${project.tags.length} technologies`}
                                />
                                <StatCard
                                    icon={<Zap className="h-4 w-4" />}
                                    label="Features"
                                    value={`${project.features?.length ?? 0} modules`}
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Gallery ── */}
                {hasGallery && project.gallery!.length > 1 && (
                    <section className="border-t border-border bg-white/[0.015] py-14">
                        <div className="mx-auto max-w-6xl px-4 md:px-8">
                            <SectionHeading icon={<Sparkles className="h-4 w-4" />} label="Screenshots" />
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                {project.gallery!.map((src, i) => (
                                    <motion.img
                                        key={i}
                                        src={src}
                                        alt={`${project.title} screenshot ${i + 1}`}
                                        className="w-full rounded-2xl border border-border object-cover shadow-lg shadow-black/30"
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.07, duration: 0.45 }}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Tech Stack ── */}
                <section className="border-t border-border py-16">
                    <div className="mx-auto max-w-6xl px-4 md:px-8">
                        <SectionHeading icon={<Box className="h-4 w-4" />} label="Tech Stack" />

                        <div className="space-y-8">
                            {coreTags.length > 0 && (
                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
                                        Core Technologies
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {coreTags.map((t) => <Tag key={t}>{t}</Tag>)}
                                    </div>
                                </div>
                            )}
                            {mlTags.length > 0 && (
                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
                                        Machine Learning & Data
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {mlTags.map((t) => <Tag key={t} accent>{t}</Tag>)}
                                    </div>
                                </div>
                            )}
                            {devopsTags.length > 0 && (
                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
                                        DevOps & Infrastructure
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {devopsTags.map((t) => <Tag key={t} accent>{t}</Tag>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                {project.features && project.features.length > 0 && (
                    <section className="border-t border-border bg-white/[0.015] py-16">
                        <div className="mx-auto max-w-6xl px-4 md:px-8">
                            <SectionHeading icon={<Sparkles className="h-4 w-4" />} label="Key Features" />
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {project.features.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05, duration: 0.4 }}
                                    >
                                        <FeatureCard text={f} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── DevOps Architecture ── */}
                {project.devops && (
                    <section className="border-t border-border py-16">
                        <div className="mx-auto max-w-6xl px-4 md:px-8">
                            <SectionHeading icon={<Server className="h-4 w-4" />} label="DevOps & Infrastructure" />

                            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                                {/* Pipeline steps */}
                                <div className="space-y-3">
                                    <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/60">
                                        Pipeline & Deployment Flow
                                    </p>
                                    {devopsLines.map((line, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -16 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.06, duration: 0.38 }}
                                            className="flex items-start gap-3 rounded-xl border border-border bg-black/30 px-4 py-3.5"
                                        >
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                                                {i + 1}
                                            </span>
                                            <p className="text-sm leading-6 text-white/70">{line}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Tool badges */}
                                <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
                                    <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/60">
                                        Infrastructure Stack
                                    </p>
                                    <div className="space-y-3">
                                        {[
                                            { icon: <GitBranch className="h-4 w-4" />, label: "CI/CD", val: "Jenkins (2 pipelines)" },
                                            { icon: <Package className="h-4 w-4" />, label: "Containerization", val: "Docker" },
                                            { icon: <Server className="h-4 w-4" />, label: "Orchestration", val: "Kubernetes (kubeadm)" },
                                            { icon: <Globe className="h-4 w-4" />, label: "Frontend Hosting", val: "Vercel (CDN)" },
                                            { icon: <Terminal className="h-4 w-4" />, label: "DNS / TLS", val: "Cloudflare" },
                                        ]
                                            .filter((row) =>
                                                project.tags.some((t) =>
                                                    row.val.toLowerCase().includes(t.toLowerCase()) ||
                                                    t.toLowerCase().includes(row.label.split(" ")[0].toLowerCase())
                                                )
                                            )
                                            .map((row) => (
                                                <div key={row.label} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                                                    <div className="flex items-center gap-2 text-white/70">
                                                        {row.icon}
                                                        <span className="text-xs">{row.label}</span>
                                                    </div>
                                                    <span className="text-xs font-semibold text-white">{row.val}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Footer nav ── */}
                <section className="border-t border-border py-16">
                    <div className="mx-auto max-w-6xl px-4 md:px-8">
                        <div className="flex flex-col items-center gap-6 text-center">
                            <p className="text-xs uppercase tracking-widest text-white/60">Explore More</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {projects
                                    .filter((p) => p.id !== project.id)
                                    .map((p) => (
                                        <Link
                                            key={p.id}
                                            to={`/${lang}/projects/${p.id}`}
                                            className="group rounded-2xl border border-border bg-white/[0.03] px-6 py-4 text-left transition duration-300 hover:border-primary/40 hover:bg-primary/5 min-w-[200px]"
                                        >
                                            <p className="mb-1 text-xs text-white/60 group-hover:text-primary">
                                                Next project
                                            </p>
                                            <p className="text-sm font-semibold text-white">{p.title}</p>
                                            <p className="mt-0.5 line-clamp-1 text-xs text-white/70">{p.tagline}</p>
                                        </Link>
                                    ))}
                            </div>
                            <Link
                                to={`/${lang}#projects`}
                                className="mt-2 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to all projects
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
