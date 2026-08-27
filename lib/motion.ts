import type { Variants } from "framer-motion";

export const duration = { fast: 0.18, base: 0.28, slow: 0.38 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.fast, ease: [0.22, 1, 0.36, 1] },
  },
};
