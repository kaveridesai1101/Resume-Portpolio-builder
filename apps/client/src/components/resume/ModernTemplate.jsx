/** Modern Template — Two-column with sidebar, color accent */
export default function ModernTemplate({ formData, aiContent }) {
  const fd = formData || {};
  const ai = aiContent || {};
  const allSkills = [...(fd.skills || []), ...(ai.recommendedSkills || [])];
  const accent = '#2563eb';

  return (
    <div className="resume-modern" style={{
      width: '100%', minHeight: '297mm', display: 'flex',
      fontFamily: 'Inter, sans-serif', fontSize: 12,
    }}>
      {/* Sidebar */}
      <div style={{
        width: '32%', background: '#1e293b', color: '#e2e8f0',
        padding: '28px 20px', flexShrink: 0,
      }}>
        {/* Avatar */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent}, #7c3aed)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 16,
        }}>
          {(fd.fullName || 'Y')[0].toUpperCase()}
        </div>

        <h1 style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 4, lineHeight: 1.2 }}>
          {fd.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: 12, color: accent, fontWeight: 600, marginBottom: 20 }}>
          {fd.jobRole || 'Professional'}
        </p>

        {/* Contact */}
        <SideSection title="Contact" accent={accent}>
          {fd.email && <ContactLine label="Email" value={fd.email} />}
          {fd.phone && <ContactLine label="Phone" value={fd.phone} />}
          {fd.location && <ContactLine label="Location" value={fd.location} />}
          {fd.linkedin && <ContactLine label="LinkedIn" value={fd.linkedin} />}
          {fd.github && <ContactLine label="GitHub" value={fd.github} />}
          {fd.portfolio && <ContactLine label="Portfolio" value={fd.portfolio} />}
        </SideSection>

        {/* Skills */}
        {allSkills.length > 0 && (
          <SideSection title="Skills" accent={accent}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {allSkills.map((s, i) => (
                <span key={i} style={{
                  padding: '3px 9px', borderRadius: 12, fontSize: 11,
                  background: 'rgba(37,99,235,0.2)', color: '#93c5fd',
                  border: '1px solid rgba(37,99,235,0.3)',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </SideSection>
        )}

        {/* Education */}
        {(fd.education || []).some(e => e.institution) && (
          <SideSection title="Education" accent={accent}>
            {(fd.education || []).map((edu, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <p style={{ fontWeight: 600, fontSize: 12, color: '#e2e8f0' }}>{edu.degree}</p>
                <p style={{ fontSize: 11, color: '#94a3b8' }}>{edu.institution}</p>
                <p style={{ fontSize: 11, color: '#64748b' }}>{edu.year}{edu.gpa ? ` · ${edu.gpa}` : ''}</p>
              </div>
            ))}
          </SideSection>
        )}

        {fd.certifications && (
          <SideSection title="Certifications" accent={accent}>
            <p style={{ fontSize: 11, color: '#94a3b8' }}>{fd.certifications}</p>
          </SideSection>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '28px 28px', background: '#fff', color: '#1e293b' }}>
        {/* Career Objective */}
        {ai.careerObjective && (
          <MainSection title="Professional Summary" accent={accent}>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 12.5 }}>{ai.careerObjective}</p>
          </MainSection>
        )}

        {/* Experience */}
        {(fd.experience || []).some(e => e.company) && (
          <MainSection title="Experience" accent={accent}>
            {(ai.enhancedExperience?.length ? ai.enhancedExperience : fd.experience).map((exp, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: '#1e293b' }}>{exp.role}</p>
                    <p style={{ fontSize: 12, color: accent, fontWeight: 600 }}>{exp.company}</p>
                  </div>
                  <span style={{
                    fontSize: 11, color: '#64748b', background: '#f1f5f9',
                    padding: '2px 8px', borderRadius: 12, whiteSpace: 'nowrap', height: 'fit-content',
                  }}>
                    {exp.duration}
                  </span>
                </div>
                {exp.enhancedBullets ? (
                  <ul style={{ paddingLeft: 16, marginTop: 6 }}>
                    {exp.enhancedBullets.map((b, bi) => (
                      <li key={bi} style={{ color: '#475569', marginBottom: 3, lineHeight: 1.5 }}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#475569', marginTop: 4 }}>{exp.responsibilities}</p>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {(fd.projects || []).some(p => p.name) && (
          <MainSection title="Projects" accent={accent}>
            {(ai.enhancedProjects?.length ? ai.enhancedProjects : fd.projects).map((proj, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ fontWeight: 700, fontSize: 13 }}>{proj.name}</p>
                  {proj.link && <a href={proj.link} style={{ fontSize: 11, color: accent }}>{proj.link}</a>}
                </div>
                {proj.techStack && (
                  <p style={{ fontSize: 11, color: '#64748b', margin: '2px 0' }}>
                    <em>{proj.techStack}</em>
                  </p>
                )}
                {proj.enhancedBullets ? (
                  <ul style={{ paddingLeft: 16, marginTop: 4 }}>
                    {proj.enhancedBullets.map((b, bi) => (
                      <li key={bi} style={{ color: '#475569', marginBottom: 2 }}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#475569', marginTop: 4 }}>{proj.description}</p>
                )}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}

function SideSection({ title, accent, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: accent, marginBottom: 10, borderBottom: `1px solid rgba(37,99,235,0.3)`, paddingBottom: 4 }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function ContactLine({ label, value }) {
  return (
    <div style={{ marginBottom: 5 }}>
      <p style={{ fontSize: 10, color: '#64748b', fontWeight: 600, marginBottom: 1 }}>{label}</p>
      <p style={{ fontSize: 11, color: '#94a3b8', wordBreak: 'break-all' }}>{value}</p>
    </div>
  );
}

function MainSection({ title, accent, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ width: 4, height: 20, borderRadius: 2, background: accent }} />
        <h2 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 1 }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
