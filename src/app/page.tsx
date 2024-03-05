"use client";
import { Planet } from "@/components/planet";
import {
  AnimationPlaybackControls,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const period = 16;

  const time = useMotionValue(0);
  const [controls, setControls] = useState<AnimationPlaybackControls>();

  useEffect(() => {
    setControls(
      animate(time, [0, period], {
        ease: "linear",
        repeat: Infinity,
        duration: period,
      })
    );
  }, [time]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <motion.div className="bg-blue-400 size-60 flex items-center justify-center rounded-full">
        {[0, period / 4, period / 2, (period * 3) / 4].map((d) => (
          <Planet
            key={d}
            className="bg-yellow-300 size-12 rounded-full absolute"
            orbit={{
              xRadius: 180,
              yRadius: 60,
              duration: period,
              delay: d,
              rotation: 30
            }}
            time={time}
          >
            a
          </Planet>
        ))}
        star
      </motion.div>
      {controls && (
        <>
          <button
            onClick={() => {
              console.log({ animating: time.isAnimating() });
              controls.state === "running" ? controls.pause() : controls.play();
            }}
          >
            Pause/Unpause
          </button>
          <input
            type="range"
            min={0}
            max={period}
            onChange={(e) => (controls.time = e.target.valueAsNumber)}
            step="any"
          />
        </>
      )}
    </main>
  );
}
