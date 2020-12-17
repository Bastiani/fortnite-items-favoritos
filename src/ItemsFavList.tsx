import React, { useState, useEffect } from "react";
import {
  OrderedList,
  ListItem,
  Link,
  Button,
  Flex,
  Image
} from "@chakra-ui/react";
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
          <Flex direction="column" m="15px">
            <Link
              href={
                item.data.items[0].images.featured ||
                item.data.items[0].images.icon
              }
              isExternal
            >
              <Flex direction="row" mb="10px" alignItems="center">
                <Image
                  key={item.data.items[0].id}
                  src={item.data.items[0].images.icon}
                  alt={item.data.items[0].description}
                  boxSize="50px"
                />
                {item.data.items[0].name}
              </Flex>
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
          </Flex>
        </ListItem>
      ))}
    </OrderedList>
  );
};

export default ItemsFavList;
