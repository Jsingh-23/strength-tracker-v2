import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import styles from "../styles/loginmodal.module.css";

const RegisterModal = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const { data: session, status } = useSession();

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const { name, email, password } = values;

    const handleChange = (e) =>
        setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {

        console.log('register form handler works!');
        e.preventDefault();

        if (!name || !email || !password) {
        setError("All fields are required");
        return;
        }
        const res = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        });

        const result = await res.json();
        if (res.ok) {
        const login_creds = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        router.push("/");
        // setValues({ name: "", email: "", password: "" });
        // router.replace("/");
        } else {
        setError(result.error);
        }
    };

    return (
        <div>
            <Button onPress={onOpen}>Sign Up</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className={styles.modal_header}>Create An Account</ModalHeader>
                    <ModalBody>
                    <form style={{ maxWidth: "576px", margin: "auto" }} onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Input
                            type="text"
                            label="Name"
                            name="name"
                            // placeholder="Enter your name"
                            value={name}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                            type="email"
                            label="Email"
                            name="email"
                            // placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                            type="password"
                            label="Password"
                            name="password"
                            // placeholder="Enter your password"
                            value={password}
                            onChange={handleChange}
                            />
                        </div>
                        {error && <p className="text-danger text-center">{error}</p>}
                        <div className="mb-3 text-center">
                            <button className="btn btn-secondary btn-sm">Register</button>
                        </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                        Action
                        </Button> */}
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default RegisterModal;