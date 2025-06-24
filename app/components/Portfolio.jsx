"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // ✅ Axios for API requests
import Lenis from "@studio-freight/lenis";
import Image from "next/image";

import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";

import FadeIn from "./FadeIn";
import ProjectCard from "./ProjectCard";

const Portfolio = ({ category }) => {
  const router = useRouter();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);
  // Should log: "Base URL: http://localhost:4000"
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/projects`
        );

        setProjects(res?.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["#fefdf8", "#fefdf8"]
  );

  const overlayVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const filteredProjects =
    category === "all"
      ? projects
      : projects.filter((proj) => proj.category?.includes(category));

  return (
    <div
      ref={container}
      className="flex w-[80vw] justify-between  min-h-screen scrollbar-hide "
    >
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-700"
      />

      <div className="py-16 w-full">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-6 justify-between">
            {filteredProjects?.map((item, index) => (
              <FadeIn
                key={index}
                view="-100px"
                duration={0.4 + (index % 3) * 0.1}
                yvalue={20 + (index % 3) * 12}
              >
                <motion.div
                  className="relative group overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => router.push(`/projects/${item.project_id}`)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.mainImage}`}
                    alt={item.title}
                    height={720}
                    width={1280}
                    loading="lazy"
                    className="w-full h-[260px]  object-cover transition-transform  duration-300 group-hover:scale-105"
                  />

                  <AnimatePresence mode="wait">
                    {hovered === index && (
                      <motion.div
                        key={`overlay-${index}`}
                        variants={overlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="initial"
                        className="absolute inset-0 bg-black/60  flex flex-col justify-end p-4 pointer-events-none"
                      >
                        <motion.p
                          key={`desc-${index}`}
                          variants={textVariants}
                          className="text-sm text-gray-200 mt-1"
                        >
                          {item.projectDescription}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <p className="pt-4 font-medium text-xl"> {item.title}</p>
                <p className="text-sm text-gray-500">{item.meta.services}</p>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
              <ProjectCard project={selectedItem} onClose={handleCloseModal} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
