import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarCheck, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
const BUSY_SLOTS = new Set(['09:30', '10:30', '14:30', '15:00']);

const MONTH_NAMES_RU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const WEEK_DAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export const AppointmentPage: React.FC = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
    topic: '',
    description: '',
  });
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calMonth, setCalMonth] = useState(3); // April (0-indexed)
  const [calYear, setCalYear] = useState(2026);
  const [submitted, setSubmitted] = useState(false);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const today = new Date();

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const InputField: React.FC<{
    label: string;
    name: keyof typeof form;
    placeholder: string;
    type?: string;
  }> = ({ label, name, placeholder, type = 'text' }) => (
    <div>
      <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--app-text-soft)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.04em' }}>
        {label}
      </label>
      <input
        type={type}
        value={form[name]}
        onChange={e => setForm(prev => ({ ...prev, [name]: e.target.value }))}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'var(--app-input-bg)',
          border: '1px solid var(--app-input-border)',
          borderRadius: 12,
          padding: '0.75rem 1rem',
          color: 'var(--app-text)',
          fontSize: '0.9rem',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--app-border-strong)')}
        onBlur={e => (e.target.style.borderColor = 'var(--app-input-border)')}
      />
    </div>
  );

  if (submitted) {
    return (
      <Layout title="Запись подтверждена" showBack>
        <div
          className="max-w-md mx-auto px-4 flex flex-col items-center justify-center"
          style={{ minHeight: 'calc(100vh - 120px)', textAlign: 'center', gap: '1.5rem' }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'var(--app-nav-active)',
              border: '2px solid var(--brand-mint-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle size={40} style={{ color: 'var(--brand-mint-strong)' }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1.5rem', marginBottom: 8 }}>
              Заявка отправлена!
            </h2>
            <p style={{ color: 'var(--app-text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Ваша запись на{' '}
              <span style={{ color: 'var(--brand-mint-strong)' }}>
                {MONTH_NAMES_RU[calMonth]} {selectedDate}, {selectedTime}
              </span>{' '}
              подтверждена. Детали высланы на {form.email || 'вашу почту'}.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              background: 'var(--app-card)',
              border: '1px solid var(--app-border)',
              borderRadius: 16,
              padding: '1.25rem',
              width: '100%',
              textAlign: 'left',
            }}
          >
            {[
              { label: 'Дата', value: `${selectedDate} ${MONTH_NAMES_RU[calMonth]} ${calYear}` },
              { label: 'Время', value: selectedTime || '—' },
              { label: 'Сотрудник', value: 'Нурланов Б.Е.' },
              { label: 'Тема', value: form.topic || '—' },
            ].map(row => (
              <div key={row.label} className="flex justify-between" style={{ marginBottom: 8 }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)' }}>{row.label}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--app-text)', fontWeight: 600 }}>{row.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Запись на приём" showBack>
      <div className="max-w-xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Steps indicator */}
        <div className="flex items-center gap-3" style={{ marginBottom: '2rem' }}>
          {[
            { n: 1, label: 'Данные' },
            { n: 2, label: 'Дата и время' },
            { n: 3, label: 'Подтверждение' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.n}>
              <div className="flex items-center gap-2" style={{ flex: 1 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: step >= s.n ? 'var(--brand-mint)' : 'var(--app-disabled-bg)',
                    border: step === s.n ? '2px solid var(--brand-mint-strong)' : '2px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step >= s.n ? '#0F0F0F' : 'var(--app-text-soft)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    transition: 'all 0.3s',
                  }}
                >
                  {step > s.n ? '✓' : s.n}
                </div>
                <span style={{ fontSize: '0.875rem', color: step >= s.n ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)', fontWeight: step === s.n ? 600 : 400 }}>
                  {s.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div
                  style={{
                    height: 1,
                    flex: 1,
                    background: step > s.n ? 'var(--brand-mint-strong)' : 'var(--app-border)',
                    transition: 'background 0.3s',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Form */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'var(--app-card)',
                border: '1px solid var(--app-border)',
                borderRadius: 20,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 700, marginBottom: 4 }}>Ваши данные</h3>
              <InputField label="ФИО" name="name" placeholder="Иванов Иван Иванович" />
              <InputField label="Email" name="email" placeholder="example@aues.kz" type="email" />
              <InputField label="Телефон" name="phone" placeholder="+7 (___) ___-__-__" type="tel" />

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--app-text-soft)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.04em' }}>
                  СТАТУС
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Студент', 'Магистрант', 'Преподаватель', 'Сотрудник', 'Другое'].map(s => (
                    <button
                      key={s}
                      onClick={() => setForm(prev => ({ ...prev, status: s }))}
                      style={{
                        padding: '0.4rem 0.875rem',
                        borderRadius: 20,
                        border: `1px solid ${form.status === s ? 'var(--brand-mint-strong)' : 'var(--app-control-border)'}`,
                        background: form.status === s ? 'var(--app-nav-active)' : 'var(--app-control)',
                        color: form.status === s ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <InputField label="ТЕМА" name="topic" placeholder="Консультация по курсовой работе" />

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--app-text-soft)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.04em' }}>
                  ОПИСАНИЕ (НЕОБЯЗАТЕЛЬНО)
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Опишите подробнее ваш вопрос..."
                  rows={3}
                  style={{
                    width: '100%',
                    background: 'var(--app-input-bg)',
                    border: '1px solid var(--app-input-border)',
                    borderRadius: 12,
                    padding: '0.75rem 1rem',
                    color: 'var(--app-text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--app-border-strong)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--app-input-border)')}
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!form.name || !form.email}
                style={{
                  width: '100%',
                  background: form.name && form.email ? 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))' : 'var(--app-disabled-bg)',
                  border: 'none',
                  borderRadius: 14,
                  padding: '1rem',
                  color: form.name && form.email ? '#0F0F0F' : 'var(--app-disabled-text)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: form.name && form.email ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 8,
                }}
              >
                Далее <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {/* Step 2: Calendar */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Calendar */}
              <div
                style={{
                  background: 'var(--app-card)',
                  border: '1px solid var(--app-border)',
                  borderRadius: 20,
                  padding: '1.25rem',
                  marginBottom: '1rem',
                }}
              >
                {/* Month nav */}
                <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
                  <button
                    onClick={() => {
                      if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
                      else setCalMonth(m => m - 1);
                    }}
                    style={{ color: 'var(--brand-mint-strong)', background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8 }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span style={{ color: 'var(--app-text-strong)', fontWeight: 700, fontSize: '1rem' }}>
                    {MONTH_NAMES_RU[calMonth]} {calYear}
                  </span>
                  <button
                    onClick={() => {
                      if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
                      else setCalMonth(m => m + 1);
                    }}
                    style={{ color: 'var(--brand-mint-strong)', background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8 }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Weekdays */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
                  {WEEK_DAYS_RU.map(d => (
                    <div key={d} style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--app-text-soft)', fontWeight: 600, padding: '4px 0' }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                  {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const isWeekend = (firstDay + i) % 7 >= 5;
                    const isPast = false;
                    const isSelected = selectedDate === day;
                    const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();

                    return (
                      <button
                        key={day}
                        onClick={() => { if (!isWeekend && !isPast) { setSelectedDate(day); setSelectedTime(null); } }}
                        disabled={isWeekend || isPast}
                        style={{
                          aspectRatio: '1',
                          borderRadius: 10,
                          border: isSelected ? '2px solid var(--brand-mint-strong)' : isToday ? '1px solid var(--app-border-strong)' : '1px solid transparent',
                          background: isSelected ? 'var(--app-nav-active)' : isToday ? 'var(--app-control)' : 'transparent',
                          color: isWeekend || isPast ? 'var(--app-disabled-text)' : isSelected ? 'var(--brand-mint-strong)' : 'var(--app-text)',
                          fontSize: '0.875rem',
                          fontWeight: isSelected ? 700 : 400,
                          cursor: isWeekend || isPast ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onMouseEnter={e => {
                          if (!isWeekend && !isPast && !isSelected) {
                            e.currentTarget.style.background = 'var(--app-nav-active)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isSelected) e.currentTarget.style.background = isToday ? 'var(--app-control)' : 'transparent';
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'var(--app-card)',
                    border: '1px solid var(--app-border)',
                    borderRadius: 20,
                    padding: '1.25rem',
                    marginBottom: '1rem',
                  }}
                >
                  <p style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', fontWeight: 600, marginBottom: '1rem' }}>
                    ВЫБЕРИТЕ ВРЕМЯ
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8 }}>
                    {TIME_SLOTS.map(slot => {
                      const isBusy = BUSY_SLOTS.has(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => { if (!isBusy) setSelectedTime(slot); }}
                          disabled={isBusy}
                          style={{
                            padding: '0.6rem',
                            borderRadius: 10,
                            border: `1px solid ${isSelected ? 'var(--brand-mint-strong)' : isBusy ? 'transparent' : 'var(--app-control-border)'}`,
                            background: isSelected ? 'var(--app-nav-active)' : isBusy ? 'var(--app-disabled-bg)' : 'var(--app-control)',
                            color: isSelected ? 'var(--brand-mint-strong)' : isBusy ? 'var(--app-disabled-text)' : 'var(--app-text)',
                            fontSize: '0.875rem',
                            fontWeight: isSelected ? 700 : 400,
                            cursor: isBusy ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s',
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4" style={{ marginTop: '1rem' }}>
                    <div className="flex items-center gap-1.5">
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--app-nav-active)', border: '1px solid var(--brand-mint-strong)' }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)' }}>{t('available')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--app-disabled-bg)', border: '1px solid var(--app-border)' }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)' }}>{t('busy')}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 0,
                    background: 'var(--app-control)',
                    border: '1px solid var(--app-control-border)',
                    borderRadius: 14,
                    padding: '1rem 1.25rem',
                    color: 'var(--app-text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.9rem',
                  }}
                >
                  <ChevronLeft size={16} /> Назад
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  style={{
                    flex: 1,
                    background: selectedDate && selectedTime ? 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))' : 'var(--app-disabled-bg)',
                    border: 'none',
                    borderRadius: 14,
                    padding: '1rem',
                    color: selectedDate && selectedTime ? '#0F0F0F' : 'var(--app-disabled-text)',
                    fontWeight: 700,
                    cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  Далее <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  background: 'var(--app-card)',
                  border: '1px solid var(--app-border)',
                  borderRadius: 20,
                  padding: '1.5rem',
                  marginBottom: '1rem',
                }}
              >
                <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 700, marginBottom: '1.25rem' }}>Подтверждение записи</h3>

                {/* Summary */}
                <div
                  style={{
                    background: 'var(--app-nav-active)',
                    border: '1px solid var(--app-border-strong)',
                    borderRadius: 14,
                    padding: '1rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    gap: 14,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 14,
                      background: 'var(--app-card)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-mint-strong)', lineHeight: 1 }}>{selectedDate}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--brand-mint-strong)', fontWeight: 600 }}>{MONTH_NAMES_RU[calMonth].slice(0,3).toUpperCase()}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--app-text-strong)', fontSize: '1.05rem' }}>{selectedTime}</div>
                    <div style={{ color: 'var(--app-text-muted)', fontSize: '0.875rem' }}>Нурланов Б.Е. • Каб. 205</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'ФИО', value: form.name },
                    { label: 'Email', value: form.email },
                    { label: 'Телефон', value: form.phone || '—' },
                    { label: 'Статус', value: form.status || '—' },
                    { label: 'Тема', value: form.topic || '—' },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center">
                      <span style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)' }}>{row.label}</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--app-text)', fontWeight: 500, maxWidth: '60%', textAlign: 'right' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 0,
                    background: 'var(--app-control)',
                    border: '1px solid var(--app-control-border)',
                    borderRadius: 14,
                    padding: '1rem 1.25rem',
                    color: 'var(--app-text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.9rem',
                  }}
                >
                  <ChevronLeft size={16} /> Назад
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, var(--brand-purple), var(--brand-mint-strong))',
                    border: 'none',
                    borderRadius: 14,
                    padding: '1rem',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: '0 4px 20px rgba(127,184,160,0.2)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(127,184,160,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(127,184,160,0.2)'; }}
                >
                  <CalendarCheck size={18} /> {t('submitRequest')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};
