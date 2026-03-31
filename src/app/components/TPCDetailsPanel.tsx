import React, { useState } from 'react';
import { X, User, Briefcase, Building, UserCheck, TrendingUp, TrendingDown, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TPCCardData } from './TPCCard';

interface TPCDetailsPanelProps {
  data: TPCCardData | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string, comment: string) => void;
  onDeny: (id: string, reason: string, comment: string) => void;
}

export function TPCDetailsPanel({ data, isOpen, onClose, onApprove, onDeny }: TPCDetailsPanelProps) {
  const [mode, setMode] = useState<'view' | 'approve' | 'deny'>('view');
  const [comment, setComment] = useState('');
  const [denialReason, setDenialReason] = useState('');

  if (!data) return null;

  const handleApprove = () => {
    onApprove(data.id, comment);
    setComment('');
    setMode('view');
  };

  const handleDeny = () => {
    onDeny(data.id, denialReason, comment);
    setComment('');
    setDenialReason('');
    setMode('view');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Trade Pre-Clearance Details</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="px-8 py-6 space-y-8">
              {/* Employee Information */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#00aeef]" />
                  Employee Information
                </h3>
                <div className="backdrop-blur-sm bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00aeef] to-[#006de3] flex items-center justify-center text-white text-xl font-semibold">
                      {data.avatar}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{data.employeeName}</h4>
                      <p className="text-sm text-gray-600">{data.employeeRole}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600">Business Unit</p>
                        <p className="text-sm font-medium text-gray-900">Investment Banking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <UserCheck className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600">Manager</p>
                        <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Trade Details */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#00aeef]" />
                  Trade Details
                </h3>
                <div className="backdrop-blur-sm bg-gray-50 rounded-xl p-6 space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Product Name</span>
                    <span className="text-sm font-medium text-gray-900">{data.productName}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Direction</span>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md ${
                      data.direction === 'Buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {data.direction === 'Buy' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-sm font-medium">{data.direction}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Quantity</span>
                    <span className="text-sm font-medium text-gray-900">{data.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Estimated Value</span>
                    <span className="text-sm font-medium text-gray-900">$125,000</span>
                  </div>
                </div>
              </section>

              {/* Trade History */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#00aeef]" />
                  Trade History
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#00aeef]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Request Submitted</p>
                      <p className="text-xs text-gray-600">Today at 9:45 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#09821f]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Compliance Check Passed</p>
                      <p className="text-xs text-gray-600">Today at 9:47 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <UserCheck className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Awaiting Supervisor Approval</p>
                      <p className="text-xs text-gray-600">Current Status</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Action Panel */}
              {mode === 'view' && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setMode('approve')}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#09821f] to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Approve
                    </button>
                    <button
                      onClick={() => setMode('deny')}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#e3000f] to-[#b20110] hover:from-[#b20110] hover:to-[#8a0000] text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Deny
                    </button>
                  </div>
                </section>
              )}

              {/* Approval Panel */}
              {mode === 'approve' && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="backdrop-blur-sm bg-green-50 border-2 border-[#09821f]/30 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#09821f]" />
                    Approve Trade Pre-Clearance
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compliance Checklist
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded text-[#09821f] focus:ring-[#09821f]" />
                          <span className="text-sm text-gray-700">No conflicts of interest identified</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded text-[#09821f] focus:ring-[#09821f]" />
                          <span className="text-sm text-gray-700">Trade within permitted limits</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded text-[#09821f] focus:ring-[#09821f]" />
                          <span className="text-sm text-gray-700">Regulatory requirements met</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comments (Optional)
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#09821f] focus:border-transparent"
                        placeholder="Add any additional notes..."
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleApprove}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#09821f] to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                      >
                        Confirm Approval
                      </button>
                      <button
                        onClick={() => setMode('view')}
                        className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Denial Panel */}
              {mode === 'deny' && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="backdrop-blur-sm bg-red-50 border-2 border-[#e3000f]/30 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-[#e3000f]" />
                    Deny Trade Pre-Clearance
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Denial *
                      </label>
                      <select
                        value={denialReason}
                        onChange={(e) => setDenialReason(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3000f] focus:border-transparent"
                      >
                        <option value="">Select a reason</option>
                        <option value="conflict">Conflict of Interest</option>
                        <option value="limits">Exceeds Trading Limits</option>
                        <option value="regulatory">Regulatory Concerns</option>
                        <option value="incomplete">Incomplete Information</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Comments *
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3000f] focus:border-transparent"
                        placeholder="Please provide detailed explanation for denial..."
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleDeny}
                        disabled={!denialReason || !comment}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#e3000f] to-[#b20110] hover:from-[#b20110] hover:to-[#8a0000] text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm Denial
                      </button>
                      <button
                        onClick={() => setMode('view')}
                        className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}