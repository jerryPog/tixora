// Verified published Indian concert ticket MRPs (2026) with official promotional assets

export const INITIAL_EVENTS = [
  {
    id: "evt-gnr-blr",
    name: "Guns N' Roses — Bengaluru",
    artist: "Guns N' Roses",
    date: "14 Nov 2026, 4:00 PM",
    venue: "NICE Grounds, Bengaluru",
    city: "Bengaluru",
    status: "active",
    posterUrl: "/posters/guns-n-roses-india-poster.jpg",
    bannerUrl: "/posters/guns-n-roses-banner.webp",
    posterPosition: "center 25%",
    description: "The American hard-rock legends Axl Rose, Slash & Duff McKagan live in Bengaluru with iconic hits like Sweet Child O' Mine and November Rain.",
    priceList: [
      { id: "p1", category: "Silver (Phase 1)", faceValue: 4000, promoterPrice: 4000, commissionPct: 7.5, commissionAmount: 300, quotaTotal: 100, quotaSold: 42 },
      { id: "p2", category: "Gold (Phase 1)", faceValue: 9000, promoterPrice: 9000, commissionPct: 8.0, commissionAmount: 720, quotaTotal: 50, quotaSold: 28 },
      { id: "p3", category: "Platinum Lounge (Phase 1)", faceValue: 16000, promoterPrice: 16000, commissionPct: 9.0, commissionAmount: 1440, quotaTotal: 20, quotaSold: 11 }
    ]
  },
  {
    id: "evt-anyma-mum",
    name: "Anyma presents ÆDEN — Mumbai",
    artist: "Anyma (Matteo Milleri)",
    date: "21 Nov 2026, 4:00 PM",
    venue: "Mahalaxmi Racecourse, Mumbai",
    city: "Mumbai",
    status: "active",
    posterUrl: "/posters/anyma-aeden-poster-1.jpg",
    bannerUrl: "/posters/anyma-aeden-poster-2.jpg",
    posterPosition: "center 20%",
    description: "Matteo Milleri's groundbreaking melodic-techno and audiovisual immersive production combining cinematic visuals and futuristic themes.",
    priceList: [
      { id: "p4", category: "GA Back", faceValue: 4250, promoterPrice: 4250, commissionPct: 7.5, commissionAmount: 318, quotaTotal: 150, quotaSold: 94 },
      { id: "p5", category: "GA Front", faceValue: 8000, promoterPrice: 8000, commissionPct: 8.5, commissionAmount: 680, quotaTotal: 80, quotaSold: 61 },
      { id: "p6", category: "Early Bird Backstage", faceValue: 17500, promoterPrice: 17500, commissionPct: 9.0, commissionAmount: 1575, quotaTotal: 30, quotaSold: 24 },
      { id: "p7", category: "VIP Lounge", faceValue: 32000, promoterPrice: 32000, commissionPct: 10.0, commissionAmount: 3200, quotaTotal: 15, quotaSold: 9 }
    ]
  },
  {
    id: "evt-fred-del",
    name: "Fred again.. — Delhi NCR",
    artist: "Fred again..",
    date: "05 Dec 2026, 3:00 PM",
    venue: "Leisure Valley Ground, Gurugram",
    city: "Delhi NCR",
    status: "active",
    posterUrl: "/posters/fred-again-india-poster-1.png",
    bannerUrl: "/posters/fred-again-india-poster-2.png",
    posterPosition: "center 18%",
    description: "British electronic producer and live performer bringing emotionally raw, high-energy live sampling and beats from Actual Life to USB.",
    priceList: [
      { id: "p8", category: "Student Pass (Verified)", faceValue: 1750, promoterPrice: 1750, commissionPct: 8.0, commissionAmount: 140, quotaTotal: 250, quotaSold: 180 },
      { id: "p9", category: "General Admission (GA)", faceValue: 3500, promoterPrice: 3500, commissionPct: 8.5, commissionAmount: 297, quotaTotal: 200, quotaSold: 145 }
    ]
  },
  {
    id: "evt-fred-mum",
    name: "Fred again.. — Mumbai",
    artist: "Fred again..",
    date: "08–09 Dec 2026, 3:00 PM",
    venue: "Mahalaxmi Racecourse, Mumbai",
    city: "Mumbai",
    status: "active",
    posterUrl: "/posters/fred-again-india-poster-2.png",
    bannerUrl: "/posters/fred-again-india-poster-1.png",
    posterPosition: "center 18%",
    description: "Two consecutive nights of unmatched electronic music magic under the Mumbai skyline.",
    priceList: [
      { id: "p10", category: "Student Pass (Verified)", faceValue: 1750, promoterPrice: 1750, commissionPct: 8.0, commissionAmount: 140, quotaTotal: 300, quotaSold: 210 },
      { id: "p11", category: "General Admission (GA)", faceValue: 3500, promoterPrice: 3500, commissionPct: 8.5, commissionAmount: 297, quotaTotal: 250, quotaSold: 160 }
    ]
  },
  {
    id: "evt-chainsmokers-blr",
    name: "The Chainsmokers — Sunburn Arena Bengaluru",
    artist: "The Chainsmokers",
    date: "20 Dec 2026, 4:00 PM",
    venue: "NICE Grounds, Bengaluru",
    city: "Bengaluru",
    status: "active",
    posterUrl: "/posters/chainsmokers-bengaluru-banner.jpg",
    bannerUrl: "/posters/chainsmokers-india-banner.jpg",
    posterPosition: "center 20%",
    description: "Grammy-winning electronic duo Andrew Taggart and Alex Pall performing Closer, Paris, Something Just Like This and explosive new drops.",
    priceList: [
      { id: "p12", category: "Early Bird GA", faceValue: 1500, promoterPrice: 1500, commissionPct: 7.0, commissionAmount: 105, quotaTotal: 120, quotaSold: 120 },
      { id: "p13", category: "GA Phase 1", faceValue: 2000, promoterPrice: 2000, commissionPct: 7.5, commissionAmount: 150, quotaTotal: 150, quotaSold: 88 },
      { id: "p14", category: "VIP Phase 1", faceValue: 3000, promoterPrice: 3000, commissionPct: 8.0, commissionAmount: 240, quotaTotal: 100, quotaSold: 64 },
      { id: "p15", category: "Fanpit Phase 1", faceValue: 6000, promoterPrice: 6000, commissionPct: 8.5, commissionAmount: 510, quotaTotal: 50, quotaSold: 32 },
      { id: "p16", category: "Tuborg Lounge", faceValue: 12999, promoterPrice: 12999, commissionPct: 10.0, commissionAmount: 1300, quotaTotal: 25, quotaSold: 14 }
    ]
  },
  {
    id: "evt-khalid-del",
    name: "Khalid — Delhi NCR",
    artist: "Khalid",
    date: "13 Dec 2026, 6:00 PM",
    venue: "HUDA Gymkhana Club, Gurugram",
    city: "Delhi NCR",
    status: "upcoming",
    posterUrl: "/posters/khalid-india-banner.jpg",
    bannerUrl: "/posters/khalid-india-banner.jpg",
    posterPosition: "center 25%",
    description: "Multi-platinum R&B/pop superstar Khalid bringing the soulful warmth of Location, Young Dumb & Broke, and Talk to Delhi NCR.",
    priceList: [
      { id: "p17", category: "General Access", faceValue: 2549, promoterPrice: 2549, commissionPct: 7.5, commissionAmount: 191, quotaTotal: 100, quotaSold: 25 },
      { id: "p18", category: "General Access+", faceValue: 3549, promoterPrice: 3549, commissionPct: 8.0, commissionAmount: 284, quotaTotal: 80, quotaSold: 19 },
      { id: "p19", category: "Phase 1 Fanpit", faceValue: 6999, promoterPrice: 6999, commissionPct: 8.5, commissionAmount: 595, quotaTotal: 40, quotaSold: 12 }
    ]
  }
];

