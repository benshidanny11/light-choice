import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slice/authSlice";

function Header({ menu }) {
  const dispatch = useDispatch();
  return (
    <header className={`crancy-header ${menu && "crancy-close"}`}>
      <div className="container g-0">
        <div className="row g-0">
          <div className="col-12">
            {/* <!-- Dashboard Header --> */}
            <div className="crancy-header__inner">
              <div className="crancy-header__middle">
                <div className="crancy-header__left">
                  <h2 style={{color:'#eee'}}>Admin dashboard</h2>
                </div>
                <div className="crancy-header__right">
                  <div className="crancy-header__group">
                    <div className="crancy-header__group-two">
                      <div className="crancy-header__right">
                        <FontAwesomeIcon
                          style={{ cursor: "pointer" }}
                          icon={faSignOutAlt}
                          color="#eee"
                          size="3x"
                          onClick={() => dispatch(logoutUser())}
                          title="Logout"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
