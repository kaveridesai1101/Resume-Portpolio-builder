import { useState } from 'react';
import { Target, Sparkles, Building2, TrendingUp } from 'lucide-react';
import useResumeStore from '../../store/resumeStore';
import { generateAllAIContent } from '../../lib/mockAI';
import toast from 'react-hot-toast';

const JOB_ROLES = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Data Scientist', 'ML Engineer', 'DevOps Engineer',
  'Product Manager', 'UI/UX Designer', 'Mobile Developer', 'Cloud Architect',
];

const COMPANY_TYPES = [
  'FAANG / Big Tech', 'Growth-Stage Startup', 'Early-Stage Startup',
  'Enterprise / MNC', 'Consulting / Agency', 'Government / PSU', 'Remote / Global',
];

export default function RoleSelection() {
  const { formData, aiContent, updateFormData, setAIContent, setIsGenerating, isGenerating, prevStep } = useResumeStore();
  const [role, setRole] = useState(formData.jobRole || '');
  const [level, setLevel] = useState(formData.experienceLevel || '');
  const [companyType, setCompanyType] = useState(formData.targetCompanyType || '');
  const [progress, setProgress] = useState('');

  const handleGenerate = async () => {
    if (!role || !level) {
      toast.error('Please select a job role and experience level');
      return;
    }

    updateFormData({ jobRole: role, experienceLevel: level, targetCompanyType: companyType });
    setIsGenerating(true);

    try {
      const result = await generateAllAIContent(
        { formData: { ...formData, jobRole: role, experienceLevel: level } },
        ({ message }) => setProgress(message)
      );
      setAIContent(result);
      toast.success('AI content generated! ✨');
    } catch (err) {
      toast.error('AI generation failed. Please retry.');
    } finally {
      setIsGenerating(false);
      setProgress('');
    }
  };

  const hasContent = Boolean(aiContent.careerObjective);

  const levelOptions = [
    { label: 'Fresher', desc: '0–1 year', color: '#10b981' },
    { label: 'Junior', desc: '1–3 years', color: '#3b82f6' },
    { label: 'Mid', desc: '3–5 years', color: '#f59e0b' },
    { label: 'Senior', desc: '5+ years', color: '#ec4899' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Target Role & AI Generation</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Tell us your career goals, then let AI craft your personalized resume content.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Job Role */}
        <div>
          <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={14} /> Target Job Role *
          </label>
          <select className="input" value={role} onChange={(e) => setRole(e.target.value)}
            style={{ cursor: 'pointer' }}>
            <option value="">Select a role…</option>
            {JOB_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={14} /> Experience Level *
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {levelOptions.map((opt) => (
              <button key={opt.label} onClick={() => setLevel(opt.label)} style={{
                padding: '12px 8px', borderRadius: 10, cursor: 'pointer',
                border: `2px solid ${level === opt.label ? opt.color : 'var(--border)'}`,
                background: level === opt.label ? `rgba(${opt.color === '#10b981' ? '16,185,129' : opt.color === '#3b82f6' ? '59,130,246' : opt.color === '#f59e0b' ? '245,158,11' : '236,72,153'},0.1)` : 'var(--bg-card)',
                transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: level === opt.label ? opt.color : 'var(--text-primary)' }}>{opt.label}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Company Type */}
        <div>
          <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Building2 size={14} /> Target Company Type
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {COMPANY_TYPES.map((type) => (
              <button key={type} onClick={() => setCompanyType(companyType === type ? '' : type)} style={{
                padding: '7px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
                border: `1px solid ${companyType === type ? 'var(--accent-blue)' : 'var(--border)'}`,
                background: companyType === type ? 'rgba(59,130,246,0.12)' : 'var(--bg-card)',
                color: companyType === type ? '#60a5fa' : 'var(--text-secondary)',
                transition: 'all 0.15s ease',
              }}>
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* AI Generate Button */}
        <div style={{
          padding: 24, borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.1))',
          border: '1px solid rgba(124,58,237,0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 15 }}>AI Content Generation</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                Generates career objective, project rewrites, experience bullets & skill recommendations in parallel.
              </p>
            </div>
          </div>

          {progress && (
            <p style={{ fontSize: 13, color: '#a855f7', marginBottom: 10 }}>⚡ {progress}</p>
          )}

          {hasContent && !isGenerating && (
            <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', marginBottom: 10 }}>
              <p style={{ fontSize: 13, color: '#34d399', fontWeight: 600 }}>✓ AI content ready! Head to the dashboard to preview.</p>
            </div>
          )}

          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            onClick={handleGenerate}
            disabled={isGenerating || !role || !level}
          >
            {isGenerating ? (
              <>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                Generating AI Content…
              </>
            ) : hasContent ? (
              <><Sparkles size={16} /> Regenerate with AI</>
            ) : (
              <><Sparkles size={16} /> Generate AI Resume Content</>
            )}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        <button className="btn btn-ghost btn-lg" onClick={prevStep}>← Back</button>
        {hasContent && (
          <a href="/dashboard" className="btn btn-primary btn-lg">View Dashboard →</a>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
