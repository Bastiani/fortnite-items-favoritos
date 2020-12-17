import React, { createContext, useReducer, useContext } from "react";

const ItemStateContext = createContext<Array<any>>([]);
const ItemDispatchContext = createContext<any>([]);

function itemReducer(state: any, action: any) {
  switch (action.type) {
    case "add": {
      return [...state, state.value];
    }
    case "remove": {
      return state.filter((item: string) => item !== state.value);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ItemProvider({ children }: any) {
  const [state, dispatch] = useReducer(itemReducer, []);
  return (
    <ItemStateContext.Provider value={state}>
      <ItemDispatchContext.Provider value={dispatch}>
        {children}
      </ItemDispatchContext.Provider>
    </ItemStateContext.Provider>
  );
}

function useItemState() {
  const context = useContext(ItemStateContext);
  if (context === undefined) {
    throw new Error("useItemState must be used within a ItemProvider");
  }
  return context;
}

function useItemDispatch() {
  const context = useContext(ItemDispatchContext);
  if (context === undefined) {
    throw new Error("useItemDispatch must be used within a ItemProvider");
  }
  return context;
}

export { ItemProvider, useItemState, useItemDispatch };
