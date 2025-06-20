"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ReactSortable } from "react-sortablejs";

export default function EditPageComponent() {
  const { project_id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
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

  const [existingImages, setExistingImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/projects`
        );
        const project = res.data.find((p) => p.project_id === project_id);
        if (!project) return;

        setFormData({
          project_id: project.project_id,
          title: project.title,
          summaryTitle: project.summaryTitle,
          projectDescription: project.projectDescription,
          question: project.question,
          answer: project.answer,
          summary: project.summary,
          meta: project.meta,
          category: project.category.join(", "),
          tags: project.tags.join(", "),
        });

        setExistingImages(project.images || []);
        setMainImage(project.mainImage || "");
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchProject();
  }, [project_id]);

  const handleChange = (e) => {
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
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNewImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleRemoveExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
    if (mainImage === url) setMainImage(""); // Unset if removed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("project_id", formData.project_id);
    payload.append("title", formData.title);
    payload.append("summaryTitle", formData.summaryTitle);
    payload.append("projectDescription", formData.projectDescription);
    payload.append("question", formData.question);
    payload.append("answer", formData.answer);
    payload.append("summary", formData.summary);
    payload.append("mainImage", mainImage);
    payload.append("meta", JSON.stringify(formData.meta));
    payload.append(
      "category",
      JSON.stringify(formData.category.split(",").map((c) => c.trim()))
    );
    payload.append(
      "tags",
      JSON.stringify(formData.tags.split(",").map((t) => t.trim()))
    );
    payload.append("retainedImages", JSON.stringify(existingImages));

    newImages.forEach((file) => {
      payload.append("images", file);
    });

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project_id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("✅ Project updated successfully.");
      router.push("/admin");
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("❌ Failed to update project.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
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
            value={formData[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full border p-2 rounded"
            required
          />
        ))}

        <div className="flex gap-2">
          {["services", "client", "sector"].map((key) => (
            <input
              key={key}
              name={`meta.${key}`}
              value={formData.meta[key]}
              onChange={handleChange}
              placeholder={`meta: ${key}`}
              className="w-full border p-2 rounded"
            />
          ))}
        </div>

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Comma-separated categories"
          className="w-full border p-2 rounded"
        />
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Comma-separated tags"
          className="w-full border p-2 rounded"
        />

        <label className="block font-medium mt-4">
          Reorder & Manage Existing Images:
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Drag to reorder. First image will show first on the frontend.
        </p>

        <ReactSortable
          tag="div"
          list={existingImages}
          setList={setExistingImages}
          className="flex flex-wrap gap-4"
        >
          {existingImages.map((img, idx) => (
            <div key={img} className="relative">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${img}`}
                alt=""
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => setMainImage(img)}
                className={`absolute bottom-1 right-1 bg-blue-500 text-white rounded px-2 py-1 text-xs ${
                  mainImage === img ? "bg-green-600" : ""
                }`}
              >
                {mainImage === img ? "Main Image ✅" : "Set as Main"}
              </button>
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(img)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </ReactSortable>

        <label className="block font-medium mt-4">Add New Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleNewImageChange}
          className="block"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Project
        </button>
      </form>
    </div>
  );
}
