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

  const tweenToIndex = (i: number) => {
    const key = timeBetweenPlanets * (-i - 1);
    const target = closestWrappedValue(time.get(), key, 0, period);
    animate(time, target, {
      type: "spring",
      damping: 100,
      restDelta: 0.005,
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around">
      <div className="px-8 flex gap-4 flex-col">
        <h1 className="text-4xl">
          <English>Hi, I&apos;m</English> <CS>Robert.</CS>
        </h1>
        <h2>
          <CS>NEU &apos;25, </CS><CS>CS + </CS><English>English</English>
        </h2>
        <h2 className="leading-tight">
          <CS>You can click and drag the planets.</CS>
          <English>They don&apos;t do anything, but I think it&apos;s fun.</English><br/><br/>
          <CS>Originally, I was planning to add my experiences here. </CS><English>But, I decided to do that another time.</English><br/><br/>
          <CS>Meanwhile, you can visit my <a className="underline text-blue-400 hover:text-blue-600 visited:text-purple-400 visited:hover:text-purple-600" href="https://www.linkedin.com/in/robert-rosas-3a62a0256">LinkedIn</a> and <a className="underline text-blue-400 hover:text-blue-600 visited:text-purple-400 visited:hover:text-purple-600"href="https://github.com/octillerysnacker">GitHub</a>.</CS>
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <motion.div
          className="bg-blue-400 size-48 flex items-center justify-center rounded-full z-[1]"
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
              orbit={{
                xRadius: 180,
                yRadius: 60,
                duration: period,
                delay: timeBetweenPlanets * i,
                rotation: 30,
              }}
              time={time}

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
            onTapStart={() => tweenToIndex(i)}
            onTap={runMainAnimation}
            transition={{ ease: "easeOut" }}
            onHoverStart={() => tweenToIndex(i)}
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
