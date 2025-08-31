"use client";

import React from "react";
import Image from "next/image";
import useSWR from "swr";

// Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Skeleton Card (same design as card but with placeholders)
const SkeletonCard = () => (
  <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden animate-pulse">
    {/* Image Placeholder */}
    <div className="relative w-full h-48 bg-gray-300 dark:bg-gray-700" />

    {/* Content Placeholder */}
    <div className="px-4 pt-4 pb-6 text-center">
      <div className="h-5 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded mb-3" />
      <div className="h-4 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded mb-2" />
      <div className="h-3 w-full mx-auto bg-gray-300 dark:bg-gray-700 rounded mb-2" />
      <div className="h-3 w-5/6 mx-auto bg-gray-300 dark:bg-gray-700 rounded mb-4" />
      <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-xl" />
    </div>
  </div>
);

const ProductListPage = () => {
  // useSWR for caching and automatic revalidation
  const { data: products, isLoading } = useSWR<Product[]>(
    "https://circle-tec.vercel.app/api/items",
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <section className="py-16 min-h-screen">
      {/* Section Heading */}
      <div className="w-11/12 mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Our Top Products
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Explore our selection of high-quality computer products and accessories.
        </p>
      </div>

      {/* Grid */}
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {isLoading
          ? // Show 12 skeletons while loading
            Array.from({ length: 12 }).map((_, idx) => <SkeletonCard key={idx} />)
          : // Show products once fetched
            products?.map((product) => (
              <div
                key={product.id}
                className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative w-full h-48">
                  {product.image.startsWith("http") ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700">
                      Image not found
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="px-4 pt-4 pb-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-red-600 dark:text-red-400 font-semibold text-md mb-2">
                    {product.price}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-4">
                    {product.description}
                  </p>
                  <button
                    onClick={() => (window.location.href = `/products/${product.id}`)}
                    className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default ProductListPage;
