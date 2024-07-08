"use server";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/libs/authOptions";

// import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function GetSessionUser() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || session?.user?.email;
  return email || "";
}
