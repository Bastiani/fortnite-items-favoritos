import { useReducer } from "react";

type State = Array<string>;

export const getItemList = () =>
  JSON.parse(localStorage.getItem("fortniteItemsFav") || "[]") || [];

export const addItemToList = (value: string) => {
  const items = getItemList();
  const newItems = [...items, value];
  const uniqueItems = Array.from(new Set(newItems));
  localStorage.setItem("fortniteItemsFav", JSON.stringify(uniqueItems));
};

export const removeItemToList = (value: string) => {
  const items = getItemList();
  const newItems = items.filter((item: string) => item !== value);
  const uniqueItems = Array.from(new Set(newItems));
  localStorage.setItem("fortniteItemsFav", JSON.stringify(uniqueItems));
};

export const initialState: State = getItemList();

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "add": {
      addItemToList(action.value);
      return [...state, action.value];
    }
    case "remove": {
      removeItemToList(action.value);
      return state.filter((item: string) => item !== action.value);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default function useItems() {
  const [store, dispatch] = useReducer(reducer, initialState);

  return [store, dispatch];
}
