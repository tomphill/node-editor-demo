"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useGrid } from "@/context/grid-context";
import {
  AlignCenter,
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";

export default function ItemEditor() {
  const grid = useGrid();
  const selectedItem = grid.selectedItem;
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
        <span>Edit {selectedItem?.type}</span>
      </h2>
      {selectedItem?.type === "text" && (
        <>
          <h3 className="text-lg font-semibold mt-5 mb-2">Text content</h3>
          <input
            type="text"
            value={selectedItem?.data?.text}
            onChange={(e) => {
              if (!selectedItem?.id) return;
              grid.updateGridItemData?.(selectedItem?.id, {
                text: e.target.value,
              });
            }}
            className="w-full border rounded p-2"
          />
        </>
      )}
      {selectedItem?.type === "character" && (
        <>
          <h3 className="text-lg font-semibold mt-5 mb-2">Character size</h3>
          <div>
            <Slider
              onValueChange={([value]) => {
                if (!selectedItem?.id) return;
                grid.updateGridItemData?.(selectedItem?.id, {
                  imageSize: value,
                });
              }}
              value={[selectedItem?.data?.imageSize ?? 100]}
              max={100}
              step={1}
            />
          </div>
        </>
      )}

      <h3 className="text-lg font-semibold mt-5 mb-2">Content alignment</h3>
      <div className="grid grid-cols-3 gap-2 w-fit">
        <Button
          onClick={() => {
            if (!selectedItem?.id) return;
            grid.updateGridItemData?.(selectedItem?.id, {
              alignContent: "left top",
            });
          }}
          variant="outline"
          size="icon"
          disabled={selectedItem?.data?.alignContent === "left top"}
        >
          <ArrowUpLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            if (!selectedItem?.id) return;
            grid.updateGridItemData?.(selectedItem?.id, {
              alignContent: "center top",
            });
          }}
          variant="outline"
          size="icon"
          disabled={selectedItem?.data?.alignContent === "center top"}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            if (!selectedItem?.id) return;
            grid.updateGridItemData?.(selectedItem?.id, {
              alignContent: "right top",
            });
          }}
          variant="outline"
          size="icon"
          disabled={selectedItem?.data?.alignContent === "right top"}
        >
          <ArrowUpRight className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            if (!selectedItem?.id) return;
            grid.updateGridItemData?.(selectedItem?.id, {
              alignContent: "left center",
            });
          }}
          variant="outline"
          size="icon"
          disabled={selectedItem?.data?.alignContent === "left center"}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            if (!selectedItem?.id) return;
            grid.updateGridItemData?.(selectedItem?.id, {
              alignContent: "center",
            });
          }}
          variant="outline"
          size="icon"
          disabled={selectedItem?.data?.alignContent === "center"}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            if (!selectedItem?.id) return;
            grid.updateGridItemData?.(selectedItem?.id, {
              alignContent: "right center",
            });
          }}
          variant="outline"
          size="icon"
          disabled={selectedItem?.data?.alignContent === "right center"}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            if (!selectedItem?.id) return;
            grid.updateGridItemData?.(selectedItem?.id, {
              alignContent: "left bottom",
            });
          }}
          variant="outline"
          size="icon"
          disabled={selectedItem?.data?.alignContent === "left bottom"}
        >
          <ArrowDownLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            if (!selectedItem?.id) return;
            grid.updateGridItemData?.(selectedItem?.id, {
              alignContent: "center bottom",
            });
          }}
          variant="outline"
          size="icon"
          disabled={selectedItem?.data?.alignContent === "center bottom"}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            if (!selectedItem?.id) return;
            grid.updateGridItemData?.(selectedItem?.id, {
              alignContent: "right bottom",
            });
          }}
          variant="outline"
          size="icon"
          disabled={selectedItem?.data?.alignContent === "right bottom"}
        >
          <ArrowDownRight className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="text-lg font-semibold mt-5 mb-2">Remove item</h3>
      <Button
        onClick={() => {
          if (!selectedItem?.id) return;
          grid.removeGridItem?.(selectedItem?.id);
          grid.removeSelectedItem?.();
        }}
        variant="outline"
      >
        Remove item
      </Button>
    </div>
  );
}
