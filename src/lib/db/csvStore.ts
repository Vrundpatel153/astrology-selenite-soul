import fs from "fs";
import path from "path";
import { User, Order, Address, Coupon, ChatLog } from "./types";

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), "data");

function ensureDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // In serverless / read-only filesystem, silently fallback
  }
}

// In-memory cache fallback for serverless environments (Vercel)
const memoryStore = {
  users: new Map<string, User>(),
  orders: new Map<string, Order>(),
  addresses: new Map<string, Address>(),
  coupons: new Map<string, Coupon>(),
  chatLogs: [] as ChatLog[],
};

// Seed initial coupons
const DEFAULT_COUPONS: Coupon[] = [
  {
    code: "SELENITE10",
    discountType: "percent",
    discountValue: 10,
    minOrderAmount: 0,
    isActive: true,
    expiryDate: "2027-12-31",
    description: "10% OFF on your entire sacred crystal order",
  },
  {
    code: "FULLMOON",
    discountType: "fixed",
    discountValue: 500,
    minOrderAmount: 2999,
    isActive: true,
    expiryDate: "2027-12-31",
    description: "Flat ₹500 OFF on full-moon energized orders over ₹2,999",
  },
  {
    code: "VEDIC15",
    discountType: "percent",
    discountValue: 15,
    minOrderAmount: 1499,
    maxDiscount: 600,
    isActive: true,
    expiryDate: "2027-12-31",
    description: "15% OFF for new seekers on orders above ₹1,499",
  },
  {
    code: "SHIVAY20",
    discountType: "percent",
    discountValue: 20,
    minOrderAmount: 3999,
    maxDiscount: 1000,
    isActive: true,
    expiryDate: "2027-12-31",
    description: "20% Festive Blessing discount on orders above ₹3,999",
  },
];

// Helper to escape CSV fields
function escapeCSV(val: any): string {
  if (val === null || val === undefined) return "";
  const str = typeof val === "object" ? JSON.stringify(val) : String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Helper to parse CSV line
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/* =========================================================================
   USER CSV REPOSITORY
   ========================================================================= */
const USERS_FILE = path.join(DATA_DIR, "users.csv");
const USERS_HEADER = "id,email,name,phone,passwordHash,birthDate,birthTime,birthPlace,sunSign,moonSign,lifePathNumber,loyaltyTier,createdAt\n";

export function getUsers(): User[] {
  ensureDirectory();
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, USERS_HEADER, "utf-8");
      return Array.from(memoryStore.users.values());
    }
    const content = fs.readFileSync(USERS_FILE, "utf-8");
    const lines = content.split("\n").filter(l => l.trim().length > 0).slice(1);
    const users: User[] = lines.map(line => {
      const cols = parseCSVLine(line);
      return {
        id: cols[0],
        email: cols[1],
        name: cols[2],
        phone: cols[3] || undefined,
        passwordHash: cols[4] || undefined,
        birthDate: cols[5] || undefined,
        birthTime: cols[6] || undefined,
        birthPlace: cols[7] || undefined,
        sunSign: cols[8] || undefined,
        moonSign: cols[9] || undefined,
        lifePathNumber: cols[10] ? Number(cols[10]) : undefined,
        loyaltyTier: (cols[11] as any) || "Initiate",
        createdAt: cols[12] || new Date().toISOString(),
      };
    });
    users.forEach(u => memoryStore.users.set(u.email.toLowerCase(), u));
    return users;
  } catch {
    return Array.from(memoryStore.users.values());
  }
}

