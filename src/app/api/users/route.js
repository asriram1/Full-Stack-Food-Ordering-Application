import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { User } from "@/app/models/User";

export async function GET() {
  mongoose.connect(process.env.REACT_APP_MONGO_URL);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
