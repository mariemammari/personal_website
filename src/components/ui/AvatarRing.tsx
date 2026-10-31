import { motion } from "framer-motion";
import meImage from "../../assets/me1.png";

export function AvatarRing() {
    const blobShape = [
        "42% 58% 61% 39% / 45% 42% 58% 55%",
        "55% 45% 42% 58% / 52% 58% 42% 48%",
        "47% 53% 58% 42% / 60% 44% 56% 40%",
        "42% 58% 61% 39% / 45% 42% 58% 55%",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto flex aspect-square w-[min(80vw,380px)] items-center justify-center sm:w-[min(80vw,420px)] lg:w-[460px]"
        >
            {/* Ambient glow behind the floating frame */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-[#C051FF]/20 to-[#39BEFF]/20 blur-2xl"
                animate={{ borderRadius: blobShape, scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            />

            <motion.div
                aria-hidden="true"
                animate={{ y: [0, -9, 0], rotate: [-8, -5, -8] }}
                transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-[8%] translate-x-[5%] rounded-[42%_58%_61%_39%/45%_42%_58%_55%] border border-cyan-100/35 bg-gradient-to-br from-cyan-200/15 via-white/[0.04] to-fuchsia-300/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_20px_55px_rgba(57,190,255,0.16)] backdrop-blur-md"
            />
            <div
                aria-hidden="true"
                className="absolute inset-[5%] translate-x-[5%] rounded-[42%_58%_61%_39%/45%_42%_58%_55%] border border-fuchsia-100/15"
            />

            <span
                aria-hidden="true"
                className="absolute right-[10%] top-[19%] z-10 h-3 w-3 rounded-full border border-white/80 bg-cyan-100 shadow-[0_0_16px_4px_rgba(57,190,255,0.65)]"
            />

            {/* Portrait image */}
            <motion.div
                animate={{ borderRadius: blobShape }}
                transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
                className="relative flex aspect-square w-full items-center justify-center border border-white/30 bg-gradient-to-br from-white/30 via-white/10 to-white/20 p-2.5 shadow-[inset_1.5px_1.5px_0_rgba(255,255,255,0.55),inset_-1px_-1px_0_rgba(255,255,255,0.18),0_24px_60px_rgba(20,20,90,0.4)] backdrop-blur-xl"
            >
                <motion.div
                    animate={{ borderRadius: blobShape }}
                    transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
                    className="relative aspect-square w-full overflow-hidden ring-1 ring-white/35"
                >
                    <img
                        src={meImage}
                        alt="Mariem Ammari"
                        className="h-full w-full object-cover object-center"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/15 via-transparent to-[#39BEFF]/20"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_30px_8px_rgba(57,190,255,0.2)]"
                    />
                </motion.div>
            </motion.div>

        </motion.div>
    );
}
