/** Creative Template — Full-width, timeline-style, gradient accent */
export default function CreativeTemplate({ formData, aiContent }) {
  const fd = formData || {};
  const ai = aiContent || {};
  const allSkills = [...(fd.skills || []), ...(ai.recommendedSkills || [])];

  return (
    <div className="resume-creative" style={{
      width: '100%', minHeight: '297mm',
      fontFamily: 'Outfit, sans-serif', fontSize: 13,
      background: '#fff', color: '#111',
    }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 60%, #06b6d4 100%)',
        padding: '40px 48px 32px', color: '#fff',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>
              {fd.fullName || 'Your Name'}
            </h1>
            <p style={{ fontSize: 16, fontWeight: 500, opacity: 0.88, marginTop: 4 }}>
              {fd.jobRole || 'Creative Professional'}
            </p>
          </div>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 800, backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.4)',
          }}>
            {(fd.fullName || 'Y')[0].toUpperCase()}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 16, fontSize: 12, opacity: 0.85 }}>
          {fd.email && <span>✉ {fd.email}</span>}
          {fd.phone && <span>📞 {fd.phone}</span>}
          {fd.location && <span>📍 {fd.location}</span>}
          {fd.linkedin && <span>🔗 {fd.linkedin}</span>}
          {fd.github && <span>⌨ {fd.github}</span>}
        </div>
      </div>

      <div style={{ padding: '24px 48px 32px' }}>
        {/* Summary */}
        {ai.careerObjective && (
          <CreativeSection title="About Me" color="#7c3aed">
            <p style={{ color: '#374151', lineHeight: 1.75, fontSize: 13 }}>{ai.careerObjective}</p>
          </CreativeSection>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <CreativeSection title="Tech Stack & Skills" color="#3b82f6">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {allSkills.map((s, i) => {
                const hues = ['#7c3aed', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
                const c = hues[i % hues.length];
                return (
                  <span key={i} style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                    background: `${c}18`, color: c, border: `1px solid ${c}40`,
                  }}>
                    {s}
                  </span>
                );
              })}
            </div>
          </CreativeSection>
        )}

        {/* Experience — timeline */}
        {(fd.experience || []).some(e => e.company) && (
          <CreativeSection title="Experience" color="#06b6d4">
            <div style={{ position: 'relative', paddingLeft: 24 }}>
              <div style={{ position: 'absolute', left: 7, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg,#7c3aed,#06b6d4)', borderRadius: 1 }} />
              {(ai.enhancedExperience?.length ? ai.enhancedExperience : fd.experience).map((exp, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
                  <div style={{
                    position: 'absolute', left: -21, top: 4,
                    width: 10, height: 10, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
                    border: '2px solid #fff', boxShadow: '0 0 0 2px #7c3aed',
                  }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 13.5 }}>{exp.role}</p>
                      <p style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: 11, color: '#9ca3af', fontStyle: 'italic' }}>{exp.duration}</span>
                  </div>
                  {exp.enhancedBullets ? (
                    <ul style={{ paddingLeft: 16, marginTop: 4, color: '#4b5563' }}>
                      {exp.enhancedBullets.map((b, bi) => <li key={bi} style={{ marginBottom: 2 }}>{b}</li>)}
                    </ul>
                  ) : (
                    <p style={{ color: '#4b5563', marginTop: 4 }}>{exp.responsibilities}</p>
                  )}
                </div>
              ))}
            </div>
          </CreativeSection>
        )}

        {/* Projects */}
        {(fd.projects || []).some(p => p.name) && (
          <CreativeSection title="Projects" color="#10b981">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {(ai.enhancedProjects?.length ? ai.enhancedProjects : fd.projects).map((proj, i) => (
                <div key={i} style={{
                  padding: '12px 16px', borderRadius: 10,
                  background: '#f8fafc', border: '1px solid #e2e8f0',
                }}>
                  <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{proj.name}</p>
                  {proj.techStack && (
                    <p style={{ fontSize: 11, color: '#6366f1', marginBottom: 6 }}>{proj.techStack}</p>
                  )}
                  {proj.enhancedBullets ? (
                    <ul style={{ paddingLeft: 14, margin: 0, color: '#4b5563', fontSize: 12 }}>
                      {proj.enhancedBullets.slice(0, 2).map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  ) : (
                    <p style={{ fontSize: 12, color: '#4b5563', margin: 0 }}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </CreativeSection>
        )}

        {/* Education */}
        {(fd.education || []).some(e => e.institution) && (
          <CreativeSection title="Education" color="#f59e0b">
            {(fd.education || []).map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <p style={{ fontWeight: 700 }}>{edu.degree}</p>
                  <p style={{ fontSize: 12, color: '#6b7280' }}>{edu.institution}{edu.gpa ? ` · ${edu.gpa}` : ''}</p>
                </div>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{edu.year}</span>
              </div>
            ))}
          </CreativeSection>
        )}
      </div>
    </div>
  );
}

function CreativeSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ width: 28, height: 3, borderRadius: 2, background: color }} />
        <h2 style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: '#111' }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
