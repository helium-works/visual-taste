import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SelectableCardProps {
  selected: boolean
  onClick: () => void
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}

export default function SelectableCard({
  selected,
  onClick,
  children,
  className = '',
  style,
  disabled,
}: SelectableCardProps) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.2, 0.7, 0.3, 1] }}
      className={`selectable-card ${selected ? 'selected' : ''} ${className}`}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        userSelect: 'none',
        ...style,
      }}
    >
      {children}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </motion.div>
  )
}
