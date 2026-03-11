'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('profiles').select('count');
      if (!error) setConnected(true);
      setLoading(false);
    }
    testConnection();
  }, []);

  return (
    <main style={{
      minHeight: "100vh",
      background: "var(--bg-body)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 24px",
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: "linear-gradient(135deg, var(--cyan), var(--violet))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 24, color: "#fff", marginBottom: 24,
      }}>G</div>

      <h1 style={{
        fontSize: "clamp(32px, 5vw, 64px)",
        fontWeight: 900,
        letterSpacing: "-0.03em",
        marginBottom: 16,
        lineHeight: 1.1,
      }}>
        Le LinkedIn du gamer,{" "}
        <span style={{
          background: "linear-gradient(135deg, var(--cyan), var(--violet))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          enfin disponible
        </span>
      </h1>

      <p style={{
        fontSize: "clamp(15px, 2vw, 18px)",
        color: "var(--text-secondary)",
        maxWidth: 520,
        lineHeight: 1.6,
        marginBottom: 36,
      }}>
        Profil public, stats multi-jeux, LFG intelligent et coachs certifiés.
        Construis ta réputation gaming.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
        <button style={{
          padding: "14px 32px", borderRadius: 10, border: "none",
          background: "linear-gradient(135deg, var(--cyan), #06b6d4)",
          color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(8,145,178,0.3)",
        }}>
          Créer mon profil gratuitement
        </button>
        <button style={{
          padding: "14px 32px", borderRadius: 10,
          background: "var(--bg-card)", border: "1px solid var(--border)",
          color: "var(--text-primary)", fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}>
          Voir la démo
        </button>
      </div>

      {/* Statut connexion Supabase */}
      <div style={{
        padding: '10px 20px', borderRadius: 8,
        background: loading ? 'var(--bg-elevated)' : connected ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.08)',
        border: `1px solid ${loading ? 'var(--border)' : connected ? 'rgba(22,163,74,0.2)' : 'rgba(220,38,38,0.2)'}`,
        color: loading ? 'var(--text-muted)' : connected ? 'var(--green)' : 'var(--red)',
        fontSize: 13, fontWeight: 600,
      }}>
        {loading ? '⏳ Connexion à Supabase...' : connected ? '✅ Supabase connecté !' : '❌ Erreur de connexion'}
      </div>

      <div style={{
        marginTop: 32, display: "flex", gap: 32,
        color: "var(--text-muted)", fontSize: 13, flexWrap: "wrap", justifyContent: "center",
      }}>
        {["Valorant", "League of Legends", "CS2", "Fortnite", "Apex Legends"].map(g => (
          <span key={g}>{g}</span>
        ))}
      </div>
    </main>
  );
}