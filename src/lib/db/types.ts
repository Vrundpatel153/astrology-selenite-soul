export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  passwordHash?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  sunSign?: string;
  moonSign?: string;
  lifePathNumber?: number;
  loyaltyTier: "Initiate" | "Silver Seeker" | "Golden Sovereign" | "Celestial Luminary";
  createdAt: string;
}

export interface Address {
  id: string;
  userEmail: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  total: number;
  paymentMethod: "card" | "upi" | "netbanking" | "cod";
  paymentStatus: "paid" | "pending" | "failed";
  orderStatus: "Order Confirmed" | "Full Moon Consecration" | "Lab Tested & Certified" | "Dispatched" | "In Transit" | "Delivered";
  trackingNumber: string;
  courier: string;
  estimatedDelivery: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  isActive: boolean;
  expiryDate: string;
  description: string;
}

export interface ChatLog {
  id: string;
  sessionId: string;
  userEmail?: string;
  message: string;
  reply: string;
  timestamp: string;
}
