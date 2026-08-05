import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { adminLastMessage, navigateToPage } from "@/lib/store";

export default function Waiting() {
  // Emit page enter
  useEffect(() => {
    navigateToPage("صفحة الانتظار");
  }, []);

  return (
    <PageLayout variant="default">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">جاري المعالجة</h1>

        {adminLastMessage.value ? (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-center whitespace-pre-wrap">
              {adminLastMessage.value}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-base mb-6">
            يرجى الانتظار، جاري مصادقة بياناتك...
          </p>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            لا تغلق هذه الصفحة أو تضغط على زر الرجوع
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
