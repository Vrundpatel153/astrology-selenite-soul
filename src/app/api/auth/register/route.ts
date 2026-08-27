import { NextResponse } from "next/server";
import { getUserByEmail, saveUser } from "@/lib/db/csvStore";
import { User } from "@/lib/db/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password, birthDate, birthTime, birthPlace } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const newUser: User = {
      id: "USR-" + Date.now().toString(36).toUpperCase(),
      email: email.trim().toLowerCase(),
      name: name.trim(),
      phone: phone?.trim() || "",
      passwordHash: password ? "hash_" + password : "", // simple hash for local dev
      birthDate: birthDate || "",
      birthTime: birthTime || "",
      birthPlace: birthPlace || "",
      loyaltyTier: "Initiate",
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        birthDate: newUser.birthDate,
        birthTime: newUser.birthTime,
        birthPlace: newUser.birthPlace,
        loyaltyTier: newUser.loyaltyTier,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to register" }, { status: 500 });
  }
}
