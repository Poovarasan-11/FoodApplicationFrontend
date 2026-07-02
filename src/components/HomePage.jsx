import { useState, useMemo, useEffect, useRef } from 'react';
import { useToast }    from './ToastContext.jsx';
import { useDarkMode } from './DarkModeContext.jsx';
import '../styles/HomePage.css';

const BANNERS = [
  { id: 1, title: '🍔 Big Burger Deal!',       subtitle: 'Get Burger + Juice at just ₹180',  bg: 'linear-gradient(135deg,#ff416c,#ff4b2b)', img: 'images/burger.jpg' },
  { id: 2, title: '🍕 Pizza Fiesta',            subtitle: 'All Pizzas 20% off today only!',   bg: 'linear-gradient(135deg,#f7971e,#ffd200)', img: 'images/pizza.jpg' },
  { id: 3, title: '🍗 Biryani Bonanza',         subtitle: 'Free raita with every Biryani',    bg: 'linear-gradient(135deg,#11998e,#38ef7d)', img: 'images/biryani.jpg' },
  { id: 4, title: '🍰 Sweet Endings',           subtitle: 'Desserts starting at just ₹50',   bg: 'linear-gradient(135deg,#8e2de2,#4a00e0)', img: 'images/cake.jpg' },
];

const homeFoods = [
  { name: 'Burger',          price: 120, img: 'images/burger.jpg',             category: 'Non-Veg',  popular: 95, calories: 540, description: 'Juicy beef patty with lettuce, tomato, cheese and special sauce in a toasted bun.',      ingredients: ['Beef patty','Lettuce','Tomato','Cheese','Bun','Sauce'] },
  { name: 'Pizza',           price: 250, img: 'images/pizza.jpg',              category: 'Veg',      popular: 90, calories: 720, description: 'Wood-fired pizza topped with fresh mozzarella, tomato sauce and herbs.',               ingredients: ['Pizza base','Mozzarella','Tomato sauce','Bell pepper','Olives','Oregano'] },
  { name: 'Mutton Biryani',  price: 250, img: 'images/biryani.jpg',            category: 'Non-Veg',  popular: 98, calories: 680, description: 'Slow-cooked aromatic basmati rice layered with tender mutton and whole spices.',       ingredients: ['Basmati rice','Mutton','Onion','Saffron','Ghee','Spices'] },
  { name: 'Juice',           price:  90, img: 'images/juice.jpg',              category: 'Beverages',popular: 75, calories: 110, description: 'Freshly squeezed seasonal fruit juice, chilled with no added sugar.',                 ingredients: ['Fresh fruits','Ice','Lemon'] },
  { name: 'Parotta',         price:  40, img: 'images/parotta.jpg',            category: 'Veg',      popular: 80, calories: 280, description: 'Flaky layered flatbread made with maida, cooked on a hot griddle with butter.',       ingredients: ['Maida','Butter','Salt','Water'] },
  { name: 'Dosa',            price:  80, img: 'images/dosa.jpg',               category: 'Veg',      popular: 85, calories: 200, description: 'Crispy golden dosa served with coconut chutney and hot sambar.',                     ingredients: ['Rice batter','Urad dal','Oil','Salt'] },
  { name: 'Paneer Tikka',    price: 150, img: 'images/pannertikka.jpg',        category: 'Veg',      popular: 88, calories: 380, description: 'Marinated paneer cubes grilled in tandoor with peppers and onions.',                 ingredients: ['Paneer','Bell pepper','Onion','Yogurt','Tandoori masala'] },
  { name: 'Chicken Biryani', price: 180, img: 'images/chiken biryani.jpeg',    category: 'Non-Veg',  popular: 97, calories: 620, description: 'Fragrant basmati rice cooked dum-style with tender chicken and caramelised onions.',  ingredients: ['Basmati rice','Chicken','Fried onion','Mint','Saffron','Ghee'] },
  { name: 'Fish Fry',        price: 100, img: 'images/fishfry.jpeg',           category: 'Non-Veg',  popular: 82, calories: 430, description: 'Marinated fish fillets coated in spiced batter and deep fried till crispy.',         ingredients: ['Fish fillet','Chilli powder','Turmeric','Lemon','Rice flour'] },
  { name: 'Cake',            price: 200, img: 'images/cake.jpg',               category: 'Desserts', popular: 77, calories: 450, description: 'Moist chocolate cake layered with ganache and topped with cream rosettes.',          ingredients: ['Flour','Cocoa','Butter','Sugar','Eggs','Cream'] },
  { name: 'Lemon Soda',      price:  40, img: 'images/Lemon Soda.jpg',         category: 'Beverages',popular: 75, calories:  90, description: 'Refreshing fizzy lemon drink.',                                                    ingredients: ['Lemon','Soda','Salt','Sugar'] },
  { name: 'Badam Milk',      price:  60, img: 'images/Badam Milk.jpg',         category: 'Beverages',popular: 82, calories: 180, description: 'Sweet milk flavored with almonds.',                                                 ingredients: ['Milk','Almonds','Sugar','Cardamom'] },
  { name: 'Ice Cream',       price:  60, img: 'images/icecream.jpg',           category: 'Desserts', popular: 80, calories: 250, description: 'Rich and creamy ice cream in chocolate, vanilla and strawberry.',                   ingredients: ['Milk','Cream','Sugar','Vanilla'] },
];

