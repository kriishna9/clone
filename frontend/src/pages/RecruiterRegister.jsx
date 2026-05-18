import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import API from "../services/api";

export default function RecruiterRegister() {

    const navigate =
        useNavigate();

    const [formData,
        setFormData] =
        useState({
            companyName: "",
            hrName: "",
            email: "",
            password: "",
            website: "",
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

                console.log(
                    "Sending:",
                    {
                        ...formData,
                        role:
                            "recruiter",
                    }
                );

                const res =
                    await API.post(
                        "/auth/register",
                        {
                            ...formData,

                            role:
                                "recruiter",
                        }
                    );

                console.log(
                    "SUCCESS:",
                    res.data
                );

                alert(
                    "Recruiter Registered Successfully"
                );

                navigate(
                    "/login"
                );

            } catch (error) {

                console.log(
                    "FULL ERROR:",
                    error
                );

                console.log(
                    "ERROR RESPONSE:",
                    error.response
                );

                alert(
                    error.response?.data?.message ||
                    "Registration Failed"
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

                padding:
                    "40px",


            }}
        >

            <form
                onSubmit={
                    handleSubmit
                }

                style={{
                    width:
                        "500px",

                    backdropFilter:
                        "blur(14px)",

                    border:
                        "1px solid rgba(255,255,255,0.08)",

                    padding:
                        "40px",

                    borderRadius:
                        "24px",

                    display:
                        "grid",

                    gap:
                        "18px",
                }}
            >

                <h1
                    style={{
                        textAlign:
                            "center",

                        marginBottom:
                            "20px",

                        color:
                            "white",

                        fontSize: "45px",

                        position: "relative",

                        top: "-20px",
                    }}
                >
                    Recruiter Registration
                </h1>

                <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"

                    onChange={
                        handleChange
                    }

                    style={input}
                />

                <input
                    type="text"
                    name="hrName"
                    placeholder="HR Name"

                    onChange={
                        handleChange
                    }

                    style={input}
                />

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

                <input
                    type="text"
                    name="website"
                    placeholder="Company Website"

                    onChange={
                        handleChange
                    }

                    style={input}
                />

                <button
                    type="submit"

                    style={{
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
                    }}
                >
                    Register Recruiter
                </button>

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