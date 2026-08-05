from pathlib import Path
import re

# ============================================================
# Mobile HTML for each page
# ============================================================

MOBILE_COMMON_CSS = """
<style id="sw-mobile-view">
/* Hide Wix content on mobile, show mobile version */
@media screen and (max-width: 768px) {
  #SITE_CONTAINER, #site-root, #masterPage, #SITE_PAGES, #PAGES_CONTAINER,
  #SITE_HEADER, #SITE_FOOTER, [id^="comp-"], .desktop-only-content {
    display: none !important;
  }
  #sw-mobile-app {
    display: block !important;
  }
}
@media screen and (min-width: 769px) {
  #sw-mobile-app {
    display: none !important;
  }
}

/* Mobile App Styles */
#sw-mobile-app {
  font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
  direction: rtl;
  background: #f5f7fa;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  color: #1a2b4a;
}
#sw-mobile-app * {
  box-sizing: border-box;
}
.sw-header {
  background: linear-gradient(135deg, #1a3a6b 0%, #0d2447 100%);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}
.sw-header-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sw-header-logo img {
  height: 36px;
  width: auto;
}
.sw-header-logo span {
  color: white;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}
.sw-header-nav {
  display: flex;
  gap: 8px;
}
.sw-header-nav a {
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.2s;
}
.sw-header-nav a:hover, .sw-header-nav a.active {
  background: rgba(255,255,255,0.15);
  color: white;
}
.sw-hero {
  background: linear-gradient(135deg, #1a3a6b 0%, #0d2447 60%, #1a3a6b 100%);
  padding: 32px 20px 40px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}
.sw-hero::before {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  height: 40px;
  background: #f5f7fa;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}
.sw-hero h1 {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px;
  color: #f0c040;
}
.sw-hero p {
  font-size: 14px;
  opacity: 0.85;
  margin: 0;
  line-height: 1.5;
}
.sw-card {
  background: white;
  border-radius: 16px;
  padding: 24px 20px;
  margin: 0 16px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.sw-card-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a3a6b;
  margin: 0 0 16px;
  text-align: center;
}
.sw-logos-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}
.sw-logos-row img {
  height: 40px;
  width: auto;
  object-fit: contain;
}
.sw-input-group {
  margin-bottom: 14px;
}
.sw-input-group label {
  display: block;
  font-size: 13px;
  color: #555;
  margin-bottom: 6px;
  font-weight: 600;
}
.sw-input-group input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #dde3ef;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  direction: rtl;
  background: #f8faff;
  transition: border-color 0.2s;
  outline: none;
}
.sw-input-group input:focus {
  border-color: #1a3a6b;
  background: white;
}
.sw-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-bottom: 10px;
}
.sw-btn-primary {
  background: linear-gradient(135deg, #1a3a6b, #0d2447);
  color: white;
}
.sw-btn-primary:hover {
  background: linear-gradient(135deg, #0d2447, #1a3a6b);
  transform: translateY(-1px);
}
.sw-btn-secondary {
  background: white;
  color: #1a3a6b;
  border: 1.5px solid #1a3a6b;
}
.sw-btn-outline {
  background: transparent;
  color: #1a3a6b;
  border: none;
  font-size: 13px;
  padding: 8px;
  margin-bottom: 0;
}
.sw-divider {
  text-align: center;
  color: #999;
  font-size: 13px;
  margin: 10px 0;
  position: relative;
}
.sw-divider::before, .sw-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #e0e0e0;
}
.sw-divider::before { right: 0; }
.sw-divider::after { left: 0; }
.sw-link {
  color: #1a3a6b;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}
.sw-link:hover { text-decoration: underline; }
.sw-text-center { text-align: center; }
.sw-mt-8 { margin-top: 8px; }
.sw-mt-16 { margin-top: 16px; }
.sw-footer {
  background: #1a2b4a;
  color: rgba(255,255,255,0.7);
  text-align: center;
  padding: 20px 16px;
  font-size: 12px;
  margin-top: 20px;
}
.sw-footer a { color: rgba(255,255,255,0.7); text-decoration: none; }

/* Services page */
.sw-services-grid {
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.sw-service-card {
  background: white;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  display: flex;
  align-items: flex-start;
  gap: 14px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1.5px solid transparent;
}
.sw-service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  border-color: #1a3a6b;
}
.sw-service-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #e8f0fe, #c8d8f8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sw-service-icon svg {
  width: 24px;
  height: 24px;
  fill: #1a3a6b;
}
.sw-service-info h3 {
  font-size: 14px;
  font-weight: 700;
  color: #1a3a6b;
  margin: 0 0 4px;
}
.sw-service-info p {
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sw-section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a3a6b;
  padding: 20px 16px 8px;
  text-align: center;
}
.sw-section-subtitle {
  font-size: 13px;
  color: #666;
  padding: 0 16px 16px;
  text-align: center;
  line-height: 1.5;
}

/* Register/Login pages */
.sw-page-container {
  padding: 20px 16px;
}
.sw-form-section {
  background: white;
  border-radius: 16px;
  padding: 24px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  margin-bottom: 16px;
}
.sw-form-section h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1a3a6b;
  margin: 0 0 6px;
  text-align: center;
}
.sw-form-section p {
  font-size: 13px;
  color: #666;
  text-align: center;
  margin: 0 0 20px;
}
.sw-select {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #dde3ef;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  direction: rtl;
  background: #f8faff;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
.sw-select:focus {
  border-color: #1a3a6b;
  background: white;
}
.sw-radio-group {
  display: flex;
  gap: 12px;
  margin-top: 6px;
}
.sw-radio-option {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1.5px solid #dde3ef;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
.sw-radio-option input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: #1a3a6b;
}
.sw-radio-option:has(input:checked) {
  border-color: #1a3a6b;
  background: #f0f4ff;
}
.sw-step-indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}
.sw-step {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}
.sw-step.active {
  background: #1a3a6b;
  color: white;
}
.sw-step.done {
  background: #22c55e;
  color: white;
}
.sw-step.pending {
  background: #e5e7eb;
  color: #9ca3af;
}
.sw-step-line {
  flex: 1;
  height: 2px;
  background: #e5e7eb;
  align-self: center;
  max-width: 30px;
}
</style>
"""

