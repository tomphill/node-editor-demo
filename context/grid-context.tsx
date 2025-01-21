"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export type CharacterData = {
  name: string;
  role: string;
  imageUrl: string;
};

export type TextData = {
  text: string;
};

export type GridItem = {
  id: string;
  top: number;
  left: number;
  height: number;
  width: number;
  type: "text" | "character" | "answers";
  text?: string;
  imageUrl?: string;
  characterName?: string;
  characterRole?: string;
  data?: any;
};

type GridAction =
  | { type: "ADD_ITEM"; payload: GridItem }
  | { type: "UPDATE_ITEM"; payload: GridItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_ALL" };

type GridState = {
  gridItems: GridItem[];
};

const initialState: GridState = {
  gridItems: [],
};

function gridReducer(state: GridState, action: GridAction): GridState {
  let gridItems;
  switch (action.type) {
    case "ADD_ITEM":
      gridItems = [...state.gridItems, action.payload];
      localStorage.setItem("gridItems", JSON.stringify(gridItems));
      return {
        gridItems,
      };
    case "UPDATE_ITEM":
      gridItems = state.gridItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      localStorage.setItem("gridItems", JSON.stringify(gridItems));
      return {
        gridItems,
      };
    case "REMOVE_ITEM":
      gridItems = state.gridItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("gridItems", JSON.stringify(gridItems));
      return {
        gridItems,
      };
    case "CLEAR_ALL":
      localStorage.setItem("gridItems", JSON.stringify([]));
      return initialState;
    default:
      return state;
  }
}

const GridContext = createContext<{
  gridItems: GridItem[];
  selectedItem: GridItem | null;
  setSelectedItemId?: (id: string) => void;
  removeSelectedItem?: () => void;
  addGridItem?: (item: GridItem) => void;
  removeGridItem?: (id: string) => void;
  updateGridItemData?: (id: string, data: any) => void;
  updateGridItem?: (
    id: string,
    {
      top,
      left,
      height,
      width,
    }: {
      top: number;
      left: number;
      height: number;
      width: number;
    }
  ) => void;
}>({ gridItems: [], selectedItem: null });

const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>("");
  const [state, dispatch] = useReducer(gridReducer, initialState);

  useEffect(() => {
    const gridItems = JSON.parse(localStorage.getItem("gridItems") ?? "[]");
    if (gridItems.length) {
      dispatch({ type: "CLEAR_ALL" });
      gridItems.forEach((item: GridItem) => {
        dispatch({ type: "ADD_ITEM", payload: item });
      });
    }
  }, []);

  const addGridItem = (item: GridItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeGridItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateGridItem = (
    id: string,
    {
      top,
      left,
      height,
      width,
    }: {
      top: number;
      left: number;
      height: number;
      width: number;
    }
  ) => {
    const item = state.gridItems.find((item) => item.id === id);
    if (!item) return;
    dispatch({
      type: "UPDATE_ITEM",
      payload: {
        ...item,
        id,
        top,
        left,
        height,
        width,
      },
    });
  };

  const updateGridItemData = (id: string, data: any) => {
    const item = state.gridItems.find((item) => item.id === id);
    if (!item) return;
    dispatch({
      type: "UPDATE_ITEM",
      payload: {
        ...item,
        id,
        data: {
          ...item.data,
          ...data,
        },
      },
    });
  };

  const setSelectedItemId = (id: string) => {
    setSelectedItem(id || null);
  };

  const removeSelectedItem = () => {
    setSelectedItem(null);
  };

  return (
    <GridContext.Provider
      value={{
        gridItems: state.gridItems,
        addGridItem,
        removeGridItem,
        selectedItem:
          state.gridItems.find((item) => item.id === selectedItem) || null,
        setSelectedItemId,
        removeSelectedItem,
        updateGridItem,
        updateGridItemData,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

const useGrid = () => useContext(GridContext);

export { GridProvider, useGrid };
