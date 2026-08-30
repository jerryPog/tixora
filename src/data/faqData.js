// Official Tixora FAQ Dataset extracted from official policy guidelines

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: 'HelpCircle' },
  { id: 'promoters', label: 'For Promoters', icon: 'Users' },
  { id: 'delivery', label: 'Ticket Delivery', icon: 'Ticket' },
  { id: 'refunds', label: 'Cancellations & Refunds', icon: 'RotateCcw' },
  { id: 'verification', label: 'Verification & Trust', icon: 'ShieldCheck' },
  { id: 'organizers', label: 'For Organizers', icon: 'Building2' }
];

export const FAQ_DATA = [
  // --- For Promoters ---
  {
    id: 'faq-promoter-deadline',
    category: 'promoters',
    categoryLabel: 'For Promoters',
    question: 'What happens if I miss my cash deposit deadline?',
    answer: 'All cash collected from buyers must be deposited with Tixora no later than 10 days before the event. If you miss this deadline, your account is moved to "Under Review" and no new tickets can be issued to you until the deposit is made. Repeated late deposits will reset your commission rate to the base of your current tier and reduce your credit limit. Continued non-payment can result in suspension and recovery action.',
    keywords: ['miss deadline', 'late deposit', '10 days', 'under review', 'penalty', 'deposit deadline', 'overdue cash'],
    highlight: '10 days before the event deadline — missing it moves account to Under Review.'
  },
  {
    id: 'faq-promoter-deposit-method',
    category: 'promoters',
    categoryLabel: 'For Promoters',
    question: 'How do I actually deposit the cash I\'ve collected?',
    answer: 'You have two official direct options:\n\n• **Bank deposit** — deposit the cash directly into Tixora\'s designated bank account.\n• **UPI transfer** — pay Tixora directly via UPI for the equivalent amount.\n\nWhichever method you use, make sure your deposit is completed before the 10-day-before-event cutoff so it\'s reflected against your account on time.',
    keywords: ['how to deposit', 'deposit cash', 'bank deposit', 'upi transfer', 'payment method', 'settle cash'],
    highlight: 'Direct Bank Deposit or UPI Transfer before the 10-day cutoff.'
  },
  {
    id: 'faq-promoter-cash-limit',
    category: 'promoters',
    categoryLabel: 'For Promoters',
    question: 'What if I\'ve already collected cash but haven\'t hit the deadline yet — is there a limit to how much I can hold?',
    answer: 'Yes. There\'s a cap on how much uncollected cash you can hold at any one time before you\'re required to make an interim deposit, even before the 10-day cutoff. This protects both you and Tixora from holding large sums of cash unnecessarily.',
    keywords: ['holding cash', 'cash limit', 'interim deposit', 'cash cap', 'maximum cash', 'hold limit'],
    highlight: 'Interim deposit required when reaching cash holding cap.'
  },
  {
    id: 'faq-promoter-credit-limit',
    category: 'promoters',
    categoryLabel: 'For Promoters',
    question: 'How many tickets can I sell at once?',
    answer: 'You\'re issued tickets on credit up to a limit based on your commission tier. Once you reach your credit limit, no further tickets can be issued to you until you deposit cash or your limit is reviewed and raised.',
    keywords: ['sell at once', 'credit limit', 'quota', 'ticket limit', 'how many tickets', 'ticket allocation'],
    highlight: 'Issued on credit up to your tier limit until deposited.'
  },
  {
    id: 'faq-promoter-tier-up',
    category: 'promoters',
    categoryLabel: 'For Promoters',
    question: 'How do I move up a tier and get a better commission rate?',
    answer: 'Tiers are based on your cumulative tickets sold. Within your tier\'s commission range, you move toward the higher end only if you have no missed or late deposits and no confirmed buyer complaints in the recent period. A single late deposit resets you to the base rate for the following period.',
    keywords: ['move up tier', 'better commission', 'tier progression', 'increase cut', 'tier upgrade', 'late deposit reset'],
    highlight: 'Based on cumulative sales + zero late deposits + zero buyer complaints.'
  },

  // --- Ticket Delivery ---
  {
    id: 'faq-delivery-platform',
    category: 'delivery',
    categoryLabel: 'Ticket Delivery',
    question: 'How are tickets actually delivered to the buyer?',
    answer: 'Tickets are delivered digitally, directly into the buyer\'s own BookMyShow or District account — not through a separate Tixora app. This means the buyer gets an official, scannable ticket on a platform they already recognize and trust, and can access it the same way they would for any other event.',
    keywords: ['delivery', 'how tickets delivered', 'bookmyshow', 'district', 'scannable ticket', 'official ticket', 'pass delivery'],
    highlight: 'Directly into buyer\'s official BookMyShow or District account.'
  },
  {
    id: 'faq-delivery-buyer-account',
    category: 'delivery',
    categoryLabel: 'Ticket Delivery',
    question: 'Does the buyer need a BookMyShow/District account before I can sell them a ticket?',
    answer: 'Yes, the buyer needs an account on the relevant platform (BookMyShow or District) to receive the ticket. If they don\'t have one, they\'ll need to create one — this only requires a phone number, not a card or bank account, so it does not block cash-paying buyers.',
    keywords: ['buyer account', 'bms account', 'district account', 'phone number', 'need account', 'no card needed'],
    highlight: 'Requires only a phone number to create — no card or bank needed.'
  },
  {
    id: 'faq-delivery-physical-tickets',
    category: 'delivery',
    categoryLabel: 'Ticket Delivery',
    question: 'Can a promoter or buyer get a physical/paper ticket instead?',
    answer: 'No. All tickets are issued digitally only, with no physical ticket ever generated. This is by design — it prevents duplicate or fake tickets and means Tixora always has a verifiable, traceable record of every ticket issued.',
    keywords: ['physical ticket', 'paper ticket', 'printed pass', 'hard copy', 'fake ticket', 'duplicate'],
    highlight: '100% digital only to eliminate counterfeit and duplicate passes.'
  },

  // --- Cancellations & Refunds ---
  {
    id: 'faq-refund-event-cancelled',
    category: 'refunds',
    categoryLabel: 'Cancellations & Refunds',
    question: 'What happens if an event is cancelled?',
    answer: 'If an event is cancelled by the organizer, all tickets already delivered are refunded through the standard BookMyShow/District cancellation process on that platform, since that\'s where the ticket lives. Cash collected by promoters from buyers for a cancelled event must be returned to those buyers, and any amount already deposited with Tixora for that event will be refunded to the promoter to pass on. Promoters should not disburse refunds to buyers until confirmation is received from Tixora.',
    keywords: ['event cancelled', 'cancellation', 'refund process', 'money back', 'show cancelled', 'promoter refund'],
    highlight: 'Delivered tickets refund via platform; cash refunds require Tixora confirmation first.'
  },
  {
    id: 'faq-refund-buyer-request',
    category: 'refunds',
    categoryLabel: 'Cancellations & Refunds',
    question: 'What if a buyer wants a refund but the event isn\'t cancelled?',
    answer: 'Refunds outside of a cancellation follow the standard policy of the ticketing platform (BookMyShow/District) the ticket was issued on. Promoters should not personally refund cash without confirming the ticket\'s refund eligibility with Tixora first.',
    keywords: ['buyer refund', 'change mind', 'return ticket', 'refund policy', 'cannot attend'],
    highlight: 'Follows ticketing platform policy — do not refund cash without Tixora confirmation.'
  },
  {
    id: 'faq-refund-postponed',
    category: 'refunds',
    categoryLabel: 'Cancellations & Refunds',
    question: 'What if my event is postponed instead of cancelled?',
    answer: 'Existing tickets typically remain valid for the new date, following the organizer\'s and platform\'s postponement policy. Tixora will notify affected promoters directly with instructions specific to that event.',
    keywords: ['postponed', 'rescheduled', 'new date', 'event delayed', 'postponement policy'],
    highlight: 'Tickets remain valid for the rescheduled date; Tixora notifies promoters directly.'
  },

  // --- Verification & Trust ---
  {
    id: 'faq-trust-digilocker',
    category: 'verification',
    categoryLabel: 'Verification & Trust',
    question: 'Why do I need to verify with DigiLocker?',
    answer: 'DigiLocker verification confirms your real identity before you\'re approved as a promoter. This protects buyers (they know a verified real person sold them the ticket) and protects you (it\'s how Tixora can resolve disputes in your favor if something goes wrong on the buyer\'s end).',
    keywords: ['why digilocker', 'identity verification', 'aadhaar', 'promoter safety', 'buyer trust'],
    highlight: 'Confirms real identity to protect both promoters and buyers in disputes.'
  },
  {
    id: 'faq-trust-student-status',
    category: 'verification',
    categoryLabel: 'Verification & Trust',
    question: 'Does DigiLocker verification confirm I\'m a genuine student?',
    answer: 'Not on its own — DigiLocker verifies identity (like Aadhaar-linked details), not school or college enrollment. Some events may ask for an additional student ID or institutional email as a secondary check.',
    keywords: ['genuine student', 'student id', 'college enrollment', 'institutional email', 'student verification'],
    highlight: 'DigiLocker verifies ID; student status may require secondary college ID/email.'
  },
  {
    id: 'faq-trust-disputes',
    category: 'verification',
    categoryLabel: 'Verification & Trust',
    question: 'What happens if there\'s a dispute between me and a buyer?',
    answer: 'Because every ticket is logged against your verified account, Tixora uses its own ticket records as the source of truth in any dispute — independent of how the cash was handled. This works in your favor if you\'ve followed the process correctly.',
    keywords: ['dispute', 'buyer dispute', 'conflict', 'source of truth', 'scam claim', 'ticket records'],
    highlight: 'Tixora\'s verified ticket logs serve as the authoritative source of truth.'
  },

  // --- For Organizers ---
  {
    id: 'faq-organizer-how-tickets',
    category: 'organizers',
    categoryLabel: 'For Organizers',
    question: 'How does Tixora get tickets to sell?',
    answer: 'Tixora negotiates a minimum guarantee deal with organizers — committing to a guaranteed number of tickets sold in exchange for a bulk discount off face value. The discount and terms vary depending on expected demand for the event.',
    keywords: ['organizers', 'minimum guarantee', 'how tixora gets tickets', 'bulk discount', 'inventory deal'],
    highlight: 'Minimum guarantee deals with organizers in exchange for bulk discounts.'
  },
  {
    id: 'faq-organizer-upfront-payment',
    category: 'organizers',
    categoryLabel: 'For Organizers',
    question: 'Does Tixora pay upfront for all tickets?',
    answer: 'This depends on the deal structure agreed with each organizer — either a committed inventory buy under a minimum guarantee, or a revenue-share arrangement for lower-demand events. This is agreed on a per-event basis.',
    keywords: ['pay upfront', 'deal structure', 'revenue share', 'inventory buy', 'organizer terms'],
    highlight: 'Committed inventory buy (MG) or revenue-share based on event demand.'
  }
];