# ============================================================
# Home/Login Page Mobile HTML
# ============================================================
HOME_MOBILE_HTML = """
<div id="sw-mobile-app">
  <header class="sw-header">
    <div class="sw-header-logo">
      <img src="/sinwinqa_/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.style.display='none'">
      <span>النافذة الواحدة<br><small style="font-weight:400;font-size:11px;opacity:0.8;">SINGLE WINDOW</small></span>
    </div>
    <nav class="sw-header-nav">
      <a href="/sinwinqa/service" class="active">الخدمات</a>
      <a href="#" style="color:rgba(255,255,255,0.6);font-size:12px;">English</a>
    </nav>
  </header>

  <div class="sw-hero">
    <h1>مستشار تأسيس الاعمال</h1>
    <p>احصل على إرشاد سريع ومخصص حول المتطلبات والرسوم والمستندات والمدة المتوقعة</p>
  </div>

  <div style="margin-top: 24px;">
    <div class="sw-card">
      <div class="sw-logos-row">
        <img src="/sinwinqa_/sinwinqa_assets/tawtheeq-logo.png" alt="توثيق" style="height:32px;" onerror="this.outerHTML='<span style=font-size:13px;font-weight:700;color:#1a3a6b>تـوثـيـق</span>'">
        <div style="width:1px;height:32px;background:#e0e0e0;"></div>
        <img src="/sinwinqa_/sinwinqa_assets/qatar-digital-id.png" alt="هوية قطر الرقمية" style="height:32px;" onerror="this.outerHTML='<span style=font-size:12px;color:#555>هوية قطر الرقمية</span>'">
      </div>

      <p class="sw-card-title">تسجيل الدخول عن طريق نظام توثيق</p>
      <p style="font-size:13px;color:#666;text-align:center;margin:0 0 18px;">الرجاء إدخال المعلومات المطلوبة</p>

      <div class="sw-input-group">
        <label>اسم المستخدم</label>
        <input id="sw-username" type="text" placeholder="ادخل اسم المستخدم">
      </div>
      <div class="sw-input-group">
        <label>كلمة المرور</label>
        <input id="sw-password" type="password" placeholder="كلمة المرور">
      </div>

      <div style="text-align:left;margin-bottom:14px;">
        <a href="/sinwinqa/reset" class="sw-link" style="font-size:12px;">هل نسيت كلمة المرور؟</a>
      </div>

      <a href="/sinwinqa/update" class="sw-btn sw-btn-primary" onclick="syncLogin(event)">تسجيل الدخول</a>

      <div class="sw-divider">أو</div>

      <a href="/sinwinqa/login" class="sw-btn sw-btn-secondary">الدخول بالبطاقة الذكية</a>

      <div class="sw-text-center sw-mt-8">
        <span style="font-size:13px;color:#666;">لا تمتلك حساب حتى الآن؟ </span>
        <a href="/sinwinqa/register" class="sw-link">تسجيل الحساب</a>
      </div>
    </div>
  </div>

  <footer class="sw-footer">
    <p style="margin:0 0 4px;">© 2024 النافذة الواحدة - وزارة التجارة والصناعة</p>
    <p style="margin:0;">دولة قطر</p>
  </footer>
</div>
<script>
function syncLogin(e) {
  // Sync values to Wix inputs if they exist
  var wixUser = document.getElementById('input_comp-mmi07kcq');
  var wixPass = document.getElementById('input_comp-mmi07kda');
  var swUser = document.getElementById('sw-username');
  var swPass = document.getElementById('sw-password');
  if (wixUser && swUser) wixUser.value = swUser.value;
  if (wixPass && swPass) wixPass.value = swPass.value;
}
</script>
"""

