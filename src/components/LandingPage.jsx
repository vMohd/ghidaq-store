import { Link } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import DiscountSection from "./DiscountSection";
import Deliveries from "../assets/deliveries.svg";
import DiscountHeader from "../features/DiscountHeader";

const cardData = [
  {
    title: "Laptops",
    description:
      "High-performance laptops for work, gaming, and entertainment.",
    link: "/category/laptop",
    icon: "laptop",
  },
  {
    title: "Smartphones",
    description: "Latest smartphones with cutting-edge features.",
    link: "/category/mobile",
    icon: "phone",
  },
  {
    title: "TVs",
    description: "Smart TVs with stunning picture quality.",
    link: "/category/tv",
    icon: "tv",
  },
  {
    title: "Audio",
    description: "Premium audio devices for an immersive sound experience.",
    link: "/category/audio",
    icon: "headphones",
  },
  {
    title: "Gaming",
    description:
      "Top gaming consoles and accessories for ultimate performance.",
    link: "/category/gaming",
    icon: "controller",
  },
  {
    title: "Appliances",
    description: "Essential home appliances for comfort and convenience.",
    link: "/category/appliances",
    icon: "gear",
  },
];

const features = [
  {
    icon: "bi-check-circle",
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    icon: "bi-box",
    title: "Free Shipping",
    description: "Order over $150",
  },
  {
    icon: "bi-headset",
    title: "24/7 Support",
    description: "Dedicated support",
  },
  {
    icon: "bi-credit-card",
    title: "Secure Payment",
    description: "Safe and encrypted",
  },
];

const LandingPage = () => {
  return (
    <>
          <DiscountHeader />
    <MainLayout>
      <section className="hero-section py-5">
        <div className="container text-center">
          <h1 className="hero-title display-2 fw-bold">
            Discover Our <span className="hero-text">Exclusive </span>
            Collections
          </h1>
          <p className="hero-subtitle mb-4">
            Dive into products that elevate the way you work, play, and live.
          </p>
          <div className="hero-buttons">
            <a href="#categories" className="btn btn-hero-start">
              Start Shopping
            </a>
            <button className="btn btn-hero-learn">
              <Link
                to="/about"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Learn More
              </Link>
            </button>
          </div>
        </div>
      </section>

      <section className="categories-section py-5" id="categories">
        <div className="section-divider"></div>
        <div className="container mt-5">
          <h2 className="section-title display-4 fw-bold">
            Shop by Categories
          </h2>
          <p className="section-subtitle mb-5">
            Explore our diverse collection of +150 unique products
          </p>

          <div className="row g-4">
            {cardData.map((card, index) => (
              <div className="col-md-4" key={index}>
                <Link
                  to={card.link}
                  className="card category-card h-100 shadow-sm text-decoration-none"
                >
                  <div className="card-body d-flex flex-column align-items-center text-center">
                    <div className="icon-container mb-4">
                      <i className={`bi bi-${card.icon} fs-2`}></i>
                    </div>
                    <h5 className="category-card-title fw-bold">
                      {card.title}
                    </h5>
                    <p className="category-card-text text-alt">
                      {card.description}
                    </p>
                    <div className="w-100 text-end mt-auto">
                      <span className="fw-bold text-explore">
                        Explore <i className="bi bi-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DiscountSection />

      <section className="features-section row">
        {features.map((feature, index) => (
          <div className="feature col-md-3 text-center" key={index}>
            <div className="icon mb-3" style={{ fontSize: "3rem" }}>
              <i className={`bi ${feature.icon}`}></i>
            </div>
            <h2 className="title">{feature.title}</h2>
            <p className="description">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="py-5">
        <div className="container">
          <header className="mb-5 text-center">
            <h2 className="section-title fw-bold">Our Promise to You</h2>
            <p className="text-muted">Your satisfaction is our top priority.</p>
          </header>

          <div className="row justify-content-between align-items-start mb-5">
            <div className="col-md-4 mb-4">
              <img
                src={Deliveries}
                alt="Delivery Options"
                className="img-fluid"
              />
            </div>

            <div className="col-md-6 mb-4">
              <div className="text-start">
                <h4 className="fw-bold mb-3">Why Shop With Us?</h4>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong>Exclusive Deals:</strong> Enjoy discounts and
                    limited-time offers available only at our store.
                  </li>
                  <li className="mb-3">
                    <strong>Fast & Reliable Shipping:</strong> Get your products
                    delivered on time, every time.
                  </li>
                  <li>
                    <strong>Rewards Program:</strong> Earn points with every
                    purchase and redeem them for exciting rewards.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row justify-content-between align-items-start text-start">
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold mb-3">Unparalleled Quality</h4>
              <p className="text-muted">
                We promise to offer only the highest-quality products sourced
                from trusted brands. Every item is carefully selected to exceed
                your expectations.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h4 className="fw-bold mb-3">100% Satisfaction Guaranteed</h4>
              <p className="text-muted">
                We stand by every product we sell. If you're not happy with your
                purchase, we’ll make it right—no questions asked.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h4 className="fw-bold mb-3">Commitment to Sustainability</h4>
              <p className="text-muted">
                We are dedicated to reducing our environmental footprint by
                offering eco-friendly packaging and partnering with sustainable
                suppliers.
              </p>
            </div>
          </div>

          <div className="text-center mt-3">
            <Link to="/info" className="btn btn-lg btn-hero-start px-4 py-2">
              Explore Payment & Shipping Options
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
    </>
  );
};

export default LandingPage;
