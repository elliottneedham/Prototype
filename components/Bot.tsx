import React, { useState } from 'react';

// Define the message type so TypeScript knows sender must be 'user' or 'bot'
type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
};

const Bot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    const mockResponse: ChatMessage = {
      sender: 'bot',
      text: "I'm Bot! Once data is connected, I'll answer this with insight and clarity.",
    };

    setMessages((prev) => [...prev, userMessage, mockResponse]);
    setInput('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: isOpen ? '320px' : '60px',
        height: isOpen ? '420px' : '60px',
        borderRadius: '16px',
        backgroundColor: isOpen ? '#FFFFFF' : '#111',
        color: 'white',
        boxShadow: '0 0 12px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        zIndex: 999,
      }}
    >
      {isOpen ? (
        <>
          <div style={{ padding: '10px', backgroundColor: '#111', fontWeight: 'bold' }}>
            💬 Bot – Ask about your data
          </div>
          <div style={{ flex: 1, padding: '10px', height: '290px', overflowY: 'auto' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '10px',
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                }}
              >
                <span
                  style={{
                    backgroundColor: msg.sender === 'user' ? '#007bff' : '#333',
                    color: 'white',
                    padding: '6px 10px',
                    borderRadius: '16px',
                    display: 'inline-block',
                    maxWidth: '80%',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #333' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Bot..."
              style={{
                flex: 1,
                padding: '10px',
                background: '#000',
                border: 'none',
                color: '#fff',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: '#007bff',
                border: 'none',
                padding: '0 14px',
                color: '#fff',
              }}
            >
              ➤
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          💬
        </button>
      )}

      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '5px',
            right: '8px',
            background: 'transparent',
            border: 'none',
            color: '#999',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Bot;