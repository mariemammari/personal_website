import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Blog } from "../components/sections/Blog";

export function BlogPage() {
    const { t } = useTranslation();
    const params = useParams();
    const lang = params.lang === "fr" ? "fr" : "en";

    return (
        <div className="min-h-screen bg-transparent text-white">
            <div className="border-b border-border bg-surface/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
                    <Link to={`/${lang}`} className="text-sm text-muted transition hover:text-white">
                        ← {t("blog.back")}
                    </Link>
                    <span className="text-xs tracking-[0.35em] text-secondary">{t("blog.label")}</span>
                </div>
            </div>
            <Blog />
            <Footer />
        </div>
    );
}
