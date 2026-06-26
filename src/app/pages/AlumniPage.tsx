import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Award, BriefcaseBusiness, Calendar, GraduationCap, Search, Sparkles } from 'lucide-react';
import { Layout } from '../components/Layout';

const alumni = [
  {
    id: 1,
    name: 'Айдана Сапарова',
    role: 'Senior Software Engineer',
    company: 'Kaspi.kz',
    specialty: 'Информационные системы',
    program: '6B06102',
    year: 2021,
    field: 'IT',
    bio: 'Разрабатывает высоконагруженные клиентские сервисы и менторит студентов на хакатонах АУЭС.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    color: '#7FB8A0',
  },
  {
    id: 2,
    name: 'Ержан Муратов',
    role: 'Инженер по релейной защите',
    company: 'KEGOC',
    specialty: 'Электроэнергетика',
    program: '6B07101',
    year: 2019,
    field: 'Энергетика',
    bio: 'Участвует в проектах модернизации энергетической инфраструктуры и автоматизации подстанций.',
    photo: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    color: '#F7DC6F',
  },
  {
    id: 3,
    name: 'Динара Нурпеисова',
    role: 'Automation Lead',
    company: 'KAZ Minerals',
    specialty: 'Автоматизация и управление',
    program: '6B07104',
    year: 2020,
    field: 'Промышленность',
    bio: 'Ведёт внедрение SCADA и PLC-решений на производственных объектах.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    color: '#7EC8E3',
  },
  {
    id: 4,
    name: 'Арман Кенжебек',
    role: 'Network Architect',
    company: 'Kcell',
    specialty: 'Радиотехника и телекоммуникации',
    program: '6B06201',
    year: 2018,
    field: 'Телеком',
    bio: 'Проектирует транспортные сети и выступает приглашённым экспертом для студенческих проектов.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    color: '#9B7EC8',
  },
];

const fields = ['Все', 'IT', 'Энергетика', 'Промышленность', 'Телеком'];

export const AlumniPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeField, setActiveField] = useState('Все');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return alumni.filter(person => {
      const matchesField = activeField === 'Все' || person.field === activeField;
      const matchesQuery = !normalized || [
        person.name,
        person.role,
        person.company,
        person.specialty,
        person.program,
      ].join(' ').toLowerCase().includes(normalized);
      return matchesField && matchesQuery;
    });
  }, [activeField, query]);

  return (
    <Layout title="Выпускники" showBack>
      <div className="page-content max-w-6xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 850, fontSize: '1.9rem', marginBottom: 8 }}>
            Выпускники АУЭС
          </h1>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.95rem', maxWidth: 760, lineHeight: 1.6 }}>
            Страница показывает ФИО, должность, специальность, образовательную программу, год выпуска и краткую биографию выпускника.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-3" style={{ marginBottom: '1.25rem' }}>
          {[
            { label: 'Выпускников в базе', value: '1 240', icon: GraduationCap },
            { label: 'Компаний-партнёров', value: '180+', icon: BriefcaseBusiness },
            { label: 'Сфер занятости', value: '12', icon: Sparkles },
            { label: 'Историй успеха', value: '86', icon: Award },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem' }}>
                <Icon size={20} style={{ color: 'var(--brand-mint-strong)', marginBottom: 10 }} />
                <div style={{ color: 'var(--app-text-strong)', fontSize: '1.45rem', fontWeight: 850 }}>{stat.value}</div>
                <div style={{ color: 'var(--app-text-muted)', fontSize: '0.875rem' }}>{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between" style={{ marginBottom: '1.25rem' }}>
          <div
            className="flex items-center gap-2"
            style={{
              background: 'var(--app-card)',
              border: '1px solid var(--app-border)',
              borderRadius: 14,
              padding: '0.8rem 1rem',
              minWidth: 'min(100%, 380px)',
            }}
          >
            <Search size={18} style={{ color: 'var(--app-icon-muted)' }} />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="ФИО, компания, специальность"
              style={{ flex: 1, background: 'transparent', border: 0, outline: 'none', color: 'var(--app-text)', fontSize: '0.95rem' }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {fields.map(field => (
              <button
                key={field}
                type="button"
                onClick={() => setActiveField(field)}
                style={{
                  border: '1px solid var(--app-border)',
                  background: activeField === field ? 'var(--brand-mint)' : 'var(--app-card)',
                  color: activeField === field ? '#0F0F0F' : 'var(--app-text-muted)',
                  borderRadius: 999,
                  padding: '0.55rem 0.85rem',
                  fontWeight: 700,
                }}
              >
                {field}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((person, index) => (
            <motion.article
              key={person.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                background: 'var(--app-card)',
                border: '1px solid var(--app-border)',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 18px 42px var(--app-shadow)',
              }}
            >
              <div className="flex gap-4" style={{ padding: '1.25rem' }}>
                <img
                  src={person.photo}
                  alt={person.name}
                  style={{ width: 92, height: 92, borderRadius: 18, objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: person.color, fontWeight: 800, fontSize: '0.875rem', marginBottom: 6 }}>{person.program}</div>
                  <h2 style={{ color: 'var(--app-text-strong)', fontWeight: 850, fontSize: '1.2rem', lineHeight: 1.2 }}>
                    {person.name}
                  </h2>
                  <div style={{ color: 'var(--app-text)', fontWeight: 700, marginTop: 8 }}>{person.role}</div>
                  <div style={{ color: 'var(--app-text-muted)', marginTop: 3 }}>{person.company}</div>
                </div>
              </div>
              <div style={{ padding: '0 1.25rem 1.25rem' }}>
                <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 12 }}>
                  <span style={{ background: `${person.color}18`, color: person.color, border: `1px solid ${person.color}34`, borderRadius: 999, padding: '0.35rem 0.7rem', fontWeight: 700, fontSize: '0.875rem' }}>
                    {person.specialty}
                  </span>
                  <span className="flex items-center gap-1" style={{ color: 'var(--app-text-muted)', fontSize: '0.875rem' }}>
                    <Calendar size={15} /> {person.year}
                  </span>
                </div>
                <p style={{ color: 'var(--app-text-muted)', lineHeight: 1.6 }}>{person.bio}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
};
