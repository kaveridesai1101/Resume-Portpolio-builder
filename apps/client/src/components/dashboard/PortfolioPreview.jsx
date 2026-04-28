import React from 'react';

export default function PortfolioPreview({ formData, aiContent, theme }) {
  const fd = formData || {};
  const ai = aiContent || {};
  const skills = [...(fd.skills || []), ...(ai.recommendedSkills || [])];

  if (theme === 'developer') {
    return (
      <div style={{ width: '100%', height: '100%', background: '#0f172a', color: '#f1f5f9', fontFamily: 'Inter, sans-serif', padding: '40px', textAlign: 'left', overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '20px', marginBottom: '40px' }}>&lt;{fd.fullName || 'User'} /&gt;</div>
          <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '16px' }}>{fd.jobRole || 'Engineer'}</h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px' }}>{ai.careerObjective}</p>
          
          <h2 style={{ fontSize: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '24px' }}>Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
            {(fd.projects || []).map((p, i) => (
              <div key={i} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#38bdf8', marginBottom: '8px' }}>{p.name}</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>{p.description}</p>
              </div>
            ))}
          </div>
          
          <h2 style={{ fontSize: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '24px' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (theme === 'creative') {
    return (
      <div style={{ width: '100%', height: '100%', background: '#fafafa', color: '#1f2937', fontFamily: 'Outfit, sans-serif', padding: '60px', textAlign: 'left', overflowY: 'auto', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(244,114,182,0.1))', filter: 'blur(60px)', borderRadius: '50%' }}></div>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <p style={{ color: '#6366f1', fontWeight: 700, marginBottom: '8px' }}>HI, I'M {fd.fullName?.toUpperCase() || 'USER'}</p>
          <h1 style={{ fontSize: '64px', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, marginBottom: '24px' }}>{fd.jobRole || 'Creative'}</h1>
          <p style={{ fontSize: '20px', opacity: 0.7, marginBottom: '60px' }}>{ai.careerObjective}</p>
          
          <div style={{ background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
             <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px' }}>Selected Work</h2>
             {(fd.projects || []).map((p, i) => (
               <div key={i} style={{ borderTop: '1px solid #f1f5f9', padding: '24px 0' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{p.name}</h3>
                  <p style={{ opacity: 0.6 }}>{p.description}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  // Executive Minimal (Default)
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', color: '#1a1a1a', fontFamily: 'Inter, sans-serif', padding: '80px', textAlign: 'left', overflowY: 'auto' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '2px', color: '#666', marginBottom: '20px', textTransform: 'uppercase' }}>{fd.jobRole || 'Executive'}</div>
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '24px', fontFamily: 'serif' }}>{fd.fullName || 'User'}</h1>
        <p style={{ fontSize: '18px', lineHeight: 1.6, marginBottom: '60px', color: '#333' }}>{ai.careerObjective}</p>
        
        <div style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '32px', textTransform: 'lowercase', fontStyle: 'italic', fontFamily: 'serif' }}>experience</h2>
          {(fd.experience || []).map((e, i) => (
            <div key={i} style={{ marginBottom: '32px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>{e.company}</span>
                  <span style={{ color: '#888', fontSize: '14px' }}>{e.duration}</span>
               </div>
               <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#555' }}>{e.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
