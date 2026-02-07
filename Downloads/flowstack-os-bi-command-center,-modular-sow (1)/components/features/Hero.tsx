import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { Button } from '../ui/button';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 pb-32 overflow-hidden">
      
      <div className="z-10 text-center max-w-5xl mx-auto space-y-8">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary text-xs tracking-widest uppercase font-mono mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          System Operational v4.0
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500"
        >
          AUTONOMOUS<br />REVENUE INTELLIGENCE
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto"
        >
          Precision at Scale. <span className="text-primary font-medium">Certainty by Design.</span>
        </motion.p>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <Button 
            size="lg" 
            className="group"
            onClick={() => scrollToSection('roi-calculator')}
          >
            Initialize Sequence
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection('bi-command-center')}
          >
            View Documentation
          </Button>
        </motion.div>
      </div>

      {/* Feature Grid - Bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-12 left-0 w-full px-8 hidden md:flex justify-between max-w-7xl mx-auto left-0 right-0"
      >
        <div className="flex items-center gap-4 text-gray-500 font-mono text-sm">
          <Activity className="h-4 w-4 text-primary" />
          <span>REAL-TIME TELEMETRY</span>
        </div>
        <div className="flex items-center gap-4 text-gray-500 font-mono text-sm">
          <Cpu className="h-4 w-4 text-primary" />
          <span>NEURAL PROCESSING</span>
        </div>
        <div className="flex items-center gap-4 text-gray-500 font-mono text-sm">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>MIL-SPEC SECURITY</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;