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
    if (Object.keys(newErrors).length === 0) {
      // proceed to next step
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Tajawal', 'Arial', sans-serif", direction: "rtl", backgroundColor: "#fff" }}>

      {/* Header */}
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", padding: "0 40px", height: "60px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#1a3c6e", lineHeight: "1.2", textAlign: "right" }}>
            النافذة الواحدة<br />
            <span style={{ fontSize: "11px", letterSpacing: "1px" }}>SINGLE WINDOW</span>
          </span>
          <img
            src="/sinwinqa_assets/321533_f1fbd40c102a4fbbae482c18e667927e~mv2.png"
            alt="Single Window Logo"
            style={{ height: "40px", width: "40px", objectFit: "contain" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0", position: "relative", overflow: "hidden" }}>

        {/* Background image */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
          backgroundImage: "url(/sinwinqa_assets/982b48ad_s9_jpg.jpg)",
          backgroundSize: "cover", backgroundPosition: "center top",
          opacity: 0.15, zIndex: 0
        }} />

        {/* Steps Bar */}
        <div style={{ width: "100%", maxWidth: "700px", padding: "30px 20px 20px", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", direction: "rtl" }}>
            {[
              { num: 1, label: "نوع الحساب", active: true },
              { num: 2, label: "البيانات الشخصية", active: false },
              { num: 3, label: "كلمة المرور", active: false },
              { num: 4, label: "انتهاء التسجيل", active: false },
            ].map((step, i, arr) => (
              <div key={step.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    backgroundColor: step.active ? "#2b5faa" : "#fff",
                    border: `2px solid ${step.active ? "#2b5faa" : "#ccc"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: step.active ? "#fff" : "#999",
                    fontWeight: "700", fontSize: "14px"
                  }}>
                    {step.num}
                  </div>
                  <span style={{ fontSize: "12px", color: step.active ? "#2b5faa" : "#999", marginTop: "6px", whiteSpace: "nowrap" }}>
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ flex: 1, height: "2px", backgroundColor: "#e0e0e0", margin: "0 4px", marginBottom: "20px" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div style={{
          width: "100%", maxWidth: "560px", backgroundColor: "#fff",
          border: "1px solid #e8e8e8", borderRadius: "4px",
          padding: "30px 40px", zIndex: 1, marginBottom: "40px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#333", marginBottom: "20px", borderBottom: "1px solid #e8e8e8", paddingBottom: "15px" }}>
            اختر نوع الحساب
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Account Type */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", color: "#333", marginBottom: "10px", fontWeight: "500" }}>
                نوع الحساب <span style={{ color: "red" }}>*</span>
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "#333" }}>
                  <input
                    type="radio"
                    name="accountType"
                    value="resident"
                    checked={accountType === "resident"}
                    onChange={() => { setAccountType("resident"); setErrors({}); }}
                    style={{ width: "16px", height: "16px", accentColor: "#2b5faa", cursor: "pointer" }}
                  />
                  المواطنين القطريين والمقيمين
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "#333" }}>
                  <input
                    type="radio"
                    name="accountType"
                    value="visitor"
                    checked={accountType === "visitor"}
                    onChange={() => { setAccountType("visitor"); setErrors({}); }}
                    style={{ width: "16px", height: "16px", accentColor: "#2b5faa", cursor: "pointer" }}
                  />
                  الزوار والمستخدمين من خارج دولة قطر
                </label>
              </div>
              {errors.accountType && <span style={{ color: "red", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.accountType}</span>}
            </div>

            {/* Form Fields - shown when account type selected */}
            {accountType && (
              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>

                {/* National ID / Passport */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                    {accountType === "resident" ? "رقم البطاقة الشخصية" : "رقم جواز السفر"} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type={accountType === "resident" ? "number" : "text"}
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 12px", border: `1px solid ${errors.nationalId ? "red" : "#ccc"}`,
                      borderRadius: "4px", fontSize: "14px", outline: "none", boxSizing: "border-box",
                      direction: "ltr", textAlign: "right"
                    }}
                  />
                  {errors.nationalId && <span style={{ color: "red", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.nationalId}</span>}
                </div>

                {/* Email */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                    البريد الإلكتروني <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 12px", border: `1px solid ${errors.email ? "red" : "#ccc"}`,
                      borderRadius: "4px", fontSize: "14px", outline: "none", boxSizing: "border-box",
                      direction: "ltr", textAlign: "right"
                    }}
                  />
                  {errors.email && <span style={{ color: "red", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.email}</span>}
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                    رقم الهاتف المحمول <span style={{ color: "red" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: "100%", padding: "10px 12px", paddingLeft: "60px",
                        border: `1px solid ${errors.phone ? "red" : "#ccc"}`,
                        borderRadius: "4px", fontSize: "14px", outline: "none",
                        boxSizing: "border-box", direction: "ltr"
                      }}
                    />
                    <span style={{
                      position: "absolute", left: "0", top: "0", bottom: "0",
                      backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px 0 0 4px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "0 10px", fontSize: "13px", color: "#555", minWidth: "50px"
                    }}>
                      +974
                    </span>
                  </div>
                  {errors.phone && <span style={{ color: "red", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.phone}</span>}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start" }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#1a3c6e", color: "#fff", border: "none",
                      padding: "10px 32px", borderRadius: "4px", fontSize: "14px",
                      fontWeight: "700", cursor: "pointer", fontFamily: "inherit"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#15305a")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1a3c6e")}
                  >
                    استمر
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    style={{
                      backgroundColor: "#fff", color: "#555", border: "1px solid #ccc",
                      padding: "10px 24px", borderRadius: "4px", fontSize: "14px",
                      cursor: "pointer", fontFamily: "inherit"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
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
      <footer style={{ backgroundColor: "#1a3c6e", padding: "30px 20px", textAlign: "center", color: "#fff" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="/sinwinqa_assets/321533_f1fbd40c102a4fbbae482c18e667927e~mv2.png"
              alt="Logo"
              style={{ height: "35px", filter: "brightness(0) invert(1)", opacity: 0.9 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "14px", fontWeight: "700" }}>النافذة الواحدة</div>
              <div style={{ fontSize: "10px", letterSpacing: "1px", opacity: 0.8 }}>SINGLE WINDOW</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { href: "https://www.linkedin.com/company/mociqatar/", icon: "in" },
              { href: "https://www.youtube.com/mociqatar", icon: "▶" },
              { href: "https://twitter.com/MOCIQatar", icon: "𝕏" },
              { href: "https://www.instagram.com/mociqatar/", icon: "◎" },
              { href: "https://www.facebook.com/MOCIQatar/", icon: "f" },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
                style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "12px", textDecoration: "none"
                }}>
                {s.icon}
              </a>
            ))}
          </div>
          <p style={{ fontSize: "12px", opacity: 0.7, margin: 0 }}>© جميع الحقوق محفوظة 2026</p>
        </div>
      </footer>
    </div>
  );
}
