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
  ChevronRight
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

export const ChatAssistant = ({ onOpenRecordSale, onOpenPriceList, externalQueryTrigger, onNavigateToFAQ }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: "👋 Hi! I'm **Tixora AI Assistant**.\n\nAsk me about:\n• 🎟️ **Ticket Delivery:** How passes reach BookMyShow/District\n• 💰 **Cash Rules:** 10-day deposit cutoff, interim caps & penalties\n• 🏆 **Tiers:** Commission progressions & performance criteria\n• 🛡️ **DigiLocker & Disputes:** Verification & record authenticity\n• 🎵 **Artists & Songs:** Guns N' Roses, Anyma, Fred again.., Chainsmokers, Khalid\n\n📞 *Direct helpline: +91 78921 45475*",
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

  // Handle external query triggers (e.g. from FAQ items)
  useEffect(() => {
    if (externalQueryTrigger) {
      setIsOpen(true);
      handleSend(externalQueryTrigger);
    }
  }, [externalQueryTrigger]);

  const generateBotReply = (query) => {
    const q = query.toLowerCase().trim();

    // 0. Helpline / Phone Number
    if (q.includes('number') || q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('whatsapp') || q.includes('support') || q.includes('helpline')) {
      return `📞 **Tixora Helpline & Operations Support:**\n\n• **Direct Phone / WhatsApp:** [+91 78921 45475](https://wa.me/917892145475)\n• **Support Hours:** 10:00 AM – 10:00 PM IST (Daily)\n• **Founders:** Ronak Jain R (Founder) & Anshul S Balan (Co-Founder)\n\nFeel free to call or WhatsApp +91 78921 45475 anytime for promoter onboarding, urgent cash settlement assistance, or event ticket allocations!`;
    }

    // 1. FAQ: Missed deposit deadline & penalties
    if (q.includes('miss') && (q.includes('deadline') || q.includes('deposit') || q.includes('cash') || q.includes('cutoff')) || q.includes('under review') || q.includes('late deposit') || q.includes('missed deadline')) {
      return `⚠️ **What Happens If You Miss Your Cash Deposit Deadline:**\n\n• **10-Day Cutoff:** All cash collected from buyers must be deposited with Tixora no later than **10 days before the event**.\n• **'Under Review' Status:** If you miss this deadline, your account is immediately moved to **"Under Review"** and no new tickets can be issued to you until the deposit is made.\n• **Penalty Consequences:** Repeated late deposits will reset your commission rate to the base of your current tier and reduce your credit limit.\n• **Suspension:** Continued non-payment can result in account suspension and recovery action.`;
    }

    // 2. FAQ: How to actually deposit cash (Bank deposit vs UPI)
    if ((q.includes('how') && (q.includes('deposit') || q.includes('pay cash') || q.includes('settle'))) || q.includes('deposit method') || q.includes('bank deposit') || q.includes('upi transfer') || q.includes('how do i actually deposit')) {
      return `🏦 **How to Deposit Collected Cash:**\n\nYou have two official direct options:\n\n1. **Bank Deposit:** Deposit the cash directly into Tixora's designated bank account.\n2. **UPI Transfer:** Pay Tixora directly via UPI for the equivalent amount.\n\n⏱️ *Whichever method you use, ensure your deposit is completed before the 10-day-before-event cutoff so it is reflected against your account on time.*`;
    }

    // 3. FAQ: Limit on holding uncollected cash / Interim deposit cap
    if (q.includes('limit to how much') || q.includes('limit') && (q.includes('hold') || q.includes('cash') || q.includes('uncollected')) || q.includes('interim deposit') || q.includes('cash cap')) {
      return `💼 **Holding Cash Limit & Interim Deposits:**\n\n• **Yes, there is a cap!** There is a defined limit on how much uncollected cash you can hold at any one time before you're required to make an interim deposit, even before the 10-day cutoff.\n• **Purpose:** This protects both you and Tixora from holding large sums of physical cash unnecessarily.`;
    }

    // 4. FAQ: How many tickets can I sell at once / Credit Limit
    if (q.includes('how many tickets') || q.includes('sell at once') || q.includes('credit limit') || q.includes('quota') || q.includes('ticket limit')) {
      return `🎟️ **Ticket Credit Limit & Issuance Quota:**\n\n• You're issued tickets on credit up to a limit based on your **commission tier**.\n• Once you reach your credit limit, no further tickets can be issued to you until you deposit collected cash or your limit is reviewed and raised by Tixora Admin.`;
    }

    // 5. FAQ: Move up a tier & better commission rate
    if (q.includes('move up') || q.includes('better commission') || q.includes('tier progression') || q.includes('increase commission') || q.includes('tier rate') || q.includes('upgrade tier')) {
      return `📈 **How to Move Up Tiers & Get Higher Commission:**\n\n• **Cumulative Volume:** Tiers are determined by your cumulative tickets sold across events.\n• **Performance Criteria:** Within your tier's commission range, you move toward the higher end **only if you have no missed or late deposits and zero confirmed buyer complaints** in the recent period.\n• **Reset Rule:** A single late deposit resets you to the base rate for the following period!`;
    }

    // 6. FAQ: How tickets are delivered to buyer (BookMyShow / District)
    if (q.includes('how are tickets') || q.includes('delivered') || q.includes('ticket delivery') || q.includes('where do tickets go') || q.includes('receive ticket') || q.includes('bookmyshow') || q.includes('district')) {
      if (q.includes('need') && (q.includes('account') || q.includes('bms') || q.includes('district'))) {
        return `📱 **Buyer Account Requirements (BookMyShow / District):**\n\n• **Yes**, the buyer needs an account on the relevant platform (BookMyShow or District) to receive the ticket.\n• **No Credit Card Required:** If they don't have one, creating an account only requires a mobile phone number — no card or bank account needed, ensuring zero friction for cash buyers.`;
      }
      return `📲 **How Tickets are Delivered to the Buyer:**\n\n• **Direct Platform Delivery:** Tickets are delivered digitally, directly into the buyer's own **BookMyShow or District account** — NOT through a separate Tixora app.\n• **Trust & Legitimacy:** The buyer gets an official, scannable ticket on a platform they already recognize and trust, accessible just like any other standard booking.`;
    }

    // 7. FAQ: Physical / Paper tickets
    if (q.includes('physical') || q.includes('paper') || q.includes('printed') || q.includes('hard copy')) {
      return `🚫 **Physical & Paper Ticket Policy:**\n\n• **No paper tickets are generated:** All tickets are issued digitally only.\n• **Anti-Scalping & Fraud Prevention:** This eliminates counterfeit, duplicate, or forged tickets and ensures Tixora always possesses a verifiable, traceable record of every legitimate pass issued.`;
    }

    // 8. FAQ: Event Cancellations & Refunds
    if (q.includes('cancel') || (q.includes('refund') && (q.includes('event') || q.includes('cancelled') || q.includes('money back')))) {
      if (q.includes('not cancelled') || q.includes('isn\'t cancelled') || q.includes('change mind')) {
        return `⚠️ **Buyer Refund Policy (Event NOT Cancelled):**\n\n• Refunds outside of a cancellation strictly follow the standard policy of the ticketing platform (BookMyShow/District) where the ticket was issued.\n• **Promoter Advisory:** Promoters should **not** personally refund cash without confirming the ticket's refund eligibility with Tixora first.`;
      }
      return `🔄 **What Happens If an Event Is Cancelled:**\n\n1. **Digital Passes:** All tickets already delivered are refunded through the standard BookMyShow/District cancellation process on that platform.\n2. **Promoter Cash Refunds:** Cash collected by promoters for a cancelled event must be returned to those buyers.\n3. **Tixora Reimbursements:** Any cash already deposited with Tixora for that event will be refunded to the promoter to pass on.\n4. **Important:** Promoters must **not** disburse refunds to buyers until formal confirmation is received from Tixora.`;
    }

    // 9. FAQ: Event Postponement
    if (q.includes('postpone') || q.includes('reschedule') || q.includes('delayed date')) {
      return `📅 **What Happens If an Event Is Postponed:**\n\n• **Tickets Remain Valid:** Existing tickets typically remain valid for the new date, following the organizer's and platform's postponement policy.\n• **Direct Notice:** Tixora will notify affected promoters directly with instructions specific to that event.`;
    }

    // 10. FAQ: DigiLocker Verification & Disputes
    if (q.includes('digilocker') || q.includes('why verify') || q.includes('verification') || q.includes('identity')) {
      if (q.includes('student') || q.includes('college') || q.includes('genuine')) {
        return `🎓 **DigiLocker vs. Student Verification:**\n\n• **Identity vs Enrollment:** DigiLocker confirms official identity (Aadhaar/PAN details), not school or college enrollment.\n• **Secondary Check:** Some student-exclusive passes may require an additional student ID card or institutional email verification.`;
      }
      return `🛡️ **Why DigiLocker Verification Is Required:**\n\n• **Verified Identity:** DigiLocker confirms your real identity before you're approved as a promoter.\n• **Mutual Protection:** It protects buyers (they know a verified real person sold them the ticket) and protects you (Tixora can resolve disputes in your favor based on verified identity logs).`;
    }

    // 11. FAQ: Disputes Between Promoter and Buyer
    if (q.includes('dispute') || q.includes('conflict') || q.includes('complaint') || q.includes('source of truth')) {
      return `⚖️ **Dispute Resolution Between Promoter and Buyer:**\n\n• **Authoritative Log:** Because every ticket is logged against your verified promoter account, Tixora uses its own ticket records as the **single source of truth** in any dispute — independent of how cash was handled.\n• **Protection for Promoters:** This works in your favor as long as you have properly recorded the transaction in the system.`;
    }

    // 12. FAQ: For Organizers — Minimum Guarantee & Upfront payments
    if (q.includes('organizer') || q.includes('minimum guarantee') || q.includes('how does tixora get') || q.includes('upfront') || q.includes('revenue share')) {
      return `🎪 **How Tixora Works with Event Organizers:**\n\n• **Minimum Guarantee (MG):** Tixora negotiates minimum guarantee deals with organizers — committing to a guaranteed number of tickets sold in exchange for a bulk discount off face value.\n• **Payment Structures:** Depending on demand, deals are structured either as a **committed inventory buy** under a minimum guarantee or as a **revenue-share arrangement** for lower-demand events.`;
    }

    // 13. Artist Songs & Info Matching
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

    // 14. Commission tiers summary
    if (q.includes('commission') || q.includes('tier') || q.includes('silver') || q.includes('gold') || q.includes('platinum')) {
      return `🏆 **Promoter Commission Tiers:**\n\n• **Silver (10–50 tkts):** 5.0% – 8.5% cut per ticket (50 ticket credit line).\n• **Gold (51–150 tkts):** 9.0% – 12.0% cut + priority artist guestlist access (100 ticket credit line).\n• **Platinum (151+ tkts):** 13.0% – 16.0% cut + all-access backstage pass & tour cash bonuses.\n\n*Note: A single late deposit resets you to the base rate of your tier!*`;
    }

    // 15. Founders
    if (q.includes('founder') || q.includes('who made') || q.includes('created by') || q.includes('team')) {
      return `🏛️ **Tixora Founding Team:**\n\n• **Ronak Jain R** — Founder\n• **Anshul S Balan** — Co-Founder\n• **Support Helpline:** +91 78921 45475\n\nTixora empowers verified student networks to issue official digital concert passes with full audit control and instant cash accounting.`;
    }

    // 16. Fallback Search in FAQ Dataset
    const matchFaq = FAQ_DATA.find(f => 
      f.question.toLowerCase().includes(q) || 
      f.keywords.some(k => q.includes(k.toLowerCase()))
    );

    if (matchFaq) {
      return `💡 **${matchFaq.question}**\n\n${matchFaq.answer}\n\n*Category: ${matchFaq.categoryLabel}*`;
    }

    // Default Fallback
    return `✨ **I'm here to help! Ask me anything about:**\n\n• 🎟️ **Ticket Delivery:** How passes reach BookMyShow or District accounts\n• 💰 **Deposit Deadlines:** 10-day pre-event cutoff, Bank/UPI methods, interim caps\n• 🏆 **Promoter Tiers:** Silver, Gold, Platinum commission rates and reset rules\n• 🔄 **Cancellations & Refunds:** Platform refunds vs promoter cash returns\n• 🛡️ **DigiLocker & Disputes:** Identity verification and source of truth records\n• 🎸 **Artist Songs & Info:** Anyma, Fred again.., Guns N' Roses, Chainsmokers, Khalid\n\n📞 *Or WhatsApp our team directly at +91 78921 45475.*`;
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
    }, 250);
  };

  const QUICK_QUESTIONS = [
    { label: "🎟️ BMS / District Delivery", query: "How are tickets delivered to the buyer?" },
    { label: "⚠️ Missed Deadline Rules", query: "What happens if I miss my cash deposit deadline?" },
    { label: "💳 Deposit Methods (Bank/UPI)", query: "How do I actually deposit the cash I've collected?" },
    { label: "🔄 Event Cancellations & Refunds", query: "What happens if an event is cancelled?" },
    { label: "🛡️ DigiLocker & Disputes", query: "Why do I need to verify with DigiLocker?" },
    { label: "📈 Move Up Commission Tiers", query: "How do I move up a tier and get a better commission rate?" },
    { label: "🎪 How Tixora Gets Tickets", query: "How does Tixora get tickets to sell?" },
    { label: "🎵 Fred again.. top songs", query: "Top songs of Fred again.." },
    { label: "🌌 Anyma tracklist", query: "Anyma top songs and tour info" },
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
          maxWidth: '420px',
          height: '560px',
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
              <img
                src="/tixora-logo.png"
                alt="Tixora AI"
                style={{
                  height: '28px',
                  width: 'auto',
                  borderRadius: '5px',
                  display: 'block'
                }}
              />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                  Tixora AI Assistant
                </div>
                <div className="flex items-center gap-1.5" style={{ fontSize: '0.68rem', color: '#10b981' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  <span>FAQs • Policies • Delivery • Artists</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
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
                  <span>Full FAQs</span>
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
              placeholder="Ask about BookMyShow delivery, 10-day rules, refunds..."
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
