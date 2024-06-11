import clientPromise from "@/utils/db";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  const client = await clientPromise;

  const { user } = await req.json();
  if (user.role !== 'admin') {
    return Response.json({ message: 'Only admins can access this' });
  }

  const collection = client.db().collection("users");
  
  const users = await collection.find();
    return Response.json(users);
}
