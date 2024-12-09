import MainLayout from "../Layouts/MainLayout";
import { Link } from 'react-router-dom';


const NotFound = () => {

  return (
    <MainLayout>

        <div className="py-4 container-fluid text-center">
        <h1 className="display-3 fw-bold text-danger mb-3">404</h1>
        <h2 className="display-5 fw-normal mb-4">Page Not Found</h2>
        <h4 className="mb-4">We're sorry, The page you requested couldn't be found. Please go back to the home page.</h4>

        <Link className="btn btn-lg btn-hero-start mb-3" to="/">Go to Home page</Link>

      </div>

    </MainLayout>
  );
};

export default NotFound;
