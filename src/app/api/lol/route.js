import { NextResponse } from 'next/server';

const RIOT_KEY = process.env.RIOT_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const gameName = searchParams.get('gameName');
  const tagLine = searchParams.get('tagLine') || 'EUW';

  if (!gameName) {
    return NextResponse.json({ error: 'gameName requis' }, { status: 400 });
  }

  try {
    // 1. PUUID via Riot ID
    const accountRes = await fetch(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      { headers: { 'X-Riot-Token': RIOT_KEY } }
    );

    if (!accountRes.ok) {
      return NextResponse.json({ error: 'Joueur introuvable. Vérifie le pseudo#tag.' }, { status: 404 });
    }

    const account = await accountRes.json();
    const puuid = account.puuid;

    // 2. Summoner ID via PUUID
    const summonerRes = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      { headers: { 'X-Riot-Token': RIOT_KEY } }
    );

    if (!summonerRes.ok) {
      return NextResponse.json({ error: 'Compte LoL introuvable sur EUW.' }, { status: 404 });
    }

    const summoner = await summonerRes.json();

    // 3. Stats ranked
    const rankedRes = await fetch(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}`,
      { headers: { 'X-Riot-Token': RIOT_KEY } }
    );

    const ranked = rankedRes.ok ? await rankedRes.json() : [];
    const soloQ = ranked.find(r => r.queueType === 'RANKED_SOLO_5x5');

    // 4. Derniers matchs
    const matchListRes = await fetch(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=5&queue=420`,
      { headers: { 'X-Riot-Token': RIOT_KEY } }
    );

    const matchIds = matchListRes.ok ? await matchListRes.json() : [];

    // 5. Détails des matchs
    const matchDetails = await Promise.all(
      matchIds.slice(0, 5).map(async (id) => {
        const res = await fetch(
          `https://europe.api.riotgames.com/lol/match/v5/matches/${id}`,
          { headers: { 'X-Riot-Token': RIOT_KEY } }
        );
        if (!res.ok) return null;
        const match = await res.json();
        const player = match.info.participants.find(p => p.puuid === puuid);
        if (!player) return null;
        return {
          win: player.win,
          champion: player.championName,
          kills: player.kills,
          deaths: player.deaths,
          assists: player.assists,
          cs: player.totalMinionsKilled + player.neutralMinionsKilled,
          duration: Math.floor(match.info.gameDuration / 60),
        };
      })
    );

    return NextResponse.json({
      gameName: account.gameName,
      tagLine: account.tagLine,
      summoner: {
        name: summoner.name,
        level: summoner.summonerLevel,
        profileIconId: summoner.profileIconId,
      },
      ranked: soloQ ? {
        tier: soloQ.tier,
        rank: soloQ.rank,
        lp: soloQ.leaguePoints,
        wins: soloQ.wins,
        losses: soloQ.losses,
        winRate: Math.round((soloQ.wins / (soloQ.wins + soloQ.losses)) * 100),
      } : null,
      recentMatches: matchDetails.filter(Boolean),
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}