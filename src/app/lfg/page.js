'use client';

import { useState } from 'react';

const players = [
  { id: 1, name: "NightFury", avatar: "N", game: "Valorant", rank: "Diamond 3", role: "Duelist", availability: "Soirs", lang: "FR", mic: true, online: true, compatibility: 96, style: "Compétitif" },
  { id: 2, name: "StarLight", avatar: "S", game: "League of Legends", rank: "Platinum 2", role: "Support", availability: "Weekends", lang: "FR/EN", mic: true, online: true, compatibility: 89, style: "Chill" },
  { id: 3, name: "IronClad", avatar: "I", game: "CS2", rank: "Faceit Lvl 7", role: "Rifler", availability: "Flexible", lang: "FR", mic: false, online: false, compatibility: 74, style: "Compétitif" },
  { id: 4, name: "PhoenixRise", avatar: "P", game: "Valorant", rank: "Platinum 1", role: "Controller", availability: "Soirs", lang: "FR", mic: true, online: true, compatibility: 82, style: "Semi-compétitif" },
  { id: 5, name: "CrystalWolf", avatar: "C", game: "Fortnite", rank: "Champion", role: "Build", availability: "Weekends", lang: "FR/EN", mic: true, online: false, compatibility: 71, style: "Compétitif" },
  { id: 6, name: "DarkMatter", avatar: "D", game: "Apex Legends", rank: "Diamond", role: "Fragger", availability: "Soirs", lang: "FR", mic: true, online: true, compatibility: 88, style: "Compétitif" },
];

const GAME_COLORS = {
  "Valorant": "#ff4655", "CS2": "#de9b35",
  "League of Legends": "#c89b3c", "Fortnite": "#9d4dbb", "Apex Legends": "#da292a",
};

export default function LFGPage() {
  const [gameFilter, setGameFilter] = useState('all');
  const [micFilter, setMicFilter] = useState('all');

  const filtered = players.filter(p => {
    if (gameFilter !== 'all' && p.game !== gameFilter) return false;
    if (micFilter === 'mic' && !p.mic) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, marginBottom: 8 }}>
          🎯 Looking For Group
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Trouve des coéquipiers sérieux filtrés par jeu, niveau et style de jeu.
        </p>
      </div>

      {/* Filtres */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '20px 24px', marginBottom: 24,
        boxShadow: '0 1px 3px rgba(30,40,60,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>

          {/* Filtre jeu */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>Jeu</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['all', 'Valorant', 'League of Legends', 'CS2', 'Fortnite', 'Apex Legends'].map(g => (
                <button key={g} onClick={() => setGameFilter(g)} style={{
                  padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
                  background: gameFilter === g ? 'rgba(8,145,178,0.08)' : 'var(--bg-elevated)',
                  border: `1px solid ${gameFilter === g ? 'rgba(8,145,178,0.3)' : 'var(--border)'}`,
                  color: gameFilter === g ? 'var(--cyan)' : 'var(--text-secondary)',
                  fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                }}>{g === 'all' ? 'Tous' : g}</button>
              ))}
            </div>
          </div>

          {/* Filtre micro */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>Micro</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[{ val: 'all', label: 'Tous' }, { val: 'mic', label: '🎤 Avec micro' }].map(f => (
                <button key={f.val} onClick={() => setMicFilter(f.val)} style={{
                  padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
                  background: micFilter === f.val ? 'rgba(8,145,178,0.08)' : 'var(--bg-elevated)',
                  border: `1px solid ${micFilter === f.val ? 'rgba(8,145,178,0.3)' : 'var(--border)'}`,
                  color: micFilter === f.val ? 'var(--cyan)' : 'var(--text-secondary)',
                  fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                }}>{f.label}</button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Résultats */}
      <div style={{ marginBottom: 16, fontSize: 14, color: 'var(--text-muted)' }}>
        {filtered.length} joueur{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
      </div>

      {/* Grille joueurs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 16,
      }}>
        {filtered.map(p => (
          <div key={p.id} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 14, padding: 0, overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(30,40,60,0.06)',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(30,40,60,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(30,40,60,0.06)'; }}>

            {/* Header carte */}
            <div style={{
              padding: '16px 20px',
              background: `${GAME_COLORS[p.game]}08`,
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              {/* Avatar */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 700, color: '#fff',
                }}>{p.avatar}</div>
                {p.online && (
                  <div style={{
                    position: 'absolute', bottom: 2, right: 2,
                    width: 12, height: 12, borderRadius: '50%',
                    background: 'var(--green)',
                    border: '2px solid var(--bg-card)',
                  }} />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.rank}</div>
              </div>

              {/* Score compatibilité */}
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: 22, fontWeight: 800, fontFamily: 'monospace',
                  color: p.compatibility >= 90 ? 'var(--green)' : p.compatibility >= 75 ? 'var(--cyan)' : 'var(--amber)',
                }}>{p.compatibility}%</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>compatibilité</div>
              </div>
            </div>

            {/* Body carte */}
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                <span style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: `${GAME_COLORS[p.game]}12`,
                  color: GAME_COLORS[p.game],
                  border: `1px solid ${GAME_COLORS[p.game]}30`,
                  fontSize: 12, fontWeight: 600,
                }}>{p.game}</span>
                <span style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)',
                }}>{p.role}</span>
                <span style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)',
                }}>{p.style}</span>
              </div>

              <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
                <span>🕐 {p.availability}</span>
                <span>🌍 {p.lang}</span>
                <span>{p.mic ? '🎤 Micro' : '🔇 Sans micro'}</span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  flex: 1, padding: '10px', borderRadius: 8, cursor: 'pointer',
                  background: p.online ? 'linear-gradient(135deg, var(--cyan), #06b6d4)' : 'var(--bg-elevated)',
                  border: p.online ? 'none' : '1px solid var(--border)',
                  color: p.online ? '#fff' : 'var(--text-muted)',
                  fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                }}>{p.online ? '⚡ Inviter à jouer' : '💬 Envoyer un message'}</button>
                <button style={{
                  padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  fontSize: 13, fontFamily: 'inherit',
                }}>👤</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA poster annonce */}
      <div style={{
        marginTop: 32, padding: '28px 32px', borderRadius: 16,
        background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Tu cherches une équipe ?</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Poste ton annonce LFG et laisse les coéquipiers venir à toi.
          </p>
        </div>
        <button style={{
          padding: '12px 28px', borderRadius: 10, cursor: 'pointer',
          background: 'linear-gradient(135deg, var(--violet), #8b5cf6)',
          border: 'none', color: '#fff', fontSize: 14, fontWeight: 600,
          fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(124,58,237,0.25)',
        }}>📢 Poster une annonce</button>
      </div>

    </div>
  );
}