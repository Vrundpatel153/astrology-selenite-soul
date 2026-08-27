import { NextResponse } from "next/server";
import { validateCoupon, getCoupons } from "@/lib/db/csvStore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code") || "";
    const subtotal = Number(searchParams.get("subtotal")) || 0;

    if (!code) {
      return NextResponse.json({ success: true, coupons: getCoupons().filter(c => c.isActive) });
    }

    const res = validateCoupon(code, subtotal);
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to validate coupon" }, { status: 500 });
  }
}
