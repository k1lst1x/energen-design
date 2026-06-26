import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Filter, Instagram, Mail, MapPin, Music2, Phone, Search, Trophy, Users, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { Layout } from '../components/Layout';
import { Club, clubs, directions, getEventsForClub, getNearestEventForClub } from '../data/campusData';

interface ClubDetailProps {
  club: Club;
  onClose: () => void;
  onOpenEvent: (eventId: number) => void;
}

const ClubDetail: React.FC<ClubDetailProps> = ({ club, onClose, onOpenEvent }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const gallery = club.gallery.length > 0 ? club.gallery : [club.image];
  const clubEvents = getEventsForClub(club.id);
  const nearestEvent = getNearestEventForClub(club.id);

  const showPrevSlide = () => {
    setActiveSlide(prev => (prev - 1 + gallery.length) % gallery.length);
  };

  const showNextSlide = () => {
    setActiveSlide(prev => (prev + 1) % gallery.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--app-modal-backdrop)',
        backdropFilter: 'blur(14px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.98 }}
        transition={{ type: 'spring', damping: 24, stiffness: 260 }}
        className="club-modal"
        style={{
          background: 'var(--app-card)',
          border: '1px solid var(--app-border)',
          borderRadius: 26,
          width: 'min(94vw, 920px)',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.45)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="club-modal-gallery">
          <AnimatePresence mode="wait">
            <motion.img
              key={gallery[activeSlide]}
              src={gallery[activeSlide]}
              alt={club.name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28 }}
            />
          </AnimatePresence>
          <div className="club-modal-gallery-scrim" />

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                className="club-modal-nav club-modal-nav-left"
                onClick={event => {
                  event.stopPropagation();
                  showPrevSlide();
                }}
                aria-label="Предыдущее фото"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="club-modal-nav club-modal-nav-right"
                onClick={event => {
                  event.stopPropagation();
                  showNextSlide();
                }}
                aria-label="Следующее фото"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div className="club-modal-slide-count">
            {activeSlide + 1} / {gallery.length}
          </div>

          <button
            onClick={onClose}
            className="club-modal-close"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>

          <div className="club-modal-thumbs">
            {gallery.map((photo, index) => (
              <button
                key={photo}
                type="button"
                className={index === activeSlide ? 'club-modal-thumb club-modal-thumb-active' : 'club-modal-thumb'}
                onClick={event => {
                  event.stopPropagation();
                  setActiveSlide(index);
                }}
                style={{
                  borderColor: index === activeSlide ? club.color : 'var(--app-border)',
                }}
                aria-label={`Фото ${index + 1}`}
              >
                <img src={photo} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="club-modal-content">
          <div className="club-modal-main">
            <div className="club-modal-kicker" style={{ color: club.color }}>
              <Users size={16} />
              {club.members} участников
            </div>
            <h2>{club.name}</h2>

            <div className="club-modal-tags">
              {club.tags.map(tag => (
                <span key={tag} style={{ background: club.bg, borderColor: `${club.color}35`, color: club.color }}>
                  {tag}
                </span>
              ))}
            </div>

            <p className="club-modal-desc">{club.fullDesc}</p>

            <div className="club-modal-info-grid">
              {[
                { icon: MapPin, label: 'Где', value: club.location },
                { icon: CalendarDays, label: 'Когда', value: club.schedule },
                { icon: Trophy, label: 'Ближайшее', value: club.nextEvent },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="club-modal-info-card">
                    <Icon size={17} style={{ color: club.color }} />
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="club-modal-side">
            <div className="club-modal-panel">
              <div className="club-modal-panel-title">
                <Trophy size={16} style={{ color: club.color }} />
                Достижения
              </div>
              {club.achievements.map((achievement, index) => (
                <p key={index}>{achievement}</p>
              ))}
            </div>

            <div className="club-modal-panel">
              <div className="club-modal-panel-title">
                <Mail size={16} style={{ color: club.color }} />
                Контакты
              </div>
              <a href={`mailto:${club.contacts.email}`} className="club-modal-contact">
                <Mail size={15} style={{ color: club.color }} />
                {club.contacts.email}
              </a>
              <a href={`tel:${club.contacts.phone.replace(/[^\d+]/g, '')}`} className="club-modal-contact">
                <Phone size={15} style={{ color: club.color }} />
                {club.contacts.phone}
              </a>
            </div>

            <div className="club-modal-socials">
              <a href={club.socials.instagram} target="_blank" rel="noreferrer" style={{ borderColor: `${club.color}45` }}>
                <Instagram size={18} style={{ color: club.color }} />
                Instagram
                <ArrowUpRight size={15} />
              </a>
              <a href={club.socials.tiktok} target="_blank" rel="noreferrer" style={{ borderColor: `${club.color}45` }}>
                <Music2 size={18} style={{ color: club.color }} />
                TikTok
                <ArrowUpRight size={15} />
              </a>
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ClubsPage: React.FC = () => {
  const [selectedClub, setSelectedClub] = useState<typeof clubs[0] | null>(null);
  const [query, setQuery] = useState('');
  const [activeDirection, setActiveDirection] = useState('all');

  const filteredClubs = clubs.filter(club => {
    const normalized = query.trim().toLowerCase();
    const matchesDirection = activeDirection === 'all' || club.direction === activeDirection;
    const matchesQuery = !normalized || [club.name, club.shortDesc, club.fullDesc, club.tags.join(' ')]
      .join(' ')
      .toLowerCase()
      .includes(normalized);
    return matchesDirection && matchesQuery;
  });
  const spotlightClub = filteredClubs[0] ?? clubs[0];

  return (
    <Layout title="Клубы и организации" showBack>
      <div className="clubs-page page-content mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 850, fontSize: '2rem', marginBottom: 8 }}>
            Студенческие клубы
          </h1>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '1rem' }}>
            Найди своё сообщество, развивай таланты и заводи знакомства
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="flex items-center gap-2"
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            borderRadius: 14,
            padding: '0.8rem 1rem',
            marginBottom: '1rem',
          }}
        >
          <Search size={18} style={{ color: 'var(--app-icon-muted)' }} />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Поиск клуба по названию или направлению"
            style={{
              flex: 1,
              background: 'transparent',
              border: 0,
              outline: 'none',
              color: 'var(--app-text)',
              fontSize: '0.95rem',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="flex items-center gap-2 flex-wrap"
          style={{ marginBottom: '1.5rem' }}
        >
          <Filter size={16} style={{ color: 'var(--app-icon-muted)' }} />
          {directions.map(direction => (
            <button
              key={direction.key}
              type="button"
              onClick={() => setActiveDirection(direction.key)}
              style={{
                padding: '0.45rem 0.875rem',
                borderRadius: 999,
                border: `1px solid ${activeDirection === direction.key ? 'var(--brand-mint-strong)' : 'var(--app-control-border)'}`,
                background: activeDirection === direction.key ? 'var(--app-nav-active)' : 'var(--app-control)',
                color: activeDirection === direction.key ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                fontWeight: activeDirection === direction.key ? 700 : 500,
              }}
            >
              {direction.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="clubs-spotlight"
          onClick={() => setSelectedClub(spotlightClub)}
        >
          <div className="clubs-spotlight-media">
            <img src={spotlightClub.image} alt={spotlightClub.name} />
            <div className="clubs-spotlight-scrim" />
            <div className="clubs-spotlight-badge" style={{ color: spotlightClub.color }}>
              <Trophy size={15} />
              Клуб в фокусе
            </div>
          </div>

          <div className="clubs-spotlight-body">
            <div className="clubs-spotlight-kicker" style={{ color: spotlightClub.color }}>
              {spotlightClub.tags[0]} · {spotlightClub.members} участников
            </div>
            <h2 className="clubs-spotlight-title">{spotlightClub.name}</h2>
            <p className="clubs-spotlight-desc">{spotlightClub.fullDesc}</p>

            <div className="clubs-spotlight-meta">
              {[
                { icon: MapPin, label: spotlightClub.location },
                { icon: CalendarDays, label: spotlightClub.schedule },
                { icon: Trophy, label: spotlightClub.nextEvent },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <span key={item.label} style={{ borderColor: `${spotlightClub.color}35` }}>
                    <Icon size={15} style={{ color: spotlightClub.color }} />
                    {item.label}
                  </span>
                );
              })}
            </div>

            <div className="clubs-spotlight-actions">
              <button
                type="button"
                style={{
                  background: `linear-gradient(135deg, ${spotlightClub.color}, ${spotlightClub.color}cc)`,
                  color: '#0f0f0f',
                }}
              >
                Открыть клуб
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {[
            { label: 'Клубов', value: '12+', color: '#7FB8A0' },
            { label: 'Участников', value: '345+', color: '#9B7EC8' },
            { label: 'Событий в год', value: '60+', color: '#E87C9B' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background: 'var(--app-card)',
                border: '1px solid var(--app-border)',
                borderRadius: 16,
                padding: '1.1rem 1.25rem',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Club cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredClubs.map((club, idx) => {
            return (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                style={{
                  background: 'var(--app-card)',
                  border: '1px solid var(--app-border)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = `${club.color}30`;
                  e.currentTarget.style.boxShadow = `0 8px 30px ${club.color}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--app-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => setSelectedClub(club)}
              >
                {/* Image */}
                <div style={{ height: 235, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={club.image}
                    alt={club.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'var(--app-image-scrim)' }} />

                  {/* Members badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: 'var(--app-overlay-panel)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 20,
                      padding: '0.25rem 0.625rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Users size={11} style={{ color: club.color }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--app-text)' }}>{club.members}</span>
                  </div>

                </div>

                {/* Info */}
                <div style={{ padding: '1.2rem' }}>
                  <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 760, fontSize: '1.1rem', lineHeight: 1.35, marginBottom: 8 }}>
                    {club.name}
                  </h3>
                  <p style={{ fontSize: '0.98rem', color: 'var(--app-text-muted)', lineHeight: 1.5, marginBottom: '0.9rem' }}>
                    {club.shortDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-2" style={{ marginBottom: '0.9rem' }}>
                    {[
                      { icon: MapPin, value: club.location },
                      { icon: CalendarDays, value: club.schedule },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.value}
                          className="flex items-center gap-2"
                          style={{
                            minHeight: 38,
                            padding: '0.45rem 0.6rem',
                            borderRadius: 12,
                            background: 'var(--app-bg-soft)',
                            border: '1px solid var(--app-border)',
                            color: 'var(--app-text-muted)',
                            fontSize: '0.9rem',
                          }}
                        >
                          <Icon size={14} style={{ color: club.color, flexShrink: 0 }} />
                          <span>{item.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '0.875rem' }}>
                    {club.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.2rem 0.6rem',
                          borderRadius: 20,
                          background: club.bg,
                          border: `1px solid ${club.color}25`,
                          fontSize: '0.9rem',
                          color: club.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center justify-between"
                    style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--app-border)' }}
                  >
                    <span style={{ fontSize: '0.875rem', color: club.color, fontWeight: 600 }}>
                      Подробнее
                    </span>
                    <ArrowUpRight size={15} style={{ color: 'var(--app-icon-muted)' }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedClub && (
          <ClubDetail
            club={selectedClub}
            onClose={() => setSelectedClub(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};
