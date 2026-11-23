import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageToggle } from "../ui/LanguageToggle";
import meImage from "../../assets/me1.png";

type NavLink = {
    key: string;
    id: string;
};

const baseLinks: NavLink[] = [
    { key: "about", id: "about" },
    { key: "projects", id: "projects" },
    { key: "experience", id: "experience" },
    { key: "skills", id: "skills" },
    { key: "contact", id: "contact" },
];

function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const lang = location.pathname.split("/")[1] === "fr" ? "fr" : "en";

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    // Track scroll — avatar appears after scrolling past the hero (~500px)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 480);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = baseLinks;
    const handleSectionClick = (id: string) => {
        if (document.getElementById(id)) {
            scrollToSection(id);
            return;
        }
        navigate(`/${lang}#${id}`);
    };

    return (
        <motion.header
            className="glass fixed inset-x-0 top-3 z-50 mx-auto max-w-4xl rounded-full transition-colors duration-300 px-2"
            initial={false}
            animate={{ y: 0 }}
        >
            <div className="mx-auto flex items-center justify-between gap-3 py-2.5 px-4">
                {/* Logo — with scroll-in avatar */}
                <button
                    type="button"
                    onClick={() => handleSectionClick("hero")}
                    className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
                >
                    {/* Mini avatar — fades in after scroll */}
                    <AnimatePresence>
                        {scrolled && (
                            <motion.div
                                key="nav-avatar"
                                initial={{ opacity: 0, scale: 0.5, width: 0, marginRight: 0 }}
                                animate={{ opacity: 1, scale: 1, width: 28, marginRight: 4 }}
                                exit={{ opacity: 0, scale: 0.5, width: 0, marginRight: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="shrink-0 overflow-hidden rounded-full border border-secondary/50 shadow-[0_0_10px_rgba(137,231,248,0.30)]"
                                style={{ height: 28 }}
                            >
                                <img
                                    src={meImage}
                                    alt="Mariem Ammari"
                                    className="h-full w-full object-cover object-center"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <span className="flex items-baseline gap-0.5">
                        <span>Mariem Ammari</span>
                        <span className="text-secondary">.</span>
                    </span>
                </button>

                {/* Desktop nav links */}
                <nav className="hidden items-center gap-6 md:flex">
                    {links.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSectionClick(item.id)}
                            className="relative text-xs font-medium tracking-widest uppercase text-white/80 transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
                        >
                            {t(`nav.${item.key}`)}
                        </button>
                    ))}
                </nav>

                {/* Right-side controls */}
                <div className="flex items-center gap-2">
                    {/* Social links — desktop */}
                    <div className="hidden items-center gap-1.5 md:flex">
                        <a
                            href="https://github.com/mariemammari"
                            target="_blank"
                            rel="noreferrer"
                            aria-label={t("hero.social.github")}
                            title={t("hero.social.github")}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-secondary/10 hover:text-secondary"
                        >
                            <FaGithub className="h-3.5 w-3.5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/mariem-ammari-0226833a7/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label={t("hero.social.linkedin")}
                            title={t("hero.social.linkedin")}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-secondary/10 hover:text-secondary"
                        >
                            <FaLinkedinIn className="h-3.5 w-3.5" />
                        </a>
                    </div>

                    {/* Language toggle — desktop */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <LanguageToggle />
                    </div>

                    {/* Mobile: hamburger */}
                    <button
                        type="button"
                        className="glass flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:border-secondary hover:text-secondary md:hidden"
                        onClick={() => setOpen((value) => !value)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="glass mobile-menu-drawer rounded-3xl px-4 py-4 md:hidden"
                    >
                        <div className="flex flex-col gap-3">
                            {links.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => { handleSectionClick(item.id); setOpen(false); }}
                                    className="glass w-full rounded-2xl px-4 py-3 text-left text-base font-semibold text-ink transition hover:border-primary/40 hover:bg-primary/5"
                                >
                                    {t(`nav.${item.key}`)}
                                </button>
                            ))}
                            <div className="flex flex-wrap gap-3 border-t border-border pt-3">
                                <a
                                    href="https://github.com/mariemammari"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={t("hero.social.github")}
                                    title={t("hero.social.github")}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-ink transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    <FaGithub className="h-4 w-4" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/mariem-ammari-0226833a7/"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={t("hero.social.linkedin")}
                                    title={t("hero.social.linkedin")}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-ink transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    <FaLinkedinIn className="h-4 w-4" />
                                </a>
                                <LanguageToggle />
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.header>
    );
}
