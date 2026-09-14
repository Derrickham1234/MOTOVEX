import React, { useState } from 'react';
import { CurrencyCode } from '../types';

export interface UserProfile {
  name: string;
  role: string;
  organization: string;
  institutionalId: string;
  avatar: string;
  kycLevel: string;
  custodyCreditLineKSh: number;
}

export const DEMO_PROFILES: Record<string, UserProfile> = {
  david: {
    name: 'David Kimani',
    role: 'Fleet Director',
    organization: 'Apex Mining & Logistics Ltd',
    institutionalId: 'MTVX-CORP-09824',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBB02MBfIJGF4fw4kua1jE45PwJUHBil1qynkgpo5zezMEJ5h4dmNB2RkCHHwQTVMOcJRsFxDI1AjIAwMKD2nN-2vr0f1daAN8TofR_Xq_ZYQvKJ61hA6_LC0DFV7E-FWT5WZ6fzlYWB42cK9ghufiItTxQdaU29meUfnAFkf3kBOmxU-MBedmgIV2Hb0BhQrGKTSY90CeebZe4UP-q1lu-v3u6F2EMpAZDvARuy1lE5xwg6jZDA3-Qyw',
    kycLevel: 'TIER-3 KYC',
    custodyCreditLineKSh: 45000000,
  },
  elena: {
    name: 'Elena Rostova',
    role: 'Chief Equipment Broker',
    organization: 'Sahara Heavy Plant & Machinery',
    institutionalId: 'MTVX-DEALER-77120',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    kycLevel: 'TIER-3 DEALER',
    custodyCreditLineKSh: 82000000,
  },
  kipchoge: {
    name: 'Kipchoge Tarus',
    role: 'Senior Field Telemetry Inspector',
    organization: 'MOTOVEX Diagnostic Node #4092',
    institutionalId: 'MTVX-AUDITOR-00409',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    kycLevel: 'CERTIFIED AUDITOR',
    custodyCreditLineKSh: 15000000,
  },
};