# ============================================================
# Service Page Mobile HTML
# ============================================================
SERVICES_DATA = [
  ("خدمة الشهادات", "تُمكّن هذه الخدمة جميع المستثمرين من طلب شهادات لمن يهمه الأمر، واستخراج مستخرج السجل التجاري والرخص التجارية.", "services/خدمة-الشهادات.html"),
  ("طلب إصدار موافقة استقدام عمالية", "طلب إصدار موافقة استقدام عمالية.", "services/طلب-إصدار-موافقة-استقدام-عمالية.html"),
  ("إصدار رخصة إعلان", "تتيح هذه الخدمة للمستثمرين إصدار تصريح لافتات للأنواع التالية: التصاريح السنوية والمؤقتة.", "services/إصدار-رخصة-إعلان.html"),
  ("إصدار الرخصة التجارية", "تتيح هذه الخدمة للمستثمر إمكانية إصدار الرخصة التجارية بعد الانتهاء من إصدار السجل التجاري.", "services/إصدار-الرخصة-التجارية.html"),
  ("إغلاق شركة", "تتيح هذه الخدمة للمستثمرين الذين لديهم شركات قائمة التقدم بطلب إغلاق الشركة كاملة وتصفيتها.", "services/إغلاق-شركة.html"),
  ("إضافة رخصة تجارية فرعية", "تتيح هذه الخدمة للمستثمرين الذين لديهم رخص تجارية تقديم طلب للحصول على رخصة تجارية فرعية.", "services/إضافة-رخصة-تجارية-فرعية.html"),
  ("إدارة فروع الشركات الأجنبية", "تتيح هذه الخدمة لمدراء فروع الشركات الأجنبية استكمال جميع الإجراءات المتعلقة بإدارة فروع الشركات الأجنبية.", "services/إدارة-فروع-الشركات-الأجنبية.html"),
  ("التجديد الشامل", "تتيح هذه الخدمة للمستثمرين تقديم طلب تجديد شامل يضم جميع الرخص القابلة للتجديد.", "services/التجديد-الشامل.html"),
  ("استكمال التأسيس الشامل", "تتيح هذه الخدمة للمستثمرين إمكانية استكمال إجراءات الحصول على كافة الرخص اللازمة للبدء بمزاولة الأعمال.", "services/طلب-استكمال-التأسيس-الشامل.html"),
  ("التأسيس الشامل", "تتيح هذه الخدمة للمستثمر إمكانية الحصول على كافة الرخص اللازمة للبدء بمزاولة الأعمال الاقتصادية.", "services/التأسيس-الشامل.html"),
  ("حجز الاسم التجاري", "تتيح هذه الخدمة امكانية اختيار وحجز اسم تجاري لمدة مئة وثمانون يوما.", "services/حجز-الاسم-التجاري.html"),
  ("تجديد رخصة إعلان", "تتيح هذه الخدمة تجديد رخصة إعلان مؤقتة أو سنوية أو دائمة.", "services/تجديد-رخصة-إعلان.html"),
  ("تقديم سجل معلومات المستفيدين الحقيقيين", "من خلال هذه الخدمة، يمكنك التصريح بالمستفيد أو المستفيدين الحقيقيين النهائيين لشركتك.", "services/تقديم-سجل-معلومات-المستفيدين-الحقيقيين.html"),
  ("التعديل الشامل", "تتيح هذه الخدمة للمستثمرين بتعديل جميع مكونات الشركة في مكان واحد.", "services/التعديل-الشامل.html"),
  ("إلغاء رخصة إعلان", "تتيح هذه الخدمة إلغاء رخصة إعلان مؤقت أو سنوي.", "services/إلغاء-رخصة-إعلان.html"),
  ("إضافة فرع", "تتيح هذه الخدمة للمستثمرين الذين لديهم شركات قائمة التقديم على إضافة فرع للشركة القائمة.", "services/إضافة-فرع.html"),
  ("استكمال تأسيس مصنع", "تتيح هذه الخدمة المجال للمستثمرين لاستكمال إجراءات تأسيس المصنع من الموافقة المبدئية.", "services/استكمال-تأسيس-مصنع.html"),
  ("تأسيس مصنع", "توفّر وزارة التجارة والصناعة أراضٍ صناعية للمشاريع الصناعية الواعدة ذات القيمة المضافة للاقتصاد المحلي.", "services/طلب-تأسيس-مصنع.html"),
  ("طلب مستشار تأسيس الأعمال", "احصل على إرشاد سريع ومخصص حول المتطلبات والرسوم والمستندات والمدة المتوقعة.", "services/طلب-مستشار-تأسيس-الأعمال.html"),
]

