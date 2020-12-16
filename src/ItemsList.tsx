import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  Box,
  Spinner,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  GridItem,
  Button,
  Link
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { cosmetics } from "./api";

type ApiParams = {
  name?: string;
  rarity?: string;
};

export const getItemList = () =>
  JSON.parse(localStorage.getItem("fortniteItemsFav") || "[]") || [];

export const addItemToList = (value: string) => {
  const items = getItemList();
  const newItems = [...items, value];
  const uniqueItems = Array.from(new Set(newItems));
  localStorage.setItem("fortniteItemsFav", JSON.stringify(uniqueItems));
};

const ItemsList = () => {
  const [apiReturn, setApiReturn] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [rarity, setRarity] = useState("EPIC");

  const callApi = async (params: ApiParams) => {
    setLoading(true);
    const response = await cosmetics(
      params.name || "",
      params.rarity || "EPIC"
    );
    setLoading(false);
    setApiReturn(response);
  };

  useEffect(() => {
    callApi({ name, rarity });
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    callApi({ name, rarity });
  };

  const data = apiReturn?.data;
  return data ? (
    <Grid
      h="100vh"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(1, 1fr)"
      gap={5}
    >
      <GridItem>
        <form onSubmit={onSubmit}>
          <Flex direction="row">
            <FormControl id="name">
              <FormLabel>Nome</FormLabel>
              <Input
                key="_name"
                name="name"
                onChange={(e: any) => setName(e.target.value)}
                value={name}
              />
            </FormControl>
            <FormControl id="rarity">
              <FormLabel>Raridade</FormLabel>
              <Select
                placeholder="Escolha uma opção"
                onChange={(e: any) => setRarity(e.target.value)}
                value={rarity}
              >
                <option value="EPIC">Épico</option>
                <option value="RARE">Raro</option>
                <option value="LEGENDARY">Lendário</option>
                <option value="UNCOMMON">Incomum</option>
                <option value="gaminglegends">Série Lendas dos Jogos</option>
                <option value="starwars">Série Star Wars</option>
                <option value="marvel">Série Marvel</option>
                <option value="dc">Série DC</option>
              </Select>
            </FormControl>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="teal"
              variant="outline"
              type="submit"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </GridItem>
      <GridItem bg="blue.500">
        <Flex direction="row" wrap="wrap">
          {data.status === 200
            ? data?.items?.map((item: any) => (
                <Box
                  key={item.id}
                  margin="10px"
                  borderWidth="2px"
                  borderRadius="lg"
                  borderColor="blue.700"
                  overflow="hidden"
                  maxW="200px"
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <Link href={item.images.featured} isExternal>
                        <Image
                          key={item.id}
                          src={item.images.icon}
                          alt={item.description}
                          boxSize="200px"
                        />
                      </Link>
                      <Box textAlign="center">
                        <Text fontSize="lg">{item.name}</Text>
                        <Text fontSize="sm">{item.rarity.displayValue}</Text>
                        <Button
                          colorScheme="blue"
                          onClick={() => addItemToList(item.id)}
                        >
                          <AddIcon />
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              ))
            : data.message}
        </Flex>
      </GridItem>
    </Grid>
  ) : (
    <Spinner size="xl" />
  );
};

export default ItemsList;
