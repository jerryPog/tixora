import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS, INITIAL_PROMOTERS, INITIAL_SALES, COMMISSION_TIERS } from '../data/mockData';

const AppContext = createContext();

const STORAGE_VERSION = 'v5_poster_framing';

export const AppProvider = ({ children }) => {
  // Persistence in localStorage with auto-migration to new poster paths
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

  // Promoter Actions
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
      buyerName,
      buyerPhone,
      depositDueDate: event.depositDeadline,
      depositStatus: paymentMethod === 'Cash' ? 'Pending Deposit' : 'Deposited',
      issuedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setSales((prev) => [newSale, ...prev]);

    // Update promoter stats
    setPromoters((prev) =>
      prev.map((prom) => {
        if (prom.id === activePromoter.id) {
          const newTicketsSold = prom.ticketsSold + quantity;
          const newCreditUsed = prom.creditUsed + quantity;
          const newTotalComm = prom.totalCommissionEarned + commissionEarned;
          const newCashCollected = paymentMethod === 'Cash' ? prom.cashCollected + totalAmount : prom.cashCollected;
          const newCashOwed = paymentMethod === 'Cash' ? prom.cashOwed + (totalAmount - commissionEarned) : prom.cashOwed;

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
            creditUsed: newCreditUsed,
            totalCommissionEarned: newTotalComm,
            cashCollected: newCashCollected,
            cashOwed: newCashOwed,
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

    showToast(`Ticket issued! Code: ${randomTicketCode}. Cash logged: ₹${totalAmount.toLocaleString('en-IN')}`, 'success');
    return newSale;
  };

  // Promoter records cash deposit settlement to Tixora
  const submitCashDeposit = (amount) => {
    setPromoters((prev) =>
      prev.map((prom) => {
        if (prom.id === activePromoter.id) {
          const newOwed = Math.max(0, prom.cashOwed - amount);
          const newDeposited = prom.cashDeposited + amount;
          return {
            ...prom,
            cashDeposited: newDeposited,
            cashOwed: newOwed,
            depositStatus: newOwed === 0 ? 'Up to Date' : 'Due Soon'
          };
        }
        return prom;
      })
    );
    showToast(`Cash settlement of ₹${amount.toLocaleString('en-IN')} submitted to Tixora Ops!`, 'success');
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
          const isSuspended = p.depositStatus === 'Suspended';
          const newStatus = isSuspended ? 'Up to Date' : 'Suspended';
          showToast(`Promoter ${p.name} is now ${newStatus.toUpperCase()}`, isSuspended ? 'success' : 'error');
          return { ...p, depositStatus: newStatus };
        }
        return p;
      })
    );
  };

  const resetAllData = () => {
    setEvents(INITIAL_EVENTS);
    setPromoters(INITIAL_PROMOTERS);
    setSales(INITIAL_SALES);
    localStorage.removeItem(`tixora_events_${STORAGE_VERSION}`);
    localStorage.removeItem(`tixora_promoters_${STORAGE_VERSION}`);
    localStorage.removeItem(`tixora_sales_${STORAGE_VERSION}`);
    localStorage.removeItem('tixora_events');
    localStorage.removeItem('tixora_promoters');
    localStorage.removeItem('tixora_sales');
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
        submitCashDeposit,
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

export const useApp = () => useContext(AppContext);
