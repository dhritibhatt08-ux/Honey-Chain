import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { SmartHive } from './pages/SmartHive';
import { AiAnalysis } from './pages/AiAnalysis';
import { HarvestBatches } from './pages/HarvestBatches';
import { BlockchainLedger } from './pages/BlockchainLedger';
import { QrVerification } from './pages/QrVerification';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Scroll to top on route change helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-ivory-100 dark:bg-charcoal-900 text-chocolate-900 dark:text-ivory-100 transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/smart-hive" element={<SmartHive />} />
                <Route path="/ai-analysis" element={<AiAnalysis />} />
                <Route path="/harvest" element={<HarvestBatches />} />
                <Route path="/blockchain" element={<BlockchainLedger />} />
                <Route path="/verify" element={<QrVerification />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