export const INITIAL_PROMOTERS = [
  {
    id: "prom-1",
    name: "Aarav Sharma",
    phone: "+91 98112 34567",
    email: "aarav.sharma@du.ac.in",
    college: "Hansraj College, Delhi University",
    city: "Delhi NCR",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    digiLockerVerified: true,
    tier: "Silver",
    ticketsSold: 32,
    nextTierTarget: 50,
    totalRevenueGenerated: 64750,
    totalCommissionEarned: 6840,
    status: "Active",
    assignedEvents: ["evt-fred-del", "evt-khalid-del", "evt-chainsmokers-blr"],
    joinedDate: "15 Aug 2026"
  },
  {
    id: "prom-2",
    name: "Riya Sen",
    phone: "+91 98201 88765",
    email: "riya.sen@xaviers.edu",
    college: "St. Xavier's College, Mumbai",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    digiLockerVerified: true,
    tier: "Gold",
    ticketsSold: 78,
    nextTierTarget: 150,
    totalRevenueGenerated: 215000,
    totalCommissionEarned: 24500,
    status: "Active",
    assignedEvents: ["evt-anyma-mum", "evt-fred-mum"],
    joinedDate: "02 Jul 2026"
  },
  {
    id: "prom-3",
    name: "Vikram Reddy",
    phone: "+91 97405 12349",
    email: "vikram.r@rvce.edu.in",
    college: "RV College of Engineering, Bengaluru",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    digiLockerVerified: true,
    tier: "Platinum",
    ticketsSold: 184,
    nextTierTarget: 300,
    totalRevenueGenerated: 610000,
    totalCommissionEarned: 74200,
    status: "Active",
    assignedEvents: ["evt-gnr-blr", "evt-chainsmokers-blr"],
    joinedDate: "10 May 2026"
  },
  {
    id: "prom-4",
    name: "Kabir Mehra",
    phone: "+91 98710 54321",
    email: "kabir.m@nmims.edu",
    college: "NMIMS, Mumbai",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    digiLockerVerified: true,
    tier: "Silver",
    ticketsSold: 18,
    nextTierTarget: 50,
    totalRevenueGenerated: 48000,
    totalCommissionEarned: 3950,
    status: "Active",
    assignedEvents: ["evt-anyma-mum"],
    joinedDate: "20 Aug 2026"
  }
];

