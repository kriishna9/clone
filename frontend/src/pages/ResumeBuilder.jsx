import {
  useState,
} from "react";

import API from "../services/api";

export default function ResumeBuilder() {

  const [resume,
    setResume] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      name: "",

      skills: "",

      projects: "",

      education: "",

      achievements: "",
    });

  const [aiResume,
    setAiResume] =
    useState("");

  const handleUpload = (
    e
  ) => {

    setResume(
      e.target.files[0]
    );
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
    () => {

      if (!resume) {

        alert(
          "Please select a resume"
        );

        return;
      }

      alert(
        "Resume Uploaded Successfully"
      );
    };

  const generateAIResume =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.post(

            "/ai/generate-resume",

            formData
          );

        setAiResume(
          res.data.resume
        );

      } catch (error) {

        console.log(error);

        alert(
          "AI Resume Generation Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div
      style={{
        minHeight:
          "100vh",

        padding:
          "50px 30px",

        color:
          "white",
      }}
    >

      {/* TOP SECTION */}

      <div
        style={{
          textAlign:
            "center",

          marginBottom:
            "50px",
        }}
      >

        <h1
          style={{
            fontSize:
              "64px",

            marginBottom:
              "12px",

            fontWeight:
              "900",
          }}
        >
          AI Resume Builder
        </h1>

        <p
          style={{
            fontSize:
              "22px",

            color:
              "#cbd5e1",
          }}
        >
          <br />
          Build professional AI-powered resumes for placements
        </p>

      </div>

      {/* MAIN CONTAINER */}

      <div
        style={{
          maxWidth:
            "1400px",

          margin:
            "0 auto",

          display:
            "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap:
            "35px",
        }}
      >

        {/* LEFT SECTION */}

        <div
          style={{
            display:
              "grid",

            gap:
              "30px",
          }}
        >

          {/* RESUME UPLOAD */}

          <div
            style={{
              backdropFilter:
                "blur(14px)",

              color:
                "#0f172a",

              borderRadius:
                "24px",

              padding:
                "40px",

              boxShadow:
                "0 10px 35px rgba(0,0,0,0.25)",

              border:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >

            <h2
              style={{
                color:
                  "white",

                fontSize:
                  "34px",

                marginBottom:
                  "20px",
              }}
            >
              Upload Resume
            </h2>

            <p
              style={{
                color:
                  "#02050a",

                marginBottom:
                  "30px",

                fontWeight:
                  "500",

                lineHeight:
                  "1.8",
              }}
            >
              Upload your latest resume in PDF or DOC format.
            </p>

            <input
              type="file"

              accept=".pdf,.doc,.docx"

              onChange={
                handleUpload
              }

              style={{
                marginBottom:
                  "25px",

                fontSize:
                  "16px",

                color:
                  "#475569",

                borderRadius:
                  "12px",

                border:
                  "1px solid #cbd5e1",

                background:
                  "#1e293b",
              }}
            />

            {resume && (

              <div
                style={{
                  background:
                    "#eff6ff",

                  padding:
                    "18px",

                  borderRadius:
                    "14px",

                  marginBottom:
                    "25px",
                }}
              >

                <p
                  style={{
                    margin:
                      "0",

                    fontWeight:
                      "700",
                  }}
                >
                  Selected File
                </p>

                <p
                  style={{
                    marginTop:
                      "8px",
                  }}
                >
                  {resume.name}
                </p>

              </div>
            )}

            <button
              onClick={
                handleSubmit
              }

              style={{
                width:
                  "100%",

                padding:
                  "16px",

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

                fontSize:
                  "18px",

                cursor:
                  "pointer",
              }}
            >
              Upload Resume
            </button>

          </div>

          {/* AI FORM */}

          <div
            style={{
              backdropFilter:
                "blur(14px)",

              color:
                "#0f172a",

              borderRadius:
                "24px",

              padding:
                "40px",

              border:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >

            <h2
              style={{
                color:
                  "white",

                fontSize:
                  "34px",

                marginBottom:
                  "20px",
              }}
            >
              Generate AI Resume
            </h2>

            <div
              style={{
                display:
                  "grid",

                gap:
                  "18px",
              }}
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"

                onChange={
                  handleChange
                }

                style={input}
              />

              <textarea
                name="skills"
                placeholder="Skills"

                rows="3"

                onChange={
                  handleChange
                }

                style={textarea}
              />

              <textarea
                name="projects"
                placeholder="Projects"

                rows="4"

                onChange={
                  handleChange
                }

                style={textarea}
              />

              <textarea
                name="education"
                placeholder="Education"

                rows="3"

                onChange={
                  handleChange
                }

                style={textarea}
              />

              <textarea
                name="achievements"
                placeholder="Achievements"

                rows="3"

                onChange={
                  handleChange
                }

                style={textarea}
              />

              <button
                onClick={
                  generateAIResume
                }

                style={{
                  padding:
                    "16px",

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

                  fontSize:
                    "18px",

                  cursor:
                    "pointer",
                }}
              >
                {
                  loading
                    ? "Generating..."
                    : "Generate AI Resume"
                }
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div
          style={{
            display:
              "grid",

            gap:
              "30px",
          }}
        >

          {/* AI OUTPUT */}

          <div
            style={{

              border:
                "1px solid rgba(255,255,255,0.1)",

              borderRadius:
                "24px",

              padding:
                "40px",

              backdropFilter:
                "blur(12px)",

              minHeight:
                "360px",
            }}
          >

            <h2
              style={{
                fontSize:
                  "34px",

                marginBottom:
                  "25px",
              }}
            >
              AI Generated Resume
            </h2>

            <div
              style={{
                whiteSpace:
                  "pre-wrap",

                lineHeight:
                  "1.9",

                color:
                  "#e2e8f0",
              }}
            >
              {
                aiResume ||

                "Your AI-generated professional resume will appear here..."
              }
            </div>

          </div>

          {/* TIPS */}

          <div
            style={{
              background:
                "rgba(255,255,255,0.08)",

              border:
                "1px solid rgba(255,255,255,0.1)",

              borderRadius:
                "24px",

              padding:
                "40px",

              backdropFilter:
                "blur(12px)",

            }}
          >

            <h2
              style={{
                fontSize:
                  "34px",

                marginBottom:
                  "25px",
              }}
            >
              Resume Tips
            </h2>

            <div
              style={{
                display:
                  "grid",

                gap:
                  "18px",
              }}
            >

              {tips.map(
                (tip) => (

                  <div
                    key={tip}

                    style={{
                      background:
                        "#1e293b",

                      padding:
                        "18px",

                      borderRadius:
                        "16px",

                      lineHeight:
                        "1.7",

                      color:
                        "#e2e8f0",
                    }}
                  >
                    ✓ {tip}
                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>

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

const textarea = {

  padding:
    "14px",

  borderRadius:
    "12px",

  border:
    "1px solid #cbd5e1",

  fontSize:
    "16px",

  resize:
    "none",

  background:
    "#1e293b",


};

const tips = [

  "Keep your resume limited to one page.",

  "Mention projects and technical skills clearly.",

  "Use professional email and LinkedIn profile.",

  "Highlight internships and certifications.",

  "Avoid grammatical and spelling mistakes.",

  "Use action verbs and measurable achievements.",

  "Customize resume for every company.",

  "Keep formatting clean and ATS-friendly.",
];