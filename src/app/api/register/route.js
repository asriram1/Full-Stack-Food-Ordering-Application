import { User } from "./../../models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import toast from "react-hot-toast";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.REACT_APP_MONGO_URL);
  const pass = body.password;
  if (!pass?.length > 5 || pass.length < 5) {
    const err = new Error("password must be at least 5 characters.");
    return;
  }

  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);

  return Response.json(createdUser);
}
