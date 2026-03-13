'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const GAME_COLORS = {
  Valorant: '#ff4655', CS2: '#b8860b',
  'League of Legends': '#c89b3c', Fortnite: '#9d4dbb', 'Apex Legends': '#da292a',
};

export default function NavbarWrapper() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  // Masquer la navbar sur les pages auth
  if (['/login', '/register'].includes(pathname)) return null;
  if (loading) return null;

  // LANDING NAV — non connecté
  if (!user) return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 28px', height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'linear-gradient(135deg, var(--teal), var(--violet))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 13, color: '#fff',
        }}>G</div>
        <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-.02em', color: 'var(--text)' }}>
          Profil<span style={{ color: 'var(--teal)' }}>GG</span>
        </span>
      </a>
      <div style={{ display: 'flex', gap: 8 }}>
        <a href="/login" style={{
          padding: '8px 18px', borderRadius: 10,
          background: 'var(--bg)', border: '1px solid var(--border)',
          fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none',
        }}>Se connecter</a>
        <a href="/register" style={{
          padding: '8px 18px', borderRadius: 10,
          background: 'var(--teal)', border: 'none',
          fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none',
          boxShadow: '0 2px 12px rgba(13,148,136,.2)',
        }}>Créer mon profil</a>
      </div>
    </nav>
  );

  // APP NAV — connecté
  const username = user.user_metadata?.username || user.email?.split('@')[0];
  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Mon profil', href: '/profile/me' },
    { label: 'LFG', href: '/lfg' },
    { label: 'Coachs', href: '/coaches' },
    { label: 'Actus', href: '/news' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px', height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <a href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{
          width: 26, height: 26, borderRadius: 7,
          background: 'linear-gradient(135deg, var(--teal), var(--violet))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 12, color: '#fff',
        }}>G</div>
        <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-.02em', color: 'var(--text)' }}>
          Profil<span style={{ color: 'var(--teal)' }}>GG</span>
        </span>
      </a>

      {/* Liens */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {navLinks.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <a key={href} href={href} style={{
              padding: '6px 12px', borderRadius: 8,
              fontSize: 13, fontWeight: active ? 600 : 500,
              color: active ? 'var(--teal)' : 'var(--text-2)',
              textDecoration: 'none',
              background: active ? 'var(--teal-bg)' : 'transparent',
            }}>{label}</a>
          );
        })}
      </div>

      {/* User */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <a href="/profile/me" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 12px 5px 5px', borderRadius: 20,
          background: 'var(--bg)', border: '1px solid var(--border)',
          textDecoration: 'none',
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--teal), var(--violet))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 800, color: '#fff',
          }}>{username?.[0]?.toUpperCase()}</div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{username}</span>
        </a>
        <button onClick={handleLogout} style={{
          padding: '6px 14px', borderRadius: 8,
          background: 'transparent', border: '1px solid var(--border)',
          fontSize: 12, fontWeight: 500, color: 'var(--text-3)',
          cursor: 'pointer', fontFamily: 'inherit',
        }}>Déco</button>
      </div>
    </nav>
  );
}