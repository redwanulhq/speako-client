import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row pt-5 footer-content">
                    <div className="col-md-3 pb-3">
                        <div className="footer-brand">SPEAKO</div>
                        <p>
                            Manage the entire recruitment workflow from candidate sourcing to submittal to placement,
                            the SPEAKO Team
                        </p>
                    </div>
                    <div className="col-md-3 pb-3">
                        <h4 className="pb-2">Contract</h4>
                        <span className="pb-3">Mon – Fre : 8.00am – 6.00pm 112W 34th St, New York</span>
                        <span>
                            <a href="#">
                                <i className="fas fa-phone-alt"></i> (1)-2340-33-455
                            </a>
                        </span>
                        <span>
                            <a href="#">
                                <i className="far fa-envelope"></i> email@speako.com
                            </a>
                        </span>
                    </div>
                    <div className="col-md-3 pb-3">
                        <h4 className="pb-2">Quick Links</h4>
                        <a href="#">About Us</a>
                        <a href="#">Our Team</a>
                        <a href="#">Our News</a>
                        <a href="#">Case Studies</a>
                    </div>
                    <div className="col-md-3 pb-3">
                        <h4 className="pb-2">Subscribe to newsletter</h4>
                        <p>Get the latest business resources on the market delivered to your inbox.</p>
                        <div className="newsletter-box">
                            <input type="text" placeholder="Enter your email address" />
                            <i className="fas fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
                <div className="row copyright py-3">
                    <div className="col-md-8">Copyright &copy;2021 Mahmudul H. All Rights Reserved.</div>
                    <div className="col-md-4 footer-icons">
                        <a href="#">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-pinterest-p"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
