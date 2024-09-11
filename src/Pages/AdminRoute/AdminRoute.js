import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`https://speako-server.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, loading);
        setAdmin(data.admin);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
    console.log(admin, loading, "state");
  }, [user.email]);

  if (isLoading || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
