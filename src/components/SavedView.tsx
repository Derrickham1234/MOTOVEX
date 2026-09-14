import React from 'react';
import { CurrencyCode, VehicleAsset } from '../types';
import { AssetCard } from './AssetCard';
import { formatCurrency } from '../utils/currency';

interface SavedViewProps {
  savedAssets: VehicleAsset[];
  currentCurrency: CurrencyCode;
  onToggleSave: (id: string) => void;
  onMakeOffer: (asset: VehicleAsset) => void;
  onInspectTelemetry: (asset: VehicleAsset) => void;
  onAskAI?: (asset: VehicleAsset) => void;
  onExploreMarket: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedAssets,
  currentCurrency,
  onToggleSave,
  onMakeOffer,
  onInspectTelemetry,
  onAskAI,
  onExploreMarket,
}) => {
  const totalValueKSh = savedAssets.reduce(
    (sum, a) => sum + a.reservePriceKSh + (a.reservePriceKSh * a.escrowFeePercent) / 100,
    0
  );

  return (
    <div className="flex flex-col w-full space-y-4 pb-20">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-code text-xs text-secondary-fixed-dim uppercase tracking-wider">
            Curated Portfolio
          </span>
          <h2 className="font-headline-md text-2xl text-text-high-contrast font-bold">
            Saved Reserve Assets
          </h2>
        </div>
        <span className="font-label-numeric text-xs text-text-muted">
          {savedAssets.length} Assets Saved
        </span>
      </div>

      {savedAssets.length === 0 ? (
        <div className="p-12 rounded-2xl bg-surface-card border border-border-subtle text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-surface-container-high text-text-muted flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[28px]">bookmark_border</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-text-high-contrast">
              No Assets Bookmarked Yet
            </h3>
            <p className="text-xs text-text-muted max-w-xs mx-auto">
              Click the bookmark icon on any car, heavy plant, or agricultural machine in the catalog to monitor escrow reserve prices.
            </p>
          </div>
          <button
            onClick={onExploreMarket}
            className="py-2.5 px-5 rounded-xl bg-primary-container text-white text-xs font-headline-sm font-bold shadow-md cursor-pointer hover:opacity-90"
          >
            Browse Verified Reserve
          </button>
        </div>
      ) : (
        <>
          {/* Portfolio Total Summary */}
          <div className="p-4 rounded-xl bg-surface-card border border-border-subtle flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-code text-[11px] text-text-muted uppercase">
                Total Escrow Outlay for Bookmarked Assets
              </span>
              <span className="font-headline-sm text-lg font-bold text-text-high-contrast">
                {formatCurrency(totalValueKSh, currentCurrency)}
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-escrow-emerald-bg text-tertiary font-label-code text-xs font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Vault Eligible
            </div>
          </div>

          {/* Cards List */}
          <div className="flex flex-col space-y-4">
            {savedAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                currentCurrency={currentCurrency}
                isSaved={true}
                onToggleSave={onToggleSave}
                onMakeOffer={onMakeOffer}
                onInspectTelemetry={onInspectTelemetry}
                onAskAI={onAskAI}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
