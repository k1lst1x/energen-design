import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2, Camera, CheckCircle2, ChevronRight, Clock, DoorOpen, Filter, Info,
  MapPin, MessageSquare, Navigation, Search
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

type RoomType = 'Учебная аудитория' | 'Отдел' | 'Деканат' | 'Сервис';

interface RoomEntry {
  id: number;
  number: string;
  title: string;
  type: RoomType;
  corpus: string;
  floor: string;
  status: 'Открыта сейчас' | 'По графику' | 'Закрыта';
  responsible: string;
  position: string;
  description: string;
  route: string[];
  issues: string[];
  amenities: string[];
  photos: { label: string; url: string }[];
  color: string;
}

const rooms: RoomEntry[] = [
  {
    id: 1,
    number: 'A-301',
    title: 'Кафедра информационных технологий',
    type: 'Учебная аудитория',
    corpus: 'Корпус A',
    floor: '3 этаж',
    status: 'Открыта сейчас',
    responsible: 'Нурланов Бауыржан Ерланович',
    position: 'Профессор кафедры ИТ',
    description: 'Аудитория для лекций, лабораторных работ и консультаций кафедры информационных технологий.',
    route: [
      'От главного входа пройдите прямо до центральной лестницы.',
      'Поднимитесь на 3 этаж и поверните направо к кафедре ИТ.',
      'Пройдите до конца коридора. Аудитория A-301 будет слева, рядом с табличкой кафедры.',
    ],
    issues: ['Лабораторные работы по программированию', 'Консультации по дисциплинам кафедры', 'Защита курсовых проектов', 'Вопросы по дипломным работам'],
    amenities: ['Проектор', 'Wi-Fi', '30 мест', 'Интерактивная доска'],
    photos: [
      { label: 'Дверь кабинета', url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Коридор', url: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Ориентир', url: 'https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
    ],
    color: '#7FB8A0',
  },
  {
    id: 2,
    number: 'A-315',
    title: 'Департамент цифровизации',
    type: 'Отдел',
    corpus: 'Корпус A',
    floor: '3 этаж',
    status: 'По графику',
    responsible: 'Абдрахманова Лаура Кайратовна',
    position: 'Директор департамента цифровизации',
    description: 'Кабинет для обращений по цифровым сервисам, доступам, интеграциям и работе университетских информационных систем.',
    route: [
      'От главного входа поднимитесь на 3 этаж.',
      'После лестницы поверните налево к указателю "ДИТ".',
      'Кабинет A-315 находится справа после зоны ожидания.',
    ],
    issues: ['Доступ к цифровым сервисам', 'Ошибки в информационных системах', 'Интеграции и заявки на автоматизацию', 'Консультации по Energen'],
    amenities: ['Зона ожидания', 'Wi-Fi', 'Приём по записи'],
    photos: [
      { label: 'Дверь кабинета', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Коридор', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Ориентир', url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
    ],
    color: '#7EC8E3',
  },
  {
    id: 3,
    number: 'B-205',
    title: 'Деканат факультета цифровых технологий',
    type: 'Деканат',
    corpus: 'Корпус B',
    floor: '2 этаж',
    status: 'Открыта сейчас',
    responsible: 'Сулейменов Арман Нурланович',
    position: 'Декан факультета',
    description: 'Деканат принимает обращения студентов по академическим справкам, переводам, восстановлению и индивидуальным учебным планам.',
    route: [
      'Войдите в корпус B и пройдите к правому крылу.',
      'Поднимитесь на 2 этаж по лестнице рядом с постом охраны.',
      'Деканат B-205 расположен напротив информационного стенда факультета.',
    ],
    issues: ['Академические справки', 'Перевод и восстановление', 'Индивидуальный учебный план', 'Дисциплинарные вопросы'],
    amenities: ['Приёмная', 'Электронная очередь', 'Копировальная зона'],
    photos: [
      { label: 'Дверь деканата', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Коридор', url: 'https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Ориентир', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
    ],
    color: '#9B7EC8',
  },
  {
    id: 4,
    number: 'A-105',
    title: 'Приёмная комиссия',
    type: 'Сервис',
    corpus: 'Главный корпус',
    floor: '1 этаж',
    status: 'Открыта сейчас',
    responsible: 'Касымова Мадина Сериковна',
    position: 'Ответственный секретарь',
    description: 'Точка консультации абитуриентов и родителей по поступлению, образовательным программам и документам.',
    route: [
      'От главного входа пройдите прямо до зоны ресепшена.',
      'Поверните направо к баннеру "Приёмная комиссия".',
      'Кабинет A-105 находится первым справа.',
    ],
    issues: ['Поступление и документы', 'Образовательные программы', 'Гранты и проходные баллы', 'Дни открытых дверей'],
    amenities: ['Консультационная зона', 'QR-очередь', 'Информационные буклеты'],
    photos: [
      { label: 'Вход', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Ориентир', url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Зона ожидания', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
    ],
    color: '#E8A87C',
  },
  {
    id: 5,
    number: 'C-112',
    title: 'Финансовый центр',
    type: 'Сервис',
    corpus: 'Корпус C',
    floor: '1 этаж',
    status: 'По графику',
    responsible: 'Ибраева Жанар Болатовна',
    position: 'Специалист финансового центра',
    description: 'Кабинет для консультаций по оплате обучения, общежития, задолженности и реквизитам платежей.',
    route: [
      'Войдите в корпус C со стороны Байтурсынова.',
      'Пройдите мимо терминалов оплаты и поверните налево.',
      'Финансовый центр C-112 расположен рядом с кассой.',
    ],
    issues: ['Оплата обучения', 'Общежитие', 'Реквизиты и QR-коды', 'Финансовая задолженность'],
    amenities: ['Платёжные терминалы', 'QR-коды', 'Консультация'],
    photos: [
      { label: 'Дверь кабинета', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Коридор', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
      { label: 'Ориентир', url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80' },
    ],
    color: '#F7DC6F',
  },
];

const typeFilters: Array<'Все' | RoomType> = ['Все', 'Учебная аудитория', 'Отдел', 'Деканат', 'Сервис'];

export const RoomPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<'Все' | RoomType>('Все');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(rooms[0].id);
  const [activePhoto, setActivePhoto] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredRooms = useMemo(() => {
    const normalized = query.trim().toLowerCase().replace(/\s+/g, '');
    return rooms.filter(room => {
      const searchable = [
        room.number,
        room.number.replace('-', ''),
        room.title,
        room.type,
        room.corpus,
        room.responsible,
        room.position,
        room.issues.join(' '),
      ].join(' ').toLowerCase().replace(/\s+/g, '');
      const matchesQuery = !normalized || searchable.includes(normalized);
      const matchesType = activeType === 'Все' || room.type === activeType;
      return matchesQuery && matchesType;
    });
  }, [activeType, query]);

  const selected = filteredRooms.find(room => room.id === selectedId) ?? filteredRooms[0] ?? rooms[0];
  const currentPhoto = selected.photos[Math.min(activePhoto, selected.photos.length - 1)];

  const chooseRoom = (roomId: number) => {
    setSelectedId(roomId);
    setActivePhoto(0);
  };

  return (
    <Layout title="Найти аудиторию" showBack>
      <div className="room-page page-content mx-auto px-4 sm:px-6" style={{ paddingTop: '1.15rem', paddingBottom: '3rem' }}>
        <div className="room-workspace grid lg:grid-cols-[330px_minmax(0,1fr)] gap-6">
          <aside className="room-search-sidebar">
            <motion.h1
              className="room-search-title"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Найти аудиторию
            </motion.h1>
            <div className="room-search-toolbar">
              <div className="room-search-field">
                <Search size={18} style={{ color: 'var(--app-icon-muted)' }} />
                <input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder="Кабинет, отдел или вопрос"
                  aria-label="Поиск аудитории"
                />
              </div>
              <button
                type="button"
                className="room-filter-trigger"
                data-active={activeType !== 'Все'}
                onClick={() => setFiltersOpen(current => !current)}
                aria-label="Фильтр результатов"
                aria-expanded={filtersOpen}
                title="Фильтр"
              >
                <Filter size={18} />
              </button>
              {filtersOpen && (
                <div className="room-filter-popover" aria-label="Фильтр по типу">
                  <span>Тип аудитории</span>
                  <div>
                    {typeFilters.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setActiveType(type);
                          setFiltersOpen(false);
                        }}
                        data-active={activeType === type}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="room-results-meta">
              <span>Результаты</span>
              <strong>{filteredRooms.length}</strong>
            </div>

            <div className="room-results directory-results">
              {filteredRooms.length ? filteredRooms.map(room => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => chooseRoom(room.id)}
                  className="room-result-card"
                  data-selected={selected.id === room.id}
                  style={{ '--room-accent': room.color } as React.CSSProperties}
                >
                  <div>
                    <div className="room-result-code">{room.number} · {room.floor}</div>
                    <div className="room-result-title">{room.title}</div>
                    <div className="room-result-meta">{room.type} · {room.corpus}</div>
                  </div>
                  <ChevronRight size={18} />
                </button>
              )) : (
                <div className="room-empty-state">
                  Ничего не найдено. Попробуйте номер кабинета, корпус или вопрос.
                </div>
              )}
            </div>
          </aside>

          <motion.section
            className="room-detail"
            key={selected.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <header className="room-detail-header">
              <div>
                <h2>{selected.title}</h2>
                <div className="room-detail-context">
                  <span className="room-detail-code" style={{ color: selected.color }}>
                    {selected.number}
                  </span>
                  <p>{selected.description}</p>
                </div>
                <div className="room-location-row">
                  <span><MapPin size={15} /> {selected.corpus}</span>
                  <span><Building2 size={15} /> {selected.floor}</span>
                  <span style={{ color: selected.color, borderColor: `${selected.color}45`, background: `${selected.color}12` }}>
                    <Clock size={15} /> {selected.status}
                  </span>
                </div>
              </div>
              <div className="room-detail-icon" style={{ color: selected.color, borderColor: `${selected.color}42`, background: `${selected.color}14` }}>
                <DoorOpen size={26} />
              </div>
            </header>

            <div className="room-route-grid">
              <section className="room-photo-panel">
                <div className="room-panel-heading">
                  <span><Camera size={17} style={{ color: selected.color }} /> Маршрут</span>
                  <span>{currentPhoto.label}</span>
                </div>
                <div className="room-route-image">
                  <motion.img
                    key={`${selected.id}-${activePhoto}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={currentPhoto.url}
                    alt={currentPhoto.label}
                  />
                </div>
                <div className="room-photo-thumbnails">
                  {selected.photos.map((photo, index) => (
                    <button
                      key={photo.label}
                      type="button"
                      onClick={() => setActivePhoto(index)}
                      aria-label={photo.label}
                      aria-pressed={activePhoto === index}
                      style={{ borderColor: activePhoto === index ? selected.color : 'transparent' }}
                    >
                      <img src={photo.url} alt="" />
                    </button>
                  ))}
                </div>
              </section>

              <section className="room-steps-panel">
                <div className="room-panel-heading">
                  <span><Navigation size={17} style={{ color: selected.color }} /> Как пройти</span>
                </div>
                <ol>
                  {selected.route.map((step, index) => (
                    <li key={step}>
                      <span style={{ color: selected.color, borderColor: `${selected.color}45`, background: `${selected.color}14` }}>{index + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <details className="room-extra-details">
              <summary><Info size={17} style={{ color: selected.color }} /> Схема этажа и вопросы для обращения <ChevronRight size={17} /></summary>
              <div className="room-extra-content">
                <div className="room-floor-map" style={{ '--room-accent': selected.color } as React.CSSProperties}>
                  <div className="room-floor-map-title">Схема {selected.floor}</div>
                  <div className="room-floor-map-grid">
                    <span />
                    <span />
                    <span />
                    <strong>{selected.number}</strong>
                  </div>
                </div>
                <div className="room-issues-list">
                  {selected.issues.map(issue => (
                    <div key={issue}><CheckCircle2 size={16} style={{ color: selected.color }} /> {issue}</div>
                  ))}
                </div>
              </div>
            </details>

            <div className="room-detail-actions">
              <button type="button" className="room-route-button" onClick={() => navigate('/directions')}>
                <Navigation size={18} /> {t('showRoute')}
              </button>
              <button type="button" className="room-chat-button" onClick={() => navigate('/chat')}>
                <MessageSquare size={18} /> Уточнить у Energen
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
};
