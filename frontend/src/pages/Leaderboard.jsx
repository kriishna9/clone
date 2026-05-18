import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function Leaderboard() {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchLeaderboard();

  }, []);

  const fetchLeaderboard =
    async () => {

      try {

        const res =
          await API.get(
            "/leaderboard"
          );

        console.log(
          res.data
        );

        setStudents(
          res.data
        );

      } catch (error) {

        console.log(
          error
        );

      } finally {

        setLoading(
          false
        );
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

      {/* HEADER */}

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

            fontWeight:
              "900",

            marginBottom:
              "10px",
          }}
        >
          Placement Leaderboard
        </h1>

        <p
          style={{
            color:
              "#cbd5e1",

            fontSize:
              "30px",
          }}
        >
          <br />
          Successfully placed students
        </p>

      </div>

      {/* LOADING */}

      {loading && (

        <h2
          style={{
            textAlign:
              "center",

            marginTop:
              "60px",
          }}
        >
          Loading...
        </h2>
      )}

      {/* NO DATA */}

      {!loading &&
        students.length === 0 && (

          <h2
            style={{
              textAlign:
                "center",

              marginTop:
                "60px",

              color:
                "#cbd5e1",
            }}
          >
            No placed students found
          </h2>
        )}

      {/* LEADERBOARD */}

      <div
        style={{
          maxWidth:
            "1100px",

          margin:
            "0 auto",

          display:
            "grid",

          gap:
            "25px",
        }}
      >

        {students.map(
          (
            student,
            index
          ) => (

            <div
              key={
                student._id
              }

              style={{
                background:
                  "rgba(255,255,255,0.08)",

                border:
                  "1px solid rgba(255,255,255,0.1)",

                backdropFilter:
                  "blur(12px)",

                borderRadius:
                  "24px",

                padding:
                  "28px 35px",

                display:
                  "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "center",

                flexWrap:
                  "wrap",

                gap:
                  "20px",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >

              {/* LEFT */}

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "25px",
                }}
              >

                <div
                  style={{
                    width:
                      "80px",

                    height:
                      "80px",

                    borderRadius:
                      "50%",

                    background:
                      index === 0
                        ? "#facc15"
                        : index === 1
                        ? "#cbd5e1"
                        : index === 2
                        ? "#fb923c"
                        : "#8b5cf6",

                    display:
                      "flex",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",

                    fontSize:
                      "34px",

                    fontWeight:
                      "900",

                    color:
                      "#0f172a",
                  }}
                >
                  {
                    index + 1
                  }
                </div>

                <div>

                  <h2
                    style={{
                      fontSize:
                        "32px",

                      marginBottom:
                        "8px",
                    }}
                  >
                    {
                      student.name ||
                      "No Name"
                    }
                  </h2>

                  <p
                    style={{
                      color:
                        "#cbd5e1",

                      fontSize:
                        "18px",
                    }}
                  >
                    {
                      student.branch ||
                      "No Branch"
                    }
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div
                style={{
                  textAlign:
                    "right",
                }}
              >

                <div
                  style={{
                    background:
                      "#22c55e",

                    padding:
                      "10px 20px",

                    borderRadius:
                      "999px",

                    fontWeight:
                      "700",

                    marginBottom:
                      "12px",

                    display:
                      "inline-block",
                  }}
                >
                  Placed
                </div>

                <h3
                  style={{
                    fontSize:
                      "28px",

                    marginBottom:
                      "8px",
                  }}
                >
                  {
                    student.company ||
                    "Company Not Added"
                  }
                </h3>

                <p
                  style={{
                    fontSize:
                      "20px",

                    color:
                      "#93c5fd",

                    fontWeight:
                      "700",
                  }}
                >
                  {
                    student.package ||
                    "0"
                  }{" "}
                  LPA
                </p>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}