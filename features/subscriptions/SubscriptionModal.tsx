'use client';

import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS, setStoredStudentProfile, getStoredStudentProfile } from '@/lib/storage';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Building2, 
  Smartphone,
  Lock
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (planId: string) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-pro-monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[1];

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      const profile = getStoredStudentProfile();
      if (profile) {
        setStoredStudentProfile({
          ...profile,
          subscription_tier: 'premium'
        });
      }

      setTimeout(() => {
        setIsSuccess(false);
        onSuccess(selectedPlanId);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Payment Successful!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your DelightPrep Pro subscription has been activated immediately. Enjoy unlimited CBT mocks, AI tutor breakdowns, and past questions.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                Upgrade to DelightPrep Pro
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Invest in Better Results
              </h2>
              <p className="text-xs text-slate-500">
                Full access to all 50,000+ past questions, official timed CBT simulations, and AI step-by-step assistance.
              </p>
            </div>

            {/* Plan Selector */}
            <div className="grid grid-cols-3 gap-2.5">
              {SUBSCRIPTION_PLANS.filter(p => p.price_ngn > 0).map(plan => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-3 rounded-xl border text-center transition flex flex-col justify-between ${
                    selectedPlanId === plan.id
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {plan.discount_label && (
                    <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full self-center mb-1">
                      {plan.discount_label}
                    </span>
                  )}
                  <div className="text-xs font-bold text-slate-900">{plan.name}</div>
                  <div className="text-sm font-black text-blue-700 mt-1">₦{plan.price_ngn.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{plan.billing_cycle}</div>
                </button>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Select Nigerian Payment Channel</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                  <span>Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'transfer' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Bank Transfer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('ussd')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'ussd' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                  <span>USSD / OPay</span>
                </button>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'Connecting to Paystack Gateway...' : `Pay ₦${selectedPlan.price_ngn.toLocaleString()} via Paystack`}</span>
            </button>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>PCI-DSS Certified 256-bit Encryption • Cancel Anytime</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
