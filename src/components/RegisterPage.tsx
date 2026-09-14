import React, { useState } from 'react';
import { CurrencyCode } from '../types';
import { UserProfile } from './LoginPage';

interface RegisterPageProps {
  currentCurrency: CurrencyCode;
  onRegisterSuccess: (profile: UserProfile) => void;
  onNavigateToLogin: () => void;
  onCancel: () => void;
}

type AccountType = 'enterprise' | 'dealer' | 'private';
type KycTier = 'tier1' | 'tier2' | 'tier3';

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
  onCancel,
}) => {
  // Account Form State
  const [accountType, setAccountType] = useState<AccountType>('enterprise');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+254');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [roleTitle, setRoleTitle] = useState('Procurement Lead');
  const [jurisdiction, setJurisdiction] = useState('Kenya');
  const [taxId, setTaxId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [kycTier, setKycTier] = useState<KycTier>('tier3');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [enable2FA, setEnable2FA] = useState(true);

  // Status & Validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Quick fill demo sample
  const handlePrefillDemo = (type: AccountType) => {
    setAccountType(type);
    if (type === 'enterprise') {
      setFullName('Grace Mwangi');
      setEmail('g.mwangi@riftvalleylogistics.co.ke');
      setPhoneCountryCode('+254');
      setPhoneNumber('722 849 102');
      setOrganization('Rift Valley Logistics Consortia');
      setRoleTitle('Head of Fleet Operations');
      setJurisdiction('Kenya');
      setTaxId('P051938210M');
      setPassword('SecureVaultPass#2026');
      setConfirmPassword('SecureVaultPass#2026');
      setKycTier('tier3');
    } else if (type === 'dealer') {
      setFullName('Tariq Al-Mansoor');
      setEmail('tariq@gulfmachinerytraders.ae');
      setPhoneCountryCode('+971');
      setPhoneNumber('50 829 4410');
      setOrganization('Gulf Heavy Plant & Machinery LLC');
      setRoleTitle('Commercial Director');
      setJurisdiction('UAE');
      setTaxId('TRN-100492817200003');
      setPassword('GulfHeavyPlant2026!');
      setConfirmPassword('GulfHeavyPlant2026!');
      setKycTier('tier2');
    } else {
      setFullName('Samuel Ochieng');
      setEmail('samuel.o@nairobihighlands.com');
      setPhoneCountryCode('+254');
      setPhoneNumber('711 394 582');
      setOrganization('Highland Agritech Enterprises');
      setRoleTitle('Managing Director');
      setJurisdiction('Kenya');
      setTaxId('A009284719K');
      setPassword('AgriTrader2026*');
      setConfirmPassword('AgriTrader2026*');
      setKycTier('tier1');
    }
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim() || !email.trim()) {
      setErrorMessage('Full name and email are required.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Custody passphrase must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entries.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage('You must acknowledge the MOTOVEX Escrow & Telemetry Protocols.');
      return;
    }

    setIsSubmitting(true);

    // Simulate node registration & cryptographic signature generation
    setTimeout(() => {
      setIsSubmitting(false);
      setRegistrationComplete(true);

      // Generate random institutional ID
      const randomId = Math.floor(10000 + Math.random() * 90000);
      const prefix =
        accountType === 'enterprise'
          ? 'MTVX-CORP'
          : accountType === 'dealer'
          ? 'MTVX-DEALER'
          : 'MTVX-PRIV';

      const kycLevel =
        kycTier === 'tier3'
          ? 'TIER-3 KYC'
          : kycTier === 'tier2'
          ? 'TIER-2 DEALER'
          : 'TIER-1 VERIFIED';

      const custodyCreditLineKSh =
        kycTier === 'tier3' ? 65000000 : kycTier === 'tier2' ? 35000000 : 8000000;

      const newProfile: UserProfile = {
        name: fullName,
        role: roleTitle || (accountType === 'enterprise' ? 'Fleet Operator' : 'Equipment Trader'),
        organization: organization || 'Private Institutional Entity',
        institutionalId: `${prefix}-${randomId}`,
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        kycLevel,
        custodyCreditLineKSh,
      };

      setTimeout(() => {
        onRegisterSuccess(newProfile);
      }, 900);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto py-4 sm:py-6 space-y-6 animate-fade-in">
      {/* Top Breadcrumb / Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs font-label-code text-text-muted hover:text-white transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Already registered?</span>
          <button
            onClick={onNavigateToLogin}
            className="text-xs font-bold text-secondary-fixed-dim hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Sign In</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-28 -right-28 w-64 h-64 bg-secondary-fixed-dim/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Branding */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-secondary-fixed-dim/40 text-secondary-fixed-dim flex items-center justify-center shadow-[0_0_20px_rgba(0,219,233,0.2)] flex-shrink-0">
              <span className="material-symbols-outlined text-[28px]">how_to_reg</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-xl text-text-high-contrast font-bold tracking-tight">
                Create Trader Account
              </h2>
              <p className="font-label-code text-xs text-text-muted mt-0.5">
                TIER-3 ESCROW VAULT &amp; TELEMETRY ACCESS
              </p>
            </div>
          </div>

          {/* Node Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-slate border border-secondary-fixed-dim/30 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
            <span className="font-label-code text-[10px] text-secondary-fixed-dim font-bold uppercase">
              Escrow Node #4092 Online
            </span>
          </div>
        </div>

        {/* Quick autofill for demonstration */}
        <div className="p-3 rounded-xl bg-surface-slate border border-border-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-label-code">
            <span className="text-text-muted">Sample Institutional Profiles:</span>
            <span className="text-[10px] text-secondary-fixed-dim font-bold">Click to Autofill</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handlePrefillDemo('enterprise')}
              className="py-1.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-text-muted hover:text-white border border-border-subtle text-[11px] font-semibold text-center transition-colors cursor-pointer"
            >
              Enterprise Fleet
            </button>
            <button
              type="button"
              onClick={() => handlePrefillDemo('dealer')}
              className="py-1.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-text-muted hover:text-white border border-border-subtle text-[11px] font-semibold text-center transition-colors cursor-pointer"
            >
              Machinery Dealer
            </button>
            <button
              type="button"
              onClick={() => handlePrefillDemo('private')}
              className="py-1.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-text-muted hover:text-white border border-border-subtle text-[11px] font-semibold text-center transition-colors cursor-pointer"
            >
              Private Buyer
            </button>
          </div>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-red-400 text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Account Type Selection */}
          <div className="space-y-2">
            <label className="font-label-code text-xs uppercase text-text-muted block">
              1. Select Entity Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setAccountType('enterprise')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  accountType === 'enterprise'
                    ? 'bg-surface-slate border-secondary-fixed-dim text-white shadow-sm ring-1 ring-secondary-fixed-dim/50'
                    : 'bg-surface-container-low border-border-subtle text-text-muted hover:bg-surface-slate'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed-dim mb-1 block">
                  domain
                </span>
                <div className="font-bold text-xs">Enterprise Fleet</div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Mining, logistics, municipal &amp; commercial transport
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('dealer')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  accountType === 'dealer'
                    ? 'bg-surface-slate border-secondary-fixed-dim text-white shadow-sm ring-1 ring-secondary-fixed-dim/50'
                    : 'bg-surface-container-low border-border-subtle text-text-muted hover:bg-surface-slate'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed-dim mb-1 block">
                  storefront
                </span>
                <div className="font-bold text-xs">Licensed Dealer</div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Certified heavy plant, machinery &amp; auto dealership
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('private')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  accountType === 'private'
                    ? 'bg-surface-slate border-secondary-fixed-dim text-white shadow-sm ring-1 ring-secondary-fixed-dim/50'
                    : 'bg-surface-container-low border-border-subtle text-text-muted hover:bg-surface-slate'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed-dim mb-1 block">
                  person
                </span>
                <div className="font-bold text-xs">Individual Buyer</div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Private collectors, single asset buyers &amp; operators
                </div>
              </button>
            </div>
          </div>

          {/* STEP 2: Personal & Identity Details */}
          <div className="space-y-3">
            <label className="font-label-code text-xs uppercase text-text-muted block">
              2. Trader Identification &amp; Contact
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Legal Name */}
              <div className="space-y-1">
                <label className="text-[11px] text-text-muted">Full Legal Name / Designated Officer</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[17px]">
                    badge
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Grace Mwangi"
                    className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                  />
                </div>
              </div>

              {/* Corporate Email */}
              <div className="space-y-1">
                <label className="text-[11px] text-text-muted">Institutional or Business Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[17px]">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@company.com"
                    className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                  />
                </div>
              </div>
            </div>

            {/* Phone Number with Country Code */}
            <div className="space-y-1">
              <label className="text-[11px] text-text-muted">Secure Mobile / Escrow SMS Channel</label>
              <div className="flex gap-2">
                <select
                  value={phoneCountryCode}
                  onChange={(e) => setPhoneCountryCode(e.target.value)}
                  className="bg-surface-slate border border-border-subtle rounded-xl px-2.5 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim font-label-code"
                >
                  <option value="+254">+254 (KE)</option>
                  <option value="+971">+971 (AE)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+1">+1 (US/CA)</option>
                  <option value="+27">+27 (ZA)</option>
                  <option value="+81">+81 (JP)</option>
                  <option value="+49">+49 (DE)</option>
                </select>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[17px]">
                    call
                  </span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="712 345 678"
                    className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim font-label-code"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: Company / Organization Details */}
          <div className="space-y-3">
            <label className="font-label-code text-xs uppercase text-text-muted block">
              3. Organization &amp; Commercial Entity
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Organization Name */}
              <div className="space-y-1">
                <label className="text-[11px] text-text-muted">Company / Enterprise Registered Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[17px]">
                    business
                  </span>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Apex Mining & Logistics Ltd"
                    className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                  />
                </div>
              </div>

              {/* Designated Title */}
              <div className="space-y-1">
                <label className="text-[11px] text-text-muted">Official Officer Title</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[17px]">
                    work
                  </span>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="Fleet Director / Trader"
                    className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Jurisdiction */}
              <div className="space-y-1">
                <label className="text-[11px] text-text-muted">Registration Jurisdiction</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[17px]">
                    public
                  </span>
                  <select
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                  >
                    <option value="Kenya">Kenya (East Africa Hub)</option>
                    <option value="UAE">United Arab Emirates (Dubai Freezone)</option>
                    <option value="United Kingdom">United Kingdom (FCA Compliant)</option>
                    <option value="United States">United States (Delaware / NY)</option>
                    <option value="South Africa">South Africa (SADC Hub)</option>
                    <option value="Germany">Germany (EU Central)</option>
                    <option value="Japan">Japan (Export Node)</option>
                  </select>
                </div>
              </div>

              {/* Tax PIN / Commercial Reg */}
              <div className="space-y-1">
                <label className="text-[11px] text-text-muted">KRA PIN / Commercial Registry No.</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[17px]">
                    receipt_long
                  </span>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="P051294821M"
                    className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim font-label-code uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4: KYC Vault Tier Selection */}
          <div className="space-y-2">
            <label className="font-label-code text-xs uppercase text-text-muted block">
              4. Desired Escrow Vault Clearance Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setKycTier('tier1')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  kycTier === 'tier1'
                    ? 'bg-surface-slate border-tertiary text-white shadow-sm'
                    : 'bg-surface-container-low border-border-subtle text-text-muted hover:bg-surface-slate'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-tertiary">Tier-1 Digital</span>
                  <span className="text-[10px] text-text-muted font-label-code">$50K Limit</span>
                </div>
                <div className="text-[10px] text-text-muted">
                  Instant digital ID verification for single-vehicle buys.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setKycTier('tier2')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  kycTier === 'tier2'
                    ? 'bg-surface-slate border-secondary-fixed-dim text-white shadow-sm'
                    : 'bg-surface-container-low border-border-subtle text-text-muted hover:bg-surface-slate'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-secondary-fixed-dim">Tier-2 Dealer</span>
                  <span className="text-[10px] text-text-muted font-label-code">$250K Limit</span>
                </div>
                <div className="text-[10px] text-text-muted">
                  Commercial dealer license verification for multi-unit batch offers.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setKycTier('tier3')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  kycTier === 'tier3'
                    ? 'bg-surface-slate border-secondary-fixed-dim text-white shadow-sm ring-1 ring-secondary-fixed-dim/40'
                    : 'bg-surface-container-low border-border-subtle text-text-muted hover:bg-surface-slate'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-secondary-fixed-dim">Tier-3 Institutional</span>
                  <span className="text-[10px] text-text-muted font-label-code">Unlimited</span>
                </div>
                <div className="text-[10px] text-text-muted">
                  Segregated bank vault escrow with custom liquidity credit lines.
                </div>
              </button>
            </div>
          </div>

          {/* STEP 5: Security Passphrase */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-label-code text-xs uppercase text-text-muted">
                5. Escrow Custody Passphrase
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-secondary-fixed-dim hover:underline cursor-pointer"
              >
                {showPassword ? 'Hide Passphrase' : 'Show Passphrase'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[17px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Master Passphrase (min 8 chars)"
                  className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-2.5 text-text-muted material-symbols-outlined text-[17px]">
                  lock_reset
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Passphrase"
                  className="w-full bg-surface-slate border border-border-subtle rounded-xl pl-9 pr-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
                />
              </div>
            </div>
          </div>

          {/* Verification & Safeguards Toggles */}
          <div className="p-3.5 rounded-xl bg-surface-slate border border-border-subtle space-y-2.5">
            <label className="flex items-start gap-2.5 text-xs text-text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-secondary-fixed-dim rounded"
              />
              <span>
                I agree to the <strong className="text-white">MOTOVEX Escrow Vault Rules</strong>, CAN-bus Telemetry Audit protocols, and standard 4-milestone deposit release procedures.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={(e) => setEnable2FA(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-secondary-fixed-dim rounded"
              />
              <span>
                Mandate Hardware 2FA Token (FIDO2 / YubiKey / WebAuthn) for institutional custody releases and large wire transactions.
              </span>
            </label>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting || registrationComplete}
            className="w-full py-3.5 px-4 rounded-xl bg-primary-container hover:bg-primary text-white font-headline-sm text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
          >
            {registrationComplete ? (
              <>
                <span className="material-symbols-outlined text-[19px] text-tertiary">
                  verified
                </span>
                <span>Account Created • Connecting to Escrow Vault...</span>
              </>
            ) : isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[19px] animate-spin">
                  sync
                </span>
                <span>Generating Cryptographic Keypair &amp; KYC File...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[19px]">app_registration</span>
                <span>Complete Registration &amp; Issue Institutional ID</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Security Badges */}
        <div className="pt-4 border-t border-border-subtle text-center space-y-2">
          <p className="font-label-code text-[10px] text-text-muted flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-tertiary">
              verified_user
            </span>
            <span>Segregated Tier-3 Escrow Vault • End-to-End Encrypted Telemetry • ISO 27001</span>
          </p>
          <div className="text-xs text-text-muted">
            Need dedicated fleet advisory or assistance?{' '}
            <a
              href="mailto:compliance@motovex-escrow.org"
              className="text-secondary-fixed-dim font-bold hover:underline"
            >
              Contact Compliance Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
