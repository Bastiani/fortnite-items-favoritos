import { useContext } from "react";

import { ItemsContext } from "../context/ItemsContext";

export const useItemsContext = () => useContext<any>(ItemsContext);
