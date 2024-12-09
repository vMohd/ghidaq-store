import MainLayout from "../Layouts/MainLayout";
import Breadcrumbs from "./Breadcrumbs";

const TheAbout = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/", active: false },
    { label: "About Us", link: "/about", active: true },
  ];

  return (
    <MainLayout>
      <div className="container py-5 text-start">
        <Breadcrumbs items={breadcrumbItems} />

        <section className="about-section">
          <h1 className="section-title mb-4">About Us - Ghidaq Store</h1>

          <h2 className="section-title-about">Who Are We?</h2>
          <p className="section-content">
            At Ghidaq Store, we pride ourselves on offering a premium selection
            of high-quality products and services. Whether you're in search of
            cutting-edge laptops, the latest mobiles, sleek TVs, gaming gear,
            premium audio equipment, or essential household items, we have you
            covered. Our mission is to provide a seamless shopping experience
            that delivers value, innovation, and reliability, ensuring we meet
            the diverse needs of our valued customers.
          </p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card about-card text-center p-4 shadow-sm">
                <h3 className="about-card-title">Our Vision</h3>
                <p className="about-card-text">
                  Our vision is to offer a seamless shopping experience by
                  providing high-quality products and outstanding customer
                  service. We strive to be the preferred destination for
                  customers in the region.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card about-card text-center p-4 shadow-sm">
                <h3 className="about-card-title">Our Mission</h3>
                <p className="about-card-text">
                  Our mission is to create a trusted platform where customers
                  can easily access products that improve their daily lives. We
                  are committed to offering the best deals and ensuring a smooth
                  shopping experience.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card about-card text-center p-4 shadow-sm">
                <h3 className="about-card-title">Our Values</h3>
                <p className="about-card-text">
                  We believe in a set of core values that shape our operations.
                  We prioritize integrity in our dealings, ensure the highest
                  quality in our products, and continuously innovate to meet the
                  evolving needs of our customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title-about">About The Developer</h2>
          <p className="section-content">
            Hello there! I'm
            <span className="about-name"> Mohammed Al Sunbul</span>, the
            passionate developer behind this website. With a strong focus on
            detail and a love for creating seamless digital experiences, I
            developed this platform to offer users an engaging and intuitive
            online shopping experience.
          </p>
          <p className="section-content">
            This project was built as part of the
            <strong> Tuwaiq Academy React.js Bootcamp</strong>, where I honed my
            skills in building modern, responsive, and user-friendly single-page
            applications (SPAs).
          </p>
        </section>

        <section className="about-section mb-4">
          <h2 className="section-title-about">Let's Connect</h2>
          <p className="section-content">
            Explore the website, discover the offerings, and if you have any
            questions or suggestions, I'm here to listen. Your journey through
            this online shopping experience is as important to me as it is to
            you. Happy exploring!
          </p>

          <div className="about-social-icons">
            <a
              href="https://github.com/vMohd"
              target="_blank"
              rel="noopener noreferrer"
              className="about-social-icon"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://twitter.com/vmhd"
              target="_blank"
              rel="noopener noreferrer"
              className="about-social-icon"
            >
              <i className="bi bi-twitter-x"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/imohd"
              target="_blank"
              rel="noopener noreferrer"
              className="about-social-icon"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default TheAbout;