export const INITIAL_SALES = [
  {
    id: "sal-101",
    ticketCode: "TXR-FRED-4819",
    promoterId: "prom-1",
    promoterName: "Aarav Sharma",
    eventId: "evt-fred-del",
    eventName: "Fred again.. — Delhi NCR",
    ticketCategory: "Student Pass (Verified)",
    quantity: 2,
    unitPrice: 1750,
    totalAmount: 3500,
    commissionEarned: 280,
    paymentMethod: "UPI Direct",
    paymentStatus: "Paid & Verified",
    deliveryStatus: "Delivered to BookMyShow",
    buyerName: "Rohan Varma",
    buyerPhone: "+91 99100 87654",
    issuedAt: "2026-08-28 16:30"
  },
  {
    id: "sal-102",
    ticketCode: "TXR-FRED-9021",
    promoterId: "prom-1",
    promoterName: "Aarav Sharma",
    eventId: "evt-fred-del",
    eventName: "Fred again.. — Delhi NCR",
    ticketCategory: "General Admission (GA)",
    quantity: 4,
    unitPrice: 3500,
    totalAmount: 14000,
    commissionEarned: 1188,
    paymentMethod: "Card (Debit / Credit)",
    paymentStatus: "Paid & Verified",
    deliveryStatus: "Delivered to BookMyShow",
    buyerName: "Mehul Sen",
    buyerPhone: "+91 98101 23456",
    issuedAt: "2026-08-29 11:15"
  },
  {
    id: "sal-103",
    ticketCode: "TXR-ANYMA-1120",
    promoterId: "prom-2",
    promoterName: "Riya Sen",
    eventId: "evt-anyma-mum",
    eventName: "Anyma presents ÆDEN — Mumbai",
    ticketCategory: "GA Front",
    quantity: 2,
    unitPrice: 8000,
    totalAmount: 16000,
    commissionEarned: 1360,
    paymentMethod: "UPI Direct",
    paymentStatus: "Paid & Verified",
    deliveryStatus: "Delivered to District",
    buyerName: "Tanvi Saxena",
    buyerPhone: "+91 98202 33445",
    issuedAt: "2026-08-25 19:40"
  },
  {
    id: "sal-104",
    ticketCode: "TXR-GNR-8871",
    promoterId: "prom-3",
    promoterName: "Vikram Reddy",
    eventId: "evt-gnr-blr",
    eventName: "Guns N' Roses — Bengaluru",
    ticketCategory: "Gold (Phase 1)",
    quantity: 3,
    unitPrice: 9000,
    totalAmount: 27000,
    commissionEarned: 2160,
    paymentMethod: "Bank Transfer (IMPS/NEFT)",
    paymentStatus: "Paid & Verified",
    deliveryStatus: "Delivered to BookMyShow",
    buyerName: "Devansh Nair",
    buyerPhone: "+91 98450 67890",
    issuedAt: "2026-08-22 14:00"
  }
];

export const COMMISSION_TIERS = [
  {
    tier: "Silver",
    ticketRange: "10 – 50 tickets",
    commissionRange: "5.0% – 8.5%",
    perks: ["Digital Campus Promoter ID", "Instant Upfront Card / UPI / Bank Issuance", "WhatsApp Promoter Group Access", "Direct BookMyShow & District Delivery"],
    color: "#a1a1aa",
    accent: "#e4e4e7",
    bgGradient: "linear-gradient(180deg, rgba(39, 39, 42, 0.4) 0%, rgba(24, 24, 27, 0.6) 100%)",
    border: "rgba(255, 255, 255, 0.1)"
  },
  {
    tier: "Gold",
    ticketRange: "51 – 150 tickets",
    commissionRange: "9.0% – 12.0%",
    perks: ["Priority Artist Guestlist Access", "Early Access to Phase 1 allocations", "Instant Automated Verification Clearance", "Dedicated Festival Ops Manager"],
    color: "#f59e0b",
    accent: "#fbbf24",
    bgGradient: "linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, rgba(24, 24, 27, 0.6) 100%)",
    border: "rgba(245, 158, 11, 0.25)"
  },
  {
    tier: "Platinum",
    ticketRange: "151+ tickets",
    commissionRange: "13.0% – 16.0%",
    perks: ["Highest Commission Tier (up to 16%)", "All-Access Backstage / Artist Lounge Pass", "Direct Event Organizer Partner Share", "End-of-Tour Cash Bonus"],
    color: "#ec4899",
    accent: "#f472b6",
    bgGradient: "linear-gradient(180deg, rgba(236, 72, 153, 0.08) 0%, rgba(24, 24, 27, 0.6) 100%)",
    border: "rgba(236, 72, 153, 0.25)"
  }
];
