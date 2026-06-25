import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Mail, Phone, Instagram, X, ChevronRight, Trophy, Search, Filter } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

const roboticsImg = 'https://images.unsplash.com/photo-1755053757912-a63da9d6e0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80';
const musicImg = 'https://images.unsplash.com/photo-1770844049822-583611b8efb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80';
const hackImg = 'https://images.unsplash.com/photo-1631350397792-8e0c2de5b637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80';
const clubImg4 = 'https://images.unsplash.com/photo-1680264370818-659352fa16f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80';

const clubs = [
  {
    id: 1,
    name: 'Клуб робототехники AUES Robotics',
    shortDesc: 'Проектируем и создаём роботов для соревнований',
    fullDesc: 'Клуб занимается разработкой роботов различного назначения — от манипуляторов до автономных дронов. Участвуем в международных соревнованиях RoboCup и Kazakhstan Robotics Olympiad.',
    members: 42,
    image: roboticsImg,
    color: '#7FB8A0',
    bg: 'rgba(127,184,160,0.1)',
    contacts: {
      email: 'robotics@aues.kz',
      phone: '+7 (727) 292-07-60 доб. 2310',
      instagram: '@aues_robotics',
    },
    tags: ['Инженерия', 'Программирование', 'Соревнования'],
    direction: 'engineering',
    achievements: ['🥇 RoboCup 2025 — 1 место в регионе', '🏆 КазРобот 2024 — Гран-при'],
  },
  {
    id: 2,
    name: 'Студенческий музыкальный клуб AUES Music',
    shortDesc: 'Вокал, инструменты, концерты и фестивали',
    fullDesc: 'Открыты для всех любителей музыки — от классики до современных жанров. Проводим концерты, участвуем в университетских мероприятиях и городских фестивалях.',
    members: 78,
    image: musicImg,
    color: '#E87C9B',
    bg: 'rgba(232,124,155,0.1)',
    contacts: {
      email: 'music@aues.kz',
      phone: '+7 (727) 292-07-60 доб. 2400',
      instagram: '@aues_music',
    },
    tags: ['Музыка', 'Концерты', 'Творчество'],
    direction: 'creative',
    achievements: ['🎤 Лучший студенческий клуб 2025', '🎵 Гала-концерт "Звёзды АЭУС" 2024'],
  },
  {
    id: 3,
    name: 'IT и Хакатон клуб HackAUES',
    shortDesc: 'Хакатоны, проекты, стартапы, нетворкинг',
    fullDesc: 'Объединяем разработчиков, дизайнеров и предпринимателей. Организуем хакатоны, воркшопы и менторинг-сессии с представителями IT-индустрии Казахстана.',
    members: 95,
    image: hackImg,
    color: '#9B7EC8',
    bg: 'rgba(155,126,200,0.1)',
    contacts: {
      email: 'hack@aues.kz',
      phone: '+7 (727) 292-07-60 доб. 2510',
      instagram: '@hackaues',
    },
    tags: ['IT', 'Программирование', 'Стартапы', 'Нетворкинг'],
    direction: 'engineering',
    achievements: ['💡 Лучший стартап-клуб KZ 2025', '🚀 3 команды в акселератор Q Accelerator'],
  },
  {
    id: 4,
    name: 'Волонтёрский клуб AUES Volunteers',
    shortDesc: 'Социальные проекты и помощь обществу',
    fullDesc: 'Реализуем экологические, социальные и образовательные инициативы. Более 500 волонтёрских часов ежегодно и партнёрство с городскими организациями Алматы.',
    members: 130,
    image: clubImg4,
    color: '#7EC8E3',
    bg: 'rgba(126,200,227,0.1)',
    contacts: {
      email: 'volunteer@aues.kz',
      phone: '+7 (727) 292-07-60 доб. 2600',
      instagram: '@aues_volunteers',
    },
    tags: ['Волонтёрство', 'Экология', 'Социальные проекты'],
    direction: 'volunteer',
    achievements: ['🌱 Eco Award 2025', '❤️ Лучший волонтёрский клуб ВУЗа Алматы'],
  },
];

const directions = [
  { key: 'all', label: 'Все' },
  { key: 'engineering', label: 'Наука и техника' },
  { key: 'creative', label: 'Творчество' },
  { key: 'volunteer', label: 'Волонтёрство' },
];

interface ClubDetailProps {
  club: typeof clubs[0];
  onClose: () => void;
  onJoin: () => void;
  isJoined: boolean;
}

