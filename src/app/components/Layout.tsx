import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import {
  Home, ArrowLeft, Menu, X, Moon, Sun, DoorOpen, Users,
  Building2, CalendarDays, Trophy, GraduationCap, CreditCard, MapPin, ChevronDown,
} from 'lucide-react';
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

export const Layout: React.FC<LayoutProps> = ({ children, showBack, fullscreen }) => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const langs: Language[] = ['RU', 'KZ', 'EN'];
  const menuActions = [
    { key: 'findRoom', path: '/room', icon: DoorOpen },
    { key: 'employees', path: '/employee', icon: Users },
    { key: 'administration', path: '/administration', icon: Building2 },
    { key: 'events', path: '/events', icon: CalendarDays },
    { key: 'clubs', path: '/clubs', icon: Trophy },
    { key: 'programs', path: '/programs', icon: GraduationCap },
    { key: 'payments', path: '/payments', icon: CreditCard },
    { key: 'directions', path: '/directions', icon: MapPin },
  ];

  if (fullscreen) {
    return <div className="min-h-screen" style={{ background: 'var(--app-bg)' }}>{children}</div>;
  }

  const isHome = location.pathname === '/';

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
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={theme === 'light' ? logoBlack : logoMint}
                  alt="Energo University"
                  className="app-logo"
                  style={{ height: 54, width: 'auto' }}
                />
              </Link>
            </div>

            {/* Right: nav + lang */}
            <div className="app-actions flex items-center gap-3">
              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1">
                {location.pathname !== '/hall' && (
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
                )}
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

              <button
                type="button"
                aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
                title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
                onClick={toggleTheme}
                className="mobile-theme-toggle md:hidden items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  background: 'var(--app-control)',
                  border: '1px solid var(--app-control-border)',
                  color: 'var(--app-text-muted)',
                }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <div className="mobile-language-picker md:hidden">
                <button
                  type="button"
                  className="mobile-language-trigger"
                  onClick={() => {
                    setLanguageOpen(current => !current);
                    setMenuOpen(false);
                  }}
                  aria-label="Выбрать язык"
                  aria-expanded={languageOpen}
                >
                  <span>{lang}</span>
                  <ChevronDown size={14} className={languageOpen ? 'mobile-language-chevron-open' : undefined} />
                </button>
                {languageOpen && (
                  <div className="mobile-language-options" aria-label="Выбор языка">
                    {langs.map(l => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => {
                          setLang(l);
                          setLanguageOpen(false);
                        }}
                        aria-pressed={lang === l}
                        className="mobile-language-option"
                        style={{
                          background: lang === l ? 'var(--brand-mint)' : 'transparent',
                          color: lang === l ? '#0F0F0F' : 'var(--app-text-muted)',
                          fontWeight: lang === l ? 700 : 500,
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                className="mobile-menu-button md:hidden items-center justify-center rounded-lg transition-colors"
                aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={menuOpen}
                style={{ color: 'var(--app-text-muted)' }}
                onClick={() => {
                  setMenuOpen(current => !current);
                  setLanguageOpen(false);
                }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              className="mobile-navigation md:hidden pb-3 pt-3 flex flex-col gap-1"
              style={{ borderTop: '1px solid var(--app-border-strong)', marginTop: 0 }}
            >
              {location.pathname !== '/hall' && (
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
              )}
              <div className="mobile-actions-menu" aria-label="Разделы Energen">
                {menuActions.map(action => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.key}
                      to={action.path}
                      onClick={() => setMenuOpen(false)}
                      className="mobile-action-link"
                    >
                      <Icon size={17} />
                      <span>{t(action.key)}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {showBack && (
        <div
          className="page-back-wrap w-full px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: '1rem' }}
        >
          <div className="page-back-row flex items-center gap-3">
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
          </div>
        </div>
      )}

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
};
