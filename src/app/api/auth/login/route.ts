import clientPromise from "@/utils/db";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

export async function POST(req:any) {
  const client = await clientPromise;

  const {  email, password } = await req.json();

  if ( !email || !password ) {
    return Response.json({ message: "All fields are required" });
  }

  const collection = client.db().collection("users");
  const user = await collection.findOne({ email });
  if (!user) {
    return Response.json({ message: 'User does not exist' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json({ message: 'Invalid credentials' });
  }

//   const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });




  return Response.json({ message: "User logged in successfully" });
}
