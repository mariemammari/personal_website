import { motion } from "framer-motion";

export function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-background text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="relative flex flex-col items-center gap-6 px-6"
            >
                <div className="relative h-36 w-36 md:h-44 md:w-44">
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-dashed border-primary"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-6 rounded-full border border-dashed border-secondary"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-12 rounded-full bg-surface shadow-[0_0_80px_rgba(168,85,247,0.3)]"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
                <div className="text-center">
                    <p className="text-xs font-semibold tracking-[0.5em] text-secondary">LOADING</p>
                    <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                        Mariem<span className="text-primary">.</span>
                    </h1>
                </div>
                <div className="relative h-1.5 w-56 overflow-hidden rounded-full bg-white/10 md:w-72">
                    <motion.div
                        className="h-full w-1/2 rounded-full bg-linear-to-r from-primary via-secondary to-primary"
                        animate={{ x: ["-20%", "120%"] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
