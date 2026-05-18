import {
    useState,
    useEffect,
} from "react";

import API from "../services/api";

export default function RecruiterDashboard() {

    const [jobs,
        setJobs] =
        useState([]);

    const [formData,
        setFormData] =
        useState({
            companyName: "",
            role: "",
            package: "",
            minCGPA: "",
            allowedBranches: "",
            maxBacklogs: "",
            deadline: "",
            description: "",
        });

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleChange = (
        e
    ) => {

        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    const fetchJobs =
        async () => {

            try {

                const res =
                    await API.get(
                        "/companies"
                    );

                setJobs(
                    res.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {

        fetchJobs();

    }, []);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                await API.post(
                    "/companies",
                    {
                        ...formData,

                        recruiter:
                            user._id,
                    }
                );

                alert(
                    "Job Posted Successfully"
                );

                setFormData({
                    companyName: "",
                    role: "",
                    package: "",
                    minCGPA: "",
                    allowedBranches: "",
                    maxBacklogs: "",
                    deadline: "",
                    description: "",
                });

                fetchJobs();

            } catch (error) {

                console.log(error);

                alert(
                    "Failed To Post Job"
                );
            }
        };

    return (

        <div
            style={{
                padding:
                    "40px",

                color:
                    "white",
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    textAlign:
                        "center",

                    marginBottom:
                        "40px",
                }}
            >

                <h1
                    style={{
                        fontSize:
                            "72px",

                        fontWeight:
                            "900",

                        marginBottom:
                            "10px",
                    }}
                >
                    Recruiter Dashboard
                </h1>

                <p
                    style={{
                        fontSize:
                            "35px",

                        fontWeight:
                            "800",

                        color:
                            "black",
                    }}
                >
                    <br />
                    Welcome,
                    {" "}
                    {
                        user?.companyName
                    }
                </p>

            </div>

            {/* FORM */}

            <form
                onSubmit={
                    handleSubmit
                }

                style={{
                    background:
                        "rgba(255,255,255,0.12)",

                    backdropFilter:
                        "blur(12px)",

                    padding:
                        "30px",

                    borderRadius:
                        "24px",

                    marginBottom:
                        "50px",

                    border:
                        "1px solid rgba(255,255,255,0.15)",
                }}
            >

                <h2
                    style={{
                        textAlign:
                            "center",

                        color:
                            "white",

                        fontSize:
                            "40px",

                        fontWeight:
                            "800",

                        marginBottom:
                            "30px",

                    }}
                >
                    Post New Job
                </h2>

                <div
                    style={{
                        display:
                            "grid",

                        gridTemplateColumns:
                            "repeat(3,1fr)",

                        gap:
                            "20px",
                    }}
                >

                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"

                        value={
                            formData.companyName
                        }

                        onChange={
                            handleChange
                        }

                        style={input}
                    />

                    <input
                        type="text"
                        name="role"
                        placeholder="Job Role"

                        value={
                            formData.role
                        }

                        onChange={
                            handleChange
                        }

                        style={input}
                    />

                    <input
                        type="number"
                        name="package"
                        placeholder="Package (LPA)"

                        value={
                            formData.package
                        }

                        onChange={
                            handleChange
                        }

                        style={input}
                    />

                    <input
                        type="number"
                        name="minCGPA"
                        placeholder="Minimum CGPA"

                        value={
                            formData.minCGPA
                        }

                        onChange={
                            handleChange
                        }

                        style={input}
                    />

                    <input
                        type="text"
                        name="allowedBranches"
                        placeholder="eg:CSE, ECE, ME"

                        value={
                            formData.allowedBranches
                        }

                        onChange={
                            handleChange
                        }

                        style={input}
                    />

                    <input
                        type="number"
                        name="maxBacklogs"
                        placeholder="Maximum Backlogs"

                        value={
                            formData.maxBacklogs
                        }

                        onChange={
                            handleChange
                        }

                        style={input}
                    />

                    <input
                        type="date"
                        name="deadline"

                        value={
                            formData.deadline
                        }

                        onChange={
                            handleChange
                        }

                        style={input}
                    />

                </div>

                <textarea
                    name="description"
                    placeholder="Job Description"

                    value={
                        formData.description
                    }

                    onChange={
                        handleChange
                    }

                    style={{
                        ...input,

                        marginTop:
                            "20px",

                        minHeight:
                            "120px",

                        width:
                            "100%",
                    }}
                />

                <button
                    type="submit"

                    style={{
                        marginTop:
                            "20px",

                        width:
                            "100%",

                        padding:
                            "16px",

                        border:
                            "none",

                        borderRadius:
                            "14px",

                        background:
                            "#2563eb",

                        color:
                            "white",

                        fontSize:
                            "22px",

                        fontWeight:
                            "700",

                        cursor:
                            "pointer",
                    }}
                >
                    + Post Job
                </button>

            </form>

            {/* JOBS */}

            <h2
                style={{
                    marginBottom:
                        "25px",

                    fontSize:
                        "42px",
                }}
            >
                Posted Jobs
            </h2>

            <div
                style={{
                    display:
                        "grid",

                    gridTemplateColumns:
                        "repeat(3,1fr)",

                    gap:
                        "25px",
                }}
            >

                {jobs.map(
                    (job) => (

                        <div
                            key={job._id}

                            style={{
                                background:
                                    "rgba(17,24,39,0.75)",

                                backdropFilter:
                                    "blur(10px)",

                                borderRadius:
                                    "22px",

                                padding:
                                    "25px",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",

                                boxShadow:
                                    "0 10px 30px rgba(0,0,0,0.25)",
                            }}
                        >

                            <div
                                style={{
                                    display:
                                        "flex",

                                    justifyContent:
                                        "space-between",

                                    alignItems:
                                        "center",

                                    marginBottom:
                                        "20px",
                                }}
                            >

                                <div>

                                    <h2
                                        style={{
                                            margin:
                                                "0",

                                            fontSize:
                                                "32px",

                                            fontWeight:
                                                "800",

                                            color:
                                                "white",
                                        }}
                                    >
                                        {
                                            job.companyName
                                        }
                                    </h2>

                                    <p
                                        style={{
                                            color:
                                                "#9ca3af",

                                            marginTop:
                                                "8px",
                                        }}
                                    >
                                        {
                                            job.role
                                        }
                                    </p>

                                </div>

                                <div
                                    style={{
                                        background:
                                            "#22c55e",

                                        padding:
                                            "7px 14px",

                                        borderRadius:
                                            "999px",

                                        fontWeight:
                                            "700",

                                        fontSize:
                                            "14px",
                                    }}
                                >
                                    Active
                                </div>

                            </div>

                            <div
                                style={{
                                    marginBottom:
                                        "20px",
                                }}
                            >

                                <h4
                                    style={{
                                        color:
                                            "#9ca3af",

                                        marginBottom:
                                            "15px",
                                    }}
                                >
                                    ELIGIBILITY CRITERIA
                                </h4>

                                <p>
                                    <strong>
                                        Min CGPA:
                                    </strong>
                                    {" "}
                                    {
                                        job.minCGPA
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Allowed Branches:
                                    </strong>
                                    {" "}
                                    {
                                        job.allowedBranches
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Max Backlogs:
                                    </strong>
                                    {" "}
                                    {
                                        job.maxBacklogs
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Package:
                                    </strong>
                                    {" "}
                                    {
                                        job.package
                                    }
                                    {" "}
                                    LPA
                                </p>

                            </div>

                            <div
                                style={{
                                    background:
                                        "rgba(31,41,55,0.8)",

                                    padding:
                                        "15px",

                                    borderRadius:
                                        "14px",

                                    marginBottom:
                                        "18px",
                                }}
                            >

                                <p>
                                    <strong>
                                        Deadline:
                                    </strong>
                                    {" "}
                                    {
                                        job.deadline
                                    }
                                </p>

                            </div>

                            <p
                                style={{
                                    color:
                                        "#d1d5db",

                                    lineHeight:
                                        "1.7",
                                }}
                            >
                                {
                                    job.description
                                }
                            </p>

                        </div>
                    )
                )}

            </div>

            <div
                style={{
                    marginTop:
                        "60px",

                    textAlign:
                        "center",

                    color:
                        "#cbd5e1",

                    fontSize:
                        "18px",
                }}
            >
                © 2026 Placement Portal. All rights reserved.
            </div>

        </div>
    );
}

const input = {

    padding:
        "14px",

    borderRadius:
        "10px",

    border:
        "1px solid rgba(255,255,255,0.15)",

    fontSize:
        "16px",

    outline:
        "none",

    background:
    "#1e293b",

    border:
        "1px solid #cbd5e1", 

    color:
        "#111827",
};