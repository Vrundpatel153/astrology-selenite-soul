import { NextResponse } from "next/server";
import { getOrderById, getOrders } from "@/lib/db/csvStore";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cleanId = id.trim();

    const order = getOrderById(cleanId);
    if (order) {
      return NextResponse.json({ success: true, order });
    }

    // Also search by phone or tracking number if not found by exact ID
    const all = getOrders();
    const matched = all.find(
      o =>
        o.trackingNumber.toLowerCase() === cleanId.toLowerCase() ||
        o.userPhone.replace(/\D/g, "") === cleanId.replace(/\D/g, "")
    );

    if (matched) {
      return NextResponse.json({ success: true, order: matched });
    }

    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to find order" }, { status: 500 });
  }
}
