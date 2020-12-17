import * as React from "react";

import Layout from "./Layout";
import ItemsProvider from "./context/ItemsContext";

export default function App() {
  return (
    <ItemsProvider>
      <Layout />
    </ItemsProvider>
  );
}
