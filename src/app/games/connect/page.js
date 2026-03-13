'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const TIER_COLORS = {
  IRON: '#6b6b6b', BRONZE: '#cd7f32', SILVER: '#a0a0a0',
  GOLD: '#ffd700', PLATINUM: '#00c8c8', EMERALD: '#50c878',
  DIAMOND: '#a66cff', MASTER: '#ff6b9d', GRANDMASTER: '#ff4444', CHALLENGER: '#00d4ff',
};

export default function ConnectGamesPage() {
  const router = useRouter();

  const [lol, setLol] = useState({ gameName: '', tagLine: 'EUW' });
  const [val, setVal] = useState({ name: '', tag: 'EUW' });

  const [lolData, setLolData] = useState(null);
  const [valData, setValData] = useState(null);

  const [lolLoading, setLolLoading] = useState(false);
  const [valLoading, setValLoading] = useState(false);

  const [lolError, setLolError] = useState(null);
  const [valError, setValError] = useState(null);

  const [saving, setSaving] = useState(false);

  async function searchLol() {
    setLolLoading(true);
    setLolError(null);
    setLolData(null);
    const res = await fetch(`/api/lol?gameName=${encodeURIComponent(lol.gameName)}&tagLine=${encodeURIComponent(lol.tagLine)}`);
    const data = await res.json();
    if (!res.ok) setLolError(data.error);
    else setLolData(data);
    setLolLoading(false);
  }

  async function searchVal() {
    setValLoading(true);
    setValError(null);
    setValData(null);
    const res = await fetch(`/api/valorant?name=${encodeURIComponent(val.name)}&tag=${encodeURIComponent(val.tag)}`);
    const data = await res.json();
    if (!res.ok) setValError(data.error);
    else setValData(data);
    setValLoading(false);
  }

  async function saveGames() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    const inserts = [];

    if (lolData) {
      inserts.push({
        user_id: user.id,
        game_name: 'League of Legends',
        rank: lolData.ranked ? `${lolData.ranked.tier} ${lolData.ranked.rank}` : 'Non classé',
        win_rate: lolData.ranked?.winRate || null,
        extra_data: lolData,
      });
    }

    if (valData) {
      inserts.push({
        user_id: user.id,
        game_name: 'Valorant',
        rank: valData.rank?.tier || 'Non classé',
        win_rate: null,
        extra_data: valData,
      });
    }

    if (inserts.length > 0) {
      await supabase.from('user_games')
        .delete()
        .eq('user_id', user.id)
        .in('game_name', inserts.map(i => i.game_name));

      await supabase.from('user_games').insert(inserts);
    }

    setSaving(false);
    router.push('/profile/me');
  }

  const inputStyle = {
    padding: '11px 14px', borderRadius: 8,
    border: '1px solid var(--border)', background: 'var(--bg-elevated)',
    fontSize: 14, color: 'var(--text-primary)', fontFamily: 'inherit',
    outline: 'none',
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>

      <div style={{ marginBottom: 32 }}>
        <a href="/profile/me" style={{
          fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none',
          marginBottom: 16, display: 'block',
        }}>← Retour au profil</a>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>🎮 Connecter mes jeux</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Recherche ton compte pour importer automatiquement tes stats.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* League of Legends */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 24 }}>⚔️</span>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>League of Legends</h2>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              placeholder="Pseudo (ex: Faker)"
              value={lol.gameName}
              onChange={e => setLol(l => ({ ...l, gameName: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && searchLol()}
            />
            <input
              style={{ ...inputStyle, width: 80 }}
              placeholder="EUW"
              value={lol.tagLine}
              onChange={e => setLol(l => ({ ...l, tagLine: e.target.value }))}
            />
            <button onClick={searchLol} disabled={lolLoading || !lol.gameName} style={{
              padding: '11px 20px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #c89b3c, #f0d060)',
              color: '#1a1200', fontSize: 13, fontWeight: 700,
              cursor: lolLoading || !lol.gameName ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', opacity: !lol.gameName ? 0.5 : 1,
            }}>
              {lolLoading ? '...' : 'Chercher'}
            </button>
          </div>

          {lolError && (
            <div style={{
              padding: '10px 14px', borderRadius: 8, marginBottom: 12,
              background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
              color: 'var(--red)', fontSize: 13,
            }}>{lolError}</div>
          )}

          {lolData && (
            <div style={{
              padding: 16, borderRadius: 10,
              background: 'rgba(200,155,60,0.06)', border: '1px solid rgba(200,155,60,0.2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {lolData.gameName}#{lolData.tagLine}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Niveau {lolData.summoner?.level}
                  </div>
                </div>
                {lolData.ranked ? (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: 16, fontWeight: 800,
                      color: TIER_COLORS[lolData.ranked.tier] || 'var(--text-primary)',
                    }}>
                      {lolData.ranked.tier} {lolData.ranked.rank}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {lolData.ranked.lp} LP · {lolData.ranked.winRate}% WR ({lolData.ranked.wins}W/{lolData.ranked.losses}L)
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Non classé</div>
                )}
              </div>

              {lolData.recentMatches?.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {lolData.recentMatches.map((m, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 12px', borderRadius: 8,
                      background: m.win ? 'rgba(22,163,74,0.06)' : 'rgba(220,38,38,0.06)',
                      border: `1px solid ${m.win ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)'}`,
                    }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                        background: m.win ? 'var(--green)' : 'var(--red)', color: '#fff',
                        minWidth: 36, textAlign: 'center',
                      }}>{m.win ? 'WIN' : 'LOSS'}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, flex: 1 }}>{m.champion}</span>
                      <span style={{ fontSize: 12, fontFamily: 'monospace' }}>
                        {m.kills}/{m.deaths}/{m.assists}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.cs} CS · {m.duration}min</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Valorant */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 24 }}>🎯</span>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Valorant</h2>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              placeholder="Pseudo (ex: TenZ)"
              value={val.name}
              onChange={e => setVal(v => ({ ...v, name: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && searchVal()}
            />
            <input
              style={{ ...inputStyle, width: 80 }}
              placeholder="EUW"
              value={val.tag}
              onChange={e => setVal(v => ({ ...v, tag: e.target.value }))}
            />
            <button onClick={searchVal} disabled={valLoading || !val.name} style={{
              padding: '11px 20px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #ff4655, #ff6b7a)',
              color: '#fff', fontSize: 13, fontWeight: 700,
              cursor: valLoading || !val.name ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', opacity: !val.name ? 0.5 : 1,
            }}>
              {valLoading ? '...' : 'Chercher'}
            </button>
          </div>

          {valError && (
            <div style={{
              padding: '10px 14px', borderRadius: 8, marginBottom: 12,
              background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
              color: 'var(--red)', fontSize: 13,
            }}>{valError}</div>
          )}

          {valData && (
            <div style={{
              padding: 16, borderRadius: 10,
              background: 'rgba(255,70,85,0.06)', border: '1px solid rgba(255,70,85,0.2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {valData.gameName}#{valData.tagLine}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Niveau {valData.level}
                  </div>
                </div>
                {valData.rank ? (
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#ff4655' }}>
                    {valData.rank.tier} · {valData.rank.rr} RR
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Non classé</div>
                )}
              </div>

              {valData.recentMatches?.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {valData.recentMatches.map((m, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 12px', borderRadius: 8,
                      background: m.win ? 'rgba(22,163,74,0.06)' : 'rgba(220,38,38,0.06)',
                      border: `1px solid ${m.win ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)'}`,
                    }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                        background: m.win ? 'var(--green)' : 'var(--red)', color: '#fff',
                        minWidth: 36, textAlign: 'center',
                      }}>{m.win ? 'WIN' : 'LOSS'}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, flex: 1 }}>{m.agent}</span>
                      <span style={{ fontSize: 12, fontFamily: 'monospace' }}>
                        {m.kills}/{m.deaths}/{m.assists}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.map}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bouton sauvegarder */}
        {(lolData || valData) && (
          <button
            onClick={saveGames}
            disabled={saving}
            style={{
              width: '100%', padding: '14px', borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, var(--cyan), #06b6d4)',
              color: '#fff', fontSize: 15, fontWeight: 700,
              cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 4px 16px rgba(8,145,178,0.25)',
            }}>
            {saving ? 'Sauvegarde...' : '✅ Sauvegarder ces stats sur mon profil'}
          </button>
        )}

      </div>
    </div>
  );
}