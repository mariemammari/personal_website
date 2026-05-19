import { motion } from "framer-motion";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";
import { Skills } from "../components/sections/Skills";
import { Experience } from "../components/sections/Experience";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { FloatingCTA } from "../components/ui/FloatingCTA";
import { SectionReveal } from "../components/ui/SectionReveal";

export function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
            >
                <Hero
                    onContactClick={() =>
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                />
                <SectionReveal>
                    <About />
                </SectionReveal>
                <SectionReveal delay={0.05}>
                    <Projects />
                </SectionReveal>
                <SectionReveal delay={0.05}>
                    <Experience />
                </SectionReveal>
                <SectionReveal delay={0.05}>
                    <Skills />
                </SectionReveal>
                <SectionReveal delay={0.05}>
                    <Contact />
                </SectionReveal>
                <Footer />
            </motion.main>
            <FloatingCTA />
        </div>
    );
}
