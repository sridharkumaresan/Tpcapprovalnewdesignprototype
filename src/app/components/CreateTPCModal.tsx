import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Search, Upload, FileText, AlertCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CreateTPCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const productTypes = [
  'Equity-Common',
  'Debt',
  'Convertible Bonds',
  'Structured Note',
  'Option',
  'Certificates'
];

const orderTypes = [
  'Day Order',
  'GTC',
  'Rights Issue',
  'Tender Offers'
];

const directions = ['Buy', 'Sell'];

const mockProducts = [
  { ticker: 'AAPL', name: 'APPLE INC', isin: 'US0378331005', sector: 'Technology' },
  { ticker: 'MSFT', name: 'MICROSOFT CORP', isin: 'US5949181045', sector: 'Technology' },
  { ticker: 'GOOGL', name: 'ALPHABET INC', isin: 'US02079K3059', sector: 'Technology' },
  { ticker: 'AMZN', name: 'AMAZON.COM INC', isin: 'US0231351067', sector: 'Consumer' },
  { ticker: 'TSLA', name: 'TESLA INC', isin: 'US88160R1014', sector: 'Automotive' },
];

export function CreateTPCModal({ isOpen, onClose, onSubmit }: CreateTPCModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    account: '',
    productType: '',
    ticker: '',
    productName: '',
    isin: '',
    orderType: '',
    direction: '',
    quantity: '',
    comments: '',
    attachments: [] as File[],
  });

  const totalSteps = 3;

  const filteredProducts = mockProducts.filter(
    (p) =>
      p.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleProductSelect = (product: typeof mockProducts[0]) => {
    setFormData({
      ...formData,
      ticker: product.ticker,
      productName: product.name,
      isin: product.isin,
    });
    setShowProductSearch(false);
    setSearchQuery('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...Array.from(e.target.files)],
      });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.account && formData.productType;
      case 2:
        return formData.ticker && formData.orderType && formData.direction && formData.quantity;
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative w-full max-w-2xl h-full overflow-hidden bg-white shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#006de3] via-[#00aeef] to-[#0099cc] px-6 py-6 shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Trade Pre-Clearance Request</h2>
                <p className="text-sm text-white/80">Fill out your TPC or clone from previous requests</p>
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="flex items-center justify-between mt-6">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        step < currentStep
                          ? 'bg-white text-[#00aeef]'
                          : step === currentStep
                          ? 'bg-white text-[#00aeef] ring-4 ring-white/30'
                          : 'bg-white/20 text-white/60'
                      }`}
                    >
                      {step < currentStep ? <Check className="w-5 h-5" /> : step}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        step <= currentStep ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {step === 1 ? 'Account' : step === 2 ? 'Trade Details' : 'Review'}
                    </span>
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                        step < currentStep ? 'bg-white' : 'bg-white/20'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Account & Product Type */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">Before you begin:</p>
                      <ul className="list-disc list-inside space-y-1 text-blue-800">
                        <li>Check the Restricted List for clearance requirements</li>
                        <li>Ensure your account is activated for trading</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Account <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.account}
                      onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all"
                    >
                      <option value="">Select an account</option>
                      <option value="ACC001">Personal Trading Account (ACC001)</option>
                      <option value="ACC002">Investment Account (ACC002)</option>
                    </select>
                    <p className="mt-2 text-xs text-gray-500">Select the trading account for this request</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Product Type <span className="text-red-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {productTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData({ ...formData, productType: type })}
                          className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                            formData.productType === type
                              ? 'border-[#00aeef] bg-[#00aeef]/10 text-[#00aeef]'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Trade Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Security Search <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.ticker || searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowProductSearch(true);
                        }}
                        onFocus={() => setShowProductSearch(true)}
                        placeholder="Search by ticker or company name"
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all"
                      />
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                      {showProductSearch && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto"
                        >
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                              <button
                                key={product.ticker}
                                onClick={() => handleProductSelect(product)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-semibold text-gray-900">{product.ticker}</div>
                                    <div className="text-sm text-gray-600">{product.name}</div>
                                  </div>
                                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                    {product.sector}
                                  </span>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center text-gray-500">
                              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                              <p className="text-sm">No securities found</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                    {formData.ticker && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-lg">
                        <p className="text-sm text-green-900">
                          <span className="font-semibold">Selected:</span> {formData.ticker} - {formData.productName}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Order Type <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={formData.orderType}
                        onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all"
                      >
                        <option value="">Select order type</option>
                        {orderTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Direction <span className="text-red-600">*</span>
                      </label>
                      <div className="flex gap-3">
                        {directions.map((dir) => (
                          <button
                            key={dir}
                            onClick={() => setFormData({ ...formData, direction: dir })}
                            className={`flex-1 px-4 py-3 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
                              formData.direction === dir
                                ? dir === 'Buy'
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : 'border-red-500 bg-red-50 text-red-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            {dir === 'Buy' ? (
                              <TrendingUp className="w-5 h-5" />
                            ) : (
                              <TrendingDown className="w-5 h-5" />
                            )}
                            {dir}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Quantity <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="Enter quantity"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Additional Details & Review */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Additional Comments
                    </label>
                    <textarea
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      placeholder="Enter any additional information or comments..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00aeef] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Attachments</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#00aeef] transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                      </label>
                    </div>
                    {formData.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                          >
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700 flex-1">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Review Summary */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Request Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Account</span>
                        <span className="text-sm font-semibold text-gray-900">{formData.account}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Product Type</span>
                        <span className="text-sm font-semibold text-gray-900">{formData.productType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Security</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {formData.ticker} - {formData.productName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Direction</span>
                        <span
                          className={`text-sm font-semibold ${
                            formData.direction === 'Buy' ? 'text-green-700' : 'text-red-700'
                          }`}
                        >
                          {formData.direction}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Quantity</span>
                        <span className="text-sm font-semibold text-gray-900">{formData.quantity}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2 text-gray-700 hover:bg-gray-200 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${
                  isStepValid()
                    ? 'bg-[#00aeef] hover:bg-[#006de3] text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentStep === totalSteps ? 'Submit Request' : 'Continue'}
                {currentStep < totalSteps && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}