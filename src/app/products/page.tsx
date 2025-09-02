"use client";

import React from "react";
import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  id?: string; // mapped later
  date: string;
  title: string;
  payType: "Fixed Project" | "Hourly";
  price: string;
  summary: string;
  skills: string[];
  tags: string[];
  location: string;
  client: string;
  featured?: boolean;
}

const fetcher = (url: string) =>
  fetch(url)
    .then(res => res.json())
    .then(data => Array.isArray(data) ? data.map(item => ({ ...item, id: item._id })) : { ...data, id: data._id });

const SkeletonCard = () => (
  <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
    <div className="h-4 w-1/4 bg-gray-300 rounded mb-2" />
    <div className="h-6 w-3/4 bg-gray-300 rounded mb-4" />
    <div className="h-4 w-full bg-gray-300 rounded mb-3" />
    <div className="flex flex-wrap gap-2 mb-3">
      <div className="h-5 w-14 bg-gray-300 rounded" />
      <div className="h-5 w-20 bg-gray-300 rounded" />
    </div>
    <div className="h-10 w-full bg-gray-300 rounded-xl mt-auto" />
  </div>
);

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div
      className={`relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg ${
        product.featured ? "ring-1 ring-slate-900/10" : ""
      }`}
    >
      <div className="text-xs text-slate-500">{product.date}</div>
      <h3 className="mt-2 text-base font-semibold text-slate-900 md:text-lg">{product.title}</h3>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Badge className="border-slate-200 bg-slate-50 text-slate-700">{product.payType}</Badge>
        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">{product.price}</Badge>
        <Badge className="border-violet-200 bg-violet-50 text-violet-700">Verified</Badge>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{product.summary}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {product.skills.map((skill) => (
          <Badge key={skill} className="border-slate-200 bg-white text-slate-700">{skill}</Badge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <Badge key={tag} className="border-slate-200 bg-gray-50 text-slate-700">{tag}</Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500">
          <span className="font-medium text-slate-700">{product.location}</span>
          <span className="mx-2 opacity-40">•</span>
          {product.client}
        </div>
        <button
          onClick={() => router.push(`/products/${product.id}`)}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          type="button"
        >
          Details
        </button>
      </div>

      {product.featured && (
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-slate-900/[0.02] to-transparent" />
      )}
    </div>
  );
}

export default function ProductListPage() {
  const { data: products, isLoading } = useSWR<Product[]>(
    "https://backend-server-pink-three.vercel.app/items",
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="w-11/12 mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-slate-900">Our Top Products</h1>
        <p className="text-gray-700 text-lg">Explore our selection of high-quality computer products.</p>
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 12 }).map((_, idx) => <SkeletonCard key={idx} />)
          : products?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
