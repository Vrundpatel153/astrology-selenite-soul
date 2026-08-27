import { NextResponse } from "next/server";
import { getUserByEmail, saveUser } from "@/lib/db/csvStore";
import { User } from "@/lib/db/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, otp } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let user = getUserByEmail(email);

    // If OTP fast login or first-time seeker login, automatically create user record
    if (!user) {
      user = {
        id: "USR-" + Date.now().toString(36).toUpperCase(),
        email: email.trim().toLowerCase(),
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        phone: "",
        loyaltyTier: "Initiate",
        createdAt: new Date().toISOString(),
      };
      saveUser(user);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        birthDate: user.birthDate,
        birthTime: user.birthTime,
        birthPlace: user.birthPlace,
        sunSign: user.sunSign,
        moonSign: user.moonSign,
        lifePathNumber: user.lifePathNumber,
        loyaltyTier: user.loyaltyTier,
        createdAt: user.createdAt,
      },
      token: "jwt_token_" + Buffer.from(user.email).toString("base64"),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to login" }, { status: 500 });
  }
}
