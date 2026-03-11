'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const GAMES = ['Valorant', 'League of Legends', 'CS2', 'Fortnite', 'Apex Legends', 'Rocket League', 'Overwatch 2'];
const STYLES = ['Compétitif', 'Semi-compétitif', 'Chill', 'Tryhard', 'Fun'];
const AVAILABILITIES = ['Soirs', 'Weekends', 'Journée', 'Flexible'];
const LANGUAGES = ['FR', 'EN', 'ES', 'DE', 'PT'];

function MultiSelect({ values, options, onChange, activeColor, activeBg }) {
  function toggle(opt) {
    if (values.includes(opt)) {
      onChange(values.filter(v => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  }
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(opt => {
        const active = values.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            style={{
              padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
              background: active ? activeBg : 'var(--bg-elevated)',
              border: `1px solid ${active ? activeColor : 'var(--border)'}`,
              color: active ? activeColor : 'var(--text-secondary)',
              fontSize: 13, fontWeight: active ? 600 : 500, fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}>
            {active ? '✓ ' : ''}{opt}
          </button>
        );
      })}
    </div>
  );
}

export default function EditProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    bio: '',
    games: [],
    styles: [],
    availabilities: [],
    languages: ['FR'],
  });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setForm({
          username: data.username || '',
          bio: data.bio || '',
          games: data.games || [],
          styles: data.styles || [],
          availabilities: data.availabilities || [],
          languages: data.languages || ['FR'],
        });
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(false);

    const { data: { user } } = await supabase.auth.getUser();
    const { error: updateError } = await supabase
      .from('profiles')
      .update(form)
      .eq('id', user.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/profile/me'), 1200);
    }
    setSaving(false);
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-muted)' }}>Chargement...</p>
    </div>
  );

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 8,
    border: '1px solid var(--border)', background: 'var(--bg-elevated)',
    fontSize: 14, color: 'var(--text-primary)', fontFamily: 'inherit',
    outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)',
    display: 'block', marginBottom: 8,
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <a href="/dashboard" style={{
          fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 16,
        }}>← Retour au dashboard</a>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>✏️ Éditer mon profil</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Ces infos sont visibles publiquement sur ton ProfilGG.
        </p>
      </div>

      {/* Formulaire */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 28,
        boxShadow: '0 2px 12px rgba(30,40,60,0.06)',
      }}>

        {/* Pseudo */}
        <div>
          <label style={labelStyle}>Pseudo gaming</label>
          <input
            type="text"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            style={inputStyle}
            placeholder="ShadowStrike"
          />
        </div>

        {/* Bio */}
        <div>
          <label style={labelStyle}>
            Bio{' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
              (max 120 caractères)
            </span>
          </label>
          <textarea
            value={form.bio}
            onChange={e => setForm(f => ({ ...f, bio: e.target.value.slice(0, 120) }))}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            placeholder="Duelist main · FR/EN · Dispo soirs & weekends · Clean shots, no ego"
          />
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, textAlign: 'right' }}>
            {form.bio.length}/120
          </div>
        </div>

        {/* Jeux */}
        <div>
          <label style={labelStyle}>
            Jeux pratiqués{' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(plusieurs possibles)</span>
          </label>
          <MultiSelect
            values={form.games}
            options={GAMES}
            onChange={v => setForm(f => ({ ...f, games: v }))}
            activeColor="var(--cyan)"
            activeBg="rgba(8,145,178,0.08)"
          />
        </div>

        {/* Séparateur */}
        <div style={{ height: 1, background: 'var(--border)' }} />

        {/* Style */}
        <div>
          <label style={labelStyle}>
            Style de jeu{' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(plusieurs possibles)</span>
          </label>
          <MultiSelect
            values={form.styles}
            options={STYLES}
            onChange={v => setForm(f => ({ ...f, styles: v }))}
            activeColor="var(--violet)"
            activeBg="rgba(124,58,237,0.08)"
          />
        </div>

        {/* Disponibilité */}
        <div>
          <label style={labelStyle}>
            Disponibilité{' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(plusieurs possibles)</span>
          </label>
          <MultiSelect
            values={form.availabilities}
            options={AVAILABILITIES}
            onChange={v => setForm(f => ({ ...f, availabilities: v }))}
            activeColor="var(--green)"
            activeBg="rgba(22,163,74,0.08)"
          />
        </div>

        {/* Séparateur */}
        <div style={{ height: 1, background: 'var(--border)' }} />

        {/* Langues */}
        <div>
          <label style={labelStyle}>Langues parlées</label>
          <MultiSelect
            values={form.languages}
            options={LANGUAGES}
            onChange={v => setForm(f => ({ ...f, languages: v }))}
            activeColor="var(--cyan)"
            activeBg="rgba(8,145,178,0.08)"
          />
        </div>

        {/* Messages */}
        {error && (
          <div style={{
            padding: '12px 16px', borderRadius: 8,
            background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
            color: 'var(--red)', fontSize: 13,
          }}>{error}</div>
        )}

        {success && (
          <div style={{
            padding: '12px 16px', borderRadius: 8,
            background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)',
            color: 'var(--green)', fontSize: 13, fontWeight: 600,
          }}>✅ Profil sauvegardé ! Redirection vers ton profil...</div>
        )}

        {/* Bouton */}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          style={{
            width: '100%', padding: '14px', borderRadius: 10, border: 'none',
            background: saving
              ? 'var(--bg-elevated)'
              : 'linear-gradient(135deg, var(--cyan), #06b6d4)',
            color: saving ? 'var(--text-muted)' : '#fff',
            fontSize: 15, fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            boxShadow: saving ? 'none' : '0 4px 16px rgba(8,145,178,0.25)',
          }}>
          {saving ? 'Sauvegarde en cours...' : 'Sauvegarder mon profil'}
        </button>

      </div>
    </div>
  );
}