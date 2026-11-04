import React from 'react';
import { redirect } from 'next/navigation';
import { Shield, User, Mail, Award, Globe, Target, LogOut, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { logoutAction, updateProfileAction } from '@/app/actions/auth';
import { CYBERSECURITY_DOMAINS } from '@/data/metadata';

export default async function AccountPage() {
  const supabase = await createClient();

  // If Supabase is unconfigured, display guidance
  if (!supabase) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-amber-300">
          <h2 className="text-xl font-bold mb-2">Supabase Environment Unconfigured</h2>
          <p className="text-sm text-slate-300 mb-4">
            Cloud profile synchronization requires Supabase project configuration in <code className="text-amber-200">.env.local</code>.
          </p>
          <p className="text-xs text-slate-400">
            Please see <code className="text-amber-200">.env.example</code> and <code className="text-amber-200">docs/phase-2-setup.md</code>.
          </p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?redirect=/account');
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: any };

  const userInterests: string[] = profile?.interests || [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Profile Summary */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 mb-8 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-2xl shadow-lg shadow-emerald-950/50">
            {profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {profile?.display_name || 'Practitioner'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 capitalize">
                {profile?.experience_level || 'Learner'}
              </span>
            </div>
            <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </p>
          </div>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>

      {/* Profile Form */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-md">
        <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-400" />
          Learner Profile & Learning Preferences
        </h2>
        <p className="text-sm text-slate-400 mb-8">
          Personalize your learning goals, experience level, and primary domains of cybersecurity interest.
        </p>

        <form action={updateProfileAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Display Name
              </label>
              <input
                name="displayName"
                type="text"
                defaultValue={profile?.display_name || ''}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Username (Handle)
              </label>
              <input
                name="username"
                type="text"
                placeholder="e.g. sec_researcher_01"
                defaultValue={profile?.username || ''}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                Experience Level
              </label>
              <select
                name="experienceLevel"
                defaultValue={profile?.experience_level || 'beginner'}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="beginner">Beginner (Foundations & Labs)</option>
                <option value="intermediate">Intermediate (Practitioner)</option>
                <option value="advanced">Advanced (Specialist / Exploit Dev)</option>
                <option value="professional">Professional (Industry Expert)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                Preferred Language
              </label>
              <input
                name="preferredLanguage"
                type="text"
                defaultValue={profile?.preferred_language || 'English'}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Country / Region Code
              </label>
              <input
                name="countryCode"
                type="text"
                placeholder="US, IN, GB, DE..."
                defaultValue={profile?.country_code || ''}
                maxLength={2}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              Primary Learning Goal
            </label>
            <input
              name="primaryLearningGoal"
              type="text"
              placeholder="e.g. Master offensive memory corruption & pass OSCP / CEH Practical"
              defaultValue={profile?.primary_learning_goal || ''}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Bio / Focus Area
            </label>
            <textarea
              name="bio"
              rows={3}
              placeholder="Tell other learners about your current security research or focus..."
              defaultValue={profile?.bio || ''}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Cybersecurity Interests & Domains (Select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CYBERSECURITY_DOMAINS.map((domain) => {
                const checked = userInterests.includes(domain.id);
                return (
                  <label
                    key={domain.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      checked
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="interests"
                      value={domain.id}
                      defaultChecked={checked}
                      className="mt-1 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">{domain.name}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{domain.shortDescription}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-lg shadow-emerald-950/40"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
