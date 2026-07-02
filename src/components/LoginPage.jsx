import { useState } from 'react';
import '../styles/LoginPage.css';

export default function LoginPage({ onLogin }) {
  const [view, setView] = useState('login'); 

  const [loginEmail,    setLoginEmail]    = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName,     setRegName]     = useState('');
  const [regEmail,    setRegEmail]    = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');


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
        alert('Login successfully');
        onLogin(loginEmail);                
      } else if (text === 'Invalid password') {
        alert('Invalid password');
      } else if (text === 'Invalid email') {
        alert('Invalid email');
      } else if (text === 'email not exits') {
        alert('Email not found');
      }
    } catch {
      alert('Cannot reach server. Make sure Spring Boot is running on :8080');
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
        alert('Register Successfully');
        setRegName(''); setRegEmail(''); setRegPassword('');
        setView('login');
      }
    } catch {
      alert('Cannot reach server. Make sure Spring Boot is running on :8080');
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
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
              />

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
              <input
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                required
              />
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
