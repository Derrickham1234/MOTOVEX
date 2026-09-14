import React from 'react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  icon: string;
  iconColor: string;
}

interface NotificationDrawerProps {
  onClose: () => void;
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  onClose,
  onClearAll,
}) => {
  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      title: 'Telemetry Inspection Cleared (Node #4092)',
      desc: 'Toyota Land Cruiser GR Sport passed CAN-bus and compression test (98/100 score).',
      time: '6m ago',
      unread: true,
      icon: 'verified',
      iconColor: 'text-tertiary',
    },
    {
      id: 'notif-2',
      title: 'Escrow Capital Vault Locked',
      desc: 'Capital custody of KSh 23,625,000 confirmed in institutional escrow for John Deere 8R.',
      time: '24m ago',
      unread: true,
      icon: 'lock',
      iconColor: 'text-secondary-fixed-dim',
    },
    {
      id: 'notif-3',
      title: 'Title Verification Handover Complete',
      desc: 'CAT 320 Excavator commercial lien clearance confirmed with Ministry of Transport registry.',
      time: '2h ago',
      unread: false,
      icon: 'gavel',
      iconColor: 'text-badge-trust-amber',
    },
    {
      id: 'notif-4',
      title: 'New High-Value Asset Reserve',
      desc: 'Axopar 37 Sun-Top Brabus Line listed in Kilifi Creek with full marine ultrasonic scan.',
      time: '5h ago',
      unread: false,
      icon: 'directions_boat',
      iconColor: 'text-secondary-fixed-dim',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-3 sm:p-5 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl bg-surface-card border border-border-subtle shadow-2xl p-4 flex flex-col max-h-[85vh] overflow-hidden mt-14">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-secondary-fixed-dim">
              notifications
            </span>
            <h3 className="font-headline-sm text-sm text-text-high-contrast font-bold">
              Institutional Telemetry Alerts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-text-muted hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Notifications list */}
        <div className="overflow-y-auto space-y-2 py-3 pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border transition-all ${
                n.unread
                  ? 'bg-surface-slate border-secondary-fixed-dim/30'
                  : 'bg-surface-container-low border-border-subtle'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className={`material-symbols-outlined text-[18px] mt-0.5 ${n.iconColor}`}>
                  {n.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-text-high-contrast truncate">
                      {n.title}
                    </h4>
                    <span className="font-label-code text-[9px] text-text-muted">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed mt-0.5">
                    {n.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-border-subtle flex justify-between items-center text-xs">
          <button
            onClick={onClearAll}
            className="text-text-muted hover:text-text-high-contrast text-[11px] font-label-code cursor-pointer"
          >
            Mark all read
          </button>
          <span className="font-label-code text-[10px] text-secondary-fixed-dim">
            NODE #4092 SYNCED
          </span>
        </div>
      </div>
    </div>
  );
};