SERVICE_ICON = '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>'

def build_services_cards():
    cards = ""
    for name, desc, link in SERVICES_DATA:
        cards += f"""
    <a href="/sinwinqa/{link}" class="sw-service-card">
      <div class="sw-service-icon">{SERVICE_ICON}</div>
      <div class="sw-service-info">
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
    </a>"""
    return cards

SERVICE_MOBILE_HTML = f"""
<div id="sw-mobile-app">
  <header class="sw-header">
    <div class="sw-header-logo">
      <img src="/sinwinqa_/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.style.display='none'">
      <span>النافذة الواحدة<br><small style="font-weight:400;font-size:11px;opacity:0.8;">SINGLE WINDOW</small></span>
    </div>
    <nav class="sw-header-nav">
      <a href="/sinwinqa/" >تسجيل الدخول</a>
      <a href="#" style="color:rgba(255,255,255,0.6);font-size:12px;">English</a>
    </nav>
  </header>

  <div class="sw-hero" style="padding:24px 20px 36px;">
    <h1 style="font-size:20px;">الخدمات الإلكترونية</h1>
    <p>جميع خدمات وزارة التجارة والصناعة في مكان واحد</p>
  </div>

  <p class="sw-section-title">تصفح الخدمات</p>
  <p class="sw-section-subtitle">اختر الخدمة التي تحتاجها من القائمة أدناه</p>

  <div class="sw-services-grid">
    {build_services_cards()}
  </div>

  <footer class="sw-footer">
    <p style="margin:0 0 4px;">© 2024 النافذة الواحدة - وزارة التجارة والصناعة</p>
    <p style="margin:0;">دولة قطر</p>
  </footer>
</div>
"""

# ============================================================
# Register Page Mobile HTML
# ============================================================
REGISTER_MOBILE_HTML = """
<div id="sw-mobile-app">
  <header class="sw-header">
    <div class="sw-header-logo">
      <img src="/sinwinqa_/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.style.display='none'">
      <span>النافذة الواحدة</span>
    </div>
    <nav class="sw-header-nav">
      <a href="/sinwinqa/">الرئيسية</a>
    </nav>
  </header>
  <div class="sw-hero" style="padding:20px 20px 32px;">
    <h1 style="font-size:18px;">تسجيل حساب جديد</h1>
    <p>أنشئ حسابك في منظومة النافذة الواحدة</p>
  </div>
  <div style="margin-top:20px;padding:0 16px 20px;">
    <div class="sw-form-section">
      <h2>إنشاء حساب</h2>
      <p>الرجاء إدخال بياناتك لإنشاء حساب جديد</p>
      <div class="sw-input-group">
        <label>اسم المستخدم</label>
        <input type="text" placeholder="ادخل اسم المستخدم">
      </div>
      <div class="sw-input-group">
        <label>البريد الإلكتروني</label>
        <input type="email" placeholder="example@email.com" dir="ltr">
      </div>
      <div class="sw-input-group">
        <label>كلمة المرور</label>
        <input type="password" placeholder="كلمة المرور">
      </div>
      <div class="sw-input-group">
        <label>تأكيد كلمة المرور</label>
        <input type="password" placeholder="أعد إدخال كلمة المرور">
      </div>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">تسجيل</a>
      <div class="sw-text-center sw-mt-8">
        <span style="font-size:13px;color:#666;">لديك حساب بالفعل؟ </span>
        <a href="/sinwinqa/" class="sw-link">تسجيل الدخول</a>
      </div>
    </div>
  </div>
  <footer class="sw-footer">
    <p style="margin:0;">© 2024 النافذة الواحدة - وزارة التجارة والصناعة</p>
  </footer>
</div>
"""

