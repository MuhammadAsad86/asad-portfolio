import { useEffect, useState } from "react";

export function useTypingEffect(words, { typeSpeed = 55, deleteSpeed = 30, pause = 1400 } = {}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length];

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, deleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(t);
  }, [subIndex, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  useEffect(() => {
    const current = words[index % words.length] || "";
    setText(current.slice(0, subIndex));
  }, [subIndex, index, words]);

  return text;
}
