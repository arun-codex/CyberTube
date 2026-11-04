import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Mail, Settings, Shield, BookOpen, Layers, Award, Terminal, ArrowRight, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { CYBERSECURITY_DOMAINS } from '@/data/metadata';
import { EnrolledCoursesList } from './EnrolledCoursesList';
import { UserAvatar } from '@/components/ui/UserAvatar';

export default async function ProfilePage() {
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
    redirect('/login?redirect=/profile');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: any };

  const userInterests: string[] = profile?.interests || [];

  return (
    <div className="container-max py-10 space-y-8">
      {/* Cover / Profile Banner Area */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#26263b] bg-white dark:bg-[#0e0e17] overflow-hidden shadow-sm transition-colors">
        {/* Visual Cover Header */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-[#141424] via-[#303055] to-[#252542] dark:from-[#0a0a10] dark:via-[#1a1a2b] dark:to-[#12121f] p-6 flex items-end justify-between relative">
          <div className="font-mono text-[11px] text-white/60 uppercase tracking-widest">
            CyberTube Security Practitioner
          </div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-mono transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Edit Settings</span>
          </Link>
        </div>

        {/* Profile Card Summary Body */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-12 sm:-mt-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <UserAvatar
              customAvatarUrl={profile?.avatar_url}
              providerAvatarUrl={profile?.avatar_url}
              displayName={profile?.display_name}
              email={user.email}
              size={88}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-[6px] border-4 border-white dark:border-[#0e0e17] shadow-md"
            />

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-[#303055] dark:text-[#f0f0f8]">
                  {profile?.display_name || 'Practitioner'}
                </h1>
                {profile?.username && (
                  <span className="text-xs font-mono text-[#6b6b7b] dark:text-[#8c8ca6]">
                    @{profile.username}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-[4px] text-xs font-mono bg-[#f4f4f9] dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] text-[#403f53] dark:text-[#a0a0b8] capitalize">
                  {profile?.experience_level || 'Learner'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#6b6b7b] dark:text-[#8c8ca6] pt-1">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </span>
                {profile?.country_code && (
                  <span>Country: {profile.country_code}</span>
                )}
                {profile?.preferred_language && (
                  <span>Lang: {profile.preferred_language}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <Link
              href="/saved"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] text-[#303055] dark:text-[#f0f0f8] hover:border-[#303055] transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Saved Bookmarks</span>
            </Link>
          </div>
        </div>

        {/* Bio & Primary Goal */}
        {(profile?.bio || profile?.primary_learning_goal) && (
          <div className="px-6 sm:px-8 pb-6 border-t border-[#e4e4ed] dark:border-[#26263b] pt-4 space-y-2">
            {profile?.primary_learning_goal && (
              <div className="text-xs font-mono flex items-center gap-2 text-[#303055] dark:text-[#f0f0f8]">
                <span className="font-semibold uppercase tracking-wider text-[#6b6b7b] dark:text-[#8c8ca6]">
                  Primary Goal:
                </span>
                <span>{profile.primary_learning_goal}</span>
              </div>
            )}
            {profile?.bio && (
              <p className="text-xs text-[#403f53] dark:text-[#c0c0d4] leading-relaxed max-w-2xl">
                {profile.bio}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Target Security Interests */}
      {userInterests.length > 0 && (
        <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#26263b] bg-white dark:bg-[#0e0e17] p-6 space-y-3 transition-colors">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#8c8ca6]">
            Selected Domains & Specializations
          </h2>
          <div className="flex flex-wrap gap-2">
            {userInterests.map((interestId) => {
              const domain = CYBERSECURITY_DOMAINS.find((d) => d.id === interestId);
              return (
                <Link
                  key={interestId}
                  href={`/discover?domain=${interestId}`}
                  className="px-2.5 py-1 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] text-xs font-mono text-[#303055] dark:text-[#f0f0f8] hover:border-[#303055] dark:hover:border-[#6366f1] transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3 h-3 text-[#6b6b7b]" />
                  <span>{domain?.name || interestId}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Enrolled Courses Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#303055] dark:text-[#f0f0f8]">
              Enrolled Tracks & Progress
            </h2>
            <p className="text-xs text-[#6b6b7b] dark:text-[#8c8ca6]">
              Real-time synchronization with local learning milestones and completed modules.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-mono text-[#303055] dark:text-[#6366f1] hover:underline flex items-center gap-1"
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
