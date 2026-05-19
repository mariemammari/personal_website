import { motion } from "framer-motion";

export function SplashScreen() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-6"
            >
                <div className="relative h-28 w-28">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-[spin_1.8s_linear_infinite]" />
                    <div className="absolute inset-4 rounded-full border border-dashed border-secondary animate-[spin_2.8s_linear_infinite_reverse]" />
                    <div className="absolute inset-9 rounded-full bg-surface shadow-[0_0_60px_rgba(168,85,247,0.35)]" />
                </div>
                <div className="text-center">
                    <p className="text-xs font-semibold tracking-[0.45em] text-secondary">LOADING</p>
                    <h1 className="mt-3 text-xl font-semibold text-white">Portfolio<span className="text-primary">.</span></h1>
                </div>
                <div className="h-1.5 w-44 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                        className="h-full w-1/2 rounded-full bg-linear-to-r from-primary via-secondary to-primary"
                        animate={{ x: ["-20%", "120%"] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
