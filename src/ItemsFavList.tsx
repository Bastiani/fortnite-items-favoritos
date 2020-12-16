import React, { useState, useEffect } from "react";
import { OrderedList, ListItem, Link } from "@chakra-ui/react";

import { getItemList } from "./ItemsList";
import { cosmeticsById } from "./api";

const ItemsFavList = () => {
  const [itemsState, setItemsState] = useState<Array<unknown>>([]);
  useEffect(() => {
    const items = getItemList();
    const mountListItems = async () => {
      Promise.all(
        items.map(async (id: string) => await cosmeticsById(id))
      ).then((values) => {
        setItemsState(values);
      });
    };
    mountListItems();
  }, []);
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
        </ListItem>
      ))}
    </OrderedList>
  );
};

export default ItemsFavList;
