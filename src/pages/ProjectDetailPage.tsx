import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Box,
    CheckCircle2,
    Package,
    GitBranch,
    Globe,
    Server,
    Sparkles,
    Terminal,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import i18n from "../i18n";
import { heroGlassButtonCompact, heroGlassCard, heroGlassPanel , heroGlassPanelMain} from "../components/ui/glassStyles";
import { Navbar } from "../components/layout/Navbar";

/* ─────────────── helpers ─────────────── */
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="mb-8 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-100/20 bg-cyan-100/10 text-cyan-100">
                {icon}
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-wide text-secondary">{label}</h2>
            <div className="ml-4 h-px flex-1 bg-white/15" />
        </div>
    );
}

function Tag({ children, accent = false }: { children: string; accent?: boolean }) {
    return (
        <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${accent
                ? "border-cyan-100/35 bg-cyan-100/10 font-mono text-cyan-50"
                : "border-white/15 bg-white/5 font-mono text-white/75"
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
        <div className={`rounded-2xl bg-white/20 backdrop-blur-2xl transition duration-300  group p-5`}>
            <div className="mb-2 flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-100" />
                <p className="text-sm font-semibold text-white">{heading}</p>
            </div>
            {body && <p className="pl-6 text-xs leading-6 text-white/75">{body}</p>}
        </div>
    );
}

/* ─────────────── main page ─────────────── */
export function ProjectDetailPage() {
    const { lang = "en", id } = useParams<{ lang: string; id: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Sync i18n language from URL param (fixes deep-link language bug)
    useEffect(() => {
        if (lang === "en" || lang === "fr") {
            void i18n.changeLanguage(lang);
            document.documentElement.lang = lang;
        }
    }, [lang]);

    const sourceProject = projects.find((p) => String(p.id) === id);
    const project = useMemo(() => {
        if (!sourceProject || lang !== "fr" || sourceProject.id === 5) return sourceProject;
        const localizedContent = t(`projects.items.${sourceProject.id}`, { returnObjects: true });
        if (!localizedContent || typeof localizedContent !== "object") return sourceProject;
        return { ...sourceProject, ...localizedContent as Partial<(typeof projects)[number]> };
    }, [sourceProject, lang, t]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [id]);

    useEffect(() => {
        if (!project) navigate(`/${lang}`, { replace: true });
    }, [project, lang, navigate]);

    // Redirect invalid lang params
    if (lang !== "en" && lang !== "fr") {
        return <Navigate to={`/en/projects/${id}`} replace />;
    }

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
        <div className="relative min-h-screen overflow-hidden text-white">
            <Navbar />
            <main className="relative z-10 mx-auto w-11/12 max-w-[1600px] pt-24 lg:h-screen lg:w-11/12 lg:overflow-hidden lg:pt-28 xl:w-11/12">
                <div className="grid gap-6 pb-8 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:pb-6">
                    <aside className={`${heroGlassPanelMain} flex flex-col gap-5 p-5 sm:p-7 lg:h-full lg:min-h-0 lg:overflow-y-hidden`}>
                        {project.year && (
                            <span className="w-fit rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/70">
                                {project.year}
                            </span>
                        )}
                        <div>
                            <motion.h1
                                {...fadeUp(0.07)}
                                className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl xl:text-5xl"
                            >
                                {project.title}
                            </motion.h1>
                            {project.tagline && (
                                <motion.p {...fadeUp(0.12)} className="mt-3 text-base leading-7 text-cyan-100 sm:text-lg">
                                    {project.tagline}
                                </motion.p>
                            )}
                        </div>
                        <motion.div
                            {...fadeUp(0.16)}
                            className={`${heroGlassCard} h-44 w-full shrink-0 bg-cover bg-center sm:h-56 lg:min-h-0 lg:flex-1`}
                            style={{
                                backgroundImage: hasGallery
                                    ? `url(${project.gallery![0]})`
                                    : project.image,
                            }}
                            role="img"
                            aria-label={`${project.title} ${t("projects.ui.projectPreview")}`}
                        />
                        <p className="line-clamp-4 text-sm leading-7 text-white/80">
                            {project.description}
                        </p>
                        <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-3">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className={heroGlassButtonCompact}
                            >
                                <FaGithub className="h-4 w-4" />
                                {t("projects.ui.viewGitHub")}
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`${heroGlassButtonCompact} border-cyan-100/35 bg-cyan-100/10 text-cyan-50 hover:bg-cyan-100/20`}
                                >
                                    <Globe className="h-4 w-4" />
                                    {t("projects.ui.visitWebsite")}
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            )}
                        </motion.div>
                    </aside>

                    <div className="min-w-0 space-y-6 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:pe-3 lg:pb-8 lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
                        <section>
                            <div className={`${heroGlassPanel} p-6 sm:p-8`}>
                                <SectionHeading icon={<Box className="h-5 w-5 text-secondary " />} label={t("projects.ui.projectDetails")} />
                                <p className="text-base leading-7 ">
                                    {project.longDescription ?? project.description}
                                </p>
                                {project.tags.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                                    </div>
                                )}
                                {project.role && (
                                    <div className={` mt-5 p-4 rounded-2xl bg-white/25 backdrop-blur-2xl transition duration-300 `}>
                                        <p className="mb-1.5 text-sm font-bold uppercase tracking-widest text-white/80 ">
                                            {t("projects.ui.myContribution")}
                                        </p>
                                        <p className="text-sm leading-6 text-white/90">{project.role}</p>
                                    </div>
                                )}
                            </div>
                        </section>

                {/* ── Gallery ── */}
                {hasGallery && project.gallery!.length > 1 && (
                    <section className="border-t border-white/10 py-14">
                        <div className="mx-auto w-12/12 max-w-[1600px] xl:w-12/12">
                            <div className={`${heroGlassPanel} p-6 sm:p-8`}>
                            <SectionHeading icon={<Sparkles className="h-4 w-4" />} label={t("projects.ui.screenshots")} />
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                {project.gallery!.map((src, i) => (
                                    <motion.img
                                        key={i}
                                        src={src}
                                        alt={`${project.title} ${t("projects.ui.screenshotAlt", { number: i + 1 })}`}
                                        className={`${heroGlassCard} w-full object-cover`}
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.07, duration: 0.45 }}
                                    />
                                ))}
                            </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Tech Stack ── */}
                <section className="border-t border-white/10 py-6">
                    <div className="mx-auto w-12/12 max-w-[1600px] xl:w-12/12">
                        <div className={`${heroGlassPanel} p-6 sm:p-8`}>
                        <SectionHeading icon={<Box className="h-4 w-4" />} label={t("projects.ui.techStack")} />

                        <div className="space-y-8">
                            {coreTags.length > 0 && (
                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/75">
                                        {t("projects.ui.coreTechnologies")}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {coreTags.map((t) => <Tag key={t}>{t}</Tag>)}
                                    </div>
                                </div>
                            )}
                            {mlTags.length > 0 && (
                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/65">
                                        {t("projects.ui.machineLearningData")}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {mlTags.map((t) => <Tag key={t} accent>{t}</Tag>)}
                                    </div>
                                </div>
                            )}
                            {devopsTags.length > 0 && (
                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/65">
                                        {t("projects.ui.devopsInfrastructure")}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {devopsTags.map((t) => <Tag key={t} accent>{t}</Tag>)}
                                    </div>
                                </div>
                            )}
                        </div>
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                {project.features && project.features.length > 0 && (
                    <section className="border-t border-white/10 py-16">
                        <div className="mx-auto w-12/12 max-w-[1600px] xl:w-12/12">
                            <div className={`${heroGlassPanel} p-6 sm:p-8`}>
                            <SectionHeading icon={<Sparkles className="h-4 w-4" />} label={t("projects.ui.keyFeatures")} />
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
                        </div>
                    </section>
                )}

                {/* ── DevOps Architecture ── */}
                {project.devops && (
                    <section className="border-t border-white/10 py-16">
                        <div className="mx-auto w-12/12 max-w-[1600px] xl:w-12/12">
                            <div className={`${heroGlassPanel} p-6 sm:p-8`}>
                            <SectionHeading icon={<Server className="h-4 w-4" />} label={t("projects.ui.devopsInfrastructure")} />

                            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                                {/* Pipeline steps */}
                                <div className="space-y-3">
                                    <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/65">
                                        {t("projects.ui.pipelineDeployment")}
                                    </p>
                                    {devopsLines.map((line, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -16 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.06, duration: 0.38 }}
                                            className={`rounded-2xl bg-white/20 backdrop-blur-2xl transition duration-300 flex items-start gap-3 px-4 py-3.5`}
                                        >
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-secondary-100/25 bg-secondary-100/10 text-[10px] font-bold text-secondary-100">
                                                {i + 1}
                                            </span>
                                            <p className="text-sm leading-6 text-white/90">{line}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Tool badges */}
                                <div className={`${heroGlassCard} p-6`}>
                                    <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary/05">
                                        {t("projects.ui.infrastructureStack")}
                                    </p>
                                    <div className="space-y-3">
                                        {[
                                            { icon: <GitBranch className="h-4 w-4" />, label: t("projects.ui.ciCd"), val: "Jenkins (2 pipelines)" },
                                            { icon: <Package className="h-4 w-4" />, label: t("projects.ui.containerization"), val: "Docker" },
                                            { icon: <Server className="h-4 w-4" />, label: t("projects.ui.orchestration"), val: "Kubernetes (kubeadm)" },
                                            { icon: <Globe className="h-4 w-4" />, label: t("projects.ui.frontendHosting"), val: "Vercel (CDN)" },
                                            { icon: <Terminal className="h-4 w-4" />, label: t("projects.ui.dnsTls"), val: "Cloudflare" },
                                        ]
                                            .filter((row) =>
                                                project.tags.some((t) =>
                                                    row.val.toLowerCase().includes(t.toLowerCase()) ||
                                                    t.toLowerCase().includes(row.label.split(" ")[0].toLowerCase())
                                                )
                                            )
                                            .map((row) => (
                                                <div key={row.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                                                    <div className="flex items-center gap-2 text-white/80">
                                                        {row.icon}
                                                        <span className="text-sm">{row.label}</span>
                                                    </div>
                                                    <span className="text-sm font-semibold text-white">{row.val}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
                )}

                    </div>
                </div>
            </main>
        </div>
    );
}
