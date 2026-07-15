import { NextResponse } from "next/server";
import { takenSlots } from "@/lib/bookings";

// Връща заетите часове за дадена дата: /api/zaeti-chasove?data=2026-07-20
export async function GET(request: Request) {
  const data = new URL(request.url).searchParams.get("data") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return NextResponse.json({ zaeti: [] });
  }
  try {
    return NextResponse.json({ zaeti: await takenSlots(data) });
  } catch (error) {
    console.error("Неуспешно четене на заетите часове:", error);
    return NextResponse.json({ zaeti: [] });
  }
}
