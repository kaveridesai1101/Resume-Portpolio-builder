/** Reusable Skeleton loader — pass width, height, and className */
export default function Skeleton({ width = '100%', height = 20, className = '', style = {} }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, ...style }}
    />
  );
}

/** Pre-built skeleton for resume card */
export function ResumeSkeleton() {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton height={28} width="60%" />
      <Skeleton height={14} />
      <Skeleton height={14} width="85%" />
      <Skeleton height={14} width="70%" />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Skeleton height={28} width={80} style={{ borderRadius: 20 }} />
        <Skeleton height={28} width={80} style={{ borderRadius: 20 }} />
        <Skeleton height={28} width={80} style={{ borderRadius: 20 }} />
      </div>
    </div>
  );
}

/** Generating AI content skeleton */
export function AIGeneratingSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['Career Objective', 'Project Descriptions', 'Experience Bullets', 'Skill Recommendations'].map((label) => (
        <div key={label} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="skeleton" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <Skeleton height={18} width={200} />
          </div>
          <Skeleton height={14} />
          <Skeleton height={14} width="90%" />
          <Skeleton height={14} width="75%" />
        </div>
      ))}
    </div>
  );
}
