import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  DoorOpen, MapPin, Building2, ChevronRight, Info,
  Navigation, Clock, Users, Wifi, Monitor
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

const roomImages = [
  'https://images.unsplash.com/photo-1739671586189-a386d9ab2829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  'https://images.unsplash.com/photo-1712029972454-0ed8bb0c0fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
];

const issues = [
  'Сдача отчётов по практике',
  'Зачёт и экзамен по профильным дисциплинам',
  'Консультации с преподавателями кафедры',
  'Защита курсовых работ',
  'Лабораторные работы по программированию',
];

const amenities = [
  { icon: Monitor, label: 'Проектор', available: true },
  { icon: Wifi, label: 'Wi-Fi', available: true },
  { icon: Users, label: 'Вместимость: 30', available: true },
  { icon: Clock, label: 'Часы работы 8:00–18:00', available: true },
];

export const RoomPage: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Layout title="Аудитория 301" showBack>
      <div className="max-w-3xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'var(--room-hero-bg)',
            border: '1px solid var(--app-border-strong)',
            borderRadius: 20,
            padding: '2rem',
            marginBottom: '1.25rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient accent */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(var(--brand-mint-rgb),0.14) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="flex items-start justify-between">
            <div>
              {/* Room number */}
              <div
                style={{
                  fontSize: '4rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  background: 'var(--room-title-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.5rem',
                }}
              >
                301
              </div>

              {/* Department */}
              <div style={{ fontSize: '1rem', color: 'var(--app-text-strong)', fontWeight: 600, marginBottom: '0.75rem' }}>
                Кафедра информационных технологий
              </div>

              {/* Location badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    background: 'var(--app-nav-active)',
                    border: '1px solid var(--app-border-strong)',
                    borderRadius: 20,
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.875rem',
                    color: 'var(--brand-mint-strong)',
                  }}
                >
                  <Building2 size={13} /> 3-й этаж
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    background: 'rgba(74,43,87,0.2)',
                    border: '1px solid rgba(155,126,200,0.25)',
                    borderRadius: 20,
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.875rem',
                    color: '#9B7EC8',
                  }}
                >
                  <MapPin size={13} /> Корпус A
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    background: 'var(--app-nav-active)',
                    border: '1px solid var(--app-border-strong)',
                    borderRadius: 20,
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.875rem',
                    color: 'var(--brand-mint-strong)',
                  }}
                >
                  <DoorOpen size={13} /> Открыта сейчас
                </span>
              </div>
            </div>

            {/* Icon */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: 'var(--app-nav-active)',
                border: '1px solid var(--app-border-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <DoorOpen size={26} style={{ color: 'var(--brand-mint-strong)' }} />
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--app-text-muted)',
              lineHeight: 1.65,
              marginTop: '1.25rem',
            }}
          >
            Учебная аудитория кафедры информационных технологий, оснащённая современным оборудованием
            для проведения лекций, лабораторных и практических занятий. Аудитория оборудована
            мультимедийным проектором, интерактивной доской и высокоскоростным интернетом.
          </p>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {amenities.map(a => {
              const Icon = a.icon;
              return (
                <div
                  key={a.label}
                  style={{
                    background: 'var(--app-card)',
                    border: '1px solid var(--app-border)',
                    borderRadius: 12,
                    padding: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: 'var(--app-nav-active)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} style={{ color: 'var(--brand-mint-strong)' }} />
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--app-text)' }}>{a.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ padding: '1rem 1rem 0.75rem', borderBottom: '1px solid var(--app-border)' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)', fontWeight: 600 }}>Фотогалерея</span>
          </div>
          {/* Main image */}
          <div style={{ height: 220, overflow: 'hidden' }}>
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={roomImages[activeImage]}
              alt="Room"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2" style={{ padding: '0.75rem' }}>
            {roomImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                style={{
                  width: 64,
                  height: 48,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: i === activeImage ? '2px solid var(--brand-mint-strong)' : '2px solid transparent',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'border-color 0.2s',
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Issues section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            borderRadius: 20,
            padding: '1.25rem',
            marginBottom: '1.25rem',
          }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <Info size={16} style={{ color: 'var(--brand-mint-strong)' }} />
            <span style={{ fontWeight: 700, color: 'var(--app-text-strong)', fontSize: '0.95rem' }}>
              По каким вопросам обращаться
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {issues.map((issue, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
                style={{
                  padding: '0.6rem 0.75rem',
                  background: 'rgba(var(--brand-mint-rgb),0.08)',
                  borderRadius: 10,
                  border: '1px solid var(--app-border-strong)',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--brand-mint-strong)',
                    marginTop: 7,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--app-text)', lineHeight: 1.5 }}>{issue}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              height: 180,
              background: 'var(--room-map-bg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              position: 'relative',
            }}
          >
            {/* Grid lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(var(--brand-mint-rgb),0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--brand-mint-rgb),0.12) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
            {/* Room marker */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'var(--app-nav-active)',
                border: '2px solid var(--brand-mint-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <MapPin size={22} style={{ color: 'var(--brand-mint-strong)' }} />
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', zIndex: 1 }}>
              Корпус A, 3-й этаж, ауд. 301
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          onClick={() => navigate('/directions')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))',
            border: 'none',
            borderRadius: 16,
            padding: '1.125rem',
            color: '#0F0F0F',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 4px 20px rgba(var(--brand-mint-rgb),0.25)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(var(--brand-mint-rgb),0.4)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(var(--brand-mint-rgb),0.25)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Navigation size={20} /> {t('showRoute')}
        </motion.button>
      </div>
    </Layout>
  );
};
