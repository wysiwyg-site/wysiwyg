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
    <div className="bg-[#fefdf8]">
      <div className="max-w-xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: "project_id", label: "Project ID" },
            { name: "title", label: "Title" },
            { name: "summaryTitle", label: "Summary Title" },
            { name: "projectDescription", label: "Project Description" },
            { name: "question", label: "Question" },
            { name: "answer", label: "Answer" },
            { name: "summary", label: "Summary" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                name={name}
                placeholder={label}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="input"
              />
            </div>
          ))}

          {[
            { name: "services", label: "Meta: Services" },
            { name: "client", label: "Meta: Client" },
            { name: "sector", label: "Meta: Sector" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                name={`meta.${name}`}
                placeholder={label}
                value={(formData.meta as any)[name]}
                onChange={handleChange}
                className="input"
              />
            </div>
          ))}

          <div>
            <label className="block font-medium mb-1">
              Categories (comma-separated)
            </label>
            <input
              name="category"
              placeholder="branding, ui/ux"
              onChange={handleChange}
              value={formData.category}
              className="input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              placeholder="strategy, tech, design"
              onChange={handleChange}
              value={formData.tags}
              className="input"
            />
          </div>

          {/* 🔽 File Uploads */}
          <div>
            <label className="block font-medium mb-1">Slider 1 Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(e, setSlider1Images)}
              className="input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Slider 2 Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(e, setSlider2Images)}
              className="input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Column 1 Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(e, setColumn1Images)}
              className="input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Column 2 Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(e, setColumn2Images)}
              className="input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Main Image</label>
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

          {message && (
            <p className="mt-4 font-medium text-center text-green-700">
              {message}
            </p>
          )}
        </form>

        <style jsx>{`
          .input {
            display: block;
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 0.95rem;
          }

          label {
            font-size: 0.95rem;
          }
        `}</style>
      </div>
    </div>
  );
}
