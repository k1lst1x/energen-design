import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  BriefcaseBusiness, BookOpen, Building2, Camera, CheckCircle2, ChevronRight,
  DoorOpen, GraduationCap, Languages, MapPin, Navigation, Search,
  SlidersHorizontal, Trophy, Users
} from 'lucide-react';
import { Layout } from '../components/Layout';

const programPhoto1 = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80';
const programPhoto2 = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80';
const programPhoto3 = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80';
const energyPhoto = 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80';
const automationPhoto = 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80';
const telecomPhoto = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80';

const programs = [
  {
    id: 1,
    code: '6B06102',
    name: 'Информационные системы',
    faculty: 'Факультет цифровых технологий',
    level: 'Бакалавриат',
    unt: 'Математика + Информатика',
    languages: ['RU', 'KZ', 'EN'],
    grantScore: 93,
    ects: 240,
    duration: '4 года',
    description: 'Проектирование, разработка и сопровождение цифровых сервисов, баз данных и корпоративных информационных систем.',
    goal: 'Подготовить специалистов, которые умеют проектировать полезные цифровые продукты для бизнеса, образования и промышленности.',
    careers: ['Backend/Frontend разработчик', 'Системный аналитик', 'Data engineer', 'Product analyst'],
    contact: 'Приёмная комиссия, каб. А-105',
    institute: 'Институт цифровых технологий',
    department: 'Кафедра информационных технологий',
    consultationRoom: 'A-105',
    consultationLabel: 'Приёмная комиссия',
    location: 'Главный корпус, 1 этаж',
    gallery: [
      { label: 'Лаборатория', url: programPhoto1 },
      { label: 'Кафедра', url: programPhoto2 },
      { label: 'Консультация', url: programPhoto3 },
    ],
    color: '#7FB8A0',
  },
  {
    id: 2,
    code: '6B07101',
    name: 'Электроэнергетика',
    faculty: 'Факультет энергетики',
    level: 'Бакалавриат',
    unt: 'Математика + Физика',
    languages: ['RU', 'KZ'],
    grantScore: 88,
    ects: 240,
    duration: '4 года',
    description: 'Производство, передача, распределение и автоматизация электрической энергии на объектах энергетики.',
    goal: 'Подготовить инженеров для энергосистем, электростанций, сетевых компаний и промышленных предприятий.',
    careers: ['Инженер-энергетик', 'Проектировщик сетей', 'Диспетчер энергосистем', 'Специалист АСУ ТП'],
    contact: 'Кафедра электроэнергетики, каб. Б-318',
    institute: 'Институт энергетики',
    department: 'Кафедра электроэнергетики',
    consultationRoom: 'A-105',
    consultationLabel: 'Приёмная комиссия',
    location: 'Главный корпус, 1 этаж',
    gallery: [
      { label: 'Энергетика', url: energyPhoto },
      { label: 'Лаборатория', url: automationPhoto },
      { label: 'Приёмная', url: programPhoto3 },
    ],
    color: '#F7DC6F',
  },
  {
    id: 3,
    code: '6B07104',
    name: 'Автоматизация и управление',
    faculty: 'Факультет автоматики и телекоммуникаций',
    level: 'Бакалавриат',
    unt: 'Математика + Физика',
    languages: ['RU', 'KZ', 'EN'],
    grantScore: 91,
    ects: 240,
    duration: '4 года',
    description: 'Системы автоматического управления, робототехника, промышленные контроллеры и интеллектуальные датчики.',
    goal: 'Научить проектировать автоматизированные решения для энергетики, производства и городской инфраструктуры.',
    careers: ['Automation engineer', 'PLC developer', 'Robotics engineer', 'Инженер КИПиА'],
    contact: 'Кафедра автоматики, каб. А-411',
    institute: 'Институт автоматики и управления',
    department: 'Кафедра автоматизации',
    consultationRoom: 'A-105',
    consultationLabel: 'Приёмная комиссия',
    location: 'Главный корпус, 1 этаж',
    gallery: [
      { label: 'Автоматизация', url: automationPhoto },
      { label: 'Проекты', url: programPhoto1 },
      { label: 'Кафедра', url: programPhoto2 },
    ],
    color: '#7EC8E3',
  },
  {
    id: 4,
    code: '6B06201',
    name: 'Радиотехника, электроника и телекоммуникации',
    faculty: 'Факультет телекоммуникаций',
    level: 'Бакалавриат',
    unt: 'Математика + Физика',
    languages: ['RU', 'KZ'],
    grantScore: 86,
    ects: 240,
    duration: '4 года',
    description: 'Сети связи, радиосистемы, IoT-устройства, электроника и цифровая передача данных.',
    goal: 'Подготовить инженеров для телеком-операторов, сетевой инфраструктуры и электронных систем.',
    careers: ['Network engineer', 'RF engineer', 'IoT specialist', 'Инженер связи'],
    contact: 'Кафедра телекоммуникаций, каб. В-207',
    institute: 'Институт телекоммуникаций',
    department: 'Кафедра радиотехники и связи',
    consultationRoom: 'A-105',
    consultationLabel: 'Приёмная комиссия',
    location: 'Главный корпус, 1 этаж',
    gallery: [
      { label: 'Сети', url: telecomPhoto },
      { label: 'Лаборатория', url: programPhoto1 },
      { label: 'Приёмная', url: programPhoto3 },
    ],
    color: '#9B7EC8',
  },
];

