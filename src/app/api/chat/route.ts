import { NextResponse } from "next/server";
import { logChatMessage } from "@/lib/db/csvStore";

const KNOWLEDGE_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["anxiety", "stress", "calm", "peace", "overthinking"],
    reply: "For soothing anxiety and restoring inner peace, Amethyst, Lepidolite, and Selenite are extraordinary allies. Amethyst calms the nervous system, while Selenite cleanses heavy emotional debris.",
  },
  {
    keywords: ["money", "wealth", "abundance", "career", "success", "business"],
    reply: "To magnetize financial abundance and executive success, Pyrite (Fool's Gold), Citrine (The Merchant's Stone), and Green Aventurine amplify solar willpower and attract lucrative opportunities.",
  },
  {
    keywords: ["love", "relationship", "marriage", "soulmate", "heart", "breakup"],
    reply: "For heart healing and attracting soulmate alignment, Rose Quartz, Rhodonite, and Emerald resonate directly with Anahata (Heart Chakra), dissolving emotional walls and inviting unconditional love.",
  },
  {
    keywords: ["protection", "evil eye", "negative", "black magic", "shield"],
    reply: "For unyielding energetic defense, Black Tourmaline, Black Obsidian, and Tiger Eye create an impenetrable aura shield that transmutes lower vibrations.",
  },
  {
    keywords: ["track", "order", "delivery", "shipping", "courier", "status"],
    reply: "You can track your crystal package live on our [Track Order](/orders) page with your Order ID (e.g. SS-2026-XXXX) or mobile number. All crystals are lab-tested, energized under the full moon, and delivered within 4-7 business days across India.",
  },
  {
    keywords: ["kundali", "birth chart", "jyotish", "rashi", "nakshatra"],
    reply: "Your Kundali is the soul's energetic blueprint. You can calculate your full Vedic birth chart for free on our [Kundali Calculator](/kundali) using Lahiri Ayanamsa.",
  },
  {
    keywords: ["tarot", "reading", "consultation", "ekta", "session"],
    reply: "Ekta offers intimate 1-on-1 Tarot & Jyotish consultations (45–60 mins) to clarify career crossroads, relationships, and spiritual awakening. You can book directly on our [Tarot Sanctuary](/tarot#book).",
  },
  {
    keywords: ["coupon", "discount", "offer", "promo", "code"],
    reply: "You can use code **SELENITE10** for 10% OFF on all crystals, or **FULLMOON** for flat ₹500 OFF on orders above ₹2,999! Explore all active codes on our [Offers Page](/offers).",
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sessionId, userEmail } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const cleanMsg = message.toLowerCase();
    let reply = "I am Selenite Soul's Spiritual Advisor. Every crystal in our sanctuary is ethically sourced, lab-tested, and full-moon charged. Feel free to ask about crystal recommendations for your zodiac, love, wealth, peace, or check your order tracking!";

    for (const item of KNOWLEDGE_RESPONSES) {
      if (item.keywords.some(k => cleanMsg.includes(k))) {
        reply = item.reply;
        break;
      }
    }

    // Log message to CSV
    logChatMessage({
      id: "LOG-" + Date.now().toString(36),
      sessionId: sessionId || "anon",
      userEmail: userEmail || "guest",
      message: message.trim(),
      reply,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Chat failed" }, { status: 500 });
  }
}
