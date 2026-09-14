import React from 'react';
import { AssetCategory } from '../types';

interface CategoryItem {
  id: AssetCategory;
  label: string;
  icon: string;
  iconColor?: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'cars', label: 'Cars', icon: 'directions_car' },
  { id: 'machinery', label: 'Heavy Eq', icon: 'precision_manufacturing', iconColor: 'text-badge-trust-amber' },
  { id: 'agri', label: 'Agri Tech', icon: 'agriculture', iconColor: 'text-tertiary' },
  { id: 'motorcycles', label: 'Bikes', icon: 'two_wheeler', iconColor: 'text-secondary-fixed-dim' },
  { id: 'commercial', label: 'Trucks', icon: 'local_shipping' },
  { id: 'marine', label: 'Marine', icon: 'directions_boat', iconColor: 'text-secondary-fixed-dim' },
  { id: 'ev', label: 'Electric', icon: 'bolt', iconColor: 'text-tertiary' },
];

interface CategorySelectorProps {
  selectedCategory: AssetCategory;
  onSelectCategory: (cat: AssetCategory) => void;
  totalAssetsCount?: number;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="flex flex-col space-y-1.5">
      <div className="flex items-center justify-between px-0.5">
        <span className="font-label-code text-xs uppercase tracking-widest text-text-muted">
          Asset Class Catalog
        </span>
        <div className="flex items-center gap-2">
          {selectedCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-[11px] font-label-code text-secondary-fixed-dim hover:underline flex items-center gap-0.5"
            >
              <span>Show All</span>
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
          <span className="font-label-code text-xs text-secondary-fixed-dim">
            7 Sectors
          </span>
        </div>
      </div>

      <div
        id="category-selector-row"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className={`flex flex-col items-center justify-center p-3 min-w-[76px] rounded-xl shadow-sm active:scale-95 transition-all flex-shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-primary-container text-text-high-contrast shadow-md'
                  : 'bg-surface-slate text-on-surface-variant hover:text-text-high-contrast hover:bg-surface-container'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] mb-1 ${
                  isSelected ? 'text-white' : cat.iconColor || 'text-on-surface-variant'
                }`}
              >
                {cat.icon}
              </span>
              <span className="font-label-pill uppercase tracking-wider text-[11px]">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
