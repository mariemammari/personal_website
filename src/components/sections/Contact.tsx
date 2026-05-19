import { Mail } from "lucide-react";
import { FaBehance, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { openEmailModal } from "../../utils/emailModal";

export function Contact() {
    const { t } = useTranslation();
    const title = t("contact.professionalTitle");

    return (
        <section id="contact" className="mx-auto max-w-5xl border border-transparent px-4 py-20 text-center transition-[box-shadow,border-color,transform] duration-500 ease-out md:px-6">
            <p className="text-xs font-semibold tracking-[0.35em] text-secondary">{t("contact.label")}</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">{t("contact.subtitle")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="https://github.com/mariemammari" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary">
                    <FaGithub className="h-4 w-4 text-primary" /> {t("contact.github")}
                </a>
                <a href="https://linkedin.com/in/mariem-ammari-0226833a7/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-secondary">
                    <FaLinkedinIn className="h-4 w-4 text-secondary" /> {t("contact.linkedin")}
                </a>
                <a href="https://www.behance.net/ammarimariem" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary">
                    <FaBehance className="h-4 w-4 text-primary" /> {t("contact.behance")}
                </a>
                <button
                    type="button"
                    onClick={openEmailModal}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-secondary"
                >
                    <Mail className="h-4 w-4 text-secondary" /> {t("contact.email")}
                </button>
            </div>
        </section>
    );
}
