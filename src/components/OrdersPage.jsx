
import { useState, useEffect } from 'react';
import '../styles/OrdersPage.css';

const FOOD_EMOJI_MAP = {
  pizza: '🍕', burger: '🍔', biryani: '🍛', pasta: '🍝',
  noodle: '🍜', sushi: '🍣', roll: '🌯', sandwich: '🥪',
  salad: '🥗', soup: '🍲', rice: '🍚', chicken: '🍗',
  fish: '🐟', cake: '🎂', icecream: '🍦', coffee: '☕',
  juice: '🥤', fries: '🍟', wrap: '🌮', dosa: '🫓',
  paneer: '🧀', veg: '🥦', dal: '🫕',
};

function getFoodEmoji(product = '') {
  const p = product.toLowerCase();
  for (const [key, emoji] of Object.entries(FOOD_EMOJI_MAP)) {
    if (p.includes(key)) return emoji;
  }
  return '🍽️';
}

export default function OrdersPage({ email, onBack }) {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [search,  setSearch]  = useState('');

  useEffect(() => {
    const mail = email || localStorage.getItem('emailId');

    if (!mail) {
      setError('No email found. Please log in again.');
      setLoading(false);
      return;
    }

    fetch(`https://foodapplicationbackend-production.up.railway.app/myorders?email=${encodeURIComponent(mail)}`)
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(
          err.message.startsWith('Server error')
            ? err.message
            : 'Could not reach server. Make sure Spring Boot is running on :8080.'
        );
        setLoading(false);
      });
  }, [email]);


  const filtered = orders.filter(o => {
    const q = search.toLowerCase().trim();
    return !q || [o.product, o.name, o.address, o.email, o.phone]
      .some(v => v?.toLowerCase().includes(q));
  });


  const totalOrders = orders.length;
  const totalItems  = orders.reduce((s, o) => s + Number(o.quantity), 0);
  const totalSpent  = orders.reduce((s, o) => s + Number(o.price) * Number(o.quantity), 0);

  return (
    <>
     
      <style>{`
        html.dark, html.dark body {
          background: linear-gradient(135deg, #1a1a2e, #16213e) !important;
        }
        html.dark .op-body {
          background: linear-gradient(135deg, #1a1a2e, #16213e) !important;
        }
        html.dark .op-title { color: #f0f0f0 !important; }
        html.dark .op-title-accent { color: #ff7961 !important; }
        html.dark .op-back-btn {
          background: #2a2a3e !important;
          color: #ff7961 !important;
          border-color: #ff7961 !important;
        }
        html.dark .op-back-btn::before { background: #3a2a2a !important; }
        html.dark .op-back-btn:hover { border-color: #ff7961 !important; color: #fff !important; }

        html.dark .op-skeleton-card {
          background: linear-gradient(90deg, #2a2a3e 25%, #333 50%, #2a2a3e 75%) !important;
          background-size: 200% 100% !important;
          border-left-color: #444 !important;
        }

        html.dark .op-error-box {
          background: #3e1a1a !important;
          border-color: #5a2a2a !important;
          color: #ef9a9a !important;
        }

        html.dark .op-summary { background: transparent !important; }
        html.dark .op-stat {
          background: #1e1e2e !important;
          border-color: #333 !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.5) !important;
        }
        html.dark .op-stat:hover {
          border-color: #ff7961 !important;
          box-shadow: 0 8px 20px rgba(255,121,97,0.15) !important;
        }
        html.dark .op-stat-label { color: #aaa !important; }
        html.dark .op-stat-val { color: #ffffff !important; }
        html.dark .op-stat-amber { color: #ffb74d !important; }

        html.dark .op-search-wrap {
          background: #1e1e2e !important;
          border-color: #444 !important;
        }
        html.dark .op-search-wrap:focus-within {
          border-color: #ff7961 !important;
          box-shadow: 0 0 0 3px rgba(255,121,97,0.15) !important;
        }
        html.dark .op-search-input {
          background: transparent !important;
          color: #f0f0f0 !important;
        }
        html.dark .op-search-input::placeholder { color: #777 !important; }
        html.dark .op-search-icon { color: #888 !important; }
        html.dark .op-search-clear { color: #888 !important; }
        html.dark .op-search-clear:hover {
          color: #ff7961 !important;
          background: #3a2a2a !important;
        }

        html.dark .op-empty-title { color: #ddd !important; }
        html.dark .op-empty-sub { color: #888 !important; }

        html.dark .op-card {
          background: #1e1e2e !important;
          border-color: #333 !important;
          border-left-color: #ff7961 !important;
        }
        html.dark .op-card::before {
          background: linear-gradient(120deg, transparent 0%, rgba(255,121,97,0.12) 50%, transparent 100%) !important;
        }
        html.dark .op-card:hover {
          box-shadow: 0 8px 28px rgba(255,121,97,0.18) !important;
          border-left-color: #ff9a85 !important;
        }
        html.dark .op-card-emoji { background: #2a2a3e !important; }
        html.dark .op-card:hover .op-card-emoji { background: #34344a !important; }
        html.dark .op-card-product { color: #f0f0f0 !important; }
        html.dark .op-card:hover .op-card-product { color: #ff7961 !important; }
        html.dark .op-card-meta span { color: #aaa !important; }
        html.dark .op-card-address { color: #999 !important; }
        html.dark .op-card-total { color: #ff7961 !important; }
        html.dark .op-card-qty {
          background: #2a2a3e !important;
          color: #ffb74d !important;
        }
        html.dark .op-card:hover .op-card-qty { background: #34344a !important; }
      `}</style>

      <div className="op-body">

        
        <div className="op-header">
          <h1 className="op-title">My <span className="op-title-accent">Orders</span></h1>
          <button className="op-back-btn" onClick={onBack}>
            <span>← Back</span>
          </button>
        </div>

        
        {loading && (
          <div className="op-loading">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="op-skeleton-card" />
            ))}
          </div>
        )}

       
        {!loading && error && (
          <div className="op-error-box">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

      
        {!loading && !error && (
          <>
            
            <div className="op-summary">
              <div className="op-stat">
                <span className="op-stat-label">Total Orders</span>
                <span className="op-stat-val">{totalOrders}</span>
              </div>
              <div className="op-stat">
                <span className="op-stat-label">Items Ordered</span>
                <span className="op-stat-val">{totalItems}</span>
              </div>
              <div className="op-stat">
                <span className="op-stat-label">Total Spent</span>
                <span className="op-stat-val op-stat-amber">
                  ₹{totalSpent.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

           
            <div className="op-search-wrap">
              <span className="op-search-icon">🔍</span>
              <input
                type="text"
                className="op-search-input"
                placeholder="Search by product, name, address…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="op-search-clear" onClick={() => setSearch('')}>✕</button>
              )}
            </div>

           
            {filtered.length === 0 && (
              <div className="op-empty">
                <div className="op-empty-emoji">🍽️</div>
                <p className="op-empty-title">
                  {search ? 'No results found' : 'No orders yet'}
                </p>
                <p className="op-empty-sub">
                  {search ? 'Try a different search.' : 'Go place your first order!'}
                </p>
              </div>
            )}

            
            {filtered.length > 0 && (
              <div className="op-list">
                {filtered.map((o, i) => (
                  <div className="op-card" key={i}>

                    <div className="op-card-emoji">{getFoodEmoji(o.product)}</div>

                    <div className="op-card-info">
                      <p className="op-card-product">{o.product}</p>
                      <div className="op-card-meta">
                        <span>👤 {o.name}</span>
                        <span>📞 {o.phone}</span>
                        <span>✉️ {o.email}</span>
                      </div>
                      <div className="op-card-address">📍 {o.address}</div>
                    </div>

                    <div className="op-card-right">
                      <p className="op-card-total">
                        ₹{(Number(o.price) * Number(o.quantity)).toLocaleString('en-IN')}
                      </p>
                      <span className="op-card-qty">
                        ×{o.quantity} @ ₹{o.price}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </>
  );
}
