import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  Phone,
  MessageCircle,
  Music, 
  CreditCard, 
  HelpCircle, 
  Ticket
} from 'lucide-react';

const ARTIST_KNOWLEDGE = {
  'guns n roses': {
    name: "Guns N' Roses",
    genre: "Hard Rock / Heavy Metal",
    members: "Axl Rose (Vocals), Slash (Lead Guitar), Duff McKagan (Bass), Dizzy Reed (Keyboards)",
    bio: "American hard rock icons formed in 1985 in Los Angeles. Known for raw rock energy, soaring guitar solos, and stadium rock anthems with over 100M+ records sold worldwide.",
    topSongs: [
      "Sweet Child O' Mine",
      "November Rain",
      "Paradise City",
      "Welcome to the Jungle",
      "Don't Cry",
      "Knockin' on Heaven's Door",
      "Patience",
      "Civil War"
    ],
    showInfo: "14 Nov 2026 @ NICE Grounds, Bengaluru. Passes from ₹4,000 to ₹16,000 (Silver, Gold, Platinum Lounge)."
  },
  'anyma': {
    name: "Anyma (Matteo Milleri)",
    genre: "Melodic Techno / Cyberpunk Audiovisual",
    members: "Matteo Milleri (Co-founder of Tale of Us / Afterlife)",
    bio: "Pioneering Italian-American electronic music artist fusing cutting-edge 3D holographic humanoid visuals with melodic techno. ÆDEN is his signature immersive arena spectacle.",
    topSongs: [
      "Eternity (with Chris Avantgarde)",
      "Syren (with Rebūke)",
      "Genesys",
      "Pictures of You",
      "Welcome To The Opera (with Grimes)",
      "Consciousness (with Chris Avantgarde)",
      "Save Me (with Cassian)",
      "Running"
    ],
    showInfo: "21 Nov 2026 @ Mahalaxmi Racecourse, Mumbai. Passes from ₹4,250 to ₹32,000 (GA Back, GA Front, Early Bird Backstage, VIP Lounge)."
  },
  'fred again': {
    name: "Fred again.. (Fred Gibson)",
    genre: "Electronic / UK Garage / House / Ambient",
    members: "Fred Gibson (British producer, singer, songwriter)",
    bio: "BRIT Award-winning producer known for emotionally charged live sets combining real-life vocal voice notes, intimate piano melodies, and explosive UK basslines.",
    topSongs: [
      "Delilah (pull me out of this)",
      "Marea (we've lost dancing)",
      "adore u (with Obongjayar)",
      "Danielle (smile on my face)",
      "leavemealone (with Baby Keem)",
      "Rumble (with Skrillex & Flowdan)",
      "Jungle",
      "stayinit (with Lil Yachty)"
    ],
    showInfo: "Delhi NCR: 05 Dec 2026 @ Leisure Valley Ground | Mumbai: 08–09 Dec 2026 @ Mahalaxmi Racecourse. Verified student passes from ₹1,750."
  },
  'chainsmokers': {
    name: "The Chainsmokers",
    genre: "EDM / Electropop / Dance Pop",
    members: "Alex Pall & Andrew Taggart",
    bio: "Grammy Award-winning American electronic duo celebrated for multi-billion stream pop-electronic anthems, explosive festival pyros, and stadium crowd sing-alongs.",
    topSongs: [
      "Closer (feat. Halsey)",
      "Something Just Like This (with Coldplay)",
      "Paris",
      "Don't Let Me Down (feat. Daya)",
      "Roses (feat. ROZES)",
      "Takeaway (with ILLENIUM & Lennon Stella)",
      "High",
      "All We Know (feat. Phoebe Ryan)"
    ],
    showInfo: "20 Dec 2026 @ NICE Grounds, Bengaluru (Sunburn Arena). Passes from ₹1,500 to ₹12,999."
  },
  'khalid': {
    name: "Khalid",
    genre: "R&B / Soul / Pop",
    members: "Khalid Donnel Robinson",
    bio: "Multi-platinum, 6-time Grammy-nominated American singer-songwriter famous for his warm baritone voice, heartfelt lyrics, and laid-back nostalgic summer vibes.",
    topSongs: [
      "Location",
      "Young Dumb & Broke",
      "Talk",
      "Better",
      "Lovely (with Billie Eilish)",
      "Silence (with Marshmello)",
      "Eastside (with Benny Blanco & Halsey)",
      "8TEEN"
    ],
    showInfo: "13 Dec 2026 @ HUDA Gymkhana Club, Gurugram (Delhi NCR). Passes from ₹2,549 to ₹6,999."
  }
};

