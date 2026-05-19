import { motion } from "framer-motion";
import type { ExperienceItem } from "../../data/experience";

export function Timeline({ items }: { items: ExperienceItem[] }) {
    return (
        <div className="relative space-y-8 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-secondary md:before:left-1/2 md:before:-translate-x-1/2">
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
                        <div className="absolute left-0 top-1 h-8 w-8 rounded-full border border-primary bg-surface shadow-lg shadow-primary/20 md:left-1/2 md:-translate-x-1/2" />
                        <div className={`w-full rounded-3xl border border-border bg-surface/90 p-6 md:w-[48%] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                            <p className="text-xs uppercase tracking-[0.28em] text-secondary">{item.date}</p>
                            <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                            <p className="mt-1 text-sm text-muted">{item.organization}</p>
                            <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-200">
                                {item.bullets.map((bullet) => (
                                    <li key={bullet} className="flex gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            {item.tags && item.tags.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-primary/90 transition-colors hover:border-primary/40 hover:bg-primary/10">
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