const ClubDetail: React.FC<ClubDetailProps> = ({ club, onClose, onJoin, isJoined }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--app-modal-backdrop)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 0 0 0',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          background: 'var(--app-card)',
          border: '1px solid var(--app-border)',
          borderRadius: '24px 24px 0 0',
          width: '100%',
          maxWidth: 600,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Banner image */}
        <div style={{ height: 200, overflow: 'hidden', position: 'relative', borderRadius: '24px 24px 0 0' }}>
          <img src={club.image} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--app-image-scrim)' }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--app-overlay-panel)', border: '1px solid var(--app-border)',
              color: 'var(--app-text)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* Name */}
          <h2 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 8 }}>{club.name}</h2>
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <Users size={14} style={{ color: club.color }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)' }}>{club.members} участников</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: '1rem' }}>
            {club.tags.map(tag => (
              <span
                key={tag}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 20,
                  background: club.bg,
                  border: `1px solid ${club.color}30`,
                  fontSize: '0.875rem',
                  color: club.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
            {club.fullDesc}
          </p>

          {/* Achievements */}
          <div
            style={{
              background: 'var(--app-bg-soft)',
              border: '1px solid var(--app-border)',
              borderRadius: 14,
              padding: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            <p style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', fontWeight: 600, marginBottom: '0.75rem' }}>ДОСТИЖЕНИЯ</p>
            {club.achievements.map((a, i) => (
              <p key={i} style={{ fontSize: '0.875rem', color: 'var(--app-text)', marginBottom: 4 }}>{a}</p>
            ))}
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-2" style={{ marginBottom: '1.5rem' }}>
            {[
              { icon: Mail, value: club.contacts.email },
              { icon: Phone, value: club.contacts.phone },
              { icon: Instagram, value: club.contacts.instagram },
            ].map(c => {
              const Icon = c.icon;
              return (
                <div
                  key={c.value}
                  className="flex items-center gap-3"
                  style={{
                    padding: '0.6rem 0.875rem',
                    background: 'var(--app-control)',
                    border: '1px solid var(--app-control-border)',
                    borderRadius: 10,
                  }}
                >
                  <Icon size={14} style={{ color: club.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)' }}>{c.value}</span>
                </div>
              );
            })}
          </div>

          {/* Join button */}
          <button
            onClick={onJoin}
            style={{
              width: '100%',
              background: isJoined ? 'rgba(127,184,160,0.15)' : `linear-gradient(135deg, ${club.color}, ${club.color}99)`,
              border: isJoined ? '1px solid rgba(127,184,160,0.4)' : 'none',
              borderRadius: 14,
              padding: '1rem',
              color: isJoined ? 'var(--brand-mint-strong)' : '#0F0F0F',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isJoined ? '✓ Вы уже в клубе' : t('joinClub')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ClubsPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedClub, setSelectedClub] = useState<typeof clubs[0] | null>(null);
  const [joinedIds, setJoinedIds] = useState<Set<number>>(new Set());
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

  const handleJoin = () => {
    if (selectedClub) {
      setJoinedIds(prev => {
        const next = new Set(prev);
        if (next.has(selectedClub.id)) next.delete(selectedClub.id);
        else next.add(selectedClub.id);
        return next;
      });
    }
  };

  return (
    <Layout title="Клубы и организации" showBack>
      <div className="max-w-4xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1.75rem', marginBottom: 8 }}>
            Студенческие клубы
          </h1>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
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
                padding: '1rem',
                textAlign: 'center',
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1rem',
          }}
        >
          {filteredClubs.map((club, idx) => {
            const isJoined = joinedIds.has(club.id);
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
                <div style={{ height: 150, overflow: 'hidden', position: 'relative' }}>
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

                  {isJoined && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        background: 'rgba(127,184,160,0.9)',
                        borderRadius: 20,
                        padding: '0.25rem 0.625rem',
                        fontSize: '0.875rem',
                        color: '#0F0F0F',
                        fontWeight: 700,
                      }}
                    >
                      ✓ В клубе
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.35, marginBottom: 6 }}>
                    {club.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)', lineHeight: 1.5, marginBottom: '0.875rem' }}>
                    {club.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '0.875rem' }}>
                    {club.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.2rem 0.6rem',
                          borderRadius: 20,
                          background: club.bg,
                          border: `1px solid ${club.color}25`,
                          fontSize: '0.875rem',
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
                      {isJoined ? 'Вы участник' : 'Подробнее'}
                    </span>
                    <ChevronRight size={14} style={{ color: 'var(--app-icon-muted)' }} />
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
            onJoin={handleJoin}
            isJoined={joinedIds.has(selectedClub.id)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};
