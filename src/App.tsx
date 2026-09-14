import { useState, useMemo } from 'react';
import { AssetCategory, CurrencyCode, EscrowOffer, VehicleAsset } from './types';
import { INITIAL_ASSETS } from './data/mockAssets';
import { Header } from './components/Header';
import { TelemetryTicker } from './components/TelemetryTicker';
import { SearchAndFilters, QuickFilterState } from './components/SearchAndFilters';
import { CategorySelector } from './components/CategorySelector';
import { EscrowVaultBanner } from './components/EscrowVaultBanner';
import { AssetCard } from './components/AssetCard';
import { ListingEngineBanner } from './components/ListingEngineBanner';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { EscrowOfferModal } from './components/EscrowOfferModal';
import { TelemetryModal } from './components/TelemetryModal';
import { VaultProtocolModal } from './components/VaultProtocolModal';
import { SellAssetModal } from './components/SellAssetModal';
import { AdvancedFilterModal, AdvancedFilterCriteria } from './components/AdvancedFilterModal';
import { BrokerVipModal } from './components/BrokerVipModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { SavedView } from './components/SavedView';
import { ActivityView } from './components/ActivityView';
import { ProfileView } from './components/ProfileView';
import { GeminiChatModal } from './components/GeminiChatModal';
import { AIFloatingTrigger } from './components/AIFloatingTrigger';
import { LoginPage, UserProfile, DEMO_PROFILES } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

