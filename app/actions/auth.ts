'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAuthCallbackUrl, getSiteOrigin } from '@/lib/canonicalUrl';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const redirectPath = (formData.get('redirect') as string) || '/';

  if (!email || !password) {
    return { error: 'Please enter both email and password.' };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      error: 'Supabase credentials are not configured in this environment. Please see .env.example.',
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect(redirectPath);
}

export async function registerAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const displayName = formData.get('displayName') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      error: 'Supabase credentials are not configured in this environment. Please see .env.example.',
    };
  }

  const origin = getSiteOrigin();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/account`,
      data: {
        display_name: displayName || email.split('@')[0],
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: true,
    message: 'Registration successful! Please check your email to verify your account or proceed to login.',
  };
}

export async function logoutAction() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function forgotPasswordAction(formData: FormData) {
  const emailValue = formData.get('email');
  const email = typeof emailValue === 'string' ? emailValue.trim().toLowerCase() : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      error: 'Supabase credentials are not configured. Please see .env.example.',
    };
  }

  const origin = getSiteOrigin();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // Use the existing PKCE callback so the recovery code is exchanged into the SSR cookie session.\n    redirectTo: getAuthCallbackUrl('/reset-password'),
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: true,
    message: 'If an account exists with that email, a password reset link has been dispatched.',
  };
}

export async function updateProfileAction(formData: FormData): Promise<void> {
  const supabase = await createClient();
  if (!supabase) {
    throw new Error('Database unconfigured.');
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('Unauthorized.');
  }

  const displayName = formData.get('displayName') as string;
  const username = formData.get('username') as string;
  const bio = formData.get('bio') as string;
  const experienceLevel = formData.get('experienceLevel') as any;
  const preferredLanguage = formData.get('preferredLanguage') as string;
  const countryCode = formData.get('countryCode') as string;
  const primaryLearningGoal = formData.get('primaryLearningGoal') as string;
  const interests = formData.getAll('interests') as string[];

  const { error } = await (supabase
    .from('profiles') as any)
    .update({
      display_name: displayName,
      username: username || null,
      bio: bio || null,
      experience_level: experienceLevel || null,
      preferred_language: preferredLanguage || 'English',
      country_code: countryCode || null,
      primary_learning_goal: primaryLearningGoal || null,
      interests: interests || [],
    })
    .eq('id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/account');
}
