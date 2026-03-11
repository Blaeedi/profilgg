'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px', background: 'var(--bg-body)',
    }}>
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 40,
        boxShadow: '0 4px 24px rgba(30,40,60,0.08)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 22, color: '#fff',
            margin: '0 auto 16px',
          }}>G</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Content de te revoir</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Connecte-toi à ton ProfilGG</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--bg-elevated)',
                fontSize: 14, color: 'var(--text-primary)', fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--bg-elevated)',
                fontSize: 14, color: 'var(--text-primary)', fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: 8,
              background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
              color: 'var(--red)', fontSize: 13,
            }}>{error}</div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%', padding: '14px', borderRadius: 10, border: 'none',
              background: loading ? 'var(--bg-elevated)' : 'linear-gradient(135deg, var(--cyan), #06b6d4)',
              color: loading ? 'var(--text-muted)' : '#fff',
              fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
            Pas encore de compte ?{' '}
            <a href="/register" style={{ color: 'var(--cyan)', fontWeight: 600, textDecoration: 'none' }}>
              Créer mon profil
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
