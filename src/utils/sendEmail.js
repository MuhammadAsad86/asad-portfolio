import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends the contact form via EmailJS.
 * Requires a free EmailJS account — see README for setup steps.
 * Falls back to a mailto: link if EmailJS env vars are not configured,
 * so the form is never a dead end even before you connect a service.
 */
export async function sendContactEmail({ name, email, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:rootedasad@gmail.com?subject=${subject}&body=${body}`;
    return { fallback: true };
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: name,
      from_email: email,
      message,
      to_email: "rootedasad@gmail.com",
    },
    { publicKey: PUBLIC_KEY }
  );
}
