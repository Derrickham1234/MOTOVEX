import React from 'react';
import { CurrencyCode } from '../types';
import { formatCurrency } from '../utils/currency';
import { UserProfile } from './LoginPage';

interface ProfileViewProps {
  currentCurrency: CurrencyCode;
  currentUser?: UserProfile;
  onOpenVaultProtocol: () => void;
  onOpenSell: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToRegister?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentCurrency,
  currentUser,
  onOpenVaultProtocol,
  onOpenSell,
  onNavigateToLogin,
  onNavigateToRegister,
}) => {
  const user = currentUser || {
    name: 'David Kimani',
    role: 'Fleet Director',
    organization: 'Apex Mining & Logistics Ltd',
    institutionalId: 'MTVX-CORP-09824',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBB02MBfIJGF4fw4kua1jE45PwJUHBil1qynkgpo5zezMEJ5h4dmNB2RkCHHwQTVMOcJRsFxDI1AjIAwMKD2nN-2vr0f1daAN8TofR_Xq_ZYQvKJ61hA6_LC0DFV7E-FWT5WZ6fzlYWB42cK9ghufiItTxQdaU29meUfnAFkf3kBOmxU-MBedmgIV2Hb0BhQrGKTSY90CeebZe4UP-q1lu-v3u6F2EMpAZDvARuy1lE5xwg6jZDA3-Qyw',
    kycLevel: 'TIER-3 KYC',
    custodyCreditLineKSh: 45000000,
  };

  const custodyBalanceKSh = user.custodyCreditLineKSh;

  return (
    <div className="flex flex-col w-full space-y-4 pb-20">
      {/* User Identity Card */}
      <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="relative w-14 h-14 flex-shrink-0">
              <img
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-border-active"
                src={user.avatar}
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-surface-container-lowest flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[15px] font-bold">
                  verified
                </span>
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-base text-text-high-contrast font-bold truncate">
                  {user.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-escrow-emerald-bg text-tertiary font-label-pill text-[10px] font-bold">
                  {user.kycLevel}
                </span>
              </div>
              <p className="text-xs text-text-muted truncate">
                {user.role} • {user.organization}
              </p>
              <p className="font-label-code text-[11px] text-secondary-fixed-dim mt-0.5">
                INSTITUTIONAL ID: {user.institutionalId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {onNavigateToRegister && (
              <button
                onClick={onNavigateToRegister}
                title="Register New Institutional Entity"
                className="px-2.5 py-1.5 rounded-lg bg-surface-slate hover:bg-secondary-fixed-dim/20 text-xs font-label-code text-secondary-fixed-dim border border-secondary-fixed-dim/30 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">person_add</span>
                <span className="hidden sm:inline">Register</span>
              </button>
            )}

            {onNavigateToLogin && (
              <button
                onClick={onNavigateToLogin}
                title="Switch Account or Login"
                className="px-2.5 py-1.5 rounded-lg bg-surface-slate hover:bg-surface-container text-xs font-label-code text-text-muted hover:text-white border border-border-subtle flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">logout</span>
                <span className="hidden sm:inline">Switch</span>
              </button>
            )}
          </div>
        </div>

        {/* Custody Balance */}
        <div className="p-4 rounded-xl bg-surface-slate border border-border-subtle flex items-center justify-between">
          <div>
            <span className="font-label-code text-[10px] text-text-muted uppercase">
              Escrow Custody Credit Line
            </span>
            <div className="font-headline-sm text-xl font-bold text-text-high-contrast">
              {formatCurrency(custodyBalanceKSh, currentCurrency)}
            </div>
            <span className="text-[11px] text-tertiary font-label-code">
              ● Segregated Bank Custody Active
            </span>
          </div>
          <button
            onClick={onOpenVaultProtocol}
            className="px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-secondary-fixed-dim text-xs font-label-code font-bold cursor-pointer"
          >
            Vault Specs
          </button>
        </div>
      </div>

      {/* Institutional Assets in Custody */}
      <div className="p-4 rounded-xl bg-surface-card border border-border-subtle space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-label-code text-xs uppercase text-text-muted">
            Digital Title Vault Holdings
          </span>
          <span className="font-label-code text-xs text-secondary-fixed-dim">
            2 Registered Assets
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-lg bg-surface-slate flex items-center justify-between">
            <div>
              <div className="font-semibold text-text-high-contrast">
                CAT 320 Hydraulic Excavator
              </div>
              <div className="text-[11px] text-text-muted font-label-code">
                Title #LOG-NTSA-88129 • Eldoret Yard
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-escrow-emerald-bg text-tertiary font-label-code text-[10px] font-bold">
              CLEARED
            </span>
          </div>

          <div className="p-3 rounded-lg bg-surface-slate flex items-center justify-between">
            <div>
              <div className="font-semibold text-text-high-contrast">
                Toyota Land Cruiser GR Sport
              </div>
              <div className="text-[11px] text-text-muted font-label-code">
                Title #LOG-NTSA-44910 • Nairobi Staging
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-surface-container text-secondary-fixed-dim font-label-code text-[10px] font-bold">
              IN ESCROW
            </span>
          </div>
        </div>

        <button
          onClick={onOpenSell}
          className="w-full py-2.5 rounded-lg bg-primary-container text-white text-xs font-headline-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
        >
          <span className="material-symbols-outlined text-[18px]">add_box</span>
          List Another Corporate Vehicle
        </button>
      </div>

      {/* Network & Node Status */}
      <div className="p-4 rounded-xl bg-surface-card border border-border-subtle space-y-2">
        <span className="font-label-code text-xs uppercase text-text-muted">
          Regional Escrow Node Connectivity
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs font-label-code">
          <div className="p-2.5 rounded-lg bg-surface-slate">
            <span className="text-text-muted block text-[10px]">ACTIVE NODE</span>
            <span className="text-text-high-contrast font-bold">NODE-NRB-4092</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-slate">
            <span className="text-text-muted block text-[10px]">CONSENSUS UPTIME</span>
            <span className="text-tertiary font-bold">99.98% Institutional</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-slate">
            <span className="text-text-muted block text-[10px]">CAN-BUS TELEMETRY</span>
            <span className="text-secondary-fixed-dim font-bold">SAE J1939 Compliant</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-slate">
            <span className="text-text-muted block text-[10px]">SETTLEMENT SPEED</span>
            <span className="text-text-high-contrast font-bold">T+0 Real-Time RTGS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
