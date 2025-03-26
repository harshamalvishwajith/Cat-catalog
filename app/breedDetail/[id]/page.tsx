"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  getCatBreedById,
  CatBreed,
  CatBreedImage,
  getCatImageByBreedId,
} from "@/app/services/catApiService";

export default function BreedDetailPage() {
  const [breed, setBreed] = useState<CatBreed | null>(null);
  const [image, setImage] = useState<CatBreedImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const breedId = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [breedDetails, imageUrl] = await Promise.all([
          getCatBreedById(breedId),
          getCatImageByBreedId(breedId),
        ]);
        setBreed(breedDetails);
        setImage(imageUrl);
      } catch (err) {
        console.error("Error fetching cat details:", err);
        setError("Failed to load cat details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [breedId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-lg">Loading cat details...</div>
      </div>
    );
  }

  if (error || !breed || !image) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center min-h-[60vh] justify-center">
        <div className="text-red-500 dark:text-red-400 mb-4">
          {error || "Could not find cat breed details"}
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen">
      <button
        onClick={() => router.back()}
        className="self-start mb-4 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">{breed.name}</h1>

      <div className="mb-6 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Image
          src={image.url}
          alt={breed.name}
          width={500}
          height={500}
          className="rounded-lg h-64 w-auto object-cover"
        />
      </div>

      <div className="space-y-4 max-w-lg bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
        <div className="border-b pb-2 dark:border-gray-700">
          <strong>Origin:</strong> {breed.origin}
        </div>
        <div className="border-b pb-2 dark:border-gray-700">
          <strong>Life Span:</strong> {breed.life_span} years
        </div>
        <div>
          <strong>Description:</strong> {breed.description}
        </div>
      </div>
    </div>
  );
}
