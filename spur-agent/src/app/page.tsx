"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  sender: string;
  message: string;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Thinking...");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      message: "Hello! How can I assist you today?",
    },
  ]);

  // Add this import at the top if not present, but for now I'll just use the standard hooks
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", message: input }]);
    setInput("");

    setIsLoading(true);
    setLoadingStatus("Thinking...");

    // Timer to update message if it takes too long (e.g. cold start)
    const timeoutId = setTimeout(() => {
      setLoadingStatus("Waking up the server...");
    }, 3000);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", message: data.message },
      ]);
    } catch (error: any) {
      console.error("Failed to send message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", message: `Error: ${error.message || "Something went wrong"}` },
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }

  };

  return (
    <main className="chat-wrapper">
      <div className="chat-container">
        <header className="chat-header">
          <span>🤖</span> Virtual Chatbox
        </header>

        <div className="chat-messages">
          {/* Messages will be displayed here */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "bot" ? "bot-message" : "user-message"
                }`}
            >
              {message.message}
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message loading-message">
              <span className="animate-pulse">{loadingStatus}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </main>
  );
}
