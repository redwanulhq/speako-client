import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Footer from "../../../Shared/Footer/Footer";
import Header from "../../../Shared/Header/Header";

const Register = () => {
  const [error, setError] = useState("");
  const {
    createAccountWithEmailPassword,
    auth,
    setUser,
    updateProfile,
    logOut,
  } = useAuth();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }
    createAccountWithEmailPassword(auth, email, password)
      .then((result) => {
        const setUserName = () => {
          updateProfile(auth.currentUser, {
            displayName: name,
          }).then((result) => {});
        };
        setUserName();
        const saveUser = (displayName, email) => {
          const user = { displayName, email };
          fetch("https://speako-server.vercel.app/users", {
            method: "POST",
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
        saveUser(name, email);
        setError("");
        setUser("");

        logOut();
        alert("Account created successfuly");
        history.push("/");
        reset();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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
                    placeholder="Full Name"
                    {...register("name", {})}
                  />
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
                    value="Register"
                  />
                </form>
                <p className="pt-2 pb-5">
                  Already have an account? <Link to="/login">Log in</Link>
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

export default Register;
