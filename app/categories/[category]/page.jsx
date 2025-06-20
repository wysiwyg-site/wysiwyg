"use client";

import React, { useState, useEffect, use } from "react";
import Portfolio from "../../components/Portfolio";
import TextComponent from "../../components/TextComponent";

const Page = ({ params }) => {
  const { category: categorySlug } = use(params); // unwrap params

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/categories`
        );
        const data = await res.json();
        const matchedCategory = data.find((cat) => cat.slug === categorySlug);
        setCategory(matchedCategory);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="mt-25 text-center py-20 text-gray-500">
        Loading category...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="mt-25 text-center py-20 text-red-500">
        Category not found.
      </div>
    );
  }

  return (
    <div className="mt-25 overflow-hidden bg-[#fefdf8]">
      <div className="gap-10 flex flex-col items-center justify-center">
        <TextComponent project={category.name} />
        <Portfolio category={categorySlug} />
      </div>
    </div>
  );
};

export default Page;
