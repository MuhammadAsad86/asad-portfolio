import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-8xl font-bold text-gradient"
      >
        404
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display text-2xl font-semibold mt-4"
      >
        This route doesn't exist.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted mt-3 max-w-sm"
      >
        The page you're looking for was moved, renamed, or never built. Let's get you
        back to the homepage.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 rounded-xl font-semibold text-white text-sm"
          style={{ background: "linear-gradient(135deg,#4F8CFF,#22D3EE)" }}
        >
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
