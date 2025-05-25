// src/app/api/ping/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // adjust path if needed

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      status: "success",
      message: "MongoDB connected",
    });
  } catch (error: unknown) {
    // Use type assertion to extract message safely
    const errMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ status: "error", message: errMsg });
  }
}
