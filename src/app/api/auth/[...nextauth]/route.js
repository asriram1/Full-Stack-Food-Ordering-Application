import mongoose from "mongoose";
import { User } from "./../../../models/User";
import bcrypt from "bcryptjs";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect.js";
import { UserInfo } from "@/app/models/UserInfo";
import { authOptions } from "@/libs/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
