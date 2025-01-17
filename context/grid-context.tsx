"use client";

import { createContext, useContext, useReducer, useState } from "react";

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
  switch (action.type) {
    case "ADD_ITEM":
      return {
        gridItems: [...state.gridItems, action.payload],
      };
    case "UPDATE_ITEM":
      return {
        gridItems: state.gridItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        gridItems: state.gridItems.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_ALL":
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
}>({ gridItems: [], selectedItem: null });

const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<GridItem | null>(null);
  const [state, dispatch] = useReducer(gridReducer, initialState);

  const addGridItem = (item: GridItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeGridItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const setSelectedItemId = (id: string) => {
    const item = state.gridItems.find((item) => item.id === id);
    setSelectedItem(item || null);
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
        selectedItem,
        setSelectedItemId,
        removeSelectedItem,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

const useGrid = () => useContext(GridContext);

export { GridProvider, useGrid };
