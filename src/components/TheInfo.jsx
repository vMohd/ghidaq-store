import MainLayout from "../Layouts/MainLayout";
import Breadcrumbs from "./Breadcrumbs";
import Payments from "../assets/payments.svg";
import Deliveries from "../assets/deliveries.svg";
import Shopping from "../assets/shopping.svg";

const TheInfo = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/", active: false },
    { label: "Shopping Information", link: "/info", active: true },
  ];

  return (
    <MainLayout>
      <div className="container py-5 text-start">
        <Breadcrumbs items={breadcrumbItems} />

        <section className="help-section">
          <h2 className="section-title">
            Delivery, Returns, and Payment Options
          </h2>
        </section>
      </div>

      <div className="container text-start py-1">
        <div className="row align-items-start justify-content-between mb-5">
          <div className="col-md-6">
            <h3 className="section-title-about">Delivery Information</h3>
            <p className="section-content">
              At Ghidaq Store, we prioritize timely and secure delivery. Here's
              what you need to know about our delivery process:
            </p>
            <div className="info-list">
              <p>Standard delivery takes 3-5 business days.</p>
              <p>Expedited delivery options are available at checkout.</p>
              <p>Free shipping on orders over $150.</p>
              <p>Tracking details will be provided upon dispatch.</p>
            </div>
          </div>
          <div className="col-md-5 mt-4">
            <img
              src={Deliveries}
              alt="Delivery Options"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <div className="container-fluid alt-section py-5 text-start">
        <div className="container">
          <div className="row align-items-start justify-content-between mb-5">
            <div className="col-md-4 mb-4">
              <img src={Shopping} alt="Returns Policy" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h3 className="section-title-about">Returns</h3>
              <p className="section-content">
                We strive to ensure your satisfaction with every purchase. If
                you're not happy with your product, you can return it under the
                following conditions:
              </p>
              <div className="info-list">
                <p>Returns accepted within 14 days of purchase.</p>
                <p>Items must be in original condition and packaging.</p>
                <p>Proof of purchase is required.</p>
              </div>
              <p>
                For more information, please contact our customer support team.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5 text-start">
        <div className="row align-items-start justify-content-between mb-5">
          <div className="col-md-6">
            <h3 className="section-title-about">Payment Options</h3>
            <p className="section-content">
              We accept a variety of payment methods to make your shopping
              experience seamless:
            </p>
            <div className="info-list">
              <p>Credit/Debit Cards (Visa, MasterCard, Mada, etc.)</p>
              <p>Online Payment Gateways (Apple Pay, PayPal, etc.)</p>
              <p>Cash on Delivery (where available)</p>
            </div>
          </div>
          <div className="col-md-5 mt-4">
            <img src={Payments} alt="Payment Options" className="img-fluid" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TheInfo;
