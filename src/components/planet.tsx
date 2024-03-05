import { animate, motion, useMotionValue } from "framer-motion";
import { ComponentProps, useEffect } from "react";

export type EllipseParameters = {
    xRadius: number;
    yRadius: number;
    xOrigin: number;
    yOrigin: number;
    duration: number;
    delay?: number;
}
export type PlanetProps = { orbit: EllipseParameters} & ComponentProps<typeof motion.div>;

export function Planet(props: PlanetProps) {

    const zIndex = useMotionValue(-1);
    const orbit = props.orbit;

    useEffect(() => {
        animate(zIndex, [-1,0,1,0,-1], {
            ease: ["easeIn", "easeIn", "easeOut", "easeOut"],
            duration: orbit.duration, 
            delay: orbit.delay,
            repeat: Infinity})
    })

    
  return (
    <motion.div
    {...props}
      animate={{
        translateX: [orbit.xOrigin, -orbit.xRadius, orbit.xOrigin, orbit.xRadius, orbit.xOrigin],
        translateY: [-orbit.yRadius, orbit.yOrigin, orbit.yRadius, orbit.yOrigin, -orbit.yRadius],
      }}
      transition={{

        translateX: {
          ease: ["easeOut", "easeIn", "easeOut", "easeIn"], // Ideally these would be sine curves but I don't have those right now
          delay: orbit.delay ?? 0,
          duration: orbit.duration,
          repeat: Infinity,
        },
        translateY: {
          ease: ["easeIn", "easeOut", "easeIn", "easeOut"],
          delay: orbit.delay ?? 0,
          duration: orbit.duration,
          repeat: Infinity,
        },
      }}

      style={{
        zIndex: zIndex
      }}

    />
  );
}
