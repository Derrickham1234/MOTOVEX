import React from 'react';

export interface QuickFilterState {
  verifiedOnly: boolean;
  escrowSecured: boolean;
  lowUsage: boolean;
  tier3Audit: boolean;
}

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  filters: QuickFilterState;
  onToggleFilter: (filterKey: keyof QuickFilterState) => void;
  onOpenAdvancedFilter: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onToggleFilter,
  onOpenAdvancedFilter,
}) => {
  return (
    <section className="flex flex-col space-y-2">
      {/* Search Input Bar */}
      <div className="relative flex items-center w-full shadow-md rounded-xl bg-surface-slate border border-border-subtle focus-within:border-secondary-fixed-dim/40 transition-colors">
        <span className="material-symbols-outlined absolute left-3.5 text-[22px] text-text-muted pointer-events-none">
          search
        </span>
        <input
          id="marketplace-search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search make, model, VIN, machinery, location..."
          className="w-full bg-transparent pl-11 pr-12 py-3 text-text-high-contrast placeholder:text-text-muted font-body-md focus:outline-none text-sm"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-12 text-text-muted hover:text-text-high-contrast p-1"
            title="Clear search"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
        <button
          id="filter-trigger-btn"
          aria-label="Open Filter Controls"
          onClick={onOpenAdvancedFilter}
          className="absolute right-2 w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-high text-secondary-fixed-dim hover:bg-surface-bright active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>
      </div>

      {/* Active Telemetry Quick Filters */}
      <div
        id="filter-pills-row"
        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5"
      >
        <button
          id="filter-pill-verified"
          onClick={() => onToggleFilter('verifiedOnly')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-pill uppercase whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
            filters.verifiedOnly
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'bg-surface-container-high text-text-muted hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">verified</span>
          VERIFIED ONLY
        </button>

        <button
          id="filter-pill-escrow"
          onClick={() => onToggleFilter('escrowSecured')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-pill uppercase whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
            filters.escrowSecured
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'bg-surface-container-high text-text-muted hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[14px] text-tertiary">lock</span>
          ESCROW SECURED
        </button>

        <button
          id="filter-pill-usage"
          onClick={() => onToggleFilter('lowUsage')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-pill uppercase whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
            filters.lowUsage
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'bg-surface-container-high text-text-muted hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">speed</span>
          LOW USAGE / HRS
        </button>

        <button
          id="filter-pill-tier3"
          onClick={() => onToggleFilter('tier3Audit')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-pill uppercase whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
            filters.tier3Audit
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'bg-surface-container-high text-text-muted hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[14px] text-badge-trust-amber">
            fact_check
          </span>
          TIER-3 AUDIT
        </button>
      </div>
    </section>
  );
};
