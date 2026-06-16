import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
};

/**
 * Paint-brush styled title using an Edo-feel brush font.
 * Animates in with a left-to-right paint sweep when scrolled into view.
 */
export function PaintTitle({
  children,
  className = "",
  as: Tag = "h2",
  align = "left",
}: Props) {
  return (
    <Tag
      className={`font-paint paint-ink leading-[0.95] ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(6px)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </Tag>
  );
}
