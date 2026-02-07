import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { z } from 'zod';
import { formatCurrency } from '../../lib/utils';
import { ROIInputs } from '../../types';
import { MathDisplay } from '../ui/MathDisplay';

// Security: Schema definition
const CalculatorSchema = z.object({
  monthlyLeads: z.number().min(0, "Leads cannot be negative").max(100000, "Lead volume exceeds calculator limit"),
  dealValue: z.number().min(0, "Deal value cannot be negative").max(10000000, "Deal value exceeds calculator limit"),
});

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    monthlyLeads: 125,
    dealValue: 25000,
  });

  const [error, setError] = useState<string | null>(null);

  // Security: Safe update handler
  const handleInputChange = (field: keyof ROIInputs, value: string) => {
    const numValue = parseInt(value) || 0;
    
    const newInputs = { ...inputs, [field]: numValue };
    
    const result = CalculatorSchema.safeParse(newInputs);
    
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
    }
    setInputs(newInputs);
  };

  const calculation = useMemo(() => {
    const conversionRate = 0.05; // 5% currently converting
    const leakageRate = 0.45; // 45% lost
    
    const monthlyRevenuePotential = inputs.monthlyLeads * inputs.dealValue;
    const currentRevenue = monthlyRevenuePotential * conversionRate;
    const lostRevenueMonthly = monthlyRevenuePotential * leakageRate;
    const annualRevenueLeakage = lostRevenueMonthly * 12;

    return {
      currentRevenue,
      lostRevenueMonthly,
      annualRevenueLeakage,
      leakageRate
    };
  }, [inputs]);

  // LaTeX formula string
  const formula = `\\text{Leakage}_{annual} = (\\text{Leads} \\times \\text{Value}) \\times \\text{LeakageRate} \\times 12`;

  return (
    <section id="roi-calculator" className="py-24 bg-black/40 backdrop-blur-sm border-t border-white/5 relative scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">REVENUE LEAKAGE CALCULATOR</h2>
          <p className="text-gray-400 font-light">Quantify the cost of inaction.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Controls */}
          <div className="space-y-8 bg-secondary/20 p-8 rounded-xl border border-white/5 shadow-2xl">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs font-mono mb-4">
                ERROR: {error}
              </div>
            )}

            <div className="space-y-4">
              <label htmlFor="leads-input" className="block text-sm font-mono text-gray-400 uppercase tracking-wider">
                Monthly Leads Ingest
              </label>
              <div className="flex items-center gap-4">
                <input 
                  id="leads-input"
                  type="range" 
                  min="10" 
                  max="1000" 
                  step="5"
                  value={inputs.monthlyLeads}
                  onChange={(e) => handleInputChange('monthlyLeads', e.target.value)}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-valuenow={inputs.monthlyLeads}
                />
                <div className="w-24 px-3 py-2 bg-black border border-gray-800 rounded text-right font-mono text-primary">
                  {inputs.monthlyLeads}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="value-input" className="block text-sm font-mono text-gray-400 uppercase tracking-wider">
                Avg. Deal Value (PHP)
              </label>
              <div className="flex items-center gap-4">
                <input 
                  id="value-input"
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="1000"
                  value={inputs.dealValue}
                  onChange={(e) => handleInputChange('dealValue', e.target.value)}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-valuenow={inputs.dealValue}
                />
                <div className="w-24 px-3 py-2 bg-black border border-gray-800 rounded text-right font-mono text-primary text-xs">
                  ₱{(inputs.dealValue / 1000).toFixed(0)}k
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                 <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                 <p className="text-xs text-amber-200/80 leading-relaxed font-mono">
                   Standard industry metrics indicate a 45% drop-off in potential revenue due to delayed response times and lack of automated nurturing sequences.
                 </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-black border border-white/10 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <span className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-2">Annual Revenue Leakage</span>
                <motion.div 
                  key={calculation.annualRevenueLeakage}
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl md:text-6xl font-bold text-white tracking-tighter tabular-nums"
                >
                  {formatCurrency(calculation.annualRevenueLeakage)}
                </motion.div>
                <div className="mt-4 flex items-center gap-2 text-red-400 text-sm font-mono bg-red-950/30 px-3 py-1 rounded-full">
                  <ArrowRight className="w-3 h-3 rotate-45" />
                  <span>CRITICAL REVENUE AT RISK</span>
                </div>
              </div>
            </div>

            {/* LaTeX Formula Display */}
            <div className="bg-secondary/20 border border-white/5 rounded-lg p-6 overflow-hidden">
               <span className="text-xs text-gray-500 font-mono uppercase mb-4 block">Calculation Logic</span>
               <MathDisplay formula={formula} />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-secondary/20 p-4 rounded-lg border border-white/5">
                 <span className="text-xs text-gray-500 font-mono block">Monthly Potential</span>
                 <span className="text-xl font-medium text-gray-200">{formatCurrency(inputs.monthlyLeads * inputs.dealValue)}</span>
               </div>
               <div className="bg-secondary/20 p-4 rounded-lg border border-white/5">
                 <span className="text-xs text-gray-500 font-mono block">Est. Automation Lift</span>
                 <span className="text-xl font-medium text-primary">+{formatCurrency(calculation.annualRevenueLeakage * 0.6)}</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ROICalculator;