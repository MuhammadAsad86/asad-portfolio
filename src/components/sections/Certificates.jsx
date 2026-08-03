import { motion } from "framer-motion";
import { FiAward, FiDownload } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import { certificates } from "../../data/experience";

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="py-28"
      aria-labelledby="certificates-heading"
    >
      <div className="section-container">
        <SectionHeading
          headingId="certificates-heading"
          eyebrow="05 · Certificates"
          title="Certifications"
          subtitle="Formal training that backs up the hands-on project work."
        />

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="surface-card rounded-2xl overflow-hidden flex flex-col shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/10 transition-shadow"
            >
              {/* Certificate Preview */}
              <div
                className="h-40 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(79,140,255,0.18), rgba(34,211,238,0.18))",
                }}
              >
                {i === 0 ? (
                  <img
                    src="/ITS-Badges_JavaScript.png"
                    alt="IT Specialist JavaScript Badge"
                    className="h-28 object-contain"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-2xl grid place-items-center shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg,#4F8CFF,#22D3EE)",
                    }}
                  >
                    <FiAward className="text-white" size={24} />
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="font-display font-semibold text-base leading-snug">
                    {cert.title}
                  </h3>

                  <p className="font-mono text-xs text-muted mt-2">
                    {cert.issuer} · {cert.duration}
                  </p>
                </div>

                {i === 0 && (
                  <a
                    href="https://www.credly.com/badges/b3bb8039-fb18-49f9-a6c0-4164bd11f38a/public_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline w-fit"
                  >
                    Verify Credential
                  </a>
                )}

                <a
                  href="/Muhammad_Asad_CV.pdf"
                  download
                  className="mt-auto inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline w-fit"
                >
                  <FiDownload size={13} aria-hidden="true" />
                  View in Resume
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}