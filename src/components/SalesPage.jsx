import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Breadcrumbs from "./Breadcrumbs";
import Pagination from "./Pagination";

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.in/api/products");
        const data = await response.json();

        if (data && Array.isArray(data.products)) {
          const validProducts = data.products
            .filter((product) => product.discount && product.discount > 5)
            .map((product) => ({
              id: product.id,
              title: product.title,
              image: product.image,
              price: product.price,
              discount: product.discount || 0,
            }));

          setProducts(validProducts);
        } else {
          setError("Products data not found in response.");
        }

        setLoading(false);
      } catch (err) {
        setError("Error fetching products: " + err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const breadcrumbItems = [
    { label: "Home", link: "/", active: false },
    { label: "Sales", link: "/sales", active: true },
  ];

  return (
    <MainLayout>
      <section className="sales-page py-5">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />

          <h2 className="section-title mb-4 text-start">All Sale Items</h2>
          <p className="section-description fs-5 text-start">
            Discover all our sale items with amazing discounts! Limited-time
            offers, grab them while they last!
          </p>

          {loading && (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="loader"></div>
            </div>
          )}

          {error && <div className="text-danger fs-3 py-5">Error: {error}</div>}

          {!loading &&
          !error &&
          products.length > 0 ? (
            <div className="row g-4 py-4">
              {currentProducts.map((product) => {
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
                          alt={`${product.title}`}
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
                              className="product-list-btn mt-3"
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

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>

          ) : (
            <div className="py-5">
              <p className="display-6">No products available for sale.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default SalesPage;
