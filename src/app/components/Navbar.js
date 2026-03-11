'use client';

import { useState } from 'react';

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px', height: 64,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 16, color: '#fff',
        }}>G</div>
        <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Profil<span style={{ color: 'var(--cyan)' }}>GG</span>
        </span>
      </a>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 4 }}>
        {[
          { href: '/', label: 'Accueil' },
          { href: '/news', label: 'Actus' },
          { href: '/profile', label: 'Profil' },
          { href: '/lfg', label: 'LFG' },
          { href: '/coaches', label: 'Coachs' },
        ].map(item => (
          <a key={item.href} href={item.href} style={{
            padding: '8px 14px', borderRadius: 8,
            fontSize: 14, fontWeight: 500,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
          }}>
            {item.label}
          </a>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        <a href="/login" style={{
          padding: '8px 18px', borderRadius: 8,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          fontSize: 14, fontWeight: 600,
          color: 'var(--text-primary)',
          textDecoration: 'none',
        }}>Connexion</a>
        <a href="/register" style={{
          padding: '8px 18px', borderRadius: 8,
          background: 'linear-gradient(135deg, var(--cyan), #06b6d4)',
          fontSize: 14, fontWeight: 600,
          color: '#fff', textDecoration: 'none',
        }}>Créer mon profil</a>
      </div>
    </nav>
  );
}