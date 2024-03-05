import { getRotators } from "@/utils";
import { MotionValue, motion, useTransform } from "framer-motion";
import { ComponentProps } from "react";

export type EllipseParameters = {
  xRadius: number;
  yRadius: number;
  xOrigin?: number;
  yOrigin?: number;
  duration: number;
  rotation?: number;
  delay?: number;
};
export type PlanetProps = {
  orbit: EllipseParameters;
  time: MotionValue<number>;
} & ComponentProps<typeof motion.div>;

export function Planet(props: PlanetProps) {
  const { orbit, time } = props;

  const localTime = useTransform(
    () => (time.get() + (orbit.delay ?? 0)) % orbit.duration
  );

  const rotate = getRotators(orbit.rotation ?? 0);

  const t = () => (localTime.get() * Math.PI * 2) / orbit.duration;

  const localX = () => orbit.xRadius * Math.cos(t());

  const localY = () => -orbit.yRadius * Math.sin(t());

  const translateX = useTransform(() => rotate.x(localX(), localY()) + (orbit.xOrigin ?? 0));

  const translateY = useTransform(() => rotate.y(localX(), localY()) + (orbit.yOrigin ?? 0));
  const zIndex = useTransform(() => -Math.sin(t()));

  return (
    <motion.div
      {...props}
      style={{
        zIndex,
        translateX,
        translateY,
      }}
    />
  );
}
