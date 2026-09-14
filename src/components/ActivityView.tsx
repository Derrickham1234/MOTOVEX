import React from 'react';
import { CurrencyCode, EscrowOffer } from '../types';
import { formatCurrency } from '../utils/currency';

interface ActivityViewProps {
  offers: EscrowOffer[];
  currentCurrency: CurrencyCode;
  onExploreMarket: () => void;
}

export const ActivityView: React.FC<ActivityViewProps> = ({
  offers,
  currentCurrency,
  onExploreMarket,
}) => {
  // Built-in initial activity transactions to demonstrate institutional escrow ledger
  const defaultLedger = [
    {
      id: 'ESC-4092-019',
      assetTitle: 'Toyota Land Cruiser GR Sport',
      vin: 'JTM-LU09J-48201',
      totalOutlayKSh: 15540000,
      phase: 2,
      phaseName: 'Telemetry Audit In Progress',
      timestamp: 'Today, 11:20 AM',
      node: 'NODE-NRB-4092',
      statusColor: 'text-secondary-fixed-dim',
    },
    {
      id: 'ESC-3312-882',
      assetTitle: 'CAT 320 Hydraulic Excavator',
      vin: 'CAT00320BHEX90241',
      totalOutlayKSh: 11760000,
      phase: 4,
      phaseName: 'Funds Disbursed to Dealer',
      timestamp: 'Yesterday, 04:45 PM',
      node: 'NODE-ELD-3312',
      statusColor: 'text-tertiary',
    },
  ];

  return (
    <div className="flex flex-col w-full space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-code text-xs text-secondary-fixed-dim uppercase tracking-wider">
            Escrow Node #4092 Ledger
          </span>
          <h2 className="font-headline-md text-2xl text-text-high-contrast font-bold">
            Settlement Activity
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-escrow-emerald-bg text-tertiary font-label-code text-xs font-semibold">
          <span className="material-symbols-outlined text-[14px]">shield</span>
          Tier-3 Guard Active
        </div>
      </div>

      {/* Real-time Offers Placed by the User this session */}
      {offers.length > 0 && (
        <div className="space-y-2">
          <span className="font-label-code text-xs uppercase text-text-muted">
            Your Active Escrow Contracts ({offers.length})
          </span>
          <div className="space-y-3">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 rounded-xl bg-surface-card border border-secondary-fixed-dim/30 shadow-md space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={offer.assetImage}
                      alt={offer.assetTitle}
                      className="w-14 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <span className="font-label-code text-[10px] text-secondary-fixed-dim uppercase">
                        CONTRACT {offer.id}
                      </span>
                      <h4 className="text-sm font-semibold text-text-high-contrast truncate">
                        {offer.assetTitle}
                      </h4>
                      <span className="font-label-code text-[10px] text-text-muted">
                        Escrow Node: {offer.escrowNode}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-label-code text-[10px] text-text-muted uppercase">
                      Custody Locked
                    </span>
                    <div className="font-headline-sm text-sm font-bold text-text-high-contrast">
                      {formatCurrency(offer.totalOutlayKSh, currentCurrency)}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-label-code">
                    <span className="text-secondary-fixed-dim">Phase 1: Capital Locked in Vault</span>
                    <span className="text-tertiary">Inspection Scheduled</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                    <div className="bg-secondary-fixed-dim h-full w-1/4 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[9px] font-label-code text-text-muted">
                    <span>1. Deposit Lock</span>
                    <span>2. Telemetry Audit</span>
                    <span>3. Title Handover</span>
                    <span>4. Settlement</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Ledger */}
      <div className="space-y-2">
        <span className="font-label-code text-xs uppercase text-text-muted">
          Regional Escrow Node Settlement History
        </span>
        <div className="space-y-3">
          {defaultLedger.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-surface-card border border-border-subtle shadow-sm space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-code text-[10px] text-text-muted">
                      {item.id}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-label-code text-[10px] text-secondary-fixed-dim">
                      {item.node}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-text-high-contrast">
                    {item.assetTitle}
                  </h4>
                  <span className="font-label-code text-[11px] text-text-muted">
                    VIN: {item.vin}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-label-numeric text-sm font-bold text-text-high-contrast">
                    {formatCurrency(item.totalOutlayKSh, currentCurrency)}
                  </span>
                  <div className="font-label-code text-[10px] text-text-muted">
                    {item.timestamp}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-slate text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    {item.phase === 4 ? 'check_circle' : 'pending'}
                  </span>
                  <span className="font-label-code text-[11px] text-on-surface">
                    {item.phaseName}
                  </span>
                </div>
                <span className="font-label-code text-[10px] text-text-muted">
                  Phase {item.phase} / 4
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={onExploreMarket}
          className="w-full py-3 rounded-xl bg-surface-container-high hover:bg-surface-bright text-text-high-contrast font-headline-sm text-xs font-semibold cursor-pointer"
        >
          Return to Marketplace
        </button>
      </div>
    </div>
  );
};
