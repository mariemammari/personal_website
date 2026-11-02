import { motion } from "framer-motion";
import { skillCategoryOrder, skillCategoryTones, type SkillCategoryKey, type SkillTone } from "../../data/skills";
import { useTranslation } from "react-i18next";
import { heroGlassCard } from "../ui/glassStyles";

const toneStyles: Record<SkillTone, string> = {
    primary: "border-secondary/40 bg-primary-dim text-ink",
    secondary: "border-secondary/40 bg-primary-dim text-ink",
    success: "border-secondary/35 bg-primary-dim text-ink",
    amber: "border-secondary/35 bg-primary-dim text-ink",
    muted: "border-border border-secondary/35 bg-primary-dim text-ink",
};

export function Skills() {
    const { t } = useTranslation();
    const categories = t("skills.categories", { returnObjects: true }) as Record<SkillCategoryKey, { title: string; items: string[] }>;

    return (
        <section id="skills" className="mx-auto w-11/12 max-w-[1600px] py-16 md:py-20 xl:w-10/12">
            <div className="mb-10 max-w-2xl">
                <p className="font-mono text-base font-bold uppercase tracking-[0.25em] text-[#39BEFF]">{t("skills.title")}</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white/80 md:text-5xl">{t("skills.heading")}</h2>
                
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {skillCategoryOrder.map((categoryKey, index) => {
                    const category = categories[categoryKey];
                    return (
                    <motion.div
                        key={categoryKey}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06, duration: 0.45 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className={`${heroGlassCard} p-5`}
                    >
                        <h3 className="font-display text-2xl font-semibold text-secondary">{category.title}</h3>
                        <div className="mt-5 flex flex-wrap gap-3">
                            {category.items.map((item) => (
                                <span
                                    key={item}
                                    className={`inline-flex items-center rounded-full border px-4 py-2 font-mono text-sm ${toneStyles[skillCategoryTones[categoryKey]]}`}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
