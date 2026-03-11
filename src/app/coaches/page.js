'use client';

import { useState } from 'react';

const coaches = [
  { id: 1, name: "ProCoach_Zen", avatar: "Z", games: ["Valorant", "CS2"], rank: "Radiant / Global Elite", badge: "TOP COACH", price: 25, rating: 4.9, reviews: 127, sessions: 340, specialties: ["Aim training", "Game sense", "Mental"], available: true },
  { id: 2, name: "LegendMaster", avatar: "L", games: ["League of Legends"], rank: "Challenger EUW", badge: "500+ SESSIONS", price: 35, rating: 4.8, reviews: 89, sessions: 512, specialties: ["Mid lane", "Macro", "Rotations"], available: true },
  { id: 3, name: "FragGod_FR", avatar: "F", games: ["CS2"], rank: "Faceit Lvl 10", badge: "NOUVEAU", price: 18, rating: 4.7, reviews: 23, sessions: 45, specialties: ["Clutch situations", "Economy", "Positions"], available: false },
  { id: 4, name: "ApexPredator", avatar: "A", games: ["Apex Legends", "Fortnite"], rank: "Predator / Champion", badge: "TOP COACH", price: 22, rating: 4.9, reviews: 64, sessions: 198, specialties: ["Movement", "Rotations", "Loot path"], available: true },
];

const GAME_COLORS = {
  "Valorant": "#ff4655", "CS2": "#de9b35",
  "League of Legends": "#c89b3c", "Fortnite": "#9d4dbb", "Apex Legends": "#da292a",
};

const BADGE_COLORS = {
  "TOP COACH": { bg: "rgba(8,145,178,0.08)", text: "var(--cyan)", border: "rgba(8,145,178,0.2)" },
  "500+ SESSIONS": { bg: "rgba(217,119,6,0.08)", text: "var(--amber)", border: "rgba(217,119,6,0.2)" },
  "NOUVEAU": { bg: "rgba(22,163,74,0.08)", text: "var(--green)", border: "rgba(22,163,74,0.2)" },
};

export default function CoachesPage() {
  const [gameFilter, setGameFilter] = useState('all');

  const filtered = coaches.filter(c =>
    gameFilter === 'all' || c.games.includes(gameFilter)
  );

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, marginBottom: 8 }}>
          🏆 Marketplace Coachs
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Réserve une session avec un coach certifié. Paiement sécurisé, remboursement garanti.
        </p>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {['all', 'Valorant', 'League of Legends', 'CS2', 'Fortnite', 'Apex Legends'].map(g => (
          <button key={g} onClick={() => setGameFilter(g)} style={{
            padding: '7px 16px', borderRadius: 8, cursor: 'pointer',
            background: gameFilter === g ? 'rgba(8,145,178,0.08)' : 'var(--bg-card)',
            border: `1px solid ${gameFilter === g ? 'rgba(8,145,178,0.3)' : 'var(--border)'}`,
            color: gameFilter === g ? 'var(--cyan)' : 'var(--text-secondary)',
            fontSize: 13, fontWeight: 500, fontFamily: 'inherit', transition: 'all 0.2s',
          }}>{g === 'all' ? 'Tous les jeux' : g}</button>
        ))}
      </div>

      {/* Grille coachs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20, marginBottom: 40,
      }}>
        {filtered.map(c => {
          const badgeStyle = BADGE_COLORS[c.badge] || BADGE_COLORS["NOUVEAU"];
          return (
            <div key={c.id} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(30,40,60,0.06)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(30,40,60,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(30,40,60,0.06)'; }}>

              {/* Header */}
              <div style={{
                padding: '16px 20px',
                background: badgeStyle.bg,
                borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 700, color: '#fff',
                    border: '3px solid var(--bg-card)',
                  }}>{c.avatar}</div>
                  {c.available && (
                    <div style={{
                      position: 'absolute', bottom: 2, right: 2,
                      width: 12, height: 12, borderRadius: '50%',
                      background: 'var(--green)', border: '2px solid var(--bg-card)',
                    }} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{c.name}</span>
                    <span style={{
                      padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                      background: badgeStyle.bg, color: badgeStyle.text, border: `1px solid ${badgeStyle.border}`,
                    }}>{c.badge}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{c.rank}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--cyan)', fontFamily: 'monospace' }}>{c.price}€</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>/session</div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '16px 20px' }}>
                {/* Jeux */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  {c.games.map((g, i) => (
                    <span key={i} style={{
                      padding: '4px 10px', borderRadius: 6,
                      background: `${GAME_COLORS[g]}12`,
                      color: GAME_COLORS[g],
                      border: `1px solid ${GAME_COLORS[g]}30`,
                      fontSize: 11, fontWeight: 600,
                    }}>{g}</span>
                  ))}
                </div>

                {/* Spécialités */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  {c.specialties.map((s, i) => (
                    <span key={i} style={{
                      padding: '4px 10px', borderRadius: 6,
                      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                      fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500,
                    }}>{s}</span>
                  ))}
                </div>

                {/* Stats coach */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '12px 0', borderTop: '1px solid var(--border)', marginBottom: 14,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: 'var(--amber)' }}>⭐</span>
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'monospace' }}>{c.rating}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>({c.reviews} avis)</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.sessions} sessions</div>
                </div>

                {/* Boutons */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{
                    flex: 1, padding: '10px', borderRadius: 8, cursor: 'pointer',
                    background: c.available ? 'linear-gradient(135deg, var(--cyan), #06b6d4)' : 'var(--bg-elevated)',
                    border: c.available ? 'none' : '1px solid var(--border)',
                    color: c.available ? '#fff' : 'var(--text-muted)',
                    fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                  }}>{c.available ? '📅 Réserver une session' : 'Indisponible'}</button>
                  <button style={{
                    padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                    fontSize: 13, fontFamily: 'inherit',
                  }}>💬</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Devenir coach */}
      <div style={{
        padding: '32px', borderRadius: 16,
        background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Tu es coach gaming ?</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Rejoins la marketplace et touche de nouveaux élèves. Commission 15%, paiement automatique.
          </p>
        </div>
        <button style={{
          padding: '12px 28px', borderRadius: 10, cursor: 'pointer',
          background: 'linear-gradient(135deg, var(--violet), #8b5cf6)',
          border: 'none', color: '#fff', fontSize: 14, fontWeight: 600,
          fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(124,58,237,0.25)',
        }}>Devenir coach →</button>
      </div>

    </div>
  );
}