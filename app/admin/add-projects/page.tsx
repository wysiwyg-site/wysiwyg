"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const [formData, setFormData] = useState({
    project_id: "",
    title: "",
    summaryTitle: "",
    projectDescription: "",
    question: "",
    answer: "",
    summary: "",
    meta: {
      services: "",
      client: "",
      sector: "",
    },
    category: "",
    tags: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [mainImage, setMainImage] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.startsWith("meta.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        meta: {
          ...prev.meta,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: any) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("project_id", formData.project_id);
    payload.append("title", formData.title);
    payload.append("summaryTitle", formData.summaryTitle);
    payload.append("projectDescription", formData.projectDescription);
    payload.append("question", formData.question);
    payload.append("answer", formData.answer);
    payload.append("summary", formData.summary);
    payload.append("meta", JSON.stringify(formData.meta));
    payload.append(
      "category",
      JSON.stringify(
        formData.category
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
      )
    );
    payload.append(
      "tags",
      JSON.stringify(
        formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
    );

    images.forEach((file) => {
      payload.append("images", file);
    });
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ Project added successfully!");
      setFormData({
        project_id: "",
        title: "",
        summaryTitle: "",
        projectDescription: "",
        question: "",
        answer: "",
        summary: "",
        meta: { services: "", client: "", sector: "" },
        category: "",
        tags: "",
      });
      setImages([]);
      router.push("/admin");
    } catch (error) {
      setMessage("❌ Failed to add project");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "project_id",
          "title",
          "summaryTitle",
          "projectDescription",
          "question",
          "answer",
          "summary",
        ].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            className="input"
          />
        ))}

        {["services", "client", "sector"].map((field) => (
          <input
            key={field}
            name={`meta.${field}`}
            placeholder={`Meta: ${field}`}
            value={(formData.meta as any)[field]}
            onChange={handleChange}
            className="input"
          />
        ))}

        <input
          name="category"
          placeholder="Categories (comma-separated)"
          onChange={handleChange}
          value={formData.category}
          className="input"
        />

        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          onChange={handleChange}
          value={formData.tags}
          className="input"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="input"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Submit
        </button>

        {message && <p className="mt-4">{message}</p>}
      </form>

      <style jsx>{`
        .input {
          display: block;
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
