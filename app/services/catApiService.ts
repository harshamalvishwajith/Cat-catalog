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

export const getCatBreeds = async (): Promise<CatBreed[]> => {
  try {
    // Fetch breeds
    const breedsResponse = await axios.get(`${CAT_API_BASE_URL}/breeds`, {
      params: {
        limit: 20,
      },
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY,
      },
    });

    // Fetch images for each breed
    const breedsWithImages = await Promise.all(
      breedsResponse.data.map(async (breed: CatBreed) => {
        try {
          const imageResponse = await axios.get(
            `${CAT_API_BASE_URL}/images/search`,
            {
              params: {
                breed_ids: breed.id,
                limit: 1,
              },
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY,
              },
            }
          );

          return {
            ...breed,
          };
        } catch (imageError) {
          console.error(
            `Error fetching image for breed ${breed.id}:`,
            imageError
          );
          return breed;
        }
      })
    );

    return breedsWithImages;
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    return [];
  }
};

export const getCatBreedById = async (
  breedId: string
): Promise<CatBreed | null> => {
  try {
    // Fetch breed details
    const breedResponse = await axios.get(
      `${CAT_API_BASE_URL}/breeds/${breedId}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY,
        },
      }
    );

    // Fetch image for the breed
    const imageResponse = await axios.get(`${CAT_API_BASE_URL}/images/search`, {
      params: {
        breed_ids: breedId,
        limit: 1,
      },
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY,
      },
    });

    return {
      ...breedResponse.data,
      image_url: imageResponse.data[2]?.url || "",
    };
  } catch (error) {
    console.error(`Error fetching breed ${breedId}:`, error);
    return null;
  }
};

export const getCatImageByBreedId = async (
  breedId: string
): Promise<CatBreedImage | null> => {
  try {
    // Fetch image for the breed
    const imageResponse = await axios.get(`${CAT_API_BASE_URL}/images/search`, {
      params: {
        breed_ids: breedId,
        limit: 1,
      },
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY,
      },
    });

    return imageResponse.data[0] || null;
  } catch (error) {
    console.error(`Error fetching image for breed ${breedId}:`, error);
    return null;
  }
};
