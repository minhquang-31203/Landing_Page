import { useState, useEffect, useRef, useCallback } from 'react';
import './ChatBot.css';

/**
 * ChatBot — Cửa sổ tư vấn thông minh VisionX
 * Auto-reply dựa trên keywords, typing indicator, sessionStorage history
 */

/* ---- Knowledge base ---- */
const KB = [
  {
    keywords: ['giá', 'bao nhiêu', 'price', 'mua', 'đặt trước', 'order', 'price'],
    reply: '💰 **Bảng giá VisionX:**\n• Standard: **12.900.000 ₫** (gốc 15.9M)\n• Pro: **22.900.000 ₫** (gốc 28.9M)\n• Ultra: **38.900.000 ₫** (gốc 45.9M)\n\nĐang có ưu đãi sớm đến -20%! Bạn muốn đặt trước phiên bản nào?',
  },
  {
    keywords: ['pin', 'battery', 'sạc', 'nạp điện', 'charge'],
    reply: '🔋 **Pin VisionX Pro:**\n• Dung lượng: **800mAh Graphene** thế hệ mới\n• Thời lượng: **12 giờ** liên tục\n• Sạc nhanh: **30 phút → 80%**\n\nCông nghệ Graphene giúp pin bền hơn 3× so với Li-ion thông thường!',
  },
  {
    keywords: ['màu', 'color', 'màu sắc', 'mẫu', 'design', 'thiết kế'],
    reply: '🎨 **Màu sắc VisionX Pro:**\n• **Midnight Black** — Titan đen huyền bí\n• **Glacier Silver** — Ánh bạc tinh khiết\n• **Aurora Gold** — Vàng champagne sang trọng\n\nTất cả đều có gọng Titanium Grade 5, chống xước sapphire.',
  },
  {
    keywords: ['giao hàng', 'ship', 'vận chuyển', 'nhận hàng', 'delivery'],
    reply: '🚀 **Chính sách giao hàng:**\n• Nội thành HN, HCM: **1-2 ngày**\n• Toàn quốc: **3-5 ngày**\n• Quốc tế: **7-14 ngày**\n\n✅ Miễn phí vận chuyển cho đơn đặt trước!\nĐóng gói đặc biệt cao cấp, bảo đảm toàn vẹn.',
  },
  {
    keywords: ['bảo hành', 'warranty', 'hỏng', 'sửa', 'đổi trả', 'return'],
    reply: '🛡️ **Chính sách bảo hành:**\n• **24 tháng** bảo hành chính hãng toàn cầu\n• **30 ngày** đổi trả không điều kiện\n• Hỗ trợ kỹ thuật **24/7** qua app VisionX\n\nVisionX có trung tâm bảo hành tại HN, HCM và Đà Nẵng.',
  },
  {
    keywords: ['ar', 'màn hình', 'display', 'độ phân giải', 'resolution', 'hiển thị', '4k'],
    reply: '🖥️ **Màn hình AR VisionX Pro:**\n• Công nghệ: **MicroLED trong suốt**\n• Độ phân giải: **4K (3840×2160)** mỗi mắt\n• Góc nhìn: **52°** đường chéo\n• Tần số quét: **120Hz**\n• Độ sáng: **5000 nits** — rõ nét cả ngoài trời',
  },
  {
    keywords: ['ai', 'trợ lý', 'assistant', 'giọng nói', 'voice', 'dịch thuật', 'translate'],
    reply: '🤖 **Trợ lý AI VisionX:**\n• Nhận diện giọng nói **40+ ngôn ngữ**\n• Dịch thuật **thời gian thực** <50ms\n• AI chip: **NPU 45 TOPS**\n• Điều khiển hoàn toàn bằng giọng nói\n\nChỉ cần nói — VisionX sẽ lo phần còn lại!',
  },
  {
    keywords: ['titan', 'titanium', 'trọng lượng', 'nặng', 'nhẹ', 'gram', 'chất liệu', 'material'],
    reply: '🪶 **Thiết kế VisionX Pro:**\n• Chất liệu: **Titanium Grade 5** (máy bay & y tế)\n• Trọng lượng: chỉ **36g** — nhẹ như kính thường\n• Kính: **Sapphire** chống xước cao cấp\n• Chống nước: **IP54** — thoải mái trong mưa nhẹ',
  },
  {
    keywords: ['camera', 'chụp ảnh', 'lidar', 'quay phim', 'photo', 'video'],
    reply: '📸 **Camera VisionX Pro:**\n• Độ phân giải: **48MP** quang học\n• Cảm biến: **LiDAR** quét 3D không gian\n• Chống rung quang học (OIS)\n• Quay 4K@60fps, chụp RAW\n\nLý tưởng cho nhiếp ảnh đường phố và AR scanning!',
  },
  {
    keywords: ['xin chào', 'hello', 'hi', 'chào', 'hey', 'alo'],
    reply: '👋 **Xin chào! Tôi là VisionBot** 🤖\n\nTôi có thể giúp bạn tìm hiểu về:\n• 💰 Giá cả & Đặt trước\n• 🖥️ Màn hình AR\n• 🤖 Trợ lý AI\n• 🔋 Pin & Sạc\n• 🚀 Giao hàng\n• 🛡️ Bảo hành\n\nBạn muốn biết gì?',
  },
];

