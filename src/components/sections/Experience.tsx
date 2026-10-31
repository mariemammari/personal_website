import { experience } from "../../data/experience";
import { Timeline } from "../ui/Timeline";
import { useTranslation } from "react-i18next";

export function Experience() {
    const { t } = useTranslation();
    const visibleItems = experience;

    return (
        <section id="experience" className="mx-auto w-11/12 max-w-[1600px] py-20 xl:w-10/12">
            <div className="mb-10 max-w-2xl">
                <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#39BEFF]">{t("experience.title")}</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-5xl">{t("experience.heading")}</h2>
                <p className="mt-4 text-base leading-8 text-white/80">{t("experience.subtitle")}</p>
            </div>
            <Timeline items={visibleItems} />
        </section>
    );
}
