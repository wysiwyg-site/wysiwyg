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

  const [existingMainImage, setExistingMainImage] = useState("");
  const [newMainImage, setNewMainImage] = useState(null);
  const [message, setMessage] = useState("");

  const [existingImages, setExistingImages] = useState({
    slider1: [],
    slider2: [],
    column1: [],
    column2: [],
  });

  const [newImages, setNewImages] = useState({
    slider1: [],
    slider2: [],
    column1: [],
    column2: [],
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/projects`
        );
        const project = res.data.find((p) => p.project_id === project_id);
        if (!project) return;

        setFormData({
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

        setExistingMainImage(project.mainImage || "");

        setExistingImages({
          slider1: project.images?.slider1 || [],
          slider2: project.images?.slider2 || [],
          column1: project.images?.column1 || [],
          column2: project.images?.column2 || [],
        });
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

  const handleNewImageChange = (e, group) => {
    setNewImages((prev) => ({
      ...prev,
      [group]: [...e.target.files],
    }));
  };

  const handleRemoveExistingImage = (group, url) => {
    setExistingImages((prev) => ({
      ...prev,
      [group]: prev[group].filter((img) => img !== url),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    payload.append("project_id", project_id);
    payload.append("title", formData.title);
    payload.append("summaryTitle", formData.summaryTitle);
    payload.append("projectDescription", formData.projectDescription);
    payload.append("question", formData.question);
    payload.append("answer", formData.answer);
    payload.append("summary", formData.summary);

    if (newMainImage) {
      payload.append("mainImage", newMainImage);
    } else {
      payload.append("mainImage", existingMainImage);
    }

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

    Object.entries(newImages).forEach(([group, files]) => {
      for (const file of files) {
        payload.append(`images_${group}`, file);
      }
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

  const renderSortableGroup = (group) => (
    <div key={group}>
      <label className="block font-medium mt-6 capitalize">
        {group} Images
      </label>
      <p className="text-sm text-gray-500 mb-2">Drag to reorder.</p>

      <ReactSortable
        tag="div"
        list={existingImages[group]}
        setList={(list) =>
          setExistingImages((prev) => ({ ...prev, [group]: list }))
        }
        className="flex flex-wrap gap-4"
      >
        {existingImages[group].map((img) => (
          <div key={img} className="relative">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${img}`}
              alt=""
              className="w-24 h-24 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveExistingImage(group, img)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </ReactSortable>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleNewImageChange(e, group)}
        className="mt-2 block"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
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

        <div className="grid grid-cols-3 gap-4">
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

        {/* Render each image group */}
        {["slider1", "slider2", "column1", "column2"].map(renderSortableGroup)}

        {/* Main Image Section */}
        <div className="mt-6">
          <label className="block font-medium mb-2">Main Image</label>
          {existingMainImage && (
            <div className="mb-2 relative w-32">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${existingMainImage}`}
                alt="Main"
                className="w-32 h-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => setExistingMainImage("")}
                className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewMainImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-6"
        >
          Update Project
        </button>
      </form>
    </div>
  );
}
