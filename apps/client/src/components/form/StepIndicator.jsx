import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';

const STEPS = [
  { num: 1, label: 'Personal Info' },
  { num: 2, label: 'Education' },
  { num: 3, label: 'Skills' },
  { num: 4, label: 'Projects' },
  { num: 5, label: 'Experience' },
  { num: 6, label: 'Role & Goals' },
];

export default function StepIndicator({ currentStep, onStepClick }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {/* Desktop: horizontal bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }} className="step-bar">
        {STEPS.map((step, idx) => {
          const status = currentStep > step.num ? 'completed' : currentStep === step.num ? 'active' : 'pending';
          return (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: idx < STEPS.length - 1 ? 1 : 'none' }}>
              <button
                className="step-dot"
                data-status={status}
                onClick={() => onStepClick?.(step.num)}
                title={step.label}
                style={{
                  cursor: currentStep >= step.num ? 'pointer' : 'default',
                  background: status === 'active' ? 'linear-gradient(135deg,#7c3aed,#3b82f6)' : status === 'completed' ? 'var(--accent-green)' : 'var(--bg-card)',
                  color: status === 'pending' ? 'var(--text-muted)' : '#fff',
                  border: status === 'pending' ? '2px solid var(--border)' : 'none',
                  boxShadow: status === 'active' ? '0 0 20px rgba(124,58,237,0.5)' : 'none',
                  flexShrink: 0,
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, transition: 'all 0.3s ease',
                }}
              >
                {status === 'completed' ? <CheckCircle2 size={16} /> : step.num}
              </button>
              {idx < STEPS.length - 1 && (
                <div
                  className={`step-line ${status === 'completed' ? 'completed' : ''}`}
                  style={{
                    flex: 1, height: 2,
                    background: status === 'completed' ? 'var(--accent-green)' : 'var(--border)',
                    transition: 'background 0.3s ease',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step labels below */}
      <div style={{ display: 'flex', marginTop: 8, justifyContent: 'space-between' }}>
        {STEPS.map((step) => {
          const active = currentStep === step.num;
          return (
            <span
              key={step.num}
              style={{
                fontSize: 11, fontWeight: active ? 700 : 500,
                color: active ? 'var(--accent-purple-light)' : 'var(--text-muted)',
                textAlign: 'center',
                flex: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: '0 2px',
              }}
            >
              {step.label}
            </span>
          );
        })}
      </div>

      {/* Current step label (mobile) */}
      <div className="mobile-step-label" style={{ display: 'none', marginTop: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
          Step {currentStep} of {STEPS.length} — {STEPS[currentStep - 1].label}
        </span>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .step-bar span { display: none; }
          .mobile-step-label { display: block !important; }
        }
      `}</style>
    </div>
  );
}
