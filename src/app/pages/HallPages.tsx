import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import {
  ArrowLeft, BookOpen, BriefcaseBusiness, Building2, CalendarCheck,
  CalendarDays, CheckCircle2, ChevronRight, Clock, CreditCard, DoorOpen,
  GraduationCap, Home, Languages, MapPin, Moon, Navigation, Phone, ShieldCheck, Sparkles,
  Sun, Trophy, Users, Mic, MessageSquare,
} from 'lucide-react';
import logoMint from '../../assets/energo-logo-mint.png';
import { HeroRobotModel } from '../components/HeroRobotModel';
import { useLanguage } from '../context/LanguageContext';
import { useThemeMode } from '../context/ThemeContext';
import { rooms, RoomEntry, RoomType, typeFilters } from './RoomPage';
import {
  categories, categoryIcons, presenceColors, staff, StaffCategory, StaffMember,
} from './EmployeePage';
import { leaders } from './AdministrationPage';
import {
  clubs, dateFilters, directions, events, filterTypes, getClubsForEvent, getNearestEventForClub,
} from '../data/campusData';
import { filters as programFilters, programs } from './ProgramsPage';
import { paymentCategories, QRPlaceholder } from './PaymentPage';
import { contacts, hours, transportOptions } from './DirectionsPage';

type HallBuilding = 'A' | 'B' | 'D';

const hallBuildings: HallBuilding[] = ['A', 'B', 'D'];

const hallActions = [
  { key: 'room', label: 'Найти аудиторию', desc: 'Корпус, этаж, кабинет', path: '/hall/room', icon: DoorOpen, color: '#7FB8A0' },
  { key: 'employee', label: 'Сотрудники', desc: 'Алфавит и категории', path: '/hall/employee', icon: Users, color: '#9B7EC8' },
  { key: 'administration', label: 'АУП', desc: 'Руководство и контакты', path: '/hall/administration', icon: Building2, color: '#E8A87C' },
  { key: 'events', label: 'Мероприятия', desc: 'Даты, типы, места', path: '/hall/events', icon: CalendarDays, color: '#7EC8E3' },
  { key: 'clubs', label: 'Клубы', desc: 'Направления и события', path: '/hall/clubs', icon: Trophy, color: '#E87C9B' },
  { key: 'programs', label: 'Программы', desc: 'ОП, гранты, кабинеты', path: '/hall/programs', icon: GraduationCap, color: '#A8D8A8' },
  { key: 'payments', label: 'Оплата', desc: 'QR и реквизиты', path: '/hall/payments', icon: CreditCard, color: '#F7DC6F' },
  { key: 'directions', label: 'Как добраться', desc: 'Транспорт и маршрут', path: '/hall/directions', icon: MapPin, color: '#7FB8A0' },
];

const getHallBuilding = (value: string): HallBuilding => {
  const normalized = value.toUpperCase();
  if (normalized.includes('B') || normalized.includes('КОРПУС B')) return 'B';
  if (normalized.includes('D') || normalized.includes('C') || normalized.includes('КОРПУС D') || normalized.includes('КОРПУС C')) return 'D';
  return 'A';
};

const getRoomBuilding = (room: Pick<RoomEntry, 'number' | 'corpus'>) =>
  getHallBuilding(`${room.number} ${room.corpus}`);

const displayHallRoomCode = (roomCode: string) =>
  roomCode.replace(/^C-/i, 'D-');

const displayRoomNumber = (room: Pick<RoomEntry, 'number'>) =>
  displayHallRoomCode(room.number);

const displayHallCampusText = (text: string) =>
  text
    .replace(/\bC-/g, 'D-')
    .replace(/\bC\b/g, 'D')
    .replace(/Корпус C/g, 'Корпус D')
    .replace(/корпус C/g, 'корпус D');

const displayCorpus = (building: HallBuilding) => `Корпус ${building}`;

const routeToRoom = (roomCode: string) =>
  `/hall/room?room=${encodeURIComponent(displayHallRoomCode(roomCode))}`;

