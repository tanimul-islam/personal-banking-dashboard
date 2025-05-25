import { NextRequest, NextResponse } from "next/server"; //next js app router
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/Users";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  await connectDB(); //connected to database

  const { email, password } = await req.json(); //extract email and password form the request body

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  } // invalid request

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //hash the password

  const newUser = await User.create({ email, password: hashedPassword });

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const response = NextResponse.json({ message: "User registered" });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
