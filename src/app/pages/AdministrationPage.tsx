import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  BarChart3, CalendarClock, CheckCircle2, Clock, Mail, MapPin,
  MessageSquare, Settings, UserCheck, XCircle
} from 'lucide-react';
import { Layout } from '../components/Layout';

const leaders = [
  {
    id: 1,
    name: 'Тулеубеков Ерлан Сагатович',
    role: 'Проректор по академической деятельности',
    department: 'Академический блок',
    room: 'A-214, главный корпус',
    email: 'academic@aues.kz',
    questions: ['Образовательные программы', 'Академическая политика', 'Апелляции', 'Индивидуальный план'],
    slots: ['Пн 14:00', 'Ср 10:30', 'Пт 15:00'],
    color: '#7FB8A0',
  },
  {
    id: 2,
    name: 'Абдрахманова Лаура Кайратовна',
    role: 'Директор департамента цифровизации',
    department: 'ДИТ',
    room: 'A-315, главный корпус',
    email: 'digital@aues.kz',
    questions: ['Цифровые сервисы', 'Доступы', 'Интеграции', 'Технические обращения'],
    slots: ['Вт 11:00', 'Чт 16:00'],
    color: '#7EC8E3',
  },
  {
    id: 3,
    name: 'Сулейменов Арман Нурланович',
    role: 'Декан факультета цифровых технологий',
    department: 'ФЦТ',
    room: 'B-205, корпус B',
    email: 'fit@aues.kz',
    questions: ['Перевод', 'Восстановление', 'Академическая справка', 'Дисциплинарные вопросы'],
    slots: ['Пн 10:00', 'Ср 14:30', 'Чт 12:00'],
    color: '#9B7EC8',
  },
];

const initialRequests = [
  { id: 1, visitor: 'Алина Ким', status: 'Ожидает', type: 'Студент', topic: 'Академическая справка', date: '26 июня, 10:30' },
  { id: 2, visitor: 'Руслан Аманов', status: 'Подтверждена', type: 'Студент', topic: 'Перевод на другую ОП', date: '27 июня, 14:00' },
  { id: 3, visitor: 'Мария Волкова', status: 'Нужно другое время', type: 'Гость', topic: 'Партнёрская встреча', date: '28 июня, 11:00' },
];

const tabs = [
  { key: 'requests', label: 'Мои заявки', icon: MessageSquare },
  { key: 'hours', label: 'Часы приёма', icon: CalendarClock },
  { key: 'analytics', label: 'Аналитика', icon: BarChart3 },
  { key: 'settings', label: 'Настройки', icon: Settings },
];

