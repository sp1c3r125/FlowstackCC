import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Label } from 'recharts';
import { motion } from 'framer-motion';
import { WeeklyData, IntentData } from '../../types';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { WEEKLY_DATA, INTENT_DATA } from '../../lib/constants';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded shadow-xl">
        <p className="text-primary font-mono text-sm">{`${payload[0].value} Leads`}</p>
      </div>
    );
  }
  return null;
};

const BICommandCenter: React.FC = () => {
  return (
    <section id="bi-command-center" className="py-24 bg-black relative overflow-hidden scroll-mt-16">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">BI COMMAND CENTER</h2>
            <p className="text-gray-400 font-light">Executive visibility into ecosystem performance.</p>
          </div>
          <div className="hidden md:block">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              LIVE FEED ACTIVE
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Chart - Weekly Intent */}
          <div className="lg:col-span-2 bg-secondary/10 border border-white/5 rounded-xl p-6 relative group overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>

            {/* Chart Header with Integrated Metrics */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 z-10">
              <h3 className="text-lg font-medium text-gray-200">Weekly Lead Intent Volume</h3>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Metric Block */}
                <div className="flex items-center gap-3 bg-green-900/10 px-3 py-1.5 rounded border border-green-500/20 ml-auto sm:ml-0">
                  <div className="p-1 bg-green-500/20 rounded-full">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 font-mono uppercase leading-none mb-0.5">Growth Delta</span>
                    <span className="text-sm font-bold text-green-400 leading-none">+42%</span>
                  </div>
                </div>

                <select className="bg-black border border-white/10 text-xs text-gray-400 rounded px-2 py-1.5 outline-none focus:border-primary">
                  <option>Last 30 Days</option>
                  <option>This Quarter</option>
                </select>
              </div>
            </div>

            <div className="h-[300px] w-full flex-grow min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={WEEKLY_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#71717a', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                    dy={10}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1500}>
                    {WEEKLY_DATA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isCurrent ? '#00f0ff' : '#27272a'}
                        className={entry.isCurrent ? "drop-shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-all duration-300 hover:opacity-80" : "transition-all duration-300 hover:fill-gray-600"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Chart - AI Accuracy */}
          <div className="bg-secondary/10 border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center relative min-h-[400px]">
            <h3 className="text-lg font-medium text-gray-200 absolute top-6 left-6">AI Intent Classification</h3>

            {/* Added explicit width container and minWidth to ResponsiveContainer */}
            <div className="w-full h-[250px] mt-8 min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={INTENT_DATA}
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {INTENT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      value="94%"
                      position="center"
                      className="fill-white text-3xl font-bold font-sans"
                    />
                    <Label
                      value="AI Accuracy"
                      position="center"
                      dy={20}
                      className="fill-gray-500 text-xs font-mono uppercase"
                    />
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full grid grid-cols-2 gap-2 mt-4 px-4">
              {INTENT_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BICommandCenter;