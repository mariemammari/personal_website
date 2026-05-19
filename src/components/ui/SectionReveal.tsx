import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionRevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

/**
 * Wraps a section in a smooth fade-up reveal animation triggered
 * when the element enters the viewport. Use once=true so it only
 * fires on the first scroll-in (feels natural, not repetitive).
 */
export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
