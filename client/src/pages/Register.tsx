import { useState } from "react";
import { useLocation } from "wouter";

export default function Register() {
  const [, navigate] = useLocation();
  const [accountType, setAccountType] = useState<string>("");
  const [countryCode, setCountryCode] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v: string) => /^\d{7,12}$/.test(v);
  const validateNationalId = (v: string) => /^\d{8,11}$/.test(v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!accountType) newErrors.accountType = "يرجى اختيار نوع الحساب";
    if (accountType === "resident") {
      if (!nationalId) newErrors.nationalId = "هذا الحقل مطلوب";
      else if (!validateNationalId(nationalId)) newErrors.nationalId = "رقم البطاقة يجب أن يكون 8-11 رقماً";
    }
    if (!email) newErrors.email = "هذا الحقل مطلوب";
    else if (!validateEmail(email)) newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    if (!phone) newErrors.phone = "هذا الحقل مطلوب";
    else if (!validatePhone(phone)) newErrors.phone = "رقم الهاتف يجب أن يحتوي على أرقام فقط (7-12 رقم)";
    if (accountType === "visitor" && !countryCode) newErrors.countryCode = "يرجى اختيار رمز الدولة";
    setErrors(newErrors);
  };

  const steps = [
    { num: 1, label: "نوع الحساب", active: true },
    { num: 2, label: "البيانات الشخصية", active: false },
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
  });

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
        justifyContent: "flex-start",
        flexShrink: 0,
      }}>
        <img src="/logo.svg" alt="النافذة الواحدة" style={{ height: "48px", objectFit: "contain" }} />
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

        <div style={{ width: "100%", maxWidth: "600px" }}>

          {/* Steps Bar - above card, same width */}
          <div style={{ display: "flex", alignItems: "flex-start", direction: "ltr", marginBottom: "20px" }}>
            {[...steps].reverse().map((step, i) => (
              <div key={step.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: step.active ? "#2b5faa" : "#ffffff",
                      border: `2px solid ${step.active ? "#2b5faa" : "#cccccc"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: step.active ? "#ffffff" : "#aaaaaa",
                      fontWeight: "700",
                      fontSize: "14px",
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
                    <div style={{ flex: 1, height: "2px", backgroundColor: "#dddddd", marginBottom: "22px", minWidth: "20px" }} />
                  )}
                </div>
              ))}
          </div>

          {/* Form Card */}
          <div style={{
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

            <form onSubmit={handleSubmit} noValidate>
              {/* Account Type */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", color: "#444", marginBottom: "10px", fontWeight: "600" }}>
                  نوع الحساب <span style={{ color: "#cc0000" }}>*</span>
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { value: "resident", label: "المواطنين القطريين والمقيمين" },
                    { value: "visitor", label: "الزوار والمستخدمين من خارج دولة قطر" },
                  ].map((opt) => (
                    <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", color: "#333" }}>
                      <input
                        type="radio"
                        name="accountType"
                        value={opt.value}
                        checked={accountType === opt.value}
                        onChange={() => { setAccountType(opt.value); setErrors({}); setNationalId(""); setEmail(""); setPhone(""); setCountryCode(""); }}
                        style={{ width: "16px", height: "16px", accentColor: "#2b5faa", cursor: "pointer", flexShrink: 0 }}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                {errors.accountType && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "6px", display: "block" }}>{errors.accountType}</span>}
              </div>

              {/* Dynamic Fields */}
              {accountType && (
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px" }}>

                  {/* National ID - residents only */}
                  {accountType === "resident" && (
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                        رقم البطاقة الشخصية <span style={{ color: "#cc0000" }}>*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={nationalId}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "");
                          setNationalId(v);
                          if (errors.nationalId) setErrors(prev => ({ ...prev, nationalId: "" }));
                        }}
                        maxLength={11}
                        style={{ ...inputStyle(!!errors.nationalId), direction: "ltr", textAlign: "right" }}
                        onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = errors.nationalId ? "#cc0000" : "#cccccc"; e.target.style.boxShadow = "none"; }}
                      />
                      {errors.nationalId && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.nationalId}</span>}
                    </div>
                  )}

                  {/* Email */}
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                      البريد الإلكتروني <span style={{ color: "#cc0000" }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g, "");
                        setEmail(v);
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                      }}
                      onKeyDown={(e) => {
                        if (/[\u0600-\u06FF]/.test(e.key)) e.preventDefault();
                      }}
                      style={{ ...inputStyle(!!errors.email), direction: "ltr", textAlign: "right" }}
                      onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.email ? "#cc0000" : "#cccccc";
                        e.target.style.boxShadow = "none";
                        if (email && !validateEmail(email)) setErrors(prev => ({ ...prev, email: "يرجى إدخال بريد إلكتروني صحيح" }));
                      }}
                    />
                    {errors.email && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.email}</span>}
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: "26px" }}>
                    <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
                      رقم الهاتف المحمول <span style={{ color: "#cc0000" }}>*</span>
                    </label>

                    {accountType === "resident" && (
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
                        }}>+974</div>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={phone}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            setPhone(v);
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                          }}
                          maxLength={12}
                          style={{ ...inputStyle(!!errors.phone), borderRadius: "0 3px 3px 0", direction: "ltr", flex: 1 }}
                          onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                          onBlur={(e) => { e.target.style.borderColor = errors.phone ? "#cc0000" : "#cccccc"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    )}

                    {accountType === "visitor" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={phone}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            setPhone(v);
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                          }}
                          maxLength={12}
                          style={{ ...inputStyle(!!errors.phone), direction: "ltr" }}
                          onFocus={(e) => { e.target.style.borderColor = "#2b5faa"; e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)"; }}
                          onBlur={(e) => { e.target.style.borderColor = errors.phone ? "#cc0000" : "#cccccc"; e.target.style.boxShadow = "none"; }}
                        />
                        <div style={{ position: "relative" }}>
                          <select
                            value={countryCode}
                            onChange={(e) => { setCountryCode(e.target.value); if (errors.countryCode) setErrors(prev => ({ ...prev, countryCode: "" })); }}
                            style={{
                              width: "100%",
                              padding: "9px 36px 9px 12px",
                              border: `1px solid ${errors.countryCode ? "#cc0000" : "#cccccc"}`,
                              borderRadius: "3px",
                              fontSize: "13px",
                              outline: "none",
                              direction: "rtl",
                              color: countryCode ? "#333" : "#999",
                              backgroundColor: "#fff",
                              appearance: "none",
                              cursor: "pointer",
                              fontFamily: "inherit",
                            }}
                          >
                            <option value="" disabled>حدد الرمز الهاتفي الدولي</option>
                            <option value="+1">+1 - الولايات المتحدة / كندا</option>
                            <option value="+44">+44 - المملكة المتحدة</option>
                            <option value="+33">+33 - فرنسا</option>
                            <option value="+49">+49 - ألمانيا</option>
                            <option value="+91">+91 - الهند</option>
                            <option value="+92">+92 - باكستان</option>
                            <option value="+880">+880 - بنغلاديش</option>
                            <option value="+63">+63 - الفلبين</option>
                            <option value="+62">+62 - إندونيسيا</option>
                            <option value="+20">+20 - مصر</option>
                            <option value="+212">+212 - المغرب</option>
                            <option value="+213">+213 - الجزائر</option>
                            <option value="+216">+216 - تونس</option>
                            <option value="+218">+218 - ليبيا</option>
                            <option value="+249">+249 - السودان</option>
                            <option value="+966">+966 - السعودية</option>
                            <option value="+971">+971 - الإمارات</option>
                            <option value="+973">+973 - البحرين</option>
                            <option value="+965">+965 - الكويت</option>
                            <option value="+968">+968 - عُمان</option>
                            <option value="+967">+967 - اليمن</option>
                            <option value="+962">+962 - الأردن</option>
                            <option value="+961">+961 - لبنان</option>
                            <option value="+963">+963 - سوريا</option>
                            <option value="+964">+964 - العراق</option>
                            <option value="+90">+90 - تركيا</option>
                            <option value="+98">+98 - إيران</option>
                            <option value="+7">+7 - روسيا</option>
                            <option value="+86">+86 - الصين</option>
                            <option value="+81">+81 - اليابان</option>
                            <option value="+82">+82 - كوريا الجنوبية</option>
                            <option value="+61">+61 - أستراليا</option>
                            <option value="+55">+55 - البرازيل</option>
                            <option value="+27">+27 - جنوب أفريقيا</option>
                            <option value="+234">+234 - نيجيريا</option>
                            <option value="+94">+94 - سريلانكا</option>
                            <option value="+977">+977 - نيبال</option>
                          </select>
                          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#666", fontSize: "11px" }}>▼</span>
                        </div>
                      </div>
                    )}
                    {errors.phone && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.phone}</span>}
                    {errors.countryCode && <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.countryCode}</span>}
                  </div>

                  {/* Buttons */}
                  <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start", direction: "rtl" }}>
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
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#15305a"; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#1a3c6e"; }}
                    >استمر</button>
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#555",
                        border: "1px solid #cccccc",
                        padding: "10px 28px",
                        borderRadius: "3px",
                        fontSize: "14px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                    >إلغاء</button>
                  </div>
                </div>
              )}
            </form>
          </div>
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
          <img src="/logo.svg" alt="النافذة الواحدة" style={{ height: "44px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { href: "https://www.linkedin.com/company/mociqatar/", label: "in" },
              { href: "https://www.youtube.com/mociqatar", label: "▶" },
              { href: "https://twitter.com/MOCIQatar", label: "𝕏" },
              { href: "https://www.instagram.com/mociqatar/", label: "◎" },
              { href: "https://www.facebook.com/MOCIQatar/", label: "f" },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" style={{
                width: "30px", height: "30px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#ffffff", fontSize: "11px", textDecoration: "none",
              }}>{s.label}</a>
            ))}
          </div>
          <p style={{ fontSize: "12px", opacity: 0.65, margin: 0 }}>© جميع الحقوق محفوظة 2026</p>
        </div>
      </footer>
    </div>
  );
}
