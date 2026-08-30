"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, ArrowRight, Package, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Which crystal is best for wealth & success?",
  "Recommend a stone for soothing anxiety",
  "How do I track my crystal order?",
  "Which crystal resonates with Taurus / Venus?",
  "What promo discounts are active today?",
];

export default function ChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Namaste & Welcome to Selenite Soul Sanctuary. I am your Spiritual Advisor. How may I guide your crystal or astrological journey today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId] = useState(() => "SESS-" + Date.now().toString(36));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: "msg-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId,
          userEmail: user?.email || "guest",
        }),
      });
      const data = await res.json();

      const botMsg: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: data.reply || "May the sacred light illuminate your path. How else can I assist?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-err-" + Date.now(),
          sender: "bot",
          text: "Our sanctuary connection is momentarily quiet. Please reach us directly at support@selenitesoul.com or explore our crystal shop.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-14 h-14 rounded-full bg-[#c8a951] text-[#1a0e05] flex items-center justify-center shadow-2xl border-2 border-white hover:scale-105 transition-transform cursor-pointer"
          whileTap={{ scale: 0.92 }}
          aria-label="Open Spiritual Chat"
          data-cursor="hover"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-[#1a0e05]" strokeWidth={1.8} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#2a1f1a] rounded-full border border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-[#c8a951] rounded-full animate-ping" />
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[90] w-[92vw] sm:w-[380px] h-[520px] bg-white border border-[#c8a951]/40 rounded-sm shadow-2xl flex flex-col overflow-hidden text-[#2a1f1a]"
          >
            {/* Header */}
            <div className="bg-[#fcf8f4] border-b border-[#e8d9cf] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#c8a951]/20 border border-[#c8a951] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#a5762a]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2a1f1a]">Spiritual Advisor</h4>
                  <p className="text-[10px] text-[#558253] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#558253]" /> Consecrated & Live
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-[#4a382e]/60 hover:text-[#2a1f1a] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fffdfa]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-[#c8a951]/15 border border-[#c8a951]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-[#a5762a]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-sm p-3 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#2a1f1a] text-white"
                        : "bg-[#fcf8f4] border border-[#e8d9cf] text-[#2a1f1a] shadow-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] opacity-40 block text-right mt-1 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 items-center text-xs text-[#a5762a]">
                  <div className="w-6 h-6 rounded-full bg-[#c8a951]/15 border border-[#c8a951]/40 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-[#a5762a] animate-pulse" />
                  </div>
                  <span className="italic text-[11px] text-[#4a382e]/70">Channelling crystal guidance...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2.5 bg-[#fcf8f4] border-t border-[#e8d9cf] overflow-x-auto flex gap-1.5 select-none no-scrollbar">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 text-[10px] bg-white border border-[#e8d9cf] text-[#4a382e] whitespace-nowrap rounded-sm hover:border-[#c8a951] hover:text-[#a5762a] transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-[#e8d9cf] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crystals, zodiac, or order tracking..."
                className="flex-1 bg-[#fdf8f4] border border-[#e8d9cf] px-3 py-2 text-xs text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm placeholder:text-[#2a1f1a]/40"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-sm bg-[#c8a951] text-[#1a0e05] flex items-center justify-center disabled:opacity-40 hover:bg-[#b89840] transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
