import { motion } from "framer-motion";

export function PageTransition() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] overflow-hidden bg-background/95 backdrop-blur-[1px]"
        >
            <motion.div
                className="absolute -left-32 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
                animate={{ x: [0, 180, 0], y: [-20, 20, -20], scale: [1, 1.12, 1] }}
                transition={{ duration: 2.8, repeat: 1, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -right-40 top-[8%] h-[34rem] w-[34rem] rounded-full bg-secondary/18 blur-3xl"
                animate={{ x: [0, -160, 0], y: [0, 120, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 3.1, repeat: 1, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-primary-dim via-transparent to-transparent opacity-70"
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 2.2, repeat: 1, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-secondary-dim via-transparent to-transparent opacity-70"
                animate={{ y: [0, -24, 0] }}
                transition={{ duration: 2.2, repeat: 1, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,10,24,0.12),rgba(7,6,13,0.88)_65%)]" />
        </motion.div>
    );
}
