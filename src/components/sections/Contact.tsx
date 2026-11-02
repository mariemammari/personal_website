import { Mail } from "lucide-react";
import { FaBehance, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { openEmailModal } from "../../utils/emailModal";
import { heroGlassButton } from "../ui/glassStyles";

export function Contact() {
    const { t } = useTranslation();
    const title = t("contact.professionalTitle");

    return (
        <section id="contact" className="mx-auto w-11/12 max-w-[1600px] py-16 md:py-20 xl:w-10/12">
            <div className="text-center">
                <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#39BEFF]">{t("contact.label")}</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-5xl">{title}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/80">{t("contact.subtitle")}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a href="https://github.com/mariemammari" target="_blank" rel="noreferrer" className={`${heroGlassButton} bg-white/10 hover:bg-white/20`}>
                        <FaGithub className="h-4 w-4" /> {t("contact.github")}
                    </a>
                    <a href="https://linkedin.com/in/mariem-ammari-0226833a7/" target="_blank" rel="noreferrer" className={`${heroGlassButton} bg-white/10 hover:bg-white/20`}>
                        <FaLinkedinIn className="h-4 w-4" /> {t("contact.linkedin")}
                    </a>
                    <a href="https://www.behance.net/ammarimariem" target="_blank" rel="noreferrer" className={`${heroGlassButton} bg-white/10 hover:bg-white/20`}>
                        <FaBehance className="h-4 w-4" /> {t("contact.behance")}
                    </a>
                    <button
                        type="button"
                        onClick={openEmailModal}
                        className={`${heroGlassButton} bg-gradient-to-br from-[#8ee9ff]/35 via-[#6f8cff]/25 to-[#d58cff]/35`}
                    >
                        <Mail className="h-4 w-4" /> {t("contact.email")}
                    </button>
                </div>
            </div>
        </section>
    );
}
