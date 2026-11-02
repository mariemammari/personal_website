import { motion } from "framer-motion";
import type { ExperienceItem } from "../../data/experience";
import { heroGlassCard } from "./glassStyles";

export function Timeline({ items }: { items: ExperienceItem[] }) {
    return (
        <div className="relative space-y-8 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-100/70 before:via-white/30 before:to-fuchsia-200/50 md:before:left-1/2 md:before:-translate-x-1/2">
            {items.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                    <motion.article
                        key={item.id}
                        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55, delay: index * 0.08 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className={`relative pl-14 md:flex md:items-center ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                    >
                        <div className="absolute left-0 top-1 z-10 h-8 w-8 rounded-full border border-cyan-100/50 bg-[#8798d8] shadow-[0_0_0_5px_rgba(135,152,216,0.18),0_0_18px_rgba(57,190,255,0.25)] md:left-1/2 md:-translate-x-1/2" />
                        <div className={`${heroGlassCard} w-full p-5 md:w-[48%] md:p-6 ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                            <p className="text-sm uppercase tracking-[0.28em] text-secondary">{item.date}</p>
                            <h3 className="mt-2 font-display text-2xl font-semibold text-white">{item.title}</h3>
                            <p className="mt-1 text-base text-white/80">{item.organization}</p>
                            <ul className="mt-4 space-y-2 text-sm leading-6 text-white/80">
                                {item.bullets.map((bullet) => (
                                    <li key={bullet} className="flex gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            {item.tags && item.tags.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="rounded-full border border-white/25 bg-secondary/15 px-3 py-1 font-mono text-xs font-medium tracking-wide text-white transition-colors hover:border-cyan-100/40 hover:bg-cyan-100/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.article>
                );
            })}
        </div>
    );
}
