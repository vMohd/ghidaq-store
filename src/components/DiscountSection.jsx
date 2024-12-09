import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DiscountSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productIds = [4, 14, 110];
        const productPromises = productIds.map((id) =>
          fetch(`https://fakestoreapi.in/api/products/${id}`).then((res) =>
            res.json()
          )
        );

        const fetchedProducts = await Promise.all(productPromises);
        
        const validProducts = fetchedProducts
          .map((response) => {
            if (response.status === "SUCCESS") {
              const product = response.product;
              return {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                discount: product.discount || 0,
              };
            }
            return null;
          })
          .filter((product) => product !== null);

        setProducts(validProducts);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products: " + err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="discount-section py-5">
      <div className="container">
        <h2 className="section-title mb-4">Special Discount Offers!</h2>
        <p className="section-description fs-5">
          Get amazing discounts starting from 5% to 29% on selected products!
          Don’t miss out on these limited-time offers.
        </p>

        {loading && (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="loader"></div>
          </div>
        )}

        {error && <div className="text-danger fs-3 py-5">{error}</div>}

        {!loading &&
        !error &&
        Array.isArray(products) &&
        products.length > 0 ? (
          <div className="row g-4 py-4">
            {products.map((product) => {
              const price = parseFloat(product.price);
              const discount = parseFloat(product.discount);

              const discountedPrice =
                !isNaN(price) && !isNaN(discount)
                  ? (price - (price * discount) / 100).toFixed(2)
                  : null;

              return (
                <div className="col-md-6 col-lg-4" key={product.id}>
                  <div className="card product-list h-100 shadow-lg">
                    <div className="card-body d-flex flex-column align-items-center">
                      <img
                        src={product.image}
                        alt={product.title || "No Title"}
                        className="mb-3 product-list-image"
                      />
                      <h5 className="product-list-title">
                        {product.title
                          ? product.title.slice(0, 60)
                          : "No Title"}{" "}
                        ...
                      </h5>
                        <div className="badge bg-danger text-white position-absolute top-0 end-0 m-3">
                          {discount}% OFF
                        </div>

                      <div className="row w-100 text-start mt-4">
                        <div className="product-list-price-container">
                          <div className="d-flex flex-column">
                            <span className="product-list-price-label">
                              Price
                            </span>
                            <div className="d-flex align-items-center">
                              <p className="product-list-price text-decoration-line-through text-muted">
                                ${product.price}
                              </p>
                              <p className="product-list-price ms-3">
                                ${discountedPrice}
                              </p>
                            </div>
                          </div>
                          <Link
                            to={`/product/${product.id}`}
                            className="product-list-btn btn btn-primary mt-3"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-5">
            <p className="display-6">No products available for discounts.</p>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/sales" className="btn btn-hero-start btn-lg">
            View All Offers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
