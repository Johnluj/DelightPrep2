'use client';

import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '@/lib/storage';
import { Check, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Fair & Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Invest in High Scores. Built for Every Nigerian Household.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Start completely free. Upgrade anytime with secure Naira payments (Card, Bank Transfer, USSD, OPay).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUBSCRIPTION_PLANS.map(plan => (
            <div
              key={plan.id}
              className={`relative rounded-2xl bg-white p-6 sm:p-7 border transition flex flex-col justify-between ${
                plan.is_popular
                  ? 'border-blue-600 shadow-xl ring-2 ring-blue-600/20'
                  : 'border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  {plan.discount_label && (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {plan.discount_label}
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-4 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      ₦{plan.price_ngn.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      /{plan.billing_cycle === 'monthly' ? 'mo' : plan.billing_cycle === 'quarterly' ? '3 mo' : 'yr'}
                    </span>
                  </div>
                  {plan.original_price_ngn && (
                    <span className="text-xs text-slate-400 line-through">
                      ₦{plan.original_price_ngn.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Features list */}
                <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <div className="rounded-full bg-emerald-50 p-0.5 text-emerald-600 shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 active:scale-95 ${
                    plan.is_popular
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/20'
                      : plan.price_ngn === 0
                      ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      : 'bg-[#0A192F] text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{plan.price_ngn === 0 ? 'Current Free Plan' : `Subscribe for ₦${plan.price_ngn.toLocaleString()}`}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Guarantee Note */}
        <div className="mt-12 rounded-2xl bg-white border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Secure Payment via Paystack / Flutterwave</h4>
              <p className="text-xs text-slate-500">Encrypted transactions via Cards, Bank Transfer, USSD, or Mobile Money.</p>
            </div>
          </div>
          <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-3.5 py-2 rounded-xl">
            Cancel anytime • Instant activation
          </div>
        </div>

      </div>
    </section>
  );
};
