import { useLocation } from "wouter";

export default function RegisterBill() {
  const [, navigate] = useLocation();

  const steps = [
    { num: 1, label: "نوع الحساب", active: false },
    { num: 2, label: "البيانات الشخصية", active: false },
    { num: 3, label: "كلمة المرور", active: false },
    { num: 4, label: "انتهاء التسجيل", active: true },
  ];

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

          {/* Card */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #e5e5e5", borderRadius: "4px", padding: "28px 36px 32px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#333", margin: "0 0 16px 0", paddingBottom: "14px", borderBottom: "1px solid #eee", textAlign: "right" }}>ربط الحساب</h2>

            <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.8", marginBottom: "20px", textAlign: "right" }}>
              سيتم استيفاء مبلغ (10 ر.ق) بدل رسوم تفعيل وتنشيط الحساب لإتمام عملية التسجيل في نظام التوثيق الوطني ( توثيق ) للاستفادة من المزايا المقدمة من خدمات نظام التوثيق الوطني :
            </p>

            <p style={{ fontSize: "14px", fontWeight: "700", color: "#333", marginBottom: "12px", textAlign: "right" }}>وتتمتع خدمة التوثيق الوطني بالمزايا التالية:</p>

            <ul style={{ fontSize: "14px", color: "#444", lineHeight: "2", paddingRight: "20px", marginBottom: "28px", textAlign: "right" }}>
              <li>تسهيل ربط الجهات الحكومية بالخدمة من خلال إجراءات مبسطة.</li>
              <li>تأمين استخدام الخدمات الإلكترونية والعمليات من قبل المستخدمين.</li>
              <li>توفير توثيق متعدد المستويات باستخدام (البطاقة الذكية/ كلمة السر أو كلمة المرور/ البريد الإلكتروني للزائرين أو ذوي الإقامة المؤقتة القصيرة).</li>
              <li>ضمان تسجيل الدخول الموحد للحساب، مما يسهل تجربة العميل عند إتمام أي خدمة أو معاملة إلكترونية.</li>
            </ul>

            {/* Payment Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px", margin: "0 auto" }}>
              <button
                onClick={() => navigate("/knet-payment")}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "14px 20px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#fff", cursor: "pointer", fontSize: "15px", fontWeight: "600", color: "#333", fontFamily: "inherit" }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f9f9f9"; e.currentTarget.style.borderColor = "#bbb"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.borderColor = "#ddd"; }}
              >
                <svg viewBox="0 0 80 30" style={{ height: "24px", width: "64px" }}>
                  <rect width="80" height="30" rx="4" fill="#8B0000"/>
                  <text x="40" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">QPAY</text>
                </svg>
                QPAY
              </button>

              <button
                onClick={() => navigate("/credit-card-payment")}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "14px 20px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#fff", cursor: "pointer", fontSize: "15px", fontWeight: "600", color: "#333", fontFamily: "inherit" }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f9f9f9"; e.currentTarget.style.borderColor = "#bbb"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.borderColor = "#ddd"; }}
              >
                <svg viewBox="0 0 60 40" style={{ height: "28px", width: "42px" }}>
                  <circle cx="22" cy="20" r="14" fill="#EB001B"/>
                  <circle cx="38" cy="20" r="14" fill="#F79E1B"/>
                  <path d="M30 8.5a14 14 0 0 1 0 23A14 14 0 0 1 30 8.5z" fill="#FF5F00"/>
                </svg>
                <svg viewBox="0 0 60 20" style={{ height: "16px", width: "48px" }}>
                  <text x="0" y="16" fill="#1A1F71" fontSize="16" fontWeight="bold" fontFamily="Arial" fontStyle="italic">VISA</text>
                </svg>
              </button>
            </div>
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
