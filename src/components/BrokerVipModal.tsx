import React, { useState } from 'react';

interface BrokerVipModalProps {
  onClose: () => void;
}

export const BrokerVipModal: React.FC<BrokerVipModalProps> = ({ onClose }) => {
  const [requested, setRequested] = useState(false);

  const handleRequest = () => {
    setRequested(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-5 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-badge-trust-amber-bg text-badge-trust-amber flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </span>
            <div>
              <h3 className="font-headline-sm text-base text-text-high-contrast font-bold">
                MOTOVEX Broker VIP Program
              </h3>
              <p className="font-label-code text-[10px] text-text-muted">
                INSTITUTIONAL FLEET &amp; HEAVY PLANT LIQUIDATION
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

        {requested ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-tertiary-container text-tertiary flex items-center justify-center mx-auto animate-bounce">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h4 className="font-headline-sm text-base text-text-high-contrast font-bold">
              VIP Broker Desk Dispatched
            </h4>
            <p className="text-xs text-text-muted max-w-xs mx-auto">
              An institutional escrow specialist will contact your desk within 15 minutes to configure API batch ingestion and multi-asset custody agreements.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-3 overflow-y-auto">
            <div className="p-3.5 rounded-xl bg-surface-slate border border-border-subtle space-y-2">
              <span className="font-label-code text-xs uppercase text-secondary-fixed-dim block">
                Exclusive Institutional Privileges
              </span>
              <ul className="space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    done_all
                  </span>
                  Bulk fleet ingestion via CSV/API with automated VIN decode.
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    done_all
                  </span>
                  Dedicated on-site field telemetry team equipped with CAN-bus &amp; ultrasound tools.
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    done_all
                  </span>
                  Instant institutional escrow clearance with T+0 settlement.
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    done_all
                  </span>
                  Cross-border COMESA &amp; EAC transit corridor bond waiver.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div>
                <label className="font-label-code text-[11px] uppercase text-text-muted block mb-1">
                  Fleet Name / Organization
                </label>
                <input
                  type="text"
                  defaultValue="Apex Mining & Logistics Ltd"
                  className="w-full bg-surface-slate border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                />
              </div>
              <div>
                <label className="font-label-code text-[11px] uppercase text-text-muted block mb-1">
                  Asset Fleet Volume
                </label>
                <select className="w-full bg-surface-slate border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-high-contrast focus:outline-none">
                  <option>5 - 20 Heavy Machinery / Commercial Assets</option>
                  <option>20 - 100 Fleet Vehicles / Agri Tractors</option>
                  <option>100+ Enterprise Fleet Liquidation</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleRequest}
              className="w-full py-3 px-4 rounded-xl bg-primary-container text-white font-headline-sm text-xs font-bold shadow-md hover:opacity-95 cursor-pointer"
            >
              Connect with Senior Institutional Broker
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
