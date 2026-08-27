import { NextResponse } from "next/server";
import { getOrders, saveOrder, getUserByEmail, saveUser } from "@/lib/db/csvStore";
import { Order } from "@/lib/db/types";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const all = getOrders();

    if (email) {
      const filtered = all.filter(o => o.userEmail.toLowerCase() === email.toLowerCase());
      return NextResponse.json({ success: true, orders: filtered });
    }

    return NextResponse.json({ success: true, orders: all });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userEmail,
      userName,
      userPhone,
      items,
      subtotal,
      discount,
      couponCode,
      shipping,
      total,
      paymentMethod,
      shippingAddress,
    } = body;

    if (!userEmail || !items || !items.length) {
      return NextResponse.json({ error: "Missing required order details" }, { status: 400 });
    }

    const orderId = "SS-2026-" + Math.floor(1000 + Math.random() * 9000);
    const trackingNum = "BLUEDART" + Math.floor(10000000 + Math.random() * 90000000);

    // Calculate delivery date (4-6 days ahead)
    const estDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newOrder: Order = {
      id: orderId,
      userEmail: userEmail.trim().toLowerCase(),
      userName: userName?.trim() || "Valued Seeker",
      userPhone: userPhone?.trim() || "",
      items,
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      couponCode: couponCode || "",
      shipping: Number(shipping) || 0,
      total: Number(total) || 0,
      paymentMethod: paymentMethod || "card",
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      orderStatus: "Order Confirmed",
      trackingNumber: trackingNum,
      courier: "BlueDart Express / DTDC",
      estimatedDelivery: estDate,
      shippingAddress: shippingAddress || {
        fullName: userName,
        phone: userPhone,
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      },
      createdAt: new Date().toISOString(),
    };

    saveOrder(newOrder);

    // Auto-update or create customer record in users.csv
    const user = getUserByEmail(userEmail);
    if (!user) {
      saveUser({
        id: "USR-" + Date.now().toString(36).toUpperCase(),
        email: userEmail.trim().toLowerCase(),
        name: userName?.trim() || userEmail.split("@")[0],
        phone: userPhone?.trim() || "",
        loyaltyTier: "Initiate",
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}
