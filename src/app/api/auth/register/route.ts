import clientPromise from "@/utils/db";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  const client = await clientPromise;

  const { username, email, password, role } = await req.json();

  if (!username || !email || !password || !role) {
    return Response.json({ message: "All fields are required" });
  }

  const collection = client.db().collection("users");
  const userExists = await collection.findOne({ email });
  if (userExists) {
    return Response.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = {
    username,
    email,
    password: hashedPassword,
    role,
  };

  await collection.insertOne(user);
  return Response.json({ message: "User created successfully" });
}
