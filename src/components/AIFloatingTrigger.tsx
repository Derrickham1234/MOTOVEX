import React from 'react';

interface AIFloatingTriggerProps {
  onClick: () => void;
}

export const AIFloatingTrigger: React.FC<AIFloatingTriggerProps> = ({ onClick }) => {
  return (
    <button
      id="floating-ai-chat-btn"
      onClick={onClick}
      aria-label="Ask MOTOVEX AI Assistant"
      className="fixed bottom-20 right-4 sm:right-6 z-40 h-12 px-3.5 rounded-full bg-surface-card border border-secondary-fixed-dim/50 shadow-[0_4px_20px_rgba(0,219,233,0.3)] hover:shadow-[0_4px_25px_rgba(0,219,233,0.5)] flex items-center gap-2 text-secondary-fixed-dim hover:text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md group"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
          smart_toy
        </span>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-secondary-fixed-dim animate-ping"></span>
      </div>
      <span className="font-headline-sm text-xs font-bold text-text-high-contrast tracking-wide pr-1">
        Ask AI
      </span>
    </button>
  );
};
