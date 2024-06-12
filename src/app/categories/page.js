"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { useProfile } from "@/app/components/UseProfile";
import { toast, Toaster } from "react-hot-toast";
import { set } from "mongoose";
import DeleteButton from "../components/DeleteButton";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    toast("Loading...");
    const data = { name: categoryName };
    if (editedCategory) {
      data._id = editedCategory._id;
    }
    const response = await fetch("/api/categories", {
      method: editedCategory ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setCategoryName("");
    fetchCategories();
    setEditedCategory(null);
    if (response.ok) {
      {
        editedCategory
          ? toast.success("Successfully updated category")
          : toast.success("Successfully created category");
      }
    } else {
      toast.error("Something went wrong");
    }
  }

  async function handleDeleteClick(_id) {
    const response = await fetch("/api/categories?_id=" + _id, {
      method: "DELETE",
    });

    fetchCategories();
    if (response.ok) {
      toast.success("Category Deleted");
    } else {
      toast.error("Error");
    }
  }
  if (profileLoading) {
    return "Loading...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {" "}
              {editedCategory ? "Updated Category" : "New Category Name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name} </b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-3 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton
                  label={"Delete"}
                  onDelete={() => handleDeleteClick(c._id)}
                />
                {/* <button onClick={() => handleDeleteClick(c._id)} type="button">
                  Delete
                </button> */}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
