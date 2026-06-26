import React from 'react';
import { motion } from 'motion/react';

interface AIAvatarProps {
  size?: number;
  state?: 'idle' | 'listening' | 'thinking' | 'speaking';
  large?: boolean;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({ size = 200, state = 'idle', large = false }) => {
  const s = size;

  const glowColor =
    state === 'listening'
      ? 'rgba(var(--brand-mint-rgb),0.6)'
      : state === 'thinking'
      ? 'rgba(var(--brand-purple-rgb),0.6)'
      : state === 'speaking'
      ? 'rgba(var(--brand-mint-rgb),0.8)'
      : 'rgba(var(--brand-mint-rgb),0.3)';

  const innerColor =
    state === 'thinking'
      ? ['var(--brand-purple)', 'var(--brand-mint)']
      : ['var(--brand-mint)', 'var(--brand-purple)'];

  return (
    <div
      className="ai-avatar"
      style={{
        width: s,
        height: s,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer glow ring */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `1px solid rgba(var(--brand-mint-rgb),0.25)`,
          boxShadow: `0 0 ${s * 0.3}px ${glowColor}`,
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 1, 0.6],
          boxShadow: [
            `0 0 ${s * 0.2}px ${glowColor}`,
            `0 0 ${s * 0.5}px ${glowColor}`,
            `0 0 ${s * 0.2}px ${glowColor}`,
          ],
        }}
        transition={{ duration: state === 'listening' ? 1 : 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Middle ring */}
      <motion.div
        style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          borderRadius: '50%',
          border: `1px solid rgba(var(--brand-mint-rgb),0.15)`,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* Core orb */}
      <motion.div
        style={{
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${innerColor[0]}, ${innerColor[1]})`,
          boxShadow: `0 0 ${s * 0.15}px rgba(var(--brand-mint-rgb),0.4), inset 0 0 ${s * 0.1}px rgba(255,255,255,0.1)`,
          position: 'relative',
          overflow: 'hidden',
        }}
        animate={{
          scale: state === 'listening' ? [1, 1.1, 1] : [1, 1.04, 1],
        }}
        transition={{
          duration: state === 'listening' ? 0.8 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Inner shimmer */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '30%',
            height: '25%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            filter: 'blur(4px)',
          }}
          animate={{ opacity: [0.4, 0.9, 0.4], x: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Thinking spinner */}
        {state === 'thinking' && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: 'rgba(var(--brand-mint-rgb),0.8)',
              borderRightColor: 'rgba(var(--brand-mint-rgb),0.4)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </motion.div>

      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: s * 0.025,
            height: s * 0.025,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'var(--brand-mint)' : 'var(--brand-purple)',
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [0, Math.cos((i * 60 * Math.PI) / 180) * s * 0.45],
            y: [0, Math.sin((i * 60 * Math.PI) / 180) * s * 0.45],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
};

export const WaveformVisualizer: React.FC<{ active: boolean }> = ({ active }) => {
  const bars = 20;
  // Static heights for consistent animation
  const heightPattern = [8, 16, 28, 36, 24, 40, 32, 20, 44, 30, 36, 22, 38, 16, 28, 40, 18, 34, 26, 12];
  return (
    <div className="flex items-center gap-1" style={{ height: 48 }}>
      {[...Array(bars)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            width: 3,
            borderRadius: 2,
            background: `linear-gradient(to top, var(--brand-mint), var(--brand-purple))`,
            transformOrigin: 'bottom',
          }}
          animate={
            active
              ? {
                  height: [4, heightPattern[i], Math.round(heightPattern[i] * 0.6), heightPattern[(i + 5) % 20], 4],
                }
              : { height: 4 }
          }
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};
