import { AnimatePresence, motion } from "framer-motion";
import { Copy, Mail } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function copyToClipboard(value: string) {
    if (navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(value).then(() => true).catch(() => false);
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return Promise.resolve(ok);
}

type EmailModalProps = {
    open: boolean;
    onClose: () => void;
    email: string;
};

export function EmailModal({ open, onClose, email }: EmailModalProps) {
    const [copied, setCopied] = useState(false);
    const [name, setName] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [message, setMessage] = useState("");
    const resetTimer = useRef<number | null>(null);
    const mailto = `mailto:${email}`;

    useEffect(() => {
        if (!open) {
            setCopied(false);
            setName("");
            setFromEmail("");
            setMessage("");
        }
    }, [open]);

    useEffect(() => {
        if (!open) return undefined;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    useEffect(() => () => {
        if (resetTimer.current) {
            window.clearTimeout(resetTimer.current);
        }
    }, []);

    const handleCopy = async () => {
        const ok = await copyToClipboard(email);
        if (!ok) return;
        setCopied(true);
        if (resetTimer.current) {
            window.clearTimeout(resetTimer.current);
        }
        resetTimer.current = window.setTimeout(() => setCopied(false), 1600);
    };

    const mailtoLink = useMemo(() => {
        const subjectName = name.trim();
        const subject = subjectName ? `Portfolio inquiry from ${subjectName}` : "Portfolio inquiry";
        const lines: string[] = [];
        if (subjectName) lines.push(`Name: ${subjectName}`);
        if (fromEmail.trim()) lines.push(`Email: ${fromEmail.trim()}`);
        if (message.trim()) {
            lines.push("");
            lines.push(message.trim());
        }

        const params = new URLSearchParams();
        params.set("subject", subject);
        if (lines.length > 0) {
            params.set("body", lines.join("\n"));
        }

        const query = params.toString();
        return query ? `${mailto}?${query}` : mailto;
    }, [mailto, name, fromEmail, message]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.location.href = mailtoLink;
    };

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        onClick={(event) => event.stopPropagation()}
                        className="glass w-full max-w-2xl rounded-3xl p-7"
                    >
                        <p className="text-xs font-semibold tracking-[0.35em] text-secondary">GET IN TOUCH</p>
                        <h3 className="mt-3 text-2xl font-semibold text-ink">Get in Touch</h3>

                        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
                                    Name
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        className="h-12 rounded-xl border border-border bg-primary/5 px-4 text-sm text-ink placeholder-muted/70 outline-none transition focus:border-primary/60"
                                    />
                                </label>
                                <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
                                    Email Address
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={fromEmail}
                                        onChange={(event) => setFromEmail(event.target.value)}
                                        className="h-12 rounded-xl border border-border bg-primary/5 px-4 text-sm text-ink placeholder-muted/70 outline-none transition focus:border-primary/60"
                                    />
                                </label>
                            </div>

                            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
                                Content
                                <textarea
                                    placeholder="Your message"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    className="min-h-[140px] rounded-xl border border-border bg-primary/5 px-4 py-3 text-sm text-ink placeholder-muted/70 outline-none transition focus:border-primary/60"
                                />
                            </label>

                            <button
                                type="submit"
                                className="glass inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-ink transition hover:border-primary/40"
                            >
                                Send Email →
                            </button>
                        </form>

                        <div className="glass mt-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3 text-sm text-ink/70">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-secondary" />
                                <span>Email: {email}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="glass inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-primary/40"
                            >
                                <Copy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-5 text-xs uppercase tracking-[0.3em] text-muted transition hover:text-primary"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
