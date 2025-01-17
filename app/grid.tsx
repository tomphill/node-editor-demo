"use client";

import GridItem from "./grid-item";

const cols = 20;

export default function Grid() {
  return (
    <div className="h-screen w-full relative bg-white">
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
      <GridItem height={15} width={25} top={10} left={5} />
      <GridItem height={15} width={25} top={50} left={50} />
    </div>
  );
}
