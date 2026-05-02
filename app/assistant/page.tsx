"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SiteNav } from "@/app/components/SiteNav";

type Message = { role: "user" | "assistant"; content: string; ts: Date; };

const SUGGESTIONS = [
  "What can you do for me?",
  "Schedule a call with my vendor tomorrow",
  "Help me write a professional follow-up email",
  "Find me 3 local plumbers and get quotes",
  "Remind me about James soccer pickup at 2pm",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey — I'm your Microfyxd operator. Describe anything you need done and I'll break it down and execute it. Phone calls, forms, emails, research, scheduling — all of it.", ts: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: msg, ts: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply ?? data.error ?? "Something went wrong — try again.", ts: new Date() }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Check your network and try again.", ts: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--void)" }}>
      <div className="scanline" />
      <SiteNav />

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 pt-24 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between py-4 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,243,255,0.7)" }} />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgba(0,243,255,0.5)" }}>
                AI Assistant · Online
              </span>
            </div>
            <h1 className="text-2xl font-grotesk font-bold" style={{ color: "var(--text-1)" }}>Microfyxd Operator</h1>
          </div>
          <Link href="/tasks"
            className="px-4 py-2 rounded-lg text-xs font-mono transition-all hover:scale-105"
            style={{ background: "rgba(0,243,255,0.05)", border: "1px solid rgba(0,243,255,0.15)", color: "rgba(0,243,255,0.7)" }}>
            ⚡ Task Engine →
          </Link>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-0" style={{ maxHeight: "60vh" }}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[80%] rounded-2xl px-5 py-3"
                style={{
                  background: m.role === "user" ? "rgba(0,243,255,0.08)" : "rgba(255,255,255,0.03)",
                  border: m.role === "user" ? "1px solid rgba(0,243,255,0.2)" : "1px solid rgba(255,255,255,0.06)",
                }}>
                <p className="text-sm font-inter leading-relaxed whitespace-pre-wrap" style={{ color: m.role === "user" ? "rgba(0,243,255,0.9)" : "var(--text-1)" }}>
                  {m.content}
                </p>
                <p className="text-xs font-mono mt-1.5" style={{ color: "var(--text-3)" }}>
                  {m.ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-5 py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="shimmer-text text-sm font-mono">thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-2)" }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Describe anything you need done..."
              rows={2}
              className="flex-1 bg-transparent resize-none outline-none text-sm font-inter"
              style={{ color: "var(--text-1)", caretColor: "rgba(0,243,255,0.9)" }}
            />
            <button onClick={() => send()} disabled={!input.trim() || loading}
              className="px-4 py-2 rounded-xl text-sm font-mono self-end transition-all disabled:opacity-30 hover:scale-105"
              style={{ background: "rgba(0,243,255,0.1)", border: "1px solid rgba(0,243,255,0.2)", color: "rgba(0,243,255,0.9)" }}>
              Send
            </button>
          </div>
          <p className="text-xs font-mono mt-2" style={{ color: "var(--text-3)" }}>Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}
