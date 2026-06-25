import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Mic, MessageSquare, DoorOpen, Users, Building2, CalendarDays,
  Trophy, GraduationCap, CreditCard, MapPin, ChevronRight
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { AIAvatar } from '../components/AIAvatar';
import { useLanguage } from '../context/LanguageContext';

const quickCards = [
  { key: 'findRoom', icon: DoorOpen, path: '/room', color: '#7FB8A0', bg: 'rgba(127,184,160,0.1)' },
  { key: 'employees', icon: Users, path: '/employee', color: '#9B7EC8', bg: 'rgba(155,126,200,0.1)' },
  { key: 'administration', icon: Building2, path: '/employee', color: '#E8A87C', bg: 'rgba(232,168,124,0.1)' },
  { key: 'events', icon: CalendarDays, path: '/events', color: '#7EC8E3', bg: 'rgba(126,200,227,0.1)' },
  { key: 'clubs', icon: Trophy, path: '/clubs', color: '#E87C9B', bg: 'rgba(232,124,155,0.1)' },
  { key: 'programs', icon: GraduationCap, path: '/chat', color: '#A8D8A8', bg: 'rgba(168,216,168,0.1)' },
  { key: 'payments', icon: CreditCard, path: '/payments', color: '#F7DC6F', bg: 'rgba(247,220,111,0.1)' },
  { key: 'directions', icon: MapPin, path: '/directions', color: '#7FB8A0', bg: 'rgba(var(--brand-mint-rgb),0.18)' },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [titleLead, titleRest] = t('title').split(' — ');
  const titleRestWords = titleRest?.split(' ') ?? [];
  const titleRestMain = titleRestWords.length > 2 ? titleRestWords.slice(0, -1).join(' ') : titleRest;
  const titleRestTail = titleRestWords.length > 2 ? titleRestWords[titleRestWords.length - 1] : '';

  return (
    <Layout>
      <div
        className="home-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: '3rem', paddingBottom: '4rem' }}
      >
        {/* Hero Section */}
        <div className="home-hero-stage">
          {/* Ambient background glow */}
          <div
            style={{
              position: 'absolute',
              top: '8rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 600,
              height: 400,
              background: 'radial-gradient(ellipse, rgba(var(--brand-mint-rgb),0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="home-hero-center flex flex-col items-center text-center">

          {/* AI Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ marginBottom: '2rem' }}
          >
            <AIAvatar size={220} state="idle" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1
              className="home-title"
              style={{
                fontSize: 'clamp(1.45rem, 6.4vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: 0,
                marginBottom: '1rem',
                maxWidth: 'min(860px, calc(100vw - 3rem))',
                width: '100%',
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
                background: 'var(--app-hero-title)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <span className="home-title-line">{titleLead}</span>
              {titleRestMain ? <span className="home-title-line"> — {titleRestMain}</span> : null}
              {titleRestTail ? <span className="home-title-line"> {titleRestTail}</span> : null}
            </h1>
            <p
              className="home-subtitle"
              style={{
                color: 'var(--app-text-muted)',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                maxWidth: 'min(520px, 100%)',
                lineHeight: 1.6,
                margin: '0 auto 2.5rem',
              }}
            >
              {t('subtitle')}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            {/* Voice Mode - Primary */}
            <button
              onClick={() => navigate('/voice')}
              className="group flex items-center gap-3 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))',
                color: '#0F0F0F',
                padding: '1rem 2rem',
                borderRadius: '3rem',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(var(--brand-mint-rgb),0.3), 0 4px 20px rgba(var(--brand-mint-rgb),0.2)',
                minWidth: 200,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 50px rgba(var(--brand-mint-rgb),0.5), 0 8px 30px rgba(var(--brand-mint-rgb),0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--brand-mint-rgb),0.3), 0 4px 20px rgba(var(--brand-mint-rgb),0.2)';
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--app-cta-icon-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Mic size={18} />
              </div>
              {t('voiceMode')}
            </button>

            {/* Text Chat - Secondary */}
            <button
              onClick={() => navigate('/chat')}
              className="group flex items-center gap-3 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))',
                color: '#0F0F0F',
                padding: '1rem 2rem',
                borderRadius: '3rem',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(var(--brand-mint-rgb),0.3), 0 4px 20px rgba(var(--brand-mint-rgb),0.2)',
                minWidth: 200,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 50px rgba(var(--brand-mint-rgb),0.5), 0 8px 30px rgba(var(--brand-mint-rgb),0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--brand-mint-rgb),0.3), 0 4px 20px rgba(var(--brand-mint-rgb),0.2)';
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--app-cta-icon-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageSquare size={18} />
              </div>
              {t('textChat')}
            </button>
          </motion.div>
        </div>

        {/* Quick Action Cards */}
        <div className="home-floating-actions" aria-label="Быстрые действия">
          <p
            className="quick-actions-label"
            style={{
              color: 'var(--app-text-muted)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: 0,
              marginBottom: '1.25rem',
              fontWeight: 600,
            }}
          >
            Быстрые действия
          </p>
          <div
            className="quick-actions-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
              gap: '1rem',
            }}
          >
            {quickCards.map((card, index) => {
              const Icon = card.icon;
              const descKey = card.key + 'Desc';
              return (
                <button
                  key={card.key}
                  onClick={() => navigate(card.path)}
                  className={`hero-action-card hero-action-card-${index + 1} group text-left transition-all duration-250`}
                  style={{
                    background: 'var(--app-card)',
                    border: '1px solid var(--app-border)',
                    borderRadius: 16,
                    padding: '1.25rem',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                    e.currentTarget.style.background = 'var(--app-surface-hover)';
                    e.currentTarget.style.borderColor = card.color + '40';
                    e.currentTarget.style.boxShadow = `0 8px 30px ${card.color}20`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'var(--app-card)';
                    e.currentTarget.style.borderColor = 'var(--app-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: card.bg,
                      border: `1px solid ${card.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.875rem',
                    }}
                  >
                    <Icon size={22} style={{ color: card.color }} />
                  </div>

                  {/* Text */}
                  <div
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--app-text-strong)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {t(card.key)}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--app-text-soft)',
                      lineHeight: 1.4,
                    }}
                  >
                    {t(descKey)}
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    size={16}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: 12,
                      color: 'var(--app-icon-muted)',
                      transition: 'color 0.2s',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};
