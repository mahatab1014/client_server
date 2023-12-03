import { Link, useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-5">
      <figure className="w-2/4 mx-auto">
        <img
          src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png"
          alt=""
        />
      </figure>
      <div className="w-full my-5">
        <h2 className="text-3xl md:text-4xl text-center">Page Not Found</h2>
      </div>
      <div className="text-center space-x-4  z-50">
        <button className="btn btn-error" onClick={() => navigate(-1)}>
          Back
        </button>
        <Link to="/" className="btn btn-accent">
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
