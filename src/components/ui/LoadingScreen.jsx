import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] grid place-items-center"
          style={{ background: "#070B16" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="font-mono text-2xl md:text-3xl font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span style={{ color: "#4F8CFF" }}>&lt;</span>
              Asad
              <span style={{ color: "#22D3EE" }}>/&gt;</span>
            </motion.div>
            <motion.div
              className="h-[3px] w-40 rounded-full overflow-hidden bg-white/10"
            >
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(90deg,#4F8CFF,#22D3EE)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
