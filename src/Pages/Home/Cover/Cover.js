import React, { useState } from "react";
import VideoModal from "../videoModal/VideoModal";
import "./Cover.css";
import { BiPlay } from "react-icons/bi";

const Cover = () => {
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    return (
        <section style={{ backgroundColor: "rgb(243 243 243)" }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 py-5 d-flex align-items-center">
                        <img className="w-100" src="https://i.ibb.co/TwJJfh2/cover.jpg" alt="" />
                    </div>
                    <div className="col-md-6 py-5 d-flex align-items-center">
                        <div>
                            <h1 className="display-3 fw-bold">SPEAKO PAD</h1>
                            <p>
                                Speako POD comes with new breakthrough technology that adapts to its location and
                                deliver the high quality sound to audience. This speaker will change your home.
                            </p>
                            <div className="btn-container">
                                <button className="cover-btn">Learn More</button>
                                <button className="cover-btn" onClick={() => setVideoModalOpen(true)}>
                                    <BiPlay />
                                    <span>Watch Video</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {videoModalOpen && <VideoModal setVideoModalOpen={setVideoModalOpen} />}
        </section>
    );
};

export default Cover;
