import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
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
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { scrollY } = useScroll();
    const location = useLocation();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 24);
    });

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const links = baseLinks;
    const navClass = isScrolled ? "border-border bg-surface/90 backdrop-blur-xl" : "border-transparent bg-transparent";

    return (
        <motion.header
            className={`sticky top-0 z-50 border-b transition-colors duration-300 ${navClass}`}
            initial={false}
            animate={{ y: 0 }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 md:px-6">
                {/* Logo */}
                <button
                    type="button"
                    onClick={() => scrollToSection("hero")}
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
                            onClick={() => scrollToSection(item.id)}
                            className="relative text-sm text-muted transition hover:text-white after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                        >
                            {t(`nav.${item.key}`)}
                        </button>
                    ))}
                </nav>

                {/* Right-side controls */}
                <div className="flex items-center gap-2">
                    {/* ⌘K Search pill — desktop */}
                    <button
                        type="button"
                        onClick={openCommandPalette}
                        aria-label="Open command palette"
                        className="hidden items-center gap-2 rounded-lg border border-border bg-white/4 px-3 py-1.5 text-xs text-muted/70 transition hover:border-primary/40 hover:bg-white/6 hover:text-white md:flex"
                    >
                        <Search className="h-3 w-3" />
                        <span>Search</span>
                        <kbd className="ml-1 rounded border border-border bg-black/30 px-1 py-0.5 text-[10px] tracking-wide">
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
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition hover:border-primary hover:text-white md:hidden"
                    >
                        <Search className="h-4 w-4" />
                    </button>

                    {/* Mobile: hamburger */}
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-white transition hover:border-primary md:hidden"
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
                        className="border-t border-border bg-surface/95 px-4 py-4 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col gap-3">
                            {links.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => { scrollToSection(item.id); setOpen(false); }}
                                    className="w-full rounded-2xl border border-border bg-white/5 px-4 py-3 text-left text-sm text-white transition hover:border-primary/40 hover:bg-primary/5"
                                >
                                    {t(`nav.${item.key}`)}
                                </button>
                            ))}
                            <div className="flex flex-wrap gap-3 border-t border-border pt-3">
                                <LanguageToggle />
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.header>
    );
}
