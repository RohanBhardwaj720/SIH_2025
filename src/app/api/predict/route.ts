import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { image, location } = body;

    // Call your external ML service
    const response = await fetch(`${process.env.DIAGNOSE_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, location }),
    });

    if (!response.ok) {
      throw new Error("Failed to call ML service");
    }

    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("Error in /api/predict:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
