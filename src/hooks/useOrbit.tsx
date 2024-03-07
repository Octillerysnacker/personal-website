import { getRotators } from "@/utils";
import { MotionValue, useTransform } from "framer-motion";

export type EllipseParameters = {
  xRadius: number;
  yRadius: number;
  xOrigin?: number;
  yOrigin?: number;
  duration: number;
  rotation?: number;
  delay?: number;
};

export const useOrbit = (
  time: MotionValue<number>,
  orbit: EllipseParameters
) => {
  const localTime = useTransform(
    () => (time.get() + (orbit.delay ?? 0)) % orbit.duration
  );

  const rotate = getRotators(orbit.rotation ?? 0);

  const t = () => (localTime.get() * Math.PI * 2) / orbit.duration;

  const localX = () => orbit.xRadius * Math.cos(t());

  const localY = () => -orbit.yRadius * Math.sin(t());

  const translateX = useTransform(
    () => rotate.x(localX(), localY()) + (orbit.xOrigin ?? 0)
  );

  const translateY = useTransform(
    () => rotate.y(localX(), localY()) + (orbit.yOrigin ?? 0)
  );

  return {t, x: translateX, y: translateY}
};
