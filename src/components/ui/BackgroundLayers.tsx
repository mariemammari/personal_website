import { motion } from "framer-motion";

const baseBackground =
    "radial-gradient(circle at 50% 28%, rgba(168, 85, 247, 0.22), transparent 24%), radial-gradient(circle at 82% 18%, rgba(147, 197, 253, 0.12), transparent 20%), radial-gradient(circle at 18% 80%, rgba(168, 85, 247, 0.08), transparent 28%)";

const hazeBackground =
    "radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.22), transparent 0 28%), radial-gradient(circle at 50% 30%, var(--haze), transparent 0 34%), radial-gradient(circle at 18% 18%, rgba(168, 85, 247, 0.18), transparent 0 26%), radial-gradient(circle at 82% 16%, rgba(147, 197, 253, 0.12), transparent 0 22%), radial-gradient(circle at 50% 84%, rgba(168, 85, 247, 0.08), transparent 0 30%), linear-gradient(135deg, rgba(168, 85, 247, 0.06) 18%, transparent 36%, rgba(147, 197, 253, 0.05) 55%, transparent 72%), radial-gradient(circle, rgba(255, 255, 255, 0.12) 1.2px, transparent 1.2px), radial-gradient(circle, rgba(147, 197, 253, 0.1) 1px, transparent 1px)";

const hazeSizes = "auto, auto, auto, auto, auto, auto, 96px 96px, 72px 72px";

const overlayBackground = "linear-gradient(180deg, rgba(7, 6, 13, 0.12), rgba(7, 6, 13, 0.35))";

export function BackgroundLayers() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: baseBackground,
                    backgroundColor: "var(--background)",
                }}
            />
            <motion.div
                className="absolute inset-0 opacity-80 blur-sm mix-blend-screen"
                style={{
                    backgroundImage: hazeBackground,
                    backgroundSize: hazeSizes,
                }}
                animate={{
                    y: [0, -20],
                    scale: [1, 1.02],
                    backgroundPosition: [
                        "center, center, center, center, center, center, 0 0, 0 0",
                        "center, center, center, center, center, center, 96px 96px, 72px 72px",
                    ],
                }}
                transition={{
                    duration: 18,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: overlayBackground,
                }}
            />
        </div>
    );
}
