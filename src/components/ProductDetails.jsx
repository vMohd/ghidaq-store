import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { useCart } from "../CartProvider";
import Alert from "./Alert";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.in/api/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      setAlertMessage("Product has been added to the cart !");
      setAlertType("success");
      setAlertVisible(true);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      navigate("/cart");
    }
  };

  return (
    <MainLayout>
      <div className="container">
        <header className="d-flex justify-content-between align-items-center text-black mb-5">
          <h1 className="fw-bold">Product Details</h1>
          <button className="product-details-back-btn" onClick={handleBack}>
            Back
          </button>
        </header>

        {loading && (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="loader"></div>
          </div>
        )}
        {error && <div className="text-danger fs-3 py-5">Error: {error}</div>}

        {!loading && !error && product && (
          <div className="card shadow-lg product-details-card">
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid rounded product-details-image"
                />
              </div>
              <div className="col-md-8 text-start">
                <h3 className="product-title">{product.title}</h3>

                {product.discount > 5 && (
                  <div className="badge bg-danger text-white position-absolute top-0 end-0 m-3">
                    {product.discount}% OFF
                  </div>
                )}

                <div className="mt-4">
                  <ul className="d-flex product-details-ul">
                    {product.brand && (
                      <li>
                        <strong>Brand:</strong> <span>{product.brand}</span>
                      </li>
                    )}

                    {product.model && (
                      <li>
                        <strong>Model:</strong> <span>{product.model}</span>
                      </li>
                    )}

                    {product.color && (
                      <li>
                        <strong>Color:</strong> <span>{product.color}</span>
                      </li>
                    )}
                  </ul>
                </div>

                <span className="product-details mt-3">About this product:</span>
                <p className="product-description">{product.description}</p>

                <div className="d-flex flex-wrap align-items-center mt-3">
                  <div>
                    <span className="product-list-price-label">Price</span>
                    <div className="d-flex align-items-center me-5">
                      {product.discount > 5 ? (
                        <p className="product-list-price text-decoration-line-through text-muted">
                          ${product.price}
                        </p>
                      ) : (
                        <p className="product-list-price">${product.price}</p>
                      )}

                      {product.discount > 5 && (
                        <p className="product-list-price ms-3">
                          $
                          {(
                            product.price -
                            (product.price * product.discount) / 100
                          ).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="product-buttons">
                    <button
                      className="product-btn-add"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="product-btn-buy"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Alert
        type={alertType}
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
        duration={3000}
      />
    </MainLayout>
  );
};

export default ProductDetails;
