"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCatBreeds, CatBreed } from "@/app/services/catApiService";

export default function Home() {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBreeds = async () => {
      const fetchedBreeds = await getCatBreeds();
      setBreeds(fetchedBreeds);
    };

    fetchBreeds();
  }, []);

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cat Breeds</h1>

      <input
        type="text"
        placeholder="Search cat breeds..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBreeds.map((breed) => (
          <Link
            key={breed.id}
            href={`/breedDetail/${breed.id}`}
            className="block p-4 border rounded hover:bg-gray-100 hover:text-black transition"
          >
            <h2 className="text-xl font-semibold">{breed.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
