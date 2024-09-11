import React from "react";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import Cover from "./Cover/Cover";
import coverBottom from "../../images/cover-bottom.svg";
import TrendingProducts from "./TrendingProducts/TrendingProducts";
import ReviewSection from "./ReviewSection/ReviewSection";
import "./Home.css";
import Feature from "./Feature/Feature";
const Home = () => {
    return (
        <>
            <Header></Header>
            <main>
                <Cover></Cover>
                <img src={coverBottom} alt="" style={{ maxHeight: "160px", width: "100%" }} />
                <TrendingProducts></TrendingProducts>
                <Feature></Feature>
                <div className="home-full-img"></div>
                <ReviewSection></ReviewSection>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Home;
