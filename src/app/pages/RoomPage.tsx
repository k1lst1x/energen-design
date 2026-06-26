import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2, Camera, CheckCircle2, ChevronRight, Clock, DoorOpen,
  Filter, Info, MapPin, Monitor, Navigation, Search, Users, Wifi
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

const amenityIcons: Record<string, React.ElementType> = {
  'Проектор': Monitor,
  'Wi-Fi': Wifi,
  '30 мест': Users,
  'Интерактивная доска': Monitor,
  'Зона ожидания': Users,
  'Приём по записи': Clock,
  'Приёмная': DoorOpen,
  'Электронная очередь': CheckCircle2,
  'Копировальная зона': Info,
  'Консультационная зона': Users,
  'QR-очередь': CheckCircle2,
  'Информационные буклеты': Info,
  'Платёжные терминалы': Monitor,
  'QR-коды': CheckCircle2,
  'Консультация': Info,
};

export const RoomPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<'Все' | RoomType>('Все');
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

  const selected = rooms.find(room => room.id === selectedId) ?? filteredRooms[0] ?? rooms[0];
  const currentPhoto = selected.photos[Math.min(activePhoto, selected.photos.length - 1)];

  const chooseRoom = (roomId: number) => {
    setSelectedId(roomId);
    setActivePhoto(0);
  };

  return (
    <Layout title="Найти аудиторию" showBack>
      <div className="page-content max-w-6xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 850, fontSize: '1.9rem', marginBottom: 8 }}>
            Найти аудиторию или отдел
          </h1>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.95rem', maxWidth: 760, lineHeight: 1.6 }}>
            Поиск по номеру кабинета, названию подразделения, корпусу или вопросу. В карточке есть фотографии маршрута, схема этажа и понятная инструкция от входа.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-5">
          <aside>
            <div
              className="flex items-center gap-2"
              style={{
                background: 'var(--app-card)',
                border: '1px solid var(--app-border)',
                borderRadius: 14,
                padding: '0.85rem 1rem',
                marginBottom: '0.85rem',
              }}
            >
              <Search size={18} style={{ color: 'var(--app-icon-muted)' }} />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Например: A315, деканат, оплата"
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
              <Filter size={16} style={{ color: 'var(--app-icon-muted)' }} />
              {typeFilters.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  style={{
                    border: '1px solid var(--app-control-border)',
                    background: activeType === type ? 'var(--brand-mint)' : 'var(--app-control)',
                    color: activeType === type ? '#0F0F0F' : 'var(--app-text-muted)',
                    borderRadius: 999,
                    padding: '0.45rem 0.75rem',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="directory-results flex flex-col gap-3">
              {filteredRooms.length ? filteredRooms.map(room => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => chooseRoom(room.id)}
                  className="text-left transition-all duration-200"
                  style={{
                    background: selected.id === room.id ? 'var(--app-surface-hover)' : 'var(--app-card)',
                    border: `1px solid ${selected.id === room.id ? room.color + '66' : 'var(--app-border)'}`,
                    borderRadius: 18,
                    padding: '1rem',
                    boxShadow: selected.id === room.id ? `0 16px 36px ${room.color}16` : 'none',
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div style={{ color: room.color, fontSize: '0.875rem', fontWeight: 850, marginBottom: 6 }}>
                        {room.number} · {room.floor}
                      </div>
                      <div style={{ color: 'var(--app-text-strong)', fontWeight: 850, fontSize: '1.05rem', lineHeight: 1.25 }}>
                        {room.title}
                      </div>
                      <div style={{ color: 'var(--app-text-muted)', marginTop: 8 }}>
                        {room.type} · {room.corpus}
                      </div>
                    </div>
                    <ChevronRight size={18} style={{ color: 'var(--app-icon-muted)', flexShrink: 0 }} />
                  </div>
                </button>
              )) : (
                <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)', borderRadius: 18, padding: '1rem', color: 'var(--app-text-muted)', lineHeight: 1.5 }}>
                  Ничего не найдено. Попробуйте номер кабинета, корпус или вопрос: "общежитие", "оплата", "деканат".
                </div>
              )}
            </div>
          </aside>

          <motion.section
            className="directory-detail"
            key={selected.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--app-card)',
              border: '1px solid var(--app-border)',
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: '0 18px 46px var(--app-shadow)',
            }}
          >
            <div className="detail-content" style={{ padding: '1.5rem' }}>
              <div className="flex items-start justify-between gap-4 flex-wrap" style={{ marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ color: selected.color, fontWeight: 900, fontSize: '0.95rem', marginBottom: 8 }}>
                    {selected.number} · {selected.type}
                  </div>
                  <h2 style={{ color: 'var(--app-text-strong)', fontWeight: 900, fontSize: '1.7rem', lineHeight: 1.12 }}>
                    {selected.title}
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap" style={{ marginTop: 12 }}>
                    {[selected.corpus, selected.floor, selected.status].map(item => (
                      <span
                        key={item}
                        style={{
                          background: `${selected.color}16`,
                          border: `1px solid ${selected.color}34`,
                          color: selected.color,
                          borderRadius: 999,
                          padding: '0.4rem 0.75rem',
                          fontWeight: 800,
                          fontSize: '0.875rem',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 18,
                    background: `${selected.color}16`,
                    border: `1px solid ${selected.color}36`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <DoorOpen size={28} style={{ color: selected.color }} />
                </div>
              </div>

              <p style={{ color: 'var(--app-text-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                {selected.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4" style={{ marginBottom: '1.25rem' }}>
                <div style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem' }}>
                  <div className="flex items-center gap-2" style={{ color: 'var(--app-text-strong)', fontWeight: 850, marginBottom: 12 }}>
                    <Users size={17} style={{ color: selected.color }} />
                    Ответственный
                  </div>
                  <div style={{ color: 'var(--app-text-strong)', fontWeight: 850 }}>{selected.responsible}</div>
                  <div style={{ color: 'var(--app-text-muted)', marginTop: 5 }}>{selected.position}</div>
                </div>

                <div style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem' }}>
                  <div className="flex items-center gap-2" style={{ color: 'var(--app-text-strong)', fontWeight: 850, marginBottom: 12 }}>
                    <Monitor size={17} style={{ color: selected.color }} />
                    Оснащение
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.amenities.map(item => {
                      const Icon = amenityIcons[item] ?? CheckCircle2;
                      return (
                        <span key={item} className="flex items-center gap-1" style={{ color: 'var(--app-text)', background: 'var(--app-card)', border: '1px solid var(--app-border)', borderRadius: 999, padding: '0.35rem 0.65rem', fontWeight: 700 }}>
                          <Icon size={14} style={{ color: selected.color }} />
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-4">
                <div style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 18, overflow: 'hidden' }}>
                  <div className="flex items-center justify-between gap-3" style={{ padding: '1rem', borderBottom: '1px solid var(--app-border)' }}>
                    <div className="flex items-center gap-2" style={{ color: 'var(--app-text-strong)', fontWeight: 850 }}>
                      <Camera size={17} style={{ color: selected.color }} />
                      Фотографии маршрута
                    </div>
                    <div style={{ color: 'var(--app-text-muted)', fontSize: '0.875rem' }}>{currentPhoto.label}</div>
                  </div>
                  <div style={{ height: 270, overflow: 'hidden' }}>
                    <motion.img
                      key={`${selected.id}-${activePhoto}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={currentPhoto.url}
                      alt={currentPhoto.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex gap-2" style={{ padding: '0.85rem', overflowX: 'auto' }}>
                    {selected.photos.map((photo, index) => (
                      <button
                        key={photo.label}
                        type="button"
                        onClick={() => setActivePhoto(index)}
                        style={{
                          border: `2px solid ${activePhoto === index ? selected.color : 'transparent'}`,
                          background: 'transparent',
                          borderRadius: 12,
                          padding: 0,
                          overflow: 'hidden',
                          minWidth: 88,
                          height: 62,
                          cursor: 'pointer',
                        }}
                        title={photo.label}
                      >
                        <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 18, padding: '1rem' }}>
                    <div className="flex items-center gap-2" style={{ color: 'var(--app-text-strong)', fontWeight: 850, marginBottom: 12 }}>
                      <Navigation size={17} style={{ color: selected.color }} />
                      Как пройти
                    </div>
                    <div className="flex flex-col gap-3">
                      {selected.route.map((step, index) => (
                        <div key={step} className="flex gap-3">
                          <div
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: '50%',
                              background: `${selected.color}18`,
                              border: `1px solid ${selected.color}36`,
                              color: selected.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 850,
                              flexShrink: 0,
                            }}
                          >
                            {index + 1}
                          </div>
                          <div style={{ color: 'var(--app-text)', lineHeight: 1.5 }}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'var(--room-map-bg)',
                      border: '1px solid var(--app-border)',
                      borderRadius: 18,
                      padding: '1rem',
                      minHeight: 190,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                          'linear-gradient(rgba(var(--brand-mint-rgb),0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--brand-mint-rgb),0.12) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                      }}
                    />
                    <div style={{ position: 'relative', zIndex: 1, color: 'var(--app-text-strong)', fontWeight: 850, marginBottom: 12 }}>
                      Схема этажа
                    </div>
                    <div style={{ position: 'relative', zIndex: 1, height: 118, border: '1px solid var(--app-border-strong)', borderRadius: 14 }}>
                      <div style={{ position: 'absolute', left: '12%', top: '18%', width: '28%', height: '28%', border: '1px solid var(--app-border)', borderRadius: 8 }} />
                      <div style={{ position: 'absolute', right: '12%', top: '18%', width: '28%', height: '28%', border: '1px solid var(--app-border)', borderRadius: 8 }} />
                      <div style={{ position: 'absolute', left: '12%', bottom: '18%', width: '28%', height: '28%', border: '1px solid var(--app-border)', borderRadius: 8 }} />
                      <div
                        style={{
                          position: 'absolute',
                          right: '12%',
                          bottom: '18%',
                          width: '28%',
                          height: '28%',
                          border: `2px solid ${selected.color}`,
                          background: `${selected.color}24`,
                          borderRadius: 8,
                          color: selected.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                        }}
                      >
                        {selected.number}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 18, padding: '1rem' }}>
                <div className="flex items-center gap-2" style={{ color: 'var(--app-text-strong)', fontWeight: 850, marginBottom: 12 }}>
                  <Info size={17} style={{ color: selected.color }} />
                  По каким вопросам обращаться
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selected.issues.map(issue => (
                    <div key={issue} className="flex items-start gap-2" style={{ color: 'var(--app-text)', lineHeight: 1.45 }}>
                      <CheckCircle2 size={16} style={{ color: selected.color, marginTop: 2, flexShrink: 0 }} />
                      {issue}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3" style={{ marginTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => navigate('/directions')}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))',
                    border: 'none',
                    borderRadius: 16,
                    padding: '1rem',
                    color: '#0F0F0F',
                    fontWeight: 850,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Navigation size={18} />
                  {t('showRoute')}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/chat')}
                  style={{
                    flex: 1,
                    background: 'var(--app-control)',
                    border: '1px solid var(--app-control-border)',
                    borderRadius: 16,
                    padding: '1rem',
                    color: 'var(--app-text)',
                    fontWeight: 850,
                    cursor: 'pointer',
                  }}
                >
                  Уточнить у Energen
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
};