export function saveUser(user: User): User {
  ensureDirectory();
  memoryStore.users.set(user.email.toLowerCase(), user);
  try {
    const allUsers = getUsers().filter(u => u.email.toLowerCase() !== user.email.toLowerCase());
    allUsers.push(user);
    const csvContent = USERS_HEADER + allUsers.map(u => [
      escapeCSV(u.id),
      escapeCSV(u.email),
      escapeCSV(u.name),
      escapeCSV(u.phone),
      escapeCSV(u.passwordHash),
      escapeCSV(u.birthDate),
      escapeCSV(u.birthTime),
      escapeCSV(u.birthPlace),
      escapeCSV(u.sunSign),
      escapeCSV(u.moonSign),
      escapeCSV(u.lifePathNumber),
      escapeCSV(u.loyaltyTier),
      escapeCSV(u.createdAt)
    ].join(",")).join("\n") + "\n";
    fs.writeFileSync(USERS_FILE, csvContent, "utf-8");
  } catch {
    // Memory store holds it if filesystem is unwritable
  }
  return user;
}

export function getUserByEmail(email: string): User | undefined {
  if (!email) return undefined;
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || memoryStore.users.get(email.toLowerCase());
}

/* =========================================================================
   ORDERS CSV REPOSITORY
   ========================================================================= */
const ORDERS_FILE = path.join(DATA_DIR, "orders.csv");
const ORDERS_HEADER = "id,userEmail,userName,userPhone,itemsJson,subtotal,discount,couponCode,shipping,total,paymentMethod,paymentStatus,orderStatus,trackingNumber,courier,estimatedDelivery,shippingAddressJson,createdAt\n";

export function getOrders(): Order[] {
  ensureDirectory();
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, ORDERS_HEADER, "utf-8");
      return Array.from(memoryStore.orders.values());
    }
    const content = fs.readFileSync(ORDERS_FILE, "utf-8");
    const lines = content.split("\n").filter(l => l.trim().length > 0).slice(1);
    const orders: Order[] = lines.map(line => {
      const cols = parseCSVLine(line);
      let items: any = [];
      let address: any = {};
      try { items = JSON.parse(cols[4] || "[]"); } catch {}
      try { address = JSON.parse(cols[16] || "{}"); } catch {}
      return {
        id: cols[0],
        userEmail: cols[1],
        userName: cols[2],
        userPhone: cols[3],
        items,
        subtotal: Number(cols[5]) || 0,
        discount: Number(cols[6]) || 0,
        couponCode: cols[7] || undefined,
        shipping: Number(cols[8]) || 0,
        total: Number(cols[9]) || 0,
        paymentMethod: (cols[10] as any) || "card",
        paymentStatus: (cols[11] as any) || "paid",
        orderStatus: (cols[12] as any) || "Order Confirmed",
        trackingNumber: cols[13] || "",
        courier: cols[14] || "BlueDart Express",
        estimatedDelivery: cols[15] || "",
        shippingAddress: address,
        createdAt: cols[17] || new Date().toISOString(),
      };
    });
    orders.forEach(o => memoryStore.orders.set(o.id, o));
    return orders;
  } catch {
    return Array.from(memoryStore.orders.values());
  }
}

export function saveOrder(order: Order): Order {
  ensureDirectory();
  memoryStore.orders.set(order.id, order);
  try {
    const allOrders = getOrders().filter(o => o.id !== order.id);
    allOrders.unshift(order); // latest first
    const csvContent = ORDERS_HEADER + allOrders.map(o => [
      escapeCSV(o.id),
      escapeCSV(o.userEmail),
      escapeCSV(o.userName),
      escapeCSV(o.userPhone),
      escapeCSV(o.items),
      escapeCSV(o.subtotal),
      escapeCSV(o.discount),
      escapeCSV(o.couponCode),
      escapeCSV(o.shipping),
      escapeCSV(o.total),
      escapeCSV(o.paymentMethod),
      escapeCSV(o.paymentStatus),
      escapeCSV(o.orderStatus),
      escapeCSV(o.trackingNumber),
      escapeCSV(o.courier),
      escapeCSV(o.estimatedDelivery),
      escapeCSV(o.shippingAddress),
      escapeCSV(o.createdAt)
    ].join(",")).join("\n") + "\n";
    fs.writeFileSync(ORDERS_FILE, csvContent, "utf-8");
  } catch {}
  return order;
}

