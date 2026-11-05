import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Mail, Settings, Shield, BookOpen, Layers, Award, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { CYBERSECURITY_DOMAINS } from '@/data/metadata';
import { EnrolledCoursesList } from './EnrolledCoursesList';
import { UserAvatar } from '@/components/ui/UserAvatar';

export default async function ProfilePage() {
  const supabase = await createClient();

  if (!supabase) {
    redirect('/login?redirect=/profile');
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?redirect=/profile');
  }

  const { data: profile } = await (supabase
    .from('profiles') as any)
    .select('*')
    .eq('id', user.id)
    .single() as { data: any };

  const userInterests: string[] = profile?.interests || [];

  return (
    <div className="container-max py-10 space-y-8">
      {/* Redesigned Profile Header Container */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#1E293B] bg-white dark:bg-[#121A26] overflow-hidden shadow-sm transition-colors">
        {/* Cover / Profile Visual Banner */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E293B] p-6 flex items-end justify-between relative border-b border-[#e4e4ed] dark:border-[#1E293B]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#E2E8F0]">
            <Shield className="w-4 h-4 text-[#22D3EE]" />
            <span>CyberTube Security Practitioner</span>
          </div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white/10 hover:bg-white/20 text-[#E2E8F0] hover:text-white border border-white/20 text-xs font-mono transition-colors min-h-[36px]"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Account Settings</span>
          </Link>
        </div>

        {/* Profile Identity Bar */}
        <div className="px-6 sm:px-8 pb-8 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <UserAvatar
                customAvatarUrl={profile?.avatar_url}
                providerAvatarUrl={profile?.avatar_url}
                displayName={profile?.display_name}
                email={user.email}
                size={80}
                className="w-20 h-20 rounded-[6px] border-2 border-[#e4e4ed] dark:border-[#334155] shadow-sm"
              />

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#303055] dark:text-[#E6EDF3]">
                    {profile?.display_name || user.email?.split('@')[0] || 'Practitioner'}
                  </h1>
                  {profile?.username && (
                    <span className="text-xs font-mono text-[#6b6b7b] dark:text-[#94A3B8]">
                      @{profile.username}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-[4px] text-xs font-mono bg-[#f4f4f9] dark:bg-[#1E293B] border border-[#e4e4ed] dark:border-[#334155] text-[#303055] dark:text-[#22D3EE] font-medium capitalize">
                    {profile?.experience_level || 'Beginner'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#6b6b7b] dark:text-[#94A3B8]">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {user.email}
                  </span>
                  {profile?.country_code && (
                    <span>Location: {profile.country_code}</span>
                  )}
                  {profile?.preferred_language && (
                    <span>Language: {profile.preferred_language}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <Link
                href="/saved"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1E293B] border border-[#e4e4ed] dark:border-[#334155] text-[#303055] dark:text-[#E6EDF3] hover:border-[#303055] dark:hover:border-[#22D3EE] transition-colors min-h-[40px]"
              >
                <Award className="w-3.5 h-3.5 text-[#303055] dark:text-[#22D3EE]" />
                <span>Saved Bookmarks</span>
              </Link>
            </div>
          </div>

          {/* Goal & Biography Section */}
          {(profile?.bio || profile?.primary_learning_goal) && (
            <div className="mt-6 pt-6 border-t border-[#e4e4ed] dark:border-[#1E293B] space-y-3">
              {profile?.primary_learning_goal && (
                <div className="text-xs font-mono flex items-center gap-2">
                  <span className="font-semibold uppercase tracking-wider text-[#6b6b7b] dark:text-[#94A3B8]">
                    Primary Objective:
                  </span>
                  <span className="text-[#303055] dark:text-[#E6EDF3] bg-[#f4f4f9] dark:bg-[#1E293B] px-2 py-0.5 rounded-[4px]">
                    {profile.primary_learning_goal}
                  </span>
                </div>
              )}
              {profile?.bio && (
                <p className="text-xs text-[#403f53] dark:text-[#94A3B8] leading-relaxed max-w-2xl">
                  {profile.bio}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Target Security Interests & Domains */}
      {userInterests.length > 0 && (
        <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#1E293B] bg-white dark:bg-[#121A26] p-6 space-y-3 transition-colors">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#94A3B8]">
            Selected Domains & Specializations
          </h2>
          <div className="flex flex-wrap gap-2">
            {userInterests.map((interestId) => {
              const domain = CYBERSECURITY_DOMAINS.find((d) => d.id === interestId);
              return (
                <Link
                  key={interestId}
                  href={`/discover?domain=${interestId}`}
                  className="px-2.5 py-1.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1E293B] border border-[#e4e4ed] dark:border-[#334155] text-xs font-mono text-[#303055] dark:text-[#E6EDF3] hover:border-[#303055] dark:hover:border-[#22D3EE] transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#6b6b7b] dark:text-[#94A3B8]" />
                  <span>{domain?.name || interestId}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Enrolled Courses & Learning Progress Dashboard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#303055] dark:text-[#E6EDF3]">
              Enrolled Tracks & Progress
            </h2>
            <p className="text-xs text-[#6b6b7b] dark:text-[#94A3B8]">
              Track your milestones, module completion, and structured course progression.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-mono text-[#303055] dark:text-[#22D3EE] hover:underline flex items-center gap-1"
          >
            <span>Browse All Tracks</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <EnrolledCoursesList userId={user.id} />
      </div>
    </div>
  );
}
