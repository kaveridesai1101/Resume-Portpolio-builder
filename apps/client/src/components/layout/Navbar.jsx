import { Link, useNavigate } from 'react-router-dom';
import { FileText, LayoutDashboard, LogOut, LogIn, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import useResumeStore from '../../store/resumeStore';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isSaving, lastSaved } = useResumeStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const savedText = lastSaved
    ? `Saved ${new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : null;

  return (
    <nav className="glass-strong sticky top-0 z-50 border-b" style={{ borderColor: 'var(--border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
              Resume<span className="gradient-text">Forge</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
            {isSaving && (
              <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', display: 'inline-block', animation: 'pulse 1s infinite' }} />
                Auto-saving…
              </span>
            )}
            {!isSaving && savedText && (
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>✓ {savedText}</span>
            )}

            {isAuthenticated ? (
              <>
                <Link to="/onboarding" className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
                  <FileText size={15} /> Resume
                </Link>
                <Link to="/dashboard" className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
                  <LayoutDashboard size={15} /> Dashboard
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: '#fff',
                  }}>
                    {(user?.email || 'U')[0].toUpperCase()}
                  </div>
                  <button onClick={handleLogout} className="btn btn-ghost btn-sm" style={{ color: '#ef4444' }}>
                    <LogOut size={15} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/auth" className="btn btn-ghost btn-sm">Log in</Link>
                <Link to="/auth?tab=register" className="btn btn-primary btn-sm">
                  <Sparkles size={14} /> Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none' }}
            id="mobile-menu-btn"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            paddingBottom: 16, borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 12,
          }}>
            {isAuthenticated ? (
              <>
                <Link to="/onboarding" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Resume Builder</Link>
                <Link to="/dashboard" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/auth" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Log in</Link>
                <Link to="/auth?tab=register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </nav>
  );
}
