import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Bus, Train, Car, ExternalLink, Copy, Check, Phone, Clock } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

const transportOptions = [
  {
    icon: Bus,
    title: 'Автобус',
    color: '#7FB8A0',
    bg: 'rgba(127,184,160,0.1)',
    options: [
      { line: '№ 28', desc: 'Остановка «АЭУС» (5 мин пешком)', time: '~10 мин от центра' },
      { line: '№ 54', desc: 'Остановка «Ул. Байтурсынова»', time: '~15 мин от ст. Алматы-2' },
      { line: '№ 77', desc: 'Прямой маршрут от ж/д вокзала', time: '~20 мин' },
    ],
  },
  {
    icon: Train,
    title: 'Метро',
    color: '#9B7EC8',
    bg: 'rgba(155,126,200,0.1)',
    options: [
      { line: 'Ст. «Байконур»', desc: 'Затем автобус № 28 или такси', time: '~3 мин от станции' },
      { line: 'Ст. «Алатау»', desc: 'Пересадка на автобус № 54', time: '~12 мин' },
    ],
  },
  {
    icon: Car,
    title: 'На автомобиле',
    color: '#7EC8E3',
    bg: 'rgba(126,200,227,0.1)',
    options: [
      { line: 'Парковка А', desc: 'Главный въезд с ул. Байтурсынова', time: 'Бесплатно' },
      { line: 'Парковка B', desc: 'Со стороны ул. Шевченко', time: 'Платная · 200 ₸/ч' },
    ],
  },
];