export default function App() {
  // Current active currency: defaults to USD as shown in the original image/prototype
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('USD');

  // Navigation tab: defaults to 'register' per user request "User Registration page"
  const [activeTab, setActiveTab] = useState<ActiveTab>('register');

  // Active logged-in user profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_PROFILES.david);
  const [loginToast, setLoginToast] = useState<string | null>(null);

  // Search & Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory>('all');
  const [quickFilters, setQuickFilters] = useState<QuickFilterState>({
    verifiedOnly: true, // Selected by default as in prototype screenshot
    escrowSecured: false,
    lowUsage: false,
    tier3Audit: false,
  });

  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterCriteria>({
    category: 'all',
    city: 'All',
    maxPriceKSh: 35000000,
    verifiedOnly: false,
    escrowOnly: false,
    minAuditScore: 80,
  });

  // Assets catalog
  const [assets, setAssets] = useState<VehicleAsset[]>(INITIAL_ASSETS);
  const [savedAssetIds, setSavedAssetIds] = useState<string[]>(['toyota-land-cruiser-gr']);

  // Offers & Activity Ledger
  const [offers, setOffers] = useState<EscrowOffer[]>([]);

  // Modals
  const [offerModalAsset, setOfferModalAsset] = useState<VehicleAsset | null>(null);
  const [telemetryModalAsset, setTelemetryModalAsset] = useState<VehicleAsset | null>(null);
  const [vaultProtocolOpen, setVaultProtocolOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false);
  const [brokerVipOpen, setBrokerVipOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatAssetContext, setChatAssetContext] = useState<VehicleAsset | null>(null);

  const handleOpenChat = (asset?: VehicleAsset) => {
    setChatAssetContext(asset || null);
    setChatModalOpen(true);
  };

  // Toggle quick filters
  const handleToggleQuickFilter = (key: keyof QuickFilterState) => {
    setQuickFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle saved asset
  const handleToggleSave = (id: string) => {
    setSavedAssetIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Submit Escrow Offer
  const handleSubmitOffer = (asset: VehicleAsset, offerPriceKSh: number) => {
    const feeKSh = (offerPriceKSh * asset.escrowFeePercent) / 100;
    const newOffer: EscrowOffer = {
      id: `ESC-${Math.floor(1000 + Math.random() * 9000)}`,
      assetId: asset.id,
      assetTitle: asset.title,
      assetImage: asset.image,
      offeredPriceKSh: offerPriceKSh,
      escrowFeeKSh: feeKSh,
      totalOutlayKSh: offerPriceKSh + feeKSh,
      status: 'vault_locked',
      timestamp: 'Just Now',
      escrowNode: 'NODE-NRB-4092',
    };
    setOffers((prev) => [newOffer, ...prev]);
  };

  // Create new listing from sell modal
  const handleAssetCreated = (newAsset: VehicleAsset) => {
    setAssets((prev) => [newAsset, ...prev]);
    setActiveTab('market');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Assets List
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      // 1. Search Query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = asset.title.toLowerCase().includes(query);
        const matchesVin = asset.vin.toLowerCase().includes(query);
        const matchesCity = asset.location.city.toLowerCase().includes(query);
        const matchesCategory = asset.subcategoryBadge.toLowerCase().includes(query);
        const matchesEngine = asset.engineBadge.toLowerCase().includes(query);
        const matchesSpecs = asset.specs.some(
          (s) =>
            s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query)
        );
        if (
          !matchesTitle &&
          !matchesVin &&
          !matchesCity &&
          !matchesCategory &&
          !matchesEngine &&
          !matchesSpecs
        ) {
          return false;
        }
      }

      // 2. Category Selector
      if (selectedCategory !== 'all' && asset.category !== selectedCategory) {
        return false;
      }

      // 3. Quick Filters
      if (quickFilters.verifiedOnly) {
        if (
          asset.badge.type !== 'verified-dealer' &&
          asset.badge.type !== 'authorized-dealer' &&
          asset.badge.type !== 'verified-seller'
        ) {
          return false;
        }
      }

      if (quickFilters.escrowSecured) {
        if (!asset.escrowEligible) return false;
      }

      if (quickFilters.lowUsage) {
        // Find odometer or hours
        const odoSpec = asset.specs.find(
          (s) => s.label === 'ODOMETER' || s.label === 'OPERATING HOURS' || s.label === 'METERED HOURS'
        );
        if (odoSpec) {
          const num = parseInt(odoSpec.value.replace(/[^0-9]/g, ''), 10);
          if (num > 15000) return false;
        }
      }

      if (quickFilters.tier3Audit) {
        if (asset.auditScore < 97) return false;
      }

      // 4. Advanced Filters
      if (advancedFilters.category !== 'all' && asset.category !== advancedFilters.category) {
        return false;
      }

      if (
        advancedFilters.city !== 'All' &&
        !asset.location.city.toLowerCase().includes(advancedFilters.city.toLowerCase())
      ) {
        return false;
      }

      if (asset.reservePriceKSh > advancedFilters.maxPriceKSh) {
        return false;
      }

      if (asset.auditScore < advancedFilters.minAuditScore) {
        return false;
      }

      if (advancedFilters.escrowOnly && !asset.escrowEligible) {
        return false;
      }

      return true;
    });
  }, [assets, searchTerm, selectedCategory, quickFilters, advancedFilters]);

  // Saved Assets list
  const savedAssets = useMemo(() => {
    return assets.filter((a) => savedAssetIds.includes(a.id));
  }, [assets, savedAssetIds]);

  return (
    <div className="bg-surface min-h-screen text-on-surface antialiased selection:bg-secondary-fixed-dim selection:text-on-secondary-fixed flex flex-col">
      {/* Top Persistent Fixed Header */}
      <Header
        currentCurrency={currentCurrency}
        currentUser={currentUser}
        onSelectCurrency={setCurrentCurrency}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
        onOpenLogin={() => setActiveTab('login')}
        onOpenChat={() => handleOpenChat()}
        unreadCount={unreadNotifications}
      />

      {/* Login / Auth Success Toast */}
      {loginToast && (
        <div className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50 p-3 rounded-xl bg-escrow-emerald-bg border border-tertiary/40 shadow-xl flex items-center gap-2.5 text-xs text-text-high-contrast animate-fade-in">
          <span className="material-symbols-outlined text-tertiary text-[18px]">
            verified_user
          </span>
          <span className="font-semibold">{loginToast}</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface max-w-lg mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col w-full space-y-6 pt-3 pb-10">
          {/* TAB 0A: USER / INSTITUTIONAL REGISTRATION */}
          {activeTab === 'register' && (
            <RegisterPage
              currentCurrency={currentCurrency}
              onRegisterSuccess={(profile) => {
                setCurrentUser(profile);
                setLoginToast(`Account Initialized: ${profile.name} (${profile.institutionalId})`);
                setTimeout(() => setLoginToast(null), 4000);
                setActiveTab('market');
              }}
              onNavigateToLogin={() => setActiveTab('login')}
              onCancel={() => setActiveTab('market')}
            />
          )}

          {/* TAB 0B: LOGIN / INSTITUTIONAL AUTHENTICATION */}
          {activeTab === 'login' && (
            <LoginPage
              currentCurrency={currentCurrency}
              currentUser={currentUser}
              onLoginSuccess={(profile) => {
                setCurrentUser(profile);
                setLoginToast(`Authenticated as ${profile.name} (${profile.role})`);
                setTimeout(() => setLoginToast(null), 3500);
                setActiveTab('market');
              }}
              onNavigateToRegister={() => setActiveTab('register')}
              onCancel={() => setActiveTab('market')}
            />
          )}

          {/* TAB 1: MARKETPLACE CATALOG */}
          {activeTab === 'market' && (
            <>
              {/* Live Market Telemetry Ticker */}
              <TelemetryTicker
                currentCurrency={currentCurrency}
                onOpenVaultProtocol={() => setVaultProtocolOpen(true)}
              />

              {/* Search & Command Matrix */}
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filters={quickFilters}
                onToggleFilter={handleToggleQuickFilter}
                onOpenAdvancedFilter={() => setAdvancedFilterOpen(true)}
              />

              {/* Multi-Category Horizontal Selector */}
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* Escrow Guarantee Trust Banner */}
              <EscrowVaultBanner
                onLearnMore={() => setVaultProtocolOpen(true)}
              />

              {/* Featured Global Inventory Section */}
              <section className="flex flex-col space-y-4">
                <div className="flex items-end justify-between px-0.5">
                  <div>
                    <span className="font-label-code text-xs text-secondary-fixed-dim tracking-widest uppercase">
                      Verified Reserve
                    </span>
                    <h2 className="font-headline-md text-2xl text-text-high-contrast tracking-tight font-bold">
                      Featured Assets
                    </h2>
                  </div>
                  <span className="font-label-numeric text-xs text-text-muted">
                    {filteredAssets.length} Active Listings
                  </span>
                </div>

                {/* Inventory Cards Stack */}
                <div id="inventory-list" className="flex flex-col space-y-4">
                  {filteredAssets.length === 0 ? (
                    <div className="p-10 rounded-xl bg-surface-card border border-border-subtle text-center space-y-3">
                      <span className="material-symbols-outlined text-[32px] text-text-muted">
                        search_off
                      </span>
                      <p className="text-sm text-text-high-contrast font-semibold">
                        No assets match your search or filter parameters
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                          setQuickFilters({
                            verifiedOnly: false,
                            escrowSecured: false,
                            lowUsage: false,
                            tier3Audit: false,
                          });
                          setAdvancedFilters({
                            category: 'all',
                            city: 'All',
                            maxPriceKSh: 35000000,
                            verifiedOnly: false,
                            escrowOnly: false,
                            minAuditScore: 80,
                          });
                        }}
                        className="text-xs font-label-code text-secondary-fixed-dim hover:underline"
                      >
                        Reset all filters
                      </button>
                    </div>
                  ) : (
                    filteredAssets.map((asset) => (
                      <AssetCard
                        key={asset.id}
                        asset={asset}
                        currentCurrency={currentCurrency}
                        isSaved={savedAssetIds.includes(asset.id)}
                        onToggleSave={handleToggleSave}
                        onMakeOffer={(item) => setOfferModalAsset(item)}
                        onInspectTelemetry={(item) => setTelemetryModalAsset(item)}
                        onAskAI={(item) => handleOpenChat(item)}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Role Switch Banner: Seller / Fleet Onboarding */}
              <ListingEngineBanner
                onListAsset={() => setSellModalOpen(true)}
                onBrokerVIP={() => setBrokerVipOpen(true)}
              />
            </>
          )}

          {/* TAB 2: SAVED ASSETS */}
          {activeTab === 'saved' && (
            <SavedView
              savedAssets={savedAssets}
              currentCurrency={currentCurrency}
              onToggleSave={handleToggleSave}
              onMakeOffer={(item) => setOfferModalAsset(item)}
              onInspectTelemetry={(item) => setTelemetryModalAsset(item)}
              onAskAI={(item) => handleOpenChat(item)}
              onExploreMarket={() => setActiveTab('market')}
            />
          )}

          {/* TAB 3: ACTIVITY / ESCROW LEDGER */}
          {activeTab === 'activity' && (
            <ActivityView
              offers={offers}
              currentCurrency={currentCurrency}
              onExploreMarket={() => setActiveTab('market')}
            />
          )}

          {/* TAB 4: PROFILE & SETTINGS */}
          {activeTab === 'profile' && (
            <ProfileView
              currentCurrency={currentCurrency}
              currentUser={currentUser}
              onOpenVaultProtocol={() => setVaultProtocolOpen(true)}
              onOpenSell={() => setSellModalOpen(true)}
              onNavigateToLogin={() => setActiveTab('login')}
              onNavigateToRegister={() => setActiveTab('register')}
            />
          )}
        </div>
      </main>

      {/* Bottom Fixed Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSell={() => setSellModalOpen(true)}
        savedCount={savedAssetIds.length}
        activityCount={offers.length}
      />

      {/* MODAL 1: ESCROW OFFER WORKFLOW */}
      {offerModalAsset && (
        <EscrowOfferModal
          asset={offerModalAsset}
          currentCurrency={currentCurrency}
          onClose={() => setOfferModalAsset(null)}
          onSubmitOffer={handleSubmitOffer}
        />
      )}

      {/* MODAL 2: CAN-BUS & PHYSICAL TELEMETRY AUDIT */}
      {telemetryModalAsset && (
        <TelemetryModal
          asset={telemetryModalAsset}
          currentCurrency={currentCurrency}
          onClose={() => setTelemetryModalAsset(null)}
          onMakeOffer={(item) => {
            setTelemetryModalAsset(null);
            setOfferModalAsset(item);
          }}
        />
      )}

      {/* MODAL 3: TIER-3 VAULT PROTOCOL INFO */}
      {vaultProtocolOpen && (
        <VaultProtocolModal onClose={() => setVaultProtocolOpen(false)} />
      )}

      {/* MODAL 4: SELL ASSET ENGINE */}
      {sellModalOpen && (
        <SellAssetModal
          currentCurrency={currentCurrency}
          onClose={() => setSellModalOpen(false)}
          onAssetCreated={handleAssetCreated}
        />
      )}

      {/* MODAL 5: ADVANCED FILTER MATRIX */}
      {advancedFilterOpen && (
        <AdvancedFilterModal
          currentFilters={advancedFilters}
          currentCurrency={currentCurrency}
          onClose={() => setAdvancedFilterOpen(false)}
          onApply={setAdvancedFilters}
          onReset={() => {
            setAdvancedFilters({
              category: 'all',
              city: 'All',
              maxPriceKSh: 35000000,
              verifiedOnly: false,
              escrowOnly: false,
              minAuditScore: 80,
            });
            setSelectedCategory('all');
          }}
        />
      )}

      {/* MODAL 6: BROKER VIP ONBOARDING */}
      {brokerVipOpen && (
        <BrokerVipModal onClose={() => setBrokerVipOpen(false)} />
      )}

      {/* DRAWER: NOTIFICATIONS & TELEMETRY ALERTS */}
      {notificationsOpen && (
        <NotificationDrawer
          onClose={() => setNotificationsOpen(false)}
          onClearAll={() => setUnreadNotifications(0)}
        />
      )}

      {/* FLOATING ACTION TRIGGER: GEMINI AI ASSISTANT */}
      <AIFloatingTrigger onClick={() => handleOpenChat()} />

      {/* MODAL 7: GEMINI MULTI-TURN CHAT INTERFACE */}
      {chatModalOpen && (
        <GeminiChatModal
          onClose={() => setChatModalOpen(false)}
          initialAssetContext={chatAssetContext}
        />
      )}
    </div>
  );
}
