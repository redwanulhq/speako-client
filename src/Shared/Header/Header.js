import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Header.css";
import { HiLogout } from "react-icons/hi";
import { HiLogin } from "react-icons/hi";

const Header = () => {
  const { user, logOut } = useAuth();
  const [darkHeader, setDarkHeader] = useState(false);
  document.onscroll = () => {
    if (window.scrollY > 400) {
      setDarkHeader(true);
    } else {
      setDarkHeader(false);
    }
  };
  return (
    <header className={darkHeader ? "dark-header" : "header"}>
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        variant={darkHeader ? "dark" : "light"}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            SPEAKO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/blogs">
                Blogs
              </Nav.Link>
              <Nav.Link className="me-2" as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              {user.email ? (
                <Nav.Link
                  onClick={logOut}
                  className="login-btn"
                  as={Link}
                  to="/login"
                >
                  <HiLogout />
                  <span>Log Out</span>
                </Nav.Link>
              ) : (
                <Nav.Link className="login-btn" as={Link} to="/login">
                  <HiLogin />
                  <span>Login</span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
