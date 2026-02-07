import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/button';
import { Lock, Mail, Building, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface SystemModalsProps {
  activeModal: 'login' | 'demo' | null;
  onClose: () => void;
}

export const SystemModals: React.FC<SystemModalsProps> = ({ activeModal, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    // 1. Capture Form Data
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    
    // 2. Define your Webhook URL (n8n, Zapier, etc.)
    // const WEBHOOK_URL = "https://your-n8n-instance.com/webhook/flowstack-ingest";
    const WEBHOOK_URL = "https://httpbin.org/post"; // Test URL (Echo service)

    try {
      // 3. Send Data via POST
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          source: 'flowstack_os_web',
          timestamp: new Date().toISOString(),
          type: activeModal // 'login' or 'demo'
        }),
      });

      if (!response.ok) throw new Error('Transmission failed');

      setStatus('success');
      
      // Auto-close on success after delay
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);

    } catch (error) {
      console.error("Webhook Error:", error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset state when modal changes
  React.useEffect(() => {
    setStatus('idle');
    setIsLoading(false);
  }, [activeModal]);

  return (
    <>
      {/* Login Modal */}
      <Modal 
        isOpen={activeModal === 'login'} 
        onClose={onClose}
        title="SECURE TERMINAL ACCESS"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">Operator ID</label>
            <div className="relative">
              <input 
                name="operatorId"
                type="text" 
                required
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 pl-10 placeholder:text-gray-700"
                placeholder="USR-7729"
              />
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">Access Key</label>
             <div className="relative">
              <input 
                name="accessKey"
                type="password" 
                required
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 pl-10 placeholder:text-gray-700"
                placeholder="••••••••••••"
              />
              <div className="absolute left-3 top-3 w-4 h-0.5 bg-gray-600" />
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>CONNECTION REFUSED: INVALID CREDENTIALS OR NETWORK ERROR</span>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            isLoading={isLoading}
          >
            Authenticate
          </Button>
          
          <div className="text-center">
             <a href="#" className="text-xs text-gray-600 hover:text-primary transition-colors">Recover Credentials</a>
          </div>
        </form>
      </Modal>

      {/* Demo Modal */}
      <Modal 
        isOpen={activeModal === 'demo'} 
        onClose={onClose}
        title="REQUEST SYSTEM BRIEFING"
      >
         <form onSubmit={handleSubmit} className="space-y-6">
           <div className="p-3 bg-primary/5 border border-primary/10 rounded mb-4">
             <p className="text-xs text-primary/80 font-mono leading-relaxed">
               System architects are standing by. Initialize connection to schedule a technical deep dive.
             </p>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase">First Name</label>
                <input 
                  name="firstName"
                  type="text" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-primary/50 outline-none placeholder:text-gray-700" 
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase">Last Name</label>
                <input 
                  name="lastName"
                  type="text" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-primary/50 outline-none placeholder:text-gray-700" 
                  placeholder="Doe"
                />
              </div>
           </div>

           <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">Corporate Email</label>
            <div className="relative">
              <input 
                name="email"
                type="email" 
                required
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 pl-10 placeholder:text-gray-700"
                placeholder="engineer@corp.com"
              />
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">Revenue Band</label>
            <div className="relative">
              <select 
                name="revenueBand"
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-primary/50 pl-10 appearance-none"
              >
                <option value="1M-5M">$1M - $5M ARR</option>
                <option value="5M-20M">$5M - $20M ARR</option>
                <option value="20M+">$20M+ ARR</option>
              </select>
              <Building className="absolute left-3 top-2.5 w-4 h-4 text-gray-600" />
            </div>
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs animate-in fade-in slide-in-from-top-1">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>UPLINK ESTABLISHED. ARCHITECTS NOTIFIED.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>TRANSMISSION ERROR. RETRY INITIATED.</span>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            isLoading={isLoading}
            disabled={status === 'success'}
          >
            {isLoading ? "Transmitting..." : status === 'success' ? "Sent" : "Initialize Uplink"}
            {!isLoading && status !== 'success' && <ArrowRight className="ml-2 w-4 h-4" />}
          </Button>
        </form>
      </Modal>
    </>
  );
};