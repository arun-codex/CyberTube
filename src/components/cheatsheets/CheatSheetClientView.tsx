'use client';

import React, { useState } from 'react';
import { CheatSheetData } from '@/types/catalog';

interface CheatSheetClientViewProps {
  data: CheatSheetData;
}

export default function CheatSheetClientView({ data }: CheatSheetClientViewProps) {
  const [activeTab, setActiveTab] = useState<'linux' | 'ports'>('linux');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  // Linux search
  const [linuxSearch, setLinuxSearch] = useState('');

  // Ports filter
  const [portSearch, setPortSearch] = useState('');
  const [protocolFilter, setProtocolFilter] = useState<'all' | 'TCP' | 'UDP' | 'TCP/UDP'>('all');

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch {
      // Fallback
    }
  };

  const filteredPorts = data.ports.filter((p) => {
    const matchesProtocol = protocolFilter === 'all' || p.protocol === protocolFilter;
    const q = portSearch.toLowerCase();
    const matchesSearch =
      p.port.toString().includes(q) ||
      p.service.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.securityImplication.toLowerCase().includes(q);
    return matchesProtocol && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Primary Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('linux')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'linux'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Linux Commands Reference
        </button>
        <button
          onClick={() => setActiveTab('ports')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'ports'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Common Ports & Protocols (TCP / UDP)
        </button>
      </div>

      {/* Linux Tab */}
      {activeTab === 'linux' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Essential command-line tools for security triage, file inspection, and privilege auditing.
            </p>
            <div className="w-72">
              <input
                type="text"
                placeholder="Filter commands..."
                value={linuxSearch}
                onChange={(e) => setLinuxSearch(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-8">
            {data.linux.map((section, sIdx) => {
              const matchingCommands = section.commands.filter(
                (c) =>
                  c.command.toLowerCase().includes(linuxSearch.toLowerCase()) ||
                  c.description.toLowerCase().includes(linuxSearch.toLowerCase()) ||
                  (c.flagExplanation && c.flagExplanation.toLowerCase().includes(linuxSearch.toLowerCase()))
              );

              if (matchingCommands.length === 0) return null;

              return (
                <div
                  key={sIdx}
                  className="bg-white dark:bg-[#121A26] rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm"
                >
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {section.category}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {section.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {matchingCommands.map((cmd, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <code className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded break-all">
                            {cmd.command}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(cmd.example || cmd.command)}
                            className="px-2.5 py-1 text-xs rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                          >
                            {copiedCommand === (cmd.example || cmd.command) ? '✓ Copied' : 'Copy'}
                          </button>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300">
                          {cmd.description}
                        </p>

                        {cmd.example && (
                          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            <span className="text-slate-400 font-sans">Example: </span>
                            {cmd.example}
                          </div>
                        )}

                        {cmd.flagExplanation && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                            <span className="font-semibold text-slate-600 dark:text-slate-300">Flags: </span>
                            {cmd.flagExplanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Ports Tab */}
      {activeTab === 'ports' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Protocol Pills */}
            <div className="flex gap-2">
              {(['all', 'TCP', 'UDP', 'TCP/UDP'] as const).map((proto) => (
                <button
                  key={proto}
                  onClick={() => setProtocolFilter(proto)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    protocolFilter === proto
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {proto === 'all' ? 'All Protocols' : proto}
                </button>
              ))}
            </div>

            {/* Port Search */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Search port number, service, risk..."
                value={portSearch}
                onChange={(e) => setPortSearch(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing {filteredPorts.length} network ports
          </div>

          {/* Ports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPorts.map((p) => (
              <div
                key={p.port}
                className="bg-white dark:bg-[#121A26] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-black text-slate-900 dark:text-white">
                      Port {p.port}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {p.protocol}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {p.service}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {p.description}
                </p>

                <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-300">
                  <span className="font-bold">Security Implication: </span>
                  {p.securityImplication}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

