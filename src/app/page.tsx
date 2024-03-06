"use client";
import { Planet } from "@/components/planet";
import { closestWrappedValue } from "@/utils";
import { animate, cubicBezier, motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect } from "react";

type Experience = {
  name: string;
};

const experiences = [
  {
    name: "flow in the field",
  },
  {
    name: "happy eastie",
  },
  {
    name: "mastercontrol",
  },
  {
    name: "klaviyo",
  },
];

export default function Home() {
  const period = 16;

  const time = useMotionValue(0);

  const runMainAnimation = useCallback(async () => {
    let orbitReset = false;
    await animate(time, period, {
      ease: cubicBezier(0.1, 0.0, 0.585, 0.55),
      duration: period - time.get(),
      onComplete: () => (orbitReset = true),
    });

    if (orbitReset) {
      animate(time, [0, period], {
        ease: "linear",
        repeat: Infinity,
        duration: period,
      });
    }
  }, [time]);

  useEffect(() => {
    runMainAnimation();
  }, [runMainAnimation]);

  const timeBetweenPlanets = period / experiences.length;

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
      <motion.div className="bg-blue-400 size-60 flex items-center justify-center rounded-full">
        {experiences.map((exp, i) => (
          <Planet
            key={exp.name}
            className="bg-yellow-300 size-12 rounded-full absolute"
            orbit={{
              xRadius: 180,
              yRadius: 60,
              duration: period,
              delay: timeBetweenPlanets * i,
              rotation: 30,
            }}
            time={time}
          >
            {exp.name}
          </Planet>
        ))}
        star
      </motion.div>
      <div className="flex flex-col gap-2">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.name}
            className="bg-blue-500"
            onHoverStart={() => {
              const key = timeBetweenPlanets * (-i - 1);
              const target = closestWrappedValue(time.get(), key, 0, period);
              animate(time, target, {
                type: "spring",
                damping: 100,
                restDelta: 0.005,
              });
            }}
            onHoverEnd={() => {
              runMainAnimation();
            }}
          >
            {exp.name}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
