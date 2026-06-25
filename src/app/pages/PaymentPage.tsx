import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Building, Home, Wrench, Download, Copy, Check, QrCode, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

const paymentCategories = [
  {
    id: 'tuition',
    title: 'Оплата обучения',
    subtitle: 'Контрактное обучение',
    icon: CreditCard,
    color: '#7FB8A0',
    bg: 'rgba(127,184,160,0.1)',
    border: 'rgba(127,184,160,0.25)',
    details: {
      bank: 'АО «Народный Банк Казахстана»',
      bik: 'HSBKKZKX',
      iin: '040240006700',
      kbe: '16',
      account: 'KZ286010141000020580',
      purpose: 'Оплата за обучение, ФИО студента, специальность',
      amount: 'По договору',
    },
    qrLabel: 'QR для оплаты обучения',
  },
  {
    id: 'dorm',
    title: 'Оплата общежития',
    subtitle: 'Проживание в кампусе',
    icon: Home,
    color: '#9B7EC8',
    bg: 'rgba(155,126,200,0.1)',
    border: 'rgba(155,126,200,0.25)',
    details: {
      bank: 'АО «Народный Банк Казахстана»',
      bik: 'HSBKKZKX',
      iin: '040240006700',
      kbe: '16',
      account: 'KZ286010141000020599',
      purpose: 'Оплата за общежитие, ФИО студента, номер комнаты',
      amount: '18 000 ₸ / месяц',
    },
    qrLabel: 'QR для оплаты общежития',
  },
  {
    id: 'services',
    title: 'Прочие услуги',
    subtitle: 'Справки, дубликаты, дополнительные услуги',
    icon: Wrench,
    color: '#7EC8E3',
    bg: 'rgba(126,200,227,0.1)',
    border: 'rgba(126,200,227,0.25)',
    details: {
      bank: 'АО «Народный Банк Казахстана»',
      bik: 'HSBKKZKX',
      iin: '040240006700',
      kbe: '16',
      account: 'KZ286010141000020611',
      purpose: 'Оплата за услуги, указать вид услуги, ФИО',
      amount: 'По прейскуранту',
    },
    qrLabel: 'QR для оплаты услуг',
  },
];

const QRPlaceholder: React.FC<{ label: string; color: string }> = ({ label, color }) => {
  // Pre-computed dot pattern for consistent rendering
  const dotPattern = [1,0,1,0,1,1,0,1,0,1,1,0,0,1,0,1,1,0,1,0,0,1,1,0,1];
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 200,
        aspectRatio: '1',
        background: '#fff',
        borderRadius: 16,
        padding: 12,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        position: 'relative',
      }}
    >
      {/* QR code pattern simulation */}
      <div style={{ width: '100%', aspectRatio: '1', position: 'relative' }}>
        {/* Corner squares */}
        {[
          { top: 0, left: 0 },
          { top: 0, right: 0 },
          { bottom: 0, left: 0 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '28%',
              aspectRatio: '1',
              border: `3px solid ${color}`,
              borderRadius: 4,
              ...pos,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '55%', aspectRatio: '1', background: color, borderRadius: 2 }} />
          </div>
        ))}
        {/* Center dots */}
        <div style={{ position: 'absolute', inset: '35%', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2 }}>
          {dotPattern.map((on, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                aspectRatio: '1',
                background: on ? color : 'transparent',
                borderRadius: 1,
              }}
            />
          ))}
        </div>
        {/* Center AUES logo */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 36,
            height: 36,
            background: '#fff',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <QrCode size={20} style={{ color }} />
        </div>
      </div>
    </div>
  );
};

