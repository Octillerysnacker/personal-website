import { EllipseParameters, useOrbit } from "@/hooks/useOrbit";
import { MotionValue, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { PropsWithChildren } from "react";

export type PlanetProps = PropsWithChildren<{
  orbit: EllipseParameters;
  time: MotionValue<number>;
}>;

export function Planet(props: PlanetProps) {
  const { orbit, time } = props;

  const {t, x, y} = useOrbit(time, orbit);

  const isDragging = useMotionValue<"yes" | "no">("no");
  const zIndex = useTransform(() => (isDragging.get() === "yes" ? 1 : -Math.sin(t())) + 1);

  let mode : "orbiting" | "modal" = "orbiting";

  const modalProgress = useMotionValue(0);

  const finalX = useTransform(() => x.get() * (1 - modalProgress.get()));
  const finalY = useTransform(() => y.get() * (1 - modalProgress.get()));
  const finalZ = useTransform(() => zIndex.get() * (1 - modalProgress.get()) + modalProgress.get())

  return (
    <motion.div
      style={{
        zIndex: finalZ,
        translateX: finalX,
        translateY: finalY,
      }}

      className="bg-white size-20 rounded-full absolute flex items-center justify-center"

      drag
      dragSnapToOrigin
      dragConstraints={{top: -30, left: -30, bottom: 30, right: 30}}
      dragElastic={0.25}
      onDragStart={() => isDragging.set("yes")}
      onDragEnd={() => isDragging.set("no")}

      whileHover={{ scale: 1.2 }}
      whileTap={{scale: 0.9}}
      transition={{ ease: "easeOut" }}

      onTap={() => modalProgress.get() === 0 ? animate(modalProgress, 1) : animate(modalProgress, 0)}
    >{props.children}</motion.div>
  );
}
