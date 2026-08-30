import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS, INITIAL_PROMOTERS, INITIAL_SALES, COMMISSION_TIERS } from '../data/mockData';

const AppContext = createContext();

const STORAGE_VERSION = 'v8_upfront_payment';

export const AppProvider = ({ children }) => {
  // Persistence in localStorage with auto-migration
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem(`tixora_events_${STORAGE_VERSION}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_EVENTS;
      }
    }
    return INITIAL_EVENTS;
  });

  const [promoters, setPromoters] = useState(() => {
    const saved = localStorage.getItem(`tixora_promoters_${STORAGE_VERSION}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PROMOTERS;
      }
    }
    return INITIAL_PROMOTERS;
  });

  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem(`tixora_sales_${STORAGE_VERSION}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SALES;
      }
    }
    return INITIAL_SALES;
  });

  // Current session: role can be 'promoter' or 'admin'
  const [currentRole, setCurrentRole] = useState('promoter'); // 'promoter' | 'admin'
  const [activePromoterId, setActivePromoterId] = useState('prom-1'); // Default to Aarav Sharma
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem(`tixora_events_${STORAGE_VERSION}`, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(`tixora_promoters_${STORAGE_VERSION}`, JSON.stringify(promoters));
  }, [promoters]);

  useEffect(() => {
    localStorage.setItem(`tixora_sales_${STORAGE_VERSION}`, JSON.stringify(sales));
  }, [sales]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Get active promoter object
  const activePromoter = promoters.find((p) => p.id === activePromoterId) || promoters[0];

  // Upfront Payment & Instant Ticket Issuance
  const recordNewSale = ({ eventId, ticketCategory, quantity, paymentMethod, buyerName, buyerPhone }) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    const priceItem = event.priceList.find((p) => p.category === ticketCategory);
    if (!priceItem) return;

    const totalAmount = priceItem.promoterPrice * quantity;
    const commissionEarned = Math.round(priceItem.commissionAmount * quantity);
    const randomTicketCode = `TXR-${event.name.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSale = {
      id: `sal-${Date.now()}`,
      ticketCode: randomTicketCode,
      promoterId: activePromoter.id,
      promoterName: activePromoter.name,
      eventId: event.id,
      eventName: event.name,
      ticketCategory,
      quantity,
      unitPrice: priceItem.promoterPrice,
      totalAmount,
      commissionEarned,
      paymentMethod,
      paymentStatus: 'Paid & Verified',
      deliveryStatus: 'Delivered to BookMyShow / District',
      buyerName,
      buyerPhone,
      issuedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setSales((prev) => [newSale, ...prev]);

    // Update promoter stats
    setPromoters((prev) =>
      prev.map((prom) => {
        if (prom.id === activePromoter.id) {
          const newTicketsSold = prom.ticketsSold + quantity;
          const newTotalComm = prom.totalCommissionEarned + commissionEarned;
          const newRevenue = (prom.totalRevenueGenerated || 0) + totalAmount;

          // Check tier advancement
          let newTier = prom.tier;
          let newNextTarget = prom.nextTierTarget;
          if (newTicketsSold >= 150) {
            newTier = 'Platinum';
            newNextTarget = 300;
          } else if (newTicketsSold >= 50) {
            newTier = 'Gold';
            newNextTarget = 150;
          }

          return {
            ...prom,
            ticketsSold: newTicketsSold,
            totalRevenueGenerated: newRevenue,
            totalCommissionEarned: newTotalComm,
            tier: newTier,
            nextTierTarget: newNextTarget
          };
        }
        return prom;
      })
    );

    // Update event quota sold
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          return {
            ...ev,
            priceList: ev.priceList.map((pl) => {
              if (pl.category === ticketCategory) {
                return { ...pl, quotaSold: (pl.quotaSold || 0) + quantity };
              }
              return pl;
            })
          };
        }
        return ev;
      })
    );

    showToast(`Payment verified! Pass ${randomTicketCode} issued & sent to BMS/District. Commission: +₹${commissionEarned.toLocaleString('en-IN')}`, 'success');
    return newSale;
  };

  // Admin Actions
  const addEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Event "${newEvent.name}" added successfully!`, 'success');
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    showToast(`Event "${updatedEvent.name}" updated!`, 'success');
  };

  const deleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    showToast(`Event removed from system`, 'info');
  };

  const updatePromoter = (updatedPromoter) => {
    setPromoters((prev) => prev.map((p) => (p.id === updatedPromoter.id ? updatedPromoter : p)));
    showToast(`Promoter ${updatedPromoter.name} updated!`, 'success');
  };

  const togglePromoterSuspension = (promoterId) => {
    setPromoters((prev) =>
      prev.map((p) => {
        if (p.id === promoterId) {
          const isActive = p.status === 'Active';
          const newStatus = isActive ? 'Inactive' : 'Active';
          showToast(`Promoter ${p.name} is now ${newStatus}`, isActive ? 'error' : 'success');
          return { ...p, status: newStatus };
        }
        return p;
      })
    );
  };

  const resetAllData = () => {
    setEvents(INITIAL_EVENTS);
    setPromoters(INITIAL_PROMOTERS);
    setSales(INITIAL_SALES);
    localStorage.clear();
    showToast('Database reset to official 2026 concert lineup & posters', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        events,
        promoters,
        sales,
        currentRole,
        setCurrentRole,
        activePromoterId,
        setActivePromoterId,
        activePromoter,
        commissionTiers: COMMISSION_TIERS,
        toasts,
        showToast,
        recordNewSale,
        addEvent,
        updateEvent,
        deleteEvent,
        updatePromoter,
        togglePromoterSuspension,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
