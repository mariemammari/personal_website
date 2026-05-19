import { motion } from "framer-motion";
import { skillCategories, type SkillTone } from "../../data/skills";
import { useTranslation } from "react-i18next";

const toneStyles: Record<SkillTone, string> = {
    primary: "border-primary/40 bg-primary-dim text-white",
    secondary: "border-secondary/40 bg-secondary-dim text-white",
    success: "border-emerald-400/35 bg-emerald-500/10 text-emerald-100",
    amber: "border-amber-400/35 bg-amber-500/10 text-amber-100",
    muted: "border-border bg-white/5 text-muted",
};

export function Skills() {
    const { t } = useTranslation();
    const visibleCategories = skillCategories;

    return (
        <section id="skills" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
            <div className="mb-10 max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.35em] text-secondary">{t("skills.title")}</p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{t("skills.heading")}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{t("skills.subtitle")}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visibleCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06, duration: 0.45 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="rounded-[28px] border border-border bg-surface/90 p-6"
                    >
                        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                        <div className="mt-5 flex flex-wrap gap-3">
                            {category.items.map((item) => (
                                <span
                                    key={item}
                                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm ${toneStyles[category.tone]}`}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
