import { motion } from "framer-motion";
import { FileText, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AvatarRing } from "../ui/AvatarRing";
import { openEmailModal } from "../../utils/emailModal";

export function Hero() {
    const { t } = useTranslation();
    const glassBtn =
        "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full " +
        "border border-white/25 px-10 py-3.5 text-base font-semibold text-white " +
        "backdrop-blur-xl backdrop-saturate-[180%] backdrop-brightness-110 " +
        "shadow-[inset_1.5px_1.5px_0_rgba(255,255,255,0.5),inset_-1px_-1px_0_rgba(255,255,255,0.16),inset_0_0_24px_rgba(255,255,255,0.08),0_12px_32px_rgba(20,20,90,0.3)] " +
        "transition duration-200 hover:-translate-y-0.5 hover:border-white/45 " +
        "hover:shadow-[inset_1.5px_1.5px_0_rgba(255,255,255,0.7),inset_-1px_-1px_0_rgba(255,255,255,0.2),inset_0_0_28px_rgba(255,255,255,0.12),0_18px_40px_rgba(20,20,90,0.38)] " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 " +
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0";
    const glassGlare = (
        <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(120%_90%_at_0%_0%,rgba(255,255,255,0.35),transparent_55%)]"
        />
    );

    return (
        <section
            id="hero"
            className="relative mx-auto w-full max-w-8xl overflow-hidden px-10 py-35 "
        >
            {/* Inner max-width container */}
            <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">

                {/* Avatar Ã¢â‚¬â€ top on mobile, right on desktop */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative order-2 flex flex-col items-center justify-center gap-8 lg:col-span-5"
                >
                    <AvatarRing />
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-5"
                    >
                        <button
                            type="button"
                            onClick={openEmailModal}
                            className={`${glassBtn} bg-black/40 text-lg font-semibold text-primary hover:bg-white/50 hover:text-primary`}
                        >
                            <Mail className="h-6 w-6" />
                            {t("hero.ctaContact")}
                        </button>
                        <a
                            href={t("hero.cvDownloadHref")}
                            target="_blank"
                            rel="noreferrer"
                            className={`${glassBtn} text-lg border-[#8ee9ff]/90 bg-gradient-to-br from-[#8ee9ff]/60 via-[#6f8cff]/75 to-[#d58cff]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_32px_rgba(20,20,90,0.35)] hover:brightness-110`}
                        >
                            {glassGlare}
                            <FileText className="h-6 w-6" />
                            {t("hero.ctaViewCv")}
                        </a>

                    </motion.div>
                </motion.div>

                {/* Text content Ã¢â‚¬â€ bottom on mobile, left on desktop */}
                <div className="order-1 flex flex-col items-center gap-6 text-center lg:col-span-6 lg:items-start lg:text-left">
                    <div
                        className="flex w-full flex-col items-center gap-6 rounded-2xl border border-white/30 border-t-white/20 border-l-white/30 bg-gradient-to-br from-white/[15] via-white/[10] to-transparent p-5 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-2xl backdrop-saturate-100 sm:p-6 lg:items-start lg:p-8 lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                            className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/20  px-4 justify-content-center py-2 font-mono text-xs font-semibold text-secondary sm:text-sm"
                        >
                            {t("hero.internship")}
                        </motion.div>

                        {/* Greeting */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                            className="inline-flex items-center gap-2 font-mono text-base uppercase tracking-wider text-white sm:text-lg"
                        >
                            {t("hero.headlinePrefix")}
                        </motion.p>

                        {/* Name Ã¢â‚¬â€ elegant, gradient */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                            className="bg-gradient-to-r from-white via-[#39BEFF] to-[#C051FF] bg-clip-text font-sans text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
                        >
                            {t("hero.firstName")}{" "}
                            <span className="block sm:inline">{t("hero.lastName")}</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="flex max-w-2xl flex-col items-center gap-4 font-mono text-sm leading-relaxed tracking-wide text-white sm:text-base lg:items-start"
                        >
                            <p>{t("hero.roleLine")}</p>
                            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-lg">{t("hero.chips.fullstack")}</span>
                                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-lg">{t("hero.chips.devops")}</span>
                                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-lg">{t("hero.chips.ml")}</span>
                            </div>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white">
                                <MapPin aria-hidden="true" className="h-4 w-4 text-white" />
                                {t("about.facts.based")}
                            </span>
                        </motion.div>

                        <div aria-hidden="true" className="w-full border-t border-white/10" />

                        <motion.ol
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
                            className="relative flex w-full flex-col gap-0  text-left font-sans text-sm text-white before:absolute before:bottom-4 before:left-[11px] before:top-4 before:w-px before:bg-cyan-200/40 sm:text-base"
                        >
                            {[t("hero.proof.issat"), t("hero.proof.esprit")].map((step) => (
                                <li
                                    key={step}
                                    className="relative flex items-center gap-4 py-3"
                                >
                                    <span aria-hidden className="z-10 h-3 w-3 shrink-0 rounded-full border-2 border-cyan-100 bg-[#8798d8] shadow-[0_0_0_4px_rgba(135,152,216,0.18)]" />
                                    <span>{step}</span>
                                </li>
                            ))}
                        </motion.ol>

                    </div>
                </div>
            </div>

        </section>
    );
}
