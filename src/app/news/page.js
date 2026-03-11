'use client';

import { useState } from 'react';

const GAME_COLORS = {
  "Valorant": "#ff4655",
  "CS2": "#de9b35",
  "League of Legends": "#c89b3c",
  "Fortnite": "#9d4dbb",
  "Apex Legends": "#da292a",
  "Overwatch 2": "#f99e1a",
  "Général": "#0891b2",
};

const articles = [
  { id: 1, title: "VCT Masters Shanghai : Fnatic écrase la concurrence en grande finale", excerpt: "Fnatic remporte le trophée avec un score sans appel face à Sentinels. Derke MVP du tournoi avec un ACS moyen de 278.", category: "Valorant", time: "Il y a 2h", hot: true, featured: true },
  { id: 2, title: "T1 dévoile son nouveau roster pour le LCK Summer Split 2026", excerpt: "Le transfert tant attendu de Chovy est confirmé. T1 vise un troisième titre mondial consécutif.", category: "League of Legends", time: "Il y a 5h", hot: true, featured: true },
  { id: 3, title: "CS2 : Valve annonce un major à Paris pour l'automne 2026", excerpt: "L'Accor Arena accueillera le premier Major CS2 en France. 1,25M$ de prize pool.", category: "CS2", time: "Il y a 8h", hot: false },
  { id: 4, title: "Fortnite FNCS Grand Finals : le Français Andilex termine 2e mondial", excerpt: "Belle performance pour la scène FR avec une deuxième place et 150 000$ de gains.", category: "Fortnite", time: "Il y a 12h", hot: false },
  { id: 5, title: "ALGS Year 4 : TSM domine le split européen", excerpt: "TSM confirme sa domination avec un 3e titre consécutif. Alliance et NaVi complètent le podium.", category: "Apex Legends", time: "Il y a 1j", hot: false },
  { id: 6, title: "OWL 2026 : nouveau format, nouvelles équipes, prize pool doublé", excerpt: "Blizzard relance l'Overwatch League avec un format ouvert. 8 nouvelles organisations rejoignent.", category: "Overwatch 2", time: "Il y a 1j", hot: false },
  { id: 7, title: "Patch 10.8 Valorant : Clove nerfé, Vyse buffée, nouvelle map Kasbah", excerpt: "Un patch majeur qui redistribue les cartes du méta. Les Duelists voient leur économie ajustée.", category: "Valorant", time: "Il y a 1j", hot: false },
  { id: 8, title: "Karmine Corp entre dans Valorant avec un roster 100% francophone", excerpt: "La KC signe 5 joueurs issus de la scène FR. Premier match officiel prévu lors du VCT Challengers.", category: "Valorant", time: "Il y a 2j", hot: true },
  { id: 9, title: "Le coaching esport reconnu comme profession en France", excerpt: "Le ministère du Travail publie un décret reconnaissant le coaching esport comme métier à part entière.", category: "Général", time: "Il y a 3j", hot: true },
];

export default function NewsPage() {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Valorant', 'League of Legends', 'CS2', 'Fortnite', 'Apex Legends', 'Overwatch 2'];
  const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter);
  const featured = filtered.filter(a => a.featured).slice(0, 2);
  const rest = filtered.filter(a => !a.featured);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{
            padding: '3px 10px', borderRadius: 6,
            background: 'rgba(220,38,38,0.08)',
            color: 'var(--red)',
            border: '1px solid rgba(220,38,38,0.2)',
            fontSize: 11, fontWeight: 700,
          }}>🔴 AUJOURD'HUI</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Actualités esport françaises et internationales</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, marginBottom: 8 }}>Actus Esport</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Résultats, transferts, patchs et annonces — tout ce qui fait bouger la scène compétitive.
        </p>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '7px 16px', borderRadius: 8, cursor: 'pointer',
            background: filter === c ? 'rgba(8,145,178,0.08)' : 'var(--bg-card)',
            border: `1px solid ${filter === c ? 'rgba(8,145,178,0.3)' : 'var(--border)'}`,
            color: filter === c ? 'var(--cyan)' : 'var(--text-secondary)',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
            transition: 'all 0.2s',
          }}>{c === 'all' ? 'Tout' : c}</button>
        ))}
      </div>

      {/* Articles featured */}
      {featured.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: featured.length > 1 ? '1fr 1fr' : '1fr',
          gap: 20, marginBottom: 24,
        }}>
          {featured.map(a => (
            <div key={a.id} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 14, overflow: 'hidden',
              cursor: 'pointer', transition: 'all 0.25s',
              boxShadow: '0 1px 3px rgba(30,40,60,0.06)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(30,40,60,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(30,40,60,0.06)'; }}>
              {/* Image placeholder */}
              <div style={{
                height: 160,
                background: `linear-gradient(135deg, ${GAME_COLORS[a.category]}15 0%, ${GAME_COLORS[a.category]}05 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid var(--border)', position: 'relative',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `${GAME_COLORS[a.category]}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, fontWeight: 900, color: GAME_COLORS[a.category],
                }}>{a.category.charAt(0)}</div>
                {a.hot && (
                  <span style={{
                    position: 'absolute', top: 12, right: 12,
                    padding: '3px 8px', borderRadius: 6,
                    background: 'rgba(220,38,38,0.08)',
                    color: 'var(--red)', border: '1px solid rgba(220,38,38,0.2)',
                    fontSize: 11, fontWeight: 700,
                  }}>🔥 HOT</span>
                )}
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 6,
                    background: `${GAME_COLORS[a.category]}12`,
                    color: GAME_COLORS[a.category],
                    border: `1px solid ${GAME_COLORS[a.category]}30`,
                    fontSize: 11, fontWeight: 600,
                  }}>{a.category}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>🕐 {a.time}</span>
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.35, marginBottom: 8 }}>{a.title}</h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a.excerpt}</p>
                <div style={{ marginTop: 14, color: 'var(--cyan)', fontSize: 13, fontWeight: 600 }}>
                  Lire l'article →
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grille articles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16,
      }}>
        {rest.map(a => (
          <div key={a.id} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 14, padding: '18px 22px',
            cursor: 'pointer', transition: 'all 0.25s',
            boxShadow: '0 1px 3px rgba(30,40,60,0.06)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(30,40,60,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(30,40,60,0.06)'; }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: GAME_COLORS[a.category], flexShrink: 0,
              }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: GAME_COLORS[a.category] }}>{a.category}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>🕐 {a.time}</span>
              {a.hot && <span style={{ color: 'var(--red)' }}>🔥</span>}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, marginBottom: 6 }}>{a.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.45 }}>{a.excerpt}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 12 }}>
          Actus mises à jour depuis les flux officiels des éditeurs et organisations esport.
        </p>
        <button style={{
          padding: '10px 24px', borderRadius: 8, cursor: 'pointer',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)',
          fontFamily: 'inherit',
        }}>Charger plus d'articles →</button>
      </div>

    </div>
  );
}