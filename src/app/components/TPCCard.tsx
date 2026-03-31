import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface TPCCardData {
  id: string;
  employeeName: string;
  employeeRole: string;
  productName: string;
  direction: 'Buy' | 'Sell';
  quantity: number;
  status: 'pending' | 'approved' | 'denied';
  avatar: string;
}

interface TPCCardProps {
  data: TPCCardData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onClick: (id: string) => void;
}

export function TPCCard({ data, isSelected, onSelect, onClick }: TPCCardProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [previousStatus, setPreviousStatus] = useState(data.status);

  useEffect(() => {
    if (previousStatus === 'pending' && data.status !== 'pending') {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
    setPreviousStatus(data.status);
  }, [data.status, previousStatus]);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelect(data.id);
  };

  return (
    <motion.div
      className={`relative group cursor-pointer ${isSelected ? 'ring-2 ring-[#00aeef] ring-offset-2' : ''}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className={`relative bg-white rounded-lg p-3 shadow-sm border transition-all duration-300 overflow-hidden ${
          data.status === 'approved' ? 'border-[#09821f]/30 bg-[#09821f]/5' :
          data.status === 'denied' ? 'border-[#e3000f]/30 bg-[#e3000f]/5' :
          'border-gray-100 hover:shadow-lg hover:border-[#00aeef]/50'
        }`}
        onClick={() => onClick(data.id)}
      >
        {/* Top gradient accent */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 ${
          data.status === 'approved' ? 'bg-gradient-to-r from-[#09821f] to-emerald-500' :
          data.status === 'denied' ? 'bg-gradient-to-r from-[#e3000f] to-[#b20110]' :
          data.direction === 'Buy' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
            : 'bg-gradient-to-r from-red-500 to-rose-500'
        }`}></div>

        {/* Floating Animation for Status Change */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            >
              {data.status === 'approved' ? (
                <CheckCircle2 className="w-20 h-20 text-[#09821f]" strokeWidth={2.5} />
              ) : (
                <XCircle className="w-20 h-20 text-[#e3000f]" strokeWidth={2.5} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkbox */}
        {data.status === 'pending' && (
          <div className="absolute top-2 right-2 z-10" onClick={handleCheckboxClick}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              onClick={handleCheckboxClick}
              className="w-4 h-4 rounded border-gray-300 text-[#00aeef] focus:ring-[#00aeef] cursor-pointer transition-all"
            />
          </div>
        )}

        {/* Employee Info */}
        <div className="flex items-start gap-2 mb-2 pr-6">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00aeef] to-[#006de3] flex items-center justify-center text-white text-xs font-semibold shrink-0 shadow-md">
            {data.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-[#00aeef] transition-colors">
              {data.employeeName}
            </h3>
            <p className="text-xs text-gray-600 truncate">{data.employeeRole}</p>
          </div>
        </div>

        {/* Trade Details */}
        <div className="space-y-1.5 mb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Product</span>
            <span className="text-xs font-semibold text-gray-900 truncate ml-2 max-w-[140px]">
              {data.productName}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Direction</span>
            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${
              data.direction === 'Buy' 
                ? 'bg-green-50 border border-green-100' 
                : 'bg-red-50 border border-red-100'
            }`}>
              {data.direction === 'Buy' ? (
                <TrendingUp className="w-3 h-3 text-green-600" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-600" />
              )}
              <span className={`text-xs font-semibold ${
                data.direction === 'Buy' ? 'text-green-700' : 'text-red-700'
              }`}>
                {data.direction}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Quantity</span>
            <span className="text-xs font-semibold text-gray-900">{data.quantity}</span>
          </div>
        </div>

        {/* Status Badge at bottom - with animation */}
        <div className="pt-2 border-t border-gray-100">
          <AnimatePresence mode="wait">
            <motion.span
              key={data.status}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                data.status === 'pending' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                data.status === 'approved' ? 'bg-[#09821f] text-white shadow-md' :
                'bg-[#e3000f] text-white shadow-md'
              }`}
            >
              {data.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
              {data.status === 'denied' && <XCircle className="w-3 h-3" />}
              <span>
                {data.status === 'pending' ? 'Pending Review' :
                 data.status === 'approved' ? 'Approved' : 'Denied'}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}