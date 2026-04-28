import { Link } from 'react-router-dom';
import { Sparkles, FileText, Zap, ShieldCheck, Globe, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

export default function Landing() {
  return (
    <div className="noise" style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        padding: '100px 24px 120px', 
        textAlign: 'center',
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        
        <div className="page-enter">
          <div className="badge badge-purple" style={{ marginBottom: 24, padding: '6px 16px', fontSize: 13 }}>
            <Sparkles size={14} style={{ marginRight: 8 }} /> Powered by GPT-4o & Claude 3.5
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(40px, 8vw, 84px)', 
            fontWeight: 900, 
            lineHeight: 0.95, 
            letterSpacing: '-0.04em',
            marginBottom: 24,
            fontFamily: 'Outfit, sans-serif'
          }}>
            Forge Your Career with <br />
            <span className="gradient-text">AI Intelligence</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            color: 'var(--text-secondary)', 
            maxWidth: 700, 
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Build ATS-optimized resumes and professional portfolio sites in minutes. 
            AI-driven content generation, real-time scoring, and premium templates.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            <Link to="/auth?tab=register" className="btn btn-primary btn-lg" style={{ minWidth: 200 }}>
              Build My Resume <ArrowRight size={18} />
            </Link>
            <button className="btn btn-secondary btn-lg" style={{ minWidth: 200, gap: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={12} fill="currentColor" />
              </div>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Floating Metrics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 20, 
          marginTop: 80,
          textAlign: 'left'
        }}>
          <MetricCard icon={Zap} title="AI Optimized" desc="Quantified achievements via STAR method" />
          <MetricCard icon={ShieldCheck} title="ATS Friendly" desc="Pass through filters with high confidence" />
          <MetricCard icon={Globe} title="Live Portfolio" desc="Instant professional web presence" />
          <MetricCard icon={FileText} title="Export Ready" desc="Professional PDFs in multiple templates" />
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, fontFamily: 'Outfit, sans-serif' }}>
              Why Choose <span className="gradient-text">ResumeForge</span>?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 18 }}>The complete toolkit for the modern professional.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32 }}>
            <FeatureBox 
              title="Parallel AI Generation" 
              desc="Generates objectives, project descriptions, and experience bullets simultaneously for maximum speed."
              tags={['GPT-4o', 'SSE Streaming']}
            />
            <FeatureBox 
              title="Dynamic Portfolios" 
              desc="One-click generation of self-contained HTML portfolios with interactive elements and dark mode."
              tags={['Three Templates', 'Hosted URL']}
            />
            <FeatureBox 
              title="Real-time ATS Scoring" 
              desc="Instant feedback on your resume's compatibility with industry-standard Applicant Tracking Systems."
              tags={['Keyword Analysis', 'Feedback']}
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 40, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Trusted by engineers at
        </h3>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: 'clamp(24px, 6vw, 60px)', 
          opacity: 0.4, 
          filter: 'grayscale(1)' 
        }}>
          <span style={{ fontSize: 24, fontWeight: 900 }}>GOOGLE</span>
          <span style={{ fontSize: 24, fontWeight: 900 }}>META</span>
          <span style={{ fontSize: 24, fontWeight: 900 }}>AMAZON</span>
          <span style={{ fontSize: 24, fontWeight: 900 }}>STRIPE</span>
          <span style={{ fontSize: 24, fontWeight: 900 }}>VERCEL</span>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 24px 40px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          &copy; 2026 ResumeForge AI. All rights reserved. Built for developers, by developers.
        </p>
      </footer>
    </div>
  );
}

function MetricCard({ icon: Icon, title, desc }) {
  return (
    <div className="card glass-strong" style={{ padding: 24 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Icon size={20} color="#a855f7" />
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

function FeatureBox({ title, desc, tags }) {
  return (
    <div className="card-hover card glass" style={{ padding: 32 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {tags.map(t => <span key={t} className="badge badge-purple" style={{ fontSize: 10 }}>{t}</span>)}
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{title}</h3>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>{desc}</p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 0 }}>
        {['Instant delivery', 'Pro level quality'].map(item => (
          <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}>
            <CheckCircle2 size={14} color="#10b981" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
