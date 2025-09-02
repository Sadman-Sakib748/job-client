"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { Badge } from "@/components/ui/badge";

interface Product {
  _id: string;
  date?: string;
  title: string;
  payType: "Fixed Project" | "Hourly";
  price: string;
  summary: string;
  skills: string[];
  tags: string[];
  location: string;
  client: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const SkeletonDetails = () => (
  <section className="py-16 animate-pulse">
    <div className="w-11/12 max-w-6xl mx-auto flex flex-col gap-4">
      <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-600 rounded" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </section>
);

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");

  const { data: product, isLoading } = useSWR<Product>(
    id ? `https://backend-server-pink-three.vercel.app/items/${id}` : null,
    fetcher
  );

  if (isLoading) return <SkeletonDetails />;
  if (!product) return <div>Product not found</div>;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`https://backend-server-pink-three.vercel.app/items/${id}`, { method: "DELETE" });
      alert("Product deleted successfully");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted!\nName: ${applicantName}\nEmail: ${applicantEmail}`);
    setApplicantName("");
    setApplicantEmail("");
    setShowApplyForm(false);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="w-11/12 max-w-4xl mx-auto flex flex-col gap-6">
        {product.date && <div className="text-xs text-gray-500">{product.date}</div>}

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.title}</h1>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge className="border-gray-300 bg-gray-100">{product.payType}</Badge>
          <Badge className="border-green-300 bg-green-100">{product.price}</Badge>
          <Badge className="border-purple-300 bg-purple-100">Verified</Badge>
        </div>

        <p className="text-gray-700 text-lg mb-4">{product.summary}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {product.skills.map(skill => (
            <Badge key={skill} className="border-gray-300 bg-white">{skill}</Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map(tag => (
            <Badge key={tag} className="border-gray-300 bg-gray-100">{tag}</Badge>
          ))}
        </div>

        <div className="text-xs text-gray-500 mb-6">
          <span className="font-medium">{product.location}</span>
          <span className="mx-2 opacity-40">•</span>
          {product.client}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowApplyForm(!showApplyForm)}
            className="w-full sm:w-auto py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Apply Now
          </button>

          <button
            onClick={() => alert("Buy functionality here")}
            className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Buy Now
          </button>

          <button
            onClick={handleDelete}
            className="w-full sm:w-auto py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Delete
          </button>

          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto py-3 px-6 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-xl transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {showApplyForm && (
          <form
            onSubmit={handleApply}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Apply for this Job</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
