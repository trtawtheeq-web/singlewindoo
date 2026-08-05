import { useState } from "react";
import { useLocation } from "wouter";

export default function RegisterPassword() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { num: 1, label: "نوع الحساب", active: false },
    { num: 2, label: "البيانات الشخصية", active: false },
    { num: 3, label: "كلمة المرور", active: true },
    { num: 4, label: "انتهاء التسجيل", active: false },
  ];

  const validatePassword = (p: string) => {
    if (p.length < 8) return "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    if (!/[A-Z]/.test(p)) return "يجب أن تحتوي على حرف كبير";
    if (!/[a-z]/.test(p)) return "يجب أن تحتوي على حرف صغير";
    if (!/[0-9]/.test(p)) return "يجب أن تحتوي على رقم";
    return "";
  };

  const getStrength = (p: string) => {
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabel = ["", "ضعيفة جداً", "ضعيفة", "متوسطة", "قوية", "قوية جداً"][strength];
  const strengthColor = ["", "#e53935", "#fb8c00", "#fdd835", "#43a047", "#1a3c6e"][strength];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!username.trim()) errs.username = "هذا الحقل مطلوب";
    else if (username.length < 4) errs.username = "اسم المستخدم يجب أن يكون 4 أحرف على الأقل";
    else if (/[\u0600-\u06FF]/.test(username)) errs.username = "لا يقبل أحرفاً عربية";
    const pwErr = validatePassword(password);
    if (!password) errs.password = "هذا الحقل مطلوب";
    else if (pwErr) errs.password = pwErr;
    if (!confirmPassword) errs.confirmPassword = "هذا الحقل مطلوب";
    else if (password !== confirmPassword) errs.confirmPassword = "كلمتا المرور غير متطابقتين";
    if (Object.keys(errs).length === 0) {
      navigate("/register/complete");
    } else {
      setErrors(errs);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    padding: "9px 12px 9px 40px",
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

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#2b5faa";
    e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)";
  };
  const blurStyle = (field: string) => (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = errors[field] ? "#cc0000" : "#cccccc";
    e.target.style.boxShadow = "none";
  };

  const EyeIcon = ({ show }: { show: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "18px", height: "18px" }}>
      {show ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </>
      )}
    </svg>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Tajawal','Cairo',Arial,sans-serif", direction: "rtl", backgroundColor: "#f5f5f5" }}>

      {/* Header */}
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", padding: "0 30px", height: "62px", display: "flex", alignItems: "center", justifyContent: "flex-start", flexShrink: 0 }}>
        <a href="/" style={{textDecoration:"none"}}><img src="/logo.svg" alt="النافذة الواحدة" style={{ height: "48px", objectFit: "contain" }} /></a>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 20px 40px", backgroundColor: "#f5f5f5" }}>
        <div style={{ width: "100%", maxWidth: "600px" }}>

          {/* Steps Bar */}
          <div style={{ display: "flex", alignItems: "flex-start", direction: "ltr", marginBottom: "20px" }}>
            {[...steps].reverse().map((step, i) => (
              <>
                <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: step.active ? "#2b5faa" : "#fff", border: `2px solid ${step.active ? "#2b5faa" : "#ccc"}`, display: "flex", alignItems: "center", justifyContent: "center", color: step.active ? "#fff" : "#aaa", fontWeight: "700", fontSize: "14px" }}>
                    {step.num}
                  </div>
                  <span style={{ fontSize: "11px", color: step.active ? "#2b5faa" : "#aaa", marginTop: "6px", whiteSpace: "nowrap", fontWeight: step.active ? "700" : "400" }}>{step.label}</span>
                </div>
                {i < steps.length - 1 && <div style={{ flex: 1, height: "2px", backgroundColor: "#ddd", marginTop: "17px", marginRight: "6px", marginLeft: "6px" }} />}
              </>
            ))}
          </div>

          {/* Form Card */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #e5e5e5", borderRadius: "4px", padding: "28px 36px 32px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#333", margin: "0 0 20px 0", paddingBottom: "14px", borderBottom: "1px solid #eee" }}>إنشاء كلمة المرور</h2>

            <form onSubmit={handleSubmit} noValidate>

              {/* Username */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                  اسم المستخدم <span style={{ color: "#cc0000" }}>*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[\u0600-\u06FF\u0660-\u0669]/g, "");
                    setUsername(v);
                    if (errors.username) setErrors(p => ({ ...p, username: "" }));
                  }}
                  style={{ ...inputStyle(!!errors.username), direction: "ltr", textAlign: "left" }}
                  onFocus={focusStyle}
                  onBlur={blurStyle("username")}
                  placeholder="Username"
                />
                {errors.username && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.username}</span>}
              </div>

              {/* Password */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                  كلمة المرور <span style={{ color: "#cc0000" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[\u0600-\u06FF\u0660-\u0669]/g, "");
                      setPassword(v);
                      if (errors.password) setErrors(p => ({ ...p, password: "" }));
                    }}
                    style={inputStyle(!!errors.password)}
                    onFocus={focusStyle}
                    onBlur={blurStyle("password")}
                    placeholder="أدخل كلمة المرور"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888", padding: 0 }}>
                    <EyeIcon show={showPassword} />
                  </button>
                </div>
                {errors.password && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.password}</span>}

                {/* Strength bar */}
                {password && (
                  <div style={{ marginTop: "8px" }}>
                    <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                      {[1,2,3,4,5].map(i => (
                        <div key={i} style={{ flex: 1, height: "4px", borderRadius: "2px", backgroundColor: i <= strength ? strengthColor : "#e0e0e0" }} />
                      ))}
                    </div>
                    <span style={{ fontSize: "12px", color: strengthColor }}>{strengthLabel}</span>
                  </div>
                )}

                <div style={{ marginTop: "8px", fontSize: "12px", color: "#888", textAlign: "right" }}>
                  <p style={{ margin: "2px 0" }}>• 8 أحرف على الأقل</p>
                  <p style={{ margin: "2px 0" }}>• حرف كبير وحرف صغير</p>
                  <p style={{ margin: "2px 0" }}>• رقم واحد على الأقل</p>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: "26px" }}>
                <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                  تأكيد كلمة المرور <span style={{ color: "#cc0000" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[\u0600-\u06FF\u0660-\u0669]/g, "");
                      setConfirmPassword(v);
                      if (errors.confirmPassword) setErrors(p => ({ ...p, confirmPassword: "" }));
                    }}
                    style={inputStyle(!!errors.confirmPassword)}
                    onFocus={focusStyle}
                    onBlur={blurStyle("confirmPassword")}
                    placeholder="أعد إدخال كلمة المرور"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888", padding: 0 }}>
                    <EyeIcon show={showConfirm} />
                  </button>
                </div>
                {errors.confirmPassword && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.confirmPassword}</span>}
                {!errors.confirmPassword && confirmPassword && password === confirmPassword && (
                  <span style={{ color: "#43a047", fontSize: "12px", marginTop: "4px", display: "block" }}>✓ كلمتا المرور متطابقتان</span>
                )}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "space-between", direction: "ltr" }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" style={{ backgroundColor: "#1a3c6e", color: "#fff", border: "none", padding: "10px 36px", borderRadius: "3px", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#15305a"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#1a3c6e"; }}>استمر</button>
                  <button type="button" onClick={() => navigate("/register/personal-info")} style={{ backgroundColor: "#fff", color: "#555", border: "1px solid #ccc", padding: "10px 28px", borderRadius: "3px", fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }}>رجوع</button>
                </div>
                <button type="button" onClick={() => { setUsername(""); setPassword(""); setConfirmPassword(""); setErrors({}); }} style={{ backgroundColor: "#fff", color: "#555", border: "1px solid #ccc", padding: "10px 28px", borderRadius: "3px", fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }}>إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1a3c6e", padding: "28px 20px", textAlign: "center", color: "#fff", flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <a href="/" style={{textDecoration:"none"}}><img src="/logo.svg" alt="النافذة الواحدة" style={{ height: "44px", objectFit: "contain", filter: "brightness(0) invert(1)" }} /></a>
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
