'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUser(user);

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
    }
    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-muted)' }}>Chargement...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 40, textAlign: 'center',
        boxShadow: '0 4px 24px rgba(30,40,60,0.08)',
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 900, color: '#fff',
          margin: '0 auto 24px',
        }}>
          {profile?.username?.[0]?.toUpperCase() || '?'}
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          Bienvenue, {profile?.username || 'Gamer'} ! 🎮
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>{user.email}</p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 8,
          background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)',
          color: 'var(--green)', fontSize: 13, fontWeight: 600, marginBottom: 32,
        }}>
          ✅ Compte actif — Plan Free
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/profile" style={{
            padding: '12px 24px', borderRadius: 10,
            background: 'linear-gradient(135deg, var(--cyan), #06b6d4)',
            color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>Voir mon profil</a>
          <a href="/lfg" style={{
            padding: '12px 24px', borderRadius: 10,
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>Trouver des coéquipiers</a>
          <button onClick={handleLogout} style={{
            padding: '12px 24px', borderRadius: 10,
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            color: 'var(--text-muted)', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>Se déconnecter</button>
        </div>
      </div>
    </div>
  );
}