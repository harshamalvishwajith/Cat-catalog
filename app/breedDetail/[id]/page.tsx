"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  getCatBreedById,
  CatBreed,
  CatBreedImage,
  getCatImageByBreedId,
} from "@/app/services/catApiService";

export default function BreedDetailPage() {
  const [breed, setBreed] = useState<CatBreed | null>(null);
  const [image, setImage] = useState<CatBreedImage | null>(null);
  const params = useParams();
  const breedId = params.id as string;

  useEffect(() => {
    const fetchBreedDetails = async () => {
      const breedDetails = await getCatBreedById(breedId);
      setBreed(breedDetails);
    };

    const fetchBreedImage = async () => {
      const imageUrl = await getCatImageByBreedId(breedId);
      setImage(imageUrl);
    };

    fetchBreedDetails();
    fetchBreedImage();
  }, [breedId]);

  if (!breed || !image) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{breed.name}</h1>

      <div className="mb-4">
        <Image
          src={image.url}
          alt={breed.name}
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <div>
          <strong>Origin:</strong> {breed.origin}
        </div>
        <div>
          <strong>Life Span:</strong> {breed.life_span} years
        </div>
        <div>
          <strong>Description:</strong> {breed.description}
        </div>
      </div>
    </div>
  );
}
