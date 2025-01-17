"use client";

import { useGrid } from "@/context/grid-context";
import GridItem from "./grid-item";

const cols = 20;

export default function Grid() {
  const grid = useGrid();

  return (
    <div className="h-full w-full relative bg-white">
      {Array.from({ length: cols }, (_, i) => (
        <div
          className="h-full w-[1px] bg-gray-200 absolute"
          style={{
            left: `${i * (100 / cols)}%`,
          }}
          key={i}
        />
      ))}
      {Array.from({ length: cols }, (_, i) => (
        <div
          className="h-[1px] w-full bg-gray-200 absolute"
          style={{
            top: `${i * (100 / cols)}%`,
          }}
          key={i}
        />
      ))}
      {grid.gridItems.map((item) => (
        <GridItem key={item.id} {...item} />
      ))}
    </div>
  );
}
