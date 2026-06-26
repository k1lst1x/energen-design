import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, DoorOpen, User, MapPin, ChevronRight, Bot } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

type MessageType = 'user' | 'ai' | 'card';

interface RoomCardMsg {
  type: 'room';
  room: string;
  dept: string;
  floor: string;
}

interface EmployeeCardMsg {
  type: 'employee';
  name: string;
  position: string;
  office: string;
}

interface Message {
  id: string;
  role: MessageType;
  text?: string;
  card?: RoomCardMsg | EmployeeCardMsg;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'ai',
    text: 'Здравствуйте! Я Energen — цифровой помощник АЭС. Чем могу помочь? Вы можете спросить меня об аудиториях, расписании, сотрудниках или мероприятиях.',
    timestamp: new Date(),
  },
];

const quickSuggestions = [
  'Где находится аудитория 301?',
  'Как записаться к декану?',
  'Когда ближайшее мероприятие?',
  'Как оплатить обучение?',
];

const aiResponses: Record<string, { text: string; card?: RoomCardMsg | EmployeeCardMsg }> = {
  default: { text: 'Понял ваш вопрос. Давайте я помогу вам найти нужную информацию. Уточните, пожалуйста, что именно вас интересует?' },
  '301': {
    text: 'Аудитория 301 находится на 3-м этаже главного корпуса. Вот карточка с подробной информацией:',
    card: { type: 'room', room: '301', dept: 'Кафедра информационных технологий', floor: '3-й этаж, Корпус A' },
  },
  'декан': {
    text: 'Для записи к декану вам нужно обратиться в деканат. Вот информация о сотруднике:',
    card: { type: 'employee', name: 'Нурланов Бауыржан Ерланович', position: 'Декан факультета IT', office: 'Каб. 205, Корпус A' },
  },
  'мероприяти': { text: 'Ближайшее мероприятие — "Международная конференция по энергетике ENERGY-2026" пройдет 15 апреля в главном актовом зале. Регистрация открыта.' },
  'оплат': { text: 'Для оплаты обучения вы можете воспользоваться QR-кодом или банковскими реквизитами на странице оплаты. Хотите, чтобы я перенаправил вас туда?' },
};

function getAIResponse(userMsg: string): { text: string; card?: RoomCardMsg | EmployeeCardMsg } {
  const lower = userMsg.toLowerCase();
  for (const [key, val] of Object.entries(aiResponses)) {
    if (key !== 'default' && lower.includes(key)) return val;
  }
  return aiResponses.default;
}

