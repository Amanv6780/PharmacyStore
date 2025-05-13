import { useState } from "react";

export function CardWrapper({ children }) {
  const [hovered, setHovered] = useState(false);

  function handleMouseLeave() {
    setHovered(false);
  }

  function handleMouseEnter() {
    setHovered(true);
  }

  return (
    <div
      style={{ transition: "all ease-in-out 0.2s" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${
        hovered ? "shadow-lg" : "shadow-sm"
      }    rounded  bg-light`}
    >
      {children}
    </div>
  );
}
