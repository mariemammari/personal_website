import { AnimatePresence, motion } from "framer-motion";
import {
    User,
    Briefcase,
    FolderGit2,
    Zap,
    Mail,
    FileText,
    Globe,
    X,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CONTACT_EMAIL } from "../../data/contact";
import { openEmailModal } from "../../utils/emailModal";
import i18n from "../../i18n";

type Command = {
    id: string;
    label: string;
    description?: string;
    icon: React.ComponentType<{ className?: string }>;
    group: string;
    action: () => void;
    keywords?: string;
};

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type CommandPaletteProps = {
    open: boolean;
    onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
    const { t } = useTranslation();
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const commands: Command[] = useMemo(() => [
        // Navigation
        {
            id: "go-about",
            label: t("nav.about"),
            description: "Jump to the About section",
            icon: User,
            group: "Navigate",
            keywords: "about who me",
            action: () => { scrollTo("about"); onClose(); },
        },
        {
            id: "go-projects",
            label: t("nav.projects"),
            description: "Jump to Projects",
            icon: FolderGit2,
            group: "Navigate",
            keywords: "projects portfolio code",
            action: () => { scrollTo("projects"); onClose(); },
        },
        {
            id: "go-experience",
            label: t("nav.experience"),
            description: "Jump to Experience",
            icon: Briefcase,
            group: "Navigate",
            keywords: "experience work internship",
            action: () => { scrollTo("experience"); onClose(); },
        },
        {
            id: "go-skills",
            label: t("nav.skills"),
            description: "Jump to Skills",
            icon: Zap,
            group: "Navigate",
            keywords: "skills stack tech",
            action: () => { scrollTo("skills"); onClose(); },
        },
        {
            id: "go-contact",
            label: t("nav.contact"),
            description: "Jump to Contact",
            icon: Mail,
            group: "Navigate",
            keywords: "contact email hire",
            action: () => { scrollTo("contact"); onClose(); },
        },
        // Actions
        {
            id: "open-cv-en",
            label: "Open CV — English",
            description: "View CV in English (PDF)",
            icon: FileText,
            group: "Actions",
            keywords: "cv resume english pdf",
            action: () => { window.open("/cv-en.pdf", "_blank"); onClose(); },
        },
        {
            id: "open-cv-fr",
            label: "Open CV — French",
            description: "Voir le CV en français (PDF)",
            icon: FileText,
            group: "Actions",
            keywords: "cv resume french pdf",
            action: () => { window.open("/cv-fr.pdf", "_blank"); onClose(); },
        },
        {
            id: "open-github",
            label: "GitHub",
            description: "github.com/mariemammari",
            icon: FaGithub,
            group: "Links",
            keywords: "github code repo",
            action: () => { window.open("https://github.com/mariemammari", "_blank"); onClose(); },
        },
        {
            id: "open-linkedin",
            label: "LinkedIn",
            description: "linkedin.com/in/mariem-ammari",
            icon: FaLinkedinIn,
            group: "Links",
            keywords: "linkedin network profile",
            action: () => { window.open("https://linkedin.com/in/mariem-ammari-0226833a7/", "_blank"); onClose(); },
        },
        {
            id: "open-email",
            label: "Email Mariem",
            description: CONTACT_EMAIL,
            icon: Mail,
            group: "Links",
            keywords: "email contact gmail",
            action: () => { openEmailModal(); onClose(); },
        },
        {
            id: "toggle-lang-en",
            label: "Switch language → English",
            icon: Globe,
            group: "Settings",
            keywords: "language english en",
            action: () => { void i18n.changeLanguage("en"); onClose(); },
        },
        {
            id: "toggle-lang-fr",
            label: "Switch language → Français",
            icon: Globe,
            group: "Settings",
            keywords: "language french fr",
            action: () => { void i18n.changeLanguage("fr"); onClose(); },
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [t]);

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return commands;
        return commands.filter((cmd) =>
            cmd.label.toLowerCase().includes(q) ||
            (cmd.description ?? "").toLowerCase().includes(q) ||
            (cmd.keywords ?? "").toLowerCase().includes(q) ||
            cmd.group.toLowerCase().includes(q)
        );
    }, [query, commands]);

    // Group results
    const groups = useMemo(() => {
        const map = new Map<string, Command[]>();
        for (const cmd of filtered) {
            if (!map.has(cmd.group)) map.set(cmd.group, []);
            map.get(cmd.group)!.push(cmd);
        }
        return map;
    }, [filtered]);

    // Reset on open
    useEffect(() => {
        if (open) {
            setQuery("");
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 30);
        }
    }, [open]);

    // Keyboard navigation
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                filtered[activeIndex]?.action();
            } else if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, filtered, activeIndex, onClose]);

    // Scroll active item into view
    useEffect(() => {
        const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement | null;
        el?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    // Keep activeIndex in range when filter changes
    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    // Flat index counter across groups
    let flatIndex = 0;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-xl overflow-hidden rounded-[20px] border border-border bg-surface/95 shadow-2xl shadow-black/70 backdrop-blur-xl"
                    >
                        {/* Search bar */}
                        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
                            <svg className="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search commands…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent text-sm text-white placeholder-muted/60 outline-none"
                            />
                            <button
                                onClick={onClose}
                                className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted transition hover:border-primary/50 hover:text-white"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* Results */}
                        <div ref={listRef} className="max-h-[380px] overflow-y-auto py-2">
                            {filtered.length === 0 ? (
                                <p className="px-4 py-8 text-center text-sm text-muted">No results for "{query}"</p>
                            ) : (
                                Array.from(groups.entries()).map(([group, cmds]) => (
                                    <div key={group}>
                                        <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted/60">
                                            {group}
                                        </p>
                                        {cmds.map((cmd) => {
                                            const idx = flatIndex++;
                                            const isActive = idx === activeIndex;
                                            return (
                                                <button
                                                    key={cmd.id}
                                                    type="button"
                                                    data-index={idx}
                                                    onMouseEnter={() => setActiveIndex(idx)}
                                                    onClick={cmd.action}
                                                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${isActive
                                                            ? "bg-primary/10 text-white"
                                                            : "text-white/70 hover:bg-white/5"
                                                        }`}
                                                >
                                                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${isActive ? "border-primary/40 bg-primary/15" : "border-border bg-white/5"}`}>
                                                        <cmd.icon className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted"}`} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium">{cmd.label}</p>
                                                        {cmd.description && (
                                                            <p className="truncate text-xs text-muted">{cmd.description}</p>
                                                        )}
                                                    </div>
                                                    {isActive && (
                                                        <kbd className="shrink-0 rounded border border-border bg-white/5 px-1.5 py-0.5 text-[10px] text-muted">
                                                            ↵
                                                        </kbd>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer hint */}
                        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[10px] text-muted">
                            <span><kbd className="rounded border border-border bg-white/5 px-1 py-0.5">↑↓</kbd> navigate</span>
                            <span><kbd className="rounded border border-border bg-white/5 px-1 py-0.5">↵</kbd> select</span>
                            <span><kbd className="rounded border border-border bg-white/5 px-1 py-0.5">Esc</kbd> close</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
