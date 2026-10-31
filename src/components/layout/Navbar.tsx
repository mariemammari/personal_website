import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageToggle } from "../ui/LanguageToggle";

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

function openCommandPalette() {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
}

export function Navbar() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const lang = location.pathname.split("/")[1] === "fr" ? "fr" : "en";

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const links = baseLinks;
    const navClass = "glass";
    const handleSectionClick = (id: string) => {
        if (document.getElementById(id)) {
            scrollToSection(id);
            return;
        }
        navigate(`/${lang}#${id}`);
    };

    return (
        <motion.header
            className={`fixed inset-x-0 top-4 z-50 mx-4 rounded-full transition-colors duration-300 md:mx-8 ${navClass}`}
            initial={false}
            animate={{ y: 0 }}
        >
            <div className="mx-auto flex w-11/12 max-w-[1600px] items-center justify-between gap-4 py-3.5 xl:w-10/12">
                {/* Logo */}
                <button
                    type="button"
                    onClick={() => handleSectionClick("hero")}
                    className="flex items-baseline gap-1 text-xl font-semibold tracking-tight text-white"
                >
                    <span>Mariem Ammari</span>
                    <span className="text-primary">.</span>
                </button>

                {/* Desktop nav links */}
                <nav className="hidden items-center gap-8 md:flex">
                    {links.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSectionClick(item.id)}
                            className="relative text-base font-semibold text-white transition hover:text-secondary after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                        >
                            {t(`nav.${item.key}`)}
                        </button>
                    ))}
                </nav>

                {/* Right-side controls */}
                <div className="flex items-center gap-2">
                    {/* Social links — desktop */}
                    <div className="hidden items-center gap-2 md:flex">
                        <a
                            href="https://github.com/mariemammari"
                            target="_blank"
                            rel="noreferrer"
                            aria-label={t("hero.social.github")}
                            title={t("hero.social.github")}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-lg transition hover:-translate-y-0.5 hover:border-cyan-100/60 hover:bg-cyan-100/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-100"
                        >
                            <FaGithub className="h-4 w-4" />
                        </a>
                        <a
                            href="https://linkedin.com/in/mariem-ammari-0226833a7/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label={t("hero.social.linkedin")}
                            title={t("hero.social.linkedin")}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-lg transition hover:-translate-y-0.5 hover:border-cyan-100/60 hover:bg-cyan-100/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-100"
                        >
                            <FaLinkedinIn className="h-4 w-4" />
                        </a>
                    </div>

                    {/* ⌘K Search pill — desktop */}
                    <button
                        type="button"
                        onClick={openCommandPalette}
                        aria-label="Open command palette"
                        className="glass hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold  transition text-primary hover:text-secondary hover:border-primary/40 md:flex"
                    >
                        <Search className="h-3 w-3" />
                        <span >Search</span>
                        <kbd className="ml-1 rounded border border-primary/15 bg-primary/5 px-1 py-0.5 font-mono text-[10px] tracking-wide">
                            ⌘K
                        </kbd>
                    </button>

                    {/* Language toggle — desktop */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <LanguageToggle />
                    </div>

                    {/* Mobile: search icon button */}
                    <button
                        type="button"
                        onClick={openCommandPalette}
                        aria-label="Open command palette"
                        className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:border-primary hover:text-primary md:hidden"
                    >
                        <Search className="h-4 w-4" />
                    </button>

                    {/* Mobile: hamburger */}
                    <button
                        type="button"
                        className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:border-primary md:hidden"
                        onClick={() => setOpen((value) => !value)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
