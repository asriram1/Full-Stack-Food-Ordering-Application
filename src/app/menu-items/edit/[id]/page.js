"use client";
import React, { useState } from "react";
import UserTabs from "@/app/components/layout/UserTabs";
import { useProfile } from "@/app/components/UseProfile";
import EditableImage from "@/app/components/layout/EditableImage";
import Left from "@/app/components/icons/Left";
import Link from "next/link";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/app/components/layout/MenuItemForm";
import { useEffect } from "react";
import DeleteButton from "@/app/components/DeleteButton";

export default function EditMenuItemPage() {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();

    data = { ...data, _id: id };
    toast("Saving...");
    const response = await fetch("/api/menu-items", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success("Successfully updated menu item");
    } else {
      toast.error("Error");
    }

    setRedirectToItems(true);
  }

  async function handleDeleteClick() {
    const response = await fetch("/api/menu-items?_id=" + id, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Item Deleted");
    } else {
      toast.error("Error");
    }
    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading...";
  }
  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />

      <div className="max-w-2xl mx-auto mt-8">
        <DeleteButton
          label="Delete this menu item"
          onDelete={handleDeleteClick}
        />
      </div>
    </section>
  );
}
