import { useEffect } from "react";

const Error = ({ statusCode, message }) => {
  useEffect(() => {
    if (statusCode !== 404) {
      localStorage.removeItem("token");
      localStorage.removeItem("expTime");
    }
  });

  return (
    <div>
      <section className="hero is-danger">
        <div className="hero-body">
          <p className="title">My Vocaby</p>
          <p className="subtitle">{statusCode || "Error occured!"}</p>
        </div>
      </section>
      <section className="section is-medium">
        <h1 className="title">{message}</h1>
      </section>
    </div>
  );
};
export default Error;
