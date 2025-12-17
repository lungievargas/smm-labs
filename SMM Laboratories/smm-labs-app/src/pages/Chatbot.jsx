import React, { useEffect, useRef, useState } from "react";

const COLORS = {
  primary: "#1E90FF",
  bg: "#ffffff",
  userBubble: "#1E90FF",
  botBubble: "#f1f1f1",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const messagesRef = useRef(null);
  const speechRecRef = useRef(null);

  const faqs = {
    "what is smm laboratories":
      "SMM Laboratories is a Botswana-based environmental and agricultural testing facility providing soil, water, mineral, plant, and environmental analysis.",
    "where are you located": "We are located in Palapye, Botswana.",
    "who do you serve":
      "We serve farmers, students, environmental consultants, mining & exploration companies, researchers, NGOs, and the general public.",
    "what do you do":
      "We provide testing for soil, water, plant tissue, minerals, contamination checks and environmental monitoring.",
    "how long do results take": "Results take 3–7 working days depending on the test.",
    "how do i submit samples":
      "Visit our lab or schedule a pickup. Provide clearly labelled samples and we will deliver results within 3–7 working days.",
    "what samples do you accept":
      "We accept soil, water, plant tissue, agricultural inputs, mining samples and other environmental samples.",
    "do you test soil":
      "Yes — we test soil for nutrients, composition, contamination, and suitability for agriculture.",
    "do you test water":
      "Yes — we test potable and borehole water for safety, contamination and chemical composition.",
    "do you offer pickup":
      "Yes — sample pickup is available depending on your location. Contact us for scheduling.",
    equipment:
      "We use advanced analytical instruments including ICP and Microwave Digestion systems among others.",
    contact: "You can reach us at +267 72846073 or smmtest24@gmail.com.",
    email: "smmtest24@gmail.com",
    phone: "+267 72846073",
    "operating hours": "Monday–Friday, 8:00 AM to 5:00 PM.",
  };

  const categories = {
    Services: [
      "What services do you offer",
      "Do you test soil",
      "Do you test water",
      "Do you analyse mining samples",
    ],
    Samples: [
      "How do I submit samples",
      "What samples do you accept",
      "Do you provide guidance on sample collection",
    ],
    Contact: ["Where are you located", "How can I contact you", "Operating hours"],
  };

  const addMessage = (payload) => {
    const msg = typeof payload === "string" ? { text: payload, sender: "bot" } : payload;
    setMessages((prev) => [...prev, msg]);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const scrollToBottomSoon = () => {
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }, 40);
  };

  const botReplyWithTyping = async (fullText) => {
    setIsTyping(true);
    await delay(500 + Math.random() * 500);

    setMessages((prev) => [
      ...prev,
      { text: "typing", sender: "bot", meta: { typingIndicator: true } },
    ]);
    scrollToBottomSoon();
    await delay(500);

    setMessages((prev) => prev.filter((m) => !(m.meta && m.meta.typingIndicator)));

    let revealed = "";
    const charSpeed = 18 + Math.round(Math.random() * 25);
    for (let i = 0; i < fullText.length; i++) {
      revealed += fullText[i];
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.sender === "bot" && last.meta && last.meta.draft) {
          const copy = prev.slice(0, -1);
          copy.push({ text: revealed, sender: "bot", meta: { draft: true } });
          return copy;
        } else {
          return [...prev, { text: revealed, sender: "bot", meta: { draft: true } }];
        }
      });
      scrollToBottomSoon();
      await delay(charSpeed);
    }

    setMessages((prev) =>
      prev.map((m) => {
        if (m.sender === "bot" && m.meta && m.meta.draft) {
          return { ...m, meta: { ...m.meta, draft: false } };
        }
        return m;
      })
    );

    setIsTyping(false);
    speakText(fullText);
  };

  const findFaqAnswer = (text) => {
    const lower = text.toLowerCase();
    for (const key in faqs) {
      if (lower.includes(key)) return faqs[key];
    }
    if (lower.includes("who")) return faqs["who do you serve"] || null;
    if (lower.includes("where") || lower.includes("location")) return faqs["where are you located"];
    if (lower.includes("contact") || lower.includes("phone") || lower.includes("email"))
      return faqs["contact"];
    if (lower.includes("sample") || lower.includes("submit")) return faqs["how do i submit samples"];
    if (lower.includes("result") || lower.includes("turnaround") || lower.includes("time"))
      return faqs["how long do results take"];
    return null;
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.lang = "en-GB";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setListening(false);
      addMessage({ text: spoken, sender: "user" });
      handleUserMessage(spoken);
    };

    rec.onerror = (e) => {
      console.warn("Speech recognition error:", e);
      setListening(false);
    };

    rec.onend = () => setListening(false);

    speechRecRef.current = rec;

    return () => {
      try {
        rec.abort();
      } catch (e) {}
    };
  }, []);

  const toggleListening = () => {
    const rec = speechRecRef.current;
    if (!rec) {
      addMessage({ text: "Voice input not supported in this browser.", sender: "bot" });
      return;
    }
    if (listening) {
      try {
        rec.stop();
      } catch (e) {}
      setListening(false);
    } else {
      try {
        rec.start();
        setListening(true);
      } catch (e) {
        console.warn("Speech start error", e);
        setListening(false);
      }
    }
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1;
      utter.pitch = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn("SpeechSynthesis error", e);
    }
  };

  const handleUserMessage = (rawText) => {
    const text = (rawText || "").trim();
    if (!text) return;

    const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];
    if (greetings.some((g) => text.toLowerCase() === g || text.toLowerCase().startsWith(g))) {
      botReplyWithTyping(
        "Hello! 👋 How can I assist you today? You can ask about our services, sample submission, turnaround time, or contact info."
      );
      return;
    }

    const answer = findFaqAnswer(text);
    if (answer) {
      botReplyWithTyping(answer);
    } else {
      botReplyWithTyping(
        "I'm not sure about that yet. You can ask about our services, sample submission, turnaround time, or contact info."
      );
    }
  };

  const sendCurrentInput = () => {
    if (!input.trim()) return;
    addMessage({ text: input, sender: "user" });
    const toProcess = input;
    setInput("");
    handleUserMessage(toProcess);
  };

  const handleSuggestionClick = (text) => {
    addMessage({ text, sender: "user" });
    handleUserMessage(text);
  };

  const renderCategorySuggestions = () => {
    if (!activeCategory) return null;
    const items = categories[activeCategory] || [];
    return (
      <div style={{ padding: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {items.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(s)}
            style={{
              padding: "6px 10px",
              borderRadius: 18,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            {s}
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    scrollToBottomSoon();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      botReplyWithTyping(
        "Welcome to SMM Laboratories — how can I help you today? You can ask about services, samples, turnaround time, or press the mic to speak."
      );
    }
  }, []);

  return (
    <>
      {!isOpen && (
        <div
          title="Open chat"
          role="button"
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: 22,
            right: 22,
            zIndex: 12000,
            cursor: "pointer",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: COLORS.primary,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(30,144,255,0.24)",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            💬
          </div>
          <div
            style={{
              background: "#fff",
              padding: "8px 12px",
              borderRadius: 999,
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              fontSize: 13,
              display: window.innerWidth > 500 ? "block" : "none",
            }}
          >
            Chat with SMM Labs
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: Math.min(420, window.innerWidth - 30),
            height: Math.min(560, window.innerHeight - 40),
            zIndex: 13000,
            display: "flex",
            flexDirection: "column",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}
        >
          {/* header */}
          <div
            style={{
              background: COLORS.primary,
              color: "#fff",
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontWeight: 700 }}>SMM Labs Chat</div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 22,
                lineHeight: "16px",
                cursor: "pointer",
                padding: 6,
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* categories */}
          <div style={{ background: "#fafafa", padding: 8, borderBottom: "1px solid #eee", display: "flex", gap: 8 }}>
            {Object.keys(categories).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory((prev) => (prev === cat ? null : cat))}
                style={{
                  padding: "6px 10px",
                  borderRadius: 20,
                  border: "1px solid #e6e6e6",
                  background: activeCategory === cat ? COLORS.primary : "#fff",
                  color: activeCategory === cat ? "#fff" : "#333",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {activeCategory && renderCategorySuggestions()}

          {/* messages */}
          <div
            ref={messagesRef}
            style={{
              flex: 1,
              padding: 12,
              background: "#fff",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.sender === "user" ? "flex-end" : "flex-start", maxWidth: "86%" }}>
                <div
                  style={{
                    background: m.sender === "user" ? COLORS.userBubble : COLORS.botBubble,
                    color: m.sender === "user" ? "#fff" : "#000",
                    padding: "8px 12px",
                    borderRadius: 12,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: "flex-start" }}>
                <div style={{ display: "inline-block", padding: "8px 12px", borderRadius: 12, background: COLORS.botBubble }}>
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* input */}
          <div style={{ padding: 10, background: "#fff", borderTop: "1px solid #eee", display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={toggleListening}
              title="Voice input"
              style={{
                width: 42,
                height: 42,
                borderRadius: 8,
                border: "1px solid #e6e6e6",
                background: listening ? "#ffecec" : "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {listening ? "🎙️" : "🎤"}
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendCurrentInput()}
              placeholder="Ask about services, samples, contact..."
              style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #e6e6e6" }}
            />

            <button
              onClick={sendCurrentInput}
              style={{ background: COLORS.primary, color: "#fff", border: "none", padding: "10px 14px", borderRadius: 8, cursor: "pointer" }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const TypingDots = () => {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", width: 44, justifyContent: "space-between" }}>
      <span style={dotStyle(0)} />
      <span style={dotStyle(150)} />
      <span style={dotStyle(300)} />
    </div>
  );
};

const dotStyle = (delayMs = 0) => ({
  width: 7,
  height: 7,
  borderRadius: "50%",
  background: "#bdbdbd",
  display: "inline-block",
  animation: `typing-dot 900ms ${delayMs}ms infinite`,
});

(function injectKeyframes() {
  if (typeof document === "undefined") return;
  const styleId = "smm-chat-typing-dots";
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.innerHTML = `
    @keyframes typing-dot {
      0% { transform: translateY(0); opacity: 0.6; }
      50% { transform: translateY(-6px); opacity: 1; }
      100% { transform: translateY(0); opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);
})();

export default Chatbot;