export const AdministrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(leaders[0].id);
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState(initialRequests);

  const selected = leaders.find(leader => leader.id === selectedId) ?? leaders[0];

  const updateStatus = (id: number, status: string) => {
    setRequests(current => current.map(request => request.id === id ? { ...request, status } : request));
  };

  return (
    <Layout title="АУП и запись к руководству" showBack>
      <div className="administration-page page-content mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 850, fontSize: '1.9rem', marginBottom: 8 }}>
            Руководство и онлайн-запись
          </h1>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.95rem', maxWidth: 820, lineHeight: 1.6 }}>
            В ТЗ пользователь выбирает руководителя, тему вопроса и свободный слот. Руководитель в личном кабинете подтверждает, отклоняет или предлагает другое время.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-5">
          <div className="directory-results flex flex-col gap-3">
            {leaders.map(leader => (
              <button
                key={leader.id}
                type="button"
                onClick={() => setSelectedId(leader.id)}
                className="text-left transition-all duration-200"
                style={{
                  background: selected.id === leader.id ? 'var(--app-surface-hover)' : 'var(--app-card)',
                  border: `1px solid ${selected.id === leader.id ? leader.color + '66' : 'var(--app-border)'}`,
                  borderRadius: 18,
                  padding: '1rem',
                  boxShadow: selected.id === leader.id ? `0 16px 40px ${leader.color}18` : 'none',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: `${leader.color}18`,
                      border: `1px solid ${leader.color}36`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <UserCheck size={22} style={{ color: leader.color }} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--app-text-strong)', fontWeight: 850, lineHeight: 1.25 }}>{leader.name}</div>
                    <div style={{ color: 'var(--app-text-muted)', fontSize: '0.9rem', marginTop: 5 }}>{leader.role}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <section
            className="directory-detail detail-content"
            style={{
              background: 'var(--app-card)',
              border: '1px solid var(--app-border)',
              borderRadius: 20,
              padding: '1.5rem',
              boxShadow: '0 18px 46px var(--app-shadow)',
            }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap" style={{ marginBottom: '1.25rem' }}>
              <div>
                <div style={{ color: selected.color, fontWeight: 800, marginBottom: 8 }}>{selected.department}</div>
                <h2 style={{ color: 'var(--app-text-strong)', fontSize: '1.55rem', fontWeight: 850, lineHeight: 1.15 }}>
                  {selected.role}
                </h2>
                <div className="flex items-center gap-3 flex-wrap" style={{ marginTop: 12, color: 'var(--app-text-muted)' }}>
                  <span className="flex items-center gap-1"><MapPin size={16} /> {selected.room}</span>
                  <span className="flex items-center gap-1"><Mail size={16} /> {selected.email}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/appointment')}
                style={{
                  background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))',
                  color: '#0F0F0F',
                  border: 0,
                  borderRadius: 999,
                  padding: '0.9rem 1.15rem',
                  fontWeight: 850,
                }}
              >
                Записаться на приём
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4" style={{ marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem' }}>
                <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 850, marginBottom: 10 }}>По каким вопросам принимает</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.questions.map(question => (
                    <span key={question} style={{ background: `${selected.color}18`, color: selected.color, border: `1px solid ${selected.color}34`, borderRadius: 999, padding: '0.45rem 0.75rem', fontWeight: 700 }}>
                      {question}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem' }}>
                <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 850, marginBottom: 10 }}>Ближайшие слоты</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.slots.map(slot => (
                    <span key={slot} className="flex items-center gap-1" style={{ background: 'var(--app-card)', color: 'var(--app-text)', border: '1px solid var(--app-border)', borderRadius: 999, padding: '0.45rem 0.75rem', fontWeight: 700 }}>
                      <Clock size={15} style={{ color: selected.color }} /> {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--app-border)', paddingTop: '1.25rem' }}>
              <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 850, fontSize: '1.2rem', marginBottom: 12 }}>
                Демо личного кабинета руководителя
              </h3>
              <div className="flex gap-2 flex-wrap" style={{ marginBottom: '1rem' }}>
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className="flex items-center gap-2"
                      style={{
                        background: activeTab === tab.key ? 'var(--brand-mint)' : 'var(--app-control)',
                        color: activeTab === tab.key ? '#0F0F0F' : 'var(--app-text-muted)',
                        border: '1px solid var(--app-control-border)',
                        borderRadius: 999,
                        padding: '0.6rem 0.85rem',
                        fontWeight: 800,
                      }}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {activeTab === 'requests' ? (
                <div className="flex flex-col gap-3">
                  {requests.map(request => (
                    <div key={request.id} style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem' }}>
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <div style={{ color: 'var(--app-text-strong)', fontWeight: 850 }}>{request.visitor}</div>
                          <div style={{ color: 'var(--app-text-muted)', marginTop: 5 }}>{request.type} · {request.topic} · {request.date}</div>
                        </div>
                        <span style={{ color: request.status === 'Подтверждена' ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)', fontWeight: 800 }}>
                          {request.status}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap" style={{ marginTop: 12 }}>
                        <button onClick={() => updateStatus(request.id, 'Подтверждена')} className="flex items-center gap-1" style={{ border: 0, borderRadius: 999, background: 'rgba(var(--brand-mint-rgb),0.2)', color: 'var(--brand-mint-strong)', padding: '0.55rem 0.8rem', fontWeight: 800 }}>
                          <CheckCircle2 size={15} /> Подтвердить
                        </button>
                        <button onClick={() => updateStatus(request.id, 'Отклонена')} className="flex items-center gap-1" style={{ border: 0, borderRadius: 999, background: 'rgba(232,124,155,0.16)', color: '#E87C9B', padding: '0.55rem 0.8rem', fontWeight: 800 }}>
                          <XCircle size={15} /> Отклонить
                        </button>
                        <button onClick={() => updateStatus(request.id, 'Предложено другое время')} style={{ border: '1px solid var(--app-border)', borderRadius: 999, background: 'var(--app-card)', color: 'var(--app-text)', padding: '0.55rem 0.8rem', fontWeight: 800 }}>
                          Предложить другое время
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'hours' ? (
                <div className="grid sm:grid-cols-3 gap-3">
                  {['Понедельник 14:00-16:00', 'Среда 10:00-12:00', 'Пятница 15:00-17:00'].map(item => (
                    <div key={item} style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem', color: 'var(--app-text)' }}>
                      {item}
                    </div>
                  ))}
                </div>
              ) : activeTab === 'analytics' ? (
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    ['Заявок за неделю', '18'],
                    ['Ожидают решения', '6'],
                    ['Подтверждено', '72%'],
                  ].map(([label, value]) => (
                    <div key={label} style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem' }}>
                      <div style={{ color: 'var(--app-text-strong)', fontSize: '1.6rem', fontWeight: 850 }}>{value}</div>
                      <div style={{ color: 'var(--app-text-muted)' }}>{label}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem', color: 'var(--app-text-muted)', lineHeight: 1.6 }}>
                  Здесь в реальной системе редактируются фото, должность, зона ответственности, кабинет, контакты, уведомления и пароль. В прототипе это показано как структура будущего личного кабинета.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};
