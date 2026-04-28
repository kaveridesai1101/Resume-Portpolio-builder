import { useState } from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import useResumeStore from '../../store/resumeStore';

const emptyEdu = () => ({ id: Date.now(), degree: '', institution: '', year: '', gpa: '', relevant: '' });

export default function Education() {
  const { formData, updateFormData, nextStep, prevStep } = useResumeStore();
  const [entries, setEntries] = useState(
    formData.education?.length ? formData.education : [emptyEdu()]
  );

  const update = (id, field, value) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const add = () => setEntries((prev) => [...prev, emptyEdu()]);
  const remove = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const handleNext = () => {
    updateFormData({ education: entries });
    nextStep();
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Education</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Add your academic background — most recent first.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {entries.map((edu, idx) => (
          <div key={edu.id} className="card" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(124,58,237,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={16} color="#a855f7" />
                </div>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Education {idx + 1}</span>
              </div>
              {entries.length > 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => remove(edu.id)} style={{ color: '#ef4444' }}>
                  <Trash2 size={15} />
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="label">Degree / Qualification *</label>
                <input className="input" placeholder="e.g. B.Tech Computer Science"
                  value={edu.degree} onChange={(e) => update(edu.id, 'degree', e.target.value)} />
              </div>
              <div>
                <label className="label">Institution *</label>
                <input className="input" placeholder="University / College name"
                  value={edu.institution} onChange={(e) => update(edu.id, 'institution', e.target.value)} />
              </div>
              <div>
                <label className="label">Year of Graduation</label>
                <input className="input" placeholder="2024 or 2022–2026"
                  value={edu.year} onChange={(e) => update(edu.id, 'year', e.target.value)} />
              </div>
              <div>
                <label className="label">GPA / Percentage</label>
                <input className="input" placeholder="3.8/4.0 or 89%"
                  value={edu.gpa} onChange={(e) => update(edu.id, 'gpa', e.target.value)} />
              </div>
              <div>
                <label className="label">Relevant Coursework</label>
                <input className="input" placeholder="Data Structures, Algorithms, ML…"
                  value={edu.relevant} onChange={(e) => update(edu.id, 'relevant', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary" style={{ marginTop: 16, width: '100%' }} onClick={add}>
        <Plus size={16} /> Add Another Degree
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        <button className="btn btn-ghost btn-lg" onClick={prevStep}>← Back</button>
        <button className="btn btn-primary btn-lg" onClick={handleNext}>Continue to Skills →</button>
      </div>
    </div>
  );
}
