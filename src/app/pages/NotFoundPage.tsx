import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Home, MessageSquare } from 'lucide-react';
import { Layout } from '../components/Layout';
import { AIAvatar } from '../components/AIAvatar';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ minHeight: 'calc(100vh - 120px)', padding: '2rem', gap: '1.5rem' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AIAvatar size={160} state="thinking" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '2rem', marginBottom: 8 }}>
            404 — Страница не найдена
          </h1>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.95rem', maxWidth: 360 }}>
            Такой страницы не существует. Возможно, она была перемещена или адрес введён неверно.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3"
        >
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.875rem 1.5rem',
              background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))',
              border: 'none',
              borderRadius: 14,
              color: '#0F0F0F',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            <Home size={16} /> На главную
          </button>
          <button
            onClick={() => navigate('/chat')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.875rem 1.5rem',
              background: 'var(--app-control)',
              border: '1px solid var(--app-control-border)',
              borderRadius: 14,
              color: 'var(--app-text)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            <MessageSquare size={16} /> Спросить Energen
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};
