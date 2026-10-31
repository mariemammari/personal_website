import { useTranslation } from "react-i18next";

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-white/15 py-8 text-center text-sm text-white/65">
            {t("footer.text")}
        </footer>
    );
}
