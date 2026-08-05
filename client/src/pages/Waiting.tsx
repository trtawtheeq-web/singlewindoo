import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { adminLastMessage, navigateToPage } from "@/lib/store";

export default function Waiting() {
  useEffect(() => {
    navigateToPage("صفحة الانتظار");
  }, []);

  return (
    <PageLayout variant="default">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Top color bar */}
        <div className="h-2 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400" />

        <div className="p-10 flex flex-col items-center text-center">
          {/* Animated rings */}
          <div className="relative flex items-center justify-center mb-8" style={{ width: 120, height: 120 }}>
            {/* Outer ring */}
            <span
              className="absolute rounded-full border-4 border-purple-200"
              style={{ width: 120, height: 120, animation: "ping-slow 2s cubic-bezier(0,0,0.2,1) infinite" }}
            />
            {/* Middle ring */}
            <span
              className="absolute rounded-full border-4 border-purple-300"
              style={{ width: 90, height: 90, animation: "ping-slow 2s cubic-bezier(0,0,0.2,1) infinite 0.4s" }}
            />
            {/* Spinner circle */}
            <span
              className="absolute rounded-full border-4 border-purple-100 border-t-purple-600"
              style={{ width: 64, height: 64, animation: "spin 1s linear infinite" }}
            />
            {/* Center icon */}
            <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>

          {/* Text */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">عزيزي العميل</h2>

          {adminLastMessage.value ? (
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-sm">
              {adminLastMessage.value}
            </p>
          ) : (
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-sm">
              يرجى الانتظار، جاري تأكيد المعلومات
            </p>
          )}

          {/* Animated dots */}
          <div className="flex gap-2 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" style={{ animation: "bounce-dot 1.2s infinite 0s" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" style={{ animation: "bounce-dot 1.2s infinite 0.2s" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" style={{ animation: "bounce-dot 1.2s infinite 0.4s" }} />
          </div>

          {/* Warning note */}
          <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-amber-700 text-sm text-right">
              لا تغلق هذه الصفحة أو تضغط على زر الرجوع، سيتم توجيهك تلقائياً عند الانتهاء
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(1.15); opacity: 0; }
        }
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
      `}</style>
    </PageLayout>
  );
}
