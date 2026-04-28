import { useState } from 'react';
import { Plus, Trash2, FolderGit2, ExternalLink } from 'lucide-react';
import useResumeStore from '../../store/resumeStore';

const emptyProject = () => ({ id: Date.now(), name: '', description: '', techStack: '', link: '' });

export default function Projects() {
  const { formData, updateFormData, nextStep, prevStep } = useResumeStore();
  const [projects, setProjects] = useState(
    formData.projects?.length ? formData.projects : [emptyProject()]
  );

  const update = (id, field, value) =>
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  const add = () => setProjects((prev) => [...prev, emptyProject()]);
  const remove = (id) => setProjects((prev) => prev.filter((p) => p.id !== id));

  const handleNext = () => {
    updateFormData({ projects });
    nextStep();
  };

  const colors = ['rgba(124,58,237,0.15)', 'rgba(59,130,246,0.15)', 'rgba(16,185,129,0.15)', 'rgba(236,72,153,0.15)'];
  const iconColors = ['#a855f7', '#60a5fa', '#34d399', '#f472b6'];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Projects</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Showcase your best work. The AI will rewrite these using the STAR method.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {projects.map((proj, idx) => (
          <div key={proj.id} className="card" style={{ borderLeft: `3px solid ${iconColors[idx % iconColors.length]}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: colors[idx % colors.length], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FolderGit2 size={16} color={iconColors[idx % iconColors.length]} />
                </div>
                <span style={{ fontWeight: 600 }}>Project {idx + 1}</span>
              </div>
              {projects.length > 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => remove(proj.id)} style={{ color: '#ef4444' }}>
                  <Trash2 size={15} />
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="label">Project Name *</label>
                <input className="input" placeholder="e.g. Real-time Chat App"
                  value={proj.name} onChange={(e) => update(proj.id, 'name', e.target.value)} />
              </div>
              <div>
                <label className="label">Tech Stack</label>
                <input className="input" placeholder="React, Node.js, MongoDB…"
                  value={proj.techStack} onChange={(e) => update(proj.id, 'techStack', e.target.value)} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="label">Description *</label>
                <textarea className="input" rows={3} style={{ resize: 'vertical' }}
                  placeholder="Describe what you built, why, and the impact…"
                  value={proj.description} onChange={(e) => update(proj.id, 'description', e.target.value)} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="label">Live / GitHub Link</label>
                <div style={{ position: 'relative' }}>
                  <ExternalLink size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input className="input" style={{ paddingLeft: 36 }} placeholder="https://github.com/…"
                    value={proj.link} onChange={(e) => update(proj.id, 'link', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary" style={{ marginTop: 16, width: '100%' }} onClick={add}>
        <Plus size={16} /> Add Another Project
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        <button className="btn btn-ghost btn-lg" onClick={prevStep}>← Back</button>
        <button className="btn btn-primary btn-lg" onClick={handleNext}>Continue to Experience →</button>
      </div>
    </div>
  );
}
