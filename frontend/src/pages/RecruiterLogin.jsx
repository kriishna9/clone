import {
    useState,
} from "react";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import API from "../services/api";

export default function RecruiterLogin() {

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

                if (
                    res.data.user
                        .role !==
                    "recruiter"
                ) {

                    alert(
                        "Not a recruiter account"
                    );

                    return;
                }

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

                navigate(
                    "/recruiter"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Login Failed"
                );
            }
        };

    return (

        <div
            style={{
                minHeight:
                    "100vh",

                display:
                    "flex",

                justifyContent:
                    "center",

                alignItems:
                    "center",
            }}
        >

            <form
                onSubmit={
                    handleSubmit
                }

                style={{
                    width:
                        "420px",

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
                        "18px",
                }}
            >

                <h1
                    style={{
                        textAlign:
                            "center",

                        marginBottom:
                            "10px",

                        color:
                            "white",

                        fontSize: "45px",

                        position: "relative",

                        top: "-20px",
                    }}
                >
                    Recruiter Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Official Email"

                    onChange={
                        handleChange
                    }

                    style={input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"

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
                        textAlign:
                            "center",

                        marginTop:
                            "10px",
                    }}
                >
                    New Recruiter ?

                    {" "}

                    <Link
                        to="/recruiter-register"

                        style={{
                            color:
                                "#2563eb",

                            textDecoration:
                                "none",

                            fontWeight:
                                "600",
                        }}
                    >
                        Register
                    </Link>
                </p>

                <Link
                    to="/"

                    style={{
                        textAlign:
                            "center",

                        color:
                            "#2563eb",

                        textDecoration:
                            "none",

                        marginTop:
                            "5px",

                        fontWeight:
                            "600",
                    }}
                >
                    ← Back to Home
                </Link>

            </form>

        </div>
    );
}

const input = {

    padding:
        "14px",

    borderRadius:
        "12px",

    border:
        "1px solid #cbd5e1",

    fontSize:
        "16px",

    background:
    "#1e293b",    
};

const button = {

    padding:
        "15px",

    border:
        "none",

    borderRadius:
        "999px",

    background:
        "#2563eb",

    color:
        "white",

    fontWeight:
        "700",

    cursor:
        "pointer",

    fontSize:
        "16px",
};