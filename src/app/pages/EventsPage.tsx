import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, MapPin, Users, Filter, Search, ExternalLink, Bell, ChevronRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

const eventImg1 = 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80';
const eventImg2 = 'https://images.unsplash.com/photo-1631350397792-8e0c2de5b637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80';
const eventImg3 = 'https://images.unsplash.com/photo-1712029972454-0ed8bb0c0fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80';
const eventImg4 = 'https://images.unsplash.com/photo-1680264370818-659352fa16f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80';

const events = [
  {
    id: 1,
    title: 'Международная конференция по энергетике ENERGY-2026',
    date: '15 апреля 2026',
    dateShort: { day: '15', month: 'АПР' },
    location: 'Главный актовый зал, Корпус A',
    type: 'conference',
    period: 'month',
    typeLabel: 'Конференция',
    capacity: 250,
    registered: 178,
    image: eventImg1,
    color: '#7FB8A0',
    description: 'Ежегодная международная конференция, объединяющая учёных и специалистов в области энергетики и электроэнергетики.',
  },
  {
    id: 2,
    title: 'Хакатон по цифровым технологиям DIGITECH-2026',
    date: '22 апреля 2026',
    dateShort: { day: '22', month: 'АПР' },
    location: 'Компьютерный центр, Корпус B',
    type: 'hackathon',
    period: 'week',
    typeLabel: 'Хакатон',
    capacity: 120,
    registered: 98,
    image: eventImg2,
    color: '#9B7EC8',
    description: '48-часовой хакатон для студентов по разработке инновационных решений в области цифровых технологий.',
  },
  {
    id: 3,
    title: 'День открытых дверей АЭУС 2026',
    date: '3 мая 2026',
    dateShort: { day: '3', month: 'МАЙ' },
    location: 'Главный корпус',
    type: 'open-day',
    period: 'month',
    typeLabel: 'Открытый день',
    capacity: 500,
    registered: 312,
    image: eventImg3,
    color: '#7EC8E3',
    description: 'Познакомьтесь с нашим университетом, кафедрами, преподавателями и возможностями для абитуриентов.',
  },
  {
    id: 4,
    title: 'Студенческий фестиваль науки и творчества',
    date: '10 мая 2026',
    dateShort: { day: '10', month: 'МАЙ' },
    location: 'Студенческий центр',
    type: 'festival',
    period: 'past',
    typeLabel: 'Фестиваль',
    capacity: 400,
    registered: 201,
    image: eventImg4,
    color: '#E87C9B',
    description: 'Ежегодный праздник науки, инноваций и студенческого творчества с выставками проектов и концертами.',
  },
];

const filterTypes = [
  { key: 'all', label: 'Все' },
  { key: 'conference', label: 'Конференции' },
  { key: 'hackathon', label: 'Хакатоны' },
  { key: 'open-day', label: 'Открытые дни' },
  { key: 'festival', label: 'Фестивали' },
];

const dateFilters = [
  { key: 'all', label: 'Все даты' },
  { key: 'week', label: 'Эта неделя' },
  { key: 'month', label: 'Этот месяц' },
  { key: 'past', label: 'Архив' },
];

export const EventsPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeDate, setActiveDate] = useState('all');
  const [query, setQuery] = useState('');
  const [registeredIds, setRegisteredIds] = useState<Set<number>>(new Set());

  const filtered = events.filter(e => {
    const normalized = query.trim().toLowerCase();
    const matchesType = activeFilter === 'all' || e.type === activeFilter;
    const matchesDate = activeDate === 'all' || e.period === activeDate;
    const matchesQuery = !normalized || [e.title, e.description, e.location, e.typeLabel]
      .join(' ')
      .toLowerCase()
      .includes(normalized);
    return matchesType && matchesDate && matchesQuery;
  });

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
      <div className="page-content max-w-4xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1.75rem', marginBottom: 8 }}>
            Мероприятия
          </h1>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
            Конференции, хакатоны, фестивали и другие события АЭУС
          </p>
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

        {/* Events grid */}
        <div className="flex flex-col gap-4">
          {filtered.map((event, idx) => {
            const isRegistered = registeredIds.has(event.id);
            const fillPct = Math.round((event.registered / event.capacity) * 100);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                style={{
                  background: 'var(--app-card)',
                  border: '1px solid var(--app-border)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${event.color}30`;
                  e.currentTarget.style.boxShadow = `0 4px 30px ${event.color}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--app-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div
                    style={{
                      height: 180,
                      minWidth: 200,
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
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: event.color, lineHeight: 1 }}>
                        {event.dateShort.day}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', fontWeight: 600 }}>
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
                        fontSize: '0.875rem',
                        color: event.color,
                        fontWeight: 600,
                      }}
                    >
                      {event.typeLabel}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.4, margin: 0 }}>
                      {event.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)', lineHeight: 1.55, margin: 0 }}>
                      {event.description}
                    </p>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <MapPin size={13} style={{ color: 'var(--app-icon-muted)', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)' }}>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={13} style={{ color: 'var(--app-icon-muted)', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)' }}>
                          {event.registered} / {event.capacity} мест
                        </span>
                      </div>
                    </div>

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
                      <div style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', marginTop: 3 }}>
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
                          fontSize: '0.875rem',
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
