import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getCatBreeds,
  getCatBreedById,
  getCatImageByBreedId,
} from "../catApiService";

const CAT_API_BASE_URL = "https://api.thecatapi.com/v1";

describe("Cat API Services", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);

    process.env.NEXT_PUBLIC_CAT_API_KEY = "test-api-key";
  });

  afterEach(() => {
    mock.reset();
  });

  describe("getCatBreeds", () => {
    it("should fetch cat breeds successfully", async () => {
      const mockBreeds = [
        {
          id: "1",
          name: "Persian",
          description: "Fluffy cat",
          origin: "Iran",
          life_span: "10-15",
        },
      ];

      mock.onGet(`${CAT_API_BASE_URL}/breeds`).reply(200, mockBreeds);

      const breeds = await getCatBreeds();

      expect(mock.history.get[0].url).toBe(`${CAT_API_BASE_URL}/breeds`);
      expect(mock.history.get[0].params).toEqual({
        limit: 20,
        order: "ASC",
      });
      expect(breeds).toEqual(mockBreeds);
    });

    it("should handle custom params", async () => {
      const mockBreeds = [
        {
          id: "1",
          name: "Siamese",
          description: "Vocal cat",
          origin: "Thailand",
          life_span: "12-15",
        },
      ];

      mock.onGet(`${CAT_API_BASE_URL}/breeds`).reply(200, mockBreeds);

      const breeds = await getCatBreeds({
        limit: 10,
        order: "DESC",
      });

      expect(mock.history.get[0].params).toEqual({
        limit: 10,
        order: "DESC",
      });
      expect(breeds).toEqual(mockBreeds);
    });

    it("should return empty array on error", async () => {
      mock.onGet(`${CAT_API_BASE_URL}/breeds`).networkError();

      const breeds = await getCatBreeds();

      expect(breeds).toEqual([]);
    });
  });

  describe("getCatBreedById", () => {
    it("should fetch a specific breed successfully", async () => {
      const mockBreed = {
        id: "beng",
        name: "Bengal",
        description: "Wild-looking domestic cat",
        origin: "United States",
        life_span: "10-16",
      };

      mock.onGet(`${CAT_API_BASE_URL}/breeds/beng`).reply(200, mockBreed);

      const breed = await getCatBreedById("beng");

      expect(mock.history.get[0].url).toBe(`${CAT_API_BASE_URL}/breeds/beng`);
      expect(breed).toEqual(mockBreed);
    });

    it("should return null on error", async () => {
      mock.onGet(`${CAT_API_BASE_URL}/breeds/nonexistent`).networkError();

      const breed = await getCatBreedById("nonexistent");

      expect(breed).toBeNull();
    });
  });

  describe("getCatImageByBreedId", () => {
    it("should fetch images for a specific breed", async () => {
      const mockImages = [{ url: "https://example.com/cat-image.jpg" }];

      mock.onGet(`${CAT_API_BASE_URL}/images/search`).reply(200, mockImages);

      const images = await getCatImageByBreedId("beng");

      expect(mock.history.get[0].url).toBe(`${CAT_API_BASE_URL}/images/search`);
      expect(mock.history.get[0].params).toEqual({
        breed_ids: "beng",
        limit: 5,
      });
      expect(images).toEqual(mockImages);
    });

    it("should return null when no images are found", async () => {
      mock.onGet(`${CAT_API_BASE_URL}/images/search`).reply(200, []);

      const images = await getCatImageByBreedId("beng");

      expect(images).toEqual([]);
    });

    it("should return null on error", async () => {
      mock.onGet(`${CAT_API_BASE_URL}/images/search`).networkError();

      const images = await getCatImageByBreedId("beng");

      expect(images).toBeNull();
    });
  });
});
