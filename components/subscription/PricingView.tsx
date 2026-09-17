'use client';

import React, { useState } from 'react';
import { 
  Check, 
  GraduationCap, 
  Crown, 
  ShieldCheck, 
  ArrowLeft, 
  Share2, 
  Copy, 
  CheckCheck,
  CreditCard,
  Gift
} from 'lucide-react';
import { SEED_SUBSCRIPTION_PLANS } from '@/lib/seed-data';
import { useApp } from '@/lib/store';

interface PricingViewProps {
  onBack: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onBack }) => {
  const { studentProfile, updateStudentProfile } = useApp();
  const [copied, setCopied] = useState(false);
  const [activatingTier, setActivatingTier] = useState<string | null>(null);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(studentProfile?.referral_code || 'DELIGHT-100');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActivatePlan = (planId: string) => {
    setActivatingTier(planId);
    setTimeout(() => {
      updateStudentProfile({
        subscription_tier: 'premium',
        subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      setActivatingTier(null);
      alert('Congratulations! Your DelightPrep Premium access is now active.');
      onBack();
    }, 1200);
  };

  const handleStartTrial = () => {
    updateStudentProfile({
      subscription_tier: 'premium',
      trial_used: true,
      subscription_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });
    alert('Your 7-Day DelightPrep Premium Free Trial has started! Enjoy full unlimited access.');
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
          <Crown className="w-3.5 h-3.5" /> Premium Plans
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Invest in Your Academic Distinction
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Unlock unlimited official CBT simulations, AI step-by-step breakdowns, and personalized weakness targeting for ₦1,500/month.
        </p>

        {!studentProfile?.trial_used && (
          <div className="pt-2">
            <button
              onClick={handleStartTrial}
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 mx-auto"
            >
              <GraduationCap className="w-4 h-4 text-white" />
              <span>Start 7-Day Free Premium Trial (No Card Required)</span>
            </button>
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {SEED_SUBSCRIPTION_PLANS.map(plan => {
          const isCurrentPlan = (studentProfile?.subscription_tier === 'premium' && plan.id === 'premium_monthly') ||
                                (studentProfile?.subscription_tier === 'free' && plan.id === 'free');

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition relative ${
                plan.is_popular
                  ? 'bg-white text-slate-900 border-2 border-blue-600 shadow-md scale-[1.02]'
                  : 'bg-white border border-slate-200 shadow-xs text-slate-900'
              }`}
            >
              {plan.discount_label && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-700 text-white shadow-xs uppercase tracking-wider">
                  {plan.discount_label}
                </span>
              )}

              <div>
                <h3 className="font-bold text-base">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    ₦{plan.price_ngn.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500">/{plan.billing_cycle}</span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-300 text-center"
                  >
                    Current Active Tier
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivatePlan(plan.id)}
                    disabled={activatingTier === plan.id}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                      plan.is_popular
                        ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{activatingTier === plan.id ? 'Connecting Gateway...' : 'Choose Plan'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* REFERRAL REWARDS SECTION */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
            <Gift className="w-4 h-4 text-blue-700" />
            <span>DelightPrep Ambassador & Referral Program</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Invite Classmates & Earn Free Study Passes</h3>
          <p className="text-xs text-slate-500 max-w-md">
            Share your unique code. When a friend registers, you both receive +500 XP and 7 free days of DelightPrep Premium.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
          <span className="font-mono font-bold text-blue-700 text-sm">
            {studentProfile?.referral_code || 'DAVID-784'}
          </span>
          <button
            onClick={handleCopyReferral}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition"
            title="Copy Referral Code"
          >
            {copied ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
