import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Code, ArrowRight, Sparkles } from 'lucide-react';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const [isLogin, setIsLogin] = useState(searchParams.get('tab') !== 'register');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  useEffect(() => {
    setIsLogin(searchParams.get('tab') !== 'register');
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        id: 'user_123'
      };
      login(mockUser, 'mock_jwt_token');
      toast.success(isLogin ? 'Welcome back! 👋' : 'Account created! Let\'s build.');
      navigate('/onboarding');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="noise" style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 440, width: '100%' }} className="page-enter">
        
        {/* Logo / Back to home */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', justifyContent: 'center', marginBottom: 40 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="#fff" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>
            ResumeForge
          </span>
        </Link>

        <div className="card glass-strong" style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
              {isLogin ? 'Log in to manage your resumes' : 'Start building your professional future'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 4, background: 'var(--bg-secondary)', padding: 4, borderRadius: 10, marginBottom: 24 }}>
            <button 
              onClick={() => setIsLogin(true)}
              className={`btn btn-sm`} 
              style={{ flex: 1, background: isLogin ? 'var(--bg-card)' : 'transparent', color: isLogin ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`btn btn-sm`} 
              style={{ flex: 1, background: !isLogin ? 'var(--bg-card)' : 'transparent', color: !isLogin ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!isLogin && (
              <div>
                <label className="label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    className="input" 
                    placeholder="John Doe" 
                    style={{ paddingLeft: 42 }}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email"
                  className="input" 
                  placeholder="name@example.com" 
                  style={{ paddingLeft: 42 }}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="label" style={{ margin: 0 }}>Password</label>
                {isLogin && <a href="#" style={{ fontSize: 12, color: 'var(--accent-purple-light)' }}>Forgot?</a>}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password"
                  className="input" 
                  placeholder="••••••••" 
                  style={{ paddingLeft: 42 }}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading} style={{ width: '100%', marginTop: 8 }}>
              {isLoading ? (
                 <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="divider" style={{ margin: '32px 0' }}>
             <span style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '0 12px' }}>OR CONTINUE WITH</span>
          </div>

          <button className="btn btn-secondary btn-lg" style={{ width: '100%', gap: 12 }}>
            <Code size={20} /> GitHub
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: 'var(--text-muted)' }}>
          By continuing, you agree to our <a href="#" style={{ color: 'var(--text-secondary)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</a>.
        </p>
      </div>
      
      <style>{`
        .divider { position: relative; text-align: center; }
        .divider::before { content: ''; position: absolute; left: 0; top: 50%; width: 100%; height: 1px; background: var(--border); z-index: -1; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
