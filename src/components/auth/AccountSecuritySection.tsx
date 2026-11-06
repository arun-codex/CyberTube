'use client';

import React, { useState } from 'react';
import { Shield, KeyRound, Lock } from 'lucide-react';
import { ChangePasswordModal } from './ChangePasswordModal';

export interface AccountSecuritySectionProps {
  userEmail: string;
  isOAuthOnly?: boolean;
  passwordChangedAt?: string | null;
  accountUpdatedAt?: string | null;
  /** @deprecated use passwordChangedAt */
  lastPasswordChange?: string | null;
}

export function AccountSecuritySection({
  userEmail,
  isOAuthOnly = false,
  passwordChangedAt,
  accountUpdatedAt,
  lastPasswordChange,
}: AccountSecuritySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastPasswordChangeDate, setLastPasswordChangeDate] = useState<string | null>(
    passwordChangedAt || null
  );

  const formattedPasswordDate = lastPasswordChangeDate
    ? new Date(lastPasswordChangeDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  const formattedAccountDate = accountUpdatedAt
    ? new Date(accountUpdatedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <section
      data-testid="account-security-section"
      className="bg-white dark:bg-[#0e0e17] border border-[#e4e4ed] dark:border-[#26263b] rounded-[8px] p-6 sm:p-8 space-y-6 transition-colors"
    >
      <div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#303055] dark:text-[#22D3EE]" />
          <h2 className="text-base font-semibold text-[#303055] dark:text-[#f0f0f8]">
            Password & Security
          </h2>
        </div>
        <p className="text-xs text-[#6b6b7b] dark:text-[#8c8ca6] mt-0.5">
          Manage your CyberTube account credentials and security settings.
        </p>
      </div>

      {/* Security Card: Password */}
      <div className="bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] rounded-[6px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#303055] dark:text-[#22D3EE]" />
            <h3 className="text-sm font-semibold text-[#303055] dark:text-[#f0f0f8]">
              Password
            </h3>
          </div>
          <p className="text-xs text-[#6b6b7b] dark:text-[#8c8ca6]">
            Keep your account secure by regularly updating your password.
          </p>
          {formattedPasswordDate ? (
            <p className="text-[11px] font-mono text-[#8c8ca6] dark:text-[#6b6b7b]">
              Password last changed: {formattedPasswordDate}
            </p>
          ) : formattedAccountDate ? (
            <p className="text-[11px] font-mono text-[#8c8ca6] dark:text-[#6b6b7b]">
              Account profile last updated: {formattedAccountDate}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          data-testid="change-password-btn"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-semibold text-white dark:text-[#0B1018] bg-[#303055] hover:bg-[#252542] dark:bg-[#22D3EE] dark:hover:bg-[#06B6D4] transition-colors min-h-[40px] shrink-0"
        >
          <Lock className="w-3.5 h-3.5" />
          Change Password
        </button>
      </div>

      {/* Security Recommendations */}
      <div className="border-t border-[#e4e4ed] dark:border-[#26263b] pt-4 space-y-2">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#8c8ca6]">
          Password Security Recommendations
        </h4>
        <ul className="text-xs text-[#6b6b7b] dark:text-[#8c8ca6] space-y-1.5 list-disc list-inside">
          <li>Use at least 8 characters with a mix of uppercase, lowercase, numbers, and symbols.</li>
          <li>Avoid using common phrases, dictionary words, or personal information.</li>
          <li>Never reuse passwords across critical services or CyberTube environments.</li>
        </ul>
      </div>

      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userEmail={userEmail}
        isOAuthOnly={isOAuthOnly}
        onSuccess={() => {
          setLastPasswordChangeDate(new Date().toISOString());
        }}
      />
    </section>
  );
}