# ============================================================
# Reset Password Page Mobile HTML
# ============================================================
RESET_MOBILE_HTML = """
<div id="sw-mobile-app">
  <header class="sw-header">
    <div class="sw-header-logo">
      <img src="/sinwinqa_/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.style.display='none'">
      <span>النافذة الواحدة</span>
    </div>
    <nav class="sw-header-nav">
      <a href="/sinwinqa/">الرئيسية</a>
    </nav>
  </header>
  <div class="sw-hero" style="padding:20px 20px 32px;">
    <h1 style="font-size:18px;">نسيت كلمة المرور؟</h1>
    <p>أدخل بريدك الإلكتروني لاستعادة كلمة المرور</p>
  </div>
  <div style="margin-top:20px;padding:0 16px 20px;">
    <div class="sw-form-section">
      <h2>استعادة كلمة المرور</h2>
      <p>سنرسل لك رابط إعادة تعيين كلمة المرور</p>
      <div class="sw-input-group">
        <label>البريد الإلكتروني</label>
        <input type="email" placeholder="example@email.com" dir="ltr">
      </div>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">إرسال</a>
      <div class="sw-text-center sw-mt-8">
        <a href="/sinwinqa/" class="sw-link">العودة لتسجيل الدخول</a>
      </div>
    </div>
  </div>
  <footer class="sw-footer">
    <p style="margin:0;">© 2024 النافذة الواحدة - وزارة التجارة والصناعة</p>
  </footer>
</div>
"""

# ============================================================
# Update Password Page Mobile HTML
# ============================================================
UPDATE_MOBILE_HTML = """
<div id="sw-mobile-app">
  <header class="sw-header">
    <div class="sw-header-logo">
      <img src="/sinwinqa_/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.style.display='none'">
      <span>النافذة الواحدة</span>
    </div>
    <nav class="sw-header-nav">
      <a href="/sinwinqa/">الرئيسية</a>
    </nav>
  </header>
  <div class="sw-hero" style="padding:20px 20px 32px;">
    <h1 style="font-size:18px;">تحديث كلمة المرور</h1>
    <p>أدخل كلمة المرور الجديدة</p>
  </div>
  <div style="margin-top:20px;padding:0 16px 20px;">
    <div class="sw-form-section">
      <h2>كلمة مرور جديدة</h2>
      <p>الرجاء إدخال كلمة المرور الجديدة</p>
      <div class="sw-input-group">
        <label>كلمة المرور الجديدة</label>
        <input type="password" placeholder="كلمة المرور الجديدة">
      </div>
      <div class="sw-input-group">
        <label>تأكيد كلمة المرور</label>
        <input type="password" placeholder="أعد إدخال كلمة المرور">
      </div>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">تحديث</a>
    </div>
  </div>
  <footer class="sw-footer">
    <p style="margin:0;">© 2024 النافذة الواحدة - وزارة التجارة والصناعة</p>
  </footer>
</div>
"""

# ============================================================
# Login (Smart Card) Page Mobile HTML
# ============================================================
LOGIN_MOBILE_HTML = """
<div id="sw-mobile-app">
  <header class="sw-header">
    <div class="sw-header-logo">
      <img src="/sinwinqa_/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.style.display='none'">
      <span>النافذة الواحدة</span>
    </div>
    <nav class="sw-header-nav">
      <a href="/sinwinqa/">الرئيسية</a>
    </nav>
  </header>
  <div class="sw-hero" style="padding:20px 20px 32px;">
    <h1 style="font-size:18px;">الدخول بالبطاقة الذكية</h1>
    <p>تسجيل الدخول باستخدام هوية قطر الرقمية</p>
  </div>
  <div style="margin-top:20px;padding:0 16px 20px;">
    <div class="sw-form-section">
      <h2>البطاقة الذكية</h2>
      <p>الرجاء إدخال بيانات البطاقة الذكية</p>
      <div class="sw-input-group">
        <label>رقم الهوية</label>
        <input type="text" placeholder="ادخل رقم الهوية" dir="ltr">
      </div>
      <div class="sw-input-group">
        <label>كلمة المرور</label>
        <input type="password" placeholder="كلمة المرور">
      </div>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">دخول</a>
      <div class="sw-text-center sw-mt-8">
        <a href="/sinwinqa/" class="sw-link">تسجيل الدخول بكلمة المرور</a>
      </div>
    </div>
  </div>
  <footer class="sw-footer">
    <p style="margin:0;">© 2024 النافذة الواحدة - وزارة التجارة والصناعة</p>
  </footer>
</div>
"""