const allFoods = [
  ...homeFoods,
  { name: 'Idly',             price:  80, img: 'images/idly.jpg',              category: 'Veg',      popular: 72, calories: 150, description: 'Soft steamed rice cakes served with coconut chutney and hot sambar.',               ingredients: ['Rice','Urad dal','Salt'] },
  { name: 'Noodles',          price: 140, img: 'images/noodles.jpg',           category: 'Veg',      popular: 78, calories: 480, description: 'Stir-fried noodles tossed with fresh vegetables, soy sauce and sesame oil.',        ingredients: ['Noodles','Carrot','Cabbage','Soy sauce','Sesame oil'] },
  { name: 'Shawarma',         price: 120, img: 'images/shawarma.jpg',          category: 'Non-Veg',  popular: 92, calories: 510, description: 'Grilled chicken wrapped in pita with garlic sauce, pickles and fresh veggies.',     ingredients: ['Chicken','Pita bread','Garlic sauce','Pickles','Tomato'] },
  { name: 'Fried Rice',       price: 150, img: 'images/friedrice.jpg',         category: 'Veg',      popular: 84, calories: 520, description: 'Wok-tossed basmati rice with fresh vegetables, egg and aromatic spices.',          ingredients: ['Basmati rice','Egg','Spring onion','Soy sauce','Mixed veg'] },
  { name: 'Sandwich',         price:  70, img: 'images/sandwich.jpg',          category: 'Veg',      popular: 65, calories: 310, description: 'Toasted bread filled with cucumber, tomato, cheese and mint chutney.',             ingredients: ['Bread','Cucumber','Tomato','Cheese','Mint chutney'] },
  { name: 'Roll',             price:  35, img: 'images/roll.jpg',              category: 'Non-Veg',  popular: 70, calories: 320, description: 'Crispy paratha roll stuffed with spiced egg, onion and tangy chutney.',               ingredients: ['Paratha','Egg','Onion','Chutney','Spices'] },
  { name: 'Momos',            price: 180, img: 'images/momos.jpg',             category: 'Non-Veg',  popular: 89, calories: 360, description: 'Steamed dumplings stuffed with spiced chicken mince with red chilli dip.',         ingredients: ['Flour','Chicken','Ginger','Garlic','Spring onion'] },
  { name: 'Pasta',            price:  80, img: 'images/pasta.jpg',             category: 'Veg',      popular: 74, calories: 420, description: 'Al dente pasta in rich tomato basil sauce topped with parmesan.',                  ingredients: ['Pasta','Tomato','Basil','Garlic','Parmesan','Olive oil'] },
  { name: 'Falooda',          price:  70, img: 'images/falooda.jpg',           category: 'Beverages',popular: 71, calories: 340, description: 'Cold rose-flavoured milk drink with basil seeds, vermicelli and ice cream.',       ingredients: ['Rose syrup','Milk','Basil seeds','Vermicelli','Ice cream'] },
  { name: 'Paneer Combo',     price: 280, img: 'images/PannerCambo.jpeg',      category: 'Veg',      popular: 86, calories: 850, description: 'Full combo: paneer butter masala, 2 rotis, dal, rice and dessert.',               ingredients: ['Paneer','Butter','Cream','Roti','Dal','Rice'] },
  { name: 'Veg Rice',         price:  80, img: 'images/veg_rice.jpeg',         category: 'Veg',      popular: 68, calories: 350, description: 'Simple comforting steamed rice cooked with seasonal mixed vegetables.',           ingredients: ['Rice','Mixed vegetables','Turmeric','Oil','Salt'] },
  { name: 'Mushroom Fry',     price: 120, img: 'images/mushroom_fry.jpeg',     category: 'Veg',      popular: 76, calories: 220, description: 'Button mushrooms sauteed with onion, pepper and South Indian spices.',            ingredients: ['Mushroom','Onion','Pepper','Curry leaves','Chilli'] },
  { name: 'Mushroom Noodles', price: 160, img: 'images/mushroom_noodels.jpeg', category: 'Veg',      popular: 73, calories: 460, description: 'Stir-fried noodles with mushrooms, bell peppers and umami-rich sauces.',          ingredients: ['Noodles','Mushroom','Bell pepper','Soy sauce','Oyster sauce'] },
  { name: 'Mushroom Rice',    price: 130, img: 'images/mushroom_rice.jpeg',    category: 'Veg',      popular: 70, calories: 390, description: 'Fragrant rice cooked with mushrooms, herbs and mild spices.',                     ingredients: ['Rice','Mushroom','Onion','Herbs','Butter'] },
  { name: 'Veg Pulao',        price: 120, img: 'images/Veg Pulao.jpg',         category: 'Veg',      popular: 85, calories: 320, description: 'Fragrant rice cooked with mixed vegetables and mild spices.',                     ingredients: ['Rice','Mixed vegetables','Spices','Ghee','Mint'] },
  { name: 'Aloo Gobi',        price:  90, img: 'images/Aloo Gobi.jpg',         category: 'Veg',      popular: 80, calories: 210, description: 'Dry curry made with potatoes and cauliflower.',                                   ingredients: ['Potato','Cauliflower','Turmeric','Cumin','Spices'] },
  { name: 'Palak Paneer',     price: 140, img: 'images/Palak Paneer.jpg',      category: 'Veg',      popular: 88, calories: 300, description: 'Paneer cubes cooked in creamy spinach gravy.',                                    ingredients: ['Spinach','Paneer','Garlic','Cream','Spices'] },
  { name: 'Veg Kofta',        price: 130, img: 'images/Veg Kofta.jpg',         category: 'Veg',      popular: 82, calories: 350, description: 'Vegetable balls served in rich gravy.',                                           ingredients: ['Mixed vegetables','Potato','Cream','Spices'] },
  { name: 'Chole Bhature',    price: 110, img: 'images/Chole Bhature.jpg',     category: 'Veg',      popular: 90, calories: 450, description: 'Spicy chickpea curry served with fried bread.',                                   ingredients: ['Chickpeas','Flour','Onion','Tomato','Spices'] },
  { name: 'Butter Chicken',   price: 180, img: 'images/Butter Chicken.jpg',    category: 'Non-Veg',  popular: 95, calories: 500, description: 'Creamy tomato-based chicken curry.',                                              ingredients: ['Chicken','Butter','Tomato','Cream','Spices'] },
  { name: 'Chicken 65',       price: 150, img: 'images/Chicken 65.jpg',        category: 'Non-Veg',  popular: 93, calories: 420, description: 'Spicy deep-fried chicken appetizer.',                                             ingredients: ['Chicken','Chilli','Garlic','Curry leaves','Oil'] },
  { name: 'Prawn Masala',     price: 200, img: 'images/Prawn Masala.jpg',      category: 'Non-Veg',  popular: 87, calories: 380, description: 'Prawns cooked in spicy masala gravy.',                                            ingredients: ['Prawns','Onion','Tomato','Spices','Garlic'] },
  { name: 'Egg Curry',        price: 100, img: 'images/Egg Curry.jpg',         category: 'Non-Veg',  popular: 78, calories: 250, description: 'Boiled eggs cooked in spicy gravy.',                                              ingredients: ['Egg','Onion','Tomato','Spices'] },
  { name: 'Chicken Tikka',    price: 170, img: 'images/Chicken Tikka.jpg',     category: 'Non-Veg',  popular: 90, calories: 360, description: 'Grilled marinated chicken pieces.',                                               ingredients: ['Chicken','Yogurt','Spices','Lemon'] },
  { name: 'Nattu Kozhi Kulambu', price: 220, img: 'images/NattuKozhiKulambu.jpg', category: 'Non-Veg', popular: 92, calories: 480, description: 'Spicy country chicken curry cooked with traditional masala.',                  ingredients: ['Country chicken','Onion','Tomato','Spices'] },
  { name: 'Chettinad Chicken',   price: 200, img: 'images/ChickenChettinad.jpg',  category: 'Non-Veg', popular: 95, calories: 520, description: 'Famous spicy Chettinad style chicken with roasted spices.',                   ingredients: ['Chicken','Pepper','Fennel','Garlic','Spices'] },
  { name: 'Mutton Chukka',       price: 240, img: 'images/MuttonSukka.jpg',        category: 'Non-Veg', popular: 93, calories: 600, description: 'Dry roasted mutton cooked with spices and curry leaves.',                   ingredients: ['Mutton','Onion','Pepper','Curry leaves'] },
  { name: 'Meen Kuzhambu',       price: 180, img: 'images/MeenKolambu.jpg',        category: 'Non-Veg', popular: 88, calories: 420, description: 'Tangy fish curry cooked with tamarind and spices.',                        ingredients: ['Fish','Tamarind','Garlic','Chilli','Spices'] },
  { name: 'Mango Lassi',      price:  70, img: 'images/Mango Lassi.jpg',       category: 'Beverages', popular: 88, calories: 200, description: 'Sweet yogurt drink blended with mango pulp.',                                  ingredients: ['Mango','Curd','Sugar'] },
  { name: 'Cold Coffee',      price:  80, img: 'images/Cold Coffee.jpg',       category: 'Beverages', popular: 85, calories: 220, description: 'Chilled coffee blended with milk and ice.',                                    ingredients: ['Coffee','Milk','Sugar','Ice'] },
  { name: 'Gulab Jamun',      price:  50, img: 'images/Gulab Jamun.jpg',       category: 'Desserts',  popular: 95, calories: 180, description: 'Soft milk balls soaked in sugar syrup.',                                       ingredients: ['Milk solids','Sugar','Ghee'] },
  { name: 'Rasgulla',         price:  50, img: 'images/Rosogulla.jpg',         category: 'Desserts',  popular: 95, calories: 190, description: 'Spongy balls soaked in light sugar syrup.',                                    ingredients: ['Paneer','Sugar','Water'] },
  { name: 'Chocolate Brownie',price:  90, img: 'images/Chocolate Brownie.jpg', category: 'Desserts',  popular: 95, calories: 200, description: 'Rich chocolate baked dessert.',                                               ingredients: ['Chocolate','Flour','Sugar','Butter'] },
  { name: 'Kheer',            price:  60, img: 'images/Rice Kheer.jpg',        category: 'Desserts',  popular: 80, calories: 280, description: 'Rice pudding cooked with milk and sugar.',                                     ingredients: ['Rice','Milk','Sugar','Cardamom'] },
  { name: 'Mysore Pak',       price: 100, img: 'images/Mysore Pak.jpg',        category: 'Desserts',  popular: 90, calories: 280, description: 'Rich sweet made with gram flour, sugar and ghee.',                            ingredients: ['Besan','Sugar','Ghee'] },
];

