import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import "./Dashboard.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Review from "./Review/Review";
import Myorders from "./Myorders/Myorders";
import Pay from "./Pay/Pay";
import useAuth from "../../hooks/useAuth";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import MakeAdmin from "./MakeAdmin/MakeAdmin";
import ManageOrders from "./ManageOrders/ManageOrders";
import ManageProducts from "./ManageProducts/ManageProducts";
import AddProduct from "./AddProduct/AddProduct";
import DashboardHome from "./DashboardHome/DashboardHome";
import AdminRoute from "../AdminRoute/AdminRoute";
import { CgMenuRight } from "react-icons/cg";
import { RiDashboardFill } from "react-icons/ri";
import { RiBankCardFill } from "react-icons/ri";
import { RiShoppingCartFill } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import { RiSpeakerFill } from "react-icons/ri";
import { MdAddBusiness } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

const Dashboard = () => {
  const [admin, setAdmin] = useState();
  const { width } = useWindowDimensions();
  let { path, url } = useRouteMatch();
  const { user, logOut } = useAuth();
  const { displayName, photoURL } = user;
  const [sidebarFold, setSidebarFold] = useState(false);

  useEffect(() => {
    fetch(`https://speako-server.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  return (
    <div
      className={
        sidebarFold ? "dashboard-container fold" : "dashboard-container"
      }
    >
      <div className="dashboard-header">
        <div className="header-left">
          <div className="header-logo">SPEAKO</div>
          <div
            className="sidebar-toggle"
            onClick={() => setSidebarFold(!sidebarFold)}
          >
            <CgMenuRight />
          </div>
        </div>
        <div className="header-right">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <div className="sidebar-container">
            <div className="sidebar-scrollable-container">
              <div className="sidebar-user-profile">
                <div className="user-img">
                  <img src={photoURL} alt="" />
                </div>
                <div className="user-profile-text">
                  <p>Hello! Good Morning!</p>
                  <div>{displayName}</div>
                </div>
              </div>
              <Link to={`${url}`}>
                <RiDashboardFill />
                <span>Dashboard</span>
              </Link>
              {admin ? (
                <>
                  <Link to={`${url}/manage-orders`}>
                    <RiShoppingCartFill />
                    <span>Manage Orders</span>
                  </Link>
                  <Link to={`${url}/manage-products`}>
                    <RiSpeakerFill />
                    <span>Manage Products</span>
                  </Link>
                  <Link to={`${url}/add-product`}>
                    <MdAddBusiness />
                    <span>Add Products</span>
                  </Link>
                  <Link to={`${url}/make-admin`}>
                    <RiAdminFill />
                    <span>Make Admin</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`${url}/my-orders`}>
                    <RiShoppingCartFill />
                    <span>My orders</span>
                  </Link>
                  <Link to={`${url}/pay`}>
                    <RiBankCardFill />
                    <span>Pay</span>
                  </Link>
                  <Link to={`${url}/review`}>
                    <MdOutlineRateReview />
                    <span>Review</span>
                  </Link>
                </>
              )}
            </div>
            <Link className="sidebar-logout" onClick={logOut} to="/login">
              <RiLogoutCircleRLine />
              <span>Logout</span>
            </Link>
          </div>
        </div>
        <div className="dashboard-body">
          <Switch>
            <Route exact path={`${path}`}>
              <DashboardHome></DashboardHome>
            </Route>
            <Route path={`${path}/pay`}>
              <Pay></Pay>
            </Route>
            <Route path={`${path}/my-orders`}>
              <Myorders></Myorders>
            </Route>
            <Route path={`${path}/review`}>
              <Review></Review>
            </Route>
            <AdminRoute path={`${path}/make-admin`}>
              <MakeAdmin></MakeAdmin>
            </AdminRoute>
            <AdminRoute path={`${path}/manage-orders`}>
              <ManageOrders></ManageOrders>
            </AdminRoute>
            <AdminRoute path={`${path}/manage-products`}>
              <ManageProducts></ManageProducts>
            </AdminRoute>
            <AdminRoute path={`${path}/add-product`}>
              <AddProduct></AddProduct>
            </AdminRoute>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
