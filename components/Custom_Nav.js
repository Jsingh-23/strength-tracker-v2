import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Modal, Text, Input, TableRow, Checkbox} from "@nextui-org/react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import styles from '@/styles/navbar.module.css';

const Custom_Nav = () => {
    const data = useSession();
    const router = useRouter();

    const isActiveLink = (targetPath) => router.pathname === targetPath ? "isActive" : "";

    console.log("data!!!: ", data);
    console.log(router.pathname);

    return (
        <Navbar isBordered className={styles.Navbar}>
          <NavbarBrand>
            <Link href="/">
                <h1 className={styles.logo}>StrengthTracker</h1>
            </Link>
          </NavbarBrand>

          {data?.status === "authenticated" ? (
          <NavbarContent className="hidden sm:flex gap-4" justify="center">

            <NavbarItem>
              <Link isBlock color="foreground" href="/weight" className={isActiveLink("/weight")}>
                TDEE Calculator
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link isBlock color="foreground" href="/visualize" className={isActiveLink("/visualize")}>
                Visualizations
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link isBlock color="foreground" href="/goals" className={isActiveLink("/goals")}>
                Goals
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link isBlock color="foreground" href="/showdata" className={isActiveLink("/showdata")}>
                All Data
              </Link>
            </NavbarItem>

            <NavbarItem>
                <Button onClick={signOut}>
                    SignOut
                </Button>
            </NavbarItem>

          </NavbarContent>
          
          ) : (


          // If user isn't signed in, then the signin and signup buttons are rendered
          <NavbarContent justify="end">
            <NavbarItem className="lg:flex">
                <LoginModal />
            </NavbarItem>
            <NavbarItem>
                <RegisterModal></RegisterModal>
            </NavbarItem>
          </NavbarContent>
          )}
        </Navbar>
      );
}

export default Custom_Nav;
