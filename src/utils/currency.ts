import { CurrencyCode } from '../types';

export const CURRENCIES: Record<CurrencyCode, { name: string; symbol: string; rateToKSh: number }> = {
  USD: {
    name: 'US Dollar',
    symbol: '$',
    rateToKSh: 130.0,
  },
  KSh: {
    name: 'Kenya Shilling',
    symbol: 'KSh',
    rateToKSh: 1.0,
  },
  EUR: {
    name: 'Euro',
    symbol: '€',
    rateToKSh: 142.0,
  },
  GBP: {
    name: 'British Pound',
    symbol: '£',
    rateToKSh: 166.0,
  },
  AED: {
    name: 'UAE Dirham',
    symbol: 'AED',
    rateToKSh: 35.4,
  },
  JPY: {
    name: 'Japanese Yen',
    symbol: '¥',
    rateToKSh: 0.88,
  },
};

export function formatCurrency(amountKSh: number, currency: CurrencyCode): string {
  const conf = CURRENCIES[currency];
  if (!conf) return `KSh ${amountKSh.toLocaleString('en-US')}`;

  const converted = amountKSh / conf.rateToKSh;

  if (currency === 'KSh') {
    return `KSh ${Math.round(amountKSh).toLocaleString('en-US')}`;
  } else if (currency === 'USD') {
    return `$${Math.round(converted).toLocaleString('en-US')}`;
  } else if (currency === 'EUR') {
    return `€${Math.round(converted).toLocaleString('en-US')}`;
  } else if (currency === 'GBP') {
    return `£${Math.round(converted).toLocaleString('en-US')}`;
  } else if (currency === 'AED') {
    return `AED ${Math.round(converted).toLocaleString('en-US')}`;
  } else if (currency === 'JPY') {
    return `¥${Math.round(converted).toLocaleString('en-US')}`;
  }

  return `${conf.symbol} ${Math.round(converted).toLocaleString('en-US')}`;
}
