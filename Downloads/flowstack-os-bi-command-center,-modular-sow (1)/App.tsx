import React, { Suspense, useState } from 'react';
import BackgroundCanvas from './components/layout/BackgroundCanvas';
import Hero from './components/features/Hero';
import { Button } from './components/ui/button';
import { Menu, Terminal } from 'lucide-react';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { SectionLoader } from './components/ui/SectionLoader';
import { SystemModals } from './components/features/SystemModals';

// Performance: Lazy load heavy feature components
const ROICalculator = React.lazy(() => import('./components/features/ROICalculator'));
const BICommandCenter = React.lazy(() => import('./components/features/BICommandCenter'));
const SOWModals = React.lazy(() => import('./components/features/SOWModals'));

function App() {
  const [activeModal, setActiveModal] = useState<'login' | 'demo' | null>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-primary/30">
      
      {/* Dynamic Background */}
      <BackgroundCanvas />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded border border-primary/20">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold tracking-tighter text-lg">FLOWSTACK<span className="text-primary">OS</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a 
            href="#roi-calculator" 
            onClick={(e) => scrollToSection(e, 'roi-calculator')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Intelligence
          </a>
          <a 
            href="#bi-command-center" 
            onClick={(e) => scrollToSection(e, 'bi-command-center')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Integrations
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => scrollToSection(e, 'pricing')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="hidden sm:inline-flex"
            onClick={() => setActiveModal('login')}
          >
            Log In
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="hidden sm:inline-flex"
            onClick={() => setActiveModal('demo')}
          >
            Get Demo
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden" aria-label="Open Menu">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-0">
        {/* Hero is above fold, keep it eager loaded */}
        <Hero />
        
        {/* Features below fold are lazy loaded & protected by ErrorBoundary */}
        {/* Intelligence Section */}
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader label="Calibrating Calculator..." />}>
            <ROICalculator />
          </Suspense>
        </ErrorBoundary>

        {/* Integrations Section */}
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader label="Initializing BI Metrics..." />}>
            <BICommandCenter />
          </Suspense>
        </ErrorBoundary>

        {/* Pricing Section */}
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader label="Loading Service Modules..." />}>
            <SOWModals onGenerateSOW={() => setActiveModal('demo')} />
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/80 backdrop-blur-xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4 text-gray-500">
          <Terminal className="w-4 h-4" />
          <span className="font-mono text-xs">SYSTEM STATUS: OPERATIONAL</span>
        </div>
        <p className="text-gray-600 text-sm">© 2024 FlowStack OS. All Systems Go.</p>
      </footer>

      {/* Global Modals */}
      <SystemModals 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)} 
      />
    </div>
  );
}

export default App;