import React, { useState } from 'react';
import { SharePointHeader } from '../components/SharePointHeader';
import { TPCCard, TPCCardData } from '../components/TPCCard';
import { TPCDetailsPanel } from '../components/TPCDetailsPanel';
import { Search, Filter, ArrowUpDown, CheckCircle2, XCircle, X, ChevronLeft, LayoutGrid, List } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export function TPCView() {
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [selectedCardForDetails, setSelectedCardForDetails] = useState<TPCCardData | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');
  const [tpcData, setTpcData] = useState<TPCCardData[]>([
    {
      id: '1',
      employeeName: 'John Smith',
      employeeRole: 'Senior Analyst',
      productName: 'Apple Inc. (AAPL)',
      direction: 'Buy',
      quantity: 500,
      status: 'pending',
      avatar: 'JS',
    },
    {
      id: '2',
      employeeName: 'Emma Wilson',
      employeeRole: 'Portfolio Manager',
      productName: 'Microsoft Corp. (MSFT)',
      direction: 'Sell',
      quantity: 250,
      status: 'pending',
      avatar: 'EW',
    },
    {
      id: '3',
      employeeName: 'Michael Chen',
      employeeRole: 'Investment Associate',
      productName: 'Tesla Inc. (TSLA)',
      direction: 'Buy',
      quantity: 300,
      status: 'pending',
      avatar: 'MC',
    },
    {
      id: '4',
      employeeName: 'Sarah Johnson',
      employeeRole: 'Equity Trader',
      productName: 'Amazon.com Inc. (AMZN)',
      direction: 'Buy',
      quantity: 150,
      status: 'pending',
      avatar: 'SJ',
    },
    {
      id: '5',
      employeeName: 'David Brown',
      employeeRole: 'Research Analyst',
      productName: 'Alphabet Inc. (GOOGL)',
      direction: 'Sell',
      quantity: 400,
      status: 'pending',
      avatar: 'DB',
    },
    {
      id: '6',
      employeeName: 'Lisa Martinez',
      employeeRole: 'Fund Manager',
      productName: 'Meta Platforms (META)',
      direction: 'Buy',
      quantity: 200,
      status: 'pending',
      avatar: 'LM',
    },
    {
      id: '7',
      employeeName: 'Robert Taylor',
      employeeRole: 'Senior Trader',
      productName: 'NVIDIA Corp. (NVDA)',
      direction: 'Buy',
      quantity: 350,
      status: 'pending',
      avatar: 'RT',
    },
  ]);

  const handleSelectCard = (id: string) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCards(newSelected);
  };

  const handleCardClick = (id: string) => {
    const card = tpcData.find(c => c.id === id);
    if (card) {
      setSelectedCardForDetails(card);
    }
  };

  const handleApprove = (id: string, comment: string) => {
    setTpcData(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'approved' as const } : item
    ));
    setSelectedCardForDetails(null);
    toast.success('Trade pre-clearance approved successfully');
  };

  const handleDeny = (id: string, reason: string, comment: string) => {
    setTpcData(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'denied' as const } : item
    ));
    setSelectedCardForDetails(null);
    toast.error('Trade pre-clearance denied');
  };

  const handleBulkApprove = () => {
    setTpcData(prev => prev.map(item => 
      selectedCards.has(item.id) ? { ...item, status: 'approved' as const } : item
    ));
    toast.success(`${selectedCards.size} requests approved successfully`);
    setSelectedCards(new Set());
  };

  const handleBulkDeny = () => {
    setTpcData(prev => prev.map(item => 
      selectedCards.has(item.id) ? { ...item, status: 'denied' as const } : item
    ));
    toast.error(`${selectedCards.size} requests denied`);
    setSelectedCards(new Set());
  };

  const clearSelection = () => {
    setSelectedCards(new Set());
  };

  // Filter the data based on status
  const filteredData = statusFilter === 'all' 
    ? tpcData 
    : tpcData.filter(item => item.status === statusFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <SharePointHeader />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#006de3] via-[#00aeef] to-[#0099cc] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 sm:mb-6 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm sm:text-base">Back to Dashboard</span>
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">Trade Pre-Clearance</h1>
              <p className="text-lg sm:text-xl text-white/90">Review and approve employee trade requests</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl transition-all duration-300 ${
                statusFilter === 'all' 
                  ? 'bg-gradient-to-br from-[#00aeef] to-[#006de3] shadow-lg scale-105' 
                  : 'hover:bg-gray-50 hover:scale-105'
              }`}
            >
              <div className={`p-2 sm:p-3 rounded-xl shrink-0 ${
                statusFilter === 'all'
                  ? 'bg-white/20'
                  : 'bg-gradient-to-br from-[#00aeef] to-[#006de3]'
              }`}>
                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <div className={`text-xl sm:text-2xl font-bold ${statusFilter === 'all' ? 'text-white' : 'text-gray-900'}`}>
                  {tpcData.length}
                </div>
                <div className={`text-xs sm:text-sm ${statusFilter === 'all' ? 'text-white/90' : 'text-gray-600'}`}>
                  Total Requests
                </div>
              </div>
            </button>

            <button
              onClick={() => setStatusFilter('pending')}
              className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl transition-all duration-300 ${
                statusFilter === 'pending' 
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg scale-105' 
                  : 'hover:bg-gray-50 hover:scale-105'
              }`}
            >
              <div className={`p-2 sm:p-3 rounded-xl shrink-0 ${
                statusFilter === 'pending'
                  ? 'bg-white/20'
                  : 'bg-gradient-to-br from-orange-500 to-orange-600'
              }`}>
                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className={`text-xl sm:text-2xl font-bold ${statusFilter === 'pending' ? 'text-white' : 'text-orange-600'}`}>
                  {tpcData.filter(t => t.status === 'pending').length}
                </div>
                <div className={`text-xs sm:text-sm ${statusFilter === 'pending' ? 'text-white/90' : 'text-gray-600'}`}>
                  Pending Review
                </div>
              </div>
            </button>

            <button
              onClick={() => setStatusFilter('approved')}
              className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl transition-all duration-300 ${
                statusFilter === 'approved' 
                  ? 'bg-gradient-to-br from-[#09821f] to-green-600 shadow-lg scale-105' 
                  : 'hover:bg-gray-50 hover:scale-105'
              }`}
            >
              <div className={`p-2 sm:p-3 rounded-xl shrink-0 ${
                statusFilter === 'approved'
                  ? 'bg-white/20'
                  : 'bg-gradient-to-br from-[#09821f] to-green-600'
              }`}>
                <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <div className="text-left">
                <div className={`text-xl sm:text-2xl font-bold ${statusFilter === 'approved' ? 'text-white' : 'text-[#09821f]'}`}>
                  {tpcData.filter(t => t.status === 'approved').length}
                </div>
                <div className={`text-xs sm:text-sm ${statusFilter === 'approved' ? 'text-white/90' : 'text-gray-600'}`}>
                  Approved
                </div>
              </div>
            </button>

            <button
              onClick={() => setStatusFilter('denied')}
              className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl transition-all duration-300 ${
                statusFilter === 'denied' 
                  ? 'bg-gradient-to-br from-[#e3000f] to-[#b20110] shadow-lg scale-105' 
                  : 'hover:bg-gray-50 hover:scale-105'
              }`}
            >
              <div className={`p-2 sm:p-3 rounded-xl shrink-0 ${
                statusFilter === 'denied'
                  ? 'bg-white/20'
                  : 'bg-gradient-to-br from-[#e3000f] to-[#b20110]'
              }`}>
                <XCircle className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <div className="text-left">
                <div className={`text-xl sm:text-2xl font-bold ${statusFilter === 'denied' ? 'text-white' : 'text-[#e3000f]'}`}>
                  {tpcData.filter(t => t.status === 'denied').length}
                </div>
                <div className={`text-xs sm:text-sm ${statusFilter === 'denied' ? 'text-white/90' : 'text-gray-600'}`}>
                  Denied
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee or product..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-transparent bg-white"
              />
            </div>
            
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white">
              <Filter className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
              <span className="font-medium text-gray-700 text-sm">Filter</span>
            </button>

            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white">
              <ArrowUpDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
              <span className="font-medium text-gray-700 text-sm">Sort</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* TPC Cards Grid */}
        <motion.div
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3"
            : "space-y-3"
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {filteredData.map((data, index) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
            >
              <TPCCard
                data={data}
                isSelected={selectedCards.has(data.id)}
                onSelect={handleSelectCard}
                onClick={handleCardClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Action Bar */}
      <AnimatePresence>
        {selectedCards.size > 0 && (
          <motion.div
            className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 px-4 w-full max-w-2xl"
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="backdrop-blur-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00aeef] flex items-center justify-center text-white font-bold shrink-0">
                  {selectedCards.size}
                </div>
                <div className="text-white">
                  <div className="font-semibold text-sm sm:text-base">
                    {selectedCards.size} {selectedCards.size === 1 ? 'request' : 'requests'} selected
                  </div>
                  <div className="text-xs text-gray-400 hidden sm:block">Choose an action</div>
                </div>
              </div>
              
              <div className="hidden sm:block h-8 w-px bg-gray-700"></div>
              
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={handleBulkApprove}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#09821f] to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl text-sm font-medium transition-all shadow-lg hover:shadow-xl"
                >
                  <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>Approve</span>
                </button>
                
                <button
                  onClick={handleBulkDeny}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#e3000f] to-[#b20110] hover:from-[#b20110] hover:to-[#8a0000] text-white rounded-xl text-sm font-medium transition-all shadow-lg hover:shadow-xl"
                >
                  <XCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>Deny</span>
                </button>
                
                <button
                  onClick={clearSelection}
                  className="p-2.5 sm:p-3 hover:bg-gray-800 text-white rounded-xl transition-colors"
                >
                  <X className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Panel */}
      <TPCDetailsPanel
        data={selectedCardForDetails}
        isOpen={selectedCardForDetails !== null}
        onClose={() => setSelectedCardForDetails(null)}
        onApprove={handleApprove}
        onDeny={handleDeny}
      />
    </div>
  );
}