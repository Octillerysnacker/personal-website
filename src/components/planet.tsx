import { rotate, splitValueInclusive, zip } from "@/utils";
import { MotionValue, easeIn, easeOut, motion, useTransform } from "framer-motion";
import { ComponentProps } from "react";

export type EllipseParameters = {
    xRadius: number;
    yRadius: number;
    xOrigin: number;
    yOrigin: number;
    duration: number;
    rotation?: number;
    delay?: number;
}
export type PlanetProps = { orbit: EllipseParameters, time: MotionValue<number>} & ComponentProps<typeof motion.div>;

export function Planet(props: PlanetProps) {
    
    const {orbit, time} = props;

    const localXCoords = [
        orbit.xOrigin, 
        -orbit.xRadius, 
        orbit.xOrigin, 
        orbit.xRadius, 
        orbit.xOrigin]

    const localYCoords = [
        -orbit.yRadius, 
        orbit.yOrigin, 
        orbit.yRadius, 
        orbit.yOrigin, 
        -orbit.yRadius]

    const rotatedPoints = zip(localXCoords, localYCoords, (x,y) => ({x,y}))
    .map(p => rotate(p, {x: orbit.xOrigin, y: orbit.yOrigin}, orbit.rotation ?? 0))

    const localTime = useTransform(() => (time.get() + (orbit.delay ?? 0)) % orbit.duration)

    const inputMap = splitValueInclusive(orbit.duration, 5);

    const zIndex = useTransform(localTime, inputMap, [-1,0,1,0,-1], {
        ease: [easeIn,easeIn, easeOut, easeOut],
    });
    const translateX = useTransform(localTime, inputMap, rotatedPoints.map(p => p.x), {
        ease: [easeOut, easeIn, easeOut, easeIn],
    });

    const translateY = useTransform(localTime, inputMap, rotatedPoints.map(p => p.y), {
        ease: [easeIn, easeOut, easeIn, easeOut],
    })
    
  return (
    <motion.div
    {...props}
      style={{
        zIndex,
        translateX,
        translateY
      }}

    />
  );
}
