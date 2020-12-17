import React, { useState, useEffect } from "react";
import { OrderedList, ListItem, Link, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { cosmeticsById } from "./api";
import { useItemsContext } from "./hooks/useItemsContext";

const ItemsFavList = () => {
  const [itemsState, setItemsState] = useState<Array<unknown>>([]);
  const [store, dispatch] = useItemsContext();

  const getItemsData = async () => {
    const items = store;
    Promise.all(items.map(async (id: string) => await cosmeticsById(id))).then(
      (values) => {
        setItemsState(values);
      }
    );
  };

  useEffect(() => {
    getItemsData();
  }, [store]);

  return (
    <OrderedList p="10px">
      {itemsState.map((item: any) => (
        <ListItem key={item.data.items[0].id} mb="5px">
          <Link
            href={
              item.data.items[0].images.featured ||
              item.data.items[0].images.icon
            }
            isExternal
          >
            {item.data.items[0].name}
          </Link>
          <Button
            w={6}
            h={6}
            onClick={() => {
              dispatch({ type: "remove", value: item.data.items[0].id });
            }}
          >
            <DeleteIcon />
          </Button>
        </ListItem>
      ))}
    </OrderedList>
  );
};

export default ItemsFavList;
