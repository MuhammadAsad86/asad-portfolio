import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

import SectionHeading from "../ui/SectionHeading";
import { certificates } from "../../data/experience";

export default function Certificates() {
  const getCertificateLink = (cert) => {
    if (cert.title === "Full Stack Web Internship") {
      return "/Zenvyro_Labs_Certificate.pdf";
    }

    if (cert.title === "Introduction to AI") {
      return "/images/intro-to-ai.pdf";
    }

    if (
      cert.title === "NAVTTC MERN Stack Development Training" ||
      cert.title === "IT Specialist - JavaScript"
    ) {
      return "https://www.credly.com/badges/b3bb8039-fb18-49f9-a6c0-4164bd11f38a/public_url";
    }

    return null;
  };

  const getCertificateImage = (cert) => {
    if (cert.title === "Full Stack Web Internship") {
      return "/images/Certificate_Muhammad_Asad.png";
    }

    if (
      cert.title === "NAVTTC MERN Stack Development Training" ||
      cert.title === "IT Specialist - JavaScript"
    ) {
      return "/ITS-Badges_JavaScript.png";
    }

    return null;
  };

  const isPdfPreview = (cert) => {
    return cert.title === "Introduction to AI";
  };

  return (
    <section
      id="certificates"
      className="py-20 md:py-24"
      aria-labelledby="certificates-heading"
    >
      <div className="section-container">
        <SectionHeading
          headingId="certificates-heading"
          eyebrow="05 · Certificates"
          title="Certifications"
          subtitle="Formal training and certifications that support my hands-on development experience."
        />

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => {
            const certificateLink = getCertificateLink(cert);
            const certificateImage = getCertificateImage(cert);
            const pdfPreview = isPdfPreview(cert);

            return (
              <motion.article
                key={cert.title}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                className="surface-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/10 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Certificate Preview */}
                {certificateLink ? (
                  <a
                    href={certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full overflow-hidden bg-black/5"
                    aria-label={`Open ${cert.title} certificate`}
                  >
                    {pdfPreview ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                        <iframe
                          src="/images/intro-to-ai.pdf#page=1&view=FitH"
                          title="Introduction to AI Certificate Preview"
                          className="pointer-events-none h-full w-full border-0"
                        />
                      </div>
                    ) : certificateImage ? (
                      <img
                        src={certificateImage}
                        alt={cert.title}
                        className={
                          cert.title === "Full Stack Web Internship"
                            ? "block aspect-[16/9] w-full object-cover object-center"
                            : "mx-auto block h-56 w-full object-contain p-6"
                        }
                      />
                    ) : (
                      <div className="flex h-56 items-center justify-center bg-primary/5">
                        <FiExternalLink
                          size={28}
                          className="text-primary"
                        />
                      </div>
                    )}

                    {/* Hover Preview Button */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#08101d]/0 opacity-0 transition-all duration-300 group-hover:bg-[#08101d]/60 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-medium text-[#101827] shadow-xl">
                        <FiExternalLink size={14} />
                        View Certificate
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="flex h-56 items-center justify-center bg-primary/5">
                    <FiExternalLink
                      size={28}
                      className="text-primary"
                    />
                  </div>
                )}

                {/* Certificate Information */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug">
                    {cert.title}
                  </h3>

                  <p className="mt-2 font-mono text-xs text-muted">
                    {cert.issuer} · {cert.duration}
                  </p>

                  {certificateLink && (
                    <a
                      href={certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 font-mono text-xs text-primary transition-colors hover:text-secondary"
                    >
                      <FiExternalLink size={13} />

                      {cert.title === "Full Stack Web Internship" ||
                      cert.title === "Introduction to AI"
                        ? "View Certificate"
                        : "Verify Credential"}
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}