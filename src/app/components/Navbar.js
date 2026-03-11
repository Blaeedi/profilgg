'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Récupère la session au chargement
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Écoute les changements de session en temps réel
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(248,249,252,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px', height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 13, color: '#fff',
        }}>G</div>
        <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Profil<span style={{ color: 'var(--cyan)' }}>GG</span>
        </span>
      </a>

      {/* Liens */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {['Accueil', 'Actus', 'Profil', 'LFG', 'Coachs'].map((item) => (
          <a key={item}
            href={
  item === 'Accueil' ? '/' :
  item === 'Profil' ? '/profile/me' :
  `/${item.toLowerCase()}`
}
            style={{
              padding: '6px 12px', borderRadius: 8,
              fontSize: 13, fontWeight: 500,
              color: 'var(--text-secondary)', textDecoration: 'none',
            }}>
            {item}
          </a>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {user ? (
          <>
            <a href="/dashboard" style={{
              padding: '7px 14px', borderRadius: 8,
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
              textDecoration: 'none',
            }}>
              {user.user_metadata?.username || user.email?.split('@')[0]}
            </a>
            <button onClick={handleLogout} style={{
              padding: '7px 14px', borderRadius: 8,
              background: 'transparent', border: '1px solid var(--border)',
              fontSize: 13, fontWeight: 500, color: 'var(--text-muted)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Déconnexion</button>
          </>
        ) : (
          <>
            <a href="/login" style={{
              padding: '7px 14px', borderRadius: 8,
              background: 'transparent', border: '1px solid var(--border)',
              fontSize: 13, fontWeight: 500, color: 'var(--text-primary)',
              textDecoration: 'none',
            }}>Connexion</a>
            <a href="/register" style={{
              padding: '7px 14px', borderRadius: 8,
              background: 'linear-gradient(135deg, var(--cyan), #06b6d4)',
              border: 'none', fontSize: 13, fontWeight: 600, color: '#fff',
              textDecoration: 'none',
            }}>Créer mon profil</a>
          </>
        )}
      </div>
    </nav>
  );
}