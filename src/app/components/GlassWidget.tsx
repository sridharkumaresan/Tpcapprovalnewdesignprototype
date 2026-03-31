import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface GlassWidgetProps {
  icon: LucideIcon;
  title: string;
  count: string;
  subtitle: string;
  onClick?: () => void;
}

export function GlassWidget({ icon: Icon, title, count, subtitle, onClick }: GlassWidgetProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative group cursor-pointer text-left"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-white/30 backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white/90 text-sm font-medium mb-1">{title}</h3>
            <div className="text-3xl font-bold text-white mb-1">{count}</div>
            <p className="text-white/70 text-xs">{subtitle}</p>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </motion.button>
  );
}
