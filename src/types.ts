export type AssetCategory =
  | 'all'
  | 'cars'
  | 'machinery'
  | 'agri'
  | 'motorcycles'
  | 'commercial'
  | 'marine'
  | 'ev';

export type CurrencyCode = 'USD' | 'KSh' | 'EUR' | 'GBP' | 'AED' | 'JPY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateToKSh: number; // 1 Currency = X KSh (for conversion)
  format: (amountInKSh: number) => string;
}

export interface SpecItem {
  label: string;
  value: string;
  isHighlight?: boolean;
}

export interface TelemetrySensorLog {
  parameter: string;
  value: string;
  status: 'optimal' | 'nominal' | 'verified';
}

export interface TelemetryReport {
  healthScore: number;
  engineCompression: string;
  obdDiagnostics: string;
  hydraulicPressure?: string;
  batteryHealth?: string;
  transmissionHealth: string;
  chassisFrameIntegrity: string;
  legalTitleStatus: string;
  inspectionDate: string;
  telemetryNodeId: string;
  inspectorName: string;
  sensorLogs: TelemetrySensorLog[];
}

export interface VehicleAsset {
  id: string;
  title: string;
  category: AssetCategory;
  subcategoryBadge: string;
  editionOrYear: string;
  badge: {
    text: string;
    icon: string;
    type: 'verified-dealer' | 'authorized-dealer' | 'verified-seller' | 'industrial-escrow';
  };
  location: {
    flag: string;
    city: string;
    country: string;
  };
  vin: string;
  auditScore: number;
  auditLabel: string;
  image: string;
  imageAlt: string;
  engineBadge: string;
  specs: SpecItem[];
  reservePriceKSh: number;
  escrowFeePercent: number;
  escrowFeeTitle: string;
  escrowProtectionHeadline: string;
  escrowProtectionDetails: string;
  telemetryReport: TelemetryReport;
  escrowEligible: boolean;
}

export interface EscrowOffer {
  id: string;
  assetId: string;
  assetTitle: string;
  assetImage: string;
  offeredPriceKSh: number;
  escrowFeeKSh: number;
  totalOutlayKSh: number;
  status: 'vault_locked' | 'telemetry_audit' | 'title_transfer' | 'settled';
  timestamp: string;
  escrowNode: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  amountKSh: number;
  type: 'offer_placed' | 'audit_cleared' | 'escrow_locked' | 'funds_settled';
  status: string;
  vin: string;
}