export function getOrderById(id: string): Order | undefined {
  if (!id) return undefined;
  const orders = getOrders();
  return orders.find(o => o.id.toLowerCase() === id.toLowerCase()) || memoryStore.orders.get(id);
}

/* =========================================================================
   COUPONS CSV REPOSITORY
   ========================================================================= */
const COUPONS_FILE = path.join(DATA_DIR, "coupons.csv");
const COUPONS_HEADER = "code,discountType,discountValue,minOrderAmount,maxDiscount,isActive,expiryDate,description\n";

export function getCoupons(): Coupon[] {
  ensureDirectory();
  try {
    if (!fs.existsSync(COUPONS_FILE)) {
      const csvContent = COUPONS_HEADER + DEFAULT_COUPONS.map(c => [
        escapeCSV(c.code),
        escapeCSV(c.discountType),
        escapeCSV(c.discountValue),
        escapeCSV(c.minOrderAmount),
        escapeCSV(c.maxDiscount),
        escapeCSV(c.isActive),
        escapeCSV(c.expiryDate),
        escapeCSV(c.description),
      ].join(",")).join("\n") + "\n";
      fs.writeFileSync(COUPONS_FILE, csvContent, "utf-8");
      return DEFAULT_COUPONS;
    }
    const content = fs.readFileSync(COUPONS_FILE, "utf-8");
    const lines = content.split("\n").filter(l => l.trim().length > 0).slice(1);
    const coupons: Coupon[] = lines.map(line => {
      const cols = parseCSVLine(line);
      return {
        code: cols[0],
        discountType: (cols[1] as any) || "percent",
        discountValue: Number(cols[2]) || 0,
        minOrderAmount: Number(cols[3]) || 0,
        maxDiscount: cols[4] ? Number(cols[4]) : undefined,
        isActive: cols[5] === "true",
        expiryDate: cols[6] || "2027-12-31",
        description: cols[7] || "",
      };
    });
    return coupons;
  } catch {
    return DEFAULT_COUPONS;
  }
}

export function validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
  if (!code) return { valid: false, discount: 0, message: "Please enter a coupon code" };
  const cleanCode = code.trim().toUpperCase();
  const coupons = getCoupons();
  const found = coupons.find(c => c.code.toUpperCase() === cleanCode && c.isActive);

  if (!found) {
    return { valid: false, discount: 0, message: `Promo code "${code}" is invalid or expired` };
  }

  if (subtotal < found.minOrderAmount) {
    return {
      valid: false,
      discount: 0,
      message: `Code ${found.code} requires a minimum order of ₹${found.minOrderAmount}`,
    };
  }

  let discount = 0;
  if (found.discountType === "percent") {
    discount = Math.round((subtotal * found.discountValue) / 100);
    if (found.maxDiscount && discount > found.maxDiscount) {
      discount = found.maxDiscount;
    }
  } else {
    discount = found.discountValue;
  }

  if (discount > subtotal) discount = subtotal;

  return {
    valid: true,
    discount,
    message: `Sacred blessing applied! You saved ₹${discount}`,
    coupon: found,
  };
}

/* =========================================================================
   CHAT LOGS CSV REPOSITORY
   ========================================================================= */
const CHAT_FILE = path.join(DATA_DIR, "chat_logs.csv");
const CHAT_HEADER = "id,sessionId,userEmail,message,reply,timestamp\n";

export function logChatMessage(chat: ChatLog) {
  ensureDirectory();
  memoryStore.chatLogs.push(chat);
  try {
    const row = [
      escapeCSV(chat.id),
      escapeCSV(chat.sessionId),
      escapeCSV(chat.userEmail),
      escapeCSV(chat.message),
      escapeCSV(chat.reply),
      escapeCSV(chat.timestamp)
    ].join(",") + "\n";
    if (!fs.existsSync(CHAT_FILE)) {
      fs.writeFileSync(CHAT_FILE, CHAT_HEADER + row, "utf-8");
    } else {
      fs.appendFileSync(CHAT_FILE, row, "utf-8");
    }
  } catch {}
}
