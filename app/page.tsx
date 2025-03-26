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
        <div className="flex justify-center">
          <div className="animate-pulse">Loading breeds...</div>
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
