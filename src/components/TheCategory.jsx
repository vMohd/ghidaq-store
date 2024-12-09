import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Breadcrumbs from "./Breadcrumbs";
import Pagination from "./Pagination";

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.in/api/products/category?type=${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        return response.json();
      })
      .then((data) => {
        if (data?.products?.length > 0) {
          setProducts(data.products); 
          setError(null); 
        } else {
          setError("No products found in this category.");
          setProducts([]); 
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);
  

  const breadcrumbItems = [
    { label: "Home", link: "/", active: false },
    { label: category, link: `/category/${category}`, active: true },
  ];

  return (
    <MainLayout>
      <div className="container py-1">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="text-start text-black mb-5">
          <h1 className="fw-bold mb-3 text-capitalize">
            Explore Our {category} Collection
          </h1>
          <p className="text-muted mb-4">
            Dive into our premium selection of {category} products.
          </p>
        </header>

        {loading && (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="loader"></div>
          </div>
        )}
        {error && <div className="text-danger fs-3 py-5 ">Error: {error}</div>}

        {!loading && !error && products.length > 0 && (
          <div className="row g-4 py-4">
            {currentProducts.map((product) => (
              <div className="col-md-6 col-lg-4" key={product.id}>
                <div className="card product-list h-100 shadow-lg">
                  <div className="card-body d-flex flex-column align-items-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="mb-3 product-list-image"
                    />
                    <h5 className="product-list-title">
                      {product.title.slice(0, 60)} ...
                    </h5>
                    {product.discount > 5 && (
                      <div className="badge bg-danger text-white position-absolute top-0 end-0 m-3">
                        {product.discount}% OFF
                      </div>
                    )}

                    <div className="row w-100 text-start mt-4">
                      <div className="product-list-price-container">
                        <div className="d-flex flex-column">
                          <span className="product-list-price-label">
                            Price
                          </span>
                          <div className="d-flex align-items-center">
                            {product.discount > 5 ? (
                              <p className="product-list-price text-decoration-line-through text-muted">
                                ${product.price}
                              </p>
                            ) : (
                              <p className="product-list-price">
                                ${product.price}
                              </p>
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
                        <Link
                          to={`/product/${product.id}`}
                          className="product-list-btn"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="py-5">
            <p className="display-6">No products available in this category.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Category;
