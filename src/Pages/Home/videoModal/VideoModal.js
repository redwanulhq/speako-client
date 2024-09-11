import React from "react";
import "./VideoModal.css";
import video from "../../../images/cover-video.mp4";

const VideoModal = ({ setVideoModalOpen }) => {
    document.onclick = (e) => {
        if (e.target.className === "video-modal") setVideoModalOpen(false);
    };
    return (
        <div className="video-modal">
            <div className="video-modal-container">
                <video src={video} width="550px" autoPlay="true" controls="true"></video>
            </div>
        </div>
    );
};

export default VideoModal;
