import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {

  // useSession hook c
  const { data } = useSession();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link
        className="navbar-brand"
        href="/"
        style={{ fontWeight: 'bold', color: 'orange'}}>
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
                <Link className="nav-link" href="/bench">
                  Bench Press
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" href="/squat">
                  Squat
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" href="/deadlift">
                  Deadlift
                </Link>
              </li>
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