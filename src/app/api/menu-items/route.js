import mongoose from "mongoose";
import { MenuItem } from "../../models/MenuItem";
import { isAdmin } from "../auth/[...nextauth]/route";
// import isAdmin from "@/libs/isAdmin";

export async function POST(req) {
  mongoose.connect(process.env.REACT_APP_MONGO_URL);
  const data = await req.json();

  if (await isAdmin()) {
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
  } else {
    Response.json([]);
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.REACT_APP_MONGO_URL);

  if (await isAdmin()) {
    const { _id, ...data } = await req.json();

    const menuItemDoc = await MenuItem.updateOne({ _id }, data);
  }

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.REACT_APP_MONGO_URL);

  return Response.json(await MenuItem.find());
}

export async function DELETE(req) {
  mongoose.connect(process.env.REACT_APP_MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await MenuItem.deleteOne({ _id });
  }

  return Response.json(true);
}
