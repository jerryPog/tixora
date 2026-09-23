import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ScrollToTop } from './components/Common/ScrollToTop';
import { RootLayout } from './components/Layout/RootLayout';

// Dedicated Page Components
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { PricingPage } from './pages/PricingPage';
import { WaitlistPage } from './pages/WaitlistPage';
import { LedgerPage } from './pages/LedgerPage';
import { RewardsPage } from './pages/RewardsPage';
import { TiersPage } from './pages/TiersPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SupportTicketsPage } from './pages/SupportTicketsPage';
import { FAQPage } from './pages/FAQPage';
import { AdminPage } from './pages/AdminPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NotFoundPage } from './pages/NotFoundPage';

import './index.css';

// Route Adapter Wrappers that pull handlers from RootLayout Outlet context
const HomeRoute = () => {
  const { onOpenRecordSale, onAskInChat } = useOutletContext();
  return <HomePage onOpenRecordSale={onOpenRecordSale} onAskInChat={onAskInChat} />;
};

const EventsRoute = () => {
  const { onOpenRecordSale } = useOutletContext();
  return <EventsPage onOpenRecordSale={onOpenRecordSale} />;
};

const EventDetailRoute = () => {
  const { onOpenRecordSale } = useOutletContext();
  return <EventDetailPage onOpenRecordSale={onOpenRecordSale} />;
};

const PricingRoute = () => {
  const { onOpenRecordSale } = useOutletContext();
  return <PricingPage onOpenRecordSale={onOpenRecordSale} />;
};

const LedgerRoute = () => {
  const { onOpenRecordSale } = useOutletContext();
  return <LedgerPage onOpenRecordSale={onOpenRecordSale} />;
};

const FAQRoute = () => {
  const { onAskInChat } = useOutletContext();
  return <FAQPage onAskInChat={onAskInChat} />;
};

const AdminRoute = () => {
  const { onAddNewEvent, onEditEvent, onAskInChat } = useOutletContext();
  return (
    <AdminPage
      onAddNewEvent={onAddNewEvent}
      onEditEvent={onEditEvent}
      onAskInChat={onAskInChat}
    />
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastOrderData, setLastOrderData] = useState(null);

  // Backward compatibility: If visitor enters via legacy hash URL (e.g. /#waitlist), redirect to real path (/waitlist)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const validHashRoutes = {
        events: '/events',
        posters: '/events',
        tickets: '/tickets',
        waitlist: '/waitlist',
        prices: '/prices',
        ledger: '/ledger',
        rewards: '/rewards',
        tiers: '/tiers',
        reviews: '/reviews',
        about: '/about',
        contact: '/contact',
        support: '/tickets',
        faqs: '/faqs',
        'thank-you': '/thank-you'
      };

      if (validHashRoutes[hash]) {
        navigate(validHashRoutes[hash], { replace: true });
      }
    }
  }, [navigate]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomeRoute />} />
          <Route path="events" element={<EventsRoute />} />
          <Route path="events/:eventId" element={<EventDetailRoute />} />
          <Route path="prices" element={<PricingRoute />} />
          <Route path="pricing" element={<PricingRoute />} />
          <Route
            path="waitlist"
            element={<WaitlistPage onWaitlistSuccess={(data) => setLastOrderData(data)} />}
          />
          <Route path="ledger" element={<LedgerRoute />} />
          <Route path="rewards" element={<RewardsPage />} />
          <Route path="tiers" element={<TiersPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="tickets" element={<SupportTicketsPage />} />
          <Route path="support" element={<SupportTicketsPage />} />
          <Route path="faqs" element={<FAQRoute />} />
          <Route path="admin" element={<AdminRoute />} />
          <Route
            path="thank-you"
            element={<ThankYouPage orderData={lastOrderData} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
