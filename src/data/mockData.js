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
    artistImageUrl: "/artists/guns-n-roses.jpg",
    posterUrl: "/posters/guns-n-roses-india-poster.jpg",
    bannerUrl: "/posters/guns-n-roses-banner.webp",
    posterPosition: "center center",
    description: "The American hard-rock legends Axl Rose, Slash & Duff McKagan live in Bengaluru with iconic hits like Sweet Child O' Mine and November Rain.",
    venueLayout: {
      type: "guns-n-roses",
      title: "GUNS N' ROSES — VENUE LAYOUT",
      subtitle: "NICE Grounds, Bengaluru • 14 November 2026",
      image: "/layouts/guns-n-roses-layout.png",
      sections: [
        { name: "STAGE", type: "stage", color: "#9ca3af", textColor: "#000000" },
        { 
          name: "VIP", 
          type: "vip", 
          price: "FROM ₹10,999", 
          color: "#b91c1c", 
          textColor: "#ffffff",
          perks: [
            "Each ticket grants entry to one person in the VIP area",
            "Front of house viewing space",
            "Access to food stalls, bars and washrooms in the VIP area",
            "Dedicated entry lane to the concert"
          ]
        },
        { 
          name: "KOTAK LOUNGE & PLATINUM LOUNGE", 
          type: "lounge", 
          price: "FROM ₹28,999", 
          color: "#000000", 
          textColor: "#ffffff",
          perks: [
            "Each ticket grants entry to one person in the Kotak Lounge/Platinum Lounge",
            "Elevated premium viewing deck in a prime location",
            "Inclusive of appetizers and alco-beverages in the Kotak Lounge/Platinum Lounge",
            "Dedicated washrooms",
            "Dedicated entry lane to the concert",
            "Dedicated free parking* with pick-up and drop-off service from the wooden gate (*Available on first arrival basis only)"
          ]
        },
        { 
          name: "GENERAL ADMISSION", 
          type: "ga", 
          price: "FROM ₹4,499", 
          color: "#facc15", 
          textColor: "#000000",
          perks: [
            "Each ticket grants entry to one person in the GA area",
            "Access to food stalls, bars and washrooms in the GA area"
          ]
        }
      ],
      footerNote: "*This layout is not drawn to scale & is subject to change without prior notice.*"
    },
    priceList: [
      { id: "p1", category: "General Admission (GA)", faceValue: 4499, promoterPrice: 4499, commissionPct: 7.5, commissionAmount: 337, quotaTotal: 120, quotaSold: 58 },
      { id: "p2", category: "VIP Pass", faceValue: 10999, promoterPrice: 10999, commissionPct: 8.5, commissionAmount: 935, quotaTotal: 50, quotaSold: 31 },
      { id: "p3", category: "Kotak / Platinum Lounge", faceValue: 28999, promoterPrice: 28999, commissionPct: 10.0, commissionAmount: 2900, quotaTotal: 20, quotaSold: 12 }
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
    artistImageUrl: "/artists/anyma.jpg",
    posterUrl: "/posters/anyma-aeden-poster-1.jpg",
    bannerUrl: "/posters/anyma-aeden-poster-2.jpg",
    posterPosition: "center center",
    description: "Matteo Milleri's groundbreaking melodic-techno and audiovisual immersive production combining cinematic visuals and futuristic themes.",
    venueLayout: {
      type: "anyma",
      title: "ANYMA presents AEDEN - Mumbai",
      subtitle: "Mahalaxmi Racecourse, Mumbai • 21 November 2026",
      sections: [
        { name: "STAGE", type: "stage" },
        { name: "GA FRONT", type: "ga-front", price: "₹8,000" },
        { name: "GA BACK", type: "ga-back", price: "₹4,250" },
        { name: "VVIP EXPERIENCE", type: "vvip", price: "₹17,500+" },
        { name: "LOUNGE", type: "lounge", price: "₹32,000" }
      ],
      footerNote: "CO-PRESENTED BY RuPay | PRODUCED & PROMOTED BY sunburn / LIVE NATION"
    },
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
    artistImageUrl: "/artists/fred-again.jpg",
    posterUrl: "/posters/fred-again-india-poster-1.png",
    bannerUrl: "/posters/fred-again-india-poster-2.png",
    posterPosition: "center center",
    description: "British electronic producer and live performer bringing emotionally raw, high-energy live sampling and beats from Actual Life to USB.",
    venueLayout: {
      type: "fred-again",
      title: "again.. फिर से.. पुन्हा.. ಮತ್ತೆ..",
      subtitle: "Fred again.. India Tour 2026 - Delhi NCR",
      image: "/layouts/fred-again-layout.png",
      tourDates: [
        { date: "05 Dec 2026", venue: "Leisure Valley Ground", city: "Delhi NCR" },
        { date: "08 Dec 2026", venue: "Mahalaxmi Race Course", city: "Mumbai" },
        { date: "09 Dec 2026", venue: "Mahalaxmi Race Course", city: "Mumbai" },
        { date: "12 Dec 2026", venue: "NICE Grounds", city: "Bengaluru" },
        { date: "13 Dec 2026", venue: "NICE Grounds", city: "Bengaluru" }
      ],
      sections: [
        { name: "STAGE", type: "stage", color: "#000000", textColor: "#ffffff" },
        { name: "GA", type: "ga", color: "#000000", textColor: "#ffffff" }
      ],
      categories: [
        {
          name: "STUDENT GA",
          price: "₹1,750",
          perks: [
            "Entry into the common GA area",
            "A valid student ID card picture must be submitted",
            "Dedicated entry lane",
            "Students will be checked for ID at the gate",
            "Ticket holders without a valid student ID shall be denied entry",
            "Please read all student ticket guidelines on the ticketing page"
          ]
        },
        {
          name: "GA",
          price: "₹3,500",
          perks: [
            "Entry into the common GA area",
            "Access to food stalls, bars and washrooms"
          ]
        },
        {
          name: "GA+",
          price: "₹6,000",
          perks: [
            "Entry into the common GA area",
            "Access to dedicated food stalls, bars & washrooms",
            "Dedicated entry lane for smooth access",
            "Early access into venue (Gate timings closer to show day)"
          ]
        }
      ],
      footerNote: "*This layout is not drawn to scale & is subject to change without prior notice.*"
    },
    priceList: [
      { id: "p8", category: "Student GA (Verified)", faceValue: 1750, promoterPrice: 1750, commissionPct: 8.0, commissionAmount: 140, quotaTotal: 250, quotaSold: 180 },
      { id: "p9", category: "General Admission (GA)", faceValue: 3500, promoterPrice: 3500, commissionPct: 8.5, commissionAmount: 297, quotaTotal: 200, quotaSold: 145 },
      { id: "p9b", category: "GA+ (Early Access & Dedicated Bars)", faceValue: 6000, promoterPrice: 6000, commissionPct: 9.0, commissionAmount: 540, quotaTotal: 80, quotaSold: 46 }
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
    artistImageUrl: "/artists/fred-again.jpg",
    posterUrl: "/posters/fred-again-india-poster-2.png",
    bannerUrl: "/posters/fred-again-india-poster-1.png",
    posterPosition: "center center",
    description: "Two consecutive nights of unmatched electronic music magic under the Mumbai skyline.",
    venueLayout: {
      type: "fred-again",
      title: "again.. फिर से.. पुन्हा.. ಮತ್ತೆ..",
      subtitle: "Fred again.. India Tour 2026 - Mumbai",
      image: "/layouts/fred-again-layout.png",
      tourDates: [
        { date: "05 Dec 2026", venue: "Leisure Valley Ground", city: "Delhi NCR" },
        { date: "08 Dec 2026", venue: "Mahalaxmi Race Course", city: "Mumbai" },
        { date: "09 Dec 2026", venue: "Mahalaxmi Race Course", city: "Mumbai" },
        { date: "12 Dec 2026", venue: "NICE Grounds", city: "Bengaluru" },
        { date: "13 Dec 2026", venue: "NICE Grounds", city: "Bengaluru" }
      ],
      sections: [
        { name: "STAGE", type: "stage", color: "#000000", textColor: "#ffffff" },
        { name: "GA", type: "ga", color: "#000000", textColor: "#ffffff" }
      ],
      categories: [
        {
          name: "STUDENT GA",
          price: "₹1,750",
          perks: [
            "Entry into the common GA area",
            "A valid student ID card picture must be submitted",
            "Dedicated entry lane",
            "Students will be checked for ID at the gate",
            "Ticket holders without a valid student ID shall be denied entry",
            "Please read all student ticket guidelines on the ticketing page"
          ]
        },
        {
          name: "GA",
          price: "₹3,500",
          perks: [
            "Entry into the common GA area",
            "Access to food stalls, bars and washrooms"
          ]
        },
        {
          name: "GA+",
          price: "₹6,000",
          perks: [
            "Entry into the common GA area",
            "Access to dedicated food stalls, bars & washrooms",
            "Dedicated entry lane for smooth access",
            "Early access into venue (Gate timings closer to show day)"
          ]
        }
      ],
      footerNote: "*This layout is not drawn to scale & is subject to change without prior notice.*"
    },
    priceList: [
      { id: "p10", category: "Student GA (Verified)", faceValue: 1750, promoterPrice: 1750, commissionPct: 8.0, commissionAmount: 140, quotaTotal: 300, quotaSold: 210 },
      { id: "p11", category: "General Admission (GA)", faceValue: 3500, promoterPrice: 3500, commissionPct: 8.5, commissionAmount: 297, quotaTotal: 250, quotaSold: 160 },
      { id: "p11b", category: "GA+ (Early Access & Dedicated Bars)", faceValue: 6000, promoterPrice: 6000, commissionPct: 9.0, commissionAmount: 540, quotaTotal: 100, quotaSold: 62 }
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
    artistImageUrl: "/artists/chainsmokers.jpg",
    posterUrl: "/posters/chainsmokers-bengaluru-banner.jpg",
    bannerUrl: "/posters/chainsmokers-india-banner.jpg",
    posterPosition: "center center",
    description: "Grammy-winning electronic duo Andrew Taggart and Alex Pall performing Closer, Paris, Something Just Like This and explosive new drops.",
    venueLayout: {
      type: "chainsmokers",
      title: "Sunburn Arena Ft. The Chainsmokers",
      subtitle: "NICE Grounds, Bengaluru • 20 December 2026",
      sections: [
        { name: "STAGE", type: "stage", color: "#ffffff", textColor: "#000000" },
        { name: "FANPIT", type: "fanpit", color: "#eab308", textColor: "#ffffff", price: "₹6,000" },
        { name: "VIP", type: "vip", color: "#ea580c", textColor: "#ffffff", price: "₹2,500 (Early Bird)" },
        { name: "GA", type: "ga", color: "#fed7aa", textColor: "#000000", price: "₹1,500 (Early Bird)" }
      ],
      legend: [
        { label: "EARLY BIRD GA", price: "₹1,500", color: "#3f3f46" },
        { label: "EARLY BIRD VIP", price: "₹2,500", color: "#ea580c" }
      ]
    },
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
    artistImageUrl: "/artists/khalid.jpg",
    posterUrl: "/posters/khalid-india-banner.jpg",
    bannerUrl: "/posters/khalid-india-banner.jpg",
    posterPosition: "center center",
    description: "Multi-platinum R&B/pop superstar Khalid bringing the soulful warmth of Location, Young Dumb & Broke, and Talk to Delhi NCR.",
    venueLayout: {
      type: "khalid",
      title: "KHALID LIVE IN DELHI NCR",
      subtitle: "HUDA Gymkhana Club, Gurugram • 13 December 2026 | 06:00 PM Onwards",
      sections: [
        { name: "STAGE", type: "stage", color: "#3f3f46", textColor: "#ffffff" },
        { name: "FANPIT", type: "section", color: "#fce7f3", borderColor: "#fda4af", textColor: "#831843", price: "₹6,999" },
        { name: "GA (+)", type: "section", color: "#fef3c7", borderColor: "#fde047", textColor: "#78350f", price: "₹3,549" },
        { name: "GA", type: "section", color: "#dcfce7", borderColor: "#86efac", textColor: "#14532d", price: "₹2,549" }
      ],
      note: "Standing Section/s"
    },
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
    referralCode: "AARAV-DU",
    referralEarnings: 1500,
    referredCount: 4,
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
    referralCode: "RIYA-MUM",
    referralEarnings: 3000,
    referredCount: 7,
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
    referralCode: "VIKRAM-BLR",
    referralEarnings: 6500,
    referredCount: 14,
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
    referralCode: "KABIR-NMIMS",
    referralEarnings: 500,
    referredCount: 2,
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

export const INITIAL_REWARDS = [
  {
    id: "rew-1",
    title: "2x Free GA Concert Passes",
    event: "The Chainsmokers — Sunburn Arena Bengaluru",
    category: "ticket",
    targetSales: 25,
    rewardValue: "₹4,000 Value",
    description: "Sell 25 total passes to earn 2 complimentary General Admission tickets to The Chainsmokers Bengaluru.",
    voucherCode: "FREE-CHAIN-TXR92",
    badge: "Free Tickets",
    icon: "Ticket"
  },
  {
    id: "rew-2",
    title: "₹1,500 Official Tour Merch Coupon",
    event: "All 2026 Concerts & Tours",
    category: "coupon",
    targetSales: 15,
    rewardValue: "₹1,500 Coupon",
    description: "Valid for official artist hoodies, tees, and caps at venue merchandise stalls.",
    voucherCode: "MERCH-TXR-1500",
    badge: "Merch Coupon",
    icon: "ShoppingBag"
  },
  {
    id: "rew-3",
    title: "1x VIP Fanpit / Front Row Pass",
    event: "Anyma presents ÆDEN — Mumbai",
    category: "ticket",
    targetSales: 50,
    rewardValue: "₹8,000 Value",
    description: "Reach 50 passes sold to claim 1 exclusive VIP Front Stage pass with expedited gate entry.",
    voucherCode: "VIP-ANYMA-PASS88",
    badge: "VIP Ticket",
    icon: "Sparkles"
  },
  {
    id: "rew-4",
    title: "₹2,500 Festival Food & Drink Voucher",
    event: "Fred again.. & Guns N' Roses Venues",
    category: "coupon",
    targetSales: 40,
    rewardValue: "₹2,500 F&B Voucher",
    description: "Complimentary food and premium beverage credits redeemable via digital venue wristband.",
    voucherCode: "FEAST-TXR-2500",
    badge: "F&B Voucher",
    icon: "Utensils"
  },
  {
    id: "rew-5",
    title: "2x All-Access Backstage Pass",
    event: "Guns N' Roses — Bengaluru Tour",
    category: "ticket",
    targetSales: 100,
    rewardValue: "₹32,000 Value",
    description: "Top promoter tier milestone: Complete backstage tour, artist lounge credentials, and soundcheck access.",
    voucherCode: "BACKSTAGE-GNR-XX1",
    badge: "All-Access VIP",
    icon: "Crown"
  },
  {
    id: "rew-6",
    title: "₹5,000 Direct Tour Cash Stipend",
    event: "All Venues & Cities",
    category: "cash",
    targetSales: 150,
    rewardValue: "₹5,000 Direct Cash",
    description: "Paid directly to your bank account / UPI for exceptional campus network performance.",
    voucherCode: "CASH-BONUS-5000",
    badge: "Cash Reward",
    icon: "Banknote"
  }
];

export const INITIAL_REFERRALS = [
  {
    id: "ref-1",
    referrerId: "prom-1",
    referredName: "Ananya Iyer",
    referredCollege: "SRCC, Delhi University",
    referredPhone: "+91 98111 87654",
    passesSold: 8,
    status: "Completed (₹500 Earned)",
    rewardAmount: 500,
    joinedDate: "18 Aug 2026"
  },
  {
    id: "ref-2",
    referrerId: "prom-1",
    referredName: "Devansh Batra",
    referredCollege: "Hindu College, DU",
    referredPhone: "+91 98102 33441",
    passesSold: 6,
    status: "Completed (₹500 Earned)",
    rewardAmount: 500,
    joinedDate: "21 Aug 2026"
  },
  {
    id: "ref-3",
    referrerId: "prom-1",
    referredName: "Kritika Sethi",
    referredCollege: "Lady Shri Ram College (LSR), Delhi",
    referredPhone: "+91 99109 44556",
    passesSold: 5,
    status: "Completed (₹500 Earned)",
    rewardAmount: 500,
    joinedDate: "24 Aug 2026"
  },
  {
    id: "ref-4",
    referrerId: "prom-1",
    referredName: "Aditya Nair",
    referredCollege: "IIT Delhi",
    referredPhone: "+91 98711 66778",
    passesSold: 2,
    status: "In Progress (2/5 passes)",
    rewardAmount: 0,
    joinedDate: "28 Aug 2026"
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

export const INITIAL_TICKETS = [
  {
    id: "TIX-1082",
    ticketNumber: "#TIX-1082",
    category: "Booking / Refund",
    categoryKey: "refund",
    subject: "Refund stuck for Phase 1 Guns N' Roses transaction",
    description: "A customer transferred ₹8,000 for 2x Silver passes but the transaction failed at the payment gateway while debiting the bank. Need refund confirmation to update buyer.",
    status: "Awaiting Reply", // "Open" | "In Progress" | "Awaiting Reply" | "Escalated" | "Resolved"
    priority: "High",
    promoterId: "prom-1",
    promoterName: "Rahul Sharma",
    college: "St. Stephen's College, DU",
    createdAt: "29 Aug 2026, 02:40 PM",
    updatedAt: "2 hours ago",
    orderId: "ORD-94812",
    messages: [
      {
        id: "msg-1",
        sender: "promoter",
        senderName: "Rahul Sharma",
        text: "A customer transferred ₹8,000 for 2x Silver passes but the transaction failed at the payment gateway while debiting the bank. Need refund confirmation to update buyer.",
        timestamp: "29 Aug 2026, 02:40 PM"
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "Tixora Ops (Prajwal H S)",
        text: "Hi Rahul, our banking gateway has flagged the transaction as pending clearance. We have initiated an auto-reversal to the source account (UTR: 5291048821). It will reflect within 24-48 hours.",
        timestamp: "29 Aug 2026, 04:15 PM"
      }
    ]
  },
  {
    id: "TIX-1049",
    ticketNumber: "#TIX-1049",
    category: "Partner Discount",
    categoryKey: "discount",
    subject: "Partner discount not received on 10x Fred again passes",
    description: "Group booking promo code 'CAMPUSBEAT10' did not deduct the 10% partner discount during ticket issuance for Fred again Delhi show.",
    status: "In Progress",
    priority: "Medium",
    promoterId: "prom-1",
    promoterName: "Rahul Sharma",
    college: "St. Stephen's College, DU",
    createdAt: "28 Aug 2026, 11:20 AM",
    updatedAt: "Yesterday",
    orderId: "ORD-88319",
    messages: [
      {
        id: "msg-1",
        sender: "promoter",
        senderName: "Rahul Sharma",
        text: "Group booking promo code 'CAMPUSBEAT10' did not deduct the 10% partner discount during ticket issuance for Fred again Delhi show.",
        timestamp: "28 Aug 2026, 11:20 AM"
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "Tixora Support (Ronak Jain R)",
        text: "We are reviewing the promoter discount ledger. A manual commission adjustment of ₹1,750 is queued for your next payout cycle.",
        timestamp: "28 Aug 2026, 01:05 PM"
      }
    ]
  },
  {
    id: "TIX-1015",
    ticketNumber: "#TIX-1015",
    category: "Inventory",
    categoryKey: "inventory",
    subject: "Inventory quota exhausted for Anyma Mumbai VIP Fanpit",
    description: "Need additional allocation of 5 VIP Fanpit tickets for college dance society members attending Anyma Mumbai on Nov 21.",
    status: "Resolved",
    priority: "High",
    promoterId: "prom-1",
    promoterName: "Rahul Sharma",
    college: "St. Stephen's College, DU",
    createdAt: "25 Aug 2026, 05:10 PM",
    updatedAt: "2 days ago",
    orderId: "REQ-44019",
    messages: [
      {
        id: "msg-1",
        sender: "promoter",
        senderName: "Rahul Sharma",
        text: "Need additional allocation of 5 VIP Fanpit tickets for college dance society members attending Anyma Mumbai on Nov 21.",
        timestamp: "25 Aug 2026, 05:10 PM"
      },
      {
        id: "msg-2",
        sender: "support",
        senderName: "Tixora Ticketing Desk",
        text: "Allocated 5 additional VIP passes to your promoter quota from Phase 2 reserve. You can now issue them from your dashboard.",
        timestamp: "25 Aug 2026, 06:30 PM"
      }
    ]
  }
];
