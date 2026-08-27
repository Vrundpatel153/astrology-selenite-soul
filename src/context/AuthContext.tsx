"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Address, Order } from "@/lib/db/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  login: (email: string, password?: string, name?: string) => Promise<boolean>;
  signup: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  addresses: Address[];
  addAddress: (addr: Omit<Address, "id" | "userEmail">) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  userOrders: Order[];
  refreshOrders: () => Promise<void>;
  wishlistIds: Set<number>;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("ss_user");
      const storedAddresses = localStorage.getItem("ss_addresses");
      const storedWishlist = localStorage.getItem("ss_wishlist");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedAddresses) setAddresses(JSON.parse(storedAddresses));
      if (storedWishlist) setWishlistIds(new Set(JSON.parse(storedWishlist)));
    } catch {}
    setIsLoading(false);
  }, []);

  // Fetch user orders whenever user changes
  useEffect(() => {
    if (user?.email) {
      refreshOrders();
    } else {
      setUserOrders([]);
    }
  }, [user?.email]);

  const refreshOrders = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setUserOrders(data.orders);
      }
    } catch {}
  };

  const login = async (email: string, password?: string, name?: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("ss_user", JSON.stringify(data.user));
        toast.success(`Welcome back, ${data.user.name || "Seeker"}! ✨`);
        setLoginModalOpen(false);
        return true;
      } else {
        toast.error(data.error || "Login failed");
        return false;
      }
    } catch {
      toast.error("Network error during login");
      return false;
    }
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("ss_user", JSON.stringify(data.user));
        toast.success(`Welcome to Selenite Soul, ${data.user.name}! 🌟`);
        setLoginModalOpen(false);
        return true;
      } else {
        toast.error(data.error || "Registration failed");
        return false;
      }
    } catch {
      toast.error("Network error during registration");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ss_user");
    toast.info("Logged out safely. May peace guide your journey.");
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user?.email) return false;
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, ...data }),
      });
      const resData = await res.json();
      if (resData.success && resData.user) {
        setUser(resData.user);
        localStorage.setItem("ss_user", JSON.stringify(resData.user));
        toast.success("Cosmic profile updated successfully! 🔮");
        return true;
      }
      return false;
    } catch {
      toast.error("Failed to update profile");
      return false;
    }
  };

  const addAddress = (addr: Omit<Address, "id" | "userEmail">) => {
    const newAddr: Address = {
      ...addr,
      id: "ADDR-" + Date.now().toString(36),
      userEmail: user?.email || "guest",
      isDefault: addresses.length === 0 || addr.isDefault,
    };
    const updated = addresses.map(a => newAddr.isDefault ? { ...a, isDefault: false } : a);
    updated.push(newAddr);
    setAddresses(updated);
    localStorage.setItem("ss_addresses", JSON.stringify(updated));
    toast.success("Delivery address saved!");
  };

  const deleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem("ss_addresses", JSON.stringify(updated));
    toast.info("Address removed.");
  };

  const setDefaultAddress = (id: string) => {
    const updated = addresses.map(a => ({ ...a, isDefault: a.id === id }));
    setAddresses(updated);
    localStorage.setItem("ss_addresses", JSON.stringify(updated));
    toast.success("Default delivery address set!");
  };

  const toggleWishlist = (productId: number) => {
    const updated = new Set(wishlistIds);
    if (updated.has(productId)) {
      updated.delete(productId);
      toast.info("Removed from sacred wishlist");
    } else {
      updated.add(productId);
      toast.success("Added to sacred wishlist! 💖");
    }
    setWishlistIds(updated);
    localStorage.setItem("ss_wishlist", JSON.stringify(Array.from(updated)));
  };

  const isInWishlist = (productId: number) => wishlistIds.has(productId);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginModalOpen,
        setLoginModalOpen,
        login,
        signup,
        logout,
        updateProfile,
        addresses,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        userOrders,
        refreshOrders,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
