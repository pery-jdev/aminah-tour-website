"use client";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const child = {
  visible: {
    opacity: 1,
    display: "inline-block",
  },
  hidden: {
    opacity: 0,
    display: "inline-block",
  },
};

export default function TypingTitle({ text, className, style }: { text: string, className?: string, style?: React.CSSProperties }) {
  const words = text.split(" ");

  return (
    <motion.h1 
      className={className} 
      style={style}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {word.split("").map((char, index) => (
            <motion.span variants={child} key={index}>
              {char}
            </motion.span>
          ))}
          {i !== words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.h1>
  );
}
