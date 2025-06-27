"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import withAuth from "../components/withAuth";
import { useRouter } from "next/navigation";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const deleteProject = async (project_id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project_id}`
      );
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filtered projects based on search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  return (
    <div className="p-20 bg-[#fefdf8] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex gap-2">
          <Link href="/admin/add-projects">
            <div className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              + Add Project
            </div>
          </Link>
          <div
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("exp");
              router.replace("/admin/login");
            }}
          >
            <div className="bg-red-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Signout
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md mb-8 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredProjects.map((project) => (
            <li
              key={project.project_id}
              className="border rounded p-4 shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-600">{project.summaryTitle}</p>
              </div>
              <div className="flex space-x-2">
                <Link href={`/admin/${project.project_id}`}>
                  <div className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </div>
                </Link>
                <button
                  onClick={() => deleteProject(project.project_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default withAuth(ProjectsPage);