const filters = ['Все', 'Математика + Информатика', 'Математика + Физика'];

export const ProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все');
  const [selectedId, setSelectedId] = useState(programs[0].id);
  const [activePhoto, setActivePhoto] = useState(0);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return programs.filter(program => {
      const matchesFilter = activeFilter === 'Все' || program.unt === activeFilter;
      const matchesQuery = !normalized || [
        program.name,
        program.code,
        program.faculty,
        program.description,
        program.careers.join(' '),
      ].join(' ').toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  const selected = programs.find(program => program.id === selectedId) ?? programs[0];
  const currentPhoto = selected.gallery[Math.min(activePhoto, selected.gallery.length - 1)];

  const chooseProgram = (programId: number) => {
    setSelectedId(programId);
    setActivePhoto(0);
  };

  return (
    <Layout title="Образовательные программы" showBack>
      <div className="programs-page page-content mx-auto px-4 sm:px-6" style={{ paddingTop: '1.15rem', paddingBottom: '3rem' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1.9rem', marginBottom: 8 }}>
            Специальности и образовательные программы
          </h1>
        </motion.div>

        <div className="programs-workspace grid lg:grid-cols-[340px_minmax(0,1fr)] gap-6">
          <div>
            <div
              className="flex items-center gap-2"
              style={{
                background: 'var(--app-card)',
                border: '1px solid var(--app-border)',
                borderRadius: 14,
                padding: '0.8rem 1rem',
                marginBottom: '0.85rem',
              }}
            >
              <Search size={18} style={{ color: 'var(--app-icon-muted)' }} />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Поиск по названию, коду или профессии"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  color: 'var(--app-text)',
                  fontSize: '0.95rem',
                }}
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: '1rem' }}>
              <SlidersHorizontal size={16} style={{ color: 'var(--app-icon-muted)' }} />
              {filters.map(filter => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    border: '1px solid var(--app-border)',
                    background: activeFilter === filter ? 'var(--brand-mint)' : 'var(--app-card)',
                    color: activeFilter === filter ? '#0F0F0F' : 'var(--app-text-muted)',
                    borderRadius: 999,
                    padding: '0.45rem 0.8rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="directory-results flex flex-col gap-3">
              {filtered.map(program => (
                <button
                  key={program.id}
                  type="button"
                  onClick={() => chooseProgram(program.id)}
                  className="text-left transition-all duration-200"
                  style={{
                    background: selected.id === program.id ? 'var(--app-surface-hover)' : 'var(--app-card)',
                    border: `1px solid ${selected.id === program.id ? program.color + '66' : 'var(--app-border)'}`,
                    borderRadius: 16,
                    padding: '1rem',
                    boxShadow: selected.id === program.id ? `0 14px 34px ${program.color}18` : 'none',
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div style={{ color: program.color, fontSize: '0.875rem', fontWeight: 700, marginBottom: 6 }}>
                        {program.code}
                      </div>
                      <div style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1rem', lineHeight: 1.35 }}>
                        {program.name}
                      </div>
                    </div>
                    <ChevronRight size={18} style={{ color: 'var(--app-icon-muted)', flexShrink: 0 }} />
                  </div>
                  <div style={{ color: 'var(--app-text-muted)', fontSize: '0.9rem', marginTop: 8 }}>
                    {program.unt}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <motion.section
            className="program-detail directory-detail detail-content"
            key={selected.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'var(--app-card)',
              border: '1px solid var(--app-border)',
              borderRadius: 18,
              padding: '1.35rem',
              boxShadow: '0 18px 46px var(--app-shadow)',
            }}
          >
            <div className="program-gallery-card" style={{ borderColor: `${selected.color}32` }}>
              <div className="program-gallery-image">
                <img src={currentPhoto.url} alt={selected.name} />
                <div className="program-gallery-overlay" />
                <div className="program-photo-label">
                  <Camera size={16} />
                  {currentPhoto.label}
                </div>
              </div>
              <div className="program-thumbs">
                {selected.gallery.map((photo, index) => (
                  <button
                    key={photo.url}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    className="program-thumb"
                    style={{
                      borderColor: index === activePhoto ? selected.color : 'var(--app-border)',
                      opacity: index === activePhoto ? 1 : 0.68,
                    }}
                  >
                    <img src={photo.url} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start justify-between gap-4 flex-wrap" style={{ marginBottom: '1.25rem' }}>
              <div>
                <div style={{ color: selected.color, fontWeight: 800, marginBottom: 8 }}>{selected.code}</div>
                <h2 style={{ color: 'var(--app-text-strong)', fontSize: '1.65rem', fontWeight: 850, lineHeight: 1.15 }}>
                  {selected.name}
                </h2>
                <p style={{ color: 'var(--app-text-muted)', marginTop: 8 }}>{selected.faculty}</p>
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `${selected.color}18`,
                  border: `1px solid ${selected.color}36`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GraduationCap size={26} style={{ color: selected.color }} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3" style={{ marginBottom: '1.5rem' }}>
              {[
                { icon: BookOpen, label: 'Тип', value: selected.level },
                { icon: Trophy, label: 'Грант', value: `${selected.grantScore}+` },
                { icon: Languages, label: 'Языки', value: selected.languages.join(' / ') },
                { icon: CheckCircle2, label: 'ECTS', value: `${selected.ects} кредитов` },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 14, padding: '1rem' }}>
                    <Icon size={18} style={{ color: selected.color, marginBottom: 10 }} />
                    <div style={{ color: 'var(--app-text-soft)', fontSize: '0.875rem', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ color: 'var(--app-text-strong)', fontWeight: 800 }}>{item.value}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 800, marginBottom: 8 }}>Описание и цель</h3>
                <p style={{ color: 'var(--app-text-muted)', lineHeight: 1.65, marginBottom: 12 }}>{selected.description}</p>
                <p style={{ color: 'var(--app-text)', lineHeight: 1.65 }}>{selected.goal}</p>
              </div>
              <div>
                <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 800, marginBottom: 8 }}>Кем может стать</h3>
                <div className="flex flex-col gap-2">
                  {selected.careers.map(career => (
                    <div key={career} className="flex items-center gap-2" style={{ color: 'var(--app-text)' }}>
                      <BriefcaseBusiness size={16} style={{ color: selected.color }} />
                      {career}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="program-location-grid">
              <div className="program-location-card" style={{ borderColor: `${selected.color}32` }}>
                <Building2 size={19} style={{ color: selected.color }} />
                <span>Институт</span>
                <strong>{selected.institute}</strong>
                <p>{selected.department}</p>
              </div>
              <div className="program-location-card" style={{ borderColor: `${selected.color}32` }}>
                <MapPin size={19} style={{ color: selected.color }} />
                <span>Где спросить</span>
                <strong>{selected.consultationLabel}, каб. {selected.consultationRoom}</strong>
                <p>{selected.location}</p>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/room?room=${selected.consultationRoom}`)}
                className="program-room-link"
                style={{
                  borderColor: `${selected.color}45`,
                  color: selected.color,
                }}
              >
                <DoorOpen size={19} />
                Открыть кабинет на странице аудиторий
                <Navigation size={17} />
              </button>
            </div>

            <div
              className="flex items-center justify-between gap-4 flex-wrap"
              style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--app-border)' }}
            >
              <div style={{ color: 'var(--app-text-muted)' }}>
                Контакт: <span style={{ color: 'var(--app-text-strong)', fontWeight: 700 }}>{selected.contact}</span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/alumni')}
                className="flex items-center gap-2 transition-all duration-200"
                style={{
                  background: 'var(--app-control)',
                  border: '1px solid var(--app-control-border)',
                  color: 'var(--brand-mint-strong)',
                  borderRadius: 999,
                  padding: '0.8rem 1rem',
                  fontWeight: 800,
                }}
              >
                <Users size={17} />
                Выпускники программ
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
};
