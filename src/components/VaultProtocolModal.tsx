import React from 'react';

interface VaultProtocolModalProps {
  onClose: () => void;
}

export const VaultProtocolModal: React.FC<VaultProtocolModalProps> = ({ onClose }) => {
  const steps = [
    {
      num: '01',
      title: 'Institutional Capital Lock',
      badge: 'TIER-3 VAULT',
      desc: 'Buyer funds are deposited into segregated institutional escrow custody (under Central Bank/Regulatory oversight). Neither buyer nor seller can unilaterally withdraw funds.',
      icon: 'lock',
    },
    {
      num: '02',
      title: 'On-Site Telemetry & Physical Audit',
      badge: 'SAE-CERTIFIED',
      desc: 'Certified MOTOVEX field inspectors deploy specialized CAN-bus diagnostics, hydraulic flow meters, ultrasonic hull moisture gauges, and paint depth analysis at the asset location.',
      icon: 'precision_manufacturing',
    },
    {
      num: '03',
      title: 'Registry Title & Duty Clearance',
      badge: 'LEGAL HANDOVER',
      desc: 'Logbooks, bills of lading, corporate resolutions, and tax authority duty clearances are verified and transferred into escrow holding.',
      icon: 'gavel',
    },
    {
      num: '04',
      title: '48-Hour Acceptance & Capital Release',
      badge: 'ZERO RISK',
      desc: 'Buyer receives the vehicle with a 48-hour mechanical verification window. Once signed off, escrow capital is disbursed instantly to the seller with zero counterparty risk.',
      icon: 'verified',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-5 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-tertiary-container/30 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </span>
            <div>
              <h3 className="font-headline-sm text-base text-text-high-contrast font-bold">
                MOTOVEX Tier-3 Escrow Protocol
              </h3>
              <p className="font-label-code text-[11px] text-text-muted">
                INSTITUTIONAL ZERO-COUNTERPARTY-RISK STANDARD
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

        {/* Protocol Steps */}
        <div className="overflow-y-auto space-y-3 py-3 pr-1">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-surface-slate border border-border-subtle flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-secondary-fixed-dim flex items-center justify-center flex-shrink-0 font-headline-sm text-sm font-bold">
                {step.num}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-headline-sm text-sm text-text-high-contrast font-semibold">
                    {step.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-escrow-emerald-bg text-tertiary font-label-pill text-[9px] font-bold">
                    {step.badge}
                  </span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Node Security Callout */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-secondary-fixed-dim/20 space-y-1">
            <div className="flex items-center gap-1.5 text-secondary-fixed-dim font-label-code text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px]">lan</span>
              <span>Distributed Escrow Nodes</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Every transaction is logged across regional escrow nodes (Nairobi, Mombasa, Eldoret, Nakuru) ensuring sovereign legal compliance and high-availability digital verification.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border-subtle flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-primary-container text-white font-headline-sm text-xs font-bold shadow-md hover:opacity-95 cursor-pointer"
          >
            I Understand the Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
