import React, { useState, useRef } from "react";
import "./Navbar.css";
import {
  FaCloudMoonRain,
  FaFacebookSquare,
  FaTwitterSquare,
  FaThumbtack,
  FaBars,
} from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const date = new Date();

  let dayOfWeek = date.getDay();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let weekArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = weekArray[dayOfWeek];
  let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthName = monthArray[month];

  let currentDate = `${dayName}, ${monthName} ${day}, ${year}`;

  const [navbar, setNavbar] = useState(false);

  const changeNavbarBackground = () => {
    if (window.scrollY >= 120) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeNavbarBackground);

  const collapseRef = useRef(null);
  const hideBars = () => {
    collapseRef.current.setAttribute("class", "navbar-collapse collapse");
  };

  return (
    <>
      {/* <div role={navigator}> */}
      <div className="p-3 bg-dark topNav">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3 d-none d-md-block">
              <div className="sideHeading text-light">
                <FaCloudMoonRain className="me-2 fs-3 text-info" />
                <strong>Karachi, Pk</strong>
              </div>
              <div className="mt-1 text-light sideHeading">
                <FaFacebookSquare className="fs-5 me-2 text-secondary" />
                <FaTwitterSquare className="fs-5 me-2 text-secondary" />{" "}
                <FaThumbtack className="fs-5 me-2 mt-1 text-secondary" />
                Subscribe
              </div>
            </div>
            <div className="col-lg-6 col-md-6 text-center">
              <div className="display-6 nameHeading text-white">
                The Gazette
              </div>
              <div className="text-secondary text-warning date">
                {currentDate}
              </div>
            </div>
            <div className="col-lg-3 col-md-3 text-end d-none d-md-block">
              <input
                className="form-control"
                placeholder="Search"
                style={{
                  borderRadius: "3px",
                  fontFamily: "Open Sans",
                  fontSize: "13px",
                }}
              />
              <div className="mt-2 sideHeading text-light trending">
                <strong className="text-danger">Trending :</strong> Big story
                tonight
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-white sticky-top ${navbar ? "active" : ""}`}
        id="subNavContainer"
      >
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid">
            <button
              className={`navbar-toggler mx-auto ${navbar ? "dark" : ""}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FaBars
                style={{
                  fontSize: "16px",
                  position: "relative",
                  top: "-2px",
                }}
              />
            </button>
            <div
              ref={collapseRef}
              className="collapse navbar-collapse"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav mx-auto">
                <li className="nav-item text-center">
                  <NavLink
                    onClick={hideBars}
                    activeClassName="active"
                    className="nav-link mx-2 hover-underline-animation"
                    aria-current="page"
                    to="/"
                  >
                    News
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink
                    onClick={hideBars}
                    activeClassName="active"
                    className="nav-link mx-2 hover-underline-animation"
                    to="/business"
                  >
                    Business
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink
                    onClick={hideBars}
                    activeClassName="active"
                    className="nav-link mx-2 hover-underline-animation"
                    to="/entertainment"
                  >
                    Entertainment
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink
                    onClick={hideBars}
                    activeClassName="active"
                    className="nav-link mx-2 hover-underline-animation"
                    to="/health"
                  >
                    Health
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink
                    onClick={hideBars}
                    activeClassName="active"
                    className="nav-link mx-2 hover-underline-animation"
                    to="/climate"
                  >
                    Climate
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink
                    onClick={hideBars}
                    activeClassName="active"
                    className="nav-link mx-2 hover-underline-animation"
                    to="/sports"
                  >
                    Sports
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink
                    onClick={hideBars}
                    activeClassName="active"
                    className="nav-link mx-2 hover-underline-animation"
                    to="/technology"
                  >
                    Technology
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="border-top border-bottom d-flex">
        <div>
          <div className="py-2 px-5 bg-danger text-white newsTickerHeading">
            {window.screen.width <= 400 ? (
              <ImNewspaper style={{ fontSize: "16px" }} />
            ) : (
              `Updates`
            )}
          </div>
        </div>
        <div className="px-1" style={{ overflow: "hidden" }}>
          <div id="scrollContent" className="text-secondary bg-light">
            <div className="newsTicker">
              Lorem Ipsum is simply dummy text. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages. It is a long established fact
              that a reader will be distracted by the readable content of a page
              when looking at its layout
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
