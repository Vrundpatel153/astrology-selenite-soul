import { NextResponse } from "next/server";
import { getUserByEmail, saveUser } from "@/lib/db/csvStore";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { email, name, phone, birthDate, birthTime, birthPlace, sunSign, moonSign, lifePathNumber } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existing = getUserByEmail(email);
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updated = {
      ...existing,
      name: name !== undefined ? name.trim() : existing.name,
      phone: phone !== undefined ? phone.trim() : existing.phone,
      birthDate: birthDate !== undefined ? birthDate : existing.birthDate,
      birthTime: birthTime !== undefined ? birthTime : existing.birthTime,
      birthPlace: birthPlace !== undefined ? birthPlace : existing.birthPlace,
      sunSign: sunSign !== undefined ? sunSign : existing.sunSign,
      moonSign: moonSign !== undefined ? moonSign : existing.moonSign,
      lifePathNumber: lifePathNumber !== undefined ? Number(lifePathNumber) : existing.lifePathNumber,
    };

    saveUser(updated);

    return NextResponse.json({
      success: true,
      user: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update profile" }, { status: 500 });
  }
}
