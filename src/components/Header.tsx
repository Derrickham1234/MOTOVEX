import React, { useState } from 'react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../utils/currency';
import { UserProfile } from './LoginPage';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  currentUser?: UserProfile;
  onSelectCurrency: (code: CurrencyCode) => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenLogin?: () => void;
  onOpenChat?: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  currentUser,
  onSelectCurrency,
  onOpenNotifications,
  onOpenProfile,
  onOpenLogin,
  onOpenChat,
  unreadCount = 3,
}) => {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies: CurrencyCode[] = ['USD', 'KSh', 'EUR', 'GBP', 'AED', 'JPY'];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-slate/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] pt-safe">
      <div className="h-16 px-4 max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2 min-w-0 flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            alt="MOTOVEX Emblem Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKGhr1kuoLHuagOHOMGtct8Mw-hV_k6lK00vjOqzVJFXMpeshmH2WNvpN5Jv8p79zhdEhas_PLC_P90rpcEQbYB8W9lJG3Kduc6rLFOxlVKOaGEfZLFmJcbV0v_fapHnXKaAyT_0CWcd_7vdfTSsE-gXN03snbvzrS0wnSpgbbCoK7aIDuDg9QKhMyMJI3VOSGmnK0EqVXZp0H4uS1rR9tHJ2Fhh9gTEyP-1zUVUaav1uqkA5OuIuLNw"
          />
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1">
              <span className="font-headline-sm text-[18px] tracking-tight text-text-high-contrast uppercase font-bold">
                MOTOVEX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim shadow-[0_0_8px_#00dbe9]"></span>
            </div>
            <span className="font-label-code text-[10px] text-text-muted tracking-widest">
              EXCHANGE
            </span>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0 relative">
          {/* Gemini AI Assistant Button */}
          <button
            id="ai-chat-btn"
            aria-label="Ask MOTOVEX AI"
            onClick={onOpenChat}
            className="h-9 px-2.5 rounded-lg bg-surface-container-high hover:bg-secondary-fixed-dim/20 text-secondary-fixed-dim border border-secondary-fixed-dim/30 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer font-label-code text-xs font-bold"
          >
            <span className="material-symbols-outlined text-[17px]">smart_toy</span>
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              id="currency-toggle-btn"
              aria-label="Toggle Currency"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="h-9 px-2.5 rounded bg-surface-container-high flex items-center gap-1 text-on-surface-variant hover:text-text-high-contrast transition-colors min-w-[54px] justify-center active:scale-95"
            >
              <span className="font-label-code text-secondary-fixed-dim font-bold">
                {currentCurrency}
              </span>
              <span className="material-symbols-outlined text-[16px] text-text-muted">
                unfold_more
              </span>
            </button>

            {/* Currency Dropdown Menu */}
            {currencyDropdownOpen && (
              <div
                id="currency-dropdown"
                className="absolute right-0 top-11 w-44 rounded-xl bg-surface-card border border-border-subtle shadow-2xl p-1 z-50"
              >
                <div className="px-3 py-1.5 text-[10px] font-label-code uppercase tracking-wider text-text-muted border-b border-border-subtle">
                  Select Currency
                </div>
                <div className="py-1">
                  {currencies.map((code) => {
                    const info = CURRENCIES[code];
                    const isSelected = code === currentCurrency;
                    return (
                      <button
                        key={code}
                        onClick={() => {
                          onSelectCurrency(code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                          isSelected
                            ? 'bg-primary-container text-white font-bold'
                            : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        <span className="font-label-code">{code}</span>
                        <span className="text-text-muted text-[11px] truncate max-w-[90px]">
                          {info.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <button
            id="notifications-btn"
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-text-high-contrast hover:bg-surface-container-high transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary-fixed-dim shadow-[0_0_6px_#00dbe9]"></span>
            )}
          </button>

          {/* User Profile Avatar / Login Action */}
          <div
            id="user-profile-btn"
            title="Institutional Profile & Access"
            className="relative flex items-center justify-center pl-1 cursor-pointer group"
            onClick={onOpenProfile}
          >
            <div className="relative w-9 h-9">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-border-active group-hover:ring-secondary-fixed-dim transition-all"
                src={
                  currentUser?.avatar ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBB02MBfIJGF4fw4kua1jE45PwJUHBil1qynkgpo5zezMEJ5h4dmNB2RkCHHwQTVMOcJRsFxDI1AjIAwMKD2nN-2vr0f1daAN8TofR_Xq_ZYQvKJ61hA6_LC0DFV7E-FWT5WZ6fzlYWB42cK9ghufiItTxQdaU29meUfnAFkf3kBOmxU-MBedmgIV2Hb0BhQrGKTSY90CeebZe4UP-q1lu-v3u6F2EMpAZDvARuy1lE5xwg6jZDA3-Qyw'
                }
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-surface-container-lowest flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[13px] font-bold">
                  verified
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
