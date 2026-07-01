import { useDarkMode } from './DarkModeContext.jsx';
import '../styles/MainPage.css';

export default function MainPage({ onExplore, onViewOrders, onProfile, onLogout }) {
  const { dark, toggleDark } = useDarkMode();

  return (
    <div className="main-page">
      <div className="navbar">
        <button className="orders-btn"  onClick={onViewOrders}>View Orders</button>
        <button className="profile-btn" onClick={onProfile}>My Profile</button>
        <button className="dark-toggle-btn" onClick={toggleDark} title="Toggle dark mode">
          {dark ? '☀️' : '🌙'}
        </button>
        <button className="logout-btn"  onClick={onLogout}>Logout</button>
      </div>

      <div className="overlay">
        <h1>Welcome to Foodie App 🍔</h1>
        <p>Delicious food waiting for you 😋</p>
        <button onClick={onExplore}>Explore Food</button>
      </div>
    </div>
  );
}
