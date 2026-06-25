import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Home, MessageSquare, ArrowLeft, Menu, X, Moon, Sun } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { useThemeMode } from '../context/ThemeContext';
import logoBlack from '../../assets/energo-logo-black.png';
import logoMint from '../../assets/energo-logo-mint.png';

interface LayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  title?: string;
  fullscreen?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showBack, title, fullscreen }) => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const langs: Language[] = ['RU', 'KZ', 'EN'];

  if (fullscreen) {
    return <div className="min-h-screen" style={{ background: 'var(--app-bg)' }}>{children}</div>;
  }

  const isHome = location.pathname === '/';
  const isChat = location.pathname === '/chat';

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--app-bg)', color: 'var(--app-text)', overflowX: 'hidden' }}
    >
      {/* Header */}
      <header
        style={{
          background: 'var(--app-header)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--app-border-strong)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="app-header-shell w-full px-3 sm:px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={theme === 'light' ? logoBlack : logoMint}
                  alt="Energo University"
                  className="app-logo"
                  style={{ height: 61, width: 'auto' }}
                />
              </Link>
              <button
                type="button"
                aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
                title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
                onClick={toggleTheme}
                className="mobile-theme-toggle md:hidden items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  width: 30,
                  height: 30,
                  background: 'var(--app-surface)',
                  border: '1px solid var(--app-border-strong)',
                  color: 'var(--app-text-muted)',
                  boxShadow: '0 8px 24px var(--app-shadow)',
                }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>

            {/* Right: nav + lang */}
            <div className="app-actions flex items-center gap-3">
              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  to="/"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200"
                  style={{
                    color: isHome ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                    background: isHome ? 'var(--app-nav-active)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isHome) e.currentTarget.style.color = 'var(--app-text-strong)'; }}
                  onMouseLeave={e => { if (!isHome) e.currentTarget.style.color = 'var(--app-text-muted)'; }}
                >
                  <Home size={15} />
                  <span>{t('home')}</span>
                </Link>
                <Link
                  to="/chat"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200"
                  style={{
                    color: isChat ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                    background: isChat ? 'var(--app-nav-active)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isChat) e.currentTarget.style.color = 'var(--app-text-strong)'; }}
                  onMouseLeave={e => { if (!isChat) e.currentTarget.style.color = 'var(--app-text-muted)'; }}
                >
                  <MessageSquare size={15} />
                  <span>{t('chat')}</span>
                </Link>
              </nav>

              {/* Theme switcher */}
              <button
                type="button"
                aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
                title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
                onClick={toggleTheme}
                className="theme-toggle flex items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  width: 34,
                  height: 34,
                  background: 'var(--app-control)',
                  border: '1px solid var(--app-control-border)',
                  color: 'var(--app-text-muted)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--brand-mint-strong)';
                  e.currentTarget.style.borderColor = 'var(--app-border-strong)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--app-text-muted)';
                  e.currentTarget.style.borderColor = 'var(--app-control-border)';
                }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Language switcher */}
              <div
                className="flex items-center rounded-lg p-0.5 gap-0.5"
                data-theme-control="language"
                style={{ background: 'var(--app-control)', border: '1px solid var(--app-control-border)' }}
              >
                {langs.map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    data-active={lang === l}
                    className="language-button px-2.5 py-1 rounded-md text-sm transition-all duration-200"
                    style={{
                      background: lang === l ? 'var(--brand-mint)' : 'transparent',
                      color: lang === l ? '#0F0F0F' : 'var(--app-text-muted)',
                      fontWeight: lang === l ? 600 : 400,
                    }}
                    onMouseEnter={e => { if (lang !== l) e.currentTarget.style.color = 'var(--app-text-strong)'; }}
                    onMouseLeave={e => { if (lang !== l) e.currentTarget.style.color = 'var(--app-text-muted)'; }}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                className="mobile-menu-button md:hidden p-1.5 rounded-lg transition-colors"
                style={{ color: 'var(--app-text-muted)' }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              className="md:hidden pb-4 pt-2 flex flex-col gap-1"
              style={{ borderTop: '1px solid var(--app-border-strong)', marginTop: 0 }}
            >
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                style={{
                  color: isHome ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                  background: isHome ? 'var(--app-nav-active)' : 'transparent',
                }}
              >
                <Home size={16} /> {t('home')}
              </Link>
              <Link
                to="/chat"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                style={{
                  color: isChat ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                  background: isChat ? 'var(--app-nav-active)' : 'transparent',
                }}
              >
                <MessageSquare size={16} /> {t('chat')}
              </Link>
            </div>
          )}
        </div>
      </header>

      {showBack && (
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: '1rem' }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label={t('back')}
              title={t('back')}
              className="flex items-center justify-center transition-all duration-200"
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'var(--app-control)',
                border: '1px solid var(--app-control-border)',
                color: 'var(--brand-mint-strong)',
                boxShadow: '0 10px 26px var(--app-shadow)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(-2px)';
                e.currentTarget.style.background = 'var(--app-surface-hover)';
                e.currentTarget.style.borderColor = 'var(--app-border-strong)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.background = 'var(--app-control)';
                e.currentTarget.style.borderColor = 'var(--app-control-border)';
              }}
            >
              <ArrowLeft size={21} />
            </button>
            {title ? (
              <span
                style={{
                  color: 'var(--brand-mint-strong)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                }}
              >
                {title}
              </span>
            ) : null}
          </div>
        </div>
      )}

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
};
