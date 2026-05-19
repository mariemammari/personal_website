import { experience } from "../../data/experience";
import { Timeline } from "../ui/Timeline";
import { useTranslation } from "react-i18next";

export function Experience() {
    const { t } = useTranslation();
    const visibleItems = experience;

    return (
        <section id="experience" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
            <div className="mb-10 max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.35em] text-secondary">{t("experience.title")}</p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{t("experience.heading")}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{t("experience.subtitle")}</p>
            </div>
            <Timeline items={visibleItems} />
        </section>
    );
}
