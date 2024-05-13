import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../context/Language";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../store/Slices/registeration";

export default function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registration = useSelector((state) => state.registeration.registration);

  const lengthOfWatchList = useSelector(
    (state) => state.watchList.watchListValues.length
  );

  function handleLanguage(value) {
    if (value.target.name === "en") {
      setLanguage("en");
    } else {
      setLanguage("ar");
    }
  }

  // Check if registration data exists
  const isRegistered = !!registration.fullName;

  // Function to handle logout and navigation
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/", { replace: true });
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{
        position: "fixed",
        top: "0",
        width: "100%",
        fontFamily: "cursive",
        padding: "0%",
        zIndex: "1",
      }}
    >
      <div
        className="container-fluid"
        style={{ backgroundColor: "rgb(124, 124, 224)" }}
      >
        <NavLink
          className="navbar-brand isActive isPending m-2"
          to="/"
          style={{ fontWeight: "bold", color: "white", fontSize: "18px" }}
        >
          {language === "en" ? "Movie App" : "تطبيق الافلام"}
        </NavLink>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ">
            <NavLink
              className="nav-link isActive isPending  "
              aria-current="page"
              to="/"
              style={{ color: "white", fontSize: "15px", marginTop: "5px" }}
            >
              {language === "en" ? "Home" : "الرئيسية"}
            </NavLink>
          </div>
        </div>

        <div className="dropdown-center">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ color: "white", fontSize: "12px", marginTop: "5px" }}
          >
            {language === "en" ? "Language (English)" : "اللغة (العربية)"}
          </button>
          <ul className="dropdown-menu">
            <li style={{ fontSize: "12px" }}>
              <a
                className="dropdown-item"
                href="#"
                name={language === "en" ? "ar" : "en"}
                onClick={handleLanguage}
              >
                {language === "en" ? "العربية" : "English"}
              </a>
            </li>
          </ul>
        </div>

        <NavLink
          className="nav-link isActive isPending mx-2 "
          to={isRegistered ? "/" : "/register"}
          onClick={isRegistered ? handleLogout : null}
          style={{ color: "white", fontSize: "15px", marginTop: "5px" }}
        >
          {isRegistered
            ? language === "en"
              ? `Logout`
              : `تسجيل خروج`
            : language === "en"
            ? "Register"
            : "تسجيل"}
        </NavLink>
        <NavLink
          className="nav-link isActive isPending mx-2 "
          to="/watchList"
          style={{
            color: "white",
            fontSize: "15px",
            marginTop: "5px",
            position: "relative",
          }}
        >
          {language === "en" ? "WatchList" : "قائمة المشاهدة"}
          <span
            className="badge rounded-pill badge text-bg-light"
            style={{
              position: "absolute",
              top: "-15px",
              [language === "ar" ? "left" : "right"]: "-15px",
              fontSize: "10px",
              width: "20px",
            }}
          >
            {lengthOfWatchList}
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
