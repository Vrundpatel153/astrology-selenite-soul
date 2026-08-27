import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getUsers, getOrders, getCoupons } from "@/lib/db/csvStore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table") || "all";

    if (table === "orders") {
      const orders = getOrders();
      return NextResponse.json({ success: true, count: orders.length, orders });
    }

    if (table === "users") {
      const users = getUsers();
      return NextResponse.json({ success: true, count: users.length, users });
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: getUsers().length,
        totalOrders: getOrders().length,
        activeCoupons: getCoupons().length,
      },
      endpoints: {
        usersCSV: "/data/users.csv",
        ordersCSV: "/data/orders.csv",
        couponsCSV: "/data/coupons.csv",
        chatLogsCSV: "/data/chat_logs.csv",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Export failed" }, { status: 500 });
  }
}
