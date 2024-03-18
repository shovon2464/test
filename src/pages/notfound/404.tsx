import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <h2>404 Page Not Found</h2>
      <br />
      <p>Page cannot be found</p>
      <Link to="/">Back to the homepage</Link>
    </div>
  );
};

export default NotFoundPage;