const SUGGESTIONS = ['💰 Giá bao nhiêu?', '🔋 Pin được bao lâu?', '🚀 Giao hàng như thế nào?', '🛡️ Bảo hành mấy năm?'];

const DEFAULT_REPLY = '🤔 Tôi chưa có thông tin về điều đó. Hãy thử hỏi về:\n**giá, pin, màu sắc, giao hàng, bảo hành, màn hình AR, camera, trợ lý AI**\n\nHoặc để lại email để được hỗ trợ trực tiếp! 📧';

const BOT_NAME = 'VisionBot';
const STORAGE_KEY = 'visionx-chat-history';

function findReply(text) {
  const lower = text.toLowerCase().normalize('NFC');
  for (const item of KB) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.reply;
    }
  }
  return DEFAULT_REPLY;
}

/* Simple markdown-like bold parser */
function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Handle newlines
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>{line}{j < arr.length - 1 && <br />}</span>
    ));
  });
}

function BotMessage({ text }) {
  return (
    <div className="chat-msg chat-msg--bot">
      <div className="chat-msg__avatar">V</div>
      <div className="chat-msg__bubble chat-msg__bubble--bot">
        {renderText(text)}
      </div>
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <div className="chat-msg chat-msg--user">
      <div className="chat-msg__bubble chat-msg__bubble--user">{text}</div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg--bot">
      <div className="chat-msg__avatar">V</div>
      <div className="chat-msg__bubble chat-msg__bubble--bot chat-typing">
        <span className="chat-typing__dot" />
        <span className="chat-typing__dot" />
        <span className="chat-typing__dot" />
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [{ id: 1, from: 'bot', text: KB[KB.length - 1].reply }]; // greeting
  });
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const msgEndRef = useRef(null);
  const inputRef = useRef(null);
  const msgIdRef = useRef(100);

  // Persist chat history
  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch (_) {}
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Unread badge when closed + bot sends
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.from === 'bot') setUnreadCount((c) => c + 1);
    }
  }, [messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    const userMsg = { id: ++msgIdRef.current, from: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate bot thinking delay
    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      const reply = findReply(text);
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: ++msgIdRef.current, from: 'bot', text: reply }]);
    }, delay);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputVal);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputVal);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chat window */}
      <div className={`chatbot-window${isOpen ? ' chatbot-window--open' : ''}`} role="dialog" aria-label="Chat hỗ trợ VisionX" aria-modal="true">
        {/* Window header */}
        <div className="chatbot-header">
          <div className="chatbot-header__info">
            <div className="chatbot-header__avatar">V</div>
            <div>
              <p className="chatbot-header__name">{BOT_NAME}</p>
              <p className="chatbot-header__status">
                <span className="chatbot-status-dot" />
                Luôn trực tuyến
              </p>
            </div>
          </div>
          <button className="chatbot-header__close" onClick={() => setIsOpen(false)} aria-label="Đóng chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" aria-live="polite">
          {messages.map((msg) =>
            msg.from === 'bot'
              ? <BotMessage key={msg.id} text={msg.text} />
              : <UserMessage key={msg.id} text={msg.text} />
          )}
          {isTyping && <TypingIndicator />}
          <div ref={msgEndRef} />
        </div>

        {/* Quick suggestions */}
        {messages.length <= 2 && (
          <div className="chatbot-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="chatbot-suggestion-btn" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form className="chatbot-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Nhập câu hỏi của bạn..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={200}
            aria-label="Nhập tin nhắn"
            id="chatbot-input"
          />
          <button
            type="submit"
            className="chatbot-send"
            disabled={!inputVal.trim()}
            aria-label="Gửi"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>

      {/* Toggle button */}
      <button
        className="chatbot-toggle"
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        aria-label={isOpen ? 'Đóng chat' : 'Mở chat hỗ trợ'}
        id="chatbot-toggle-btn"
        data-track="chatbot_toggle"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
        {/* Unread badge */}
        {unreadCount > 0 && !isOpen && (
          <span className="chatbot-badge" aria-label={`${unreadCount} tin nhắn mới`}>{unreadCount}</span>
        )}
      </button>
    </div>
  );
}
