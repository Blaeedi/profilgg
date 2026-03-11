'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleRegister() {
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!username || username.length < 3) {
      setError('Le pseudo doit faire au moins 3 caractères.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.');
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setMessage('✅ Compte créé ! Vérifie ton email pour confirmer ton inscription.');
    setLoading(false);
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
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Créer mon ProfilGG</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Rejoins la communauté gaming</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Pseudo gaming
            </label>
            <input
              type="text"
              placeholder="ShadowStrike"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--bg-elevated)',
                fontSize: 14, color: 'var(--text-primary)', fontFamily: 'inherit',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--bg-elevated)',
                fontSize: 14, color: 'var(--text-primary)', fontFamily: 'inherit',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="6 caractères minimum"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleRegister()}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--bg-elevated)',
                fontSize: 14, color: 'var(--text-primary)', fontFamily: 'inherit',
                outline: 'none', boxSizing: 'border-box',
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
          {message && (
            <div style={{
              padding: '10px 14px', borderRadius: 8,
              background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)',
              color: 'var(--green)', fontSize: 13,
            }}>{message}</div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: '100%', padding: '14px', borderRadius: 10, border: 'none',
              background: loading ? 'var(--bg-elevated)' : 'linear-gradient(135deg, var(--cyan), #06b6d4)',
              color: loading ? 'var(--text-muted)' : '#fff',
              fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}>
            {loading ? 'Création...' : 'Créer mon profil gratuitement'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
            Déjà un compte ?{' '}
            <a href="/login" style={{ color: 'var(--cyan)', fontWeight: 600, textDecoration: 'none' }}>
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}