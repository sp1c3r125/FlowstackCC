import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/button';
import { Lock, Mail, Building, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { flowstackService } from '../../lib/services';

const LoginSchema = z.object({
  operatorId: z.string().min(3, "Operator ID must be at least 3 characters"),
  accessKey: z.string().min(6, "Access Key must be at least 6 characters"),
});

const DemoSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid corporate email"),
  revenueBand: z.enum(['1M-5M', '5M-20M', '20M+']),
});

interface SystemModalsProps {
  activeModal: 'login' | 'demo' | null;
  onClose: () => void;
}

export const SystemModals: React.FC<SystemModalsProps> = ({ activeModal, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      // 1. Validate based on modal type
      const schema = activeModal === 'login' ? LoginSchema : DemoSchema;
      const validationResult = schema.safeParse(payload);

      if (!validationResult.success) {
        const errors: Record<string, string> = {};
        validationResult.error.errors.forEach((err) => {
          if (err.path[0]) errors[err.path[0] as string] = err.message;
        });
        setFormErrors(errors);
        throw new Error('Validation failed');
      }

      // 2. Submit via Service
      await flowstackService.submitForm({
        ...validationResult.data,
        type: activeModal
      });

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
    setFormErrors({});
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
                className={`w-full bg-black/50 border ${formErrors.operatorId ? 'border-red-500' : 'border-white/10'} rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 pl-10 placeholder:text-gray-700`}
                placeholder="USR-7729"
              />
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-600" />
            </div>
            {formErrors.operatorId && <p className="text-[10px] text-red-500 font-mono mt-1">{formErrors.operatorId}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">Access Key</label>
            <div className="relative">
              <input
                name="accessKey"
                type="password"
                required
                className={`w-full bg-black/50 border ${formErrors.accessKey ? 'border-red-500' : 'border-white/10'} rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 pl-10 placeholder:text-gray-700`}
                placeholder="••••••••••••"
              />
              <div className="absolute left-3 top-3 w-4 h-0.5 bg-gray-600" />
            </div>
            {formErrors.accessKey && <p className="text-[10px] text-red-500 font-mono mt-1">{formErrors.accessKey}</p>}
          </div>

          {status === 'error' && Object.keys(formErrors).length === 0 && (
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
                className={`w-full bg-black/50 border ${formErrors.firstName ? 'border-red-500' : 'border-white/10'} rounded px-3 py-2 text-sm text-white focus:border-primary/50 outline-none placeholder:text-gray-700`}
                placeholder="Jane"
              />
              {formErrors.firstName && <p className="text-[10px] text-red-500 font-mono mt-1">{formErrors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500 uppercase">Last Name</label>
              <input
                name="lastName"
                type="text"
                required
                className={`w-full bg-black/50 border ${formErrors.lastName ? 'border-red-500' : 'border-white/10'} rounded px-3 py-2 text-sm text-white focus:border-primary/50 outline-none placeholder:text-gray-700`}
                placeholder="Doe"
              />
              {formErrors.lastName && <p className="text-[10px] text-red-500 font-mono mt-1">{formErrors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">Corporate Email</label>
            <div className="relative">
              <input
                name="email"
                type="email"
                required
                className={`w-full bg-black/50 border ${formErrors.email ? 'border-red-500' : 'border-white/10'} rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 pl-10 placeholder:text-gray-700`}
                placeholder="engineer@corp.com"
              />
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-600" />
            </div>
            {formErrors.email && <p className="text-[10px] text-red-500 font-mono mt-1">{formErrors.email}</p>}
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

          {status === 'error' && Object.keys(formErrors).length === 0 && (
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