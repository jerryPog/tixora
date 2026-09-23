import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const ROUTE_LABELS = {
  events: 'Concerts & Lineup',
  waitlist: 'Campus Ambassador Waitlist',
  prices: 'Concert Rates & Calculator',
  ledger: 'Promoter Sales Ledger',
  rewards: 'Rewards & Referrals',
  tiers: 'Commission Tiers',
  reviews: 'Verified Reviews',
  about: 'About Tixora & Founders',
  contact: 'Contact Support & Helpline',
  tickets: 'Support Desk & Tickets',
  support: 'Support Desk & Tickets',
  faqs: 'FAQ & Policies Center',
  admin: 'Staff Admin Console',
  'thank-you': 'Confirmation & Digital Pass'
};

export const Breadcrumbs = ({ customItems = null }) => {
  const location = useLocation();

  const breadcrumbsList = useMemo(() => {
    if (customItems) {
      return [{ label: 'Home', path: '/' }, ...customItems];
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return [];

    const list = [{ label: 'Home', path: '/' }];
    let currentPath = '';

    pathSegments.forEach((segment, idx) => {
      currentPath += `/${segment}`;
      const isLast = idx === pathSegments.length - 1;
      let label = ROUTE_LABELS[segment] || segment.replace(/-/g, ' ');

      if (segment.startsWith('evt-')) {
        label = 'Event Details';
      }

      list.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        path: currentPath,
        isLast
      });
    });

    return list;
  }, [location.pathname, customItems]);

  // Inject Schema.org BreadcrumbList microdata
  useEffect(() => {
    if (breadcrumbsList.length <= 1) return;

    const breadcrumbSchemaId = 'tixora-breadcrumb-schema';
    let script = document.getElementById(breadcrumbSchemaId);
    if (!script) {
      script = document.createElement('script');
      script.id = breadcrumbSchemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbsList.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `https://tixora.in${item.path}`
      }))
    };

    script.textContent = JSON.stringify(schema);
  }, [breadcrumbsList]);

  if (breadcrumbsList.length <= 1) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.74rem',
        color: 'var(--text-muted)',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}
    >
      {breadcrumbsList.map((crumb, idx) => {
        const isLast = idx === breadcrumbsList.length - 1;

        return (
          <React.Fragment key={crumb.path + idx}>
            {idx > 0 && (
              <ChevronRight size={12} color="var(--text-dim)" style={{ flexShrink: 0 }} />
            )}

            {isLast ? (
              <span 
                style={{ 
                  color: '#ffffff', 
                  fontWeight: 600, 
                  background: 'rgba(255, 255, 255, 0.06)', 
                  padding: '2px 8px', 
                  borderRadius: '4px' 
                }}
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'color 0.15s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {idx === 0 && <Home size={12} />}
                <span>{crumb.label}</span>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
