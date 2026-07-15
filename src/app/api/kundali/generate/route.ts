import { NextResponse } from "next/server";
import { GenerateKundaliBody, GenerateKundaliResponse } from "../../../../lib/api-zod";
import { generateKundali, InvalidBirthDataError } from "../../../../lib/astrology";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = GenerateKundaliBody.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((i) => i.message).join("; ") },
        { status: 400 }
      );
    }

    const chart = generateKundali(parsed.data);
    const data = GenerateKundaliResponse.parse(chart);
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof InvalidBirthDataError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
