import React from 'react';
import { Loader2 } from 'lucide-react';

export const SectionLoader = ({ label = "Loading Module..." }: { label?: string }) => (
  <div className="w-full py-24 flex flex-col items-center justify-center space-y-4 bg-black/20 border-y border-white/5">
    <div className="relative">
      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
      <Loader2 className="relative w-8 h-8 text-primary animate-spin" />
    </div>
    <span className="text-xs font-mono text-primary/50 tracking-widest uppercase animate-pulse">
      {label}
    </span>
  </div>
);