'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Bot = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input } as const;
    setMessages((prev) => [...prev, userMessage]);

    const botReply = await generateBotResponse(input);
    setMessages((prev) => [...prev, { from: 'bot', text: botReply } as const]);
    setInput('');
  };

  const generateBotResponse = async (query: string): Promise<string> => {
    const lower = query.toLowerCase();
    if (lower.includes('nor')) return 'NoR = Number on Roll (aka student count).';
    return "I'm in dev mode — live data coming soon!";
  };

  const UI = (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
      }}
    >
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '999px',
            boxShadow: '0 0 12px rgba(0,0,0,0.5)',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          💬 Ask Bot
        </button>
      ) : (
        <div
          style={{
            width: '320px',
            height: '400px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 0 30px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#111',
              padding: '12px 16px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #222',
            }}
          >
            <span>Bot</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#aaa',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '12px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: m.from === 'user' ? '#1f1f1f' : '#333',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  maxWidth: '70%',
                  fontSize: '14px',
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              backgroundColor: '#111',
              padding: '8px',
              borderTop: '1px solid #222',
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#222',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );

  return mounted ? createPortal(UI, document.body) : null;
};

export default Bot;