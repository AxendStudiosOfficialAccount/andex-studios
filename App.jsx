
import { useState } from 'react';
import './App.css';


const products = [
  {
    id: 1,
    name: 'Andex Essential Tee',
    category: 'T-Shirts',
    price: 28,
    color: 'Black',
    emoji: '👕',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 2,
    name: 'Studio Graphic Tee',
    category: 'Graphic Tees',
    price: 35,
    color: 'White',
    emoji: '🎨',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 3,
    name: 'Andex Coffee Mug',
    category: 'Mugs',
    price: 18,
    color: 'Cream',
    emoji: '☕',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 4,
    name: 'Propeller Tee',
    category: 'Graphic Tees',
    price: 32,
    color: 'Grey',
    emoji: '✳',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 5,
    name: 'Everyday Oversized Tee',
    category: 'T-Shirts',
    price: 38,
    color: 'Stone',
    emoji: '👕',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 6,
    name: 'Studio Ceramic Mug',
    category: 'Mugs',
    price: 22,
    color: 'Black',
    emoji: '◉',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=85'
  },
   {
  id: 7,
  name: "5V DC Motor",
  price: 15,
  image: "https://media.istockphoto.com/id/958669244/photo/electromotor.jpg?s=1024x1024&w=is&k=20&c=t2jFJontbiM9b-PQ9BRa2APnyIs-jejRYHKWYFqwwXw=",
  description: "Compact 5V DC motor for DIY electronics and robotics."
}
];


const categories = ['All', 'T-Shirts', 'Graphic Tees', 'Mugs', 'Motors'];

function App() {
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });


const addToCart = (product) => {
  setCart((current) => {
    const existing = current.find((item) => item.id === product.id);

    if (existing) {
      return current.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...current, { ...product, quantity: 1 }];
  });

  setCartOpen(true);
};

const changeQuantity = (productId, amount) => {
  setCart((current) =>
    current
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeFromCart = (productId) => {
  setCart((current) =>
    current.filter((item) => item.id !== productId)
  );
};

const cartCount = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
);

const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);


  return (
    <div className="site">
      <div className="announcement">INTRODUCING THE ANDEX STUDIO COLLECTION — SHOP THE DROP</div>

      <header className="header">
        <a className="logo" href="#home">ANDEX<span>®</span><small>STUDIOS</small></a>
        <nav>
          <a href="#shop">Shop</a>
          <a href="#story">Our Story</a>
        </nav>
        <a className="cart-link" href="#shop">Bag ({cart.length})</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">INDEPENDENT DESIGN STUDIO · EST. 2026</p>
            <h1>MADE TO<br />STAND <em>OUT.</em></h1>
            <p className="hero-text">Everyday essentials. Unexpected graphics. Designed for wherever life takes you.</p>
            <a className="button dark-button" href="#shop">SHOP THE COLLECTION ↗</a>
          </div>
          <div className="hero-art">
            <div className="art-circle"></div>
            <div className="art-word">A<span>/</span>X</div>
            <div className="art-caption">OBJECTS FOR EVERYDAY LIFE<br />ANDEX STUDIOS · VOL. 001</div>
            <div className="art-stamp">DESIGNED<br />DIFFERENT.</div>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div><p className="eyebrow">THE CURRENT DROP</p><h2>Shop the collection<span>.</span></h2></div>
            <span className="item-count">{filtered.length} ITEMS</span>
          </div>

          <div className="shop-tools">
            <div className="filters">
              {categories.map((item) => (
                <button key={item} className={category === item ? 'filter active' : 'filter'} onClick={() => setCategory(item)}>{item}</button>
              ))}
            </div>
            <input aria-label="Search products" placeholder="Search pieces..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="product-grid">
            {filtered.map((product, index) => (
              <article className="product" key={product.id}>
                <div className={`product-art art-${index % 6}`}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="product-tag">ANDEX STUDIO</span>
                  <span className="product-number">NO. 00{product.id}</span>
                </div>

                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {product.color} · {product.category}
                    </p>
                  </div>
                  <strong>${product.price}</strong>
                </div>
                <button className="add-button" onClick={() => addToCart(product)}>
                  ADD TO BAG +
                </button>
              </article>
            ))}
            {filtered.length === 0 && <p>No products found. Try another search.</p>}
          </div>
        </section>

        <section className="story" id="story">
          <p className="eyebrow">A LITTLE ABOUT US</p>
          <h2>
            Less ordinary.
            <br />
            <em>More you.</em>
          </h2>
          <p>
            ANDEX STUDIOS is an independent creative label making everyday objects feel a little
            less ordinary. Thoughtful pieces, bold graphics, and room to make them your own.
          </p>
          <a href="#shop" className="text-link">
            SHOP THE COLLECTION ↗
          </a>
        </section>

        <section className="newsletter">
          <p className="eyebrow">STAY IN THE LOOP</p>
          <h2>
            Good things are
            <br />
            in the making.
          </h2>
          <p>New drops, studio updates, and first looks.</p>
          <a className="button light-button" href="#shop">
            EXPLORE THE DROP ↗
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="logo footer-logo" href="#home">
          ANDEX<span>®</span>
          <small>STUDIOS</small>
        </a>
        <p>INDEPENDENT BY DESIGN.</p>
        <p>© 2026 ANDEX STUDIOS</p>
      </footer>

      {cart.length > 0 && (
        <div className="cart-notice" role="status">
          <span>
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag
          </span>
          <strong>Total: ${total}</strong>
          <button onClick={() => setCart([])}>Clear bag</button>
        </div>
      )}

      <footer className="copyright-footer">
        <p>© {new Date().getFullYear()} ANDEX STUDIOS. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

