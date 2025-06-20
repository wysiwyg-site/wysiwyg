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

  const [slider1Images, setSlider1Images] = useState<File[]>([]);
  const [slider2Images, setSlider2Images] = useState<File[]>([]);
  const [column1Images, setColumn1Images] = useState<File[]>([]);
  const [column2Images, setColumn2Images] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);

  const [message, setMessage] = useState("");
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

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    if (e.target.files) {
      setter(Array.from(e.target.files));
    }
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

    if (mainImage) {
      payload.append("mainImage", mainImage);
    }

    slider1Images.forEach((file) => payload.append("slider1", file));
    slider2Images.forEach((file) => payload.append("slider2", file));
    column1Images.forEach((file) => payload.append("column1", file));
    column2Images.forEach((file) => payload.append("column2", file));

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

      setSlider1Images([]);
      setSlider2Images([]);
      setColumn1Images([]);
      setColumn2Images([]);
      setMainImage(null);

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

        {/* Separate image uploads */}
        <div>
          <label>Slider 1 Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e, setSlider1Images)}
            className="input"
          />
        </div>

        <div>
          <label>Slider 2 Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e, setSlider2Images)}
            className="input"
          />
        </div>

        <div>
          <label>Column 1 Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e, setColumn1Images)}
            className="input"
          />
        </div>

        <div>
          <label>Column 2 Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e, setColumn2Images)}
            className="input"
          />
        </div>

        <div>
          <label>Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files?.[0] || null)}
            className="input"
          />
        </div>

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

        label {
          display: block;
          font-weight: 600;
          margin-top: 12px;
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
}
