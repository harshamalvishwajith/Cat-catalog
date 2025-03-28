"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { TbFilterPlus } from "react-icons/tb";
import {
  getCatBreeds,
  CatBreed,
  CatBreedParams,
} from "@/app/services/catApiService";

export default function Home() {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<CatBreedParams>({
    limit: 20,
  });
  const [origins, setOrigins] = useState<string[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (breeds.length > 0) {
      const uniqueOrigins = Array.from(
        new Set(breeds.map((breed) => breed.origin).filter(Boolean))
      ).sort();
      setOrigins(uniqueOrigins);
    }
  }, [breeds]);

  const fetchBreeds = async (params?: CatBreedParams) => {
    setLoading(true);
    try {
      const apiParams = { ...params };
      const selectedOrigin = params?.origin;

      const fetchedBreeds = await getCatBreeds(apiParams);

      let filteredBreeds = fetchedBreeds;
      if (selectedOrigin) {
        filteredBreeds = fetchedBreeds.filter(
          (breed) => breed.origin === selectedOrigin
        );
      }

      setBreeds(filteredBreeds);
    } catch (error) {
      console.error("Failed to fetch breeds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds(filters);
  }, []);

  const applyFilters = () => {
    const newFilters = { ...filters };

    if (selectedOrigin) {
      newFilters.origin = selectedOrigin;
    } else {
      delete newFilters.origin;
    }

    setFilters(newFilters);
    fetchBreeds(newFilters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const defaultFilters = { limit: 20, page: 0 };
    setFilters(defaultFilters);
    setSelectedOrigin("");
    fetchBreeds(defaultFilters);
    setShowFilters(false);
  };

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 min-h-screen z-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Cat Catalog</h1>
      <div className="flex justify-end mb-6 gap-x-3 relative" ref={filterRef}>
        <input
          type="text"
          placeholder="Search cat breeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          name="filters"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center p-3 bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
          aria-label="Show filters"
        >
          <TbFilterPlus size={20} />
        </button>

        {showFilters && (
          <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border dark:border-gray-700">
            <h3 className="font-semibold mb-3 pb-2 border-b dark:border-gray-700">
              Filters
            </h3>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Results per page
              </label>
              <input
                type="number"
                value={filters.limit || 20}
                onChange={(e) =>
                  setFilters({ ...filters, limit: Number(e.target.value) })
                }
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                min={1}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Origin</label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Any origin</option>
                {origins.map((origin) => (
                  <option key={origin} value={origin}>
                    {origin}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Results order
              </label>
              <select
                value={filters.order || "ASC"}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    order: e.target.value as "ASC" | "DESC" | "RAND",
                  })
                }
                className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
                <option value="RAND">Random</option>
              </select>
            </div>

            <div className="flex justify-between mt-4 pt-2 border-t dark:border-gray-700">
              <button
                onClick={resetFilters}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {filters.origin && (
        <div className="mb-4 flex items-center">
          <span className="text-sm mr-2">Active filters:</span>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full flex items-center">
            Origin: {filters.origin} (client-side filter)
            <button
              onClick={() => {
                const newFilters = { ...filters };
                delete newFilters.origin;
                setFilters(newFilters);
                setSelectedOrigin("");
                fetchBreeds(newFilters);
              }}
              className="ml-1 hover:text-blue-500"
            >
              ×
            </button>
          </span>
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(filters.limit || 9)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse border rounded-lg p-4 dark:border-gray-700"
            >
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredBreeds.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg">
                No cat breeds found with the current filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 z-20">
              {filteredBreeds.map((breed) => (
                <Link
                  key={breed.id}
                  href={`/breedDetail/${breed.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition duration-300 shadow-sm hover:shadow-md z-20"
                >
                  <h2 className="text-xl font-semibold">{breed.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {breed.origin || "Unknown origin"}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
