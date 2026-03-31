import React from 'react';
import { Clock, TrendingUp, TrendingDown, User, Package, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface TaskCardProps {
  timeLeft: string;
  title: string;
  employeeName: string;
  productName: string;
  quantity: number;
  direction: 'Buy' | 'Sell';
  status: 'pending' | 'approved' | 'denied';
  onClick?: () => void;
}

export function TaskCard({ 
  timeLeft, 
  title, 
  employeeName, 
  productName, 
  quantity, 
  direction,
  status,
  onClick 
}: TaskCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className={`relative bg-white rounded-xl p-4 shadow-sm border transition-all duration-300 overflow-hidden ${
        status === 'approved' ? 'border-[#09821f]/30 hover:shadow-lg hover:border-[#09821f]' :
        status === 'denied' ? 'border-[#e3000f]/30 hover:shadow-lg hover:border-[#e3000f]' :
        'border-gray-100 hover:shadow-xl hover:border-[#00aeef]'
      }`}>
        {/* Top gradient accent */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 ${
          status === 'approved' ? 'bg-gradient-to-r from-[#09821f] to-emerald-500' :
          status === 'denied' ? 'bg-gradient-to-r from-[#e3000f] to-[#b20110]' :
          direction === 'Buy' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
            : 'bg-gradient-to-r from-red-500 to-rose-500'
        }`}></div>

        {/* Status Badge - Top Right */}
        {status !== 'pending' && (
          <div className="absolute top-3 right-3 z-10">
            {status === 'approved' ? (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#09821f]/10 border border-[#09821f]/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#09821f]" />
                <span className="text-xs font-semibold text-[#09821f]">Approved</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e3000f]/10 border border-[#e3000f]/20">
                <XCircle className="w-3.5 h-3.5 text-[#e3000f]" />
                <span className="text-xs font-semibold text-[#e3000f]">Denied</span>
              </div>
            )}
          </div>
        )}

        {/* Header - Time and Direction */}
        <div className="flex items-center justify-between mb-3">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
            status === 'pending' ? 'bg-orange-50 border border-orange-100' : 'bg-gray-100 border border-gray-200'
          }`}>
            <Clock className={`w-3.5 h-3.5 ${status === 'pending' ? 'text-orange-600' : 'text-gray-500'}`} />
            <span className={`text-xs font-semibold ${status === 'pending' ? 'text-orange-700' : 'text-gray-600'}`}>{timeLeft}</span>
          </div>
          
          {status === 'pending' && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
              direction === 'Buy' 
                ? 'bg-green-50 border border-green-100' 
                : 'bg-red-50 border border-red-100'
            }`}>
              {direction === 'Buy' ? (
                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-600" />
              )}
              <span className={`text-xs font-bold ${
                direction === 'Buy' ? 'text-green-700' : 'text-red-700'
              }`}>
                {direction}
              </span>
            </div>
          )}
        </div>

        {/* Employee */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
          <div className="p-1.5 bg-gradient-to-br from-[#00aeef] to-[#006de3] rounded-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Employee</p>
            <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#00aeef] transition-colors">{employeeName}</p>
          </div>
        </div>

        {/* Product */}
        <div className="flex items-start gap-2 mb-3">
          <div className="p-1.5 bg-gray-100 rounded-lg shrink-0">
            <Package className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Product</p>
            <p className="text-sm font-bold text-gray-900 truncate">{productName}</p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Quantity</span>
          <span className="text-base font-bold text-gray-900">{quantity.toLocaleString()}</span>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00aeef]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </div>
    </motion.div>
  );
}