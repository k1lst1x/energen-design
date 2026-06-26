import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CalendarDays, MapPin, Users, Filter, Search, ExternalLink, Bell, Sparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';
import { Club, dateFilters, events, filterTypes, getClubsForEvent } from '../data/campusData';

interface EventClubCarouselProps {
  clubs: Club[];
  onOpenClub: (clubId: number) => void;
}

const EventClubCarousel: React.FC<EventClubCarouselProps> = ({ clubs, onOpenClub }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [clubs]);

  useEffect(() => {
    if (clubs.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % clubs.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [clubs.length]);

  if (clubs.length === 0) return null;

  const club = clubs[activeIndex % clubs.length];

  return (
    <div className="event-clubs-block">
      <div className="event-clubs-title">Клубы участвуют в проведении</div>
      <div className="event-club-carousel">
        <AnimatePresence mode="wait">
          <motion.button
            key={club.id}
            type="button"
            className="event-club-slide"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.28 }}
            onClick={() => onOpenClub(club.id)}
            style={{
              borderColor: `${club.color}38`,
              background: club.bg,
              color: club.color,
            }}
          >
            <img src={club.image} alt="" />
            <span>
              <strong>{club.name}</strong>
              <small>{club.tags.slice(0, 2).join(' · ')}</small>
            </span>
            <ArrowUpRight size={16} />
          </motion.button>
        </AnimatePresence>
      </div>
      {clubs.length > 1 && (
        <div className="event-club-dots">
          {clubs.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Показать клуб ${index + 1}`}
              className={index === activeIndex ? 'event-club-dot event-club-dot-active' : 'event-club-dot'}
              onClick={() => setActiveIndex(index)}
              style={{ background: index === activeIndex ? club.color : 'var(--app-control-border)' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const EventsPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeDate, setActiveDate] = useState('all');
  const [query, setQuery] = useState('');
  const [registeredIds, setRegisteredIds] = useState<Set<number>>(new Set());
  const focusedEventId = Number(searchParams.get('event')) || null;

  const filtered = events.filter(e => {
    const normalized = query.trim().toLowerCase();
    const eventClubs = getClubsForEvent(e);
    const matchesType = activeFilter === 'all' || e.type === activeFilter;
    const matchesDate = activeDate === 'all' || e.period === activeDate;
    const matchesQuery = !normalized || [
      e.title,
      e.description,
      e.location,
      e.typeLabel,
      eventClubs.map(club => `${club.name} ${club.tags.join(' ')}`).join(' '),
    ]
      .join(' ')
      .toLowerCase()
      .includes(normalized);
    return matchesType && matchesDate && matchesQuery;
  });

  const visibleEvents = useMemo(() => {
    if (!focusedEventId) return filtered;

    return [...filtered].sort((a, b) => {
      if (a.id === focusedEventId) return -1;
      if (b.id === focusedEventId) return 1;
      return 0;
    });
  }, [filtered, focusedEventId]);

  const nearestEvent = useMemo(() => {
    const activeEvents = events.filter(event => event.period !== 'past');
    const source = activeEvents.length > 0 ? activeEvents : events;
    return [...source].sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())[0];
  }, []);

  const handleRegister = (id: number) => {
    setRegisteredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Layout title="Мероприятия" showBack>
      <div className="events-page page-content mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1.75rem', marginBottom: 8 }}>
            Мероприятия
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
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
            placeholder="Поиск по названию, месту или организатору"
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 flex-wrap"
          style={{ marginBottom: '1.5rem' }}
        >
          <Filter size={14} style={{ color: 'var(--app-icon-muted)', flexShrink: 0 }} />
          {dateFilters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveDate(f.key)}
              style={{
                padding: '0.4rem 0.875rem',
                borderRadius: 20,
                border: `1px solid ${activeDate === f.key ? 'var(--brand-mint-strong)' : 'var(--app-control-border)'}`,
                background: activeDate === f.key ? 'var(--app-nav-active)' : 'var(--app-control)',
                color: activeDate === f.key ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                fontSize: '0.875rem',
                fontWeight: activeDate === f.key ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
          <span style={{ width: 1, height: 24, background: 'var(--app-border)', margin: '0 0.25rem' }} />
          {filterTypes.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                padding: '0.4rem 0.875rem',
                borderRadius: 20,
                border: `1px solid ${activeFilter === f.key ? 'var(--brand-mint-strong)' : 'var(--app-control-border)'}`,
                background: activeFilter === f.key ? 'var(--app-nav-active)' : 'var(--app-control)',
                color: activeFilter === f.key ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                fontSize: '0.875rem',
                fontWeight: activeFilter === f.key ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {nearestEvent && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="event-nearest-card"
            style={{
              borderColor: `${nearestEvent.color}35`,
              background: `linear-gradient(135deg, ${nearestEvent.color}18, var(--app-card) 42%)`,
            }}
          >
            <div className="event-nearest-icon" style={{ color: nearestEvent.color }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div className="event-nearest-label" style={{ color: nearestEvent.color }}>Ближайшее мероприятие</div>
              <h2>{nearestEvent.title}</h2>
              <p>{nearestEvent.date} · {nearestEvent.location}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/events?event=${nearestEvent.id}`)}
              style={{ color: nearestEvent.color, borderColor: `${nearestEvent.color}45` }}
            >
              Показать
              <ArrowUpRight size={15} />
            </button>
          </motion.div>
        )}

        {/* Events grid */}
        <div className="flex flex-col gap-4">
          {visibleEvents.map((event, idx) => {
            const isRegistered = registeredIds.has(event.id);
            const fillPct = Math.round((event.registered / event.capacity) * 100);
            const eventClubs = getClubsForEvent(event);
            const isFocused = event.id === focusedEventId;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                style={{
                  background: 'var(--app-card)',
                  border: `1px solid ${isFocused ? `${event.color}75` : 'var(--app-border)'}`,
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: isFocused ? `0 0 0 1px ${event.color}25, 0 18px 50px ${event.color}12` : 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${event.color}${isFocused ? '90' : '30'}`;
                  e.currentTarget.style.boxShadow = `0 4px 30px ${event.color}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isFocused ? `${event.color}75` : 'var(--app-border)';
                  e.currentTarget.style.boxShadow = isFocused ? `0 0 0 1px ${event.color}25, 0 18px 50px ${event.color}12` : 'none';
                }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div
                    style={{
                      height: 351,
                      width: 'clamp(29.25rem, 43vw, 50.7rem)',
                      minWidth: 'min(468px, 100%)',
                      maxWidth: '100%',
                      flexShrink: 0,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s',
                      }}
                    />
                    {/* Date badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: 'var(--app-overlay-panel)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 10,
                        padding: '0.4rem 0.75rem',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '1.55rem', fontWeight: 800, color: event.color, lineHeight: 1 }}>
                        {event.dateShort.day}
                      </div>
                      <div style={{ fontSize: '0.95rem', color: 'var(--app-text-soft)', fontWeight: 600 }}>
                        {event.dateShort.month}
                      </div>
                    </div>
                    {/* Type badge */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        background: `${event.color}25`,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${event.color}40`,
                        borderRadius: 20,
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.95rem',
                        color: event.color,
                        fontWeight: 600,
                      }}
                    >
                      {event.typeLabel}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {isFocused && (
                      <div className="event-focus-badge" style={{ color: event.color, borderColor: `${event.color}40`, background: `${event.color}12` }}>
                        Открыто из клуба
                      </div>
                    )}
                    <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 750, fontSize: '1.18rem', lineHeight: 1.35, margin: 0 }}>
                      {event.title}
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--app-text-muted)', lineHeight: 1.55, margin: 0 }}>
                      {event.description}
                    </p>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <MapPin size={15} style={{ color: 'var(--app-icon-muted)', flexShrink: 0 }} />
                        <span style={{ fontSize: '1rem', color: 'var(--app-text-muted)' }}>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={15} style={{ color: 'var(--app-icon-muted)', flexShrink: 0 }} />
                        <span style={{ fontSize: '1rem', color: 'var(--app-text-muted)' }}>
                          {event.registered} / {event.capacity} мест
                        </span>
                      </div>
                    </div>

                    {eventClubs.length > 0 && (
                      <div className="event-clubs-block">
                        <div className="event-clubs-title">Клубы участвуют в проведении</div>
                        <div className="event-clubs-list">
                          {eventClubs.map(club => (
                            <button
                              key={club.id}
                              type="button"
                              className="event-club-pill"
                              onClick={() => navigate(`/clubs?club=${club.id}`)}
                              style={{
                                borderColor: `${club.color}38`,
                                background: club.bg,
                                color: club.color,
                              }}
                            >
                              <img src={club.image} alt="" />
                              <span>{club.name}</span>
                              <ArrowUpRight size={14} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Progress bar */}
                    <div>
                      <div
                        style={{
                          height: 4,
                          background: 'var(--app-control)',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${fillPct}%`,
                            background: fillPct > 80 ? '#E87C9B' : event.color,
                            borderRadius: 2,
                            transition: 'width 0.5s ease',
                          }}
                        />
                      </div>
                      <div style={{ fontSize: '0.95rem', color: 'var(--app-text-soft)', marginTop: 4 }}>
                        {fillPct}% мест занято
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap" style={{ marginTop: 'auto' }}>
                      <button
                        onClick={() => handleRegister(event.id)}
                        style={{
                          flex: 1,
                          minWidth: 120,
                          padding: '0.6rem 1rem',
                          borderRadius: 12,
                          border: `1px solid ${isRegistered ? 'rgba(127,184,160,0.4)' : event.color + '40'}`,
                          background: isRegistered ? 'rgba(127,184,160,0.15)' : `${event.color}12`,
                          color: isRegistered ? 'var(--brand-mint-strong)' : event.color,
                          fontSize: '0.98rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <ExternalLink size={13} />
                        {isRegistered ? 'Зарегистрировано ✓' : t('register')}
                      </button>
                      <button
                        style={{
                          padding: '0.6rem',
                          borderRadius: 12,
                          border: '1px solid var(--app-control-border)',
                          background: 'transparent',
                          color: 'var(--app-icon-muted)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-mint-strong)'; e.currentTarget.style.borderColor = 'var(--app-border-strong)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--app-icon-muted)'; e.currentTarget.style.borderColor = 'var(--app-control-border)'; }}
                      >
                        <Bell size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
