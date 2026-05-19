import { useTranslation } from "react-i18next";

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-border py-8 text-center text-sm text-muted">
            {t("footer.text")}
        </footer>
    );
}
