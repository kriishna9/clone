import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import API from "../services/api";

export default function Login() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await API.post(
            "/auth/login",
            formData
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        if (
          res.data.user
            .role ===
          "admin"
        ) {

          navigate(
            "/admin"
          );

        } else {

          navigate(
            "/dashboard"
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Login Failed"
        );
      }
    };

  return (

    <div
      style={container}
    >

      <div
        style={circle1}
      />

      <div
        style={circle2}
      />

      <form
        onSubmit={
          handleSubmit
        }
        style={formStyle}
      >

        <h1
          style={title}
        >
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          style={input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          style={input}
        />

        <button
          type="submit"
          style={button}
        >
          Login
        </button>

        <p
          style={{
            color:
              "white",

            textAlign:
              "center",
          }}
        >
          Don't have an
          account?

          {" "}

          <Link
            to="/register"
            style={link}
          >
            Register
          </Link>
        </p>

        <Link
          to="/"
          style={link}
        >
          ← Back to Home
        </Link>

      </form>

    </div>
  );
}

const container = {

  minHeight:
    "100vh",

  display:
    "flex",

  justifyContent:
    "center",

  alignItems:
    "center",

  overflow:
    "hidden",

  position:
    "relative",
};

const circle1 = {

  position:
    "absolute",

  width:
    "350px",

  height:
    "350px",

  borderRadius:
    "50%",

  top:
    "-100px",

  left:
    "-100px",

  filter:
    "blur(80px)",
};

const circle2 = {

  position:
    "absolute",

  width:
    "350px",

  height:
    "350px",

  borderRadius:
    "50%",

  bottom:
    "-120px",

  right:
    "-100px",

  filter:
    "blur(80px)",
};

const formStyle = {

  width:
    "400px",

  backdropFilter:
    "blur(14px)",

  padding:
    "40px",

  borderRadius:
    "24px",

  display:
    "flex",

  flexDirection:
    "column",

  gap:
    "20px",

  position:
    "relative",

  zIndex:
    "2",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

const title = {

  color:
    "white",

  textAlign:
    "center",

  fontSize:
    "52px",
};

const input = {

  padding:
    "14px",

  borderRadius:
    "12px",

  border:
    "none",

  background:
    "#1e293b",

  border:
        "1px solid #cbd5e1",  

  color:
    "white",
};

const button = {

  padding:
    "14px",

  border:
    "none",

  borderRadius:
    "12px",

  background:
    "linear-gradient(90deg,#2563eb,#7c3aed)",

  color:
    "white",

  fontWeight:
    "bold",

  cursor:
    "pointer",

  fontSize:
    "16px",
};

const link = {

  color:
    "#8b5cf6",

  textDecoration:
    "none",

  textAlign:
    "center",
};