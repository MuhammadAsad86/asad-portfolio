import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import SectionHeading from "../ui/SectionHeading";
import { sendContactEmail } from "../../utils/sendEmail";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name looks too short";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Enter a valid email address";
        }

        return "";

      case "message":
        if (!value.trim()) return "Message is required";

        if (value.trim().length < 10) {
          return "Message should be at least 10 characters";
        }

        return "";

      default:
        return "";
    }
  };

  const validate = () => {
    const e = {};

    Object.keys(form).forEach((key) => {
      const msg = validateField(key, form[key]);

      if (msg) {
        e[key] = msg;
      }
    });

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((t) => ({
      ...t,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();

    setErrors(validation);

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (Object.keys(validation).length > 0) return;

    setStatus("loading");

    try {
      await sendContactEmail(form);

      setStatus("success");
      setForm(initialForm);
      setTouched({});

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch {
      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      className="py-28"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <SectionHeading
          headingId="contact-heading"
          eyebrow="06 · Contact"
          title="Let's build something together"
          subtitle="Have an internship opening, freelance project, or just want to say hi? My inbox is open."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4">
            {/* EMAIL */}
            <motion.a
              href="mailto:rootedasad@gmail.com"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                delay: 0,
              }}
              whileHover={{
                y: -5,
                scale: 1.01,
              }}
              className="surface-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-primary/50"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <FiMail size={18} />
              </span>

              <div>
                <div className="font-mono text-xs text-muted">
                  Email
                </div>

                <div className="text-sm font-medium">
                  rootedasad@gmail.com
                </div>
              </div>
            </motion.a>

            {/* PHONE */}
            <motion.a
              href="tel:+923120611513"
              initial={{
                opacity: 0,
                y: 55,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -5,
                scale: 1.01,
              }}
              className="surface-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-secondary/50"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/15 text-secondary">
                <FiPhone size={18} />
              </span>

              <div>
                <div className="font-mono text-xs text-muted">
                  Phone
                </div>

                <div className="text-sm font-medium">
                  +92 312 0611513
                </div>
              </div>
            </motion.a>

            {/* LOCATION */}
            <motion.div
              initial={{
                opacity: 0,
                y: 55,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -5,
                scale: 1.01,
              }}
              className="surface-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent/50"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <FiMapPin size={18} />
              </span>

              <div>
                <div className="font-mono text-xs text-muted">
                  Location
                </div>

                <div className="text-sm font-medium">
                  Multan, Pakistan
                </div>
              </div>
            </motion.div>

            {/* MAP */}
            <motion.div
              initial={{
                opacity: 0,
                y: 60,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 1,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="surface-card h-52 overflow-hidden rounded-2xl"
            >
              <iframe
                title="Multan, Pakistan map"
                src="https://www.google.com/maps?q=Multan,Pakistan&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    "grayscale(0.3) invert(0.92) contrast(0.9)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* CONTACT FORM */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{
              opacity: 0,
              y: 65,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="surface-card flex flex-col gap-6 rounded-2xl p-6 sm:p-8"
          >
            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-mono text-xs text-muted"
              >
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
                className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm outline-none transition-colors ${
                  errors.name && touched.name
                    ? "border-red-400/60 focus:border-red-400"
                    : "border-white/10 focus:border-primary/60"
                }`}
                aria-invalid={!!(errors.name && touched.name)}
                aria-describedby={
                  errors.name && touched.name
                    ? "name-error"
                    : undefined
                }
              />

              {errors.name && touched.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                >
                  <FiAlertCircle size={12} aria-hidden="true" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-xs text-muted"
              >
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
                className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm outline-none transition-colors ${
                  errors.email && touched.email
                    ? "border-red-400/60 focus:border-red-400"
                    : "border-white/10 focus:border-primary/60"
                }`}
                aria-invalid={!!(errors.email && touched.email)}
                aria-describedby={
                  errors.email && touched.email
                    ? "email-error"
                    : undefined
                }
              />

              {errors.email && touched.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                >
                  <FiAlertCircle size={12} aria-hidden="true" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* MESSAGE */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 flex items-center justify-between font-mono text-xs text-muted"
              >
                <span>Message</span>

                <span
                  className={
                    form.message.length > 0 &&
                    form.message.trim().length < 10
                      ? "text-red-400"
                      : "text-muted"
                  }
                >
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
                className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-sm outline-none transition-colors ${
                  errors.message && touched.message
                    ? "border-red-400/60 focus:border-red-400"
                    : "border-white/10 focus:border-primary/60"
                }`}
                aria-invalid={!!(errors.message && touched.message)}
                aria-describedby={
                  errors.message && touched.message
                    ? "message-error"
                    : undefined
                }
              />

              {errors.message && touched.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                >
                  <FiAlertCircle size={12} aria-hidden="true" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <motion.button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              whileHover={{
                scale: status === "loading" ? 1 : 1.01,
                y: status === "loading" ? 0 : -2,
              }}
              whileTap={{
                scale: status === "loading" ? 1 : 0.98,
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(135deg,#4F8CFF,#22D3EE)",
              }}
            >
              {status === "loading" ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden="true"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={15} aria-hidden="true" />
                  Send Message
                </>
              )}
            </motion.button>

            {/* STATUS MESSAGE */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-3 rounded-xl border border-secondary/25 bg-secondary/10 px-4 py-3.5"
                >
                  <motion.span
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary/20"
                  >
                    <FiCheckCircle
                      className="text-secondary"
                      size={16}
                      aria-hidden="true"
                    />
                  </motion.span>

                  <p className="font-mono text-sm leading-snug text-secondary">
                    Message sent, I'll get back to you soon!
                  </p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  role="alert"
                  aria-live="assertive"
                  className="flex items-center gap-3 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3.5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-400/20">
                    <FiAlertCircle
                      className="text-red-400"
                      size={16}
                      aria-hidden="true"
                    />
                  </span>

                  <p className="font-mono text-sm leading-snug text-red-400">
                    Something went wrong, please email me directly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}