const RoomCardBubble: React.FC<{ card: RoomCardMsg; onNavigate: () => void }> = ({ card, onNavigate }) => (
  <div
    style={{
      background: 'var(--chat-ai-bg)',
      border: '1px solid var(--chat-ai-border)',
      borderRadius: 16,
      padding: '1rem',
      marginTop: 8,
      maxWidth: 280,
      boxShadow: '0 16px 45px var(--app-shadow)',
    }}
  >
    <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
      <div style={{ background: 'var(--app-nav-active)', borderRadius: 8, padding: 6 }}>
        <DoorOpen size={16} style={{ color: 'var(--brand-mint-strong)' }} />
      </div>
      <span style={{ fontSize: '0.875rem', color: 'var(--brand-mint-strong)', fontWeight: 600 }}>Аудитория</span>
    </div>
    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--app-text-strong)', lineHeight: 1, marginBottom: 4 }}>
      {card.room}
    </div>
    <div style={{ fontSize: '0.875rem', color: 'var(--app-text)', marginBottom: 4 }}>{card.dept}</div>
    <div className="flex items-center gap-1" style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)', marginBottom: 12 }}>
      <MapPin size={12} /> {card.floor}
    </div>
    <button
      onClick={onNavigate}
      style={{
        width: '100%',
        background: 'var(--app-nav-active)',
        border: '1px solid var(--app-border-strong)',
        borderRadius: 10,
        padding: '0.5rem',
        color: 'var(--brand-mint-strong)',
        fontSize: '0.875rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      Подробнее <ChevronRight size={14} />
    </button>
  </div>
);

const EmployeeCardBubble: React.FC<{ card: EmployeeCardMsg; onNavigate: () => void }> = ({ card, onNavigate }) => (
  <div
    style={{
      background: 'var(--chat-ai-bg)',
      border: '1px solid var(--chat-ai-border)',
      borderRadius: 16,
      padding: '1rem',
      marginTop: 8,
      maxWidth: 280,
      boxShadow: '0 16px 45px var(--app-shadow)',
    }}
  >
    <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--brand-purple), var(--brand-mint))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <User size={18} style={{ color: '#fff' }} />
      </div>
      <div>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--app-text-strong)' }}>{card.name}</div>
        <div style={{ fontSize: '0.875rem', color: '#9B7EC8' }}>{card.position}</div>
      </div>
    </div>
    <div className="flex items-center gap-1" style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)', marginBottom: 12 }}>
      <MapPin size={12} /> {card.office}
    </div>
    <button
      onClick={onNavigate}
      style={{
        width: '100%',
        background: 'rgba(var(--brand-purple-rgb),0.18)',
        border: '1px solid rgba(var(--brand-purple-rgb),0.28)',
        borderRadius: 10,
        padding: '0.5rem',
        color: '#9B7EC8',
        fontSize: '0.875rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      Записаться на приём <ChevronRight size={14} />
    </button>
  </div>
);

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setShowSuggestions(false);
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    await new Promise(r => setTimeout(r, 1200));
    const response = getAIResponse(text);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: response.text,
      card: response.card,
      timestamp: new Date(),
    };
    setIsThinking(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  const handleSend = () => sendMessage(input);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout title="Чат с Energen" showBack>
      <div
        className="chat-shell"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px)',
          position: 'relative',
          background: 'var(--app-bg)',
        }}
      >
        {/* Messages */}
        <div
          className="chat-messages"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem 1rem',
            paddingBottom: '7rem',
          }}
        >
          <div className="max-w-2xl mx-auto">
            <AnimatePresence initial={false}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    gap: 10,
                    marginBottom: '1.25rem',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Avatar */}
                  {msg.role === 'ai' && (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-purple))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <Bot size={16} style={{ color: '#fff' }} />
                    </div>
                  )}

                  <div className="chat-bubble" style={{ maxWidth: '75%' }}>
                    {msg.text && (
                      <div
                        style={{
                          background:
                            msg.role === 'user'
                              ? 'var(--chat-user-bg)'
                              : 'var(--chat-ai-bg)',
                          border:
                            msg.role === 'user'
                              ? '1px solid var(--chat-user-border)'
                              : '1px solid var(--chat-ai-border)',
                          borderRadius:
                            msg.role === 'user'
                              ? '20px 20px 6px 20px'
                              : '20px 20px 20px 6px',
                          padding: '0.75rem 1rem',
                          fontSize: '0.9rem',
                          color: msg.role === 'user' ? 'var(--chat-user-text)' : 'var(--app-text-strong)',
                          lineHeight: 1.55,
                          boxShadow: msg.role === 'user' ? 'none' : '0 10px 30px var(--app-shadow)',
                        }}
                      >
                        {msg.text}
                      </div>
                    )}

                    {/* Card */}
                    {msg.card?.type === 'room' && (
                      <RoomCardBubble
                        card={msg.card as RoomCardMsg}
                        onNavigate={() => navigate('/room')}
                      />
                    )}
                    {msg.card?.type === 'employee' && (
                      <EmployeeCardBubble
                        card={msg.card as EmployeeCardMsg}
                        onNavigate={() => navigate('/appointment')}
                      />
                    )}

                    <div
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--app-text-soft)',
                        marginTop: 4,
                        textAlign: msg.role === 'user' ? 'right' : 'left',
                      }}
                    >
                      {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Thinking indicator */}
              {isThinking && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                  style={{ marginBottom: '1.25rem' }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-purple))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Bot size={16} style={{ color: '#fff' }} />
                  </div>
                  <div
                    style={{
                      background: 'var(--chat-ai-bg)',
                      border: '1px solid var(--chat-ai-border)',
                      borderRadius: '20px 20px 20px 6px',
                      padding: '0.875rem 1.125rem',
                      display: 'flex',
                      gap: 5,
                      alignItems: 'center',
                    }}
                  >
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--brand-mint-strong)' }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick suggestions */}
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ marginTop: '1rem' }}
              >
                <p style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', marginBottom: '0.6rem' }}>
                  Попробуйте спросить:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      style={{
                        background: 'var(--app-nav-active)',
                        border: '1px solid var(--app-border-strong)',
                        borderRadius: 20,
                        padding: '0.45rem 0.875rem',
                        fontSize: '0.875rem',
                        color: 'var(--brand-mint-strong)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--app-surface-hover)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'var(--app-nav-active)';
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input bar */}
        <div
          className="chat-composer"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'var(--app-header)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--app-border)',
            padding: '1rem',
            zIndex: 40,
          }}
        >
          <div className="chat-composer-inner max-w-2xl mx-auto flex items-center gap-3">
            <button
              onClick={() => navigate('/voice')}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--app-nav-active)',
                border: '1px solid var(--app-border-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s',
                color: 'var(--brand-mint-strong)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--app-surface-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--app-nav-active)';
              }}
            >
              <Mic size={18} />
            </button>

            <div
              style={{
                flex: 1,
                background: 'var(--app-input-bg)',
                border: '1px solid var(--app-input-border)',
                borderRadius: 24,
                display: 'flex',
                alignItems: 'center',
                padding: '0 1rem',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--app-border-strong)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--app-input-border)')}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('askQuestion')}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--app-text)',
                  fontSize: '0.9rem',
                  padding: '0.75rem 0',
                }}
              />
            </div>

            <button
              onClick={handleSend}
              disabled={!input.trim() || isThinking}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: input.trim() ? 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))' : 'var(--app-disabled-bg)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                flexShrink: 0,
                transition: 'all 0.2s',
                color: input.trim() ? '#0F0F0F' : 'var(--app-disabled-text)',
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
