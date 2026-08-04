import { useState } from "react";
import { useLocation } from "wouter";

export default function RegisterPersonalInfo() {
  const [, navigate] = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { num: 1, label: "نوع الحساب", active: false },
    { num: 2, label: "البيانات الشخصية", active: true },
    { num: 3, label: "كلمة المرور", active: false },
    { num: 4, label: "انتهاء التسجيل", active: false },
  ];

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    padding: "9px 12px",
    border: `1px solid ${hasError ? "#cc0000" : "#cccccc"}`,
    borderRadius: "3px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    color: "#333",
    backgroundColor: "#fff",
    fontFamily: "inherit",
    direction: "rtl" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "هذا الحقل مطلوب";
    if (!lastName.trim()) newErrors.lastName = "هذا الحقل مطلوب";
    if (!username.trim()) newErrors.username = "هذا الحقل مطلوب";
    else if (username.length < 4) newErrors.username = "اسم المستخدم يجب أن يكون 4 أحرف على الأقل";
    if (Object.keys(newErrors).length === 0) {
      navigate("/register/password");
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Tajawal', 'Cairo', Arial, sans-serif",
      direction: "rtl",
      backgroundColor: "#f5f5f5",
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        padding: "0 30px",
        height: "62px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexShrink: 0,
      }}>
        <img src="/logo.svg" alt="النافذة الواحدة" style={{ height: "48px", objectFit: "contain" }} />
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 20px 40px", backgroundColor: "#f5f5f5" }}>
        <div style={{ width: "100%", maxWidth: "600px" }}>

          {/* Steps Bar */}
          <div style={{ display: "flex", alignItems: "flex-start", direction: "ltr", marginBottom: "20px" }}>
            {[...steps].reverse().map((step, i) => (
              <>
                <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    backgroundColor: step.active ? "#2b5faa" : "#ffffff",
                    border: `2px solid ${step.active ? "#2b5faa" : "#cccccc"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: step.active ? "#ffffff" : "#aaaaaa", fontWeight: "700", fontSize: "14px",
                  }}>{step.num}</div>
                  <span style={{ fontSize: "11px", color: step.active ? "#2b5faa" : "#aaaaaa", marginTop: "6px", whiteSpace: "nowrap", fontWeight: step.active ? "700" : "400" }}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: "2px", backgroundColor: "#dddddd", marginTop: "17px", marginRight: "6px", marginLeft: "6px" }} />
                )}
              </>
            ))}
          </div>

          {/* Form Card */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e5e5", borderRadius: "4px", padding: "28px 36px 32px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#333", margin: "0 0 16px 0", paddingBottom: "14px", borderBottom: "1px solid #eeeeee" }}>
              البيانات الشخصية
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              {/* First Name */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                  الاسم الأول <span style={{ color: "#cc0000" }}>*</span>
                </label>
                <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value); if (errors.firstName) setErrors(p => ({ ...p, firstName: "" })); }}
                  style={inputStyle(!!errors.firstName)}
                  onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.firstName ? "#cc0000" : "#cccccc"; e.target.style.boxShadow = "none"; }}
                />
                {errors.firstName && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.firstName}</span>}
              </div>

              {/* Last Name */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                  اسم العائلة <span style={{ color: "#cc0000" }}>*</span>
                </label>
                <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value); if (errors.lastName) setErrors(p => ({ ...p, lastName: "" })); }}
                  style={inputStyle(!!errors.lastName)}
                  onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.lastName ? "#cc0000" : "#cccccc"; e.target.style.boxShadow = "none"; }}
                />
                {errors.lastName && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.lastName}</span>}
              </div>

              {/* Username */}
              <div style={{ marginBottom: "26px" }}>
                <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                  اسم المستخدم <span style={{ color: "#cc0000" }}>*</span>
                </label>
                <input type="text" value={username}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[\u0600-\u06FF\s]/g, "");
                    setUsername(v);
                    if (errors.username) setErrors(p => ({ ...p, username: "" }));
                  }}
                  style={{ ...inputStyle(!!errors.username), direction: "ltr", textAlign: "right" }}
                  onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.username ? "#cc0000" : "#cccccc"; e.target.style.boxShadow = "none"; }}
                />
                {errors.username && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.username}</span>}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start", direction: "rtl" }}>
                <button type="submit" style={{ backgroundColor: "#1a3c6e", color: "#fff", border: "none", padding: "10px 36px", borderRadius: "3px", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#15305a"; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#1a3c6e"; }}>
                  استمر
                </button>
                <button type="button" onClick={() => navigate("/register")} style={{ backgroundColor: "#fff", color: "#555", border: "1px solid #ccc", padding: "10px 28px", borderRadius: "3px", fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }}>
                  رجوع
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1a3c6e", padding: "28px 20px", textAlign: "center", color: "#fff", flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <img src="/logo.svg" alt="النافذة الواحدة" style={{ height: "44px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { href: "https://www.linkedin.com/company/mociqatar/", label: "in" },
              { href: "https://www.youtube.com/mociqatar", label: "▶" },
              { href: "https://twitter.com/MOCIQatar", label: "𝕏" },
              { href: "https://www.instagram.com/mociqatar/", label: "◎" },
              { href: "https://www.facebook.com/MOCIQatar/", label: "f" },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", textDecoration: "none" }}>{s.label}</a>
            ))}
          </div>
          <p style={{ fontSize: "12px", opacity: 0.65, margin: 0 }}>© جميع الحقوق محفوظة 2026</p>
        </div>
      </footer>
    </div>
  );
}
