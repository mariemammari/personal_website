import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AvatarRing } from "../ui/AvatarRing";
import { openEmailModal } from "../../utils/emailModal";

type HeroProps = {
    onContactClick: () => void;
};

export function Hero({ onContactClick }: HeroProps) {
    const { t } = useTranslation();
    const subtitleItems = t("hero.subtitles", { returnObjects: true }) as string[];
    const subtitles = subtitleItems.length > 0 ? subtitleItems : [""];
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const [cvOpen, setCvOpen] = useState(false);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        }, 2800);
        return () => window.clearInterval(timer);
    }, [subtitles.length]);

    useEffect(() => {
        if (!cvOpen) return undefined;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setCvOpen(false);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [cvOpen]);

    return (
        <section
            id="hero"
            className="relative w-full overflow-hidden px-4 pt-4 pb-12 sm:px-6 sm:pt-8 sm:pb-16 md:pt-12 md:pb-24 lg:px-8"
        >
            {/* Animated background grid */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(147, 197, 253, 0.18) 1px, transparent 1.2px), radial-gradient(circle, rgba(168, 85, 247, 0.16) 1px, transparent 1.2px), repeating-linear-gradient(120deg, rgba(168, 85, 247, 0.08) 0 1px, transparent 1px 90px), repeating-linear-gradient(60deg, rgba(147, 197, 253, 0.07) 0 1px, transparent 1px 110px)",
                        backgroundSize: "180px 180px, 260px 260px, 200px 200px, 240px 240px",
                    }}
                    animate={{
                        backgroundPosition: [
                            "0 0, 40px 30px, 0 0, 0 0",
                            "40px 20px, 0 30px, 120px 60px, 90px 120px",
                        ],
                    }}
                    transition={{ duration: 16, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                />
            </div>

            {/* Inner max-width container */}
            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">

                {/* Avatar — top on mobile, right on desktop */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="order-1 flex shrink-0 justify-center md:order-2 md:flex-1"
                >
                    <AvatarRing />
                </motion.div>

                {/* Text content — bottom on mobile, left on desktop */}
                <div className="order-2 flex flex-col items-center gap-9 text-center md:order-1 md:flex-1 md:items-start md:text-left">

                    {/* Greeting */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                        className="text-base font-medium tracking-wide text-white/70 md:text-lg"
                    >
                        {t("hero.headlinePrefix")}
                    </motion.p>

                    {/* Name — elegant, gradient */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                        className="text-4xl font-bold leading-[1.2] tracking-tight bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        {t("hero.firstName")}{" "}
                        <span className="block sm:inline">{t("hero.lastName")}</span>
                    </motion.h1>

                    {/* Animated rotating subtitle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="h-7 w-full overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={subtitleIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="text-base font-medium text-secondary sm:text-lg"
                            >
                                {subtitles[subtitleIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>

                    {/* Specialties description */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
                        className="max-w-xl text-sm leading-8 text-white/60 sm:text-base sm:leading-[1.9]"
                    >
                        {t("hero.specialties")}
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
                        className="flex flex-wrap justify-center gap-4 md:justify-start"
                    >
                        <button
                            type="button"
                            onClick={() => setCvOpen(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.04] hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                        >
                            {t("hero.ctaPrimary")} <ArrowRight className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onContactClick();
                                openEmailModal();
                            }}
                            className="inline-flex items-center gap-2 rounded-full border border-secondary/60 px-7 py-3 text-sm font-semibold text-secondary transition-all hover:bg-secondary/10 hover:border-secondary"
                        >
                            {t("hero.ctaSecondary")}
                        </button>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40 md:justify-start"
                    >
                        <a
                            className="inline-flex items-center gap-2 transition-colors hover:text-white"
                            href="https://github.com/mariemammari"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub className="h-4 w-4 text-primary" /> {t("hero.social.github")}
                        </a>
                        <a
                            className="inline-flex items-center gap-2 transition-colors hover:text-white"
                            href="https://linkedin.com/in/mariem-ammari-0226833a7/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaLinkedinIn className="h-4 w-4 text-secondary" /> {t("hero.social.linkedin")}
                        </a>
                        <button
                            type="button"
                            onClick={openEmailModal}
                            className="inline-flex items-center gap-2 transition-colors hover:text-white"
                        >
                            <Mail className="h-4 w-4 text-primary" /> {t("hero.social.email")}
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* CV Modal */}
            <AnimatePresence>
                {cvOpen ? (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCvOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 8 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            onClick={(event) => event.stopPropagation()}
                            className="w-full max-w-sm rounded-[28px] border border-border bg-surface/95 p-7 text-center shadow-2xl shadow-black/60 backdrop-blur"
                        >
                            <p className="text-xs font-semibold tracking-[0.35em] text-secondary">{t("hero.cvLabel")}</p>
                            <h3 className="mt-3 text-xl font-semibold text-white">{t("hero.cvTitle")}</h3>
                            <p className="mt-2 text-sm text-muted">{t("hero.cvSubtitle")}</p>
                            <div className="mt-6 grid gap-3">
                                <a
                                    href="/cv-en.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary bg-secondary-dim px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary hover:text-background"
                                >
                                    {t("hero.cvEnglish")}
                                </a>
                                <a
                                    href="/cv-fr.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-primary-dim px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary"
                                >
                                    {t("hero.cvFrench")}
                                </a>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCvOpen(false)}
                                className="mt-5 text-xs uppercase tracking-[0.3em] text-muted transition hover:text-white"
                            >
                                {t("hero.cvClose")}
                            </button>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </section>
    );
}
