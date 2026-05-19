import { useTranslation } from "react-i18next";

export function Blog() {
    const { t } = useTranslation();

    return (
        <section className="mx-auto max-w-4xl px-4 py-20 md:px-6">
            <p className="text-xs font-semibold tracking-[0.35em] text-secondary">{t("blog.label")}</p>
            <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">{t("blog.title")}</h1>
            <p className="mt-4 text-sm leading-7 text-muted md:text-base">
                {t("blog.description")}
            </p>
        </section>
    );
}
