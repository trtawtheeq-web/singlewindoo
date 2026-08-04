import { useState } from "react";
import { useLocation } from "wouter";

const COUNTRIES = [
  "قطر","السعودية","الإمارات","الكويت","البحرين","عُمان","اليمن","الأردن","لبنان","سوريا","العراق","مصر",
  "المغرب","الجزائر","تونس","ليبيا","السودان","الهند","باكستان","بنغلاديش","الفلبين","إندونيسيا",
  "سريلانكا","نيبال","تركيا","إيران","المملكة المتحدة","فرنسا","ألمانيا","الولايات المتحدة","كندا",
  "أستراليا","الصين","اليابان","كوريا الجنوبية","روسيا","البرازيل","جنوب أفريقيا","نيجيريا","كينيا",
];

export default function RegisterPersonalInfo() {
  const [, navigate] = useLocation();

  const [nationality, setNationality] = useState("قطر");
  const [firstNameAr, setFirstNameAr] = useState("");
  const [middleNameAr, setMiddleNameAr] = useState("");
  const [lastNameAr, setLastNameAr] = useState("");
  const [firstNameEn, setFirstNameEn] = useState("");
  const [middleNameEn, setMiddleNameEn] = useState("");
  const [lastNameEn, setLastNameEn] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isArabic = (v: string) => /^[\u0600-\u06FF\s]+$/.test(v);
  const isEnglish = (v: string) => /^[a-zA-Z\s]+$/.test(v);

  const steps = [
    { num: 1, label: "نوع الحساب", active: false },
    { num: 2, label: "البيانات الشخصية", active: true },
    { num: 3, label: "كلمة المرور", active: false },
    { num: 4, label: "انتهاء التسجيل", active: false },
  ];

  const inputStyle = (hasError: boolean, dir: "rtl" | "ltr" = "rtl") => ({
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
    direction: dir,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!firstNameAr.trim()) errs.firstNameAr = "هذا الحقل مطلوب";
    else if (!isArabic(firstNameAr)) errs.firstNameAr = "يجب إدخال الاسم بالعربية فقط";
    if (!middleNameAr.trim()) errs.middleNameAr = "هذا الحقل مطلوب";
    else if (!isArabic(middleNameAr)) errs.middleNameAr = "يجب إدخال الاسم بالعربية فقط";
    if (!lastNameAr.trim()) errs.lastNameAr = "هذا الحقل مطلوب";
    else if (!isArabic(lastNameAr)) errs.lastNameAr = "يجب إدخال الاسم بالعربية فقط";
    if (!firstNameEn.trim()) errs.firstNameEn = "هذا الحقل مطلوب";
    else if (!isEnglish(firstNameEn)) errs.firstNameEn = "يجب إدخال الاسم بالإنجليزية فقط";
    if (!middleNameEn.trim()) errs.middleNameEn = "هذا الحقل مطلوب";
    else if (!isEnglish(middleNameEn)) errs.middleNameEn = "يجب إدخال الاسم بالإنجليزية فقط";
    if (!lastNameEn.trim()) errs.lastNameEn = "هذا الحقل مطلوب";
    else if (!isEnglish(lastNameEn)) errs.lastNameEn = "يجب إدخال الاسم بالإنجليزية فقط";
    if (!gender) errs.gender = "يرجى اختيار الجنس";
    if (Object.keys(errs).length === 0) {
      navigate("/register/password");
    } else {
      setErrors(errs);
    }
  };

  const blockArabic = (setter: (v: string) => void, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[\u0600-\u06FF]/g, "");
    setter(v);
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const blockEnglish = (setter: (v: string) => void, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[a-zA-Z]/g, "");
    setter(v);
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#2b5faa";
    e.target.style.boxShadow = "0 0 0 2px rgba(43,95,170,0.1)";
  };
  const blurStyle = (field: string) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = errors[field] ? "#cc0000" : "#cccccc";
    e.target.style.boxShadow = "none";
  };

  const Label = ({ text, required }: { text: string; required?: boolean }) => (
    <label style={{ display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" }}>
      {text} {required && <span style={{ color: "#cc0000" }}>*</span>}
    </label>
  );

  const Error = ({ msg }: { msg?: string }) =>
    msg ? <span style={{ color: "#cc0000", fontSize: "12px", marginTop: "4px", display: "block" }}>{msg}</span> : null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Tajawal','Cairo',Arial,sans-serif", direction: "rtl", backgroundColor: "#f5f5f5" }}>

      {/* Header */}
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", padding: "0 30px", height: "62px", display: "flex", alignItems: "center", justifyContent: "flex-start", flexShrink: 0 }}>
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
            <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#333", margin: "0 0 20px 0", paddingBottom: "14px", borderBottom: "1px solid #eee" }}>البيانات الشخصية</h2>

            <form onSubmit={handleSubmit} noValidate>

              {/* Nationality */}
              <div style={{ marginBottom: "16px" }}>
                <Label text="الجنسية" required />
                <div style={{ position: "relative" }}>
                  <select value={nationality} onChange={(e) => setNationality(e.target.value)}
                    style={{ ...inputStyle(false), appearance: "none", cursor: "pointer", paddingLeft: "32px" }}
                    onFocus={focusStyle} onBlur={blurStyle("nationality")}>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#666", fontSize: "11px" }}>▼</span>
                </div>
              </div>

              {/* Name label */}
              <div style={{ marginBottom: "8px" }}>
                <Label text="الاسم" required />
                <p style={{ fontSize: "12px", color: "#888", margin: "0 0 12px 0" }}>يرجى إدخال الاسم بالعربية او الاسم بالانجليزية</p>
              </div>

              {/* Arabic Name */}
              <div style={{ marginBottom: "16px", padding: "14px", backgroundColor: "#fafafa", border: "1px solid #eee", borderRadius: "4px" }}>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "#444", margin: "0 0 12px 0" }}>الاسم بالعربي</p>
                <div style={{ marginBottom: "10px" }}>
                  <input type="text" placeholder="الاسم الأول [عربي]" value={firstNameAr}
                    onChange={blockEnglish(setFirstNameAr, "firstNameAr")}
                    style={inputStyle(!!errors.firstNameAr)} onFocus={focusStyle} onBlur={blurStyle("firstNameAr")} />
                  <Error msg={errors.firstNameAr} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input type="text" placeholder="الاسم الأوسط [عربي]" value={middleNameAr}
                    onChange={blockEnglish(setMiddleNameAr, "middleNameAr")}
                    style={inputStyle(!!errors.middleNameAr)} onFocus={focusStyle} onBlur={blurStyle("middleNameAr")} />
                  <Error msg={errors.middleNameAr} />
                </div>
                <div>
                  <input type="text" placeholder="اسم العائلة [عربي]" value={lastNameAr}
                    onChange={blockEnglish(setLastNameAr, "lastNameAr")}
                    style={inputStyle(!!errors.lastNameAr)} onFocus={focusStyle} onBlur={blurStyle("lastNameAr")} />
                  <Error msg={errors.lastNameAr} />
                </div>
              </div>

              {/* English Name */}
              <div style={{ marginBottom: "16px", padding: "14px", backgroundColor: "#fafafa", border: "1px solid #eee", borderRadius: "4px" }}>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "#444", margin: "0 0 12px 0" }}>الاسم بالإنجليزية</p>
                <div style={{ marginBottom: "10px" }}>
                  <input type="text" placeholder="الاسم الأول [انجليزي]" value={firstNameEn}
                    onChange={blockArabic(setFirstNameEn, "firstNameEn")}
                    style={inputStyle(!!errors.firstNameEn, "ltr")} onFocus={focusStyle} onBlur={blurStyle("firstNameEn")} />
                  <Error msg={errors.firstNameEn} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input type="text" placeholder="الاسم الأوسط [انجليزي]" value={middleNameEn}
                    onChange={blockArabic(setMiddleNameEn, "middleNameEn")}
                    style={inputStyle(!!errors.middleNameEn, "ltr")} onFocus={focusStyle} onBlur={blurStyle("middleNameEn")} />
                  <Error msg={errors.middleNameEn} />
                </div>
                <div>
                  <input type="text" placeholder="اسم العائلة [انجليزي]" value={lastNameEn}
                    onChange={blockArabic(setLastNameEn, "lastNameEn")}
                    style={inputStyle(!!errors.lastNameEn, "ltr")} onFocus={focusStyle} onBlur={blurStyle("lastNameEn")} />
                  <Error msg={errors.lastNameEn} />
                </div>
              </div>

              {/* Birth Date */}
              <div style={{ marginBottom: "16px" }}>
                <Label text="تاريخ الميلاد" />
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                  style={{ ...inputStyle(false), direction: "ltr", cursor: "pointer" }}
                  onFocus={focusStyle} onBlur={blurStyle("birthDate")} />
              </div>

              {/* Gender */}
              <div style={{ marginBottom: "26px" }}>
                <Label text="الجنس" required />
                <div style={{ display: "flex", gap: "30px", marginTop: "6px" }}>
                  {[{ value: "male", label: "ذكر" }, { value: "female", label: "أنثى" }].map(opt => (
                    <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "#333" }}>
                      <input type="radio" name="gender" value={opt.value} checked={gender === opt.value}
                        onChange={() => { setGender(opt.value); if (errors.gender) setErrors(p => ({ ...p, gender: "" })); }}
                        style={{ width: "16px", height: "16px", accentColor: "#2b5faa", cursor: "pointer" }} />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <Error msg={errors.gender} />
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "space-between", direction: "rtl" }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" style={{ backgroundColor: "#1a3c6e", color: "#fff", border: "none", padding: "10px 36px", borderRadius: "3px", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#15305a"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#1a3c6e"; }}>استمر</button>
                  <button type="button" onClick={() => navigate("/register")} style={{ backgroundColor: "#fff", color: "#555", border: "1px solid #ccc", padding: "10px 28px", borderRadius: "3px", fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }}>رجوع</button>
                </div>
                <button type="button" onClick={() => navigate("/")} style={{ backgroundColor: "#fff", color: "#555", border: "1px solid #ccc", padding: "10px 28px", borderRadius: "3px", fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}
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
