import { useEffect } from 'react';

const PAGE_METADATA = {
  posters: {
    title: "Tixora — Live The Hype | Official Youth Concert Tickets & Promoter Portal",
    description: "Discover verified 2026 Indian concert passes including Guns N' Roses, Anyma ÆDEN, Fred again.., and The Chainsmokers. 100% DigiLocker-verified promoters & instant QR issuance.",
    canonical: "https://tixora.in/#events",
    ogType: "website"
  },
  waitlist: {
    title: "Join the Tixora Campus Ambassador Waitlist | Earn Top Commissions & VIP Access",
    description: "Apply to become a verified Tixora campus promoter at your university. Earn 7.5%–10% commission per ticket, unlock artist backstage passes, and build campus leadership.",
    canonical: "https://tixora.in/#waitlist",
    ogType: "article"
  },
  prices: {
    title: "Live Concert Price Lists & Commission Calculator | Tixora India",
    description: "Explore official MRP ticket tiers, promoter commissions, face values, and profit cuts across Sunburn, Fred again.., Anyma, and Khalid India tours.",
    canonical: "https://tixora.in/#prices",
    ogType: "website"
  },
  ledger: {
    title: "My Sales Ledger & Earnings Dashboard | Tixora Promoter Portal",
    description: "Track real-time ticket sales, verified buyer delivery statuses, direct UPI/Bank payouts, and tier progression on the official Tixora platform.",
    canonical: "https://tixora.in/#ledger",
    ogType: "website"
  },
  rewards: {
    title: "Promoter Rewards, Referral Program & VIP Perks | Tixora",
    description: "Share your promoter referral code to earn ₹500 bonuses per active recruit plus backstage artist passes, festival wristbands, and gear.",
    canonical: "https://tixora.in/#rewards",
    ogType: "website"
  },
  tiers: {
    title: "Commission Tiers & Promoter Privileges | Tixora India",
    description: "Climb from Bronze to Diamond promoter tier to unlock up to 10% instant commission cuts, direct artist meet-and-greets, and festival hospitality.",
    canonical: "https://tixora.in/#tiers",
    ogType: "website"
  },
  reviews: {
    title: "Verified Student Promoter Reviews & Testimonials | Tixora",
    description: "Read real reviews from student promoters across Delhi University, St. Xavier's Mumbai, RVCE Bangalore, and NMIMS on their earnings and experiences with Tixora.",
    canonical: "https://tixora.in/#reviews",
    ogType: "website"
  },
  about: {
    title: "About Tixora — Board of Directors & Leadership | Live The Hype",
    description: "Learn about Tixora's mission to democratize youth concert ticketing in India through DigiLocker verification, anti-scalping technology, and fair promoter revenue shares.",
    canonical: "https://tixora.in/#about",
    ogType: "article"
  },
  tickets: {
    title: "Support Tickets & Issue Resolution Desk | Tixora",
    description: "Raise issues, track support ticket replies, request booking refunds, verify partner discounts, and escalate urgent concert pass queries directly to Tixora leadership.",
    canonical: "https://tixora.in/#tickets",
    ogType: "website"
  },
  contact: {
    title: "Contact Tixora Support & Helpline (+91 78921 45475) | 24/7 Promoter Care",
    description: "Get in touch with Tixora's dedicated promoter support desk via WhatsApp (+91 78921 45475), email, or our campus representative escalations.",
    canonical: "https://tixora.in/#contact",
    ogType: "website"
  },
  faqs: {
    title: "Frequently Asked Questions & Promoter Policies | Tixora",
    description: "Find instant answers regarding ticket issuance, DigiLocker verification, payout schedules, anti-scalping rules, and refund policies.",
    canonical: "https://tixora.in/#faqs",
    ogType: "website"
  },
  support: {
    title: "Issue Resolution Center | Refunds, Inventory & Ticket Support | Tixora",
    description: "Create and track Tixora support requests for refunds, inventory mismatches, missing QR passes, and ticket issuance problems.",
    canonical: "https://tixora.in/#support",
    ogType: "website"
  },
  'thank-you': {
    title: "Confirmation & Thank You | Tixora — Live The Hype",
    description: "Your ticket order or campus ambassador application has been successfully recorded. Access your digital pass and QR code immediately.",
    canonical: "https://tixora.in/#thank-you",
    ogType: "website"
  },
  '404': {
    title: "404 Page Not Found | Tixora — Live The Hype",
    description: "The requested concert or promoter page was not found. Return to Tixora home or discover trending live music events across India.",
    canonical: "https://tixora.in/404",
    ogType: "website"
  }
};

export const usePageSEO = (viewKey = 'posters', customTitle = null, customDescription = null) => {
  useEffect(() => {
    const meta = PAGE_METADATA[viewKey] || PAGE_METADATA.posters;
    const finalTitle = customTitle || meta.title;
    const finalDescription = customDescription || meta.description;

    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.name = 'description';
      document.head.appendChild(descTag);
    }
    descTag.content = finalDescription;

    // 3. Update Open Graph Tags
    const ogTags = {
      'og:title': finalTitle,
      'og:description': finalDescription,
      'og:url': meta.canonical,
      'og:type': meta.ogType,
      'og:site_name': 'Tixora — Live The Hype',
      'og:image': 'https://tixora.in/tixora-logo.png'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    // 4. Update Twitter Card Tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': finalTitle,
      'twitter:description': finalDescription,
      'twitter:image': 'https://tixora.in/tixora-logo.png'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    // 5. Update Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = meta.canonical;

    // 6. JSON-LD Organization Schema Structured Data
    const schemaId = 'tixora-jsonld-schema';
    let schemaScript = document.getElementById(schemaId);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://tixora.in/#organization",
          "name": "Tixora",
          "alternateName": "Tixora — Live The Hype",
          "url": "https://tixora.in",
          "logo": "https://tixora.in/tixora-logo.png",
          "founders": [
            { "@type": "Person", "name": "Ronak Jain R", "jobTitle": "Founder", "email": "ronakj303@gmail.com", "telephone": "+91-78921-45475" },
            { "@type": "Person", "name": "Prajwal Gowrish H S", "jobTitle": "Co-Founder", "email": "gowrishprajwal123@gmail.com", "telephone": "+91-88612-00170" },
            { "@type": "Person", "name": "Anshul S Balan", "jobTitle": "Co-Founder", "email": "anshulsb70@gmail.com", "telephone": "+91-70125-37541" },
            { "@type": "Person", "name": "Kanishk Jhunjhunwala", "jobTitle": "Co-Founder", "email": "kanishkjhunjhunwala@gmail.com", "telephone": "+91-91045-73147" }
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-78921-45475",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Kannada"]
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://tixora.in/#website",
          "url": "https://tixora.in",
          "name": "Tixora",
          "publisher": { "@id": "https://tixora.in/#organization" }
        }
      ]
    };

    schemaScript.textContent = JSON.stringify(structuredData);

  }, [viewKey, customTitle, customDescription]);
};
