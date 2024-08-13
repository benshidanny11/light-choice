import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Dropdown from "react-bootstrap/Dropdown";
import LogoOg from "../assets/images/logoOg.png";
import { logoutUser } from "../redux/slice/authSlice";

export function LogoH() {
  return (
    <Link className="qodef-header-logo-link qodef-height--set" to="/">
      <img
        src={LogoOg}
        className="qodef-header-logo-image qodef--main"
        alt="logo main"
        itemProp="image"
        style={{ width: "230px" }}
      />
    </Link>
  );
}

export function ToolbarOne() {
  return (
    <div className="qodef-standard-header-bottom-wrapper force-main-color-bg">
      <div className="qodef-standard-header-bottom-inner qodef-content-grid ">
        <nav
          className="qodef-header-navigation"
          role="navigation"
          aria-label="Top Menu"
        >
          <ul id="menu-main-menu-1" className="menu">
            <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-221 qodef--hide-link qodef-menu-item--narrow">
              <Link to="/">
                <span className="qodef-menu-item-text">Online store</span>
              </Link>
            </li>
            <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-221 qodef--hide-link qodef-menu-item--narrow">
              <Link to="/consiltation">
                <span className="qodef-menu-item-text">Consilitation</span>
              </Link>
            </li>
            <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-221 qodef--hide-link qodef-menu-item--narrow">
              <Link to="/mentalhealth">
                <span className="qodef-menu-item-text">Mental health</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export function HeaderContent() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = localStorage.getItem("user");
  const profile = JSON.parse(user);
  const dispatch = useDispatch();
  return (
    <header id="qodef-page-header">
      <div id="qodef-page-header-inner" className="">
        <div className="qodef-standard-header-top-wrapper qodef-content-grid ">
          <LogoH />
          <div className="qodef-widget-holder">
            <div className="qodef-widget-holder qodef--one">
              <div
                id="pharmacare_membership_login_opener-3"
                className="widget widget_pharmacare_membership_login_opener qodef-header-widget-area-one"
                data-area="header-widget-one"
              >
                <div className="qodef-login-opener-widget qodef-user-logged--out">
                  {auth.isAuthenticated ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        className="dropdowntex-header"
                        id="dropdown-basic"
                      >
                        <span className="qodef-m-opener-icon force-main-color">
                          <i
                            className="bi bi-person"
                            style={{ fontSize: "50px" }}
                          />
                        </span>
                        <span className="qodef-login-text-holder">
                         
                          <span className="qodef-login-opener-text">
                            {profile.email?.slice(
                              0,
                              profile.email.indexOf("@")
                            )}
                          </span>
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => dispatch(logoutUser())}>
                          Logout
                        </Dropdown.Item>
                        {/* <Dropdown.Item href="#/">My profile</Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Link
                      to="/login"
                      className="qodef-login-opener"
                      onClick={() => navigate("/login")}
                    >
                      <span className="qodef-m-opener-icon force-main-color">
                        <span className="qodef-icon-fontkiko kiko-user" />
                        <i
                          className="bi bi-person"
                          style={{ fontSize: "50px" }}
                        />
                      </span>
                      <span className="qodef-login-text-holder">
                        <span className="qodef-login-opener-title">
                          Account
                        </span>
                        <span className="qodef-login-opener-text">
                          Login/ Sign up
                        </span>
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToolbarOne />
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <div>
      <HeaderContent />
    </div>
  );
}
