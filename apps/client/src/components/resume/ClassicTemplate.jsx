/** Classic Template — Single column, ATS-safe, serif headings */
export default function ClassicTemplate({ formData, aiContent }) {
  const fd = formData || {};
  const ai = aiContent || {};
  const allSkills = [...(fd.skills || []), ...(ai.recommendedSkills || [])];

  return (
    <div className="resume-classic" style={{
      width: '100%', minHeight: '297mm',
      padding: '32px 40px', fontSize: 13,
      lineHeight: 1.6, fontFamily: '"Playfair Display", Georgia, serif',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #1a1a1a', paddingBottom: 16, marginBottom: 16 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: 2, textTransform: 'uppercase' }}>
          {fd.fullName || 'Your Name'}
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#555', marginTop: 6, letterSpacing: 0.5 }}>
          {[fd.email, fd.phone, fd.location].filter(Boolean).join('  |  ')}
        </p>
        {(fd.linkedin || fd.github || fd.portfolio) && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#666', marginTop: 3 }}>
            {[fd.linkedin, fd.github, fd.portfolio].filter(Boolean).join('  |  ')}
          </p>
        )}
      </div>

      {/* Career Objective */}
      {ai.careerObjective && (
        <Section title="Professional Summary">
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#333', textAlign: 'justify' }}>
            {ai.careerObjective}
          </p>
        </Section>
      )}

      {/* Experience */}
      {(fd.experience || []).some(e => e.company) && (
        <Section title="Work Experience">
          {(ai.enhancedExperience?.length ? ai.enhancedExperience : fd.experience || []).map((exp, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 13.5 }}>{exp.role || exp.title}</strong>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#666' }}>{exp.duration}</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#555', fontStyle: 'italic', margin: '2px 0 6px' }}>
                {exp.company}
              </p>
              {exp.enhancedBullets ? (
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {exp.enhancedBullets.map((b, bi) => (
                    <li key={bi} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#333', marginBottom: 3 }}>{b}</li>
                  ))}
                </ul>
              ) : exp.responsibilities ? (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#333', margin: 0 }}>{exp.responsibilities}</p>
              ) : null}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {(fd.education || []).some(e => e.institution) && (
        <Section title="Education">
          {(fd.education || []).map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <strong style={{ fontSize: 13 }}>{edu.degree}</strong>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#555', margin: '2px 0' }}>
                  {edu.institution}{edu.gpa ? ` — GPA: ${edu.gpa}` : ''}
                </p>
                {edu.relevant && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#777', margin: 0 }}>
                    Relevant: {edu.relevant}
                  </p>
                )}
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#666', whiteSpace: 'nowrap' }}>{edu.year}</span>
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {(fd.projects || []).some(p => p.name) && (
        <Section title="Projects">
          {(ai.enhancedProjects?.length ? ai.enhancedProjects : fd.projects || []).map((proj, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 13 }}>{proj.name}</strong>
                {proj.link && <a href={proj.link} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#0066cc' }}>{proj.link}</a>}
              </div>
              {proj.techStack && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#666', margin: '2px 0', fontStyle: 'italic' }}>
                  Tech: {proj.techStack}
                </p>
              )}
              {proj.enhancedBullets ? (
                <ul style={{ paddingLeft: 18, margin: '4px 0 0' }}>
                  {proj.enhancedBullets.map((b, bi) => (
                    <li key={bi} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#333', marginBottom: 2 }}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#333', margin: '4px 0 0' }}>{proj.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <Section title="Skills">
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#333' }}>
            {allSkills.join(' • ')}
          </p>
        </Section>
      )}

      {/* Certifications */}
      {fd.certifications && (
        <Section title="Certifications">
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#333' }}>{fd.certifications}</p>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{
        fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 2, borderBottom: '1px solid #ccc',
        paddingBottom: 4, marginBottom: 10, color: '#1a1a1a',
        fontFamily: '"Playfair Display", Georgia, serif',
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