const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Beverages', 'Desserts'];
const CAT_EMOJI  = { All:'🍽️', Veg:'🥗', 'Non-Veg':'🍗', Beverages:'🥤', Desserts:'🍰' };

const EMPTY_ORDER = {
  product: '', price: '',
  name: '', address: '', phone: '', quantity: 1, email: '',
};

export default function HomePage({ onGoProfile, onSuccess }) {

  const { showToast } = useToast();
  const { dark, toggleDark } = useDarkMode();

  const [search,     setSearch]     = useState('');
  const [category,   setCategory]   = useState('All');
  const [sortBy,     setSortBy]     = useState('popular');
  const [detailFood, setDetailFood] = useState(null);
  const [popup,      setPopup]      = useState(false);
  const [order,      setOrder]      = useState(EMPTY_ORDER);
  const [busy,       setBusy]       = useState(false);

  const [cart,      setCart]      = useState({});
  const [cartOpen,  setCartOpen]  = useState(false);

  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('foodie_favs') || '[]'); }
    catch { return []; }
  });
  const [favsOpen, setFavsOpen] = useState(false);

  const [bannerIdx, setBannerIdx] = useState(0);
  const bannerTimer = useRef(null);

  useEffect(() => {
    bannerTimer.current = setInterval(() => {
      setBannerIdx(i => (i + 1) % BANNERS.length);
    }, 3000);
    return () => clearInterval(bannerTimer.current);
  }, []);

  const displayList = useMemo(() => {
    let list = search.trim() === ''
      ? [...homeFoods]
      : [...allFoods].filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'All') list = list.filter(f => f.category === category);
    if (sortBy === 'low')     list.sort((a, b) => a.price - b.price);
    if (sortBy === 'high')    list.sort((a, b) => b.price - a.price);
    if (sortBy === 'popular') list.sort((a, b) => b.popular - a.popular);
    return list;
  }, [search, category, sortBy]);

  const activeFilters = (category !== 'All' ? 1 : 0) + (sortBy !== 'popular' ? 1 : 0);

  const cartItems = useMemo(() =>
    Object.entries(cart)
      .filter(([, q]) => q > 0)
      .map(([name, qty]) => {
        const food = allFoods.find(f => f.name === name);
        return { ...food, qty, itemTotal: food.price * qty };
      }), [cart]);

  const cartCount = useMemo(() =>
    Object.values(cart).reduce((s, q) => s + q, 0), [cart]);

  const cartTotal = useMemo(() =>
    cartItems.reduce((s, i) => s + i.itemTotal, 0), [cartItems]);

  function addToCart(name) {
    setCart(p => ({ ...p, [name]: (p[name] || 0) + 1 }));
    showToast(`${name} added to cart 🛒`, 'success');
  }

  function removeFromCart(name) {
    setCart(p => { const u = { ...p }; delete u[name]; return u; });
    showToast('Item removed from cart', 'info');
  }

  function changeQty(name, delta) {
    setCart(p => {
      const newQty = (p[name] || 0) + delta;
      if (newQty <= 0) { const u = { ...p }; delete u[name]; return u; }
      return { ...p, [name]: newQty };
    });
  }

  function toggleFav(name) {
    setFavs(prev => {
      const updated = prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name];
      localStorage.setItem('foodie_favs', JSON.stringify(updated));
      if (!prev.includes(name)) showToast(`${name} added to favourites ❤️`, 'success');
      else                       showToast(`${name} removed from favourites`, 'info');
      return updated;
    });
  }

  const favFoods = useMemo(() =>
    allFoods.filter(f => favs.includes(f.name)), [favs]);

  const [cartBusy,       setCartBusy]       = useState(false);
  const [cartForm,       setCartForm]       = useState({ name:'', phone:'', address:'', email:'' });
  const [cartCheckout,   setCartCheckout]   = useState(false);

  async function submitCartOrder(e) {
    e.preventDefault();
    if (!cartItems.length) { showToast('Cart is empty!', 'warning'); return; }
    setCartBusy(true);
    try {
      for (const item of cartItems) {
        const fd = new URLSearchParams();
        fd.append('product',  item.name);
        fd.append('price',    item.price);
        fd.append('name',     cartForm.name);
        fd.append('phone',    cartForm.phone);
        fd.append('quantity', item.qty);
        fd.append('address',  cartForm.address);
        fd.append('email',    cartForm.email);
        const res  = await fetch('https://foodapplicationbackend-production.up.railway.app/orders', { method: 'POST', body: fd });
        const data = await res.text();
        if (data !== 'Order succeefully') throw new Error();
      }
      setCart({});
      setCartCheckout(false);
      setCartOpen(false);
      onSuccess();
    } catch { showToast('Error placing order ❌', 'error'); }
    setCartBusy(false);
  }

  function openForm(name, price) {
    setOrder({ ...EMPTY_ORDER, product: name, price });
    setPopup(true);
  }
  function closeForm() { setPopup(false); }
  function handleChange(e) {
    setOrder(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function submitOrder(e) {
    e.preventDefault();
    setBusy(true);
    const formData = new URLSearchParams();
    formData.append('product',  order.product);
    formData.append('price',    order.price);
    formData.append('name',     order.name);
    formData.append('phone',    order.phone);
    formData.append('quantity', order.quantity);
    formData.append('address',  order.address);
    formData.append('email',    order.email);
    try {
      const res  = await fetch('https://foodapplicationbackend-production.up.railway.app/orders', { method: 'POST', body: formData });
      const data = await res.text();
      if (data === 'Order succeefully') { setPopup(false); onSuccess(); }
    } catch (err) { showToast('Error placing order ❌', 'error'); console.error(err); }
    setBusy(false);
  }

  return (
    <div className="home-page">

      <div className="navbar">
        <h2>🍔 Foodie Hub</h2>
        <input
          type="text"
          id="search"
          placeholder="Search food..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="nav-actions">
          {/* NEW: Dark mode toggle */}
          <button className="nav-icon-btn dark-btn" onClick={toggleDark} title="Toggle dark mode">
            {dark ? '☀️' : '🌙'}
          </button>
          <button className="nav-icon-btn fav-btn" onClick={() => setFavsOpen(true)} title="Favourites">
            ❤️ <span className="nav-badge">{favs.length}</span>
          </button>
          <button className="nav-icon-btn cart-btn" onClick={() => setCartOpen(true)} title="Cart">
            🛒 {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </button>
          <button className="logout-btn" onClick={onGoProfile}>← Back</button>
        </div>
      </div>

      <div className="banner-wrap">
        {BANNERS.map((b, i) => (
          <div
            key={b.id}
            className={`banner-slide ${i === bannerIdx ? 'active' : ''}`}
            style={{ background: b.bg }}
          >
            <div className="banner-text">
              <h2>{b.title}</h2>
              <p>{b.subtitle}</p>
            </div>
            <img src={b.img} alt={b.title} className="banner-img"
              onError={e => e.target.style.display = 'none'} />
          </div>
        ))}
        <div className="banner-dots">
          {BANNERS.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === bannerIdx ? 'active' : ''}`}
              onClick={() => setBannerIdx(i)}
            />
          ))}
        </div>
        <button className="banner-arrow left"
          onClick={() => setBannerIdx(i => (i - 1 + BANNERS.length) % BANNERS.length)}>‹</button>
        <button className="banner-arrow right"
          onClick={() => setBannerIdx(i => (i + 1) % BANNERS.length)}>›</button>
      </div>

      <div className="category-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-tab ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {CAT_EMOJI[cat]} {cat}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <label>⬆️ Sort By</label>
          <div className="sort-buttons">
            <button className={`sort-btn ${sortBy==='popular'?'active':''}`} onClick={() => setSortBy('popular')}>🔥 Popular</button>
            <button className={`sort-btn ${sortBy==='low'    ?'active':''}`} onClick={() => setSortBy('low')}>₹ Low→High</button>
            <button className={`sort-btn ${sortBy==='high'   ?'active':''}`} onClick={() => setSortBy('high')}>₹ High→Low</button>
          </div>
        </div>
        {activeFilters > 0 && (
          <button className="reset-btn" onClick={() => { setCategory('All'); setSortBy('popular'); }}>
            ✕ Reset {activeFilters} filter{activeFilters > 1 ? 's' : ''}
          </button>
        )}
      </div>

      <div className="result-count">
        Showing <strong>{displayList.length}</strong> item{displayList.length !== 1 ? 's' : ''}
        {search && <> for "<em>{search}</em>"</>}
        {category !== 'All' && <> in <em>{category}</em></>}
      </div>

      <div className="container" id="productList">
        {displayList.length === 0 ? (
          <div className="no-result">
            <span>🍽️</span>
            <p>No food found 😢</p>
            <small>Try changing filters or search</small>
          </div>
        ) : (
          displayList.map(food => (
            <div className="card" key={food.name}>
              <span className={`cat-badge ${food.category.replace('-','').toLowerCase()}`}>
                {CAT_EMOJI[food.category]} {food.category}
              </span>
              {food.popular >= 90 && <span className="popular-tag">🔥 Popular</span>}

              <button
                className={`fav-icon ${favs.includes(food.name) ? 'active' : ''}`}
                onClick={() => toggleFav(food.name)}
                title={favs.includes(food.name) ? 'Remove from favourites' : 'Add to favourites'}
              >
                {favs.includes(food.name) ? '❤️' : '🤍'}
              </button>

              <img
                src={food.img}
                alt={food.name}
                onClick={() => setDetailFood(food)}
                title="Click for details"
              />

              <h3>{food.name}</h3>
              <p>₹{food.price}</p>
              <p className="calories">🔥 {food.calories} kcal</p>

              <button className="info-btn" onClick={() => setDetailFood(food)}>ℹ️ Details</button>

              <div className="card-buy-row">
                {cart[food.name] ? (
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => changeQty(food.name, -1)}>−</button>
                    <span>{cart[food.name]}</span>
                    <button className="qty-btn" onClick={() => changeQty(food.name, +1)}>+</button>
                  </div>
                ) : (
                  <button className="cart-add-btn" onClick={() => addToCart(food.name)}>🛒 Cart</button>
                )}
                <button className="buy-btn" onClick={() => openForm(food.name, food.price)}>Buy</button>
              </div>

            </div>
          ))
        )}
      </div>

      {cartOpen && (
        <div className="sidebar-overlay" onClick={() => { setCartOpen(false); setCartCheckout(false); }}>
          <div className="sidebar" onClick={e => e.stopPropagation()}>
            <div className="sidebar-header">
              <h2>🛒 Cart {cartCount > 0 && `(${cartCount})`}</h2>
              <button onClick={() => { setCartOpen(false); setCartCheckout(false); }}>✕</button>
            </div>

            {cartItems.length === 0 ? (
              <div className="sidebar-empty">
                <span>🛒</span><p>Your cart is empty</p>
                <small>Add items from the menu!</small>
              </div>
            ) : !cartCheckout ? (
              <>
                <div className="sidebar-items">
                  {cartItems.map(item => (
                    <div className="sidebar-item" key={item.name}>
                      <img src={item.img} alt={item.name}
                        onError={e => e.target.style.display='none'} />
                      <div className="si-info">
                        <span className="si-name">{item.name}</span>
                        <span className="si-price">₹{item.price} × {item.qty} = <strong>₹{item.itemTotal}</strong></span>
                      </div>
                      <div className="si-actions">
                        <button className="qty-btn" onClick={() => changeQty(item.name, -1)}>−</button>
                        <span>{item.qty}</span>
                        <button className="qty-btn" onClick={() => changeQty(item.name, +1)}>+</button>
                        <button className="remove-btn" onClick={() => removeFromCart(item.name)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total-row">
                  <span>Total ({cartCount} items)</span>
                  <strong>₹{cartTotal}</strong>
                </div>

                <button className="checkout-btn" onClick={() => setCartCheckout(true)}>
                  Proceed to Checkout →
                </button>
              </>
            ) : (
              <>
                <div className="checkout-summary">
                  {cartItems.map(i => (
                    <div key={i.name} className="cs-row">
                      <span>{i.name} × {i.qty}</span>
                      <span>₹{i.itemTotal}</span>
                    </div>
                  ))}
                  <div className="cs-row total">
                    <span>💰 Total</span><strong>₹{cartTotal}</strong>
                  </div>
                </div>

                <form className="checkout-form" onSubmit={submitCartOrder}>
                  <input type="text"  placeholder="Your Name"        value={cartForm.name}    onChange={e => setCartForm(p=>({...p,name:e.target.value}))}    required />
                  <input type="text"  placeholder="Phone"            value={cartForm.phone}   onChange={e => setCartForm(p=>({...p,phone:e.target.value}))}   required />
                  <input type="email" placeholder="Email"            value={cartForm.email}   onChange={e => setCartForm(p=>({...p,email:e.target.value}))}   required />
                  <textarea           placeholder="Delivery Address" value={cartForm.address} onChange={e => setCartForm(p=>({...p,address:e.target.value}))} required rows={2} />
                  <button type="submit" className="checkout-btn" disabled={cartBusy}>
                    {cartBusy ? 'Placing…' : `Place Order · ₹${cartTotal}`}
                  </button>
                  <button type="button" className="back-btn2" onClick={() => setCartCheckout(false)}>
                    ← Back to Cart
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {favsOpen && (
        <div className="sidebar-overlay" onClick={() => setFavsOpen(false)}>
          <div className="sidebar" onClick={e => e.stopPropagation()}>
            <div className="sidebar-header">
              <h2>❤️ Favourites {favs.length > 0 && `(${favs.length})`}</h2>
              <button onClick={() => setFavsOpen(false)}>✕</button>
            </div>

            {favFoods.length === 0 ? (
              <div className="sidebar-empty">
                <span>🤍</span>
                <p>No favourites yet</p>
                <small>Tap 🤍 on any food to save it!</small>
              </div>
            ) : (
              <div className="sidebar-items">
                {favFoods.map(food => (
                  <div className="sidebar-item" key={food.name}>
                    <img src={food.img} alt={food.name}
                      onError={e => e.target.style.display='none'} />
                    <div className="si-info">
                      <span className="si-name">{food.name}</span>
                      <span className="si-price">₹{food.price} · 🔥 {food.calories} kcal</span>
                    </div>
                    <div className="si-fav-actions">
                      <button className="cart-add-btn small" onClick={() => { addToCart(food.name); setFavsOpen(false); setCartOpen(true); }}>
                        🛒
                      </button>
                      <button className="fav-icon active" onClick={() => toggleFav(food.name)}>❤️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {detailFood && (
        <div className="popup-overlay" onClick={() => setDetailFood(null)}>
          <div className="detail-box" onClick={e => e.stopPropagation()}>
            <button className="detail-close" onClick={() => setDetailFood(null)}>✕</button>
            <img src={detailFood.img} alt={detailFood.name} className="detail-img" />
            <div className="detail-body">
              <div className="detail-top">
                <h2>{detailFood.name}</h2>
                <span className={`cat-badge static ${detailFood.category.replace('-','').toLowerCase()}`}>
                  {CAT_EMOJI[detailFood.category]} {detailFood.category}
                </span>
              </div>
              <p className="detail-desc">{detailFood.description}</p>
              <div className="detail-stats">
                <div className="stat-box">
                  <span className="stat-icon">💰</span>
                  <span className="stat-label">Price</span>
                  <span className="stat-value">₹{detailFood.price}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-icon">🔥</span>
                  <span className="stat-label">Calories</span>
                  <span className="stat-value">{detailFood.calories} kcal</span>
                </div>
                <div className="stat-box">
                  <span className="stat-icon">⭐</span>
                  <span className="stat-label">Popularity</span>
                  <span className="stat-value">{detailFood.popular}%</span>
                </div>
              </div>
              <div className="ingredients-section">
                <h4>🧂 Ingredients</h4>
                <div className="ingredients-list">
                  {detailFood.ingredients.map(ing => (
                    <span key={ing} className="ingredient-tag">{ing}</span>
                  ))}
                </div>
              </div>
              <button
                className="detail-buy-btn"
                onClick={() => { setDetailFood(null); openForm(detailFood.name, detailFood.price); }}
              >
                🛒 Buy Now — ₹{detailFood.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {popup && (
        <div className="popup" onClick={closeForm}>
          <div className="form-box" onClick={e => e.stopPropagation()}>
            <h2>Order Details</h2>
            <form onSubmit={submitOrder}>
              <input type="text"   name="product"  value={order.product}  readOnly />
              <input type="number" name="price"    value={order.price}    readOnly />
              <input type="text"   name="name"     value={order.name}     onChange={handleChange} placeholder="Your Name" required />
              <input type="text"   name="address"  value={order.address}  onChange={handleChange} placeholder="Address"   required />
              <input type="text"   name="phone"    value={order.phone}    onChange={handleChange} placeholder="Phone"     required />
              <input type="number" name="quantity" value={order.quantity} onChange={handleChange} placeholder="Quantity"  min="1" />
              <input type="email"  name="email"    value={order.email}    onChange={handleChange} placeholder="Email"     required />
              <button type="submit" disabled={busy}>{busy ? 'Placing…' : 'Submit'}</button>
              <button type="button" className="close" onClick={closeForm}>Cancel</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
