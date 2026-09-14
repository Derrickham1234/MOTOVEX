import React, { useState } from 'react';
import { AssetCategory, CurrencyCode, VehicleAsset } from '../types';
import { formatCurrency } from '../utils/currency';

interface SellAssetModalProps {
  currentCurrency: CurrencyCode;
  onClose: () => void;
  onAssetCreated: (newAsset: VehicleAsset) => void;
}

export const SellAssetModal: React.FC<SellAssetModalProps> = ({
  currentCurrency,
  onClose,
  onAssetCreated,
}) => {
  const [category, setCategory] = useState<AssetCategory>('cars');
  const [vin, setVin] = useState('');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('Nairobi');
  const [reservePriceKSh, setReservePriceKSh] = useState(12000000);
  const [editionOrYear, setEditionOrYear] = useState('2023 Edition');
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedSuccess, setDecodedSuccess] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Auto-decode presets based on category
  const handleAutoDecode = () => {
    setIsDecoding(true);
    setTimeout(() => {
      setIsDecoding(false);
      setDecodedSuccess(true);

      if (category === 'cars') {
        setVin('JTM-LU88K-90214');
        setTitle('Toyota Land Cruiser 300 VX-R');
        setEditionOrYear('2023 Edition');
        setReservePriceKSh(14200000);
      } else if (category === 'machinery') {
        setVin('CAT-323-HD-4412');
        setTitle('CAT 323 Next-Gen Heavy Excavator');
        setEditionOrYear('2022 Fleet Series');
        setReservePriceKSh(12800000);
      } else if (category === 'agri') {
        setVin('1RW8345-JD-772');
        setTitle('John Deere 8R 340 Precision Agri');
        setEditionOrYear('2023 Showcase');
        setReservePriceKSh(21000000);
      } else if (category === 'motorcycles') {
        setVin('JYARN29E-8831');
        setTitle('BMW R1250 GS Adventure Trophy');
        setEditionOrYear('2024 Showcase');
        setReservePriceKSh(2400000);
      } else if (category === 'commercial') {
        setVin('WDB9634-ACTROS');
        setTitle('Mercedes-Benz Actros 2645 6x4');
        setEditionOrYear('2022 Commercial');
        setReservePriceKSh(16500000);
      } else if (category === 'marine') {
        setVin('US-YAM-240-AR');
        setTitle('Yamaha 255 FSH Sport E-Series Offshore');
        setEditionOrYear('2023 Marine');
        setReservePriceKSh(17500000);
      } else {
        setVin('5YJ3E1EB-TESLA');
        setTitle('Tesla Model X Plaid Tri-Motor AWD');
        setEditionOrYear('2024 Showcase');
        setReservePriceKSh(18500000);
      }
    }, 900);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setIsPublishing(true);

    setTimeout(() => {
      const newAsset: VehicleAsset = {
        id: `custom-asset-${Date.now()}`,
        title: title || 'Verified Fleet Vehicle',
        category,
        subcategoryBadge:
          category === 'cars'
            ? 'SUV • 4WD'
            : category === 'machinery'
            ? 'Heavy Machinery • Plant'
            : category === 'agri'
            ? 'Agri Tech • GPS Guidance'
            : category === 'motorcycles'
            ? 'Adventure Rally'
            : category === 'commercial'
            ? 'Commercial Haulage'
            : category === 'marine'
            ? 'Offshore Marine'
            : 'Performance EV',
        editionOrYear,
        badge: {
          text: 'Verified Seller',
          icon: 'verified',
          type: 'verified-seller',
        },
        location: {
          flag: '🇰🇪',
          city,
          country: 'Kenya',
        },
        vin: vin || `MOTO-${Math.floor(100000 + Math.random() * 900000)}`,
        auditScore: 97,
        auditLabel: 'Audit 97/100',
        image:
          category === 'cars'
            ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9I-XHjKPSt3-6b8TbKdx2TmyMnSFpIMEWwGlEI-8zFzL3VxMDR0VawU1SJSNwLK-kUMVb0Ef8EauVDQ1JRvMZkhf77raHx1yvm9Sp5GKkfBUAOwCETtYMSKzElTmaFmm4qE7kNWzKd0keY7ISMBjwwf6J_-PmdyjIsTsWrvk_nfkkUL6CN1qn9qXR9A5Im2sWc-iWA2NywFwVzWN8S4aBsOnV7FGspIC_XdcWgMm50qH7HFfqVJhKVA'
            : category === 'machinery'
            ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_HigKL6kXefWqZMc-god_0M7nCmk-fmSFqZe7wWyZW_VbzpPYO-qkruwLDiD8OQhXe22-h5e44HWBNFfy1kcKJAaVWVx4vRIbd99j6RGB7Jt4ZjFp1AJGw0jV4MVb5iEQqwKQ9OL-wu8mBa02w4aJFU5Rqtjfz0lq2STUlnOV1rbUIVd4zOiYI-m1dMa80RFouwH6-tnFW5NjEXDRnrKy2jHu0PE-vSVf2jv2trLbq-wqdtIOWJ-pVg'
            : category === 'agri'
            ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGzmxR7PwWvwVFbT2RGfm_F6fRcKgarxV9vW6qsm70x6RHYPzvQzcEWm1QUGOFmxTIrhj1kxMxlRM9xhD1LVXn8L_ZqdarLqMkO339j63NcV4v3c_gfvwwP-d865Y8xYyrtYWixYKMp5rzmLK5MnaLn6ARPwf3chyeuAM19kIo5rgup6WM0M1kZ3j3WQ58h2BVU8hQ_Dr1tv8qF-qby7e_vDhujAQtE3aExvrDWy8boYkbDu5U6EzMEg'
            : 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
        imageAlt: title,
        engineBadge: 'ENGINE: Certified Telemetry Calibrated',
        specs: [
          { label: 'STATUS', value: 'Fresh Escrow Ingest' },
          { label: 'TELEMETRY NODE', value: 'NODE-NRB-4092' },
          { label: 'CUSTODY AUDIT', value: 'Tier-3 Certified' },
          { label: 'LIEN CLEARANCE', value: 'Clean 0 Encumbrance' },
        ],
        reservePriceKSh,
        escrowFeePercent: 5.0,
        escrowFeeTitle: '+ 5.0% Institutional Escrow Guarantee',
        escrowProtectionHeadline: 'FULL INSTITUTIONAL CUSTODY GUARANTEE',
        escrowProtectionDetails:
          '100% funds held in segregated custody until physical chassis inspection and verified logbook digital handover.',
        escrowEligible: true,
        telemetryReport: {
          healthScore: 97,
          engineCompression: 'Tested nominal across all cylinders.',
          obdDiagnostics: 'Zero diagnostic trouble codes found.',
          transmissionHealth: 'Smooth engagement, no slip detected.',
          chassisFrameIntegrity: 'Full laser chassis inspection cleared.',
          legalTitleStatus: 'Clean logbook, taxes cleared, verified by MOTOVEX Node.',
          inspectionDate: 'Just Now',
          telemetryNodeId: 'NODE-NRB-4092',
          inspectorName: 'Field Inspection Squad Alpha',
          sensorLogs: [
            { parameter: 'CAN-Bus Integrity', value: 'Nominal 500 kbps', status: 'optimal' },
            { parameter: 'Frame Laser Trace', value: '0.01mm delta', status: 'verified' },
          ],
        },
      };

      onAssetCreated(newAsset);
      setIsPublishing(false);
      onClose();
    }, 1200);
  };

  const escrowFeeKSh = (reservePriceKSh * 5.0) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        id="sell-asset-modal"
        className="relative w-full max-w-xl rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-5 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">post_add</span>
            </span>
            <div>
              <h3 className="font-headline-sm text-base text-text-high-contrast font-bold">
                Institutional Listing Engine
              </h3>
              <p className="font-label-code text-[11px] text-text-muted">
                AUTO-CONFIGURED SPEC FIELDS &amp; ESCROW PROTOCOL
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

        {/* Form Body */}
        <form onSubmit={handlePublish} className="overflow-y-auto space-y-4 py-3 pr-1">
          {/* Asset Category Selector */}
          <div className="space-y-1.5">
            <label className="font-label-code text-xs uppercase text-text-muted">
              Select Asset Sector
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(
                [
                  { id: 'cars', label: 'Cars' },
                  { id: 'machinery', label: 'Heavy Eq' },
                  { id: 'agri', label: 'Agri' },
                  { id: 'motorcycles', label: 'Bikes' },
                  { id: 'commercial', label: 'Trucks' },
                  { id: 'marine', label: 'Marine' },
                  { id: 'ev', label: 'Electric' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`py-2 px-1 text-center rounded-lg text-xs font-label-code transition-all cursor-pointer ${
                    category === cat.id
                      ? 'bg-primary-container text-white font-bold'
                      : 'bg-surface-slate text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* VIN / Serial Decoder Bar */}
          <div className="space-y-1.5 p-3 rounded-xl bg-surface-slate border border-border-subtle">
            <div className="flex items-center justify-between">
              <label className="font-label-code text-xs uppercase text-text-muted">
                Chassis Serial / VIN
              </label>
              <span className="text-[10px] font-label-code text-secondary-fixed-dim">
                Automated Spec Decoder
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                placeholder="e.g. JTM-LU09J-48201 or CAT-320-HD..."
                className="flex-1 bg-surface-container-low border border-border-subtle rounded-lg px-3 py-2 text-xs font-label-code text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
              />
              <button
                type="button"
                onClick={handleAutoDecode}
                disabled={isDecoding}
                className="px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-secondary-fixed-dim hover:text-white text-xs font-label-code font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {isDecoding ? 'sync' : 'document_scanner'}
                </span>
                {isDecoding ? 'Decoding...' : 'Auto-Decode'}
              </button>
            </div>
            {decodedSuccess && (
              <p className="text-[11px] text-tertiary font-label-code flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                Decoded powertrain specs &amp; standard equipment registry.
              </p>
            )}
          </div>

          {/* Title & Edition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-label-code text-xs uppercase text-text-muted">
                Listing Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Toyota Land Cruiser GR Sport"
                className="w-full bg-surface-slate border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
              />
            </div>

            <div className="space-y-1">
              <label className="font-label-code text-xs uppercase text-text-muted">
                Edition / Model Year
              </label>
              <input
                type="text"
                value={editionOrYear}
                onChange={(e) => setEditionOrYear(e.target.value)}
                placeholder="2023 Edition"
                className="w-full bg-surface-slate border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
              />
            </div>
          </div>

          {/* Location & Reserve Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-label-code text-xs uppercase text-text-muted">
                Escrow Depot Location
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-surface-slate border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-high-contrast focus:outline-none"
              >
                <option value="Nairobi">🇰🇪 Nairobi Regional Hub</option>
                <option value="Mombasa">🇰🇪 Mombasa Port Staging</option>
                <option value="Nakuru">🇰🇪 Nakuru Agri Depot</option>
                <option value="Eldoret">🇰🇪 Eldoret Industrial Yard</option>
                <option value="Kilifi Creek">🇰🇪 Kilifi Marine Terminal</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-label-code text-xs uppercase text-text-muted">
                Reserve Price (KSh)
              </label>
              <input
                type="number"
                step={50000}
                required
                value={reservePriceKSh}
                onChange={(e) => setReservePriceKSh(Number(e.target.value))}
                className="w-full bg-surface-slate border border-border-subtle rounded-lg px-3 py-2 text-xs font-label-numeric text-text-high-contrast focus:outline-none focus:border-secondary-fixed-dim"
              />
            </div>
          </div>

          {/* Escrow Math Summary */}
          <div className="p-3 rounded-xl bg-surface-container-low space-y-1 text-xs border border-border-subtle">
            <div className="flex justify-between text-text-muted">
              <span>Listing Reserve:</span>
              <span className="font-label-numeric text-text-high-contrast">
                {formatCurrency(reservePriceKSh, currentCurrency)}
              </span>
            </div>
            <div className="flex justify-between text-secondary-fixed-dim">
              <span>5.0% Institutional Escrow Protection:</span>
              <span className="font-label-numeric">
                +{formatCurrency(escrowFeeKSh, currentCurrency)}
              </span>
            </div>
            <div className="flex justify-between text-tertiary pt-1 border-t border-border-subtle">
              <span>MOTOVEX Physical Telemetry Audit:</span>
              <span className="font-bold">FREE (Institutional Promo)</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPublishing}
            className="w-full py-3 px-4 rounded-xl bg-text-high-contrast text-on-primary-fixed font-headline-sm text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-white/90 active:scale-98 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPublishing ? 'hourglass_top' : 'publish'}
            </span>
            {isPublishing ? 'Deploying to Escrow Node...' : 'Publish Asset with Escrow Protection'}
          </button>
        </form>
      </div>
    </div>
  );
};
