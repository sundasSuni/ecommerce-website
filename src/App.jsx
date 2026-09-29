import { useMemo, useState } from "react";
import "./App.css";

const coffees = [
  {
    id: 1,
    name: "Americano",
    price: 450,
    category: "Black Coffee",
    tag: "Classic",
    image:
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=900&q=85",
    description:
      "Bold espresso blended with hot water for a clean, rich and timeless coffee experience.",
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 550,
    category: "Popular",
    tag: "Popular",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=85",
    description:
      "Smooth espresso, steamed milk and silky foam finished with a delicate coffee aroma.",
  },
  {
    id: 3,
    name: "Mocha",
    price: 600,
    category: "Chocolate Coffee",
    tag: "Signature",
    image:
      "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=900&q=85",
    description:
      "A luxurious combination of espresso, creamy milk and rich chocolate for a sweet finish.",
  },
  {
    id: 4,
    name: "Ice Caramel Latte",
    price: 650,
    category: "Cold Coffee",
    tag: "Cold",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
    description:
      "Chilled espresso, creamy milk and golden caramel served over ice.",
  },
  {
    id: 5,
    name: "Lavender Latte",
    price: 620,
    category: "Signature",
    tag: "Special",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85",
    description:
      "A delicate floral latte combining smooth espresso with subtle lavender notes.",
  },
  {
    id: 6,
    name: "Breve",
    price: 580,
    category: "Signature",
    tag: "Creamy",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
    description:
      "Rich espresso prepared with steamed half-and-half for an exceptionally creamy texture.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1495867032107-1f1a0c2f0d3e?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1000&q=85",
];

const categories = [
  "All",
  "Popular",
  "Black Coffee",
  "Chocolate Coffee",
  "Cold Coffee",
  "Signature",
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCoffee, setSelectedCoffee] = useState(null);

  const filteredCoffees = useMemo(() => {
    if (activeCategory === "All") {
      return coffees;
    }

    return coffees.filter(
      (coffee) => coffee.category === activeCategory
    );
  }, [activeCategory]);

  const addToCart = (coffee) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === coffee.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === coffee.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...coffee, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add a coffee first.");
      return;
    }

    alert(
      `Thank you for ordering from Sundas Cafe!\n\nTotal: Rs. ${totalPrice.toLocaleString()}`
    );

    setCart([]);
    setCartOpen(false);
  };

  return (
    <div className="app">
      {/* TOP BAR */}
      <div className="top-bar">
        <p>Freshly roasted • Carefully brewed • Beautifully served</p>

        <span>Karachi • Pakistan</span>
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        <div
          className="brand"
          onClick={() => scrollToSection("home")}
        >
          <span className="brand-mark">S</span>

          <div>
            <strong>Sundas Cafe</strong>
            <small>COFFEE &amp; MOMENTS</small>
          </div>
        </div>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <button onClick={() => scrollToSection("home")}>
            Home
          </button>

          <button onClick={() => scrollToSection("menu")}>
            Menu
          </button>

          <button onClick={() => scrollToSection("about")}>
            About
          </button>

          <button onClick={() => scrollToSection("gallery")}>
            Gallery
          </button>

          <button onClick={() => scrollToSection("testimonials")}>
            Testimonials
          </button>

          <button onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </nav>

        <div className="nav-actions">
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            Cart
            <span>{totalItems}</span>
          </button>

          <button
            className="order-button"
            onClick={() => scrollToSection("menu")}
          >
            Order Now
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              <span></span>
              BEST COFFEE SELECTION
            </p>

            <h1>
              Enjoy the most
              <br />
              <em>delicious coffee.</em>
            </h1>

            <p className="hero-text">
              Crafted for slow mornings, meaningful conversations
              and beautiful moments. Discover coffee made with
              passion at Sundas Cafe.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={() => scrollToSection("menu")}
              >
                Browse the Menu
                <span>↗</span>
              </button>

              <button
                className="text-button"
                onClick={() => scrollToSection("about")}
              >
                Read Our Story
                <span>→</span>
              </button>
            </div>

            <div className="hero-info">
              <div>
                <strong>01</strong>
                <span>Premium Beans</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Expert Brewing</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Warm Atmosphere</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-circle"></div>

            <div className="hero-image-frame">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=90"
                alt="Premium coffee at Sundas Cafe"
              />
            </div>

            <div className="hero-badge">
              <span>EST.</span>
              <strong>2026</strong>
              <small>SUNDAS CAFE</small>
            </div>

            <div className="coffee-beans">
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </div>
          </div>
        </section>

        {/* INTRO STRIP */}
        <section className="intro-strip">
          <div>
            <span className="strip-number">01</span>
            <strong>Exceptional Beans</strong>
            <p>Selected with care</p>
          </div>

          <div>
            <span className="strip-number">02</span>
            <strong>Perfectly Brewed</strong>
            <p>Made fresh every time</p>
          </div>

          <div>
            <span className="strip-number">03</span>
            <strong>Beautiful Moments</strong>
            <p>Served with warmth</p>
          </div>

          <div>
            <span className="strip-number">04</span>
            <strong>Made For You</strong>
            <p>Your coffee, your way</p>
          </div>
        </section>

        {/* MENU */}
        <section className="section menu-section" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR MENU</p>

              <h2>
                A cup made
                <br />
                <em>just right.</em>
              </h2>
            </div>

            <p className="section-description">
              From bold classics to signature creations, every
              cup at Sundas Cafe is prepared to turn an ordinary
              moment into something special.
            </p>
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category ? "active" : ""
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="coffee-grid">
            {filteredCoffees.map((coffee) => (
              <article className="coffee-card" key={coffee.id}>
                <div className="coffee-image">
                  <img
                    src={coffee.image}
                    alt={coffee.name}
                  />

                  <span className="coffee-tag">
                    {coffee.tag}
                  </span>

                  <button
                    className="quick-view"
                    onClick={() => setSelectedCoffee(coffee)}
                  >
                    Quick View
                  </button>
                </div>

                <div className="coffee-card-content">
                  <div className="coffee-title-row">
                    <h3>{coffee.name}</h3>

                    <strong>
                      Rs. {coffee.price}
                    </strong>
                  </div>

                  <p>{coffee.description}</p>

                  <button
                    className="add-button"
                    onClick={() => addToCart(coffee)}
                  >
                    <span>+</span>
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* OUR COFFEE */}
        <section className="coffee-story">
          <div className="coffee-story-image">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=90"
              alt="Freshly brewed coffee"
            />

            <div className="coffee-origin-card">
              <span>ORIGIN</span>
              <strong>Costa Rica</strong>
              <small>Honey &amp; Tropical Fruit</small>
            </div>
          </div>

          <div className="coffee-story-content">
            <p className="eyebrow">OUR COFFEE</p>

            <h2>
              Every bean has
              <br />
              <em>a story.</em>
            </h2>

            <p className="large-copy">
              We believe exceptional coffee starts long before
              it reaches your cup. Our beans are carefully selected
              for their character, aroma and unforgettable finish.
            </p>

            <div className="coffee-notes">
              <div>
                <span>VEGA &amp; 27 / 12 / 15</span>
                <strong>Costa Rica / Sumatra</strong>
                <small>Earthy and Spicy</small>
              </div>

              <div>
                <span>VEGA &amp; 08</span>
                <strong>Costa Rica</strong>
                <small>Honey and Tropical Fruit</small>
              </div>
            </div>

            <div className="breath-process">
              <span>BREATH PROCESS CUP</span>
              <p>
                A thoughtful brewing process that lets the
                natural personality of every bean shine through.
              </p>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section className="section story-section" id="about">
          <div className="story-content">
            <p className="eyebrow">OUR STORY</p>

            <h2>
              More than coffee.
              <br />
              <em>A feeling.</em>
            </h2>

            <p>
              Sundas Cafe was born from a single dream to create
              a space where great coffee, warm vibes, and beautiful
              moments come together.
            </p>

            <p>
              We believe coffee is not just a drink; it's a feeling,
              a connection, and a reason to slow down.
            </p>

            <button
              className="outline-button"
              onClick={() => scrollToSection("contact")}
            >
              Visit Sundas Cafe
              <span>↗</span>
            </button>
          </div>

          <div className="story-visual">
            <div className="story-main-image">
              <img
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1100&q=90"
                alt="Sundas Cafe coffee"
              />
            </div>

            <div className="story-small-image">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=90"
                alt="Cafe interior"
              />
            </div>

            <div className="story-number">2026</div>
          </div>
        </section>

        {/* SPACE */}
        <section className="space-section">
          <div className="space-overlay">
            <p className="eyebrow">OUR SPACE</p>

            <h2>
              Come for the coffee.
              <br />
              <em>Stay for the atmosphere.</em>
            </h2>

            <p>
              A warm corner designed for conversations, creativity,
              quiet mornings and everything in between.
            </p>

            <button
              className="primary-button"
              onClick={() => scrollToSection("gallery")}
            >
              Explore Our Space
              <span>↗</span>
            </button>
          </div>
        </section>

        {/* GALLERY */}
        <section className="section gallery-section" id="gallery">
          <div className="section-heading gallery-heading">
            <div>
              <p className="eyebrow">OUR GALLERY</p>

              <h2>
                Moments worth
                <br />
                <em>remembering.</em>
              </h2>
            </div>

            <p className="section-description">
              Take a little look inside Sundas Cafe — where every
              corner has its own mood and every cup has its own story.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div
                className={`gallery-item gallery-${index + 1}`}
                key={image}
              >
                <img
                  src={image}
                  alt={`Sundas Cafe gallery ${index + 1}`}
                />

                <div className="gallery-overlay">
                  <span>0{index + 1}</span>
                  <strong>Sundas Cafe</strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          className="section testimonials-section"
          id="testimonials"
        >
          <div className="center-heading">
            <p className="eyebrow">KIND WORDS</p>

            <h2>
              Loved by coffee
              <br />
              <em>people.</em>
            </h2>
          </div>

          <div className="testimonial-grid">
            <article className="testimonial-card">
              <div className="stars">★★★★★</div>

              <p>
                “The atmosphere is beautiful and the cappuccino
                is honestly one of the smoothest coffees I've had.
                Sundas Cafe feels like a place you want to return to.”
              </p>

              <div className="customer">
                <div className="customer-avatar">A</div>

                <div>
                  <strong>Amelia R.</strong>
                  <span>London, UK</span>
                </div>
              </div>
            </article>

            <article className="testimonial-card featured-testimonial">
              <div className="quote-mark">“</div>

              <p>
                “Beautiful coffee, beautiful space and such a warm
                experience. The Ice Caramel Latte is a must-try.”
              </p>

              <div className="customer">
                <div className="customer-avatar">S</div>

                <div>
                  <strong>Sarah M.</strong>
                  <span>Karachi, Pakistan</span>
                </div>
              </div>
            </article>

            <article className="testimonial-card">
              <div className="stars">★★★★★</div>

              <p>
                “Everything feels intentional — from the beans to
                the presentation. A perfect spot for a quiet coffee
                or a long conversation.”
              </p>

              <div className="customer">
                <div className="customer-avatar">D</div>

                <div>
                  <strong>Daniel K.</strong>
                  <span>Manchester, UK</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-content">
            <p className="eyebrow">YOUR NEXT COFFEE</p>

            <h2>
              Make today
              <br />
              <em>a little warmer.</em>
            </h2>

            <p>
              Your perfect cup is waiting. Choose your favorite,
              add it to your cart and let Sundas Cafe make your
              moment special.
            </p>

            <button
              className="primary-button"
              onClick={() => scrollToSection("menu")}
            >
              Order Your Coffee
              <span>↗</span>
            </button>
          </div>

          <div className="cta-cup">
            <div className="cup-steam">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="cup">
              <div className="cup-logo">SUNDAS</div>
            </div>

            <div className="saucer"></div>

            <div className="bean bean-one"></div>
            <div className="bean bean-two"></div>
            <div className="bean bean-three"></div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact-section" id="contact">
          <div className="contact-intro">
            <p className="eyebrow">GET IN TOUCH</p>

            <h2>
              Let's share a
              <br />
              <em>coffee moment.</em>
            </h2>

            <p>
              Have a question, collaboration idea or simply want
              to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="contact-details">
            <a
              href="mailto:sundassheikh006@gmail.com"
              className="contact-item"
            >
              <span>EMAIL</span>
              <strong>sundassheikh006@gmail.com</strong>
            </a>

            <div className="contact-item">
              <span>LINKEDIN</span>
              <strong>Sundas Sheikh</strong>
            </div>

            <div className="contact-item">
              <span>PHONE</span>
              <strong>+92 300 0000000</strong>
              <small>Replace with your actual number</small>
            </div>

            <div className="contact-item">
              <span>LOCATION</span>
              <strong>Karachi, Pakistan</strong>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-mark">S</span>

            <div>
              <strong>Sundas Cafe</strong>
              <small>COFFEE &amp; MOMENTS</small>
            </div>
          </div>

          <p>
            Great coffee.
            <br />
            Warm moments.
          </p>
        </div>

        <div className="footer-links">
          <button onClick={() => scrollToSection("home")}>
            Home
          </button>

          <button onClick={() => scrollToSection("menu")}>
            Menu
          </button>

          <button onClick={() => scrollToSection("about")}>
            About
          </button>

          <button onClick={() => scrollToSection("gallery")}>
            Gallery
          </button>

          <button onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Sundas Cafe. All rights reserved.</span>

          <span>Designed with coffee &amp; care.</span>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setCartOpen(false)}
          ></div>

          <aside className="cart-drawer">
            <div className="drawer-header">
              <div>
                <p className="eyebrow">YOUR ORDER</p>
                <h3>Your Coffee Cart</h3>
              </div>

              <button
                className="close-button"
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cup">☕</div>

                <h4>Your cart is empty.</h4>

                <p>
                  Add something delicious from our menu and
                  your order will appear here.
                </p>

                <button
                  className="primary-button"
                  onClick={() => {
                    setCartOpen(false);
                    scrollToSection("menu");
                  }}
                >
                  Browse Menu
                  <span>↗</span>
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">
                        <h4>{item.name}</h4>

                        <strong>
                          Rs. {item.price}
                        </strong>

                        <div className="quantity">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total</span>

                    <strong>
                      Rs. {totalPrice.toLocaleString()}
                    </strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={placeOrder}
                  >
                    Place Order
                    <span>↗</span>
                  </button>
                </div>
              </>
            )}
          </aside>
        </>
      )}

      {/* QUICK VIEW MODAL */}
      {selectedCoffee && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedCoffee(null)}
        >
          <div
            className="quick-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedCoffee(null)}
            >
              ×
            </button>

            <div className="modal-image">
              <img
                src={selectedCoffee.image}
                alt={selectedCoffee.name}
              />
            </div>

            <div className="modal-content">
              <p className="eyebrow">
                {selectedCoffee.category}
              </p>

              <h3>{selectedCoffee.name}</h3>

              <strong className="modal-price">
                Rs. {selectedCoffee.price}
              </strong>

              <p>{selectedCoffee.description}</p>

              <button
                className="primary-button"
                onClick={() => {
                  addToCart(selectedCoffee);
                  setSelectedCoffee(null);
                }}
              >
                Add to Cart
                <span>+</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;