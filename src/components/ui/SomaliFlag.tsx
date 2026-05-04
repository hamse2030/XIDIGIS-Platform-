"use client";

import { motion } from "framer-motion";

export function SomaliFlag() {
  return (
    <motion.div
      className="relative w-24 h-16 bg-[#4189DD] overflow-hidden rounded-sm shadow-lg"
      animate={{
        skewY: [0, -2, 0, 2, 0],
        translateY: [0, -2, 0, 2, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* White Star */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 51 48"
          fill="white"
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M25.5 0L31.123 17.3033H49.3175L34.5973 28.0234L40.2203 45.3267L25.5 34.6066L10.7797 45.3267L16.4027 28.0234L1.68249 17.3033H19.877L25.5 0Z" />
        </svg>
      </div>
      
      {/* Wave Effect Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200%]"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
