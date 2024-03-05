"use client";
import { Planet } from "@/components/planet";
import { motion } from "framer-motion";

export default function Home() {

  const period = 16
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <motion.div className="bg-blue-400 size-60 flex items-center justify-center rounded-full">
        {[0,period/4,period/2,period*3/4].map(d => <Planet key={d} className="bg-yellow-300 size-12 rounded-full absolute" orbit={{
          xRadius: 180,
          yRadius: 60,
          xOrigin: 0,
          yOrigin: 0,
          duration: period,
          delay: d
        }}>a</Planet>)}

        star

      </motion.div>
    </main>
  );
}
