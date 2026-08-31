import React, { useEffect, useMemo } from 'react';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [], onNavigate }) => {
  const breadcrumbsList = useMemo(() => [
    { label: 'Home', view: 'posters' },
    ...items
  ], [items]);

  // Inject Schema.org BreadcrumbList microdata
  useEffect(() => {
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
        "item": `https://tixora.in/#${item.view || ''}`
      }))
    };

    script.textContent = JSON.stringify(schema);
  }, [breadcrumbsList]);

  if (!items || items.length === 0) return null;

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
          <React.Fragment key={idx}>
            {idx > 0 && (
              <ChevronRight size={12} color="var(--text-dim)" style={{ flexShrink: 0 }} />
            )}

            {isLast ? (
              <span 
                style={{ 
                  color: '#ffffff', 
                  fontWeight: 600, 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  padding: '2px 8px', 
                  borderRadius: '4px' 
                }}
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(crumb.view)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
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
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
