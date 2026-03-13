'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const GAME_COLORS = {
  'Valorant': '#ff4655', 'CS2': '#de9b35',
  'League of Legends': '#c89b3c', 'Fortnite': '#9d4dbb',
  'Apex Legends': '#da292a', 'Rocket League': '#0066ff', 'Overwatch 2': '#f99e1a',
};

const TIER_COLORS = {
  IRON: '#6b6b6b', BRONZE: '#cd7f32', SILVER: '#a0a0a0',
  GOLD: '#ffd700', PLATINUM: '#00c8c8', EMERALD: '#50c878',
  DIAMOND: '#a66cff', MASTER: '#ff6b9d', GRANDMASTER: '#ff4444', CHALLENGER: '#00d4ff',
};

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const [{ data: profileData }, { data: gamesData }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('user_games').select('*').eq('user_id', user.id),
      ]);

      setProfile(profileData);
      setGames(gamesData || []);
      if (gamesData?.length > 0) setSelectedGame(gamesData[0]);
      setLoading(false);
    }
    loadProfile();
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-muted)' }}>Chargement...</p>
    </div>
  );

  const firstGame = profile?.games?.[0];
  const bannerColor = GAME_COLORS[firstGame] || 'var(--cyan)';
  const gameData = selectedGame?.extra_data;
  const isLoL = selectedGame?.game_name === 'League of Legends';
  const isVal = selectedGame?.game_name === 'Valorant';

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>

      {/* Carte profil */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, overflow: 'hidden', marginBottom: 20,
      }}>
        <div style={{
          height: 100,
          background: `linear-gradient(135deg, ${bannerColor}22, var(--violet)22)`,
          borderBottom: '1px solid var(--border)',
        }} />

        <div style={{ padding: '0 32px 28px' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginTop: -32, marginBottom: 16,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 900, color: '#fff',
              border: '4px solid var(--bg-card)',
            }}>
              {profile?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="/games/connect" style={{
                padding: '8px 16px', borderRadius: 8,
                background: 'linear-gradient(135deg, var(--cyan), #06b6d4)',
                color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}>+ Jeu</a>
              <a href="/profile/edit" style={{
                padding: '8px 16px', borderRadius: 8,
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none',
              }}>✏️ Éditer</a>
            </div>
          </div>

          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            {profile?.username || 'Gamer'}
          </h1>

          {profile?.bio && (
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>
              {profile.bio}
            </p>
          )}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {profile?.games?.map(g => (
              <span key={g} style={{
                padding: '4px 12px', borderRadius: 6,
                background: `${GAME_COLORS[g] || 'var(--cyan)'}18`,
                color: GAME_COLORS[g] || 'var(--cyan)',
                border: `1px solid ${GAME_COLORS[g] || 'var(--cyan)'}35`,
                fontSize: 12, fontWeight: 600,
              }}>{g}</span>
            ))}
            {profile?.styles?.map(s => (
              <span key={s} style={{
                padding: '4px 12px', borderRadius: 6,
                background: 'rgba(124,58,237,0.08)', color: 'var(--violet)',
                border: '1px solid rgba(124,58,237,0.2)',
                fontSize: 12, fontWeight: 500,
              }}>{s}</span>
            ))}
            {profile?.availabilities?.map(a => (
              <span key={a} style={{
                padding: '4px 12px', borderRadius: 6,
                background: 'rgba(22,163,74,0.08)', color: 'var(--green)',
                border: '1px solid rgba(22,163,74,0.2)',
                fontSize: 12, fontWeight: 500,
              }}>🕐 {a}</span>
            ))}
            {profile?.languages?.map(l => (
              <span key={l} style={{
                padding: '4px 10px', borderRadius: 6,
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
              }}>🌐 {l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats jeux */}
      {games.length === 0 ? (
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 32, textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎮</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Aucun jeu connecté</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
            Connecte ton compte Riot ou Steam pour afficher tes vraies stats.
          </p>
          <a href="/games/connect" style={{
            padding: '10px 24px', borderRadius: 8,
            background: 'linear-gradient(135deg, var(--cyan), #06b6d4)',
            color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none',
            display: 'inline-block',
          }}>+ Connecter un jeu</a>
        </div>
      ) : (
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {/* Onglets jeux */}
          <div style={{
            display: 'flex', borderBottom: '1px solid var(--border)',
            padding: '0 24px', gap: 4,
          }}>
            {games.map(g => (
              <button key={g.id} onClick={() => setSelectedGame(g)} style={{
                padding: '14px 18px', border: 'none', cursor: 'pointer',
                background: 'transparent', fontFamily: 'inherit',
                fontSize: 13, fontWeight: selectedGame?.id === g.id ? 700 : 500,
                color: selectedGame?.id === g.id ? GAME_COLORS[g.game_name] || 'var(--cyan)' : 'var(--text-muted)',
                borderBottom: selectedGame?.id === g.id ? `2px solid ${GAME_COLORS[g.game_name] || 'var(--cyan)'}` : '2px solid transparent',
                marginBottom: -1,
              }}>{g.game_name}</button>
            ))}
          </div>

          <div style={{ padding: 28 }}>
            {/* Header stats */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12,
            }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
                  {isLoL ? `${gameData?.gameName}#${gameData?.tagLine} · Niveau ${gameData?.summoner?.level}` : `${gameData?.gameName}#${gameData?.tagLine} · Niveau ${gameData?.level}`}
                </div>
                {isLoL && gameData?.ranked && (
                  <div style={{
                    fontSize: 22, fontWeight: 800,
                    color: TIER_COLORS[gameData.ranked.tier] || 'var(--text-primary)',
                  }}>
                    {gameData.ranked.tier} {gameData.ranked.rank}
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 8 }}>
                      {gameData.ranked.lp} LP
                    </span>
                  </div>
                )}
                {isVal && gameData?.rank && (
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#ff4655' }}>
                    {gameData.rank.tier}
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 8 }}>
                      {gameData.rank.rr} RR
                    </span>
                  </div>
                )}
                {!gameData?.ranked && !gameData?.rank && (
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-muted)' }}>Non classé</div>
                )}
              </div>

              {isLoL && gameData?.ranked && (
                <div style={{ display: 'flex', gap: 20, textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--green)' }}>{gameData.ranked.winRate}%</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Win Rate</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{gameData.ranked.wins}W</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Victoires</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{gameData.ranked.losses}L</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Défaites</div>
                  </div>
                </div>
              )}
            </div>

            {/* Matchs récents */}
            {gameData?.recentMatches?.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Matchs récents
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {gameData.recentMatches.map((m, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 14px', borderRadius: 10,
                      background: m.win ? 'rgba(22,163,74,0.05)' : 'rgba(220,38,38,0.05)',
                      border: `1px solid ${m.win ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)'}`,
                    }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 5,
                        background: m.win ? 'var(--green)' : 'var(--red)', color: '#fff',
                        minWidth: 40, textAlign: 'center',
                      }}>{m.win ? 'WIN' : 'LOSS'}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>
                        {isLoL ? m.champion : m.agent}
                      </span>
                      <span style={{ fontSize: 13, fontFamily: 'monospace', fontWeight: 600 }}>
                        {m.kills}/{m.deaths}/{m.assists}
                      </span>
                      {isLoL && (
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          {m.cs} CS · {m.duration}min
                        </span>
                      )}
                      {isVal && (
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.map}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}