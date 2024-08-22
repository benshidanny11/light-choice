import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../../assets/images/logoOg.png";

import { useDispatch } from "react-redux";
import {
  faReceipt,
  faStoreAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Menu({ toggleMenu, menu }) {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  return (
    <div className={`crancy-smenu ${menu && "crancy-close"}`} id="CrancyMenu">
      {/* <!-- Admin Menu --> */}
      <div className={`admin-menu ${dropdown ? "no-overflow" : ""}`}>
        {/* <!-- Logo --> */}
        <div className="logo crancy-sidebar-padding pd-right-0">
          <Link className="crancy-logo" to="/">
            <img className="crancy-logo__main" src={logo} alt="#" />
          </Link>
        </div>

        {/* <!-- Main Menu --> */}
        <div className="admin-menu__one crancy-sidebar-padding mg-top-20">
          <div className="menu-bar">
            <ul id="CrancyMenu" className="menu-bar__one crancy-dashboard-menu">
              <li
                className={
                  location.pathname.includes("products") ? "active" : ""
                }
              >
                <Link className="collapsed" to="/home/products">
                  <span className="menu-bar__text">
                    <span className="crancy-menu-icon crancy-svg-icon__v1">
                      <FontAwesomeIcon icon={faStoreAlt} color="white" />
                    </span>
                    <span className="menu-bar__name"> Products</span>
                  </span>
                </Link>
              </li>
              <li
                className={location.pathname == "/home" ? "active" : ""}
              >
                <Link className="collapsed" to="/home">
                  <span className="menu-bar__text">
                    <span className="crancy-menu-icon crancy-svg-icon__v1">
                      <FontAwesomeIcon icon={faReceipt} color="white" />
                    </span>
                    <span className="menu-bar__name"> Orders</span>
                  </span>
                </Link>
              </li>
              {/* <li
                    className={
                      location.pathname.includes("user") ? "active" : ""
                    }
                  >
                    <Link className="collapsed" to="/home">
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <FontAwesomeIcon
                            icon={faUsers}
                            color="white"
                          />
                        </span>
                        <span className="menu-bar__name"> Users</span>
                      </span>
                    </Link>
                  </li> */}
            </ul>
          </div>
          {/* <!-- End Nav Menu --> */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
