"use client";

import { Button } from "@/components/ui/button";
import { useGrid } from "@/context/grid-context";
import { ArrowLeftIcon } from "lucide-react";

export default function ItemEditor() {
  const grid = useGrid();
  return (
    <div>
      <h2 className="text-xl font-semibold flex gap-2 items-center">
        <Button
          onClick={() => {
            grid.removeSelectedItem?.();
          }}
          size="icon"
          variant="outline"
        >
          <ArrowLeftIcon />
        </Button>
        <span>Edit {grid.selectedItem?.type}</span>
      </h2>
    </div>
  );
}
