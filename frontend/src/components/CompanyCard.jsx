export default function CompanyCard({
  company,
  darkMode,
}) {
  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-8px) scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
      }}
      style={{
        background: darkMode
          ? "rgba(30,41,59,0.7)"
          : "rgba(255,255,255,0.75)",

        transition: "0.4s ease",

        transform: "translateY(0px)",

        borderRadius: "24px",

        border: darkMode
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(148,163,184,0.2)",

        overflow: "hidden",

        backdropFilter: "blur(10px)",

        cursor: "pointer",

        boxShadow: darkMode
          ? "0 0 25px rgba(139,92,246,0.08)"
          : "0 10px 30px rgba(15,23,42,0.08)",

        padding: "30px",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "20px",
          background: company.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "38px",
          fontWeight: "800",
          marginBottom: "25px",
          color: "#fff",
        }}
      >
        {company.name[0]}
      </div>

      <h2
        style={{
          fontSize: "42px",
          color: darkMode ? "white" : "#0f172a",
          marginBottom: "8px",
        }}
      >
        {company.name}
      </h2>

      <div
        style={{
          color: darkMode
            ? "#e2e8f0"
            : "#334155",
          marginBottom: "30px",
        }}
      >
        {company.domain}
      </div>

      <p
        style={{
          color: darkMode
            ? "#cbd5e1"
            : "#475569",

          lineHeight: "1.7",

          marginBottom: "25px",
        }}
      >
        {company.description}
      </p>

      <div
        style={{
          display: "inline-block",

          padding: "10px 18px",

          borderRadius: "999px",

          background:
            "rgba(34,197,94,0.15)",

          color: "#4ade80",

          border:
            "1px solid rgba(34,197,94,0.3)",

          fontWeight: "600",
        }}
      >
        ✓ You're Eligible
      </div>
    </div>
  );
}