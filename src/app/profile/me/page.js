'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const GAME_COLORS = {
  'Valorant': '#ff4655', 'CS2': '#de9b35',
  'League of Legends': '#c89b3c', 'Fortnite': '#9d4dbb',
  'Apex Legends': '#da292a', 'Rocket League': '#0066ff', 'Overwatch 2': '#f99e1a',
};

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(data);
      setLoading(false);
    }
    loadProfile();
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-muted)' }}>Chargement...</p>
    </div>
  );

  const firstGame = profile?.games?.[0];
  const bannerColor = GAME_COLORS[firstGame] || 'var(--cyan)';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>

      {/* Carte profil */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, overflow: 'hidden', marginBottom: 20,
      }}>
        {/* Banner */}
        <div style={{
          height: 100,
          background: `linear-gradient(135deg, ${bannerColor}22, var(--violet)22)`,
          borderBottom: '1px solid var(--border)',
        }} />

        <div style={{ padding: '0 32px 28px' }}>
          {/* Avatar + bouton éditer */}
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginTop: -32, marginBottom: 16,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 900, color: '#fff',
              border: '4px solid var(--bg-card)',
            }}>
              {profile?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <a href="/profile/edit" style={{
              padding: '8px 18px', borderRadius: 8,
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
              textDecoration: 'none',
            }}>✏️ Éditer</a>
          </div>

          {/* Nom */}
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            {profile?.username || 'Gamer'}
          </h1>

          {/* Bio */}
          {profile?.bio && (
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>
              {profile.bio}
            </p>
          )}

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>

            {/* Jeux */}
            {profile?.games?.map(g => (
              <span key={g} style={{
                padding: '4px 12px', borderRadius: 6,
                background: `${GAME_COLORS[g] || 'var(--cyan)'}18`,
                color: GAME_COLORS[g] || 'var(--cyan)',
                border: `1px solid ${GAME_COLORS[g] || 'var(--cyan)'}35`,
                fontSize: 12, fontWeight: 600,
              }}>{g}</span>
            ))}

            {/* Styles */}
            {profile?.styles?.map(s => (
              <span key={s} style={{
                padding: '4px 12px', borderRadius: 6,
                background: 'rgba(124,58,237,0.08)', color: 'var(--violet)',
                border: '1px solid rgba(124,58,237,0.2)',
                fontSize: 12, fontWeight: 500,
              }}>{s}</span>
            ))}

            {/* Disponibilités */}
            {profile?.availabilities?.map(a => (
              <span key={a} style={{
                padding: '4px 12px', borderRadius: 6,
                background: 'rgba(22,163,74,0.08)', color: 'var(--green)',
                border: '1px solid rgba(22,163,74,0.2)',
                fontSize: 12, fontWeight: 500,
              }}>🕐 {a}</span>
            ))}

            {/* Langues */}
            {profile?.languages?.map(l => (
              <span key={l} style={{
                padding: '4px 10px', borderRadius: 6,
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
              }}>🌐 {l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Section stats */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 32, textAlign: 'center',
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🎮</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Aucun jeu connecté</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
          Connecte ton compte Riot ou Steam pour afficher tes vraies stats.
        </p>
        <button style={{
          padding: '10px 24px', borderRadius: 8, border: 'none',
          background: 'linear-gradient(135deg, var(--cyan), #06b6d4)',
          color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'inherit',
        }}>+ Connecter un jeu</button>
      </div>

    </div>
  );
}