export const DirectionsPage: React.FC = () => {
  const { t } = useLanguage();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTransport, setActiveTransport] = useState(0);

  const address = 'ул. Байтурсынова, 126/1, Алматы, Казахстан 050013';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address).catch(() => {});
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <Layout title="Как добраться" showBack>
      <div className="max-w-3xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1.75rem', marginBottom: 8 }}>
            Как добраться
          </h1>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
            Адрес, транспорт и маршруты до АЭУС им. Гумарбека Даукеева
          </p>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: '1.25rem',
            position: 'relative',
          }}
        >
          {/* Map visual */}
          <div
            style={{
              height: 280,
              background: 'var(--app-map-visual-bg)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Grid */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(127,184,160,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(127,184,160,0.04) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* "Streets" */}
            <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, height: 3, background: 'rgba(127,184,160,0.12)' }} />
            <div style={{ position: 'absolute', top: '60%', left: 0, right: 0, height: 2, background: 'rgba(127,184,160,0.07)' }} />
            <div style={{ position: 'absolute', left: '30%', top: 0, bottom: 0, width: 3, background: 'rgba(127,184,160,0.1)' }} />
            <div style={{ position: 'absolute', left: '65%', top: 0, bottom: 0, width: 2, background: 'rgba(127,184,160,0.06)' }} />

            {/* Buildings */}
            {[
              { x: '10%', y: '20%', w: 60, h: 40, opacity: 0.06 },
              { x: '50%', y: '15%', w: 80, h: 50, opacity: 0.06 },
              { x: '70%', y: '55%', w: 55, h: 45, opacity: 0.05 },
              { x: '5%', y: '65%', w: 70, h: 30, opacity: 0.05 },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: b.x,
                  top: b.y,
                  width: b.w,
                  height: b.h,
                  background: `rgba(127,184,160,${b.opacity})`,
                  borderRadius: 4,
                }}
              />
            ))}

            {/* Pulsing marker */}
            <div
              style={{
                position: 'absolute',
                top: '38%',
                left: '28%',
                transform: 'translate(-50%, -100%)',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translate(-50%, 0)',
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'rgba(127,184,160,0.15)',
                  border: '1px solid rgba(127,184,160,0.3)',
                }}
                animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(-45deg)',
                  background: 'linear-gradient(135deg, #7FB8A0, #4A2B57)',
                  boxShadow: '0 4px 20px rgba(127,184,160,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <MapPin size={20} style={{ color: '#fff', transform: 'rotate(45deg)' }} />
              </div>
            </div>

            {/* Label */}
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                background: 'var(--app-overlay-panel)',
                backdropFilter: 'blur(10px)',
                borderRadius: 10,
                padding: '0.5rem 0.875rem',
                fontSize: '0.875rem',
                color: 'var(--brand-mint-strong)',
                fontWeight: 600,
                border: '1px solid rgba(127,184,160,0.2)',
              }}
            >
              АЭУС им. Даукеева
            </div>

            {/* Open in maps button */}
            <button
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'var(--app-overlay-panel)',
                backdropFilter: 'blur(10px)',
                borderRadius: 10,
                padding: '0.5rem 0.875rem',
                border: '1px solid var(--app-border)',
                color: 'var(--app-text)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                transition: 'all 0.2s',
              }}
              onClick={() => window.open('https://maps.google.com/?q=AUES+Almaty', '_blank')}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-mint-strong)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--app-text)'; }}
            >
              <ExternalLink size={12} /> {t('openInMaps')}
            </button>
          </div>

          {/* Address bar */}
          <div
            style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderTop: '1px solid var(--app-border)',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'rgba(127,184,160,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <MapPin size={16} style={{ color: 'var(--brand-mint-strong)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--app-text-strong)', fontWeight: 600 }}>{address}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', marginTop: 2 }}>Алматы, Казахстан</div>
            </div>
            <button
              onClick={handleCopyAddress}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: copiedAddress ? 'var(--brand-mint-strong)' : 'var(--app-icon-muted)',
                padding: 6,
                transition: 'color 0.2s',
              }}
            >
              {copiedAddress ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Working hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            borderRadius: 20,
            padding: '1.25rem',
            marginBottom: '1.25rem',
          }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <Clock size={16} style={{ color: 'var(--brand-mint-strong)' }} />
            <span style={{ fontWeight: 700, color: 'var(--app-text-strong)', fontSize: '0.95rem' }}>Часы работы</span>
            <span
              style={{
                marginLeft: 'auto',
                background: 'rgba(127,184,160,0.15)',
                border: '1px solid rgba(127,184,160,0.3)',
                borderRadius: 20,
                padding: '0.2rem 0.625rem',
                fontSize: '0.875rem',
                color: 'var(--brand-mint-strong)',
                fontWeight: 600,
              }}
            >
              Открыто сейчас
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { day: 'Понедельник – Пятница', time: '8:00 – 20:00' },
              { day: 'Суббота', time: '9:00 – 17:00' },
              { day: 'Воскресенье', time: 'Закрыто' },
            ].map(h => (
              <div key={h.day} className="flex justify-between">
                <span style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)' }}>{h.day}</span>
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: h.time === 'Закрыто' ? 'var(--app-disabled-text)' : 'var(--app-text)',
                    fontWeight: 600,
                  }}
                >
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transport tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: '1.25rem',
          }}
        >
          {/* Tabs */}
          <div
            className="flex"
            style={{ borderBottom: '1px solid var(--app-border)' }}
          >
            {transportOptions.map((opt, i) => {
              const Icon = opt.icon;
              const isActive = activeTransport === i;
              return (
                <button
                  key={opt.title}
                  onClick={() => setActiveTransport(i)}
                  style={{
                    flex: 1,
                    padding: '1rem 0.5rem',
                    background: isActive ? 'var(--app-nav-active)' : 'transparent',
                    border: 'none',
                    borderBottom: isActive ? `2px solid ${opt.color}` : '2px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={18} style={{ color: isActive ? opt.color : 'var(--app-icon-muted)' }} />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      color: isActive ? opt.color : 'var(--app-text-muted)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {opt.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div style={{ padding: '1.25rem' }}>
            {transportOptions[activeTransport].options.map((opt, i) => (
              <div
                key={i}
                style={{
                  padding: '0.875rem',
                  background: 'var(--app-bg-soft)',
                  border: '1px solid var(--app-border)',
                  borderRadius: 12,
                  marginBottom: i < transportOptions[activeTransport].options.length - 1 ? 8 : 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.88rem',
                      color: transportOptions[activeTransport].color,
                      fontWeight: 700,
                      marginBottom: 3,
                    }}
                  >
                    {opt.line}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)' }}>{opt.desc}</div>
                </div>
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--app-text-soft)',
                    background: 'var(--app-control)',
                    borderRadius: 8,
                    padding: '0.25rem 0.5rem',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {opt.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            borderRadius: 20,
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <Phone size={16} style={{ color: 'var(--brand-mint-strong)' }} />
            <span style={{ fontWeight: 700, color: 'var(--app-text-strong)', fontSize: '0.95rem' }}>Контакты</span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Приёмная комиссия', value: '+7 (727) 292-07-60' },
              { label: 'Охрана (пропуск)', value: '+7 (727) 292-07-70' },
              { label: 'Email', value: 'info@aues.kz' },
            ].map(c => (
              <div key={c.label} className="flex justify-between items-center">
                <span style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)' }}>{c.label}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--app-text)', fontWeight: 500 }}>{c.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => window.open('https://maps.google.com/?q=AUES+Almaty', '_blank')}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))',
              border: 'none',
              borderRadius: 14,
              padding: '1rem',
              color: '#0F0F0F',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 20px rgba(127,184,160,0.25)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(127,184,160,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(127,184,160,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <ExternalLink size={18} /> {t('openInMaps')}
          </button>
          <button
            onClick={() => window.open('https://2gis.kz/almaty/search/АУЭС+Алматы', '_blank')}
            style={{
              flex: 1,
              background: 'var(--app-control)',
              border: '1px solid var(--app-control-border)',
              borderRadius: 14,
              padding: '1rem',
              color: 'var(--app-text-muted)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--app-text-strong)'; e.currentTarget.style.background = 'var(--app-surface-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--app-text-muted)'; e.currentTarget.style.background = 'var(--app-control)'; }}
          >
            <Navigation size={18} /> 2GIS
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};
