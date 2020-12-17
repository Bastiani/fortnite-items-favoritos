import * as React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import ItemsList from "./ItemsList";
import ItemsFavList from "./ItemsFavList";

export default function Layout() {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={5}
    >
      <GridItem colSpan={1} rowSpan={2}>
        <ItemsFavList />
      </GridItem>
      <GridItem colSpan={3} rowSpan={2}>
        <ItemsList />
      </GridItem>
    </Grid>
  );
}
