import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CountUpValue({ value, reducedMotion }: { value: string; reducedMotion: boolean }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.8 });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (current) => Math.round(current).toString());
    const match = value.match(/^([^0-9]*)(\d+)(.*)$/);

    useEffect(() => {
        if (!inView || reducedMotion || !match) return;
        const controls = animate(count, Number(match[2]), { duration: 1.1, ease: "easeOut" });
        return () => controls.stop();
    }, [count, inView, match, reducedMotion]);

    if (!match || reducedMotion) {
        return <span ref={ref}>{value}</span>;
    }

    return (
        <span ref={ref} aria-label={value}>
            {match[1]}
            <motion.span aria-hidden="true">{rounded}</motion.span>
            {match[3]}
        </span>
    );
}

export function About() {
    const { t } = useTranslation();
    const paragraphs = t("about.professional", { returnObjects: true }) as string[];
    const stats = t("about.stats", { returnObjects: true }) as { value: string; label: string }[];
    const reducedMotion = useReducedMotion() ?? false;
    const reveal = (index: number) => ({
        initial: reducedMotion ? false : { opacity: 0, y: 24 },
        whileInView: reducedMotion ? undefined : { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: reducedMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: "easeOut" as const, delay: index * 0.08 },
    });

    return (
        <section id="about" className="relative mx-auto w-11/12 max-w-[1600px] py-20 md:py-28 xl:w-10/12">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-secondary">
                {t("about.title")}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
                {t("about.heading")}
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
                <motion.article
                    {...reveal(0)}
                    className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-7"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-16 -end-12 h-48 w-48 rounded-tl-full bg-[var(--cyan)]/15"
                    />
                    <div className="relative z-10">
                        <div className="space-y-4 text-base leading-8 text-white">
                            <p>{paragraphs[0]}</p>
                            <p>{paragraphs[1]}</p>
                        </div>
                        <blockquote className="mt-8 border-s-2 border-[var(--cyan)] ps-5 font-display text-xl leading-relaxed text-white sm:text-2xl">
                            {t("about.quoteStart")}
                            <span className="bg-gradient-to-r from-[var(--cyan)] to-[var(--orchid)] bg-clip-text font-semibold text-transparent">
                                {t("about.quoteHighlight")}
                            </span>
                            {t("about.quoteEnd")}
                        </blockquote>
                    </div>
                </motion.article>

                <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                    <motion.article
                        {...reveal(1)}
                        className="glass relative flex min-h-36 items-center gap-4 overflow-hidden rounded-3xl p-6"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-12 -end-12 h-36 w-36 rounded-tl-full bg-[var(--cyan)]/20"
                        />
                        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                            <MapPin className="h-5 w-5 text-[var(--cyan)]" />
                        </span>
                        <span className="relative text-base font-semibold text-white sm:text-lg">
                            {t("about.facts.based")}
                        </span>
                    </motion.article>

                    <motion.article
                        {...reveal(2)}
                        className="glass flex min-h-36 flex-col justify-center rounded-3xl p-6"
                    >
                        <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            {t("about.languagesTitle")}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {["arabic", "french", "english"].map((language) => (
                                <span
                                    key={language}
                                    className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white"
                                >
                                    {t(`about.languages.${language}`)}
                                </span>
                            ))}
                        </div>
                    </motion.article>
                </div>

                <motion.div
                    {...reveal(3)}
                    className="glass grid grid-cols-2 overflow-hidden rounded-3xl p-3 sm:p-5 lg:col-span-12 lg:grid-cols-4"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`relative flex min-h-28 flex-col justify-center gap-1 px-4 py-4 text-center sm:px-6 ${
                                index % 2 === 1 ? "border-s border-white/15" : ""
                            } ${
                                index > 1 ? "border-t border-white/15 lg:border-t-0" : ""
                            } ${index > 0 ? "lg:border-s lg:border-white/15" : ""}`}
                        >
                            <span className="font-display text-xl font-bold leading-tight text-secondary lg:text-2xl">
                                <CountUpValue value={stat.value} reducedMotion={reducedMotion} />
                            </span>
                            <span className="mt-2 text-xs uppercase tracking-wider text-white">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                <motion.article
                    {...reveal(4)}
                    className="glass rounded-3xl p-6 sm:p-8 lg:col-span-12"
                >
                    <h3 className="mb-7 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        {t("about.educationTitle")}
                    </h3>
                    <ol className="relative flex flex-col gap-7 before:absolute before:bottom-2 before:start-[6px] before:top-2 before:w-px before:bg-gradient-to-b before:from-[var(--cyan)] before:to-[var(--orchid)] md:flex-row md:gap-6 md:before:bottom-auto md:before:end-[8%] md:before:start-[8%] md:before:top-[7px] md:before:h-px md:before:w-auto">
                        {[t("about.facts.years"), t("about.facts.student")].map((education, index) => (
                            <li
                                key={education}
                                className="relative flex items-start gap-4 ps-8 md:flex-1 md:flex-col md:items-center md:gap-4 md:ps-0 md:text-center"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute start-0 top-1 z-10 h-3.5 w-3.5 rounded-full border border-white/40 bg-[var(--cyan)] shadow-[0_0_0_4px_rgba(137,231,248,0.12)] md:static"
                                />
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold leading-relaxed text-white sm:text-base">
                                        {education}
                                    </span>
                                    {index === 1 && (
                                        <span className="inline-flex items-center gap-2 text-xs font-medium text-white md:justify-center">
                                            <span className="pulse-dot" aria-hidden="true" />
                                            {t("about.now")}
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </motion.article>
            </div>
        </section>
    );
}
