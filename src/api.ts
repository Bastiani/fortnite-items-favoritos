import axios from "axios";

export type ApiResponse = {
  data: {
    status: number;
    message: string;
    items: Array<any>;
  };
};

export const cosmetics = async (
  name: string,
  rarity: string = "EPIC"
): Promise<ApiResponse> => {
  try {
    const instance = axios.create({
      baseURL: "https://fortnite-api.com/v2",
      headers: { "x-api-key": "dc0b9fc761168a641ef0c1514f9541521442ba7c" }
    });
    const response = await instance.get("/cosmetics/br/search/all", {
      params: {
        language: "pt-BR",
        searchLanguage: "pt-BR",
        type: "outfit",
        matchMethod: "contains",
        ...(name ? { name } : null),
        rarity
      }
    });
    return {
      data: {
        status: 200,
        message: "",
        items: response.data.data
      }
    };
  } catch (error) {
    console.log(error);
    console.error(error.response?.data.error); // ***
    console.error(error.response?.status); // ***
    console.error(error.response?.headers); // ***
    return {
      data: {
        status: error.response?.status,
        message: error.response?.data.error,
        items: []
      }
    };
  }
};

export const cosmeticsById = async (id: string): Promise<ApiResponse> => {
  try {
    const instance = axios.create({
      baseURL: "https://fortnite-api.com/v2",
      headers: { "x-api-key": "dc0b9fc761168a641ef0c1514f9541521442ba7c" }
    });
    const response = await instance.get("/cosmetics/br/search/ids", {
      params: {
        language: "pt-BR",
        id
      }
    });
    return {
      data: {
        status: 200,
        message: "",
        items: response.data.data
      }
    };
  } catch (error) {
    console.log(error);
    console.error(error.response?.data.error); // ***
    console.error(error.response?.status); // ***
    console.error(error.response?.headers); // ***
    return {
      data: {
        status: error.response?.status,
        message: error.response?.data.error,
        items: []
      }
    };
  }
};
