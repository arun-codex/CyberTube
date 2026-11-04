import React from 'react';
import { redirect } from 'next/navigation';
import { Mail, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { logoutAction, updateProfileAction } from '@/app/actions/auth';
import { CYBERSECURITY_DOMAINS } from '@/data/metadata';

export default async function AccountPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="container-max py-12">
        <div className="bg-[#fbeaea] border border-[#e8b5b5] rounded-[8px] p-6 text-[#984e4d] font-mono text-xs">
          <h2 className="text-sm font-semibold mb-2">Supabase Environment Unconfigured</h2>
          <p className="text-[#403f53] mb-4">
            Cloud profile synchronization requires Supabase project configuration in <code>.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?redirect=/account');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: any };

  const userInterests: string[] = profile?.interests || [];

  return (
    <div className="container-max py-10 space-y-8">
      {/* Header Profile Summary */}
      <div className="bg-[#f4f4f9] border border-[#e4e4ed] rounded-[8px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[4px] bg-[#303055] text-white flex items-center justify-center font-mono font-semibold text-xl">
            {profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#303055]">
                {profile?.display_name || 'Practitioner'}
              </h1>
              <span className="px-2 py-0.5 rounded-[4px] text-xs font-mono bg-white border border-[#e4e4ed] text-[#403f53] capitalize">
                {profile?.experience_level || 'Learner'}
              </span>
            </div>
            <p className="text-xs font-mono text-[#767682] flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </p>
          </div>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 px-3.5 py-2 rounded-[4px] text-xs font-medium text-[#403f53] hover:text-[#303055] bg-white border border-[#e4e4ed] hover:border-[#303055] transition-colors min-h-[38px]"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </form>
      </div>

      {/* Profile Form */}
      <div className="bg-white border border-[#e4e4ed] rounded-[8px] p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-[#303055]">
            Learner Profile & Preferences
          </h2>
          <p className="text-xs text-[#767682] mt-0.5">
            Manage your personal learning goals, experience level, and preferred domains.
          </p>
        </div>

        <form action={updateProfileAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#767682]">
                Display Name
              </label>
              <input
                name="displayName"
                type="text"
                defaultValue={profile?.display_name || ''}
                className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] focus:outline-none focus:border-[#303055] min-h-[38px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#767682]">
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="sec_researcher"
                defaultValue={profile?.username || ''}
                className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] focus:outline-none focus:border-[#303055] min-h-[38px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#767682]">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                defaultValue={profile?.experience_level || 'beginner'}
                className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] focus:outline-none focus:border-[#303055] min-h-[38px]"
              >
                <option value="beginner">Beginner (Foundations)</option>
                <option value="intermediate">Intermediate (Practitioner)</option>
                <option value="advanced">Advanced (Reverse Engineering)</option>
                <option value="professional">Professional (SOC / Red Team)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#767682]">
                Language
              </label>
              <input
                name="preferredLanguage"
                type="text"
                defaultValue={profile?.preferred_language || 'English'}
                className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] focus:outline-none focus:border-[#303055] min-h-[38px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#767682]">
                Country Code
              </label>
              <input
                name="countryCode"
                type="text"
                placeholder="US, IN, GB..."
                defaultValue={profile?.country_code || ''}
                maxLength={2}
                className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] uppercase focus:outline-none focus:border-[#303055] min-h-[38px]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#767682]">
              Primary Learning Goal
            </label>
            <input
              name="primaryLearningGoal"
              type="text"
              placeholder="e.g. Master Wireshark packet dissection & pass BAP"
              defaultValue={profile?.primary_learning_goal || ''}
              className="w-full bg-[#f4f4f9] border border-[#e4e4ed] rounded-[4px] px-3 py-2 text-xs font-mono text-[#303055] focus:outline-none focus:border-[#303055] min-h-[38px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#767682]">
              Interests & Domains
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
              {CYBERSECURITY_DOMAINS.map((domain) => {
                const checked = userInterests.includes(domain.id);
                return (
                  <label
                    key={domain.id}
                    className={`flex items-start gap-2 p-2.5 rounded-[4px] border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#e8e8f2] border-[#303055] text-[#303055]'
                        : 'bg-[#f4f4f9] border-[#e4e4ed] text-[#403f53] hover:border-[#d2d2dc]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="interests"
                      value={domain.id}
                      defaultChecked={checked}
                      className="mt-0.5 rounded-[3px] border-[#e4e4ed] text-[#303055] focus:ring-0"
                    />
                    <div className="text-xs">
                      <p className="font-semibold">{domain.name}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[4px] text-xs font-medium text-white bg-[#303055] hover:bg-[#252542] transition-colors min-h-[44px]"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
