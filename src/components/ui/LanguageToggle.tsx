import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function LanguageToggle() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const lang = params.lang === "fr" ? "fr" : "en";

    const languages = [
        { label: t("language.english"), value: "en" },
        { label: t("language.french"), value: "fr" },
    ] as const;

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const switchLanguage = (nextLang: "en" | "fr") => {
        const nextPath = location.pathname.replace(/^\/(en|fr)/, `/${nextLang}`) || `/${nextLang}`;
        navigate(nextPath + location.search + location.hash);
        setOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex items-center gap-2 rounded-full border border-secondary bg-surface/80 px-4 py-2 text-sm text-white shadow-lg shadow-black/20 transition hover:border-secondary/80"
            >
                <Globe className="h-4 w-4 text-secondary" />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
            </button>

            {open ? (
                <div className="absolute right-0 top-14 w-40 overflow-hidden rounded-2xl border border-border bg-surface/95 p-1 shadow-2xl shadow-black/40 backdrop-blur">
                    {languages.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => switchLanguage(item.value)}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/5 ${lang === item.value ? "text-secondary" : "text-muted"
                                }`}
                        >
                            {item.label}
                            {lang === item.value ? <span className="text-xs text-secondary">{t("language.active")}</span> : null}
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
