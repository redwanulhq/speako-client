import React, { useState } from "react";
import Footer from "../../../Shared/Footer/Footer";
import Header from "../../../Shared/Header/Header";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import "./Login.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [error, setError] = useState("");
  const {
    signInUsingGoogle,
    setUser,
    loginWithEmailPassword,
    setIsLoading,
    auth,
  } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const redirectURI = location.state?.from || "/";

  const handleGoogleLogin = () => {
    setIsLoading(true);
    signInUsingGoogle()
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        const saveUser = (displayName, email, photoURL) => {
          const user = { displayName, email, photoURL };
          fetch("https://speako-server.vercel.app/users", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
            });
        };
        saveUser(
          result.user.displayName,
          result.user.email,
          result.user.photoURL
        );
        history.push(redirectURI);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // e.preventDefault();
    setIsLoading(true);
    const email = data.email;
    const password = data.password;
    loginWithEmailPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        history.push(redirectURI);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  console.log(errors);

  return (
    <>
      <Header></Header>
      <main style={{ backgroundColor: "#f8f9fa" }}>
        <Container className="cotainer">
          <div className="row">
            <div className="col-md-6  d-flex align-items-center">
              <div className="form-container w-100 p-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {})}
                  />
                  <p className="text-danger">{error}</p>
                  <input
                    type="submit"
                    className="btn btn-dark w-100"
                    value="Log In"
                  />
                </form>
                <hr />
                <p className="text-center">or</p>
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline-dark w-100 py-2"
                >
                  Log In with Gmail
                </button>
                <p className="pt-2 pb-5">
                  Don’t have an account yet?{" "}
                  <Link to="/register">register</Link>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img
                className="w-100"
                style={{ padding: "50px" }}
                src="https://i.ibb.co/ZHyZJKy/login.jpg"
                alt=""
              />
            </div>
          </div>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Login;
