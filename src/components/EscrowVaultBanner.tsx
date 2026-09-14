import React from 'react';

interface EscrowVaultBannerProps {
  onLearnMore: () => void;
}

export const EscrowVaultBanner: React.FC<EscrowVaultBannerProps> = ({ onLearnMore }) => {
  return (
    <section
      onClick={onLearnMore}
      className="relative overflow-hidden rounded-xl bg-surface-card p-4 shadow-md cursor-pointer hover:border hover:border-secondary-fixed-dim/30 transition-all group"
    >
      <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-escrow-emerald-bg blur-2xl pointer-events-none group-hover:scale-110 transition-transform"></div>
      <div className="relative flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[24px]">verified_user</span>
        </div>
        <div className="flex flex-col space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-headline-sm text-lg text-text-high-contrast font-bold">
              MOTOVEX Escrow Vault
            </span>
            <span className="px-2 py-0.5 rounded-full bg-escrow-emerald-bg text-tertiary font-label-pill text-[10px] font-bold">
              TIER-3 PROTOCOL
            </span>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
            100% Capital Custody held in institutional escrow until physical telemetry audit &amp; legal title verification handover. Zero counterparty risk.
          </p>
        </div>
      </div>
    </section>
  );
};
