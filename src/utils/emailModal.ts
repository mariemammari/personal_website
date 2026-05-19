export const EMAIL_MODAL_EVENT = "open-email-modal";

export function openEmailModal() {
    window.dispatchEvent(new Event(EMAIL_MODAL_EVENT));
}
