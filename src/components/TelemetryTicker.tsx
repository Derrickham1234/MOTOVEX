import React from 'react';
import { CurrencyCode } from '../types';
import { formatCurrency } from '../utils/currency';

interface TelemetryTickerProps {
  currentCurrency: CurrencyCode;
  onOpenVaultProtocol: () => void;
}

export const TelemetryTicker: React.FC<TelemetryTickerProps> = ({
  currentCurrency,
  onOpenVaultProtocol,
}) => {
  const volume24hKSh = 384200000; // KSh 384.2M

  const displayVolume =
    currentCurrency === 'KSh'
      ? 'KSh 384.2M'
      : formatCurrency(volume24hKSh, currentCurrency);

  return (
    <section
      id="telemetry-ticker-bar"
      onClick={onOpenVaultProtocol}
      className="flex items-center justify-between bg-surface-container-low px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:bg-surface-container transition-colors"
      title="Click to view MOTOVEX Escrow Vault Protocol"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed-dim opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-fixed-dim"></span>
        </span>
        <span className="font-label-code text-secondary-fixed-dim uppercase tracking-wider truncate text-[11px]">
          Escrow Node #4092 Active
        </span>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0 text-text-muted text-xs">
        <span className="font-label-code text-on-surface">24h Vol:</span>
        <span className="font-label-numeric text-text-high-contrast font-semibold text-xs">
          {displayVolume}
        </span>
      </div>
    </section>
  );
};
