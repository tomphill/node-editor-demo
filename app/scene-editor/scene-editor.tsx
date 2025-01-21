"use client";

import { useGrid } from "@/context/grid-context";
import ItemEditor from "./item-editor";
import ComponentManager from "./component-manager";

export default function SceneEditor() {
  const grid = useGrid();

  return (
    <>
      {grid.selectedItem && <ItemEditor />}
      {!grid.selectedItem && <ComponentManager />}
    </>
  );
}
