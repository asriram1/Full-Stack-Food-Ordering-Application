"use client";
import React, { useState } from "react";
import UserTabs from "@/app/components/layout/UserTabs";
import { useProfile } from "@/app/components/UseProfile";
import UserForm from "@/app/components/layout/UserForm";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();

    toast("Saving user...");
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _id: id }),
    });

    if (response.ok) {
      toast.success("Updated user");
    } else {
      toast.error("Error");
    }
  }

  if (loading) {
    return "Loading...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
