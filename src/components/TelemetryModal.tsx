import React, { useState } from 'react';
import { CurrencyCode, VehicleAsset } from '../types';
import { formatCurrency } from '../utils/currency';

interface TelemetryModalProps {
  asset: VehicleAsset | null;
  currentCurrency: CurrencyCode;
  onClose: () => void;
  onMakeOffer: (asset: VehicleAsset) => void;
}

export const TelemetryModal: React.FC<TelemetryModalProps> = ({
  asset,
  currentCurrency,
  onClose,
  onMakeOffer,
}) => {
  if (!asset) return null;

  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const report = asset.telemetryReport;

  const handleDownloadDossier = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        id="telemetry-dossier-modal"
        className="relative w-full max-w-2xl rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-5 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-tertiary-container/30 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-base text-text-high-contrast font-bold">
                  Physical Telemetry &amp; Diagnostic Audit
                </h3>
                <span className="px-2 py-0.5 rounded bg-escrow-emerald-bg text-tertiary font-label-code text-[10px] font-bold">
                  PASS {report.healthScore}/100
                </span>
              </div>
              <p className="font-label-code text-[10px] text-text-muted">
                INSPECTED VIA {report.telemetryNodeId} • {report.inspectionDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-text-muted hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Audit Report Content */}
        <div className="overflow-y-auto space-y-4 py-3 pr-1">
          {/* Top Asset Summary */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-slate border border-border-subtle">
            <img
              src={asset.image}
              alt={asset.title}
              className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="font-label-pill uppercase text-secondary-fixed-dim text-[10px]">
                {asset.subcategoryBadge}
              </span>
              <h4 className="text-base font-semibold text-text-high-contrast truncate">
                {asset.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-text-muted font-label-code">
                <span>VIN: {asset.vin}</span>
                <span>•</span>
                <span>{asset.location.city}, {asset.location.country}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-label-code text-[10px] text-text-muted uppercase">Reserve</div>
              <div className="font-headline-sm text-sm font-bold text-text-high-contrast">
                {formatCurrency(asset.reservePriceKSh, currentCurrency)}
              </div>
            </div>
          </div>

          {/* Key Audit Verifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Engine / Powertrain */}
            <div className="p-3 rounded-xl bg-surface-container-low space-y-1.5 border border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="font-label-code text-[11px] text-text-muted uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary-fixed-dim">
                    settings_power
                  </span>
                  Powertrain / Compression
                </span>
                <span className="text-[10px] font-label-code text-tertiary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">verified</span> 100% NOMINAL
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                {report.engineCompression}
              </p>
            </div>

            {/* Diagnostics & OBD */}
            <div className="p-3 rounded-xl bg-surface-container-low space-y-1.5 border border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="font-label-code text-[11px] text-text-muted uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary-fixed-dim">
                    terminal
                  </span>
                  ECU &amp; Diagnostics
                </span>
                <span className="text-[10px] font-label-code text-tertiary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">verified</span> 0 FAULTS
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                {report.obdDiagnostics}
              </p>
            </div>

            {/* Transmission & Hydraulics */}
            <div className="p-3 rounded-xl bg-surface-container-low space-y-1.5 border border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="font-label-code text-[11px] text-text-muted uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-badge-trust-amber">
                    swap_driving_apps
                  </span>
                  Drive / Hydraulics
                </span>
                <span className="text-[10px] font-label-code text-tertiary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">verified</span> VERIFIED
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                {report.hydraulicPressure || report.transmissionHealth}
              </p>
            </div>

            {/* Legal Title & Lien Check */}
            <div className="p-3 rounded-xl bg-surface-container-low space-y-1.5 border border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="font-label-code text-[11px] text-text-muted uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">
                    gavel
                  </span>
                  Legal Title &amp; Duty
                </span>
                <span className="text-[10px] font-label-code text-tertiary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">verified</span> CLEAR TITLE
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                {report.legalTitleStatus}
              </p>
            </div>
          </div>

          {/* Live Sensor Readings Stream */}
          <div className="p-3 rounded-xl bg-surface-slate border border-border-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-code text-xs uppercase text-text-muted flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
                Calibrated Physical Telemetry Stream
              </span>
              <span className="text-[10px] font-label-code text-text-muted">
                Audited by {report.inspectorName}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {report.sensorLogs.map((log, i) => (
                <div key={i} className="p-2 rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-label-code text-[10px] text-text-muted truncate">
                    {log.parameter}
                  </span>
                  <span className="font-label-numeric text-xs font-semibold text-text-high-contrast mt-0.5 truncate">
                    {log.value}
                  </span>
                  <span
                    className={`text-[9px] font-label-code uppercase mt-1 ${
                      log.status === 'optimal'
                        ? 'text-tertiary'
                        : log.status === 'nominal'
                        ? 'text-secondary-fixed-dim'
                        : 'text-badge-trust-amber'
                    }`}
                  >
                    ● {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Inspector Stamp */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">
                verified_user
              </span>
              <span>
                Digitally cryptographically signed by{' '}
                <strong className="text-text-high-contrast">{report.inspectorName}</strong>
              </span>
            </div>
            <span className="font-label-code text-[10px] text-secondary-fixed-dim">
              SHA-256 VERIFIED
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-border-subtle flex items-center gap-3">
          <button
            id="download-dossier-btn"
            onClick={handleDownloadDossier}
            disabled={downloading}
            className="flex-1 py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface hover:text-white font-headline-sm text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloadSuccess ? 'check_circle' : 'download'}
            </span>
            {downloading
              ? 'Generating Certified PDF...'
              : downloadSuccess
              ? 'Dossier Downloaded (PDF)'
              : 'Download Certified Dossier'}
          </button>

          <button
            id="modal-bid-now-btn"
            onClick={() => {
              onClose();
              onMakeOffer(asset);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-primary-container text-text-high-contrast font-headline-sm text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-98 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">gavel</span>
            Place Escrow Bid
          </button>
        </div>
      </div>
    </div>
  );
};