export const ChatAssistant = ({ onOpenRecordSale, onOpenPriceList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: "👋 Hi! I'm **Tixora AI Assistant**.\n\nAsk me about popular songs of any artist, concert dates, cash settlements, or promoter commission tiers.\n\n📞 *For direct queries, reach our helpline at +91 78921 45475.*",
      timestamp: 'Just now'
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateBotReply = (query) => {
    const q = query.toLowerCase().trim();

    // 0. Helpline / Phone Number
    if (q.includes('number') || q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('whatsapp') || q.includes('support') || q.includes('help')) {
      return `📞 **Tixora Helpline & Founder Support:**\n\n• **Direct Phone / WhatsApp:** [+91 78921 45475](tel:+917892145475)\n• **Support Hours:** 10:00 AM – 10:00 PM IST\n• **Founding Team:** Ronak Jain R (Founder) & Anshul S Balan (Co-Founder)\n\nFeel free to call or WhatsApp +91 78921 45475 anytime for promoter onboarding, event allocations, or urgent settlement queries!`;
    }

    // 1. Artist Songs & Info Matching
    if (q.includes('fred') || q.includes('again')) {
      const a = ARTIST_KNOWLEDGE['fred again'];
      return `🎹 **${a.name}**\n**Genre:** ${a.genre}\n\n**🔥 Most Popular Songs:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Tour Info:** ${a.showInfo}`;
    }

    if (q.includes('anyma') || q.includes('aeden') || q.includes('æden') || q.includes('afterlife')) {
      const a = ARTIST_KNOWLEDGE['anyma'];
      return `🌌 **${a.name}**\n**Genre:** ${a.genre}\n\n**🔥 Most Popular Tracks:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Show Info:** ${a.showInfo}`;
    }

    if (q.includes('guns') || q.includes('roses') || q.includes('slash') || q.includes('axl')) {
      const a = ARTIST_KNOWLEDGE['guns n roses'];
      return `🎸 **${a.name}**\n**Lineup:** ${a.members}\n\n**🔥 Legendary Songs:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Tour Info:** ${a.showInfo}`;
    }

    if (q.includes('chainsmoker') || q.includes('sunburn')) {
      const a = ARTIST_KNOWLEDGE['chainsmokers'];
      return `🔥 **${a.name}**\n**Genre:** ${a.genre}\n\n**🔥 Top Anthems:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Show Info:** ${a.showInfo}`;
    }

    if (q.includes('khalid') || q.includes('location') || q.includes('young dumb')) {
      const a = ARTIST_KNOWLEDGE['khalid'];
      return `🎤 **${a.name}**\n**Genre:** ${a.genre}\n\n**🔥 Top Hits:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Show Info:** ${a.showInfo}`;
    }

    // 2. Payments & Cash Settlement Rules
    if (q.includes('cash') || q.includes('payment') || q.includes('settle') || q.includes('deposit') || q.includes('deadline')) {
      return `💰 **How Cash & Payments Work on Tixora:**\n\n1. **Accept Cash or UPI:** Many buyers (16-18 students without credit cards) pay promoters directly in cash.\n2. **Instant Ticket Issuance:** You issue tickets against your promoter credit limit. A digital QR pass is generated immediately.\n3. **10-Day Pre-Event Settlement:** You must deposit collected cash to Tixora Ops at least **10 days before** the show.\n4. **Deposit Channels:** Settle via Campus Student Hub drop, UPI, or direct Escrow NEFT/IMPS.\n5. **Anti-Scalping:** All passes must strictly be sold at official published MRP.\n\n*Questions? Call / WhatsApp +91 78921 45475.*`;
    }

    // 3. Commissions & Tiers
    if (q.includes('commission') || q.includes('tier') || q.includes('silver') || q.includes('gold') || q.includes('platinum') || q.includes('earn')) {
      return `🏆 **Promoter Commission Tiers:**\n\n• **Silver (10–50 tkts):** 5.0% – 8.5% cut per ticket (50 ticket credit line).\n• **Gold (51–150 tkts):** 9.0% – 12.0% cut + priority artist guestlist access (100 ticket credit line).\n• **Platinum (151+ tkts):** 13.0% – 16.0% cut + all-access backstage pass & tour cash bonuses.\n\n*Your commission is automatically logged to your wallet balance on every sale!*`;
    }

    // 4. DigiLocker & Verification
    if (q.includes('digilocker') || q.includes('verify') || q.includes('fake') || q.includes('fraud')) {
      return `🔒 **DigiLocker Security & QR Verification:**\n\n• Every promoter is 100% verified via DigiLocker (Aadhaar/PAN).\n• Passes generated are digitally signed with unique encrypted barcodes (\`TXR-...\`).\n• At the event entrance, security scans the pass directly against the organizer database. Physical counterfeit paper is impossible.`;
    }

    // 5. Founders
    if (q.includes('founder') || q.includes('who made') || q.includes('created by') || q.includes('team')) {
      return `🏛️ **Tixora Founding Team:**\n\n• **Ronak Jain R** — Founder\n• **Anshul S Balan** — Co-Founder\n• **Support Helpline:** +91 78921 45475\n\nTixora is built to turn verified student networks into official ticketing promoters with digital ticket control.`;
    }

    // Default Fallback
    return `✨ I can help you with:\n\n• **Artist Music & Bios:** Popular songs of Anyma, Fred again.., Guns N' Roses, Chainsmokers, Khalid.\n• **Payment Rules:** Cash collection, UPI, and the 10-day pre-show deposit deadline.\n• **Commission Matrix:** Silver, Gold, and Platinum tier earnings.\n• **Support Contact:** Call or WhatsApp **+91 78921 45475** for any further assistance.`;
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Simulate smart bot response with micro delay
    setTimeout(() => {
      const replyText = generateBotReply(text);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 300);
  };

  const QUICK_QUESTIONS = [
    { label: "🎵 Fred again.. top songs", query: "Top songs of Fred again.." },
    { label: "🌌 Anyma ÆDEN tracklist", query: "Who is Anyma & top tracks?" },
    { label: "🎸 Guns N' Roses hits", query: "Guns N' Roses hits & show info" },
    { label: "💰 10-Day Cash Rules", query: "How does cash settlement work?" },
    { label: "🏆 Commission Tiers", query: "What are promoter commission tiers?" },
    { label: "📞 Helpline: 78921 45475", query: "Contact phone number and helpline" }
  ];

  return (
    <>
      {/* Floating Chat Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            background: '#ffffff',
            color: '#090a0d',
            border: 'none',
            borderRadius: '9999px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            cursor: 'pointer',
            zIndex: 999,
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            animation: 'fadeIn 0.3s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        >
          <Bot size={18} />
          <span>Ask AI Assistant</span>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981'
          }} />
        </button>
      )}

      {/* Interactive Chatbox Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: 'calc(100vw - 40px)',
          maxWidth: '390px',
          height: '540px',
          maxHeight: 'calc(100vh - 120px)',
          background: '#10121a',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease'
        }}>
          
          {/* Chat Header */}
          <div style={{
            background: 'rgba(18, 20, 28, 0.95)',
            borderBottom: '1px solid var(--border-color)',
            padding: '12px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div className="flex items-center gap-2.5">
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#ffffff',
                color: '#090a0d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                  Tixora AI Assistant
                </div>
                <div className="flex items-center gap-1.5" style={{ fontSize: '0.68rem', color: '#10b981' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  <span>Songs • Payments • Contact</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Direct Founder Helpline Callout Bar */}
          <a
            href="https://wa.me/917892145475"
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textDecoration: 'none',
              fontSize: '0.74rem',
              color: '#34d399',
              fontWeight: 600
            }}
          >
            <div className="flex items-center gap-1.5">
              <Phone size={12} />
              <span>Helpline: <strong>+91 78921 45475</strong></span>
            </div>
            <span style={{ fontSize: '0.68rem', textDecoration: 'underline' }}>WhatsApp Us →</span>
          </a>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <div style={{
                  background: msg.sender === 'user' ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
                  color: msg.sender === 'user' ? '#090a0d' : '#f4f4f6',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  padding: '9px 12px',
                  fontSize: '0.8rem',
                  lineHeight: 1.45,
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontSize: '0.62rem',
                  color: 'var(--text-muted)',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  padding: '0 4px'
                }}>
                  {msg.timestamp}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 1-Click Quick Suggestion Chips Bar */}
          <div style={{
            padding: '8px 10px',
            background: 'rgba(14, 16, 24, 0.85)',
            borderTop: '1px solid var(--border-color)',
            overflowX: 'auto',
            display: 'flex',
            gap: '6px',
            WebkitOverflowScrolling: 'touch'
          }}>
            {QUICK_QUESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.query)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  borderRadius: '7px',
                  padding: '5px 9px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '10px',
              background: '#12141d',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '6px'
            }}
          >
            <input
              type="text"
              placeholder="Ask about songs, tour dates, cash rules..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                color: '#ffffff',
                fontSize: '0.82rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              style={{
                background: inputMessage.trim() ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                color: inputMessage.trim() ? '#090a0d' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputMessage.trim() ? 'pointer' : 'default',
                transition: 'all 0.15s ease'
              }}
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
