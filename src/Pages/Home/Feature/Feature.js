import React from "react";

const Feature = () => {
    return (
        <div>
            <div className="container py-5 my-5">
                <div className="row my-5">
                    <div className="col-md-6 p-3">
                        <img
                            className="w-100"
                            style={{ borderRadius: "10px" }}
                            src="https://i.ibb.co/nQh9KCm/pic-pd.jpg"
                            alt=""
                        />
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                        <div>
                            <span>STUNNING DESIGN</span>
                            <h3 className="my-3">High Tech Home Decoration</h3>
                            <div className="small-border"></div>
                            <p className="my-4">
                                The built-in microphone and powerful speaker make Beoplay P2 ideal for taking and making
                                hands-free calls on your phone or computer. Use it in the office, your hotel room or
                                anywhere you need to get up close and personal with the people you’re speaking with.
                            </p>
                            <button className="btn btn-outline-dark">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;
