import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from 'next-auth/react';


const Login = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  if (status === "authenticated") {
    router.push("/");
  }

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

    console.log("wtf is going on:" + res);

    if (res.error) {
      console.log("Unsuccesful login!");
      setError(res.error);
      return;
    }

    setValues({ email: "", password: "" });
    router.push("/");
  };

  return (
    <form style={{ maxWidth: "576px", margin: "auto" }} onSubmit={handleSubmit}>
      <h3 className="text-center my-5">Log into your account</h3>
      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="mb-3 text-center">
        <button className="btn btn-secondary btn-sm">Login</button>
      </div>
    </form>
  );
};

export default Login;