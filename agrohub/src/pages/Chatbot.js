import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I'm AgroBot. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    setTimeout(() => {
      const response = getBotResponse(input);
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
    }, 500);

    setInput("");
  };

  const getBotResponse = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes("buy")) return "You can explore products in our Marketplace.";
    if (text.includes("advisory")) return "user can view blogs related to farming in 'advisory' section.";
    if (text.includes("weather")) return "Go to the Weather section for current updates!";
    return "Sorry, I didn't understand that. Try asking about buying, selling, or weather!";
  };

  return (
    <div className="chatbot-container">
      <button className="chat-toggle" onClick={toggleChat}>
        💬
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">AgroBot 🤖</div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
