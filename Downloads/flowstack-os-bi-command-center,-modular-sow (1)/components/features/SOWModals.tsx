import React from 'react';
import { motion } from 'framer-motion';
import { Check, Bot, Database, MessageSquare, Zap, LayoutDashboard, BrainCircuit } from 'lucide-react';
import { Button } from '../ui/button';
import { PricingTier } from '../../types';
import { formatCurrency, cn } from '../../lib/utils';

const tiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Build',
    price: 45000,
    features: [
      'Centralized n8n Brain Architecture',
      '3-Source Airtable Ingestion',
      'Real-time Slack/Discord Alerts',
      'Basic Lead Validation',
      'Manual Trigger Workflows'
    ]
  },
  {
    id: 'pro',
    name: 'Medium Pro Build',
    price: 550000,
    recommended: true,
    features: [
      'Everything in Starter',
      'BookedOS (Gemini Pro AI Sentiment)',
      'ClientFlow (Autonomous Onboarding)',
      'Full BI Command Center Suite',
      'CRM Bi-directional Sync',
      'Priority Support SLA'
    ]
  }
];

interface SOWModalsProps {
  onGenerateSOW: () => void;
}

const SOWModals: React.FC<SOWModalsProps> = ({ onGenerateSOW }) => {
  return (
    <section id="pricing" className="py-24 relative z-10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">MODULAR SOW ARCHITECTURE</h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">
            Select the deployment scale that matches your operational velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={cn(
                "relative rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 group",
                tier.recommended 
                  ? "bg-white/5 border border-primary/50 shadow-[0_0_50px_rgba(0,240,255,0.1)]" 
                  : "bg-black/40 border border-white/10 hover:bg-white/5"
              )}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-primary/25">
                  Recommended Configuration
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-200 mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{formatCurrency(tier.price)}</span>
                  <span className="text-sm text-gray-500">/ project</span>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {/* Visual Icons based on tier */}
                <div className="flex gap-4 pb-6 border-b border-white/5">
                  {tier.id === 'starter' ? (
                     <>
                      <div className="p-3 bg-secondary rounded-lg"><Database className="w-6 h-6 text-gray-400"/></div>
                      <div className="p-3 bg-secondary rounded-lg"><MessageSquare className="w-6 h-6 text-gray-400"/></div>
                     </>
                  ) : (
                    <>
                      <div className="p-3 bg-primary/20 rounded-lg"><BrainCircuit className="w-6 h-6 text-primary"/></div>
                      <div className="p-3 bg-accent/20 rounded-lg"><LayoutDashboard className="w-6 h-6 text-accent"/></div>
                      <div className="p-3 bg-secondary rounded-lg"><Bot className="w-6 h-6 text-gray-200"/></div>
                    </>
                  )}
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className={cn("w-4 h-4 mt-0.5 shrink-0", tier.recommended ? "text-primary" : "text-gray-500")} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={tier.recommended ? 'primary' : 'outline'} 
                className="w-full"
                size="lg"
                onClick={onGenerateSOW}
              >
                Initiate SOW Generation
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SOWModals;