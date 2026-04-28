import { useState } from 'react';
import { Plus, X, Zap } from 'lucide-react';
import useResumeStore from '../../store/resumeStore';

const SUGGESTED_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'Go',
  'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Git',
  'GraphQL', 'REST API', 'CI/CD', 'Agile/Scrum', 'TensorFlow', 'PyTorch',
  'Next.js', 'Vue.js', 'Angular', 'Spring Boot', 'FastAPI', 'Django',
];

export default function Skills() {
  const { formData, updateFormData, nextStep, prevStep } = useResumeStore();
  const [skills, setSkills] = useState(formData.skills || []);
  const [input, setInput] = useState('');

  const addSkill = (skill) => {
    const s = skill.trim();
    if (s && !skills.includes(s)) setSkills((prev) => [...prev, s]);
  };

  const removeSkill = (skill) => setSkills((prev) => prev.filter((s) => s !== skill));

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      addSkill(input);
      setInput('');
    }
  };

  const handleNext = () => {
    updateFormData({ skills, certifications: formData.certifications });
    nextStep();
  };

  const unselected = SUGGESTED_SKILLS.filter((s) => !skills.includes(s));

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Skills & Technologies</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Add your technical and professional skills. The AI will suggest additional ones.
        </p>
      </div>

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label className="label">Add Skills (press Enter or comma to add)</label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="input"
            placeholder="Type a skill and press Enter…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-secondary" onClick={() => { addSkill(input); setInput(''); }}>
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Skill chips */}
      {skills.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <label className="label">Your Skills ({skills.length})</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((skill) => (
              <div key={skill} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 20,
                background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
                color: '#a855f7', fontSize: 13, fontWeight: 600,
              }}>
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Zap size={14} color="#f59e0b" />
          <label className="label" style={{ margin: 0 }}>Quick Add (click to add)</label>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {unselected.slice(0, 18).map((skill) => (
            <button key={skill} onClick={() => addSkill(skill)} style={{
              padding: '5px 12px', borderRadius: 16, fontSize: 13,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
              onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent-purple)'; e.target.style.color = '#a855f7'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-secondary)'; }}
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <label className="label">Certifications (optional)</label>
        <textarea
          className="input"
          rows={3}
          placeholder="e.g. AWS Certified Solutions Architect, Google Cloud Professional, …"
          value={formData.certifications || ''}
          onChange={(e) => updateFormData({ certifications: e.target.value })}
          style={{ resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        <button className="btn btn-ghost btn-lg" onClick={prevStep}>← Back</button>
        <button className="btn btn-primary btn-lg" onClick={handleNext}>Continue to Projects →</button>
      </div>
    </div>
  );
}
