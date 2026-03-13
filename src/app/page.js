'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const TiltCard = ({ children, style = {} }) => {
  const [tf, setTf] = useState('perspective(800px) rotateX(0) rotateY(0)');
  return (
    <div
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        setTf(`perspective(800px) rotateY(${x * 3.5}deg) rotateX(${-y * 3.5}deg)`);
      }}
      onMouseLeave={() => setTf('perspective(800px) rotateY(0) rotateX(0)')}
      style={{
        transform: tf,
        transition: 'transform 0.4s cubic-bezier(.17,.67,.35,1.1)',
        background: '#fff', border: '1px solid var(--border)',
        borderRadius: 14, padding: 24,
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}>
      {children}
    </div>
  );
};

export default function HomePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) router.push('/dashboard');
      else setUser(false);
    });
  }, []);

  if (user === null) return null; // chargement silencieux

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(60px, 10vw, 110px) 32px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Glow de fond */}
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          {/* Badge */}
          <div style={{ marginBottom: 24 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 14px', borderRadius: 20,
              background: 'var(--violet-bg)', border: '1px solid var(--violet-border)',
              fontSize: 12, fontWeight: 600, color: 'var(--violet)',
            }}>
              ✦ BETA OUVERTE — GRATUIT
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 800, lineHeight: 1.06,
            letterSpacing: '-.035em',
            marginBottom: 22, color: 'var(--text)',
          }}>
            Le profil gaming<br />
            <span style={{ color: 'var(--teal)' }}>que tu mérites.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: 'var(--text-2)', maxWidth: 420,
            margin: '0 auto 36px', lineHeight: 1.65,
          }}>
            Centralise tes stats, trouve des coéquipiers sérieux,
            progresse avec un coach certifié. Tout en un seul profil.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
            <a href="/register" style={{
              padding: '14px 36px', borderRadius: 12,
              background: 'var(--teal)',
              color: '#fff', fontSize: 15, fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(13,148,136,.25)',
              transition: 'all .2s',
            }}>
              Créer mon profil gratuitement
            </a>
            <a href="/login" style={{
              padding: '14px 28px', borderRadius: 12,
              background: '#fff', border: '1px solid var(--border)',
              color: 'var(--text)', fontSize: 15, fontWeight: 600,
              textDecoration: 'none',
            }}>
              Se connecter
            </a>
          </div>

          <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
            Gratuit · Aucune carte requise · 30 secondes
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 32px 70px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 14,
        }}>
          {[
            { icon: '🪪', title: 'Profil public', desc: 'Une URL pour toutes tes stats. Partage-la partout.' },
            { icon: '📊', title: 'Stats temps réel', desc: 'Connexion directe à Riot, Steam. Mises à jour automatiques.' },
            { icon: '🎯', title: 'LFG intelligent', desc: 'Trouve des joueurs par niveau, style et disponibilité.' },
            { icon: '🏆', title: 'Coaching humain', desc: 'Réserve une session avec un coach certifié.' },
          ].map((f, i) => (
            <TiltCard key={i}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>{f.desc}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Stats sociales */}
      <section style={{ padding: '40px 32px', textAlign: 'center', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: '#fff', marginBottom: 70 }}>
        <div style={{ display: 'flex', gap: 60, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { v: '12,847', l: 'Joueurs' },
            { v: '340+', l: 'Coachs' },
            { v: '6', l: 'Jeux supportés' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--teal)', fontFamily: 'JetBrains Mono, monospace' }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '0 32px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 800, letterSpacing: '-.02em' }}>
            Tarifs simples
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 14, marginTop: 8 }}>
            Commence gratuitement. Monte en gamme quand tu veux.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}>
          {[
            { n: 'Free', p: '0€', f: ['Profil public', '2 jeux', '3 LFG/sem'], pop: false },
            { n: 'Player ⭐', p: '7€', f: ['Stats illimitées', 'LFG illimité', 'Badge vérifié'], pop: true },
            { n: 'Creator', p: '14€', f: ['Tout Player +', 'Analytics', 'Profil boosté'], pop: false },
            { n: 'Team', p: '39€', f: ['10 joueurs', 'Stats équipe', 'Recrutement'], pop: false },
          ].map((pl, i) => (
            <div key={i} style={{
              background: '#fff',
              border: pl.pop ? '2px solid var(--teal)' : '1px solid var(--border)',
              borderRadius: 14, padding: 22, position: 'relative',
              boxShadow: pl.pop ? '0 4px 24px rgba(13,148,136,.1)' : 'var(--shadow-sm)',
            }}>
              {pl.pop && (
                <div style={{
                  position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--teal)', color: '#fff',
                  padding: '3px 14px', borderRadius: 14, fontSize: 10, fontWeight: 700,
                }}>POPULAIRE</div>
              )}
              <div style={{ fontSize: 14, fontWeight: 700, color: pl.pop ? 'var(--teal)' : 'var(--text)', marginBottom: 10 }}>
                {pl.n}
              </div>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 30, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace' }}>{pl.p}</span>
                <span style={{ color: 'var(--text-3)', fontSize: 13 }}>/mois</span>
              </div>
              {pl.f.map((feat, j) => (
                <div key={j} style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span>{feat}
                </div>
              ))}
              <div style={{ marginTop: 18 }}>
                <a href="/register" style={{
                  display: 'block', padding: '9px', borderRadius: 8, textAlign: 'center',
                  background: pl.pop ? 'var(--teal)' : 'var(--bg)',
                  border: pl.pop ? 'none' : '1px solid var(--border)',
                  color: pl.pop ? '#fff' : 'var(--text)',
                  fontSize: 13, fontWeight: 600, textDecoration: 'none',
                }}>
                  {pl.p === '0€' ? 'Créer mon profil' : 'Essai 14j gratuit'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={{ padding: '20px 32px 80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, letterSpacing: '-.02em' }}>
          Prêt à montrer ton vrai niveau ?
        </h2>
        <a href="/register" style={{
          display: 'inline-block', padding: '14px 36px', borderRadius: 12,
          background: 'var(--teal)', color: '#fff',
          fontSize: 15, fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(13,148,136,.25)',
        }}>
          Créer mon profil gratuitement
        </a>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px', background: '#fff',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
          fontSize: 12, color: 'var(--text-3)',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              background: 'linear-gradient(135deg, var(--teal), var(--violet))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 10, color: '#fff',
            }}>G</div>
            <span style={{ fontWeight: 700, color: 'var(--text)' }}>ProfilGG</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['CGU', 'Confidentialité', 'RGPD', 'Contact'].map(l => (
              <span key={l} style={{ cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <span>© 2026 ProfilGG</span>
        </div>
      </footer>

    </main>
  );
}