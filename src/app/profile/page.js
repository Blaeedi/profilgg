'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/profile/me');
      } else {
        router.push('/login');
      }
    }
    redirect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-muted)' }}>Chargement...</p>
    </div>
  );
}