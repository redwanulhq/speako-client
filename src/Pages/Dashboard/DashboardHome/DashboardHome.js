import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import "./DashboardHome.css";
import ReactLoading from "react-loading";

const DashboardHome = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [countingData, setCountingData] = useState([
    {
      title: "Total Orders",
      value: 0,
      type: Number,
    },
    {
      title: "Total Orders Amount",
      value: 0,
      type: "currency",
    },
    {
      title: "Total unpaid orders",
      value: 0,
      type: "number",
    },
    {
      title: "Total Orders Pending",
      value: 0,
      type: "number",
    },
  ]);
  useEffect(() => {
    setLoading(true);
    fetch(`https://speako-server.vercel.app/orders/${user.email}`)
      .then((res) => res.json())
      .then((result) => {
        let updatedData = countingData;
        updatedData[0].value = result.length;
        let totalAmount = 0;
        result.map(
          (singleOrder) => (totalAmount = totalAmount + singleOrder.total)
        );
        updatedData[1].value = totalAmount;
        setCountingData(updatedData);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  }, []);
  return (
    <div className="dashboard-home">
      {!loading ? (
        <div className="reports-counting-widgets">
          {countingData.map((singleCount) => (
            <div className="reports-single-count-box">
              <h4 className="rscb-title">{singleCount.title}</h4>
              <div className="rscb-count">
                {singleCount.type === "currency" && "$"}
                {singleCount.value}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="rgba(255,255,255,0.3)"
                  fill-opacity="1"
                  d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                ></path>
              </svg>
            </div>
          ))}
        </div>
      ) : (
        <div className="my-order-loading-cotainer">
          <ReactLoading type="bubbles" color="black" width="120px" />
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
