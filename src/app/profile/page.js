'use client';

import { useState } from 'react';

const GAME_COLORS = {
  "Valorant": "#ff4655",
  "CS2": "#de9b35",
  "League of Legends": "#c89b3c",
  "Fortnite": "#9d4dbb",
};

const games = {
  valorant: {
    name: "Valorant", color: "#ff4655", rank: "Diamond 2",
    winRate: 58, kd: 1.42, hs: 26.3,
    topAgents: ["Jett", "Reyna", "Omen"],
    recentMatches: [
      { map: "Ascent", result: "WIN", score: "13-9", kda: "24/12/6", agent: "Jett" },
      { map: "Bind", result: "WIN", score: "13-11", kda: "19/15/8", agent: "Reyna" },
      { map: "Haven", result: "LOSS", score: "10-13", kda: "14/16/3", agent: "Omen" },
      { map: "Split", result: "WIN", score: "13-7", kda: "22/9/5", agent: "Jett" },
    ]
  },
  lol: {
    name: "League of Legends", color: "#c89b3c", rank: "Platinum 1",
    winRate: 54, kd: 3.2, hs: null,
    topAgents: ["Ahri", "Yasuo", "Thresh"],
    recentMatches: [
      { map: "Ranked Solo", result: "WIN", score: "32min", kda: "8/3/12", agent: "Ahri" },
      { map: "Ranked Solo", result: "LOSS", score: "28min", kda: "4/7/9", agent: "Yasuo" },
      { map: "Ranked Solo", result: "WIN", score: "35min", kda: "2/1/22", agent: "Thresh" },
    ]
  },
  cs2: {
    name: "CS2", color: "#de9b35", rank: "Faceit Lvl 8",
    winRate: 51, kd: 1.18, hs: 42.1,
    topAgents: ["Mirage", "Inferno", "Dust2"],
    recentMatches: [
      { map: "Mirage", result: "WIN", score: "16-12", kda: "21/17/4", agent: "Rifle" },
      { map: "Inferno", result: "LOSS", score: "13-16", kda: "18/20/3", agent: "AWP" },
      { map: "Anubis", result: "WIN", score: "16-9", kda: "25/11/7", agent: "Rifle" },
    ]
  },
  fortnite: {
    name: "Fortnite", color: "#9d4dbb", rank: "Champion",
    winRate: 12, kd: 2.8, hs: null,
    topAgents: ["Solo", "Trios", "Build"],
    recentMatches: [
      { map: "Battle Royale", result: "WIN", score: "#1", kda: "8/0/0", agent: "Solo" },
      { map: "Battle Royale", result: "LOSS", score: "#14", kda: "3/1/0", agent: "Solo" },
      { map: "Battle Royale", result: "LOSS", score: "#5", kda: "6/1/2", agent: "Trios" },
    ]
  },
};

function StatBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily: 'monospace' }}>{value}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, borderRadius: 3, background: color, transition: 'width 1s ease-out' }} />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [activeGame, setActiveGame] = useState('valorant');
  const g = games[activeGame];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>

      {/* Profile Header Card */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, overflow: 'hidden', marginBottom: 24,
        boxShadow: '0 1px 3px rgba(30,40,60,0.06)',
      }}>
        {/* Banner */}
        <div style={{
          height: 120,
          background: 'linear-gradient(135deg, rgba(8,145,178,0.15) 0%, rgba(124,58,237,0.15) 100%)',
        }} />

        {/* Info */}
        <div style={{ padding: '0 32px 28px', marginTop: -36 }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontWeight: 700, color: '#fff',
              border: '4px solid var(--bg-card)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              flexShrink: 0,
            }}>S</div>

            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800 }}>ShadowStrike</h1>
                <span style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                  background: 'rgba(8,145,178,0.08)', color: 'var(--cyan)',
                  border: '1px solid rgba(8,145,178,0.2)',
                }}>✓ VÉRIFIÉ</span>
                <span style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                  background: 'rgba(124,58,237,0.08)', color: 'var(--violet)',
                  border: '1px solid rgba(124,58,237,0.2)',
                }}>PLAYER ⭐</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                Duelist main · FR/EN · Dispo soirs & weekends · "Clean shots, no ego"
              </p>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                padding: '8px 18px', borderRadius: 8, cursor: 'pointer',
                background: 'transparent', border: '1px solid var(--cyan)',
                color: 'var(--cyan)', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
              }}>💬 Message</button>
              <button style={{
                padding: '8px 18px', borderRadius: 8, cursor: 'pointer',
                background: 'linear-gradient(135deg, var(--cyan), #06b6d4)',
                border: 'none', color: '#fff', fontSize: 14, fontWeight: 600,
                fontFamily: 'inherit',
              }}>👥 LFG</button>
            </div>
          </div>

          {/* Stats globales */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16, background: 'var(--bg-elevated)', borderRadius: 12, padding: 16,
          }}>
            {[
              { label: "Heures jouées", value: "2,847", color: "var(--cyan)" },
              { label: "Jeux connectés", value: "4", color: "var(--violet)" },
              { label: "Win rate global", value: "56%", color: "var(--green)" },
              { label: "Sessions coaching", value: "12", color: "var(--amber)" },
              { label: "Membre depuis", value: "Jan 2026", color: "var(--text-muted)" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 700,
                  color: s.color, fontFamily: 'monospace',
                }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {Object.entries(games).map(([key, val]) => (
          <button key={key} onClick={() => setActiveGame(key)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 10, cursor: 'pointer',
            background: activeGame === key ? `${val.color}12` : 'var(--bg-card)',
            border: `1px solid ${activeGame === key ? val.color + '35' : 'var(--border)'}`,
            color: activeGame === key ? val.color : 'var(--text-secondary)',
            fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: val.color }} />
            {val.name}
          </button>
        ))}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', borderRadius: 10, cursor: 'pointer',
          background: 'rgba(8,145,178,0.06)', border: '1px dashed var(--cyan)',
          color: 'var(--cyan)', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
        }}>+ Connecter un jeu</button>
      </div>

      {/* Stats + Matchs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Stats du jeu */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 24, boxShadow: '0 1px 3px rgba(30,40,60,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Stats · {g.name}</h3>
            <span style={{
              padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700,
              background: `${g.color}12`, color: g.color, border: `1px solid ${g.color}30`,
            }}>{g.rank}</span>
          </div>

          <StatBar label="Win Rate" value={g.winRate} color="var(--green)" />
          <StatBar label="K/D Ratio" value={Math.min(g.kd / 2 * 100, 100)} color="var(--cyan)" />
          {g.hs && <StatBar label="Headshot %" value={g.hs} color="var(--violet)" />}

          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600 }}>
              {activeGame === 'cs2' ? 'MAPS FAVORITES' : activeGame === 'fortnite' ? 'MODES DE JEU' : 'TOP AGENTS / CHAMPIONS'}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {g.topAgents.map((a, i) => (
                <span key={i} style={{
                  padding: '6px 14px', borderRadius: 8,
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  fontSize: 13, fontWeight: 500,
                }}>{a}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Matchs récents */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 24, boxShadow: '0 1px 3px rgba(30,40,60,0.06)',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Matchs récents</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {g.recentMatches.map((m, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 10,
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                flexWrap: 'wrap',
              }}>
                <span style={{
                  padding: '3px 10px', borderRadius: 6,
                  background: m.result === 'WIN' ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.08)',
                  color: m.result === 'WIN' ? 'var(--green)' : 'var(--red)',
                  fontSize: 11, fontWeight: 700,
                }}>{m.result}</span>
                <span style={{ fontSize: 13, fontWeight: 500, minWidth: 65 }}>{m.map}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{m.score}</span>
                <span style={{ fontSize: 12, color: 'var(--cyan)', marginLeft: 'auto', fontFamily: 'monospace' }}>{m.kda}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.agent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}