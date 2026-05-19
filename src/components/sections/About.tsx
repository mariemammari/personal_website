import { motion } from "framer-motion";
import { Globe2, Languages, GraduationCap, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

export function About() {
    const { t } = useTranslation();
    const paragraphs = t("about.professional", { returnObjects: true }) as string[];
    const stats = t("about.stats", { returnObjects: true }) as { value: string; label: string }[];

    return (
        <section id="about" className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
            <div className="grid gap-12 md:grid-cols-[1.4fr_0.9fr] md:gap-16">

                {/* Left — text column */}
                <div>
                    {/* Section label */}
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-secondary">
                        {t("about.title")}
                    </p>

                    {/* Heading */}
                    <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
                        {t("about.heading")}
                    </h2>

                    {/* Paragraphs — staggered reveal */}
                    <div className="mt-8 space-y-6">
                        {paragraphs.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.12 }}
                                className="text-[1.03rem] leading-8 text-white/75 md:text-[1.12rem] md:leading-9"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>

                    {/* Stats grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 grid grid-cols-2 gap-4 rounded-[24px] border border-border bg-surface/70 p-6 backdrop-blur-sm"
                    >
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col gap-1">
                                <span className="text-2xl font-bold text-primary">{stat.value}</span>
                                <span className="text-xs leading-relaxed text-white/45">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right — fact cards */}
                <div className="grid content-start gap-4 md:pt-8">
                    {[
                        { icon: Globe2, label: t("about.facts.based") },
                        { icon: Languages, label: t("about.facts.languages") },
                        { icon: GraduationCap, label: t("about.facts.student") },
                        { icon: Cpu, label: t("about.facts.years") },
                    ].map((fact, index) => (
                        <motion.div
                            key={fact.label}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="flex items-center gap-4 rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-surface"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                <fact.icon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm leading-relaxed text-white/80">{fact.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
