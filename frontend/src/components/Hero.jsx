export default function Hero({ darkMode }) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        marginBottom: "60px",
      }}
    >
      <div
        style={{
          color: "#a78bfa",
          letterSpacing: "4px",
          fontSize: "13px",
          marginBottom: "20px",
        }}
      >
        ♦ SMART PLACEMENT PORTAL
      </div>

      <h1
        style={{
          fontSize: "clamp(50px,8vw,90px)",

          color: darkMode
            ? "white"
            : "#0f172a",

          fontWeight: "900",

          lineHeight: "1.1",

          marginBottom: "35px",
        }}
      >
        Your Career, Mapped.
      </h1>

      <p
        style={{
          color: darkMode
            ? "#cbd5e1"
            : "#475569",

          fontSize: "20px",

          lineHeight: "1.8",

          maxWidth: "750px",

          margin: "0 auto",

          padding: "0 20px",
        }}
      >
        Check eligibility, track timelines,
        and prepare smarter.
      </p>
    </div>
  );
}