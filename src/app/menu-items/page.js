"use client";
import React, { useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { useProfile } from "@/app/components/UseProfile";
import Link from "next/link";
import EditableImage from "../components/layout/EditableImage";
import toast from "react-hot-toast";
import Right from "@/app/components/icons/Right";
import Left from "@/app/components/icons/Left";
import { useEffect } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading...";
  }

  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex  " href={"/menu-items/new"}>
          <span> Create New Menu Item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit Menu Item</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                key={item._id}
                className="bg-gray-200 rounded-lg p-4 "
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt={""}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
