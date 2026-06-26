import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bus, Car, Check, Clock, Copy, ExternalLink, MapPin, Navigation, Phone, Train } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

export const transportOptions = [
  {
    icon: Bus,
    title: 'Автобус',
    color: '#7FB8A0',
    bg: 'rgba(127,184,160,0.1)',
    options: [
      { line: '№ 28', desc: 'Остановка «АЭУС», 5 минут пешком до главного входа', time: '~10 мин от центра' },
      { line: '№ 54', desc: 'Остановка «Ул. Байтурсынова», вход через главный корпус', time: '~15 мин от Алматы-2' },
      { line: '№ 77', desc: 'Прямой маршрут от ж/д вокзала, выход у Байтурсынова', time: '~20 мин' },
    ],
  },
  {
    icon: Train,
    title: 'Метро',
    color: '#9B7EC8',
    bg: 'rgba(155,126,200,0.1)',
    options: [
      { line: 'Ст. «Байконур»', desc: 'Далее автобус № 28 или короткая поездка на такси', time: '~3 мин от станции' },
      { line: 'Ст. «Алатау»', desc: 'Пересадка на автобус № 54 до Байтурсынова', time: '~12 мин' },
    ],
  },
  {
    icon: Car,
    title: 'На автомобиле',
    color: '#7EC8E3',
    bg: 'rgba(126,200,227,0.1)',
    options: [
      { line: 'Парковка A', desc: 'Главный въезд с ул. Байтурсынова, ближе к приёмной комиссии', time: 'Бесплатно' },
      { line: 'Парковка B', desc: 'Въезд со стороны ул. Шевченко, удобнее для корпуса B', time: '200 ₸/ч' },
    ],
  },
];

export const hours = [
  { day: 'Понедельник – Пятница', time: '8:00 – 20:00' },
  { day: 'Суббота', time: '9:00 – 17:00' },
  { day: 'Воскресенье', time: 'Закрыто' },
];

export const contacts = [
  { label: 'Приёмная комиссия', value: '+7 (727) 292-07-60' },
  { label: 'Охрана и пропуск', value: '+7 (727) 292-07-70' },
  { label: 'Email', value: 'info@aues.kz' },
];

export const DirectionsPage: React.FC = () => {
  const { t } = useLanguage();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTransport, setActiveTransport] = useState(0);

  const address = 'ул. Байтурсынова, 126/1, Алматы, Казахстан 050013';
  const activeOption = transportOptions[activeTransport];
  const ActiveIcon = activeOption.icon;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address).catch(() => {});
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const openGoogleMaps = () => window.open('https://maps.google.com/?q=AUES+Almaty', '_blank');
  const open2gis = () => window.open('https://2gis.kz/almaty/search/АУЭС+Алматы', '_blank');

  return (
    <Layout title="Как добраться" showBack>
      <div className="directions-page page-content mx-auto px-4 sm:px-6" style={{ paddingTop: '1.15rem', paddingBottom: '3rem' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="directions-header">
          <div>
            <h1>Как добраться</h1>
            <p>Адрес, транспорт и быстрые маршруты до АЭУС им. Гумарбека Даукеева</p>
          </div>
          <div className="directions-status">
            <Clock size={16} />
            Открыто сейчас
          </div>
        </motion.div>

        <div className="directions-hero-grid">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="directions-map-card"
          >
            <div className="directions-map-visual">
              <div className="directions-map-grid" />
              <div className="directions-street directions-street-horizontal directions-street-main" />
              <div className="directions-street directions-street-horizontal directions-street-soft" />
              <div className="directions-street directions-street-vertical directions-street-main" />
              <div className="directions-street directions-street-vertical directions-street-soft" />

              {[
                { x: '10%', y: '20%', w: 72, h: 44 },
                { x: '50%', y: '14%', w: 94, h: 58 },
                { x: '72%', y: '55%', w: 64, h: 48 },
                { x: '5%', y: '66%', w: 86, h: 34 },
              ].map((building, index) => (
                <div
                  key={index}
                  className="directions-map-building"
                  style={{
                    left: building.x,
                    top: building.y,
                    width: building.w,
                    height: building.h,
                  }}
                />
              ))}

              <div className="directions-marker">
                <motion.div
                  className="directions-marker-pulse"
                  animate={{ scale: [1, 2, 1], opacity: [0.55, 0, 0.55] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="directions-marker-pin">
                  <MapPin size={22} />
                </div>
              </div>

              <button type="button" className="directions-map-action" onClick={openGoogleMaps}>
                <ExternalLink size={14} />
                {t('openInMaps')}
              </button>

              <div className="directions-map-label">АЭУС им. Даукеева</div>
            </div>

            <div className="directions-address-row">
              <div className="directions-address-icon">
                <MapPin size={18} />
              </div>
              <div>
                <strong>{address}</strong>
                <span>Главный вход со стороны ул. Байтурсынова</span>
              </div>
              <button type="button" onClick={handleCopyAddress} className="directions-copy-button" aria-label="Скопировать адрес">
                {copiedAddress ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="directions-side-stack"
          >
            <div className="directions-info-card">
              <div className="directions-card-title">
                <Clock size={17} />
                Часы работы
              </div>
              <div className="directions-hours-list">
                {hours.map(item => (
                  <div key={item.day}>
                    <span>{item.day}</span>
                    <strong data-closed={item.time === 'Закрыто'}>{item.time}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="directions-info-card">
              <div className="directions-card-title">
                <Phone size={17} />
                Контакты
              </div>
              <div className="directions-contact-list">
                {contacts.map(contact => (
                  <div key={contact.label}>
                    <span>{contact.label}</span>
                    <strong>{contact.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="directions-actions">
              <button type="button" onClick={openGoogleMaps}>
                <ExternalLink size={18} />
                Google Maps
              </button>
              <button type="button" onClick={open2gis}>
                <Navigation size={18} />
                2GIS
              </button>
            </div>
          </motion.aside>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="directions-transport-card"
        >
          <div className="directions-section-head">
            <div>
              <span>Маршруты</span>
              <h2>Выберите удобный способ</h2>
            </div>
            <div className="directions-active-mode" style={{ color: activeOption.color, borderColor: `${activeOption.color}35`, background: activeOption.bg }}>
              <ActiveIcon size={17} />
              {activeOption.title}
            </div>
          </div>

          <div className="directions-transport-tabs">
            {transportOptions.map((option, index) => {
              const Icon = option.icon;
              const isActive = activeTransport === index;

              return (
                <button
                  key={option.title}
                  type="button"
                  onClick={() => setActiveTransport(index)}
                  data-active={isActive}
                  style={{
                    color: isActive ? option.color : 'var(--app-text-muted)',
                    borderColor: isActive ? `${option.color}45` : 'var(--app-border)',
                    background: isActive ? option.bg : 'var(--app-bg-soft)',
                  }}
                >
                  <Icon size={18} />
                  {option.title}
                </button>
              );
            })}
          </div>

          <div className="directions-route-list">
            {activeOption.options.map((option, index) => (
              <div key={option.line} className="directions-route-item" style={{ borderColor: `${activeOption.color}25` }}>
                <div className="directions-route-number" style={{ color: activeOption.color, background: activeOption.bg }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <strong>{option.line}</strong>
                  <span>{option.desc}</span>
                </div>
                <em>{option.time}</em>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};
