"use client";

import React, { useState } from "react";
import axios from "axios";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    payType: "Fixed Project",
    price: "",
    summary: "",
    skills: "",
    tags: "",
    location: "",
    client: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("https://backend-server-pink-three.vercel.app/add", {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
        tags: formData.tags.split(",").map((t) => t.trim()),
      });
      setMessage("Product added successfully!");
      setFormData({
        title: "",
        payType: "Fixed Project",
        price: "",
        summary: "",
        skills: "",
        tags: "",
        location: "",
        client: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Add New Job</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="payType"
          value={formData.payType}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Fixed Project">Fixed Project</option>
          <option value="Hourly">Hourly</option>
        </select>

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <textarea
          name="summary"
          placeholder="Summary"
          value={formData.summary}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="client"
          placeholder="Client"
          value={formData.client}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
        >
          {loading ? "Submitting..." : "Add Job"}
        </button>

        {message && <p className="text-center mt-2 text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default AddProductPage;
