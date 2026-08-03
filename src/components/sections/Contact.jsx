import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import { sendContactEmail } from "../../utils/sendEmail";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name looks too short";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message should be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const validate = () => {
    const e = {};
    Object.keys(form).forEach((key) => {
      const msg = validateField(key, form[key]);
      if (msg) e[key] = msg;
    });
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(validation).length > 0) return;

    setStatus("loading");
    try {
      await sendContactEmail(form);
      setStatus("success");
      setForm(initialForm);
      setTouched({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-28" aria-labelledby="contact-heading">
      <div className="section-container">
        <SectionHeading
          headingId="contact-heading"
          eyebrow="06 · Contact"
          title="Let's build something together"
          subtitle="Have an internship opening, freelance project, or just want to say hi? My inbox is open."
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-12">
          <div className="flex flex-col gap-4">
            <a
              href="mailto:rootedasad@gmail.com"
              className="surface-card rounded-2xl p-5 flex items-center gap-4 hover:border-primary/50 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl grid place-items-center bg-primary/15 text-primary">
                <FiMail size={18} />
              </span>
              <div>
                <div className="font-mono text-xs text-muted">Email</div>
                <div className="font-medium text-sm">rootedasad@gmail.com</div>
              </div>
            </a>

            <a
              href="tel:+923120611513"
              className="surface-card rounded-2xl p-5 flex items-center gap-4 hover:border-secondary/50 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl grid place-items-center bg-secondary/15 text-secondary">
                <FiPhone size={18} />
              </span>
              <div>
                <div className="font-mono text-xs text-muted">Phone</div>
                <div className="font-medium text-sm">+92 312 0611513</div>
              </div>
            </a>

            <div className="surface-card rounded-2xl p-5 flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl grid place-items-center bg-accent/15 text-accent">
                <FiMapPin size={18} />
              </span>
              <div>
                <div className="font-mono text-xs text-muted">Location</div>
                <div className="font-medium text-sm">Multan, Pakistan</div>
              </div>
            </div>

            <div className="surface-card rounded-2xl overflow-hidden h-52">
              <iframe
                title="Multan, Pakistan map"
                src="https://www.google.com/maps?q=Multan,Pakistan&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.3) invert(0.92) contrast(0.9)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="surface-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="font-mono text-xs text-muted block mb-2">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                  errors.name && touched.name
                    ? "border-red-400/60 focus:border-red-400"
                    : "border-white/10 focus:border-primary/60"
                }`}
                aria-invalid={!!(errors.name && touched.name)}
                aria-describedby={errors.name && touched.name ? "name-error" : undefined}
              />
              {errors.name && touched.name && (
                <p id="name-error" role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                  <FiAlertCircle size={12} aria-hidden="true" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="font-mono text-xs text-muted block mb-2">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@example.com"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                  errors.email && touched.email
                    ? "border-red-400/60 focus:border-red-400"
                    : "border-white/10 focus:border-primary/60"
                }`}
                aria-invalid={!!(errors.email && touched.email)}
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
              />
              {errors.email && touched.email && (
                <p id="email-error" role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                  <FiAlertCircle size={12} aria-hidden="true" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="font-mono text-xs text-muted flex items-center justify-between mb-2">
                <span>Message</span>
                <span className={form.message.length > 0 && form.message.trim().length < 10 ? "text-red-400" : "text-muted"}>
                  {form.message.length}/500
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={500}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell me about your project or opportunity..."
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none ${
                  errors.message && touched.message
                    ? "border-red-400/60 focus:border-red-400"
                    : "border-white/10 focus:border-primary/60"
                }`}
                aria-invalid={!!(errors.message && touched.message)}
                aria-describedby={errors.message && touched.message ? "message-error" : undefined}
              />
              {errors.message && touched.message && (
                <p id="message-error" role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                  <FiAlertCircle size={12} aria-hidden="true" /> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              className="mt-2 flex items-center justify-center gap-2 font-semibold text-sm text-white px-6 py-3.5 rounded-xl disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#4F8CFF,#22D3EE)" }}
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={15} aria-hidden="true" /> Send Message
                </>
              )}
            </button>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 bg-secondary/10 border border-secondary/25"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
                    className="w-8 h-8 rounded-full bg-secondary/20 grid place-items-center shrink-0"
                  >
                    <FiCheckCircle className="text-secondary" size={16} aria-hidden="true" />
                  </motion.span>
                  <p className="text-secondary text-sm font-mono leading-snug">
                    Message sent — I'll get back to you soon!
                  </p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  role="alert"
                  aria-live="assertive"
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 bg-red-400/10 border border-red-400/25"
                >
                  <span className="w-8 h-8 rounded-full bg-red-400/20 grid place-items-center shrink-0">
                    <FiAlertCircle className="text-red-400" size={16} aria-hidden="true" />
                  </span>
                  <p className="text-red-400 text-sm font-mono leading-snug">
                    Something went wrong — please email me directly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
