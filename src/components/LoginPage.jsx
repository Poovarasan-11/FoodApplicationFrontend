import { useState } from 'react';
import '../styles/LoginPage.css';
import { useToast } from './ToastContext';

export default function LoginPage({ onLogin }) {
  const { showToast } = useToast();
  const [view, setView] = useState('login'); 

  const [loginEmail,    setLoginEmail]    = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName,     setRegName]     = useState('');
  const [regEmail,    setRegEmail]    = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [busy, setBusy] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const res  = await fetch('https://foodapplicationbackend-production.up.railway.app/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ emailId: loginEmail, password: loginPassword }),
      });
      const text = await res.text();

      if (text === 'Success') {
        showToast('Login successful! Welcome back 🎉', 'success');
        onLogin(loginEmail);                
      } else if (text === 'Invalid password') {
        showToast('Invalid password', 'error');
      } else if (text === 'Invalid email') {
        showToast('Invalid email', 'error');
      } else if (text === 'email not exits') {
        showToast('Email not found', 'error');
      }
    } catch {
      showToast('Cannot reach server. Please try again later.', 'error');
    }
    setBusy(false);
  }
  async function handleRegister(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const params = new URLSearchParams();
      params.append('name',     regName);
      params.append('emailId',  regEmail);
      params.append('password', regPassword);
      params.append('phone', regPhone);
      params.append('address', regAddress);


      const res  = await fetch('https://foodapplicationbackend-production.up.railway.app/register', {
        method: 'POST',
        body:   params,
      });
      const text = await res.text();

      if (text === 'Added') {
        showToast('Registered successfully! Please login 🎉', 'success');
        setRegName(''); setRegEmail(''); setRegPassword('');
        setView('login');
      }
    } catch {
      showToast('Cannot reach server. Please try again later.', 'error');
    }
    setBusy(false);
  }

  return (
    <div className="login-body">
      <div className="container">

        <div className="left" />

        <div className="right">
          {view === 'login' && (
            <form onSubmit={handleLogin}>
              <h2>Login 🍔</h2>

              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
              />

              <div style={{ position: 'relative' }}>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  style={{ width: '100%', paddingRight: '38px', boxSizing: 'border-box' }}
                />
                {loginPassword.length > 0 && (
                  <span
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      userSelect: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#9ca3af',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e5384f')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
                  >
                    {showLoginPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </span>
                )}
              </div>

              <button type="submit" disabled={busy}>
                {busy ? 'Logging in…' : 'Login'}
              </button>
              <div className="toggle" onClick={() => setView('register')}>
                Don't have account? Register
              </div>
            </form>
          )}
          {view === 'register' && (
            <form onSubmit={handleRegister}>
              <h2>Register 🍕</h2>

              <input
                type="text"
                placeholder="Name"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                required
              />

              <div style={{ position: 'relative' }}>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  required
                  style={{ width: '100%', paddingRight: '38px', boxSizing: 'border-box' }}
                />
                {regPassword.length > 0 && (
                  <span
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      userSelect: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#9ca3af',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e5384f')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
                  >
                    {showRegPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </span>
                )}
              </div>

              <input
                type="tel"
                placeholder="PhoneNumber"
                value={regPhone}
                onChange={e => setRegPhone(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={regAddress}
                onChange={e => setRegAddress(e.target.value)}
                required
              />

              <button type="submit" disabled={busy}>
                {busy ? 'Registering…' : 'Register'}
              </button>
              <div className="toggle" onClick={() => setView('login')}>
                Already have account? Login
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
