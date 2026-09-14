import React, { useState } from 'react';
import { AssetCategory, CurrencyCode } from '../types';
import { formatCurrency } from '../utils/currency';

export interface AdvancedFilterCriteria {
  category: AssetCategory;
  city: string;
  maxPriceKSh: number;
  verifiedOnly: boolean;
  escrowOnly: boolean;
  minAuditScore: number;
}

interface AdvancedFilterModalProps {
  currentFilters: AdvancedFilterCriteria;
  currentCurrency: CurrencyCode;
  onClose: () => void;
  onApply: (filters: AdvancedFilterCriteria) => void;
  onReset: () => void;
}

export const AdvancedFilterModal: React.FC<AdvancedFilterModalProps> = ({
  currentFilters,
  currentCurrency,
  onClose,
  onApply,
  onReset,
}) => {
  const [filters, setFilters] = useState<AdvancedFilterCriteria>(currentFilters);

  const cities = ['All', 'Nairobi', 'Mombasa', 'Nakuru', 'Eldoret', 'Kilifi Creek'];

  const categories: { id: AssetCategory; label: string }[] = [
    { id: 'all', label: 'All Sectors' },
    { id: 'cars', label: 'Cars & SUVs' },
    { id: 'machinery', label: 'Heavy Machinery' },
    { id: 'agri', label: 'Agri Tech' },
    { id: 'motorcycles', label: 'Motorcycles' },
    { id: 'commercial', label: 'Commercial Trucks' },
    { id: 'marine', label: 'Marine Vessels' },
    { id: 'ev', label: 'Electric / EV' },
  ];

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-5 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary-fixed-dim">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </span>
            <h3 className="font-headline-sm text-base text-text-high-contrast font-bold">
              Marketplace Filter Matrix
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-text-muted hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Filters Body */}
        <div className="overflow-y-auto space-y-4 py-3 pr-1">
          {/* Sector Category */}
          <div className="space-y-1.5">
            <label className="font-label-code text-xs uppercase text-text-muted">
              Asset Sector Class
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilters({ ...filters, category: c.id })}
                  className={`px-3 py-2 rounded-lg text-xs font-label-code text-left transition-all ${
                    filters.category === c.id
                      ? 'bg-primary-container text-white font-bold'
                      : 'bg-surface-slate text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location Hub */}
          <div className="space-y-1.5">
            <label className="font-label-code text-xs uppercase text-text-muted">
              Regional Escrow Depot / City
            </label>
            <div className="flex flex-wrap gap-1.5">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setFilters({ ...filters, city })}
                  className={`px-3 py-1.5 rounded-full text-xs font-label-code transition-all ${
                    filters.city === city
                      ? 'bg-secondary-fixed-dim text-on-secondary-fixed font-bold'
                      : 'bg-surface-slate text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Maximum Price Slider */}
          <div className="space-y-1.5 p-3 rounded-xl bg-surface-slate">
            <div className="flex items-center justify-between">
              <label className="font-label-code text-xs uppercase text-text-muted">
                Max Reserve Price
              </label>
              <span className="font-label-numeric text-xs font-bold text-secondary-fixed-dim">
                {formatCurrency(filters.maxPriceKSh, currentCurrency)}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={35000000}
              step={500000}
              value={filters.maxPriceKSh}
              onChange={(e) =>
                setFilters({ ...filters, maxPriceKSh: Number(e.target.value) })
              }
              className="w-full accent-secondary-fixed-dim cursor-pointer"
            />
          </div>

          {/* Minimum Audit Score */}
          <div className="space-y-1.5 p-3 rounded-xl bg-surface-slate">
            <div className="flex items-center justify-between">
              <label className="font-label-code text-xs uppercase text-text-muted">
                Minimum Audit Score
              </label>
              <span className="font-label-numeric text-xs font-bold text-tertiary">
                {filters.minAuditScore}/100
              </span>
            </div>
            <input
              type="range"
              min={80}
              max={99}
              step={1}
              value={filters.minAuditScore}
              onChange={(e) =>
                setFilters({ ...filters, minAuditScore: Number(e.target.value) })
              }
              className="w-full accent-tertiary cursor-pointer"
            />
          </div>

          {/* Toggle Switches */}
          <div className="space-y-2">
            <label
              onClick={() =>
                setFilters({ ...filters, verifiedOnly: !filters.verifiedOnly })
              }
              className="flex items-center justify-between p-3 rounded-xl bg-surface-slate cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-badge-trust-amber">
                  verified
                </span>
                <span className="text-xs font-semibold text-text-high-contrast">
                  Verified Dealers &amp; Sellers Only
                </span>
              </div>
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={() => {}}
                className="w-4 h-4 accent-secondary-fixed-dim"
              />
            </label>

            <label
              onClick={() =>
                setFilters({ ...filters, escrowOnly: !filters.escrowOnly })
              }
              className="flex items-center justify-between p-3 rounded-xl bg-surface-slate cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  lock
                </span>
                <span className="text-xs font-semibold text-text-high-contrast">
                  Tier-3 Escrow Vault Eligible Only
                </span>
              </div>
              <input
                type="checkbox"
                checked={filters.escrowOnly}
                onChange={() => {}}
                className="w-4 h-4 accent-secondary-fixed-dim"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border-subtle flex items-center gap-2">
          <button
            onClick={handleReset}
            className="py-2.5 px-4 rounded-xl bg-surface-container text-text-muted hover:text-white font-headline-sm text-xs cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 px-4 rounded-xl bg-primary-container text-white font-headline-sm text-xs font-bold shadow-md hover:opacity-95 cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
