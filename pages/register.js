import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
// import styles from "styles/register.module.css";

const Register = () => {
  const router = useRouter();

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
    <form style={{ maxWidth: "576px", margin: "auto" }} onSubmit={handleSubmit}>
      <h3 className="text-center my-5">Create an account</h3>
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
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
        <button className="btn btn-secondary btn-sm">Register</button>
      </div>
    </form>
  );
};

export default Register;