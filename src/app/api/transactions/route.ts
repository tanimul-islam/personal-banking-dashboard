// src/app/api/transactions/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transactions";
// import { success } from "zod/v4";
// import { error } from "console";

export async function POST(req: Request) {
  await connectDB();

  const data = await req.json();

  try {
    const transaction = await Transaction.create(data);
    return NextResponse.json({ success: true, transaction }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

// GET /api/transactions?userId=xxx
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Missing User Id" },
      { status: 400 }
    );
  }

  try {
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    return NextResponse.json({ success: true, transactions });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