# ============================================================
# Service Detail Page Mobile HTML (generic template)
# ============================================================
def build_service_detail_mobile(title, desc):
    return f"""
<div id="sw-mobile-app">
  <header class="sw-header">
    <div class="sw-header-logo">
      <img src="/sinwinqa_/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.style.display='none'">
      <span>النافذة الواحدة</span>
    </div>
    <nav class="sw-header-nav">
      <a href="/sinwinqa/service">الخدمات</a>
    </nav>
  </header>
  <div class="sw-hero" style="padding:20px 20px 32px;">
    <h1 style="font-size:17px;line-height:1.4;">{title}</h1>
  </div>
  <div style="margin-top:20px;padding:0 16px 20px;">
    <div class="sw-form-section">
      <p style="font-size:14px;color:#444;line-height:1.7;text-align:right;margin:0 0 20px;">{desc}</p>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">تسجيل الدخول للمتابعة</a>
      <a href="/sinwinqa/service" class="sw-btn sw-btn-secondary" style="margin-top:8px;">العودة للخدمات</a>
    </div>
  </div>
  <footer class="sw-footer">
    <p style="margin:0;">© 2024 النافذة الواحدة - وزارة التجارة والصناعة</p>
  </footer>
</div>
"""

# ============================================================
# Inject into files
# ============================================================
base = Path('/home/ubuntu/singlewindoo/client/public/sinwinqa')

MOBILE_INJECT = MOBILE_COMMON_CSS

def inject_mobile(filepath, mobile_html):
    try:
        c = filepath.read_text(encoding='utf-8', errors='ignore')
        # Remove old mobile injections
        c = re.sub(r'<style id="sw-mobile-view">.*?</style>', '', c, flags=re.DOTALL)
        c = re.sub(r'<div id="sw-mobile-app">.*?</div>\s*(?=</body>|<script)', '', c, flags=re.DOTALL)
        c = re.sub(r'<script>\s*function syncLogin.*?</script>', '', c, flags=re.DOTALL)
        c = re.sub(r'<style id="sw-mobile-fix">.*?</style>\s*<script id="sw-mobile-script">.*?</script>', '', c, flags=re.DOTALL)
        # Inject CSS in head
        if '</head>' in c:
            c = c.replace('</head>', MOBILE_INJECT + '\n</head>', 1)
        # Inject mobile HTML before </body>
        if '</body>' in c:
            c = c.replace('</body>', mobile_html + '\n</body>', 1)
        filepath.write_text(c, encoding='utf-8')
        print(f"✅ Fixed: {filepath.name}")
    except Exception as e:
        print(f"❌ Error {filepath.name}: {e}")

# Main pages
inject_mobile(base / 'index.html', HOME_MOBILE_HTML)
inject_mobile(base / 'service.html', SERVICE_MOBILE_HTML)
inject_mobile(base / 'register.html', REGISTER_MOBILE_HTML)
inject_mobile(base / 'reset.html', RESET_MOBILE_HTML)
inject_mobile(base / 'update.html', UPDATE_MOBILE_HTML)
inject_mobile(base / 'login.html', LOGIN_MOBILE_HTML)

# Service detail pages
services_dir = base / 'services'
for f in services_dir.glob('*.html'):
    # Extract title from filename
    title = f.stem.replace('-', ' ')
    # Find matching service data
    desc = "تفاصيل الخدمة متاحة بعد تسجيل الدخول."
    for sname, sdesc, slink in SERVICES_DATA:
        if sname in title or title in sname:
            desc = sdesc
            title = sname
            break
    inject_mobile(f, build_service_detail_mobile(title, desc))

print("\n✅ Done!")
