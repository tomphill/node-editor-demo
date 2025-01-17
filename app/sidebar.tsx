"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GridItem, useGrid } from "@/context/grid-context";
import { PersonStandingIcon } from "lucide-react";
import ItemEditor from "./item-editor";

export default function Sidebar() {
  const grid = useGrid();
  const gridHasCharacter = grid.gridItems.some(
    (item) => item.type === "character"
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold pb-4">Scene Editor</h1>
      {grid.selectedItem && (
        <div>
          <ItemEditor />
        </div>
      )}
      {!grid.selectedItem && (
        <div className="rounded-md border p-8 flex flex-col gap-4 items-center justify-center">
          <PersonStandingIcon size={50} />
          {!gridHasCharacter && (
            <Button
              onClick={() => {
                const newItem: GridItem = {
                  id: Math.random().toString(),
                  top: 10,
                  left: 10,
                  height: 20,
                  width: 10,
                  type: "character",
                  imageUrl:
                    "https://images.unsplash.com/photo-1508341591423-4347099e1f19?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                };

                grid.addGridItem?.(newItem);
                grid.setSelectedItemId?.(newItem.id);
              }}
              disabled={gridHasCharacter}
            >
              Add Character
            </Button>
          )}
          {gridHasCharacter && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="opacity-50">Add Character</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>A scene can only have 1 character</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </div>
  );
}