const paymentFieldLabels: Record<string, string> = {
  bank: 'Банк',
  bik: 'БИК',
  iin: 'ИИН/БИН',
  kbe: 'КБЕ',
  account: 'IBAN/Счет',
  purpose: 'Назначение',
  amount: 'Сумма',
};

const HallLayout: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/hall';
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useThemeMode();
  const langs: Array<'RU' | 'KZ' | 'EN'> = ['RU', 'KZ', 'EN'];

  return (
    <div className="hall-shell">
      <header className="hall-header">
        <button type="button" className="hall-logo-button" onClick={() => navigate('/hall')} aria-label="Hall home">
          <img src={logoMint} alt="Energo University" />
        </button>
        <div className="hall-header-title">
          <strong>{title ?? 'Energen'}</strong>
        </div>
        <nav className="hall-header-actions" aria-label="Hall navigation">
          {!isHome && (
            <button type="button" onClick={() => navigate(-1)} aria-label="Назад">
              <ArrowLeft size={26} />
              Назад
            </button>
          )}
          <button type="button" onClick={() => navigate('/hall')} data-active={isHome} aria-label="Главная">
            <Home size={25} />
            Главная
          </button>
          <button type="button" className="hall-icon-control" onClick={toggleTheme} aria-label="Переключить тему">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="hall-language-switcher" aria-label="Выбор языка">
            {langs.map(item => (
              <button key={item} type="button" data-active={lang === item} onClick={() => setLang(item)}>
                {item}
              </button>
            ))}
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

const HallSegment = <T extends string>({
  items,
  active,
  onChange,
  getLabel = item => item,
}: {
  items: T[];
  active: T;
  onChange: (item: T) => void;
  getLabel?: (item: T) => string;
}) => (
  <div className="hall-segment">
    {items.map(item => (
      <button key={item} type="button" data-active={active === item} onClick={() => onChange(item)}>
        {getLabel(item)}
      </button>
    ))}
  </div>
);

export const HallHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <HallLayout title="Интерактивная панель">
      <div
        className="home-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          paddingTop: 'var(--home-container-padding-y)',
          paddingBottom: 'var(--home-container-padding-y)',
        }}
      >
        <div className="home-hero-stage">
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
            <div className="home-robot-shell">
              <HeroRobotModel />
            </div>

            <div className="home-hero-copy">
              <div>
                <h1
                  className="home-title"
                  style={{
                    fontSize: 'clamp(1.45rem, 2.7vw, 2.35rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: 0,
                    margin: '0 auto 1rem',
                    maxWidth: 'min(760px, calc(100vw - 3rem))',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    background: 'var(--app-hero-title)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t('title')}
                </h1>

                <div className="home-mode-actions flex w-full flex-col sm:flex-row gap-4 items-center justify-center">
                  <button
                    onClick={() => navigate('/voice')}
                    className="home-mode-button group flex items-center gap-3"
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
                  >
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--app-cta-icon-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mic size={18} />
                    </div>
                    {t('voiceMode')}
                  </button>

                  <button
                    onClick={() => navigate('/chat')}
                    className="home-mode-button group flex items-center gap-3"
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
                  >
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--app-cta-icon-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare size={18} />
                    </div>
                    {t('textChat')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="home-floating-actions" aria-label="Быстрые действия">
            <p className="quick-actions-label" style={{ display: 'none' }}>Быстрые действия</p>
            <div className="quick-actions-grid">
              {hallActions.map((card, index) => {
                const Icon = card.icon;
                const cls = `hero-action-card hero-action-card-${(index % 8) + 1}`;
                return (
                  <button
                    key={card.key}
                    onClick={() => navigate(card.path)}
                    className={`${cls} hero-action-card--hall`}
                    style={{
                      background: 'var(--app-card)',
                      border: '1px solid var(--app-border)',
                      borderRadius: 16,
                      padding: 'var(--home-card-padding)',
                      cursor: 'pointer',
                      position: 'absolute',
                    }}
                  >
                    <div className="hero-action-card-icon" style={{ width: 'var(--home-card-icon-size)', height: 'var(--home-card-icon-size)', borderRadius: 12, background: card.bg ?? 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--home-card-icon-gap)', border: `1px solid ${card.color}30` }}>
                      <Icon size={22} style={{ color: card.color }} />
                    </div>
                    <div className="hero-action-card-copy">
                      <div className="hero-action-card-title" style={{ fontSize: 'var(--home-card-title-size)', fontWeight: 700 }}>{card.label}</div>
                      <div className="hero-action-card-description" style={{ fontSize: 'var(--home-card-desc-size)', color: 'var(--app-text-muted)' }}>{card.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </HallLayout>
  );
};

export const HallRoomPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roomFromUrl = searchParams.get('room')?.toUpperCase().replace(/\s+/g, '') ?? '';
  const initialRoom = rooms.find(room => {
    const visible = displayRoomNumber(room).toUpperCase().replace(/\s+/g, '');
    const raw = room.number.toUpperCase().replace(/\s+/g, '');
    return visible === roomFromUrl || raw === roomFromUrl || visible.replace('-', '') === roomFromUrl.replace('-', '');
  }) ?? rooms[0];
  const [building, setBuilding] = useState<HallBuilding>(getRoomBuilding(initialRoom));
  const [activeType, setActiveType] = useState<'Все' | RoomType>('Все');
  const [activeFloor, setActiveFloor] = useState('Все');
  const [selectedId, setSelectedId] = useState(initialRoom.id);
  const [activePhoto, setActivePhoto] = useState(0);

  const buildingRooms = useMemo(() => rooms.filter(room => getRoomBuilding(room) === building), [building]);
  const floors = useMemo(() => ['Все', ...Array.from(new Set(buildingRooms.map(room => room.floor)))], [buildingRooms]);
  const filteredRooms = useMemo(() => buildingRooms.filter(room => {
    const matchesType = activeType === 'Все' || room.type === activeType;
    const matchesFloor = activeFloor === 'Все' || room.floor === activeFloor;
    return matchesType && matchesFloor;
  }), [activeFloor, activeType, buildingRooms]);

  const selected = filteredRooms.find(room => room.id === selectedId) ?? filteredRooms[0] ?? buildingRooms[0] ?? rooms[0];
  const currentPhoto = selected.photos[Math.min(activePhoto, selected.photos.length - 1)];

  const chooseRoom = (room: RoomEntry) => {
    setSelectedId(room.id);
    setActivePhoto(0);
  };

  return (
    <HallLayout title="Аудитории">
      <main className="hall-page hall-room-page">
        <section className="hall-filter-panel">
          <div>
            <span className="hall-kicker">Корпус</span>
            <HallSegment items={hallBuildings} active={building} onChange={item => {
              setBuilding(item);
              setActiveFloor('Все');
            }} getLabel={item => displayCorpus(item)} />
          </div>
          <div>
            <span className="hall-kicker">Тип помещения</span>
            <HallSegment items={typeFilters} active={activeType} onChange={setActiveType} />
          </div>
          <div>
            <span className="hall-kicker">Этаж</span>
            <HallSegment items={floors} active={activeFloor} onChange={setActiveFloor} />
          </div>
        </section>

        <section className="hall-directory-layout">
          <aside className="hall-list">
            <div className="hall-list-head">
              <strong>{filteredRooms.length}</strong>
              <span>кабинетов</span>
            </div>
            {filteredRooms.map(room => (
              <button
                key={room.id}
                type="button"
                className="hall-list-item"
                data-active={selected.id === room.id}
                onClick={() => chooseRoom(room)}
                style={{ '--hall-accent': room.color } as React.CSSProperties}
              >
                <b>{displayRoomNumber(room)}</b>
                <span>{room.title}</span>
                <small>{displayCorpus(getRoomBuilding(room))} · {room.floor}</small>
              </button>
            ))}
          </aside>

          <article className="hall-detail-card" style={{ '--hall-accent': selected.color } as React.CSSProperties}>
            <header>
              <div>
                <span className="hall-detail-code">{displayRoomNumber(selected)}</span>
                <h1>{selected.title}</h1>
                <p>{selected.description}</p>
              </div>
              <div className="hall-detail-icon"><DoorOpen size={42} /></div>
            </header>

            <div className="hall-room-grid">
              <div className="hall-photo-block">
                <img src={currentPhoto.url} alt={currentPhoto.label} />
                <div className="hall-photo-tabs">
                  {selected.photos.map((photo, index) => (
                    <button key={photo.label} type="button" data-active={activePhoto === index} onClick={() => setActivePhoto(index)}>
                      {photo.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hall-info-stack">
                <div className="hall-facts-grid">
                  <section><MapPin size={24} /><span>{displayCorpus(getRoomBuilding(selected))}</span></section>
                  <section><Building2 size={24} /><span>{selected.floor}</span></section>
                  <section><Clock size={24} /><span>{selected.status}</span></section>
                </div>
                <div className="hall-steps">
                  <h2>Как пройти</h2>
                  {selected.route.map((step, index) => (
                    <div key={step}>
                      <b>{index + 1}</b>
                      <span>{displayHallCampusText(step)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hall-chip-cloud">
              {selected.issues.concat(selected.amenities).map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </section>
      </main>
    </HallLayout>
  );
};

export const HallEmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'Все' | StaffCategory>('Все');
  const alphabet = useMemo(() => ['Все', ...Array.from(new Set(staff.map(member => member.name[0]))).sort()], []);
  const [activeLetter, setActiveLetter] = useState('Все');
  const [activeBuilding, setActiveBuilding] = useState<'Все' | HallBuilding>('Все');
  const [selectedId, setSelectedId] = useState(staff[0].id);

  const filteredStaff = useMemo(() => staff
    .filter(member => activeCategory === 'Все' || member.category === activeCategory)
    .filter(member => activeLetter === 'Все' || member.name.startsWith(activeLetter))
    .filter(member => activeBuilding === 'Все' || getHallBuilding(`${member.room} ${member.corpus}`) === activeBuilding)
    .sort((a, b) => a.name.localeCompare(b.name, 'ru')), [activeBuilding, activeCategory, activeLetter]);

  const selected = filteredStaff.find(member => member.id === selectedId) ?? filteredStaff[0] ?? staff[0];
  const CategoryIcon = categoryIcons[selected.category];
  const presenceColor = presenceColors[selected.presence] ?? selected.color;

  return (
    <HallLayout title="Сотрудники">
      <main className="hall-page">
        <section className="hall-filter-panel">
          <div>
            <span className="hall-kicker">Категория</span>
            <HallSegment items={categories} active={activeCategory} onChange={setActiveCategory} />
          </div>
          <div>
            <span className="hall-kicker">Алфавит</span>
            <HallSegment items={alphabet} active={activeLetter} onChange={setActiveLetter} />
          </div>
          <div>
            <span className="hall-kicker">Корпус</span>
            <HallSegment items={['Все', ...hallBuildings]} active={activeBuilding} onChange={setActiveBuilding} getLabel={item => item === 'Все' ? item : displayCorpus(item)} />
          </div>
        </section>

        <section className="hall-directory-layout">
          <aside className="hall-list hall-employee-list">
            <div className="hall-list-head"><strong>{filteredStaff.length}</strong><span>сотрудников</span></div>
            {filteredStaff.map(member => {
              const Icon = categoryIcons[member.category];
              return (
                <button
                  key={member.id}
                  type="button"
                  className="hall-list-item hall-person-item"
                  data-active={selected.id === member.id}
                  onClick={() => setSelectedId(member.id)}
                  style={{ '--hall-accent': member.color } as React.CSSProperties}
                >
                  <img src={member.photo} alt="" />
                  <span>
                    <b>{member.name}</b>
                    <small><Icon size={15} /> {member.category} · {displayHallRoomCode(member.room)}</small>
                  </span>
                </button>
              );
            })}
          </aside>

          <article className="hall-detail-card hall-person-detail" style={{ '--hall-accent': selected.color } as React.CSSProperties}>
            <header>
              <img src={selected.photo} alt={selected.name} />
              <div>
                <span className="hall-detail-code"><CategoryIcon size={20} /> {selected.category}</span>
                <h1>{selected.name}</h1>
                <p>{selected.role}</p>
              </div>
            </header>

            <div className="hall-facts-grid hall-person-facts">
              <section><MapPin size={24} /><span>{displayHallRoomCode(selected.room)}, {selected.floor}, {displayCorpus(getHallBuilding(`${selected.room} ${selected.corpus}`))}</span></section>
              <section><Clock size={24} /><span>{selected.hours}</span></section>
              <section style={{ color: presenceColor }}><ShieldCheck size={24} /><span>{selected.presence}</span></section>
            </div>

            <div className="hall-two-columns">
              <section>
                <h2>Вопросы</h2>
                <div className="hall-chip-cloud">
                  {selected.questions.map(question => <span key={question}>{question}</span>)}
                </div>
              </section>
              <section>
                <h2>Ближайшие часы</h2>
                <div className="hall-slot-grid">
                  {selected.schedule.map(slot => (
                    <span key={`${slot.day}-${slot.time}`} data-free={slot.status === 'Свободно'}>
                      {slot.day}<b>{slot.time}</b>
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="hall-action-row">
              <button type="button" onClick={() => navigate(routeToRoom(selected.room))}>
                <Navigation size={24} />
                Показать кабинет
              </button>
            </div>
          </article>
        </section>
      </main>
    </HallLayout>
  );
};

export const HallAdministrationPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState(leaders[0].id);
  const selected = leaders.find(leader => leader.id === selectedId) ?? leaders[0];

  return (
    <HallLayout title="АУП">
      <main className="hall-page">
        <section className="hall-directory-layout">
          <aside className="hall-list">
            <div className="hall-list-head"><strong>{leaders.length}</strong><span>руководителя</span></div>
            {leaders.map(leader => (
              <button
                key={leader.id}
                type="button"
                className="hall-list-item"
                data-active={selected.id === leader.id}
                onClick={() => setSelectedId(leader.id)}
                style={{ '--hall-accent': leader.color } as React.CSSProperties}
              >
                <b>{leader.department}</b>
                <span>{leader.name}</span>
                <small>{leader.role}</small>
              </button>
            ))}
          </aside>

          <article className="hall-detail-card" style={{ '--hall-accent': selected.color } as React.CSSProperties}>
            <header>
              <div>
                <span className="hall-detail-code">{selected.department}</span>
                <h1>{selected.role}</h1>
                <p>{selected.name}</p>
              </div>
              <img src={selected.photo} alt={selected.name} style={{ width: 132, height: 132, borderRadius: '1.2rem', objectFit: 'cover', border: '1px solid color-mix(in srgb, var(--hall-accent) 30%, transparent)' }} />
            </header>
            <div className="hall-facts-grid">
              <section><MapPin size={24} /><span>{selected.room}</span></section>
              <section><Phone size={24} /><span>{selected.email}</span></section>
              <section><Building2 size={24} /><span>{selected.department}</span></section>
            </div>
            <div className="hall-two-columns">
              <section>
                <h2>Биография</h2>
                <p style={{ margin: 0, color: 'var(--app-text-muted)', lineHeight: 1.7 }}>{selected.biography}</p>
              </section>
              <section>
                <h2>Ключевые направления</h2>
                <div className="hall-chip-cloud">
                  {selected.questions.map(question => <span key={question}>{question}</span>)}
                </div>
              </section>
            </div>
          </article>
        </section>
      </main>
    </HallLayout>
  );
};

export const HallEventsPage: React.FC = () => {
  const [activeDate, setActiveDate] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [selectedId, setSelectedId] = useState(events[0].id);

  const filteredEvents = useMemo(() => events.filter(event => {
    const matchesDate = activeDate === 'all' || event.period === activeDate;
    const matchesType = activeType === 'all' || event.type === activeType;
    return matchesDate && matchesType;
  }), [activeDate, activeType]);

  const selected = filteredEvents.find(event => event.id === selectedId) ?? filteredEvents[0] ?? events[0];
  const clubsForSelected = getClubsForEvent(selected);

  return (
    <HallLayout title="Мероприятия">
      <main className="hall-page">
        <section className="hall-filter-panel">
          <div><span className="hall-kicker">Дата</span><HallSegment items={dateFilters.map(item => item.key)} active={activeDate} onChange={setActiveDate} getLabel={key => dateFilters.find(item => item.key === key)?.label ?? key} /></div>
          <div><span className="hall-kicker">Тип</span><HallSegment items={filterTypes.map(item => item.key)} active={activeType} onChange={setActiveType} getLabel={key => filterTypes.find(item => item.key === key)?.label ?? key} /></div>
        </section>

        <section className="hall-directory-layout">
          <aside className="hall-list">
            <div className="hall-list-head"><strong>{filteredEvents.length}</strong><span>мероприятий</span></div>
            {filteredEvents.map(event => (
              <button key={event.id} type="button" className="hall-list-item" data-active={selected.id === event.id} onClick={() => setSelectedId(event.id)} style={{ '--hall-accent': event.color } as React.CSSProperties}>
                <b>{event.dateShort.day} {event.dateShort.month}</b>
                <span>{event.title}</span>
                <small>{event.typeLabel} · {event.location}</small>
              </button>
            ))}
          </aside>
          <article className="hall-detail-card hall-media-detail" style={{ '--hall-accent': selected.color } as React.CSSProperties}>
            <img src={selected.image} alt={selected.title} />
            <div>
              <span className="hall-detail-code">{selected.date} · {selected.typeLabel}</span>
              <h1>{selected.title}</h1>
              <p>{selected.description}</p>
              <div className="hall-facts-grid">
                <section><MapPin size={24} /><span>{selected.location}</span></section>
                <section><Users size={24} /><span>{selected.registered} / {selected.capacity} мест</span></section>
                <section><Sparkles size={24} /><span>{Math.round((selected.registered / selected.capacity) * 100)}% заполнено</span></section>
              </div>
              <div className="hall-chip-cloud">
                {clubsForSelected.map(club => club && <span key={club.id}>{club.name}</span>)}
              </div>
            </div>
          </article>
        </section>
      </main>
    </HallLayout>
  );
};

export const HallClubsPage: React.FC = () => {
  const [activeDirection, setActiveDirection] = useState('all');
  const [selectedId, setSelectedId] = useState(clubs[0].id);
  const [activePhoto, setActivePhoto] = useState(0);

  const filteredClubs = useMemo(() => clubs.filter(club => activeDirection === 'all' || club.direction === activeDirection), [activeDirection]);
  const selected = filteredClubs.find(club => club.id === selectedId) ?? filteredClubs[0] ?? clubs[0];
  const gallery = selected.gallery.length ? selected.gallery : [selected.image];
  const nearestEvent = getNearestEventForClub(selected.id);

  return (
    <HallLayout title="Клубы">
      <main className="hall-page">
        <section className="hall-filter-panel">
          <div><span className="hall-kicker">Направление</span><HallSegment items={directions.map(item => item.key)} active={activeDirection} onChange={setActiveDirection} getLabel={key => directions.find(item => item.key === key)?.label ?? key} /></div>
        </section>
        <section className="hall-directory-layout">
          <aside className="hall-list">
            <div className="hall-list-head"><strong>{filteredClubs.length}</strong><span>клуба</span></div>
            {filteredClubs.map(club => (
              <button key={club.id} type="button" className="hall-list-item" data-active={selected.id === club.id} onClick={() => { setSelectedId(club.id); setActivePhoto(0); }} style={{ '--hall-accent': club.color } as React.CSSProperties}>
                <b>{club.members} участников</b>
                <span>{club.name}</span>
                <small>{club.tags.slice(0, 2).join(' · ')}</small>
              </button>
            ))}
          </aside>
          <article className="hall-detail-card hall-media-detail" style={{ '--hall-accent': selected.color } as React.CSSProperties}>
            <div className="hall-photo-block">
              <img src={gallery[activePhoto % gallery.length]} alt={selected.name} />
              <div className="hall-photo-tabs">
                {gallery.map((photo, index) => (
                  <button key={photo} type="button" data-active={activePhoto === index} onClick={() => setActivePhoto(index)}>
                    Фото {index + 1}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="hall-detail-code">{selected.members} участников</span>
              <h1>{selected.name}</h1>
              <p>{selected.fullDesc}</p>
              <div className="hall-facts-grid">
                <section><MapPin size={24} /><span>{selected.location}</span></section>
                <section><CalendarDays size={24} /><span>{selected.schedule}</span></section>
                <section><Trophy size={24} /><span>{nearestEvent?.title ?? selected.nextEvent}</span></section>
              </div>
              <div className="hall-chip-cloud">
                {selected.tags.concat(selected.achievements.slice(0, 2)).map(item => <span key={item}>{item}</span>)}
              </div>
            </div>
          </article>
        </section>
      </main>
    </HallLayout>
  );
};

export const HallProgramsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Все');
  const [selectedId, setSelectedId] = useState(programs[0].id);
  const [activePhoto, setActivePhoto] = useState(0);
  const filteredPrograms = useMemo(() => programs.filter(program => activeFilter === 'Все' || program.unt === activeFilter), [activeFilter]);
  const selected = filteredPrograms.find(program => program.id === selectedId) ?? filteredPrograms[0] ?? programs[0];
  const currentPhoto = selected.gallery[Math.min(activePhoto, selected.gallery.length - 1)];

  return (
    <HallLayout title="Программы">
      <main className="hall-page">
        <section className="hall-filter-panel">
          <div><span className="hall-kicker">Профиль</span><HallSegment items={programFilters} active={activeFilter} onChange={setActiveFilter} /></div>
        </section>
        <section className="hall-directory-layout">
          <aside className="hall-list">
            <div className="hall-list-head"><strong>{filteredPrograms.length}</strong><span>программы</span></div>
            {filteredPrograms.map(program => (
              <button key={program.id} type="button" className="hall-list-item" data-active={selected.id === program.id} onClick={() => { setSelectedId(program.id); setActivePhoto(0); }} style={{ '--hall-accent': program.color } as React.CSSProperties}>
                <b>{program.code}</b>
                <span>{program.name}</span>
                <small>{program.unt}</small>
              </button>
            ))}
          </aside>
          <article className="hall-detail-card hall-media-detail" style={{ '--hall-accent': selected.color } as React.CSSProperties}>
            <div className="hall-photo-block">
              <img src={currentPhoto.url} alt={selected.name} />
              <div className="hall-photo-tabs">
                {selected.gallery.map((photo, index) => (
                  <button key={photo.url} type="button" data-active={activePhoto === index} onClick={() => setActivePhoto(index)}>
                    {photo.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="hall-detail-code">{selected.code} · {selected.level}</span>
              <h1>{selected.name}</h1>
              <p>{selected.description}</p>
              <div className="hall-facts-grid">
                <section><Trophy size={24} /><span>{selected.grantScore}+ грант</span></section>
                <section><Languages size={24} /><span>{selected.languages.join(' / ')}</span></section>
                <section><BookOpen size={24} /><span>{selected.ects} ECTS</span></section>
              </div>
              <div className="hall-two-columns">
                <section>
                  <h2>Карьера</h2>
                  <div className="hall-chip-cloud">{selected.careers.map(career => <span key={career}><BriefcaseBusiness size={16} /> {career}</span>)}</div>
                </section>
                <section>
                  <h2>Консультация</h2>
                  <div className="hall-action-row">
                    <button type="button" onClick={() => navigate(routeToRoom(selected.consultationRoom))}>
                      <DoorOpen size={24} />
                      {selected.consultationLabel}, каб. {selected.consultationRoom}
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </article>
        </section>
      </main>
    </HallLayout>
  );
};

export const HallPaymentsPage: React.FC = () => {
  const [activeId, setActiveId] = useState(paymentCategories[0].id);
  const active = paymentCategories.find(category => category.id === activeId) ?? paymentCategories[0];
  const Icon = active.icon;

  return (
    <HallLayout title="Оплата">
      <main className="hall-page hall-payments-page">
        <section className="hall-list hall-payment-list">
          {paymentCategories.map(category => {
            const CategoryIcon = category.icon;
            return (
              <button key={category.id} type="button" className="hall-list-item" data-active={active.id === category.id} onClick={() => setActiveId(category.id)} style={{ '--hall-accent': category.color } as React.CSSProperties}>
                <CategoryIcon size={30} />
                <span>{category.title}</span>
                <small>{category.subtitle}</small>
              </button>
            );
          })}
        </section>
        <article className="hall-detail-card hall-payment-detail" style={{ '--hall-accent': active.color } as React.CSSProperties}>
          <header>
            <div>
              <span className="hall-detail-code">{active.subtitle}</span>
              <h1>{active.title}</h1>
              <p>{active.qrLabel}</p>
            </div>
            <div className="hall-detail-icon"><Icon size={42} /></div>
          </header>
          <div className="hall-payment-grid">
            <div className="hall-qr-wrap">
              <QRPlaceholder label={active.qrLabel} color={active.color} />
            </div>
            <div className="hall-requisites">
              {Object.entries(active.details).map(([key, value]) => (
                <div key={key}>
                  <span>{paymentFieldLabels[key] ?? key}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </HallLayout>
  );
};

export const HallDirectionsPage: React.FC = () => {
  const [activeTransport, setActiveTransport] = useState(0);
  const active = transportOptions[activeTransport];
  const ActiveIcon = active.icon;

  return (
    <HallLayout title="Как добраться">
      <main className="hall-page hall-directions-page">
        <section className="hall-detail-card hall-map-card" style={{ '--hall-accent': active.color } as React.CSSProperties}>
          <header>
            <div>
              <span className="hall-detail-code">АУЭС им. Гумарбека Даукеева</span>
              <h1>ул. Байтурсынова, 126/1</h1>
              <p>Главный вход со стороны ул. Байтурсынова</p>
            </div>
            <div className="hall-detail-icon"><MapPin size={42} /></div>
          </header>
          <div className="hall-map-visual">
            <div className="hall-map-grid" />
            <div className="hall-map-road hall-map-road-a" />
            <div className="hall-map-road hall-map-road-b" />
            <div className="hall-map-pin"><MapPin size={44} /></div>
          </div>
        </section>

        <section className="hall-direction-side">
          <div className="hall-filter-panel">
            <div>
              <span className="hall-kicker">Транспорт</span>
              <div className="hall-segment hall-transport-segment">
                {transportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <button key={option.title} type="button" data-active={activeTransport === index} onClick={() => setActiveTransport(index)}>
                      <Icon size={24} />
                      {option.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <article className="hall-detail-card" style={{ '--hall-accent': active.color } as React.CSSProperties}>
            <span className="hall-detail-code"><ActiveIcon size={22} /> {active.title}</span>
            <div className="hall-steps">
              {active.options.map((option, index) => (
                <div key={option.line}>
                  <b>{index + 1}</b>
                  <span><strong>{option.line}</strong>{option.desc}<em>{option.time}</em></span>
                </div>
              ))}
            </div>
          </article>
          <div className="hall-two-columns hall-small-panels">
            <section>
              <h2>Часы работы</h2>
              {hours.map(item => <p key={item.day}><b>{item.day}</b><span>{item.time}</span></p>)}
            </section>
            <section>
              <h2>Контакты</h2>
              {contacts.map(item => <p key={item.label}><b>{item.label}</b><span>{item.value}</span></p>)}
            </section>
          </div>
        </section>
      </main>
    </HallLayout>
  );
};
