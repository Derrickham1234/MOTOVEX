import React from 'react';

export type ActiveTab = 'market' | 'saved' | 'activity' | 'profile' | 'login' | 'register';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenSell: () => void;
  savedCount: number;
  activityCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenSell,
  savedCount,
  activityCount,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-slate/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.5)] border-t border-border-subtle">
      <div className="flex items-center justify-between h-16 max-w-lg mx-auto px-4 relative">
        {/* Market */}
        <button
          id="nav-market"
          onClick={() => onTabChange('market')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[52px] h-12 transition-all cursor-pointer ${
            activeTab === 'market'
              ? 'text-secondary-fixed-dim font-bold'
              : 'text-text-muted hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">storefront</span>
          <span className="font-label-pill uppercase tracking-wider text-[10px]">
            Market
          </span>
        </button>

        {/* Saved */}
        <button
          id="nav-saved"
          onClick={() => onTabChange('saved')}
          className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[52px] h-12 transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'text-secondary-fixed-dim font-bold'
              : 'text-text-muted hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">bookmark_manager</span>
          <span className="font-label-pill uppercase tracking-wider text-[10px]">
            Saved
          </span>
          {savedCount > 0 && (
            <span className="absolute top-1 right-2.5 w-4 h-4 rounded-full bg-secondary-container text-on-secondary-container text-[9px] font-bold flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>

        {/* Central Add (+) Action */}
        <div className="flex items-center justify-center -mt-5">
          <button
            id="nav-sell-btn"
            aria-label="Create Listing"
            onClick={onOpenSell}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-primary-container text-text-high-contrast shadow-[0_0_20px_rgba(0,102,255,0.45)] hover:shadow-[0_0_24px_rgba(0,240,255,0.6)] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[26px]">add</span>
          </button>
        </div>

        {/* Activity */}
        <button
          id="nav-activity"
          onClick={() => onTabChange('activity')}
          className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[52px] h-12 transition-all cursor-pointer ${
            activeTab === 'activity'
              ? 'text-secondary-fixed-dim font-bold'
              : 'text-text-muted hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">receipt_long</span>
          <span className="font-label-pill uppercase tracking-wider text-[10px]">
            Activity
          </span>
          {activityCount > 0 && (
            <span className="absolute top-1 right-2.5 w-4 h-4 rounded-full bg-tertiary text-on-tertiary text-[9px] font-bold flex items-center justify-center">
              {activityCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <button
          id="nav-profile"
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[52px] h-12 transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'text-secondary-fixed-dim font-bold'
              : 'text-text-muted hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">verified_user</span>
          <span className="font-label-pill uppercase tracking-wider text-[10px]">
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
};
