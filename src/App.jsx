// =====================================================
//  App.jsx
//  Wrapped with DarkModeProvider + ToastProvider
//  Both available to EVERY page via context.
//  Login page itself never reads dark mode — see note below.
// =====================================================
import { useState, useEffect } from 'react';
import { ToastProvider }    from './components/ToastContext.jsx';
import { DarkModeProvider } from './components/DarkModeContext.jsx';
import LoginPage    from './components/LoginPage.jsx';
import MainPage     from './components/MainPage.jsx';
import HomePage      from './components/HomePage.jsx';
import OrdersPage   from './components/OrdersPage.jsx';
import SuccessPage  from './components/SuccessPage.jsx';
import ProfilePage  from './components/ProfilePage.jsx';
import './styles/darkmode.css';

export default function App() {
  const [page,  setPage]  = useState('login');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('emailId');
    if (saved) { setEmail(saved); setPage('main'); }
  }, []);

  function navigate(to) { setPage(to); }

  function handleLogin(userEmail) {
    localStorage.setItem('emailId', userEmail);
    setEmail(userEmail);
    navigate('main');
  }

  function handleLogout() {
    localStorage.removeItem('emailId');
    setEmail('');
    navigate('login');
  }

  return (
    // DarkModeProvider + ToastProvider wrap EVERYTHING,
    // but the dark CSS rules (darkmode.css) deliberately
    // have ZERO selectors targeting .login-body — so the
    // login page always renders in its original light style
    // no matter what `dark` is set to.
    <DarkModeProvider>
      <ToastProvider>
        {page === 'login'   && <LoginPage   onLogin={handleLogin} />}
        {page === 'main'    && <MainPage    onExplore={() => navigate('home')}
                                            onViewOrders={() => navigate('orders')}
                                            onProfile={() => navigate('profile')}
                                            onLogout={handleLogout} />}
        {page === 'home'    && <HomePage    onGoProfile={() => navigate('main')}
                                            onSuccess={() => navigate('success')} />}
        {page === 'orders'  && <OrdersPage  email={email} onBack={() => navigate('main')} />}
        {page === 'success' && <SuccessPage onGoHome={() => navigate('home')} />}
        {page === 'profile' && <ProfilePage email={email}
                                            onBack={() => navigate('main')}
                                            onLogout={handleLogout} />}
      </ToastProvider>
    </DarkModeProvider>
  );
}
