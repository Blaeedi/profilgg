'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUser(user);

      const [{ data: p }, { data: g }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('user_games').select('*').eq('user_id', user.id),
      ]);
      setProfile(p);
      setGames(g || []);
    }
    load();
  }, []);

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-3)' }}>Chargement...</p>
    </div>
  );

  const username = profile?.username || user.email?.split('@')[0];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.02em', marginBottom: 4 }}>
          Bonjour, {username} 👋
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-2)' }}>
          Voici un aperçu de ton activité ProfilGG.
        </p>
      </div>

      {/* Stats cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12, marginBottom: 24,
      }}>
        {[
          { label: 'Jeux connectés', value: games.length, icon: '🎮', color: 'var(--teal)' },
          { label: 'Plan actuel', value: 'Free', icon: '⭐', color: 'var(--violet)' },
          { label: 'Profil complété', value: profile?.bio ? '80%' : '40%', icon: '📊', color: 'var(--teal)' },
          { label: 'Sessions coaching', value: '0', icon: '🏆', color: 'var(--violet)' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', border: '1px solid var(--border)',
            borderRadius: 14, padding: '20px 22px',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions rapides */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 14, marginBottom: 24,
      }}>

        {/* Profil */}
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 14, padding: 24, boxShadow: 'var(--shadow-sm)',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Mon profil</h3>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16, lineHeight: 1.5 }}>
            {profile?.bio || 'Complète ta bio et tes jeux pour apparaître dans le LFG.'}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/profile/me" style={{
              padding: '8px 16px', borderRadius: 8,
              background: 'var(--teal)', color: '#fff',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}>Voir</a>
            <a href="/profile/edit" style={{
              padding: '8px 16px', borderRadius: 8,
              background: 'var(--bg)', border: '1px solid var(--border)',
              color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}>Éditer</a>
          </div>
        </div>

        {/* Jeux */}
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 14, padding: 24, boxShadow: 'var(--shadow-sm)',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Jeux connectés</h3>
          {games.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16, lineHeight: 1.5 }}>
              Connecte Riot ou Steam pour afficher tes vraies stats sur ton profil.
            </p>
          ) : (
            <div style={{ marginBottom: 16 }}>
              {games.map(g => (
                <div key={g.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: '1px solid var(--border)',
                  fontSize: 13,
                }}>
                  <span style={{ fontWeight: 600 }}>{g.game_name}</span>
                  <span style={{ color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{g.rank}</span>
                </div>
              ))}
            </div>
          )}
          <a href="/games/connect" style={{
            padding: '8px 16px', borderRadius: 8,
            background: 'var(--teal)', color: '#fff',
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            display: 'inline-block',
          }}>+ Connecter un jeu</a>
        </div>

        {/* LFG */}
        <div style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 14, padding: 24, boxShadow: 'var(--shadow-sm)',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Looking for Group</h3>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16, lineHeight: 1.5 }}>
            Trouve des coéquipiers sérieux filtrés par jeu, niveau et style.
          </p>
          <a href="/lfg" style={{
            padding: '8px 16px', borderRadius: 8,
            background: 'var(--violet)', color: '#fff',
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            display: 'inline-block',
          }}>Trouver des coéquipiers</a>
        </div>

      </div>

      {/* Upgrade plan */}
      <div style={{
        background: 'linear-gradient(135deg, var(--teal-bg), var(--violet-bg))',
        border: '1px solid var(--teal-border)',
        borderRadius: 14, padding: '24px 28px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
            Passe à Player ⭐ — 7€/mois
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
            Stats illimitées, LFG illimité, badge vérifié. Essai 14 jours gratuit.
          </p>
        </div>
        <a href="/pricing" style={{
          padding: '10px 24px', borderRadius: 10,
          background: 'var(--teal)', color: '#fff',
          fontSize: 14, fontWeight: 600, textDecoration: 'none',
          boxShadow: '0 2px 12px rgba(13,148,136,.2)',
          whiteSpace: 'nowrap',
        }}>Essayer gratuitement</a>
      </div>

    </div>
  );
}