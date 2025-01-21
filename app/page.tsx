import { GridProvider } from "@/context/grid-context";
import Grid from "./scene-editor/grid";
import Sidebar from "./scene-editor/sidebar";

export default function Home() {
  return (
    <div className="h-screen min-h-[500px] grid grid-cols-[1fr_300px]">
      <GridProvider>
        <Grid />
        <div className="border px-4 py-2">
          <Sidebar />
        </div>
      </GridProvider>
    </div>
  );
}
