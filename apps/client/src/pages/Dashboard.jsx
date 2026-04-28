import { useState, useEffect } from 'react';
import useResumeStore from '../store/resumeStore';
import Navbar from '../components/layout/Navbar';
import ClassicTemplate from '../components/resume/ClassicTemplate';
import ModernTemplate from '../components/resume/ModernTemplate';
import CreativeTemplate from '../components/resume/CreativeTemplate';
import { scoreResume } from '../lib/mockAI';
import { 
  Download, ExternalLink, Edit3, Sparkles, 
  Share2, ShieldCheck, AlertCircle, CheckCircle2,
  Eye, FileText, Layout
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import PortfolioPreview from '../components/dashboard/PortfolioPreview';

export default function Dashboard() {
  const { formData, aiContent, setAtsScore } = useResumeStore();
  const [isScoring, setIsScoring] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedPortfolioTheme, setSelectedPortfolioTheme] = useState('developer');
  const [activeView, setActiveView] = useState('resume'); // 'resume' | 'portfolio'

  const handleScore = async () => {
    setIsScoring(true);
    try {
      const result = await scoreResume({ formData, aiContent });
      setAtsScore(result.score, result.feedback, result.keywordsMissing, result.strengths);
      toast.success('ATS Scan Complete! 🚀');
    } catch (err) {
      toast.error('ATS Scoring failed.');
    } finally {
      setIsScoring(false);
    }
  };

  const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
  };

  const ActiveTemplate = templates[selectedTemplate] || ClassicTemplate;

  return (
    <div className="noise" style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <Navbar />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 0, height: 'calc(100vh - 64px)' }}>
        
        {/* Left: Previews */}
        <div style={{ overflowY: 'auto', padding: '40px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* View Toggle */}
          <div className="glass" style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 12, marginBottom: 32 }}>
            <button 
              onClick={() => setActiveView('resume')}
              className={`btn btn-sm ${activeView === 'resume' ? 'btn-primary' : 'btn-ghost'}`}
            >
              <FileText size={14} /> Resume Preview
            </button>
            <button 
              onClick={() => setActiveView('portfolio')}
              className={`btn btn-sm ${activeView === 'portfolio' ? 'btn-primary' : 'btn-ghost'}`}
            >
              <Layout size={14} /> Portfolio Preview
            </button>
          </div>

          {activeView === 'resume' ? (
            <div className="glow-purple" style={{ 
              width: '210mm', minHeight: '297mm', background: '#fff', 
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)', borderRadius: 4, overflow: 'hidden',
              transform: 'scale(0.85)', transformOrigin: 'top center',
              transition: 'all 0.3s ease'
            }}>
               <ActiveTemplate formData={formData} aiContent={aiContent} />
            </div>
          ) : (
             <div className="glow-purple" style={{ 
               width: '100%', height: '80vh', background: '#fff', 
               boxShadow: '0 20px 60px rgba(0,0,0,0.5)', borderRadius: 12, overflow: 'hidden',
               transition: 'all 0.3s ease'
             }}>
                <PortfolioPreview formData={formData} aiContent={aiContent} theme={selectedPortfolioTheme} />
             </div>
          )}
        </div>

        {/* Right: Controls & Dashboard Sidebar */}
        <aside className="glass-strong" style={{ borderLeft: '1px solid var(--border)', overflowY: 'auto', padding: '32px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            {/* Header Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h2 style={{ fontSize: 18, fontWeight: 800 }}>Dashboard</h2>
               <Link to="/onboarding" className="btn btn-secondary btn-xs">
                  <Edit3 size={13} /> Edit Data
               </Link>
            </div>

            {/* Resume Controls */}
            <section className="card" style={{ padding: 16, background: 'rgba(255,255,255,0.02)' }}>
              {/* Template & Theme Selectors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <div>
                  <label className="label">Resume Template</label>
                  <div style={{ display: 'flex', gap: 8, background: 'var(--bg-secondary)', padding: 4, borderRadius: 10 }}>
                    {['classic', 'modern', 'creative'].map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTemplate(t)}
                        style={{ 
                          flex: 1, padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
                          background: selectedTemplate === t ? 'var(--bg-card)' : 'transparent',
                          color: selectedTemplate === t ? 'var(--accent-purple-light)' : 'var(--text-muted)',
                          border: 'none', cursor: 'pointer'
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">Portfolio Theme</label>
                  <div style={{ display: 'flex', gap: 8, background: 'var(--bg-secondary)', padding: 4, borderRadius: 10 }}>
                    {['developer', 'creative', 'executive'].map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedPortfolioTheme(t)}
                        style={{ 
                          flex: 1, padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
                          background: selectedPortfolioTheme === t ? 'var(--bg-card)' : 'transparent',
                          color: selectedPortfolioTheme === t ? 'var(--accent-purple-light)' : 'var(--text-muted)',
                          border: 'none', cursor: 'pointer'
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }}>
                <Download size={16} /> Export to PDF
              </button>
            </section>

            {/* ATS Analysis */}
            <section className="card" style={{ padding: 20, background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldCheck size={18} className="gradient-text" /> ATS Intelligence
                </h3>
                {aiContent.atsScore !== null && (
                  <button 
                    onClick={handleScore} 
                    disabled={isScoring}
                    className="btn btn-ghost btn-xs"
                    style={{ fontSize: 11 }}
                  >
                    {isScoring ? 'Analysing...' : 'Re-scan'}
                  </button>
                )}
              </div>

              {aiContent.atsScore !== null ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    <div style={{ position: 'relative', width: 64, height: 64 }}>
                      <svg width="64" height="64" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="8" />
                        <circle 
                          cx="50" cy="50" r="42" fill="none" 
                          stroke={aiContent.atsScore > 80 ? 'var(--accent-green)' : 'var(--accent-purple)'} 
                          strokeWidth="8" 
                          strokeDasharray="264"
                          strokeDashoffset={264 - (264 * aiContent.atsScore) / 100}
                          strokeLinecap="round"
                          className="ats-ring"
                        />
                      </svg>
                      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>
                        {aiContent.atsScore}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15 }}>
                        {aiContent.atsScore > 80 ? 'ATS Optimized!' : 'Optimization Needed'}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Based on {formData.jobRole || 'role'}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                       <p className="label" style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b' }}>
                          <AlertCircle size={12} /> Keywords to Add
                       </p>
                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                          {aiContent.atsKeywordsMissing.map(k => (
                             <span key={k} className="badge" style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', fontSize: 10 }}>{k}</span>
                          ))}
                       </div>
                    </div>
                    
                    <div>
                       <p className="label" style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, color: '#10b981' }}>
                          <CheckCircle2 size={12} /> Key Strengths
                       </p>
                       <ul style={{ paddingLeft: 0, listStyle: 'none', margin: '6px 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {aiContent.atsStrengths.map((s, i) => (
                             <li key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#10b981', marginTop: 6 }} />
                                {s}
                             </li>
                          ))}
                       </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                    Analyze how well your resume matches your target role.
                  </p>
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={handleScore}
                    disabled={isScoring}
                    style={{ width: '100%' }}
                  >
                    {isScoring ? 'Analyzing...' : 'Run ATS Scan'}
                  </button>
                </div>
              )}
            </section>

            {/* Share / Public View */}
            <section>
               <h3 className="label">Public Access</h3>
               <div className="card" style={{ padding: 12, borderStyle: 'dashed' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-muted)' }}>
                     <ExternalLink size={14} />
                     <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        resumeforge.com/p/{formData.fullName?.toLowerCase().replace(/\s+/g, '-') || 'user'}
                     </span>
                  </div>
                  <button className="btn btn-ghost btn-xs" style={{ width: '100%', marginTop: 12 }}>
                     Copy Link
                  </button>
               </div>
            </section>

          </div>
        </aside>
      </div>
    </div>
  );
}
