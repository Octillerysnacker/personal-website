"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <motion.div className="bg-blue-400 w-20 h-20 flex items-center justify-center rounded-full">
        <motion.div
          animate={{
            translateX: [0, 60, 0, -60, 0],
            translateY: [60, 0, -60, 0, 60],
          }}
          transition={{
            translateX: {
              ease: ["easeOut", "easeIn", "easeOut", "easeIn"], // Ideally these would be sine curves but I don't have those right now
              duration: 10,
              repeat: Infinity,
            },
            translateY: {
              ease: ["easeIn", "easeOut", "easeIn", "easeOut"],
              duration: 10,
              repeat: Infinity,
            },
          }}
          className="bg-yellow-300 w-5 h-5 rounded-full"
        />
      </motion.div>
    </main>
  );
}
