"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import CategoryAddNew from "../components/category/addnew";
import { CategoryTable } from "../components/category/table";
import { CategoryObj } from "../components/category/types";


export default function Categoty() {

  const [categoryRowData, setCategoryRowData] = useState<CategoryObj[]>([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      // const columns = JSON.stringify({ staffid: true })
      const category_details = await fetch(
        "api/category",
      );
      const res = await category_details.json();
      setCategoryRowData(res.categoriesData);
      console.log("res",res,)
    };

    // call the function
    fetchData().catch(console.error);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center p-4">
        <h1 className="text-4xl font-extrabold uppercase text-indigo-600 mr-auto">
          Category
        </h1>
        <CategoryAddNew buttonName="Add New" />
      </div>
      <div>
        {categoryRowData && (
          <CategoryTable categoryRowData={categoryRowData} />
        )}
      </div>
    </div>
  );
}

