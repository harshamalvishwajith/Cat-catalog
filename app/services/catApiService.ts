import axios from "axios";

const CAT_API_BASE_URL = "https://api.thecatapi.com/v1";

export interface CatBreed {
  id: string;
  name: string;
  description: string;
  origin: string;
  life_span: string;
}

export interface CatBreedImage {
  url: string;
}

export interface CatBreedParams {
  limit?: number;
  origin?: string;
  order?: "ASC" | "DESC" | "RAND";
}

export const getCatBreeds = async (
  params?: CatBreedParams
): Promise<CatBreed[]> => {
  try {
    const breedsResponse = await axios.get(`${CAT_API_BASE_URL}/breeds`, {
      params: {
        limit: params?.limit || 20,
        order: params?.order || "ASC",
      },
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY,
      },
    });

    return breedsResponse.data;
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    return [];
  }
};

export const getCatBreedById = async (
  breedId: string
): Promise<CatBreed | null> => {
  try {
    const breedResponse = await axios.get(
      `${CAT_API_BASE_URL}/breeds/${breedId}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY,
        },
      }
    );

    return {
      ...breedResponse.data,
    };
  } catch (error) {
    console.error(`Error fetching breed ${breedId}:`, error);
    return null;
  }
};

export const getCatImageByBreedId = async (
  breedId: string
): Promise<CatBreedImage[] | null> => {
  try {
    const imageResponse = await axios.get(`${CAT_API_BASE_URL}/images/search`, {
      params: {
        breed_ids: breedId,
        limit: 5,
      },
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY,
      },
    });

    return imageResponse.data || null;
  } catch (error) {
    console.error(`Error fetching image for breed ${breedId}:`, error);
    return null;
  }
};
