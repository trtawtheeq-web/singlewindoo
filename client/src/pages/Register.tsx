import { useState } from "react";
import { useLocation } from "wouter";

export default function Register() {
  const [, navigate] = useLocation();
  const [accountType, setAccountType] = useState<string>("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!accountType) newErrors.accountType = "هذا الحقل مطلوب";
    if (!nationalId) newErrors.nationalId = "هذا الحقل مطلوب";
    if (!email) newErrors.email = "هذا الحقل مطلوب";
    if (!phone) newErrors.phone = "هذا الحقل مطلوب";
    setErrors(newErrors);
  };

  const steps = [
    { num: 1, label: "نوع الحساب", active: true },
    { num: 2, label: "البيانات الشخصية", active: false },
    { num: 3, label: "كلمة المرور", active: false },
    { num: 4, label: "انتهاء التسجيل", active: false },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Tajawal', 'Cairo', Arial, sans-serif",
      direction: "rtl",
      backgroundColor: "#f5f5f5",
      margin: 0,
      padding: 0,
    }}>

      {/* Header */}
      <header style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        padding: "0 30px",
        height: "62px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#1a3c6e", lineHeight: "1.3" }}>النافذة الواحدة</div>
            <div style={{ fontSize: "10px", color: "#1a3c6e", letterSpacing: "1.5px", fontWeight: "500" }}>SINGLE WINDOW</div>
          </div>
          <img
            src="/sinwinqa_assets/321533_f1fbd40c102a4fbbae482c18e667927e~mv2.png"
            alt="Single Window"
            style={{ height: "42px", width: "42px", objectFit: "contain" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </header>

      {/* Main */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 20px 40px",
        backgroundColor: "#f5f5f5",
      }}>

        {/* Steps Bar */}
        <div style={{ width: "100%", maxWidth: "640px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", direction: "ltr" }}>
            {[...steps].reverse().map((step, i) => (
              <div key={step.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto", minWidth: "60px" }}>
                  <div style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: step.active ? "#2b5faa" : "#ffffff",
                    border: `2px solid ${step.active ? "#2b5faa" : "#cccccc"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: step.active ? "#ffffff" : "#aaaaaa",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}>
                    {step.num}
                  </div>
                  <span style={{
                    fontSize: "11px",
                    color: step.active ? "#2b5faa" : "#aaaaaa",
                    marginTop: "6px",
                    whiteSpace: "nowrap",
                    fontWeight: step.active ? "700" : "400",
                  }}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: "#dddddd",
                    marginBottom: "22px",
                    marginRight: "4px",
                    marginLeft: "4px",
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div style={{
          width: "100%",
          maxWidth: "560px",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: "4px",
          padding: "28px 36px 32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{
            fontSize: "17px",
            fontWeight: "700",
            color: "#333333",
            margin: "0 0 16px 0",
            paddingBottom: "14px",
            borderBottom: "1px solid #eeeeee",
          }}>
            اختر نوع الحساب
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Account Type Radio */}
            <div style={{ marginBottom: accountType ? "0" : "8px" }}>
              <label style={{
                display: "block",
                fontSize: "13px",
                color: "#444444",
                marginBottom: "10px",
                fontWeight: "600",
              }}>
                نوع الحساب <span style={{ color: "#cc0000" }}>*</span>
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#333333",
                }}>
                  <input
                    type="radio"
                    name="accountType"
                    value="resident"
                    checked={accountType === "resident"}
                    onChange={() => { setAccountType("resident"); setErrors({}); }}
                    style={{ width: "16px", height: "16px", accentColor: "#2b5faa", cursor: "pointer", flexShrink: 0 }}
                  />
                  المواطنين القطريين والمقيمين
                </label>

                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#333333",
                }}>
                  <input
                    type="radio"
                    name="accountType"
                    value="visitor"
                    checked={accountType === "visitor"}
                    onChange={() => { setAccountType("visitor"); setErrors({}); }}
                    style={{ width: "16px", height: "16px", accentColor: "#2b5faa", cursor: "pointer", flexShrink: 0 }}
                  />
                  الزوار والمستخدمين من خارج دولة قطر
                </label>
              </div>

              {errors.accountType && (
                <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "6px", display: "block" }}>
                  {errors.accountType}
                </span>
              )}
            </div>

            {/* Form Fields - shown after selection */}
            {accountType && (
              <div style={{ borderTop: "1px solid #f0f0f0", marginTop: "20px", paddingTop: "20px" }}>

                {/* National ID */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", color: "#555555", marginBottom: "6px", fontWeight: "500" }}>
                    {accountType === "resident" ? "رقم البطاقة الشخصية" : "رقم جواز السفر"}{" "}
                    <span style={{ color: "#cc0000" }}>*</span>
                  </label>
                  <input
                    type={accountType === "resident" ? "number" : "text"}
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: `1px solid ${errors.nationalId ? "#cc0000" : "#cccccc"}`,
                      borderRadius: "3px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                      direction: "ltr",
                      textAlign: "right",
                      color: "#333",
                      backgroundColor: "#fff",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.nationalId ? "#cc0000" : "#cccccc"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.nationalId && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.nationalId}</span>}
                </div>

                {/* Email */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", color: "#555555", marginBottom: "6px", fontWeight: "500" }}>
                    البريد الإلكتروني <span style={{ color: "#cc0000" }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: `1px solid ${errors.email ? "#cc0000" : "#cccccc"}`,
                      borderRadius: "3px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                      direction: "ltr",
                      textAlign: "right",
                      color: "#333",
                      backgroundColor: "#fff",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.email ? "#cc0000" : "#cccccc"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.email && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.email}</span>}
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "26px" }}>
                  <label style={{ display: "block", fontSize: "13px", color: "#555555", marginBottom: "6px", fontWeight: "500" }}>
                    رقم الهاتف المحمول <span style={{ color: "#cc0000" }}>*</span>
                  </label>
                  <div style={{ display: "flex", direction: "ltr" }}>
                    <div style={{
                      padding: "9px 12px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #cccccc",
                      borderRight: "none",
                      borderRadius: "3px 0 0 3px",
                      fontSize: "13px",
                      color: "#555",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                    }}>
                      +974
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        flex: 1,
                        padding: "9px 12px",
                        border: `1px solid ${errors.phone ? "#cc0000" : "#cccccc"}`,
                        borderRadius: "0 3px 3px 0",
                        fontSize: "14px",
                        outline: "none",
                        direction: "ltr",
                        color: "#333",
                        backgroundColor: "#fff",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.phone ? "#cc0000" : "#cccccc"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  {errors.phone && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.phone}</span>}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start" }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#1a3c6e",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px 36px",
                      borderRadius: "3px",
                      fontSize: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#15305a"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#1a3c6e"; }}
                  >
                    استمر
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#555555",
                      border: "1px solid #cccccc",
                      padding: "10px 28px",
                      borderRadius: "3px",
                      fontSize: "14px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#1a3c6e",
        padding: "28px 20px",
        textAlign: "center",
        color: "#ffffff",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="/sinwinqa_assets/321533_f1fbd40c102a4fbbae482c18e667927e~mv2.png"
              alt="Logo"
              style={{ height: "36px", filter: "brightness(0) invert(1)", opacity: 0.9 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", fontWeight: "700" }}>النافذة الواحدة</div>
              <div style={{ fontSize: "9px", letterSpacing: "1.5px", opacity: 0.8 }}>SINGLE WINDOW</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { href: "https://www.linkedin.com/company/mociqatar/", label: "in" },
              { href: "https://www.youtube.com/mociqatar", label: "▶" },
              { href: "https://twitter.com/MOCIQatar", label: "𝕏" },
              { href: "https://www.instagram.com/mociqatar/", label: "◎" },
              { href: "https://www.facebook.com/MOCIQatar/", label: "f" },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "11px",
                  textDecoration: "none",
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
          <p style={{ fontSize: "12px", opacity: 0.65, margin: 0 }}>© جميع الحقوق محفوظة 2026</p>
        </div>
      </footer>
    </div>
  );
}
