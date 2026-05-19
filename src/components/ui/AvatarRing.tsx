import { motion } from "framer-motion";
import meImage from "../../assets/me1.png";

/** Tiny dot that orbits around the avatar ring */
function OrbitDot({
    size = 8,
    color = "bg-primary",
    radius,
    duration,
    startAngle = 0,
}: {
    size?: number;
    color?: string;
    radius: number;
    duration: number;
    startAngle?: number;
}) {
    return (
        <motion.span
            aria-hidden="true"
            className={`absolute rounded-full ${color} shadow-[0_0_6px_2px_currentColor]`}
            style={{ width: size, height: size, top: "50%", left: "50%" }}
            animate={{
                x: [
                    Math.cos((startAngle * Math.PI) / 180) * radius - size / 2,
                    Math.cos(((startAngle + 360) * Math.PI) / 180) * radius - size / 2,
                ],
                y: [
                    Math.sin((startAngle * Math.PI) / 180) * radius - size / 2,
                    Math.sin(((startAngle + 360) * Math.PI) / 180) * radius - size / 2,
                ],
            }}
            transition={{ duration, ease: "linear", repeat: Infinity }}
        />
    );
}

export function AvatarRing() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center sm:h-[320px] sm:w-[320px] md:h-[440px] md:w-[440px]"
        >
            {/* Outer ambient glow */}
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(147,197,253,0.08) 50%, transparent 70%)",
                }}
            />

            {/* Spinning dashed ring — outer */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-primary/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            />

            {/* Spinning dashed ring — inner (reverse) */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-6 rounded-full border-[1.5px] border-dashed border-secondary/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            />

            {/* Orbiting dots */}
            <OrbitDot color="bg-primary" radius={126} duration={6} startAngle={30} />
            <OrbitDot color="bg-secondary" size={6} radius={104} duration={9} startAngle={150} />
            <OrbitDot color="bg-primary/70" size={5} radius={126} duration={14} startAngle={240} />

            {/* Pulsing glow ring behind the image */}
            <motion.div
                aria-hidden="true"
                className="absolute h-48 w-48 rounded-full bg-primary/20 blur-2xl sm:h-60 sm:w-60 md:h-80 md:w-80"
                animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            />

            {/* Portrait image */}
            <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.28),rgba(14,10,24,0.97))] shadow-2xl shadow-primary/30 sm:h-60 sm:w-60 md:h-80 md:w-80">
                <img
                    src={meImage}
                    alt="Mariem Ammari"
                    className="h-full w-full object-cover object-center"
                />
                {/* Subtle inner vignette */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 65%)",
                    }}
                />
            </div>
        </motion.div>
    );
}
