import clientPromise from "@/utils/db";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  const client = await clientPromise;

  const { title, description, price } = await req.json();

  const collection = client.db().collection("courses");

  const course = await collection.insertOne({
    title,
    description,
    price,
  });

  return Response.json({ message: "Course created" });
}
