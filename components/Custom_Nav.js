import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Modal, Text, Input, TableRow, Checkbox} from "@nextui-org/react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import ExampleModal from "./ExampleModal";


const Custom_Nav = () => {
    const data = useSession();

    console.log("data!!!: ", data.status);

    return (
        <Navbar>
          <NavbarBrand>
            <Link href="/">
                <h1 className="font-bold text-inherit">StrengthTracker</h1>
            </Link>
          </NavbarBrand>

          {data?.status === "authenticated" ? (
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="/weight">
                TDEE Calculator
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="/visualize" aria-current="page">
                Visualizations
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/goals">
                Goals
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/showdata">
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


          <NavbarContent justify="end">
            <NavbarItem className="lg:flex">
                {/* <ExampleModal></ExampleModal> */}
                <LoginModal />
              {/* <Link href="/login">Login</Link> */}
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
          )}
        </Navbar>
      );
}

export default Custom_Nav;
