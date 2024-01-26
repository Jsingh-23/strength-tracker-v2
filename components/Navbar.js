import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "../styles/navbar.module.css";
import {useState} from "react";

const Navbar = () => {

  // const [isDropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  // useSession hook to ensure proper navbar display, depending on whether user is logged in or not.
  const { data } = useSession();
  const [showModal, setShowModal] = useState(false);


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

    <nav className={`${styles.navbar} navbar-expand-lg`}>
        <Link
        className={styles.logo}
        href="/"
        >
          StrengthTracker
        </Link>
        
          {/* if 'data.user' exists, then the logged-in navbar is rendered, otherwise the Register and Login links are rendered */}
          {data?.user ? (
            <> 
              <ul className={`${styles.nav_links}`}>
                <li className={styles.nav_item}>
                  <Link className={styles.link} href="/weight">
                    TDEE Calculator
                  </Link>
                </li>

                <li className={styles.nav_item}>
                  <Link className={styles.link} href="/visualize">
                    Visualizations
                  </Link>
                </li>

                <li className={styles.nav_item}>
                  <Link className={styles.link} href="/goals">
                    Goals
                  </Link>
                </li>

                <li className={styles.nav_item}>
                <Link className={styles.link} href="/showdata">
                    All Data
                  </Link>
                </li>


                {/* Sports Drowndown Menu */}
                <li className={styles.nav_item}>

                    <ul className={`${styles.nav_item} ${styles.nav_dropdown}`}>
                      <li className={styles.nav_dropdown}>
                        <button className={`${styles.dropdown_button} dropdown-toggle`}   data-bs-toggle="dropdown" aria-expanded="false">
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
                    
                  </li>
                </ul>

                {/* Logout Button */}
                <button className={`${styles.logout_button} btn btn-danger btn-sm`} onClick={signOut}>
                Logout
                </button>

            </>
          ) : (

            // If user is not logged in, then these navbar links will be rendered
            <>
              <ul className={styles.nav_links}>
                <li className={styles.nav_item}>
                  <Link className={`${styles.nav_links} ${styles.login_register_button}`} href="/login">
                    Login
                  </Link>
                </li>
                <li className={styles.nav_item}>
                  <Link className={`${styles.nav_links} ${styles.login_register_button} ${styles.register_button}`} href="/register">
                    Get Started
                  </Link>
                </li>
                
              </ul>

              </>
            )}
            

        
    </nav>
  );
};

export default Navbar;