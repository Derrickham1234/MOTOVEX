import React from 'react';

interface ListingEngineBannerProps {
  onListAsset: () => void;
  onBrokerVIP: () => void;
}

export const ListingEngineBanner: React.FC<ListingEngineBannerProps> = ({
  onListAsset,
  onBrokerVIP,
}) => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-card via-surface-container to-surface-slate p-5 shadow-xl border border-border-subtle">
      <div className="absolute top-0 right-0 w-36 h-36 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative flex flex-col space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-pill uppercase text-[10px] font-bold">
            Institutional Listing Engine
          </span>
        </div>
        <div className="space-y-1">
          <h3 className="font-headline-md text-xl text-text-high-contrast font-bold">
            Selling a fleet or industrial vehicle?
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            List verified assets in under 3 minutes. Our adaptive catalog auto-configures spec fields for cars, heavy plant, marine vessels, and agri tractors with direct escrow protection.
          </p>
        </div>
        <div className="flex items-center gap-2.5 pt-1 flex-wrap">
          <button
            id="list-asset-banner-btn"
            onClick={onListAsset}
            className="flex-1 min-w-[190px] py-2.5 px-4 rounded-lg bg-text-high-contrast text-on-primary-fixed font-headline-sm text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-white/90 active:scale-98 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">post_add</span>
            List Asset Now (Free Audit)
          </button>
          <button
            id="broker-vip-btn"
            onClick={onBrokerVIP}
            className="px-3.5 py-2.5 rounded-lg bg-surface-container-high text-on-surface hover:text-white font-headline-sm text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">contact_support</span>
            Broker VIP
          </button>
        </div>
        <div className="flex items-center gap-4 pt-1 text-text-muted flex-wrap">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-tertiary">check_circle</span>
            <span className="font-label-code text-[10px]">Zero Listing Fees</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-tertiary">check_circle</span>
            <span className="font-label-code text-[10px]">Automated VIN / Serial Decode</span>
          </div>
        </div>
      </div>
    </section>
  );
};
