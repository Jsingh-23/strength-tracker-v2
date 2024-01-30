import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import styles from "../styles/loginmodal.module.css";

const LoginModal = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const { data: session, status } = useSession();

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const { email, password } = values;

    const handleChange = (e) =>
        setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
        setError("All fields are required");
        return;
        }

        const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        });

        if (!res) {
        console.log("No res");
        return;
        }

        if (res.error) {
        console.log("Unsuccesful login!");
        setError(res.error);
        return;
        }

        // setValues({ email: "", password: "" });
        router.push("/visualize");
    };

    return (
        <div>
            <Button onPress={onOpen}>Log In</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className={styles.modal_header}>Log In</ModalHeader>
                    <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Input
                            type="email"
                            label="Email"
                            // placeholder="Enter your email"
                            // className="form-control"
                            name="email"
                            placeholder="karan@karan.com"
                            value={email}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                            type="password"
                            label="Password"
                            // placeholder="Enter your password"
                            // className="form-control"
                            name="password"
                            placeholder="karan123"
                            value={password}
                            onChange={handleChange}
                            />
                        </div>
                        {error && <p className="text-danger text-center">{error}</p>}
                        <div className="mb-3 text-center">
                            <button className="btn btn-secondary btn-sm">Login</button>
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

export default LoginModal;