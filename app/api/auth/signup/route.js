
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email,  phone, password, confirmPassword } = body;

    if (!name || !email ||  !phone || !password || !confirmPassword) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already in use" }), { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashed,
    });

    const token = signToken({ id: user._id, email: user.email });

    return new Response(JSON.stringify({
      token,
      user: { id: user._id, name: user.name, email: user.email , phone }
    }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
