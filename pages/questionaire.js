import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {Button, Input} from "@nextui-org/react";
import styles from '@/styles/form.module.css';

console.log("hi");

const Questionaire = () => {
    const router = useRouter();

    return (
        <div className={`card bg-light ${styles.container}`}>
            <form style={{ maxWidth: "576px", margin:"auto" }}>
                <h3 className="text-center my-5"> Recommend Me A Workout! </h3>

                {/* Experience Level Input */}
                <div className="mb-3">
                    <label htmlFor="experience">What is your experience level?</label>
                    <select className="form-control" name="experience" id="form_experience">
                    </select>
                </div>

            </form>
        </div>
    )
};

export default Questionaire;