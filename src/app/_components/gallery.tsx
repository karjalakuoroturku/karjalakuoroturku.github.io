"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  images: Array<{ src: string; alt: string }>;
}

export function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{src: string; alt: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-5">
          <h2 className="mb-12 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
            Kuvagalleria
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full relative">
            <button
              className="absolute -top-10 right-0 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close modal"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1024}
              height={1024}
              className={`w-full h-auto rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              onClick={(e) => e.stopPropagation()}
              onLoadStart={() => setIsLoading(true)}
              onLoadingComplete={() => setIsLoading(false)}
            />
          </div>
        </div>
      )}
    </>
  );
} 