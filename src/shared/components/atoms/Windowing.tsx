import React from "react";
import { IntersectionOptions, useInView } from "react-intersection-observer";

interface Props {
  options?: IntersectionOptions;
  children: React.ReactNode;
}

const Windowing = ({ options, children }: Props) => {
  const { ref, inView } = useInView(options);
  return <div ref={ref}>{inView && children}</div>;
};

export default Windowing;
