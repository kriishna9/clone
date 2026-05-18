import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [companies,
    setCompanies] =
    useState([]);

  const [applications,
    setApplications] =
    useState([]);

  const [stats, setStats] =
    useState({});

  const [formData,
    setFormData] =
    useState({
      companyName: "",
      role: "",
      package: "",
      minCGPA: "",
      allowedBranches: "",
      description: "",
      deadline: "",
    });

  const fetchCompanies =
    async () => {
      try {
        const res =
          await API.get(
            "/companies"
          );

        setCompanies(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchApplications =
    async () => {
      try {
        const res =
          await API.get(
            "/applications/all"
          );

        setApplications(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchStats =
    async () => {
      try {
        const res =
          await API.get(
            "/applications/stats/overview"
          );

        setStats(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchCompanies();

    fetchApplications();

    fetchStats();
  }, []);

  const updateApplicationStatus =
    async (
      id,
      status
    ) => {
      try {
        await API.put(
          `/applications/${id}`,
          { status }
        );

        alert(
          `Application ${status}`
        );

        fetchApplications();

        fetchStats();
      } catch (error) {
        console.log(error);
      }
    };

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
        await API.post(
          "/companies",
          {
            ...formData,

            allowedBranches:
              formData.allowedBranches
                .split(",")

                .map((b) =>
                  b.trim()
                ),
          }
        );

        alert(
          "Company Added Successfully"
        );

        setFormData({
          companyName: "",
          role: "",
          package: "",
          minCGPA: "",
          allowedBranches:
            "",
          description: "",
          deadline: "",
        });

        fetchCompanies();
      } catch (error) {
        console.log(error);
      }
    };

  const chartData = [
    {
      name: "Approved",
      value:
        stats.approved || 0,
    },

    {
      name: "Rejected",
      value:
        stats.rejected || 0,
    },

    {
      name: "Pending",
      value:
        stats.pending || 0,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#facc15",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",

        background:
          "#020617",

        color: "white",

        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "42px",

          marginBottom:
            "30px",
        }}
      >
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",

          gap: "20px",

          marginBottom:
            "40px",
        }}
      >
        <StatCard
          title="Total Applications"
          value={
            stats.total
          }
        />

        <StatCard
          title="Approved"
          value={
            stats.approved
          }
        />

        <StatCard
          title="Rejected"
          value={
            stats.rejected
          }
        />

        <StatCard
          title="Pending"
          value={
            stats.pending
          }
        />

        <StatCard
          title="Placement %"
          value={`${stats.percentage ?? 0}%`}
        />
      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "30px",

          marginBottom:
            "50px",
        }}
      >
        <div
          style={{
            background:
              "#111827",

            padding:
              "25px",

            borderRadius:
              "20px",

            height:
              "400px",
          }}
        >
          <h2
            style={{
              marginBottom:
                "20px",
            }}
          >
            Application Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height="90%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={120}
              >
                {chartData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background:
              "#111827",

            padding:
              "25px",

            borderRadius:
              "20px",

            height:
              "400px",
          }}
        >
          <h2
            style={{
              marginBottom:
                "20px",
            }}
          >
            Placement Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height="90%"
          >
            <BarChart
              data={chartData}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#8b5cf6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          background:
            "#111827",

          padding:
            "25px",

          borderRadius:
            "20px",

          display: "grid",

          gap: "15px",

          marginBottom:
            "40px",
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
          style={
            inputStyle
          }
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={
            formData.role
          }
          onChange={
            handleChange
          }
          style={
            inputStyle
          }
        />

        <input
          type="text"
          name="package"
          placeholder="Package"
          value={
            formData.package
          }
          onChange={
            handleChange
          }
          style={
            inputStyle
          }
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
          style={
            inputStyle
          }
        />

        <input
          type="text"
          name="allowedBranches"
          placeholder="Allowed Branches"
          value={
            formData.allowedBranches
          }
          onChange={
            handleChange
          }
          style={
            inputStyle
          }
        />

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          style={{
            ...inputStyle,

            minHeight:
              "120px",
          }}
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
          style={
            inputStyle
          }
        />

        <button
          type="submit"
          style={{
            padding:
              "14px",

            border:
              "none",

            borderRadius:
              "12px",

            background:
              "#8b5cf6",

            color:
              "white",

            cursor:
              "pointer",

            fontWeight:
              "600",

            fontSize:
              "16px",
          }}
        >
          Add Company
        </button>
      </form>

      <h2
        style={{
          marginBottom:
            "20px",
        }}
      >
        All Applications
      </h2>

      <div
        style={{
          display: "grid",

          gap: "20px",
        }}
      >
        {applications.map(
          (app) => (
            <div
              key={app._id}
              style={{
                background:
                  "#111827",

                padding:
                  "20px",

                borderRadius:
                  "16px",
              }}
            >
              <h3>
                {
                  app.student
                    ?.name
                }
              </h3>

              <p>
                Email:
                {" "}
                {
                  app.student
                    ?.email
                }
              </p>

              <p>
                Company:
                {" "}
                {
                  app.company
                    ?.companyName
                }
              </p>

              <p>
                Role:
                {" "}
                {
                  app.company
                    ?.role
                }
              </p>

              <p>
                Status:
                {" "}
                {app.status}
              </p>

              {app.student
                ?.resume && (
                  <a
                    href={`http://localhost:5000/uploads/${app.student.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display:
                        "inline-block",

                      marginTop:
                        "10px",

                      color:
                        "#60a5fa",

                      textDecoration:
                        "none",

                      fontWeight:
                        "600",
                    }}
                  >
                    View Resume
                  </a>
                )}

              <div
                style={{
                  display:
                    "flex",

                  gap: "10px",

                  marginTop:
                    "15px",
                }}
              >
                <button
                  onClick={() =>
                    updateApplicationStatus(
                      app._id,
                      "approved"
                    )
                  }
                  style={{
                    padding:
                      "10px 16px",

                    border:
                      "none",

                    borderRadius:
                      "10px",

                    background:
                      "#22c55e",

                    color:
                      "white",

                    cursor:
                      "pointer",
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateApplicationStatus(
                      app._id,
                      "rejected"
                    )
                  }
                  style={{
                    padding:
                      "10px 16px",

                    border:
                      "none",

                    borderRadius:
                      "10px",

                    background:
                      "#ef4444",

                    color:
                      "white",

                    cursor:
                      "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background:
          "#111827",

        padding:
          "25px",

        borderRadius:
          "20px",

        textAlign:
          "center",
      }}
    >
      <h3
        style={{
          marginBottom:
            "10px",

          color:
            "#94a3b8",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          fontSize:
            "42px",
        }}
      >
        {value ?? 0}
      </h1>
    </div>
  );
}

const inputStyle = {
  padding: "14px",

  borderRadius:
    "12px",

  border: "none",

  background:
    "#1e293b",

  color: "white",

  outline: "none",
};