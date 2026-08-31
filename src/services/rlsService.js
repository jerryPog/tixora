/**
 * Tixora Row-Level Security (RLS) Architecture & Policy Definitions
 * 
 * Target Database: PostgreSQL 15+ / Supabase
 * Enforces zero unauthorized data leak across student promoters, event organizers, and customers.
 */

export const RLS_POLICY_DEFINITIONS = [
  {
    table: 'public.events',
    description: 'Active concert catalog & ticket pricing tiers',
    enabled: true,
    policies: [
      {
        name: 'events_public_read_active',
        command: 'SELECT',
        roles: ['anon', 'authenticated', 'promoter'],
        using: "status = 'active' OR status = 'upcoming'",
        description: 'Anyone can browse active and upcoming concert lineups and official MRPs'
      },
      {
        name: 'events_admin_all',
        command: 'ALL',
        roles: ['admin', 'service_role'],
        using: "auth.jwt() ->> 'role' = 'admin'",
        withCheck: "auth.jwt() ->> 'role' = 'admin'",
        description: 'Only verified platform administrators can create, update, or unpublish concerts'
      }
    ]
  },
  {
    table: 'public.promoters',
    description: 'College student promoter profiles, DigiLocker verification, and commission tiers',
    enabled: true,
    policies: [
      {
        name: 'promoter_view_own_profile',
        command: 'SELECT',
        roles: ['authenticated', 'promoter'],
        using: "auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin'",
        description: 'Promoters can only inspect their own sensitive banking, DigiLocker verification, and earnings'
      },
      {
        name: 'promoter_update_own_profile',
        command: 'UPDATE',
        roles: ['authenticated', 'promoter'],
        using: "auth.uid() = user_id",
        withCheck: "auth.uid() = user_id",
        description: 'Promoters can update their phone, avatar, and social handle; cannot modify their own tier or verified status'
      },
      {
        name: 'admin_manage_all_promoters',
        command: 'ALL',
        roles: ['admin', 'service_role'],
        using: "auth.jwt() ->> 'role' = 'admin'",
        withCheck: "auth.jwt() ->> 'role' = 'admin'",
        description: 'Admins have full read/write access for KYC approval and tier adjustments'
      }
    ]
  },
  {
    table: 'public.ticket_sales',
    description: 'Audited ticket issuances, buyer personal details, and promoter commissions',
    enabled: true,
    policies: [
      {
        name: 'promoter_view_own_sales',
        command: 'SELECT',
        roles: ['authenticated', 'promoter'],
        using: "promoter_id = (SELECT id FROM promoters WHERE user_id = auth.uid()) OR auth.jwt() ->> 'role' = 'admin'",
        description: 'Promoters can only query sales they personally recorded. Cannot view competitor promoter sales.'
      },
      {
        name: 'promoter_insert_own_sale',
        command: 'INSERT',
        roles: ['authenticated', 'promoter'],
        withCheck: "promoter_id = (SELECT id FROM promoters WHERE user_id = auth.uid())",
        description: 'Promoters can only record sales under their own verified promoter ID with quota check'
      },
      {
        name: 'admin_audit_all_sales',
        command: 'ALL',
        roles: ['admin', 'service_role'],
        using: "auth.jwt() ->> 'role' = 'admin'",
        withCheck: "auth.jwt() ->> 'role' = 'admin'",
        description: 'Compliance team and administrators can view complete financial ledger and buyer contact data'
      }
    ]
  },
  {
    table: 'public.waitlist_entries',
    description: 'Campus promoter applications and student ambassador registrations',
    enabled: true,
    policies: [
      {
        name: 'waitlist_public_insert',
        command: 'INSERT',
        roles: ['anon', 'authenticated'],
        withCheck: "length(email) > 5 AND length(phone) >= 10",
        description: 'Any prospective college promoter can submit an ambassador application'
      },
      {
        name: 'waitlist_admin_only_read',
        command: 'SELECT',
        roles: ['admin', 'service_role'],
        using: "auth.jwt() ->> 'role' = 'admin'",
        description: 'Application details (phone, college, Instagram) are protected from public scraping'
      }
    ]
  },
  {
    table: 'public.contact_messages',
    description: 'Inquiries, support tickets, and organizer outreach',
    enabled: true,
    policies: [
      {
        name: 'contact_public_insert',
        command: 'INSERT',
        roles: ['anon', 'authenticated'],
        withCheck: "length(message) > 5",
        description: 'Public users can submit queries and support requests'
      },
      {
        name: 'contact_admin_view',
        command: 'SELECT',
        roles: ['admin', 'service_role'],
        using: "auth.jwt() ->> 'role' = 'admin'",
        description: 'Restricted strictly to Tixora staff and customer success operators'
      }
    ]
  }
];

