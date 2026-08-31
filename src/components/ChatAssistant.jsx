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
  Ticket,
  ShieldCheck,
  RotateCcw,
  Building2,
  ChevronRight,
  LifeBuoy,
  Tag,
  Zap,
  Gift,
  Award,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';

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
    showInfo: "14 Nov 2026 @ NICE Grounds, Bengaluru. Passes from ₹4,000 to ₹16,000 (Silver, Gold, Platinum Lounge). Promoter cut up to ₹1,440/ticket.",
    eventId: "evt-gnr-blr"
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
    showInfo: "21 Nov 2026 @ Mahalaxmi Racecourse, Mumbai. Passes from ₹4,250 to ₹32,000 (GA Back, GA Front, Early Bird Backstage, VIP Lounge). Promoter cut up to ₹3,200/ticket.",
    eventId: "evt-anyma-mum"
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
    showInfo: "Delhi NCR: 05 Dec 2026 @ Leisure Valley Ground | Mumbai: 08–09 Dec 2026 @ Mahalaxmi Racecourse. Verified student passes from ₹1,750.",
    eventId: "evt-fred-del"
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
    showInfo: "20 Dec 2026 @ NICE Grounds, Bengaluru (Sunburn Arena). Passes from ₹1,500 to ₹12,999. Promoter cut up to ₹1,300/ticket.",
    eventId: "evt-chainsmokers-blr"
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
    showInfo: "13 Dec 2026 @ HUDA Gymkhana Club, Gurugram (Delhi NCR). Passes from ₹2,549 to ₹6,999. Promoter cut up to ₹630/ticket.",
    eventId: "evt-khalid-del"
  }
};

