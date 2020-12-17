import * as React from "react";

import useItems from "../hooks/useItems";

export const ItemsContext = React.createContext({});

const ItemsProvider = ({ children }: any) => {
  return (
    <ItemsContext.Provider value={useItems()}>{children}</ItemsContext.Provider>
  );
};

export default ItemsProvider;
