import mongoose from "mongoose";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect.js";
import { UserInfo } from "@/app/models/UserInfo";
import { authOptions } from "@/libs/authOptions";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}
