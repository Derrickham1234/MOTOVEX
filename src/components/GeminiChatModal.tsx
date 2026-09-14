import React, { useState, useRef, useEffect } from 'react';
import { VehicleAsset } from '../types';

export type ChatRole = 'concierge' | 'auditor' | 'escrow';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface GeminiChatModalProps {
  onClose: () => void;
  initialAssetContext?: VehicleAsset | null;
}

export const GeminiChatModal: React.FC<GeminiChatModalProps> = ({
  onClose,
  initialAssetContext,
}) => {
  const [selectedRole, setSelectedRole] = useState<ChatRole>('concierge');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.8-flash');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initial welcome message tailored to role
  const getInitialWelcome = (role: ChatRole, asset?: VehicleAsset | null) => {
    if (asset) {
      return `Welcome to MOTOVEX AI Intelligence. I have loaded telemetry specs and verified records for **${asset.title}** (VIN: \`${asset.vin}\`). How can I assist you with this vehicle or its Tier-3 escrow reserve?`;
    }
    switch (role) {
      case 'auditor':
        return 'MOTOVEX Telemetry & Forensic Node online. Inquire about CAN-bus readings, cylinder compression thresholds, hydraulic flow rates, or diagnostic trouble codes.';
      case 'escrow':
        return 'MOTOVEX Institutional Custody Desk online. Inquire about our Tier-3 bank vault custody, 4-phase capital release conditions, or cross-border title transfers.';
      case 'concierge':
      default:
        return 'Hello! I am your MOTOVEX Marketplace Concierge. How can I assist you with vehicle valuations, telemetry audits, sector comparisons, or escrow bids today?';
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: getInitialWelcome(selectedRole, initialAssetContext),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: selectedModel,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Quick inquiry templates
  const quickPrompts = [
    {
      label: 'Escrow Vault',
      text: 'Explain how the 5% MOTOVEX Tier-3 Escrow Vault protects my capital.',
    },
    {
      label: 'Telemetry Check',
      text: 'What CAN-bus and physical checks are performed during a MOTOVEX inspection?',
    },
    {
      label: 'Agri Machinery',
      text: 'What are the main inspection criteria for high-hour agricultural tractors?',
    },
    {
      label: 'Title Clearance',
      text: 'How does digital title transfer work between seller, buyer, and NTSA?',
    },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Build payload for server-side /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          role: selectedRole,
          model: selectedModel,
          assetContext: initialAssetContext
            ? {
                title: initialAssetContext.title,
                vin: initialAssetContext.vin,
                reservePrice: initialAssetContext.reservePriceKSh,
                specs: initialAssetContext.specs,
                auditScore: initialAssetContext.auditScore,
              }
            : undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply || 'No response returned from the model.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || selectedModel,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMsg(err.message || 'Unable to connect to Gemini API service.');
      const fallbackMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        content: `Connection Notice: ${err.message || 'The Gemini API server could not be reached.'} Please ensure your environment has GEMINI_API_KEY configured.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (newRole: ChatRole) => {
    setSelectedRole(newRole);
    // Suggest appropriate model based on prompt instructions
    if (newRole === 'auditor') {
      setSelectedModel('gemini-3.1-flash-lite');
    } else if (newRole === 'escrow') {
      setSelectedModel('gemini-3.5-flash');
    } else {
      setSelectedModel('gemini-3.8-flash');
    }

    const switchNotice: ChatMessage = {
      id: `switch-${Date.now()}`,
      role: 'model',
      content: getInitialWelcome(newRole, initialAssetContext),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: newRole === 'auditor' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash',
    };
    setMessages((prev) => [...prev, switchNotice]);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: getInitialWelcome(selectedRole, initialAssetContext),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      },
    ]);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div
        id="gemini-chat-modal"
        className="relative w-full max-w-2xl h-[85vh] max-h-[720px] rounded-2xl bg-surface-card border border-border-subtle shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border-subtle bg-surface-slate flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-xl bg-secondary-fixed-dim/20 text-secondary-fixed-dim flex items-center justify-center flex-shrink-0 border border-secondary-fixed-dim/30">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-sm text-text-high-contrast font-bold truncate">
                  MOTOVEX AI Assistant
                </h3>
                <span className="px-1.5 py-0.5 rounded bg-escrow-emerald-bg text-tertiary font-label-code text-[10px] font-bold">
                  MULTI-TURN
                </span>
              </div>
              <p className="font-label-code text-[10px] text-text-muted truncate">
                POWERED BY GOOGLE GEMINI INTELLIGENCE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearHistory}
              title="Reset Conversation"
              className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Role & Model Selector Toolbar */}
        <div className="px-4 py-2 bg-surface-container-low border-b border-border-subtle flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Chatbot Specific Role Tabs */}
          <div className="flex items-center gap-1 bg-surface-slate p-1 rounded-lg border border-border-subtle">
            <button
              onClick={() => handleRoleChange('concierge')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-label-code font-semibold transition-all cursor-pointer ${
                selectedRole === 'concierge'
                  ? 'bg-primary-container text-white shadow-xs'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Market Concierge
            </button>
            <button
              onClick={() => handleRoleChange('auditor')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-label-code font-semibold transition-all cursor-pointer ${
                selectedRole === 'auditor'
                  ? 'bg-primary-container text-white shadow-xs'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              CAN-Bus Auditor
            </button>
            <button
              onClick={() => handleRoleChange('escrow')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-label-code font-semibold transition-all cursor-pointer ${
                selectedRole === 'escrow'
                  ? 'bg-primary-container text-white shadow-xs'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Escrow Officer
            </button>
          </div>

          {/* Model Selector */}
          <div className="flex items-center gap-1.5">
            <span className="font-label-code text-[10px] text-text-muted uppercase">Model:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-surface-slate border border-border-subtle text-text-high-contrast rounded-md px-2 py-1 text-[11px] font-label-code focus:outline-none focus:border-secondary-fixed-dim"
            >
              <option value="gemini-3.8-flash">gemini-3.8-flash (General)</option>
              <option value="gemini-3.5-flash">gemini-3.5-flash (Standard)</option>
              <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast)</option>
            </select>
          </div>
        </div>

        {/* Initial Asset Context Header (if opened for a specific vehicle) */}
        {initialAssetContext && (
          <div className="px-4 py-2 bg-surface-container-high/40 border-b border-border-subtle flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <span className="material-symbols-outlined text-secondary-fixed-dim text-[16px]">
                directions_car
              </span>
              <span className="font-semibold text-text-high-contrast truncate">
                Active Context: {initialAssetContext.title}
              </span>
              <span className="font-label-code text-[10px] text-text-muted">
                (VIN: {initialAssetContext.vin})
              </span>
            </div>
            <span className="font-label-code text-[10px] text-tertiary font-bold flex-shrink-0">
              Audit {initialAssetContext.auditScore}/100
            </span>
          </div>
        )}

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="font-label-code text-[10px] text-text-muted">
                    {isUser ? 'You' : 'MOTOVEX AI'}
                  </span>
                  {msg.modelUsed && !isUser && (
                    <span className="font-label-code text-[9px] text-secondary-fixed-dim bg-surface-slate px-1.5 py-0.2 rounded border border-border-subtle">
                      {msg.modelUsed}
                    </span>
                  )}
                  <span className="font-label-code text-[9px] text-text-muted/70">
                    {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-primary-container text-white rounded-tr-none shadow-md font-body'
                      : 'bg-surface-slate text-on-surface rounded-tl-none border border-border-subtle shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="font-label-code text-[10px] text-secondary-fixed-dim">
                  MOTOVEX AI is thinking...
                </span>
              </div>
              <div className="rounded-2xl rounded-tl-none bg-surface-slate border border-border-subtle p-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-ping"></div>
                <div className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-ping delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-ping delay-300"></div>
                <span className="font-label-code text-[11px] text-text-muted ml-1">
                  Querying {selectedModel}...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 border-t border-border-subtle bg-surface-container-lowest flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="font-label-code text-[10px] text-text-muted flex-shrink-0">
            Prompts:
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.text)}
              disabled={isLoading}
              className="flex-shrink-0 px-2.5 py-1 rounded-full bg-surface-slate hover:bg-surface-container text-[10px] font-label-code text-on-surface border border-border-subtle hover:border-secondary-fixed-dim/40 transition-all cursor-pointer"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Error message banner if any */}
        {errorMsg && (
          <div className="px-4 py-1.5 bg-red-950/40 border-t border-red-900/50 text-[11px] text-red-300 flex items-center justify-between">
            <span className="truncate">{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-red-400 hover:text-white text-xs ml-2 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 bg-surface-slate border-t border-border-subtle">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Ask the ${
                selectedRole === 'auditor'
                  ? 'Telemetry Forensic Auditor'
                  : selectedRole === 'escrow'
                  ? 'Escrow Officer'
                  : 'Marketplace Concierge'
              }...`}
              className="flex-1 bg-surface-container-low border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs text-text-high-contrast placeholder:text-text-muted focus:outline-none focus:border-secondary-fixed-dim resize-none"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="h-10 px-4 rounded-xl bg-primary-container hover:bg-primary text-white font-headline-sm text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer transition-all flex-shrink-0"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
