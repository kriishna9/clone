import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function Experiences() {

  const [experiences,
    setExperiences] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      companyName: "",
      role: "",
      experience: "",
      tips: "",
    });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchExperiences =
    async () => {

      try {

        const res =
          await API.get(
            "/experiences"
          );

        setExperiences(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchExperiences();

  }, []);

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
          "/experiences",
          {
            ...formData,

            student:
              user?._id,
          }
        );

        alert(
          "Experience Shared Successfully"
        );

        setFormData({
          companyName: "",
          role: "",
          experience: "",
          tips: "",
        });

        fetchExperiences();

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Share Experience"
        );
      }
    };

  return (

    <div
      style={{
        minHeight:
          "100vh",

        color:
          "white",

        padding:
          "40px",
      }}
    >

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          backdropFilter:
            "blur(14px)",

          padding:
            "25px",

          borderRadius:
            "20px",

          display:
            "grid",

          gap:
            "15px",

          marginBottom:
            "40px",

          border:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >

        <h1
        style={{
          fontSize:
            "42px",

          marginBottom:
            "30px",
        }}
      >
        Interview Experiences
      </h1>

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
          required
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
          required
        />

        <textarea
          name="experience"
          placeholder="Interview Experience"
          value={
            formData.experience
          }
          onChange={
            handleChange
          }
          style={{
            ...inputStyle,

            minHeight:
              "140px",
          }}
          required
        />

        <textarea
          name="tips"
          placeholder="Tips For Juniors"
          value={
            formData.tips
          }
          onChange={
            handleChange
          }
          style={{
            ...inputStyle,

            minHeight:
              "100px",
          }}
          required
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
              "#2563eb",

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
          Share Experience
        </button>

      </form>

      <div
        style={{
          display:
            "grid",

          gap:
            "20px",
        }}
      >

        {experiences.map(
          (exp) => (

            <div
              key={exp._id}
              style={{
                background:
                  "#111827",

                padding:
                  "25px",

                borderRadius:
                  "20px",
              }}
            >

              <h2>
                {
                  exp.companyName
                }
              </h2>

              <p>
                <strong>
                  Role:
                </strong>

                {" "}

                {exp.role}
              </p>

              <p>
                <strong>
                  By:
                </strong>

                {" "}

                {
                  exp.student
                    ?.name
                }
              </p>

              <hr
                style={{
                  margin:
                    "15px 0",

                  borderColor:
                    "#1e293b",
                }}
              />

              <p>
                {
                  exp.experience
                }
              </p>

              <div
                style={{
                  marginTop:
                    "20px",

                  padding:
                    "15px",

                  borderRadius:
                    "12px",

                }}
              >

                <strong>
                  Tips:
                </strong>

                <p>
                  {exp.tips}
                </p>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

const inputStyle = {

  padding:
    "14px",

  borderRadius:
    "12px",

  border:
    "none",

  background:
    "#1e293b",

  color:
    "white",

  border:
    "1px solid #cbd5e1",
};