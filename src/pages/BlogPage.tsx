import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Blog } from "../components/sections/Blog";

export function BlogPage() {
    const { t } = useTranslation();
    const params = useParams();
    const lang = params.lang === "fr" ? "fr" : "en";

    return (
        <div className="relative z-10 min-h-screen bg-transparent pt-24 text-ink">
            <div className="glass fixed inset-x-0 top-4 z-50 mx-4 rounded-full md:mx-8">
                <div className="mx-auto flex w-11/12 max-w-[1600px] items-center justify-between py-4 xl:w-10/12">
                    <Link to={`/${lang}`} className="text-sm text-ink transition hover:text-primary">
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
