import React, { useState } from 'react';
import { CurrencyCode, VehicleAsset } from '../types';
import { formatCurrency } from '../utils/currency';

interface AssetCardProps {
  asset: VehicleAsset;
  currentCurrency: CurrencyCode;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onMakeOffer: (asset: VehicleAsset) => void;
  onInspectTelemetry: (asset: VehicleAsset) => void;
  onAskAI?: (asset: VehicleAsset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  currentCurrency,
  isSaved,
  onToggleSave,
  onMakeOffer,
  onInspectTelemetry,
  onAskAI,
}) => {
  const [feeTooltipOpen, setFeeTooltipOpen] = useState(false);

  const reservePriceFormatted = formatCurrency(asset.reservePriceKSh, currentCurrency);
  const escrowFeeKSh = (asset.reservePriceKSh * asset.escrowFeePercent) / 100;
  const escrowFeeFormatted = `+ ${formatCurrency(escrowFeeKSh, currentCurrency)}`;
  const totalOutlayKSh = asset.reservePriceKSh + escrowFeeKSh;
  const totalOutlayFormatted = formatCurrency(totalOutlayKSh, currentCurrency);

  // Determine primary action text
  const isMachinery =
    asset.category === 'machinery' ||
    asset.category === 'agri' ||
    asset.category === 'commercial';

  return (
    <article
      id={`asset-card-${asset.id}`}
      className="flex flex-col rounded-xl bg-surface-card shadow-md overflow-hidden border border-border-subtle hover:border-secondary-fixed-dim/30 transition-all"
      data-asset={asset.category}
    >
      {/* Media Container */}
      <div className="relative w-full aspect-[16/9] bg-surface-container-lowest overflow-hidden">
        <img
          src={asset.image}
          alt={asset.imageAlt}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-black/40 pointer-events-none"></div>

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 py-1 rounded-full bg-surface-slate/90 backdrop-blur-md text-text-high-contrast font-label-pill uppercase tracking-wider flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[13px] text-secondary-fixed-dim">
              {asset.category === 'cars'
                ? 'directions_car'
                : asset.category === 'machinery'
                ? 'construction'
                : asset.category === 'agri'
                ? 'agriculture'
                : asset.category === 'motorcycles'
                ? 'two_wheeler'
                : asset.category === 'commercial'
                ? 'local_shipping'
                : asset.category === 'marine'
                ? 'directions_boat'
                : 'bolt'}
            </span>
            {asset.subcategoryBadge}
          </span>

          <div className="flex items-center gap-1">
            <span className="px-2.5 py-1 rounded-full bg-escrow-emerald-bg text-tertiary font-label-pill font-bold flex items-center gap-1 shadow-sm backdrop-blur-md">
              <span className="material-symbols-outlined text-[13px]">lock</span>
              {asset.category === 'machinery'
                ? 'Machinery Audited'
                : asset.category === 'agri'
                ? 'Machinery Audited'
                : asset.category === 'motorcycles'
                ? 'Verified Seller'
                : 'Escrow Eligible'}
            </span>
          </div>
        </div>

        {/* Bottom Image Micro Bar */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none z-10">
          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/85 backdrop-blur-md font-label-code text-secondary-fixed-dim text-[10px]">
            {asset.engineBadge ? asset.engineBadge : `VIN: ${asset.vin}`}
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/85 backdrop-blur-md font-label-code text-tertiary flex items-center gap-1 text-[10px]">
            <span className="material-symbols-outlined text-[12px]">verified</span>
            {asset.auditLabel}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex flex-col space-y-3.5">
        {/* Title & Location */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="font-label-pill text-secondary-fixed-dim uppercase tracking-wider text-[10px]">
                {asset.editionOrYear}
              </span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="font-label-pill text-badge-trust-amber flex items-center gap-0.5 text-[10px]">
                <span className="material-symbols-outlined text-[12px]">
                  {asset.badge.icon}
                </span>
                {asset.badge.text}
              </span>
            </div>
            <h3 className="font-headline-sm text-[18px] text-text-high-contrast truncate font-semibold">
              {asset.title}
            </h3>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-surface-container text-on-surface-variant flex-shrink-0 text-xs">
            <span className="text-base leading-none">{asset.location.flag}</span>
            <span className="font-label-code uppercase text-[11px]">
              {asset.location.city}
            </span>
          </div>
        </div>

        {/* 2x2 Telemetry Matrix */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-surface-slate">
          {asset.specs.map((spec, index) => (
            <div key={index} className="flex flex-col">
              <span className="font-label-code text-text-muted text-[10px]">
                {spec.label}
              </span>
              <span
                className={`font-label-numeric text-[13px] ${
                  spec.isHighlight
                    ? 'text-tertiary font-bold'
                    : 'text-text-high-contrast'
                }`}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Financial Settlement & Fee Breakdown */}
        <div className="p-3 rounded-lg bg-surface-container-low flex flex-col space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="font-label-code text-text-muted text-[10px]">
              ASSET RESERVE PRICE
            </span>
            <span className="font-label-numeric text-on-surface text-sm font-semibold">
              {reservePriceFormatted}
            </span>
          </div>

          <div className="flex items-center justify-between text-secondary-fixed-dim">
            <button
              id={`fee-toggle-${asset.id}`}
              onClick={() => setFeeTooltipOpen(!feeTooltipOpen)}
              className="fee-toggle flex items-center gap-1 text-left font-label-code hover:underline text-[11px] cursor-pointer"
            >
              <span>{asset.escrowFeeTitle}</span>
              <span className="material-symbols-outlined text-[14px]">
                {feeTooltipOpen ? 'expand_less' : 'info'}
              </span>
            </button>
            <span className="font-label-numeric text-[13px]">
              {escrowFeeFormatted}
            </span>
          </div>

          {/* Fee Tooltip Container */}
          {feeTooltipOpen && (
            <div
              id={`fee-tooltip-${asset.id}`}
              className="p-2.5 rounded bg-surface-slate text-on-surface-variant font-body-sm leading-snug space-y-1 shadow-sm border border-border-subtle"
            >
              <div className="flex items-center gap-1 text-secondary-fixed-dim font-label-code font-semibold text-[11px]">
                <span className="material-symbols-outlined text-[13px]">shield</span>
                {asset.escrowProtectionHeadline}
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                {asset.escrowProtectionDetails}
              </p>
            </div>
          )}

          <div className="pt-2 flex items-baseline justify-between border-t border-border-subtle">
            <span className="font-label-pill text-text-high-contrast uppercase font-bold text-[10px]">
              TOTAL ESCROW OUTLAY
            </span>
            <span className="font-headline-sm text-[18px] text-text-high-contrast font-bold">
              {totalOutlayFormatted}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            id={`bid-offer-btn-${asset.id}`}
            onClick={() =>
              isMachinery ? onInspectTelemetry(asset) : onMakeOffer(asset)
            }
            className="flex-1 py-2.5 px-4 rounded-lg bg-primary-container text-text-high-contrast font-headline-sm text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isMachinery ? 'assignment' : 'gavel'}
            </span>
            {isMachinery ? 'Inspect Telemetry & Bid' : 'Make Escrow Offer'}
          </button>

          <button
            id={`inspect-quick-btn-${asset.id}`}
            onClick={() => onInspectTelemetry(asset)}
            title="Inspect Live Diagnostic Telemetry"
            className="w-10 h-10 rounded-lg bg-surface-container text-secondary-fixed-dim hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">analytics</span>
          </button>

          {onAskAI && (
            <button
              id={`ask-ai-btn-${asset.id}`}
              onClick={() => onAskAI(asset)}
              title="Ask MOTOVEX AI about this asset"
              className="w-10 h-10 rounded-lg bg-surface-container text-secondary-fixed-dim hover:bg-secondary-fixed-dim/20 hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer border border-secondary-fixed-dim/30"
            >
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            </button>
          )}

          <button
            id={`bookmark-btn-${asset.id}`}
            aria-label="Bookmark vehicle"
            onClick={() => onToggleSave(asset.id)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
              isSaved
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-surface-container-high text-on-surface hover:text-text-high-contrast'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};
