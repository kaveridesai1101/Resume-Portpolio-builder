import { useState } from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import useResumeStore from '../../store/resumeStore';

const emptyExp = () => ({ id: Date.now(), company: '', role: '', duration: '', responsibilities: '' });

export default function Experience() {
  const { formData, updateFormData, nextStep, prevStep } = useResumeStore();
  const [experiences, setExperiences] = useState(
    formData.experience?.length ? formData.experience : [emptyExp()]
  );

  const update = (id, field, value) =>
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const add = () => setExperiences((prev) => [...prev, emptyExp()]);
  const remove = (id) => setExperiences((prev) => prev.filter((e) => e.id !== id));

  const handleNext = () => {
    updateFormData({ experience: experiences });
    nextStep();
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Work Experience</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          List your roles. The AI will transform responsibilities into powerful, quantified bullets.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={16} color="#60a5fa" />
                </div>
                <span style={{ fontWeight: 600 }}>
                  {exp.company && exp.role ? `${exp.role} @ ${exp.company}` : `Experience ${idx + 1}`}
                </span>
              </div>
              {experiences.length > 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => remove(exp.id)} style={{ color: '#ef4444' }}>
                  <Trash2 size={15} />
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="label">Company Name *</label>
                <input className="input" placeholder="e.g. Google"
                  value={exp.company} onChange={(e) => update(exp.id, 'company', e.target.value)} />
              </div>
              <div>
                <label className="label">Your Role *</label>
                <input className="input" placeholder="e.g. Software Engineer"
                  value={exp.role} onChange={(e) => update(exp.id, 'role', e.target.value)} />
              </div>
              <div>
                <label className="label">Duration</label>
                <input className="input" placeholder="Jan 2023 – Present"
                  value={exp.duration} onChange={(e) => update(exp.id, 'duration', e.target.value)} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="label">Key Responsibilities</label>
                <textarea className="input" rows={4} style={{ resize: 'vertical' }}
                  placeholder="Describe what you did day-to-day. The AI will turn these into impactful bullets with metrics…"
                  value={exp.responsibilities} onChange={(e) => update(exp.id, 'responsibilities', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary" style={{ marginTop: 16, width: '100%' }} onClick={add}>
        <Plus size={16} /> Add Another Role
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        <button className="btn btn-ghost btn-lg" onClick={prevStep}>← Back</button>
        <button className="btn btn-primary btn-lg" onClick={handleNext}>Continue to Role →</button>
      </div>
    </div>
  );
}
