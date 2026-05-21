interface ProgressBarProps {
  current: number // 1-based current step
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100)
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'rgba(18,16,18,0.08)',
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: 'var(--color-primary)',
          transition: 'width 0.4s cubic-bezier(0.2,0.7,0.3,1)',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  )
}
