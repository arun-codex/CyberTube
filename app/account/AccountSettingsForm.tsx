'use client';

import React, { useState } from 'react';
import { updateProfileAction } from '@/app/actions/auth';
import { CYBERSECURITY_DOMAINS } from '@/data/metadata';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { AvatarUploadControl } from '@/components/profile/AvatarUploadControl';

interface AccountSettingsFormProps {
  initialProfile: any;
  userEmail: string;
}

export function AccountSettingsForm({ initialProfile, userEmail }: AccountSettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialProfile?.interests || []
  );

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.delete('interests');
    selectedInterests.forEach((interest) => formData.append('interests', interest));

    try {
      await updateProfileAction(formData);
      setSuccessMessage('Your profile settings have been saved.');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to update profile settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Avatar Upload Control */}
      <AvatarUploadControl
        initialAvatarUrl={initialProfile?.avatar_url}
        providerAvatarUrl={initialProfile?.avatar_url}
        displayName={initialProfile?.display_name}
        email={userEmail}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {successMessage && (
          <div className="flex items-center gap-2 p-3 bg-[#e8f5e9] dark:bg-[#132d18] border border-[#a5d6a7] dark:border-[#2e7d32] text-[#2e7d32] dark:text-[#a5d6a7] text-xs font-mono rounded-[4px]">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2 p-3 bg-[#fbeaea] dark:bg-[#341818] border border-[#e8b5b5] dark:border-[#6a2929] text-[#984e4d] dark:text-[#f2a5a5] text-xs font-mono rounded-[4px]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Row 1: Display Name & Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="displayName" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#a0a0b8]">
              Display Name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              defaultValue={initialProfile?.display_name || ''}
              className="w-full bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#6366f1] min-h-[40px]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#a0a0b8]">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="sec_researcher"
              defaultValue={initialProfile?.username || ''}
              className="w-full bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#6366f1] min-h-[40px]"
            />
          </div>
        </div>

        {/* Row 2: Experience, Language, Country */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="experienceLevel" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#a0a0b8]">
              Experience Level
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              defaultValue={initialProfile?.experience_level || 'beginner'}
              className="w-full bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#6366f1] min-h-[40px]"
            >
              <option value="beginner">Beginner (Foundations)</option>
              <option value="intermediate">Intermediate (Practitioner)</option>
              <option value="advanced">Advanced (Reverse Engineering)</option>
              <option value="professional">Professional (SOC / Red Team)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="preferredLanguage" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#a0a0b8]">
              Language
            </label>
            <input
              id="preferredLanguage"
              name="preferredLanguage"
              type="text"
              defaultValue={initialProfile?.preferred_language || 'English'}
              className="w-full bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#6366f1] min-h-[40px]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="countryCode" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#a0a0b8]">
              Country Code
            </label>
            <input
              id="countryCode"
              name="countryCode"
              type="text"
              placeholder="US, DE, IN..."
              defaultValue={initialProfile?.country_code || ''}
              className="w-full bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#6366f1] min-h-[40px]"
            />
          </div>
        </div>

        {/* Row 3: Primary Goal */}
        <div className="space-y-1.5">
          <label htmlFor="primaryLearningGoal" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#a0a0b8]">
            Primary Learning Goal
          </label>
          <input
            id="primaryLearningGoal"
            name="primaryLearningGoal"
            type="text"
            placeholder="e.g. Master network packet inspection and Wireshark filters"
            defaultValue={initialProfile?.primary_learning_goal || ''}
            className="w-full bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#6366f1] min-h-[40px]"
          />
        </div>

        {/* Row 4: Bio */}
        <div className="space-y-1.5">
          <label htmlFor="bio" className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#a0a0b8]">
            Bio / Background
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            placeholder="Brief description of your security focus or technical interests..."
            defaultValue={initialProfile?.bio || ''}
            className="w-full bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] dark:text-[#f0f0f8] focus:outline-none focus:border-[#303055] dark:focus:border-[#6366f1]"
          />
        </div>

        {/* Domain Interests Multi-Select Checkboxes */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#a0a0b8]">
            Preferred Cybersecurity Domains & Specializations
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
            {CYBERSECURITY_DOMAINS.map((domain) => {
              const isChecked = selectedInterests.includes(domain.id);
              return (
                <label
                  key={domain.id}
                  className={`flex items-center gap-2.5 p-2.5 rounded-[4px] border cursor-pointer transition-colors text-xs font-mono ${
                    isChecked
                      ? 'border-[#303055] dark:border-[#6366f1] bg-[#e8e8f2] dark:bg-[#1e1e32] text-[#303055] dark:text-white font-medium'
                      : 'border-[#e4e4ed] dark:border-[#26263b] bg-white dark:bg-[#141422] text-[#403f53] dark:text-[#a0a0b8] hover:border-[#d2d2dc]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleInterest(domain.id)}
                    className="rounded border-[#e4e4ed] text-[#303055] focus:ring-0"
                  />
                  <span className="truncate">{domain.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-[#e4e4ed] dark:border-[#26263b] flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#303055] dark:bg-[#6366f1] hover:bg-[#252542] dark:hover:bg-[#4f46e5] text-white text-xs font-medium min-h-[44px] transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{loading ? 'Saving Preferences...' : 'Save Account Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
