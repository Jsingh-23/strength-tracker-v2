import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "@/styles/Navbar.module.css";
// import Dropdown from 'bootstrap';


const Navbar = () => {

  // const [isDropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  // useSession hook to ensure proper navbar display, depending on whether user is logged in or not.
  const { data } = useSession();

  // different football leagues
  const leagues = {
    "Ligue 1 🇫🇷": 61,
    "Serie A 🇮🇹": 135,
    "Bundesliga 🇩🇪": 78,
    "Premier League 🇬🇧": 39,
    "Primera Division 🇪🇸": 140,
    "Primeira Liga 🇵🇹": 94,
    "Eredivise 🇳🇱": 88,
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link
        className={styles.brand}
        href="/"
        >
          Strength Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* if 'data.user' exists, then the Logout button is rendered, otherwise the Register and Login links are rendered */}
            {data?.user ? (
              <>
              <li className="nav-item">
                <Link className={styles.links} href="/weight">
                  TDEE Calc
                </Link>
              </li>

              <li className="nav-item">
                <Link className={styles.links} href="/visualize">
                  Visualizations
                </Link>
              </li>

              <li className="nav-item">
                <Link className={styles.links} href="/goals">
                  Goals
                </Link>
              </li>

              <li className="nav-item">
              <Link className={styles.links} href="/showdata">
                  All Data
                </Link>
              </li>

              <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <button className="btn btn-dark dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                    Sports!
                  </button>

                  <ul className="dropdown-menu dropdown-menu-dark">
                    <div className={styles.relative}>
                      <Link href='/sports/nbastandings' className={`${styles.dropdownlink} text-center`}>  NBA </Link>
                    </div>
                    <div className={styles.relative}>
                      <Link href='/sports/39' className={`${styles.dropdownlink} text-center`}> Premier League </Link>
                    </div>
                  </ul>
                </li>
                </ul>
              </div>

              <li className="nav-item">
                <button className="btn btn-danger btn-sm" onClick={signOut}>
                  Logout
                </button>
              </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;