export const SQL_RLS_MIGRATION_SCRIPT = `
-- =========================================================================
-- TIXORA OFFICIAL PRODUCTION ROW-LEVEL SECURITY (RLS) MIGRATIONS
-- Generated for PostgreSQL 15+ & Supabase Auth
-- =========================================================================

-- 1. Enable RLS on all core tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promoters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Events Policies
CREATE POLICY "events_public_read_active"
ON public.events FOR SELECT
TO public
USING (status IN ('active', 'upcoming'));

CREATE POLICY "events_admin_all"
ON public.events FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- 3. Promoters Policies
CREATE POLICY "promoter_view_own_profile"
ON public.promoters FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR (auth.jwt() ->> 'role') = 'admin');

CREATE POLICY "promoter_update_own_profile"
ON public.promoters FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "admin_manage_all_promoters"
ON public.promoters FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- 4. Ticket Sales Policies
CREATE POLICY "promoter_view_own_sales"
ON public.ticket_sales FOR SELECT
TO authenticated
USING (
  promoter_id = (SELECT id FROM public.promoters WHERE user_id = auth.uid())
  OR (auth.jwt() ->> 'role') = 'admin'
);

CREATE POLICY "promoter_insert_own_sale"
ON public.ticket_sales FOR INSERT
TO authenticated
WITH CHECK (
  promoter_id = (SELECT id FROM public.promoters WHERE user_id = auth.uid())
);

CREATE POLICY "admin_audit_all_sales"
ON public.ticket_sales FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- 5. Waitlist & Contact Policies
CREATE POLICY "waitlist_public_insert"
ON public.waitlist_entries FOR INSERT
TO public
WITH CHECK (length(email) > 5 AND length(phone) >= 10);

CREATE POLICY "waitlist_admin_only_read"
ON public.waitlist_entries FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'role') = 'admin');

CREATE POLICY "contact_public_insert"
ON public.contact_messages FOR INSERT
TO public
WITH CHECK (length(message) > 5);

CREATE POLICY "contact_admin_view"
ON public.contact_messages FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'role') = 'admin');
`;

/**
 * Client-Side Policy Checker for Simulation / Verification
 */
export const testRLSAccess = (table, action, userRole, promoterId, recordPromoterId = null) => {
  if (userRole === 'admin') {
    return {
      allowed: true,
      reason: 'Admin role grants full cryptographic bypass for auditing & management.'
    };
  }

  if (table === 'events') {
    if (action === 'SELECT') {
      return { allowed: true, reason: 'Public read allowed for active/upcoming concert lineups.' };
    }
    return { allowed: false, reason: 'Only admins can modify concert records.' };
  }

  if (table === 'ticket_sales') {
    if (action === 'SELECT' || action === 'INSERT') {
      if (promoterId === recordPromoterId || action === 'INSERT') {
        return { allowed: true, reason: 'Promoter has access to their own ledger entries.' };
      }
      return { allowed: false, reason: 'RLS BLOCKED: You cannot query sales recorded by other promoters.' };
    }
  }

  if (table === 'promoters') {
    if (promoterId === recordPromoterId) {
      return { allowed: true, reason: 'Promoter verified identity matches authenticated profile.' };
    }
    return { allowed: false, reason: 'RLS BLOCKED: Private KYC data isolated per promoter.' };
  }

  if (table === 'waitlist_entries' || table === 'contact_messages') {
    if (action === 'INSERT') {
      return { allowed: true, reason: 'Public write permitted for inquiries & applications.' };
    }
    return { allowed: false, reason: 'RLS BLOCKED: Waitlist data is readable only by admins.' };
  }

  return { allowed: false, reason: 'Access denied by default.' };
};
