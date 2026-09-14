import React, { useState } from 'react';
import { CurrencyCode, VehicleAsset } from '../types';
import { formatCurrency } from '../utils/currency';

interface EscrowOfferModalProps {
  asset: VehicleAsset | null;
  currentCurrency: CurrencyCode;
  onClose: () => void;
  onSubmitOffer: (asset: VehicleAsset, offerPriceKSh: number) => void;
}

export const EscrowOfferModal: React.FC<EscrowOfferModalProps> = ({
  asset,
  currentCurrency,
  onClose,
  onSubmitOffer,
}) => {
  if (!asset) return null;

  const [offerPriceKSh, setOfferPriceKSh] = useState(asset.reservePriceKSh);
  const [offerSubmitted, setOfferSubmitted] = useState(false);

  const escrowFeeKSh = (offerPriceKSh * asset.escrowFeePercent) / 100;
  const totalOutlayKSh = offerPriceKSh + escrowFeeKSh;

  const handleAdjustPercent = (percent: number) => {
    const newPrice = Math.round(asset.reservePriceKSh * (1 + percent / 100));
    setOfferPriceKSh(newPrice);
  };

  const handleConfirm = () => {
    setOfferSubmitted(true);
    setTimeout(() => {
      onSubmitOffer(asset, offerPriceKSh);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        id="escrow-offer-modal"
        className="relative w-full max-w-lg rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-5 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-container/20 text-secondary-fixed-dim flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">gavel</span>
            </span>
            <div>
              <h3 className="font-headline-sm text-base text-text-high-contrast font-bold">
                Submit Institutional Escrow Offer
              </h3>
              <p className="font-label-code text-[11px] text-text-muted">
                PROTECTED BY MOTOVEX TIER-3 PROTOCOL
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-text-muted hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {offerSubmitted ? (
          /* Success Screen */
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-tertiary-container text-tertiary flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-headline-md text-xl text-text-high-contrast font-bold">
                Escrow Offer Dispatched
              </h4>
              <p className="text-xs text-text-muted max-w-xs mx-auto">
                Capital lock request routed to Escrow Node #4092. Seller has 24 hours to confirm telemetry inspection window.
              </p>
            </div>
            <div className="font-label-code text-xs text-secondary-fixed-dim bg-surface-slate px-3 py-1.5 rounded-lg">
              Outlay Locked: {formatCurrency(totalOutlayKSh, currentCurrency)}
            </div>
          </div>
        ) : (
          /* Offer Form */
          <div className="overflow-y-auto space-y-4 py-3">
            {/* Vehicle Summary Box */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-slate border border-border-subtle">
              <img
                src={asset.image}
                alt={asset.title}
                className="w-16 h-14 object-cover rounded-lg flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[10px] text-secondary-fixed-dim font-label-pill uppercase">
                  <span>{asset.editionOrYear}</span>
                  <span>•</span>
                  <span>{asset.location.city}</span>
                </div>
                <h4 className="text-sm font-semibold text-text-high-contrast truncate">
                  {asset.title}
                </h4>
                <div className="font-label-code text-[11px] text-text-muted">
                  Reserve: {formatCurrency(asset.reservePriceKSh, currentCurrency)}
                </div>
              </div>
            </div>

            {/* Offer Price Adjustment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-label-code text-xs uppercase text-text-muted">
                  Your Asset Offer Price
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleAdjustPercent(-5)}
                    className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-code hover:text-white"
                  >
                    -5%
                  </button>
                  <button
                    onClick={() => setOfferPriceKSh(asset.reservePriceKSh)}
                    className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-code text-secondary-fixed-dim"
                  >
                    Reserve
                  </button>
                  <button
                    onClick={() => handleAdjustPercent(5)}
                    className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-code hover:text-white"
                  >
                    +5%
                  </button>
                </div>
              </div>

              <div className="relative flex items-center">
                <input
                  type="number"
                  value={offerPriceKSh}
                  onChange={(e) => setOfferPriceKSh(Math.max(10000, Number(e.target.value)))}
                  step={100000}
                  className="w-full bg-surface-slate border border-border-subtle rounded-xl px-4 py-3 text-lg font-headline-sm text-text-high-contrast font-bold focus:border-secondary-fixed-dim focus:outline-none"
                />
                <span className="absolute right-4 font-label-code text-xs text-text-muted">
                  {formatCurrency(offerPriceKSh, currentCurrency)}
                </span>
              </div>
            </div>

            {/* Escrow Fee & Breakdown Table */}
            <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2 border border-border-subtle">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Offered Vehicle Price</span>
                <span className="font-label-numeric text-text-high-contrast font-semibold">
                  {formatCurrency(offerPriceKSh, currentCurrency)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-secondary-fixed-dim">
                <span className="flex items-center gap-1">
                  <span>+ 5.0% Institutional Escrow Fee</span>
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                </span>
                <span className="font-label-numeric">
                  +{formatCurrency(escrowFeeKSh, currentCurrency)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-tertiary">
                <span>Physical Telemetry Audit &amp; Legal Title</span>
                <span className="font-label-code text-[11px] uppercase">INCLUDED</span>
              </div>
              <div className="pt-2.5 border-t border-border-subtle flex items-baseline justify-between">
                <div>
                  <span className="font-label-pill uppercase text-[10px] text-text-muted block">
                    Total Required Escrow Outlay
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Held in vault until physical sign-off
                  </span>
                </div>
                <span className="font-headline-sm text-xl text-text-high-contrast font-bold">
                  {formatCurrency(totalOutlayKSh, currentCurrency)}
                </span>
              </div>
            </div>

            {/* 4-Step Escrow Timeline */}
            <div className="p-3 rounded-xl bg-surface-slate space-y-2 text-xs">
              <span className="font-label-code uppercase text-[10px] text-text-muted block">
                Escrow Custody Lifecycle
              </span>
              <div className="grid grid-cols-4 gap-1 text-center font-label-code text-[10px]">
                <div className="p-1.5 rounded bg-primary-container/20 text-secondary-fixed-dim font-bold">
                  1. Capital Lock
                </div>
                <div className="p-1.5 rounded bg-surface-container text-text-muted">
                  2. Telemetry Audit
                </div>
                <div className="p-1.5 rounded bg-surface-container text-text-muted">
                  3. Title Handover
                </div>
                <div className="p-1.5 rounded bg-surface-container text-text-muted">
                  4. Release Funds
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="confirm-escrow-offer-btn"
              onClick={handleConfirm}
              className="w-full py-3.5 px-4 rounded-xl bg-primary-container text-text-high-contrast font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-98 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">lock</span>
              Lock Capital in Escrow ({formatCurrency(totalOutlayKSh, currentCurrency)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