export const ChatAssistant = ({ 
  onNavigate,
  onOpenRecordSale, 
  onOpenPriceList, 
  externalQueryTrigger, 
  onNavigateToFAQ 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: "👋 Hi! I'm **Tixora AI Assistant**.\n\nAsk me about:\n• 🎫 **Support Tickets:** Raise issues, track refunds & ticket inquiries\n• 💳 **Upfront Payments:** Instant UPI, Card & Bank clearance\n• 📲 **Pass Delivery:** Instant dispatch to BookMyShow/District accounts\n• 🏆 **Promoter Tiers:** Commission rates up to 16% + VIP access\n• 🎵 **2026 Concerts:** Anyma, Fred again.., Guns N' Roses, Chainsmokers, Khalid\n\n📞 *Direct helpline: +91 78921 45475*",
      timestamp: 'Just now',
      actions: [
        { label: "🎫 Support Tickets Desk", view: "tickets" },
        { label: "💰 Price Calculator", view: "prices" },
        { label: "🎟️ Concert Roster", view: "posters" }
      ]
    }
  ]);
  const messagesEndRef = useRef(null);

  const generateBotReply = (query) => {
    const q = query.toLowerCase().trim();

    // 0. Support Tickets / Issues / Disputes / Refunds
    if (q.includes('ticket') && (q.includes('support') || q.includes('raise') || q.includes('issue') || q.includes('help') || q.includes('problem') || q.includes('desk') || q.includes('track') || q.includes('complaint'))) {
      return {
        text: `🎫 **Tixora Support & Issue Resolution Desk:**\n\n• **Instant Ticket Creation:** You can raise a ticket for missing passes, payment verification, student discounts, partner refund approvals, or buyer disputes.\n• **Priority Resolution SLA:** Typical resolution time is **2 to 4 hours** with direct founder escalation.\n• **Single Source of Truth:** All transactions recorded under your DigiLocker-verified account are automatically audited.\n\nClick below to open the dedicated Support Tickets portal or message our leadership directly.`,
        actions: [
          { label: "🎫 Open Support Tickets Desk", view: "tickets" },
          { label: "📞 WhatsApp Helpline", url: "https://wa.me/917892145475" }
        ]
      };
    }

    // 1. Helpline / Phone Number / Founders
    if (q.includes('number') || q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('whatsapp') || q.includes('helpline')) {
      return {
        text: `📞 **Tixora Helpline & Leadership Support:**\n\n• **Direct Phone / WhatsApp:** [+91 78921 45475](https://wa.me/917892145475)\n• **Support Hours:** 10:00 AM – 10:00 PM IST (Daily)\n\n**🏛️ Founding Team & Leadership:**\n• **Ronak Jain R** (Founder) — ronakj303@gmail.com | +91 78921 45475\n• **Prajwal Gowrish H S** (Co-Founder) — gowrishprajwal123@gmail.com | +91 88612 00170\n• **Anshul S Balan** (Co-Founder) — anshulsb70@gmail.com | +91 70125 37541\n• **Kanishk Jhunjhunwala** (Co-Founder) — kanishkjhunjhunwala@gmail.com | +91 91045 73147`,
        actions: [
          { label: "💬 Message on WhatsApp", url: "https://wa.me/917892145475" },
          { label: "📬 Contact Form", view: "contact" }
        ]
      };
    }

    // 2. Upfront Payment & Pass Issuance Flow
    if (q.includes('how to pay') || q.includes('payment model') || q.includes('when is ticket issued') || q.includes('pay us') || q.includes('upfront') || q.includes('credit') || q.includes('how do promoters pay') || q.includes('payment method')) {
      return {
        text: `💳 **Upfront Payment & Instant Ticket Issuance:**\n\n• **Payment-First Model:** Promoters pay Tixora upfront via **Card (Debit/Credit)**, **UPI**, or **Instant Bank Transfer (IMPS/NEFT)**.\n• **When Tickets Are Issued:** The moment payment is verified, the digital pass is generated and dispatched directly to the buyer's official **BookMyShow or District account**.\n• **No Credit Deadlines:** Transactions settle instantly with zero risk of unpaid balances.`,
        actions: [
          { label: "⚡ Record a New Sale", action: "recordSale" },
          { label: "📊 View Price Lists", view: "prices" }
        ]
      };
    }

    // 3. Collecting Cash from Customer
    if (q.includes('collect cash') || q.includes('cash from buyer') || q.includes('customer cash') || q.includes('buyer pays cash')) {
      return {
        text: `💵 **Collecting Physical Cash from Buyers:**\n\n• **Yes, you can collect physical cash directly from your peers!**\n• **How it Works:** You collect the cash, then pay Tixora via UPI/Card in the portal. The official ticket with QR is delivered immediately into your buyer's BookMyShow / District account in real time.\n• **Your Cut:** You retain your commission portion upfront or receive it direct to your linked UPI!`,
        actions: [
          { label: "⚡ Record Cash Sale", action: "recordSale" },
          { label: "📜 View Sales Ledger", view: "ledger" }
        ]
      };
    }

    // 4. Move up a tier & better commission rate
    if (q.includes('move up') || q.includes('better commission') || q.includes('tier progression') || q.includes('increase commission') || q.includes('tier rate') || q.includes('upgrade tier')) {
      return {
        text: `📈 **How to Move Up Tiers & Earn Up to 16% Commission:**\n\n• **Automatic Progression:** Tiers update in real time based on your total verified ticket volume:\n  - 🥉 **Bronze (0–9 tkts):** 5.0% base cut\n  - 🥈 **Silver (10–50 tkts):** 5.0% – 8.5% cut\n  - 🥇 **Gold (51–150 tkts):** 9.0% – 12.0% cut + priority artist guestlist\n  - 💎 **Diamond / Platinum (151+ tkts):** 13.0% – 16.0% cut + all-access backstage passes`,
        actions: [
          { label: "🏆 View Tier Milestones", view: "tiers" },
          { label: "🎁 Claim Rewards", view: "rewards" }
        ]
      };
    }

    // 5. Promoter Milestone Rewards, Free Tickets & Merch Coupons
    if (q.includes('reward') || q.includes('free ticket') || q.includes('coupon') || q.includes('free pass') || q.includes('merch') || q.includes('voucher') || q.includes('perk')) {
      return {
        text: `🎁 **Promoter Milestone Rewards & Free Concert Passes:**\n\n• **2x Free GA Passes:** Sell 25 passes to unlock 2 free tickets to The Chainsmokers Bengaluru (₹4,000 value)!\n• **₹1,500 Tour Merch Voucher:** Unlocked at 15 sales milestone.\n• **1x VIP Fanpit Pass:** Unlocked at 50 sales for Anyma presents ÆDEN Mumbai (₹8,000 value).\n• **2x All-Access Backstage Passes:** Unlocked at 100 sales for Guns N' Roses India Tour!\n• **₹5,000 Direct Cash Stipend:** For 150 sales milestone.`,
        actions: [
          { label: "🎁 Open Rewards & Referrals", view: "rewards" },
          { label: "🚀 Ambassador Waitlist", view: "waitlist" }
        ]
      };
    }

    // 6. Campus Promoter Referral Program
    if (q.includes('refer') || q.includes('invite') || q.includes('bounty') || q.includes('referral code') || q.includes('earn 500') || q.includes('referral link')) {
      return {
        text: `🤝 **Campus Promoter Referral Program (Earn ₹500/Friend):**\n\n• **Share Your Code:** Share your unique referral link from the Rewards tab.\n• **Instant Bounty:** When your referred friend joins and sells their first 5 passes, **₹500 cash** is credited directly to your UPI.\n• **Unlimited Referrals:** No cap on referral rewards!`,
        actions: [
          { label: "🤝 View Referral Code", view: "rewards" }
        ]
      };
    }

    // 7. How tickets are delivered to buyer (BookMyShow / District)
    if (q.includes('how are tickets') || q.includes('delivered') || q.includes('ticket delivery') || q.includes('where do tickets go') || q.includes('receive ticket') || q.includes('bookmyshow') || q.includes('district')) {
      return {
        text: `📲 **Direct Digital Delivery to BookMyShow / District:**\n\n• **Official Platform Delivery:** Passes are delivered directly into the buyer's BookMyShow or District app account linked to their mobile number.\n• **No Separate App Needed:** Buyers don't need a Tixora account — they see their scannable QR ticket directly in their BookMyShow or District app.\n• **100% Genuine:** Zero risk of duplicate or counterfeit tickets.`,
        actions: [
          { label: "🎟️ Explore Concerts", view: "posters" },
          { label: "🎫 Support Desk", view: "tickets" }
        ]
      };
    }

    // 8. Event Cancellations & Refunds
    if (q.includes('cancel') || (q.includes('refund') && (q.includes('event') || q.includes('cancelled') || q.includes('money back')))) {
      return {
        text: `🔄 **Event Cancellations & Refund Protection:**\n\n1. **Digital Passes:** Delivered tickets are automatically refunded through the official BookMyShow/District cancellation flow.\n2. **Promoter Cash Reversal:** Cash paid by peer buyers is refunded back through Tixora.\n3. **Resolution Assistance:** You can submit an expedited refund request on our Support Tickets Desk.`,
        actions: [
          { label: "🎫 Raise Refund Request", view: "tickets" },
          { label: "📖 View Cancellation FAQs", view: "faqs" }
        ]
      };
    }

    // 9. DigiLocker Verification
    if (q.includes('digilocker') || q.includes('why verify') || q.includes('verification') || q.includes('identity')) {
      return {
        text: `🛡️ **Why DigiLocker Verification is Required:**\n\n• **Verified Identity:** DigiLocker confirms your identity (Aadhaar/PAN details) before ticket issuance access is granted.\n• **Anti-Scalping Security:** Protects buyers knowing they purchased from a verified student promoter.\n• **Audit Trail:** Protects promoters in case of buyer disputes as all orders are cryptographically authenticated.`,
        actions: [
          { label: "🚀 Join Ambassador Waitlist", view: "waitlist" },
          { label: "📜 View Legal & Compliance", view: "about" }
        ]
      };
    }

    // 10. Artist Songs & Info Matching
    if (q.includes('fred') || q.includes('again')) {
      const a = ARTIST_KNOWLEDGE['fred again'];
      return {
        text: `🎹 **${a.name}**\n**Genre:** ${a.genre}\n\n**🔥 Most Popular Songs:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Tour Info:** ${a.showInfo}`,
        actions: [
          { label: "🎟️ View Fred again.. Passes", view: "prices", eventId: a.eventId }
        ]
      };
    }

    if (q.includes('anyma') || q.includes('aeden') || q.includes('æden') || q.includes('afterlife')) {
      const a = ARTIST_KNOWLEDGE['anyma'];
      return {
        text: `🌌 **${a.name}**\n**Genre:** ${a.genre}\n\n**🔥 Most Popular Tracks:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Show Info:** ${a.showInfo}`,
        actions: [
          { label: "🎟️ View Anyma ÆDEN Passes", view: "prices", eventId: a.eventId }
        ]
      };
    }

    if (q.includes('guns') || q.includes('roses') || q.includes('slash') || q.includes('axl')) {
      const a = ARTIST_KNOWLEDGE['guns n roses'];
      return {
        text: `🎸 **${a.name}**\n**Lineup:** ${a.members}\n\n**🔥 Legendary Songs:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Tour Info:** ${a.showInfo}`,
        actions: [
          { label: "🎟️ View Guns N' Roses Passes", view: "prices", eventId: a.eventId }
        ]
      };
    }

    if (q.includes('chainsmoker') || q.includes('sunburn')) {
      const a = ARTIST_KNOWLEDGE['chainsmokers'];
      return {
        text: `🔥 **${a.name}**\n**Genre:** ${a.genre}\n\n**🔥 Top Anthems:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Show Info:** ${a.showInfo}`,
        actions: [
          { label: "🎟️ View Chainsmokers Passes", view: "prices", eventId: a.eventId }
        ]
      };
    }

    if (q.includes('khalid') || q.includes('location') || q.includes('young dumb')) {
      const a = ARTIST_KNOWLEDGE['khalid'];
      return {
        text: `🎤 **${a.name}**\n**Genre:** ${a.genre}\n\n**🔥 Top Hits:**\n${a.topSongs.map((s, i) => `${i + 1}. *${s}*`).join('\n')}\n\n📍 **Show Info:** ${a.showInfo}`,
        actions: [
          { label: "🎟️ View Khalid Passes", view: "prices", eventId: a.eventId }
        ]
      };
    }

    // 11. Founders & Board of Directors
    if (q.includes('founder') || q.includes('who made') || q.includes('created by') || q.includes('team') || q.includes('bod') || q.includes('director')) {
      return {
        text: `🏛️ **Tixora Board of Directors & Founding Team:**\n\n• **Ronak Jain R** — Founder (ronakj303@gmail.com | +91 78921 45475)\n• **Prajwal Gowrish H S** — Co-Founder (gowrishprajwal123@gmail.com | +91 88612 00170)\n• **Anshul S Balan** — Co-Founder (anshulsb70@gmail.com | +91 70125 37541)\n• **Kanishk Jhunjhunwala** — Co-Founder (kanishkjhunjhunwala@gmail.com | +91 91045 73147)\n\n• **Primary Support Helpline:** +91 78921 45475`,
        actions: [
          { label: "📖 About Tixora", view: "about" },
          { label: "📞 Helpline WhatsApp", url: "https://wa.me/917892145475" }
        ]
      };
    }

    // 12. Fallback Search in FAQ Dataset
    const matchFaq = FAQ_DATA.find(f => 
      f.question.toLowerCase().includes(q) || 
      f.keywords.some(k => q.includes(k.toLowerCase()))
    );

    if (matchFaq) {
      return {
        text: `💡 **${matchFaq.question}**\n\n${matchFaq.answer}\n\n*Category: ${matchFaq.categoryLabel}*`,
        actions: [
          { label: "📖 Full FAQ Center", view: "faqs" },
          { label: "🎫 Support Desk", view: "tickets" }
        ]
      };
    }

    // Default Fallback
    return {
      text: `✨ **I'm here to help! Ask me anything about:**\n\n• 🎫 **Support Tickets:** Raising inquiries, tracking status & refunds\n• 💳 **Upfront Payment:** Instant Card, UPI & Bank clearance\n• 📲 **Pass Delivery:** How tickets reach BookMyShow & District\n• 🏆 **Promoter Tiers:** Silver, Gold, Platinum commission rates\n• 🔄 **Cancellations & Refunds:** Protection guidelines\n• 🎸 **2026 Concert Lineups:** Anyma, Fred again.., Guns N' Roses, Chainsmokers, Khalid\n\n📞 *Or WhatsApp our team at +91 78921 45475.*`,
      actions: [
        { label: "🎫 Support Desk", view: "tickets" },
        { label: "💰 Price Calculator", view: "prices" },
        { label: "🎟️ Concert Passes", view: "posters" }
      ]
    };
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
    setIsTyping(true);

    // Simulate smart bot response with micro delay
    setTimeout(() => {
      const replyData = generateBotReply(text);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: typeof replyData === 'string' ? replyData : replyData.text,
        actions: replyData.actions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 320);
  };

  const handleActionClick = (action) => {
    if (action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (action.action === 'recordSale' && onOpenRecordSale) {
      setIsOpen(false);
      onOpenRecordSale();
      return;
    }
    if (action.eventId && onOpenPriceList) {
      setIsOpen(false);
      onOpenPriceList(action.eventId);
      return;
    }
    if (action.view && onNavigate) {
      setIsOpen(false);
      onNavigate(action.view);
      return;
    }
    if (action.view === 'faqs' && onNavigateToFAQ) {
      setIsOpen(false);
      onNavigateToFAQ();
      return;
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: "👋 Chat reset! How can I assist you with Tixora passes, promoter earnings, or support tickets today?",
        timestamp: 'Just now',
        actions: [
          { label: "🎫 Support Tickets", view: "tickets" },
          { label: "💰 Price Calculator", view: "prices" },
          { label: "🎟️ Concert Roster", view: "posters" }
        ]
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (externalQueryTrigger) {
      setIsOpen(true);
      handleSend(externalQueryTrigger);
    }
  }, [externalQueryTrigger]);

  const QUICK_QUESTIONS = [
    { label: "🎫 Support Tickets & Issues", query: "How do I raise a support ticket or request an issue resolution?" },
    { label: "🎁 Rewards & Free Passes", query: "What rewards, free tickets, and coupons do promoters get?" },
    { label: "🤝 Refer Friends (Earn ₹500)", query: "How does the Campus Promoter Referral System work?" },
    { label: "💳 Upfront Card / UPI / Bank", query: "How does ticket payment and instant issuance work?" },
    { label: "💵 Collecting Cash from Buyers", query: "Can promoters collect cash from their peer buyers?" },
    { label: "📲 BMS / District Delivery", query: "How are tickets delivered to the buyer's BookMyShow account?" },
    { label: "📈 Move Up Commission Tiers", query: "How do I move up a tier and get a better commission rate?" },
    { label: "🔄 Cancellations & Refunds", query: "What happens if an event is cancelled or postponed?" },
    { label: "🛡️ DigiLocker Verification", query: "Why do I need to verify with DigiLocker?" },
    { label: "📞 Helpline: +91 78921 45475", query: "Contact phone number, founders, and helpline" }
  ];

  return (
    <>
      {/* Floating Chat Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-launcher-btn"
          title="Open AI Assistant"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            background: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(236, 72, 153, 0.25)',
            color: '#ffffff',
            borderRadius: '9999px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.84rem',
            letterSpacing: '0.01em',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Bot size={14} color="#ffffff" />
          </div>
          <span className="chat-launcher-text">Ask AI Assistant</span>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981'
          }} />
        </button>
      )}

      {/* Interactive Chatbox Window Modal */}
      {isOpen && (
        <div 
          className="chat-window-modal"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '420px',
            maxWidth: 'calc(100vw - 32px)',
            height: '620px',
            maxHeight: 'calc(100vh - 100px)',
            background: 'rgba(11, 13, 19, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '18px',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(236, 72, 153, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden',
            animation: 'fadeInUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          
          {/* Chat Header */}
          <div style={{
            background: 'rgba(18, 20, 28, 0.98)',
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
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Bot size={18} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Tixora AI Assistant</span>
                  <span style={{
                    fontSize: '0.62rem',
                    background: 'rgba(236, 72, 153, 0.18)',
                    color: '#ec4899',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>Live</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ fontSize: '0.68rem', color: '#10b981' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  <span>Support • Delivery • Rates • Lineup</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: 'none',
                  color: 'var(--text-muted)',
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
                title="Clear Chat History"
                onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Trash2 size={13} />
              </button>

              {onNavigateToFAQ && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateToFAQ();
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    color: '#e4e4e7',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="View Full FAQ Guide"
                >
                  <HelpCircle size={12} />
                  <span>FAQs</span>
                </button>
              )}

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
              <span>Helpline / WhatsApp: <strong>+91 78921 45475</strong></span>
            </div>
            <span style={{ fontSize: '0.68rem', textDecoration: 'underline' }}>Chat Now →</span>
          </a>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{
                  background: msg.sender === 'user' ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
                  color: msg.sender === 'user' ? '#090a0d' : '#f4f4f6',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  padding: '10px 13px',
                  fontSize: '0.82rem',
                  lineHeight: 1.48,
                  whiteSpace: 'pre-line',
                  boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(0,0,0,0.3)' : 'none'
                }}>
                  {msg.text}

                  {/* 1-Click Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div style={{
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px'
                    }}>
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(act)}
                          style={{
                            background: 'rgba(236, 72, 153, 0.15)',
                            border: '1px solid rgba(236, 72, 153, 0.35)',
                            color: '#ffffff',
                            borderRadius: '6px',
                            padding: '4px 9px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.3)';
                            e.currentTarget.style.borderColor = '#ec4899';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.35)';
                          }}
                        >
                          <span>{act.label}</span>
                          <ChevronRight size={11} />
                        </button>
                      ))}
                    </div>
                  )}
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

            {/* Live Typing Indicator */}
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px 14px 14px 2px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span className="pulse-dot" style={{ margin: 0, width: '6px', height: '6px', background: '#ec4899' }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tixora AI is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 1-Click Quick Suggestion Chips Bar */}
          <div style={{
            padding: '8px 10px',
            background: 'rgba(14, 16, 24, 0.88)',
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
                  gap: '4px',
                  flexShrink: 0
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
              placeholder="Ask about support tickets, refunds, BookMyShow delivery..."
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

