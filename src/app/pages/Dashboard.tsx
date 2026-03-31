import React, { useState } from 'react';
import { SharePointHeader } from '../components/SharePointHeader';
import { HeroBanner } from '../components/HeroBanner';
import { TaskCard } from '../components/TaskCard';
import { Search, Filter, ArrowUpDown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

export function Dashboard() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [manualTimeOverride, setManualTimeOverride] = useState<'morning' | 'afternoon' | 'evening' | null>(null);
  const [autoTimeOfDay, setAutoTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  // Determine automatic time of day
  React.useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setAutoTimeOfDay('morning');
      } else if (hour >= 12 && hour < 18) {
        setAutoTimeOfDay('afternoon');
      } else {
        setAutoTimeOfDay('evening');
      }
    };
    
    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const displayTimeOfDay = manualTimeOverride || autoTimeOfDay;

  const handleTimeChange = (time: 'morning' | 'afternoon' | 'evening' | null) => {
    setManualTimeOverride(time);
  };

  const tasks = [
    {
      id: '1',
      timeLeft: '14 hours left',
      title: 'Review Trade Pre-Clearance',
      employeeName: 'John Smith',
      productName: 'Apple Inc. (AAPL)',
      quantity: 500,
      direction: 'Buy' as const,
      status: 'pending' as const,
    },
    {
      id: '2',
      timeLeft: '8 hours left',
      title: 'Review Trade Pre-Clearance',
      employeeName: 'Emma Wilson',
      productName: 'Microsoft Corp. (MSFT)',
      quantity: 250,
      direction: 'Sell' as const,
      status: 'pending' as const,
    },
    {
      id: '3',
      timeLeft: '12 hours left',
      title: 'Review Trade Pre-Clearance',
      employeeName: 'Michael Chen',
      productName: 'Tesla Inc. (TSLA)',
      quantity: 300,
      direction: 'Buy' as const,
      status: 'approved' as const,
    },
    {
      id: '4',
      timeLeft: '6 hours left',
      title: 'Review Trade Pre-Clearance',
      employeeName: 'Sarah Johnson',
      productName: 'Amazon.com Inc. (AMZN)',
      quantity: 150,
      direction: 'Buy' as const,
      status: 'pending' as const,
    },
    {
      id: '5',
      timeLeft: '18 hours left',
      title: 'Review Trade Pre-Clearance',
      employeeName: 'David Brown',
      productName: 'Alphabet Inc. (GOOGL)',
      quantity: 400,
      direction: 'Sell' as const,
      status: 'denied' as const,
    },
    {
      id: '6',
      timeLeft: '10 hours left',
      title: 'Review Trade Pre-Clearance',
      employeeName: 'Lisa Martinez',
      productName: 'Meta Platforms (META)',
      quantity: 200,
      direction: 'Buy' as const,
      status: 'pending' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <SharePointHeader 
        isVisible={!isScrolled} 
        timeOfDay={displayTimeOfDay}
        onTimeChange={handleTimeChange}
      />
      <HeroBanner 
        onScrollChange={setIsScrolled}
        displayTimeOfDay={displayTimeOfDay}
      />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Workspace</h2>
              <p className="text-sm sm:text-base text-gray-600">Manage your approvals and tasks efficiently</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full sm:w-64 pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-transparent bg-white"
                />
              </div>
              
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white">
                <Filter className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                <span className="font-medium text-gray-700 text-sm hidden sm:inline">Filter</span>
              </button>

              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white">
                <ArrowUpDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                <span className="font-medium text-gray-700 text-sm hidden sm:inline">Sort</span>
              </button>
            </div>
          </div>

          {/* Featured TPC Section */}
          <motion.div
            className="mb-8 sm:mb-10"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div 
              onClick={() => navigate('/tpc')}
              className="group cursor-pointer relative overflow-hidden bg-gradient-to-br from-[#006de3] via-[#00aeef] to-[#0099cc] rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6bS0yNCAwYzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white/80 text-xs font-medium uppercase tracking-wider">Trade Pre-Clearance</div>
                      <h3 className="text-lg font-bold text-white">
                        Review Required
                      </h3>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mb-2">
                    You have 7 trade pre-clearance requests awaiting your approval
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-white/90 text-xs font-medium">7 Pending</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-white/70" />
                      <span className="text-white/90 text-xs">Avg. 14 hours remaining</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white mb-1">7</div>
                    <div className="text-white/80 text-xs">Awaiting Review</div>
                  </div>
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </motion.div>

          {/* Main Tasks Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <TaskCard
              timeLeft="14 hrs left"
              title="Trade Pre-Clearance Request"
              employeeName="John Smith"
              productName="Apple Inc. (AAPL)"
              quantity={500}
              direction="Buy"
              status="pending"
              onClick={() => navigate('/tpc')}
            />
            <TaskCard
              timeLeft="8 hrs left"
              title="Trade Pre-Clearance Request"
              employeeName="Emma Wilson"
              productName="Microsoft Corp. (MSFT)"
              quantity={250}
              direction="Sell"
              status="pending"
              onClick={() => navigate('/tpc')}
            />
            <TaskCard
              timeLeft="22 hrs left"
              title="Trade Pre-Clearance Request"
              employeeName="Michael Chen"
              productName="Tesla Inc. (TSLA)"
              quantity={300}
              direction="Buy"
              status="pending"
              onClick={() => navigate('/tpc')}
            />
            <TaskCard
              timeLeft="6 hrs left"
              title="Trade Pre-Clearance Request"
              employeeName="Sarah Johnson"
              productName="Amazon.com Inc. (AMZN)"
              quantity={150}
              direction="Buy"
              status="pending"
              onClick={() => navigate('/tpc')}
            />
            <TaskCard
              timeLeft="18 hrs left"
              title="Trade Pre-Clearance Request"
              employeeName="David Brown"
              productName="Alphabet Inc. (GOOGL)"
              quantity={400}
              direction="Sell"
              status="pending"
              onClick={() => navigate('/tpc')}
            />
            <TaskCard
              timeLeft="12 hrs left"
              title="Trade Pre-Clearance Request"
              employeeName="Lisa Martinez"
              productName="Meta Platforms (META)"
              quantity={200}
              direction="Buy"
              status="pending"
              onClick={() => navigate('/tpc')}
            />
            <TaskCard
              timeLeft="20 hrs left"
              title="Trade Pre-Clearance Request"
              employeeName="Robert Taylor"
              productName="NVIDIA Corp. (NVDA)"
              quantity={350}
              direction="Buy"
              status="pending"
              onClick={() => navigate('/tpc')}
            />
            <TaskCard
              timeLeft="4 hrs left"
              title="Trade Pre-Clearance Request"
              employeeName="Jennifer Lee"
              productName="Netflix Inc. (NFLX)"
              quantity={175}
              direction="Sell"
              status="pending"
              onClick={() => navigate('/tpc')}
            />
            <TaskCard
              timeLeft="16 hrs left"
              title="Trade Pre-Clearance Request"
              employeeName="Christopher Wang"
              productName="Adobe Inc. (ADBE)"
              quantity={280}
              direction="Buy"
              status="pending"
              onClick={() => navigate('/tpc')}
            />
          </motion.div>

          {/* Recent Activity Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <TaskCard
                timeLeft="Completed"
                title="Trade Pre-Clearance Request"
                employeeName="Alex Thompson"
                productName="PayPal Holdings (PYPL)"
                quantity={320}
                direction="Buy"
                status="approved"
              />
              <TaskCard
                timeLeft="Completed"
                title="Trade Pre-Clearance Request"
                employeeName="Maria Garcia"
                productName="Salesforce Inc. (CRM)"
                quantity={190}
                direction="Sell"
                status="approved"
              />
              <TaskCard
                timeLeft="Denied"
                title="Trade Pre-Clearance Request"
                employeeName="Kevin Park"
                productName="Intel Corp. (INTC)"
                quantity={450}
                direction="Buy"
                status="denied"
              />
              <TaskCard
                timeLeft="Completed"
                title="Trade Pre-Clearance Request"
                employeeName="Rachel Anderson"
                productName="Oracle Corp. (ORCL)"
                quantity={275}
                direction="Buy"
                status="approved"
              />
              <TaskCard
                timeLeft="Completed"
                title="Trade Pre-Clearance Request"
                employeeName="Thomas Miller"
                productName="Cisco Systems (CSCO)"
                quantity={380}
                direction="Sell"
                status="approved"
              />
              <TaskCard
                timeLeft="Denied"
                title="Trade Pre-Clearance Request"
                employeeName="Jessica Brown"
                productName="IBM Corp. (IBM)"
                quantity={420}
                direction="Buy"
                status="denied"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}