interface LoginPageProps {
  currentCurrency: CurrencyCode;
  currentUser: UserProfile;
  onLoginSuccess: (profile: UserProfile) => void;
  onNavigateToRegister?: () => void;
  onCancel: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onCancel,
}) => {
  const [authMethod, setAuthMethod] = useState<'credentials' | 'hardware'>('credentials');
  const [selectedPreset, setSelectedPreset] = useState<'david' | 'elena' | 'kipchoge'>('david');
  const [email, setEmail] = useState('david.kimani@apexlogistics.co.ke');
  const [password, setPassword] = useState('••••••••••••••••');
  const [twoFactorCode, setTwoFactorCode] = useState('409-218');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [hardwareScanning, setHardwareScanning] = useState(false);
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handlePresetSelect = (presetKey: 'david' | 'elena' | 'kipchoge') => {
    setSelectedPreset(presetKey);
    if (presetKey === 'david') {
      setEmail('david.kimani@apexlogistics.co.ke');
      setTwoFactorCode('409-218');
    } else if (presetKey === 'elena') {
      setEmail('elena.rostova@saharaplant.com');
      setTwoFactorCode('771-042');
    } else {
      setEmail('k.tarus@motovex-node.org');
      setTwoFactorCode('883-910');
    }
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess(DEMO_PROFILES[selectedPreset]);
      }, 700);
    }, 900);
  };

  const handleHardwareKeyAuth = () => {
    setHardwareScanning(true);
    setTimeout(() => {
      setHardwareScanning(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess(DEMO_PROFILES[selectedPreset]);
      }, 700);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto py-4 sm:py-8 space-y-6 animate-fade-in">
      {/* Back button & Register shortcut */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs font-label-code text-text-muted hover:text-white transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Marketplace</span>
        </button>

        {onNavigateToRegister && (
          <button
            onClick={onNavigateToRegister}
            className="flex items-center gap-1 text-xs font-bold text-secondary-fixed-dim hover:underline cursor-pointer"
          >
            <span>Create Account</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        )}
      </div>

      {/* Main Login Card */}
      <div className="rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-6 sm:p-7 space-y-6 relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary-fixed-dim/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand & Emblem */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-container-high border border-secondary-fixed-dim/40 text-secondary-fixed-dim shadow-[0_0_25px_rgba(0,219,233,0.2)]">
            <span className="material-symbols-outlined text-[32px]">shield_lock</span>
          </div>

          <div>
            <h2 className="font-headline-sm text-xl text-text-high-contrast font-bold tracking-tight">
              Institutional Portal Login
            </h2>
            <p className="font-label-code text-xs text-text-muted mt-1">
              TIER-3 ESCROW VAULT &amp; TELEMETRY ACCESS
            </p>
          </div>
        </div>

        {/* Auth Method Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-surface-slate border border-border-subtle text-xs font-label-code">
          <button
            type="button"
            onClick={() => setAuthMethod('credentials')}
            className={`py-2 px-3 rounded-lg text-center font-semibold transition-all cursor-pointer ${
              authMethod === 'credentials'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted hover:text-white'
            }`}
          >
            Corporate ID
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('hardware')}
            className={`py-2 px-3 rounded-lg text-center font-semibold transition-all cursor-pointer ${
              authMethod === 'hardware'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted hover:text-white'
            }`}
          >
            Hardware Key / FIDO2
          </button>
        </div>

        {/* Quick Demo Role Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-label-code text-[10px] text-text-muted uppercase">
              Select Institutional Identity:
            </span>
            <span className="font-label-code text-[10px] text-secondary-fixed-dim font-bold">
              1-Click Autofill
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handlePresetSelect('david')}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                selectedPreset === 'david'
                  ? 'bg-surface-slate border-secondary-fixed-dim text-white shadow-sm'
                  : 'bg-surface-container-low border-border-subtle text-text-muted hover:bg-surface-slate'
              }`}
            >
              <div className="font-bold text-[11px] truncate">David Kimani</div>
              <div className="text-[9px] text-text-muted truncate">Fleet Director</div>
            </button>

            <button
              type="button"
              onClick={() => handlePresetSelect('elena')}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                selectedPreset === 'elena'
                  ? 'bg-surface-slate border-secondary-fixed-dim text-white shadow-sm'
                  : 'bg-surface-container-low border-border-subtle text-text-muted hover:bg-surface-slate'
              }`}
            >
              <div className="font-bold text-[11px] truncate">Elena Rostova</div>
              <div className="text-[9px] text-text-muted truncate">Machinery Dealer</div>
            </button>

            <button
              type="button"
              onClick={() => handlePresetSelect('kipchoge')}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                selectedPreset === 'kipchoge'
                  ? 'bg-surface-slate border-secondary-fixed-dim text-white shadow-sm'
                  : 'bg-surface-container-low border-border-subtle text-text-muted hover:bg-surface-slate'
              }`}
            >
              <div className="font-bold text-[11px] truncate">K. Tarus</div>
              <div className="text-[9px] text-text-muted truncate">Node Auditor</div>
            </button>
          </div>
        </div>

        {/* METHOD 1: Credentials Form */}
        {authMethod === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            {/* Corporate Email */}
            <div className="space-y-1.5">
              <label className="font-label-code text-xs uppercase text-text-muted flex items-center justify-between">
                <span>Corporate Email / Trader Handle</span>
                <span className="text-[10px] text-secondary-fixed-dim">
                  {DEMO_PROFILES[selectedPreset].institutionalId}
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[18px]">
                  alternate_email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="trader@institution.com"
                  className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2.5 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                />
              </div>
            </div>

            {/* Custody Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-code text-xs uppercase text-text-muted">
                  Custody Key Passphrase
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Institutional password resets require physical KYC token verification with Escrow Node Desk.');
                  }}
                  className="font-label-code text-[10px] text-text-muted hover:text-secondary-fixed-dim"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[18px]">
                  key
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2.5 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                />
              </div>
            </div>

            {/* 2FA One-Time Passcode */}
            <div className="space-y-1.5">
              <label className="font-label-code text-xs uppercase text-text-muted flex items-center justify-between">
                <span>Escrow Authenticator (2FA OTP)</span>
                <span className="text-[10px] text-tertiary">Hardware Synced</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[18px]">
                  pin
                </span>
                <input
                  type="text"
                  required
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="000-000"
                  className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2.5 text-xs font-label-code text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim tracking-widest"
                />
              </div>
            </div>

            {/* Remember terminal check */}
            <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={rememberTerminal}
                onChange={(e) => setRememberTerminal(e.target.checked)}
                className="w-4 h-4 accent-secondary-fixed-dim rounded"
              />
              <span>Remember this secure workstation for 30 days</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAuthenticating || authSuccess}
              className="w-full py-3 px-4 rounded-xl bg-primary-container hover:bg-primary text-white font-headline-sm text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              {authSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    verified_user
                  </span>
                  <span>Session Authenticated</span>
                </>
              ) : isAuthenticating ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    sync
                  </span>
                  <span>Verifying Node Signatures...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>Sign In to MOTOVEX Terminal</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* METHOD 2: Hardware Key Auth */}
        {authMethod === 'hardware' && (
          <div className="py-4 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-surface-slate border border-secondary-fixed-dim/40 mx-auto flex items-center justify-center relative">
              <span className="material-symbols-outlined text-[36px] text-secondary-fixed-dim">
                fingerprint
              </span>
              {hardwareScanning && (
                <span className="absolute inset-0 rounded-full border-2 border-secondary-fixed-dim animate-ping"></span>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-text-high-contrast">
                Hardware Token / WebAuthn
              </h4>
              <p className="text-xs text-text-muted max-w-xs mx-auto">
                Insert your YubiKey or press your biometric security sensor to verify your institutional custody signature.
              </p>
            </div>

            <button
              type="button"
              onClick={handleHardwareKeyAuth}
              disabled={hardwareScanning || authSuccess}
              className="w-full py-3 px-4 rounded-xl bg-primary-container hover:bg-primary text-white font-headline-sm text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {authSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    check_circle
                  </span>
                  <span>Hardware Key Verified</span>
                </>
              ) : hardwareScanning ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    sensors
                  </span>
                  <span>Scanning Token...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">usb</span>
                  <span>Touch Security Key</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Institutional Safeguards Footer */}
        <div className="pt-4 border-t border-border-subtle text-center space-y-2">
          <p className="font-label-code text-[10px] text-text-muted flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-tertiary">
              lock
            </span>
            <span>Segregated Tier-3 Escrow Vault • TLS 1.3 Strict Node</span>
          </p>
          <div className="text-xs text-text-muted">
            New enterprise or broker entity?{' '}
            <button
              type="button"
              onClick={() => {
                if (onNavigateToRegister) {
                  onNavigateToRegister();
                }
              }}
              className="text-secondary-fixed-dim font-bold hover:underline cursor-pointer"
            >
              Register for Tier-3 KYC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
