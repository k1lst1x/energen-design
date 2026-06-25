import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, X, Settings, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AIAvatar, WaveformVisualizer } from '../components/AIAvatar';
import { useLanguage } from '../context/LanguageContext';

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';

const stateLabels: Record<string, Record<VoiceState, string>> = {
  RU: {
    idle: 'Нажмите, чтобы говорить',
    listening: 'Слушаю...',
    thinking: 'Обрабатываю запрос...',
    speaking: 'Отвечаю...',
  },
  KZ: {
    idle: 'Сөйлеу үшін басыңыз',
    listening: 'Тыңдаудамын...',
    thinking: 'Сұранысты өңдеудемін...',
    speaking: 'Жауап беруде...',
  },
  EN: {
    idle: 'Tap to speak',
    listening: 'Listening...',
    thinking: 'Processing...',
    speaking: 'Responding...',
  },
};

const sampleResponses = [
  'Аудитория 301 находится на третьем этаже главного корпуса. Хотите, чтобы я показал маршрут?',
  'Ближайшее мероприятие — конференция по энергетике, 15 апреля. Регистрация открыта.',
  'Для записи к преподавателю перейдите в раздел «Сотрудники» и выберите нужного специалиста.',
];

export const VoicePage: React.FC = () => {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const labels = stateLabels[lang] || stateLabels.RU;

  const handleMicPress = async () => {
    if (voiceState === 'listening') {
      setVoiceState('thinking');
      await new Promise(r => setTimeout(r, 1500));
      setVoiceState('speaking');
      setResponse(sampleResponses[Math.floor(Math.random() * sampleResponses.length)]);
      await new Promise(r => setTimeout(r, 3000));
      setVoiceState('idle');
      setTranscript('');
      setResponse('');
    } else if (voiceState === 'idle') {
      setVoiceState('listening');
      setTranscript('');
      setResponse('');
      // Simulate transcript appearing
      const sampleTranscripts = [
        'Где находится аудитория 301?',
        'Какие мероприятия планируются?',
        'Как записаться на приём к декану?',
      ];
      let current = '';
      const full = sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)];
      let i = 0;
      const interval = setInterval(() => {
        if (i < full.length) {
          current += full[i];
          setTranscript(current);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 60);
    }
  };

  const stateColor: Record<VoiceState, string> = {
    idle: 'var(--brand-mint-strong)',
    listening: 'var(--brand-mint-strong)',
    thinking: 'var(--brand-purple)',
    speaking: 'var(--brand-mint-strong)',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--app-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            voiceState === 'listening'
              ? 'radial-gradient(ellipse at center, rgba(127,184,160,0.06) 0%, transparent 60%)'
              : voiceState === 'thinking'
              ? 'radial-gradient(ellipse at center, rgba(74,43,87,0.1) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at center, rgba(127,184,160,0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem',
        }}
      >
        {/* Logo text */}
        <div style={{ color: 'var(--brand-mint-strong)', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
          Energen
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'var(--app-control)',
              border: '1px solid var(--app-control-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--app-icon-muted)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--app-text-strong)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--app-icon-muted)'; }}
          >
            <Settings size={16} />
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'var(--app-control)',
              border: '1px solid var(--app-control-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--app-icon-muted)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--app-text-strong)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--app-icon-muted)'; }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center" style={{ gap: '2rem' }}>
        {/* Avatar */}
        <AIAvatar size={280} state={voiceState} />

        {/* State label */}
        <motion.div
          key={voiceState}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '1rem',
            color: stateColor[voiceState],
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          {labels[voiceState]}
        </motion.div>

        {/* Waveform */}
        <div style={{ height: 60, display: 'flex', alignItems: 'center' }}>
          <WaveformVisualizer active={voiceState === 'listening' || voiceState === 'speaking'} />
        </div>

        {/* Transcript / Response */}
        <AnimatePresence mode="wait">
          {(transcript || response) && (
            <motion.div
              key={transcript || response}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                maxWidth: 480,
                textAlign: 'center',
                padding: '1rem 1.5rem',
                background: response
                  ? 'rgba(127,184,160,0.1)'
                  : 'var(--app-card)',
                border: `1px solid ${response ? 'var(--app-border-strong)' : 'var(--app-border)'}`,
                borderRadius: 16,
                fontSize: '0.95rem',
                color: response ? 'var(--app-text)' : 'var(--app-text-muted)',
                lineHeight: 1.6,
              }}
            >
              {response && (
                <div className="flex items-center gap-2" style={{ marginBottom: 8, justifyContent: 'center' }}>
                  <Volume2 size={14} style={{ color: 'var(--brand-mint-strong)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-mint-strong)', fontWeight: 600 }}>Energen</span>
                </div>
              )}
              {transcript || response}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mic button */}
        <motion.button
          onClick={handleMicPress}
          whileTap={{ scale: 0.95 }}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background:
              voiceState === 'listening'
                ? 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))'
                : voiceState === 'thinking'
                ? 'rgba(74,43,87,0.5)'
                : 'rgba(127,184,160,0.12)',
            border:
              voiceState === 'listening'
                ? '2px solid rgba(127,184,160,0.6)'
                : '2px solid rgba(127,184,160,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: voiceState === 'thinking' || voiceState === 'speaking' ? 'not-allowed' : 'pointer',
            boxShadow:
              voiceState === 'listening'
                ? '0 0 40px rgba(127,184,160,0.4), 0 0 80px rgba(127,184,160,0.2)'
                : '0 0 20px rgba(127,184,160,0.1)',
            transition: 'all 0.3s ease',
            color: voiceState === 'listening' ? '#0F0F0F' : 'var(--brand-mint-strong)',
          }}
        >
          {voiceState === 'listening' ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <MicOff size={28} />
            </motion.div>
          ) : (
            <Mic size={28} />
          )}
        </motion.button>

        {voiceState === 'idle' && (
          <p style={{ fontSize: '0.78rem', color: 'var(--app-text-soft)', textAlign: 'center' }}>
            {lang === 'EN' ? 'Tap mic to start speaking' : lang === 'KZ' ? 'Сөйлеу үшін микрофонды басыңыз' : 'Нажмите на микрофон, чтобы начать'}
          </p>
        )}

        {voiceState === 'listening' && (
          <p style={{ fontSize: '0.78rem', color: 'var(--app-text-soft)', textAlign: 'center' }}>
            {lang === 'EN' ? 'Tap again to stop' : lang === 'KZ' ? 'Тоқтату үшін қайта басыңыз' : 'Нажмите снова, чтобы остановить'}
          </p>
        )}
      </div>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 280,
              background: 'var(--app-card)',
              borderLeft: '1px solid var(--app-border)',
              padding: '5rem 1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <h3 style={{ color: 'var(--app-text-strong)', fontWeight: 700, fontSize: '1.1rem' }}>Настройки</h3>
            {[
              { label: 'Язык голоса', value: 'Русский' },
              { label: 'Скорость речи', value: 'Нормальная' },
              { label: 'Голос', value: 'Energen v1' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: '0.75rem', color: 'var(--app-text-soft)', marginBottom: 4 }}>{item.label}</div>
                <div
                  style={{
                    background: 'var(--app-bg-soft)',
                    border: '1px solid var(--app-border)',
                    borderRadius: 10,
                    padding: '0.6rem 1rem',
                    color: 'var(--app-text)',
                    fontSize: '0.875rem',
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
