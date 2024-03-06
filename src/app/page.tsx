"use client";
import { Planet } from "@/components/planet";
import { CS, English } from "@/components/text";
import { closestWrappedValue } from "@/utils";
import { animate, cubicBezier, motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect } from "react";

type Experience = {
  name: string;
  thumbnail: string;
};

const experiences: Experience[] = [
  {
    name: "Flow in the Field",
    thumbnail: "/flow.png",
  },
  {
    name: "HappyEastie",
    thumbnail: "/happyeastieimage.svg",
  },
  {
    name: "MasterControl",
    thumbnail: "mastercontrol.svg",
  },
  {
    name: "Klaviyo",
    thumbnail: "klaviyo.svg",
  },
];

export default function Home() {
  const period = 24;

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
    <main className="flex min-h-screen flex-col items-center justify-around">
      <div>
        <h1 className="text-4xl">
          <English>Hi, I&apos;m</English> <CS>Robert.</CS>
        </h1>
        <h2>
          <CS>Click on any of</CS> <English>the planets to learn more.</English>
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <motion.div
          className="bg-blue-400 size-48 flex items-center justify-center rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{scale: 0.9}}
          transition={{ ease: "easeOut" }}
        >
          <p className="text-3xl">
            <English>about</English> <CS>me</CS>
          </p>
        </motion.div>
        <div className="absolute flex items-center justify-center">
          {experiences.map((exp, i) => (
            <Planet
              key={exp.name}
              className="bg-white size-20 rounded-full absolute flex items-center justify-center"
              orbit={{
                xRadius: 180,
                yRadius: 60,
                duration: period,
                delay: timeBetweenPlanets * i,
                rotation: 30,
              }}
              time={time}
              whileHover={{ scale: 1.2 }}
              whileTap={{scale: 0.9}}
              transition={{ ease: "easeOut" }}
            >
              <div className="size-4/5 relative">
                <Image
                  src={exp.thumbnail}
                  fill
                  objectFit="contain"
                  alt=""
                  className="pointer-events-none"
                />
              </div>
            </Planet>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.name}
            className="bg-blue-400 p-2 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9}}
            transition={{ ease: "easeOut" }}
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
            <CS>{exp.name}</CS>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
