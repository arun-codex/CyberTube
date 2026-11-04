import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Mail, LogOut, User, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { logoutAction } from '@/app/actions/auth';
import { AccountSettingsForm } from './AccountSettingsForm';

export default async function AccountPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="container-max py-12">
        <div className="bg-[#fbeaea] dark:bg-[#2b1818] border border-[#e8b5b5] dark:border-[#522525] rounded-[8px] p-6 text-[#984e4d] dark:text-[#f2a5a5] font-mono text-xs">
          <h2 className="text-sm font-semibold mb-2">Supabase Environment Unconfigured</h2>
          <p className="text-[#403f53] dark:text-[#c0c0d4] mb-4">
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

  const provider = user.app_metadata?.provider || 'email';

  return (
    <div className="container-max py-10 space-y-8">
      {/* Account Settings Header */}
      <div className="bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] rounded-[8px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
        <div className="flex items-center gap-4">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile?.display_name || user.email || 'Avatar'}
              width={56}
              height={56}
              loading="lazy"
              className="w-14 h-14 rounded-[4px] object-cover border border-[#e4e4ed] dark:border-[#26263b]"
            />
          ) : (
            <div className="w-14 h-14 rounded-[4px] bg-[#303055] dark:bg-[#6366f1] text-white flex items-center justify-center font-mono font-semibold text-2xl">
              {profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#303055] dark:text-[#f0f0f8]">
                {profile?.display_name || 'Practitioner'}
              </h1>
              <span className="px-2 py-0.5 rounded-[4px] text-xs font-mono bg-white dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] text-[#403f53] dark:text-[#a0a0b8] capitalize">
                {profile?.experience_level || 'Learner'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#6b6b7b] dark:text-[#8c8ca6] mt-1">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {user.email}
              </span>
              <span>•</span>
              <span className="uppercase tracking-wider">
                Auth: {provider}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/profile"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-medium text-[#303055] dark:text-[#f0f0f8] bg-white dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] hover:border-[#303055] dark:hover:border-[#6366f1] transition-colors min-h-[44px]"
          >
            <User className="w-3.5 h-3.5" />
            View Public Profile
          </Link>

          <form action={logoutAction} className="flex-1 md:flex-initial">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-medium text-[#984e4d] bg-white dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] hover:border-[#984e4d] transition-colors min-h-[44px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {/* Main Settings Form */}
      <div className="bg-white dark:bg-[#0e0e17] border border-[#e4e4ed] dark:border-[#26263b] rounded-[8px] p-6 sm:p-8 space-y-6 transition-colors">
        <div>
          <h2 className="text-base font-semibold text-[#303055] dark:text-[#f0f0f8]">
            Account Configuration & Learning Preferences
          </h2>
          <p className="text-xs text-[#6b6b7b] dark:text-[#8c8ca6] mt-0.5">
            Update your profile identity, experience tier, and target security specializations.
          </p>
        </div>

        <AccountSettingsForm initialProfile={profile} userEmail={user.email || ''} />
      </div>
    </div>
  );
}
