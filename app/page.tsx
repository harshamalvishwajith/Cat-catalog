"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCatBreeds, CatBreed } from "@/app/services/catApiService";

export default function Home() {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const fetchedBreeds = await getCatBreeds();
        setBreeds(fetchedBreeds);
      } catch (error) {
        console.error("Failed to fetch breeds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Cat Breeds Catalog
      </h1>

      <input
        type="text"
        placeholder="Search cat breeds..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, index) => (
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBreeds.map((breed) => (
            <Link
              key={breed.id}
              href={`/breedDetail/${breed.id}`}
              className="block p-4 border rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition duration-300 shadow-sm hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">{breed.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {breed.origin || "Unknown origin"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
