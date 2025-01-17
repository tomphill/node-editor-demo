"use client";

import React, { useRef, useState } from "react";

type StartData = {
  x: number;
  y: number;
  top: number;
  left: number;
};

type Position = {
  top: number;
  left: number;
};

type Size = {
  height: number;
  width: number;
};

const GridItem: React.FC<{
  height: number;
  width: number;
  top: number;
  left: number;
}> = ({ height, width, top, left }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ top, left });
  const [size, setSize] = useState<Size>({ height, width });
  const [dragging, setDragging] = useState<boolean>(false);
  const [resizing, setResizing] = useState<string | false>(false);
  const [startData, setStartData] = useState<StartData>({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
  });

  const cols = 20; // Total grid lines for snapping
  const gridSize = 100 / cols; // Grid step in percentages

  const snapToGrid = (value: number): number =>
    Math.round(value / gridSize) * gridSize;

  const handleMouseDownDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    console.log("dragging", e.clientX, e.clientY);
    setStartData({
      x: e.clientX,
      y: e.clientY,
      top: position.top,
      left: position.left,
    });
  };

  const handleMouseMoveDrag = (e: MouseEvent) => {
    if (!dragging) return;

    const deltaX = e.clientX - startData.x;
    const deltaY = e.clientY - startData.y;

    const parentHeight = itemRef?.current?.parentElement?.clientHeight;
    const parentWidth = itemRef?.current?.parentElement?.clientWidth;

    if (!parentHeight || !parentWidth) return;

    let newTop = snapToGrid(startData.top + (deltaY / parentHeight) * 100);
    let newLeft = snapToGrid(startData.left + (deltaX / parentWidth) * 100);

    if (newTop < 0) {
      newTop = 0;
    }

    if (newTop + size.height > 100) {
      newTop = 100 - size.height;
    }

    if (newLeft < 0) {
      newLeft = 0;
    }

    if (newLeft + size.width > 100) {
      newLeft = 100 - size.width;
    }

    setPosition({
      top: newTop,
      left: newLeft,
    });
  };

  const handleMouseUpDrag = () => {
    setDragging(false);
  };

  const handleMouseDownResize = (
    e: React.MouseEvent<HTMLDivElement>,
    corner: string
  ) => {
    e.stopPropagation(); // Prevent triggering drag
    setResizing(corner);
    setStartData({
      x: e.clientX,
      y: e.clientY,
      top: position.top,
      left: position.left,
    });
  };

  const handleMouseMoveResize = (e: MouseEvent) => {
    if (!resizing) return;

    const deltaX = e.clientX - startData.x;
    const deltaY = e.clientY - startData.y;

    let newWidth = size.width;
    let newHeight = size.height;

    const parentHeight = itemRef?.current?.parentElement?.clientHeight;
    const parentWidth = itemRef?.current?.parentElement?.clientWidth;

    console.log({ parentHeight, parentWidth });

    if (!parentHeight || !parentWidth) return;

    newWidth = snapToGrid(size.width + (deltaX / parentWidth) * 100);
    newHeight = snapToGrid(size.height + (deltaY / parentHeight) * 100);

    if (newHeight > 100 - position.top) {
      newHeight = 100 - position.top;
    }

    if (newWidth > 100 - position.left) {
      newWidth = 100 - position.left;
    }

    setSize({
      height: Math.max(newHeight, gridSize),
      width: Math.max(newWidth, gridSize),
    });
  };

  const handleMouseUpResize = () => {
    setResizing(false);
  };

  React.useEffect(() => {
    if (dragging || resizing) {
      const mouseMoveHandler = dragging
        ? handleMouseMoveDrag
        : handleMouseMoveResize;
      const mouseUpHandler = dragging ? handleMouseUpDrag : handleMouseUpResize;

      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", mouseUpHandler);

      return () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", mouseUpHandler);
      };
    }
  }, [dragging, resizing]);

  return (
    <div
      ref={itemRef}
      onMouseDown={handleMouseDownDrag}
      style={{
        position: "absolute",
        top: `${position.top}%`,
        left: `${position.left}%`,
        height: `${size.height}%`,
        width: `${size.width}%`,
        backgroundColor: "lightblue",
        cursor: "grab",
        boxSizing: "border-box",
      }}
    >
      <div
        onMouseDown={(e) => handleMouseDownResize(e, "bottom-right")}
        className="cursor-se-resize"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "10px",
          height: "10px",
          backgroundColor: "black",
          border: "1px solid white",
        }}
      />
    </div>
  );
};

export default GridItem;
