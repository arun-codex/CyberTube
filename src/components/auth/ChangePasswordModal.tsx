'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Mail,
  Loader2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  isOAuthOnly?: boolean;
  onSuccess?: () => void;
}

type Stage = 'verify' | 'set-new' | 'success';
type VerifyMethod = 'password' | 'email-otp';

function getPasswordStrength(pwd: string): {
  score: number;
  label: 'Weak' | 'Fair' | 'Strong';
  colorClass: string;
  bgClass: string;
  percent: number;
} {
  if (!pwd) {
    return { score: 0, label: 'Weak', colorClass: 'text-red-500', bgClass: 'bg-red-500', percent: 0 };
  }
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (pwd.length >= 12) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[a-z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

  if (score <= 2) {
    return { score, label: 'Weak', colorClass: 'text-[#984e4d] dark:text-[#f87171]', bgClass: 'bg-[#ef4444]', percent: 33 };
  } else if (score <= 4) {
    return { score, label: 'Fair', colorClass: 'text-[#b45309] dark:text-[#fbbf24]', bgClass: 'bg-[#f59e0b]', percent: 66 };
  } else {
    return { score, label: 'Strong', colorClass: 'text-[#047857] dark:text-[#34d399]', bgClass: 'bg-[#10b981]', percent: 100 };
  }
}

export function ChangePasswordModal({
  isOpen,
  onClose,
  userEmail,
  isOAuthOnly = false,
  onSuccess,
}: ChangePasswordModalProps) {
  const [stage, setStage] = useState<Stage>('verify');
  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>(isOAuthOnly ? 'email-otp' : 'password');

  // Input fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset modal state on open/close
  useEffect(() => {
    if (isOpen) {
      setStage('verify');
      setVerifyMethod(isOAuthOnly ? 'email-otp' : 'password');
      setCurrentPassword('');
      setShowCurrentPassword(false);
      setOtpCode('');
      setOtpSent(false);
      setNewPassword('');
      setShowNewPassword(false);
      setConfirmPassword('');
      setShowConfirmPassword(false);
      setError(null);
      setLoading(false);
    }
  }, [isOpen, isOAuthOnly]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle Stage 1: Send Reauthentication Challenge (Email OTP)
  async function handleSendChallenge() {
    setError(null);
    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setError('Authentication service is unconfigured.');
      setLoading(false);
      return;
    }

    try {
      const { error: reauthError } = await supabase.auth.reauthenticate();
      if (reauthError) {
        setError(reauthError.message || 'Unable to send verification code. Please check your connection and try again.');
        setLoading(false);
        return;
      }
      setOtpSent(true);
    } catch {
      setError('Unable to send verification code. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  // Handle Stage 1: Verify Identity
  async function handleVerifyIdentity(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError('Authentication service is unconfigured.');
      return;
    }

    if (verifyMethod === 'password') {
      if (!currentPassword) {
        setError('Please enter your current password.');
        return;
      }

      setLoading(true);
      try {
        // Authenticate against Supabase to verify current password
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password: currentPassword,
        });

        if (signInError) {
          setError('Your current password is incorrect. Please try again.');
          setLoading(false);
          return;
        }

        // Successfully verified current password
        setStage('set-new');
      } catch {
        setError('Unable to verify your current password. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    } else {
      // Email OTP verification
      const cleanOtp = otpCode.trim();
      if (!cleanOtp || cleanOtp.length < 6) {
        setError('The verification code is incorrect or expired.');
        return;
      }

      setStage('set-new');
    }
  }

  // Handle Stage 2: Set New Password & Update Supabase
  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('Choose a stronger password with at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Your new passwords do not match.');
      return;
    }

    if (verifyMethod === 'password' && currentPassword && newPassword === currentPassword) {
      setError('Your new password must be different from your current password.');
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError('Authentication service is unconfigured.');
      return;
    }

    setLoading(true);
    try {
      let updatePayload: { password: string; current_password?: string; nonce?: string } = {
        password: newPassword,
      };

      if (verifyMethod === 'password' && currentPassword) {
        updatePayload.current_password = currentPassword;
      } else if (verifyMethod === 'email-otp' && otpCode) {
        updatePayload.nonce = otpCode.trim();
      }

      const { error: updateError } = await supabase.auth.updateUser(updatePayload);

      if (updateError) {
        const msg = updateError.message.toLowerCase();
        if (msg.includes('current password') || msg.includes('incorrect')) {
          setError('Your current password is incorrect. Please try again.');
        } else if (msg.includes('same password') || msg.includes('different')) {
          setError('Your new password must be different from your current password.');
        } else if (msg.includes('nonce') || msg.includes('otp') || msg.includes('verification code')) {
          setError('The verification code is incorrect or expired.');
        } else if (msg.includes('reauthenticate') || msg.includes('recent login')) {
          setError('Please verify your identity again before changing your password.');
        } else if (msg.includes('session') || msg.includes('expired') || (updateError as any).status === 401) {
          setError('Your session has expired. Sign in again to continue.');
        } else {
          setError(updateError.message);
        }
        setLoading(false);
        return;
      }

      // Password updated successfully
      setStage('success');
      if (onSuccess) onSuccess();
    } catch {
      setError('Unable to update your password. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const strength = getPasswordStrength(newPassword);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-[#121A26] border border-[#e4e4ed] dark:border-[#243044] rounded-[8px] shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 text-[#6b6b7b] dark:text-[#8c8ca6] hover:text-[#303055] dark:hover:text-[#f0f0f8] p-1 rounded-[4px] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] bg-[#303055] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] mx-auto">
            {stage === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : stage === 'set-new' ? (
              <KeyRound className="w-5 h-5" />
            ) : (
              <Shield className="w-5 h-5" />
            )}
          </div>
          <h2
            id="change-password-modal-title"
            className="text-lg sm:text-xl font-semibold text-[#303055] dark:text-[#f0f0f8]"
          >
            {stage === 'verify' && 'Verify Your Identity'}
            {stage === 'set-new' && 'Set Your New Password'}
            {stage === 'success' && 'Password Changed Successfully'}
          </h2>
          <p className="text-xs text-[#6b6b7b] dark:text-[#8c8ca6] leading-relaxed">
            {stage === 'verify' &&
              'For your security, verify your current credentials before changing your password.'}
            {stage === 'set-new' &&
              'Choose a strong password to protect your CyberTube account.'}
            {stage === 'success' &&
              'Your CyberTube account password has been updated.'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="p-3 rounded-[4px] bg-[#fbeaea] dark:bg-[#3d1a1a] border border-[#e8b5b5] dark:border-[#7a2e2e] text-[#984e4d] dark:text-[#f87171] text-xs flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* STAGE 1: VERIFY IDENTITY */}
        {stage === 'verify' && (
          <form onSubmit={handleVerifyIdentity} noValidate className="space-y-4">
            {verifyMethod === 'password' ? (
              <div className="space-y-1.5">
                <label
                  htmlFor="current-password"
                  className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#8c8ca6]"
                >
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b] dark:text-[#8c8ca6]" />
                  <input
                    id="current-password"
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] rounded-[4px] pl-9 pr-10 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#22D3EE] min-h-[42px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b7b] dark:text-[#8c8ca6] hover:text-[#303055] dark:hover:text-[#f0f0f8]"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-[4px] p-3 bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs text-[#403f53] dark:text-[#a0a0b8] flex items-start gap-2.5">
                  <Mail className="w-4 h-4 shrink-0 text-[#303055] dark:text-[#22D3EE] mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-[#303055] dark:text-[#f0f0f8]">
                      Verify through email
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      We will send a 6-digit verification code to <span className="font-mono font-medium">{userEmail}</span>.
                    </p>
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendChallenge}
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-[4px] bg-[#303055] hover:bg-[#252542] dark:bg-[#22D3EE] dark:hover:bg-[#06B6D4] text-white dark:text-[#0B1018] text-xs font-semibold transition-colors disabled:opacity-50 min-h-[42px] flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Send Verification Code
                  </button>
                ) : (
                  <div className="space-y-1.5">
                    <label
                      htmlFor="otp-code"
                      className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#8c8ca6]"
                    >
                      Verification Code
                    </label>
                    <input
                      id="otp-code"
                      name="otpCode"
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="6-digit code"
                      className="w-full bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] rounded-[4px] px-3 py-2 text-center text-sm font-mono tracking-widest text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#22D3EE] min-h-[42px]"
                    />
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={handleSendChallenge}
                        className="text-[11px] text-[#303055] dark:text-[#22D3EE] hover:underline"
                      >
                        Resend code
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Button for Stage 1 */}
            {(verifyMethod === 'password' || otpSent) && (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-[4px] bg-[#303055] hover:bg-[#252542] dark:bg-[#22D3EE] dark:hover:bg-[#06B6D4] text-white dark:text-[#0B1018] text-xs font-semibold transition-colors disabled:opacity-50 min-h-[42px] flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Verify & Continue
              </button>
            )}

            {/* Toggle Verification Method */}
            {!isOAuthOnly && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setVerifyMethod(verifyMethod === 'password' ? 'email-otp' : 'password');
                  }}
                  className="text-xs text-[#303055] dark:text-[#22D3EE] hover:underline"
                >
                  {verifyMethod === 'password'
                    ? 'Verify through email instead'
                    : 'Verify with current password instead'}
                </button>
              </div>
            )}
          </form>
        )}

        {/* STAGE 2: SET NEW PASSWORD */}
        {stage === 'set-new' && (
          <form onSubmit={handleUpdatePassword} noValidate className="space-y-4">
            {/* New Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="new-password"
                className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#8c8ca6]"
              >
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b] dark:text-[#8c8ca6]" />
                <input
                  id="new-password"
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] rounded-[4px] pl-9 pr-10 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#22D3EE] min-h-[42px]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b7b] dark:text-[#8c8ca6] hover:text-[#303055] dark:hover:text-[#f0f0f8]"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#6b6b7b] dark:text-[#8c8ca6]">Strength:</span>
                    <span className={`font-semibold ${strength.colorClass}`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#e4e4ed] dark:bg-[#243044] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.bgClass}`}
                      style={{ width: `${strength.percent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirm-new-password"
                className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#8c8ca6]"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b] dark:text-[#8c8ca6]" />
                <input
                  id="confirm-new-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] rounded-[4px] pl-9 pr-10 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#22D3EE] min-h-[42px]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b7b] dark:text-[#8c8ca6] hover:text-[#303055] dark:hover:text-[#f0f0f8]"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Recommendations Note */}
            <p className="text-[11px] text-[#6b6b7b] dark:text-[#8c8ca6] leading-relaxed">
              Use uppercase, lowercase, numbers, and symbols. Must differ from your current password.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-[4px] bg-[#303055] hover:bg-[#252542] dark:bg-[#22D3EE] dark:hover:bg-[#06B6D4] text-white dark:text-[#0B1018] text-xs font-semibold transition-colors disabled:opacity-50 min-h-[42px] flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Updating password...' : 'Update Password'}
            </button>
          </form>
        )}

        {/* STAGE 3: SUCCESS STATE */}
        {stage === 'success' && (
          <div className="space-y-5 text-center">
            <div className="p-4 rounded-[4px] bg-[#ecfdf5] dark:bg-[#064e3b]/30 border border-[#a7f3d0] dark:border-[#065f46] text-[#065f46] dark:text-[#34d399] space-y-2">
              <p className="text-xs font-medium leading-relaxed">
                Your password has been changed securely. You remain signed in across all CyberTube sessions.
              </p>
              <p className="text-[11px] font-mono text-[#047857] dark:text-[#a7f3d0]">
                Security status: Password updated just now
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-[4px] bg-[#303055] hover:bg-[#252542] dark:bg-[#22D3EE] dark:hover:bg-[#06B6D4] text-white dark:text-[#0B1018] text-xs font-semibold transition-colors min-h-[42px]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

