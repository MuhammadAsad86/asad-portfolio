import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const quickLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-white/10 py-16 mt-10">
      <div className="section-container flex flex-col md:flex-row justify-between gap-10">
        <div>
          <button onClick={() => scrollTo("home")} className="font-display font-bold text-lg">
            <span className="text-primary">&lt;</span>Asad<span className="text-secondary">/&gt;</span>
          </button>
          <p className="text-muted text-sm mt-3 max-w-xs leading-relaxed">
            MERN Stack Developer building responsive, user-friendly web applications
            from Multan, Pakistan.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="https://github.com/MuhammadAsad86"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full grid place-items-center border border-white/10 text-muted hover:border-primary/60 hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <FiGithub size={16} />
            </a>
            <a
              href="https://linkedin.com/in/muhammadasad86"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full grid place-items-center border border-white/10 text-muted hover:border-primary/60 hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href="mailto:rootedasad@gmail.com"
              aria-label="Email"
              className="w-10 h-10 rounded-full grid place-items-center border border-white/10 text-muted hover:border-primary/60 hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <FiMail size={16} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer quick links">
          <h4 className="font-mono text-xs text-muted mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((l) => (
              <li key={l.id}>
                <button onClick={() => scrollTo(l.id)} className="text-sm text-muted hover:text-text transition-colors">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="font-mono text-xs text-muted mb-4">Contact</h4>
          <p className="text-sm text-muted">rootedasad@gmail.com</p>
          <p className="text-sm text-muted mt-1.5">+92 312 0611513</p>
          <p className="text-sm text-muted mt-1.5">Multan, Pakistan</p>
        </div>
      </div>

      <div className="section-container mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted font-mono">
        <span>© {new Date().getFullYear()} Muhammad Asad. All rights reserved.</span>
        <span>Built with React, Tailwind CSS &amp; Framer Motion</span>
      </div>
    </footer>
  );
}
