
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-techGray-light">
      <div className="text-center max-w-md px-6 py-12 bg-white rounded-xl shadow-card">
        <div className="w-16 h-16 mx-auto mb-6 bg-techBlue/10 rounded-full flex items-center justify-center">
          <span className="text-techBlue text-2xl font-semibold">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-techGray-dark mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="button-shine bg-techBlue text-white px-6 py-3 rounded-md font-medium transition-all inline-block hover:shadow-md hover:bg-techBlue/90"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
