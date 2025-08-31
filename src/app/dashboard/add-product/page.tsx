"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

interface Product {
  id?: number;
  name: string;
  description: string;
  image: string;
  price: string;
}

const AddProductPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    image: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  // Redirect client-side if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to add product");

      Swal.fire({
        title: "Success!",
        text: "Product added successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/products");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add product",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while session is being fetched
  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  // Don't render form until authenticated
  if (status !== "authenticated") return null;

  return (
    <div className="max-w-xl mx-auto py-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
