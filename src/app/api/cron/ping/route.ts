import { NextResponse } from "next/server";
import { getOrders, getUsers } from "@/lib/db/csvStore";

export async function GET() {
  const timestamp = new Date().toISOString();
  return NextResponse.json({
    status: "alive",
    timestamp,
    server: "Selenite Soul Sanctuary",
    version: "1.2.0",
    activeSeekers: getUsers().length,
    processedOrders: getOrders().length,
  });
}