export const PaymentPage: React.FC = () => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>('tuition');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAll = (cat: typeof paymentCategories[0]) => {
    const text = Object.entries(cat.details)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    handleCopy(text, `all-${cat.id}`);
  };

  return (
    <Layout title="Оплата" showBack>
      <div className="max-w-2xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1.75rem', marginBottom: 8 }}>
            Оплата
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              background: 'rgba(127,184,160,0.08)',
              border: '1px solid rgba(127,184,160,0.2)',
              borderRadius: 12,
              padding: '0.875rem 1rem',
            }}
          >
            <Info size={16} style={{ color: '#7FB8A0', flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)', lineHeight: 1.55 }}>
              При оплате обязательно укажите в назначении платежа ФИО студента и факультет.
              Сохраняйте квитанции об оплате.
            </p>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-col gap-3">
          {paymentCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isExpanded = expandedId === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                style={{
                  background: 'var(--app-card)',
                  border: `1px solid ${isExpanded ? cat.border : 'var(--app-border)'}`,
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'border-color 0.3s',
                }}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: cat.bg,
                      border: `1px solid ${cat.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} style={{ color: cat.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--app-text-strong)', fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>
                      {cat.title}
                    </div>
                    <div style={{ color: 'var(--app-text-muted)', fontSize: '0.875rem' }}>{cat.subtitle}</div>
                  </div>
                  <div style={{ color: 'var(--app-icon-muted)', flexShrink: 0 }}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 1.25rem 1.5rem' }}>
                        {/* QR Code */}
                        <div
                          style={{
                            background: 'var(--app-bg-soft)',
                            border: '1px solid var(--app-border)',
                            borderRadius: 16,
                            padding: '1.5rem 1rem',
                            marginBottom: '1rem',
                          }}
                        >
                          <p style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', fontWeight: 600, textAlign: 'center', marginBottom: '1rem' }}>
                            {cat.qrLabel}
                          </p>
                          <QRPlaceholder label={cat.qrLabel} color={cat.color} />

                          {/* QR actions */}
                          <div className="flex gap-2" style={{ marginTop: '1rem' }}>
                            <button
                              style={{
                                flex: 1,
                                padding: '0.625rem',
                                borderRadius: 12,
                                border: `1px solid ${cat.border}`,
                                background: cat.bg,
                                color: cat.color,
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                transition: 'all 0.2s',
                              }}
                            >
                              <Download size={14} /> {t('downloadQR')}
                            </button>
                          </div>
                        </div>

                        {/* Requisites */}
                        <div
                          style={{
                            background: 'var(--app-bg-soft)',
                            border: '1px solid var(--app-border)',
                            borderRadius: 16,
                            overflow: 'hidden',
                            marginBottom: '0.75rem',
                          }}
                        >
                          <div
                            style={{
                              padding: '0.75rem 1rem',
                              borderBottom: '1px solid var(--app-border)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            <Building size={14} style={{ color: cat.color }} />
                            <span style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', fontWeight: 600 }}>
                              БАНК��ВСКИЕ РЕКВИЗИТЫ
                            </span>
                          </div>
                          {Object.entries(cat.details).map(([key, value]) => {
                            const fieldLabels: Record<string, string> = {
                              bank: 'Банк',
                              bik: 'БИК',
                              iin: 'ИИН/БИН',
                              kbe: 'КБЕ',
                              account: 'IBAN/Счёт',
                              purpose: 'Назначение платежа',
                              amount: 'Сумма',
                            };
                            const isCopied = copiedField === `${cat.id}-${key}`;
                            return (
                              <div
                                key={key}
                                style={{
                                  padding: '0.7rem 1rem',
                                  borderBottom: '1px solid var(--app-border)',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'flex-start',
                                  gap: 10,
                                }}
                              >
                                <span style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', flexShrink: 0 }}>
                                  {fieldLabels[key] || key}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span style={{ fontSize: '0.875rem', color: 'var(--app-text)', textAlign: 'right', wordBreak: 'break-all' }}>
                                    {value}
                                  </span>
                                  <button
                                    onClick={() => handleCopy(value, `${cat.id}-${key}`)}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                      color: isCopied ? cat.color : 'var(--app-icon-muted)',
                                      padding: 2,
                                      flexShrink: 0,
                                      transition: 'color 0.2s',
                                    }}
                                  >
                                    {isCopied ? <Check size={13} /> : <Copy size={13} />}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Copy all */}
                        <button
                          onClick={() => handleCopyAll(cat)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 12,
                            border: '1px solid var(--app-control-border)',
                            background: copiedField === `all-${cat.id}` ? 'rgba(127,184,160,0.1)' : 'transparent',
                            color: copiedField === `all-${cat.id}` ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            transition: 'all 0.2s',
                          }}
                        >
                          {copiedField === `all-${cat.id}` ? (
                            <><Check size={14} /> Реквизиты скопированы</>
                          ) : (
                            <><Copy size={14} /> {t('copyDetails')}</>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'var(--app-bg-soft)',
            border: '1px solid var(--app-border)',
            borderRadius: 14,
            fontSize: '0.875rem',
            color: 'var(--app-text-soft)',
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          По вопросам оплаты обращайтесь в бухгалтерию: <br />
          <span style={{ color: 'var(--brand-mint-strong)' }}>buh@aues.kz</span> · +7 (727) 292-07-60 доб. 1100
        </motion.div>
      </div>
    </Layout>
  );
};
