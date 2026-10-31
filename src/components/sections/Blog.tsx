import { useTranslation } from "react-i18next";

export function Blog() {
    const { t } = useTranslation();

    return (
        <section className="mx-auto w-11/12 max-w-[1600px] py-20 xl:w-10/12">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#39BEFF]">{t("blog.label")}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-5xl">{t("blog.title")}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                {t("blog.description")}
            </p>
        </section>
    );
}
