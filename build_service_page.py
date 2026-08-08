"""بناء صفحة الخدمات المطابقة للأصلي باستخدام SVG الأيقونات الأصلية"""
import json
from pathlib import Path

# Read the icons JSON
with open('/home/ubuntu/Downloads/service-icons.json', 'r', encoding='utf-8') as f:
    icons = json.load(f)

print(f"Loaded {len(icons)} icons")

# Service data - name, description, link (English slug)
SERVICES = [
    {
        "name": "خدمة الشهادات",
        "desc": "تُمكّن هذه الخدمة جميع المستثمرين من طلب شهادات لمن يهمه الأمر، واستخراج مستخرج السجل التجاري والرخص التجارية صادرة من وزارة التجارة والصناعة.",
        "link": "/services/certificates"
    },
    {
        "name": "طلب إصدار موافقة استقدام عمالية",
        "desc": "طلب إصدار موافقة استقدام عمالية",
        "link": "/services/labor-recruitment-approval"
    },
    {
        "name": "إصدار رخصة إعلان",
        "desc": "تتيح هذه الخدمة للمستثمرين إصدار تصريح لافتات للأنواع التالية: التصاريح السنوية والمؤقتة.",
        "link": "/services/advertisement-license"
    },
    {
        "name": "إصدار الرخصة التجارية",
        "desc": "تتيح هذه الخدمة للمستثمر إمكانية إصدار الرخصة التجارية بعد الانتهاء من إصدار السجل التجاري.",
        "link": "/services/commercial-license"
    },
    {
        "name": "إغلاق شركة",
        "desc": "تتيح هذه الخدمة للمستثمرين الذين لديهم شركات قائمة التقدم بطلب إغلاق الشركة كاملة وتصفيتها، أو إغلاق فرع أو أكثر من فروعها وما يتبعها من رخص تجارية.",
        "link": "/services/close-company"
    },
    {
        "name": "إضافة رخصة تجارية فرعية",
        "desc": "تتيح هذه الخدمة للمستثمرين الذين لديهم رخص تجارية تقديم طلب للحصول على رخصة تجارية فرعية لكي يتسنى لهم ممارسة أنشطة خاصة، مثل الصراف الآلي، والمخزن، وأجهزة الخدمة الذاتية.",
        "link": "/services/add-sub-commercial-license"
    },
    {
        "name": "إدارة فروع الشركات الأجنبية",
        "desc": "تتيح هذه الخدمة لمدراء فروع الشركات الأجنبية استكمال جميع الإجراءات المتعلقة بإدارة فروع الشركات الأجنبية (إضافة، تعديل، تمديد، تجديد، إلغاء العقود).",
        "link": "/services/manage-foreign-branches"
    },
    {
        "name": "التجديد الشامل",
        "desc": "تتيح هذه الخدمة للمستثمرين تقديم طلب تجديد شامل يضم جميع الرخص القابلة للتجديد (سجل تجاري - رخصة تجارية - قيد منشأة - أي رخصة نوعية) التي تملكها المنشأة.",
        "link": "/services/comprehensive-renewal"
    },
    {
        "name": "استكمال التأسيس الشامل",
        "desc": "تتيح هذه الخدمة للمستثمرين إمكانية استكمال إجراءات الحصول على كافة الرخص اللازمة للبدء بمزاولة الأعمال الاقتصادية استناداً لأحد الأسماء التجارية التي تم حفظها من قبل.",
        "link": "/services/complete-comprehensive-establishment"
    },
    {
        "name": "التأسيس الشامل",
        "desc": "تتيح هذه الخدمة للمستثمر إمكانية الحصول على كافة الرخص اللازمة للبدء بمزاولة الأعمال الاقتصادية، وذلك وفقًا للشكل القانوني للشركة المراد تأسيسها.",
        "link": "/services/comprehensive-establishment"
    },
    {
        "name": "حجز الاسم التجاري",
        "desc": "تتيح هذه الخدمة امكانية اختيار وحجز اسم تجاري لمدة مئة وثمانون يوماً.",
        "link": "/services/trade-name-reservation"
    },
    {
        "name": "تجديد رخصة إعلان",
        "desc": "تتيح هذه الخدمة تجديد رخصة إعلان مؤقتة أو سنوية أو دائمة.",
        "link": "/services/renew-advertisement-license"
    },
    {
        "name": "تقديم سجل معلومات المستفيدين الحقيقيين",
        "desc": "من خلال هذه الخدمة، يمكنك التصريح بالمستفيد أو المستفيدين الحقيقيين النهائيين لشركتك، أو تعديل أو حذف أي مستفيد حقيقي نهائي.",
        "link": "/services/beneficial-owners-register"
    },
    {
        "name": "التعديل الشامل",
        "desc": "تتيح هذه الخدمة للمستثمرين بتعديل جميع مكونات الشركة في مكان واحد.",
        "link": "/services/comprehensive-modification"
    },
    {
        "name": "إلغاء رخصة إعلان",
        "desc": "تتيح هذه الخدمة إلغاء رخصة إعلان مؤقت أو سنوي.",
        "link": "/services/cancel-advertisement-license"
    },
    {
        "name": "إضافة فرع",
        "desc": "تتيح هذه الخدمة للمستثمرين الذين لديهم شركات قائمة التقديم على إضافة فرع للشركة القائمة وتحديد الأنشطة التي سيتم مزاولتها في الفرع الجديد.",
        "link": "/services/add-branch"
    },
    {
        "name": "استكمال تأسيس مصنع",
        "desc": "تتيح هذه الخدمة المجال للمستثمرين، الذين بدأوا إجراءات تأسيس مصانعهم خارج نطاق نظام النافذة الواحدة، لاستكمال إجراءات تأسيس المصنع من الموافقة المبدئية لمشروع صناعي، وتخصيص الأرض، والتصريح البيئي، والرخصة الصناعية داخل نظام النافذة الواحدة.",
        "link": "/services/complete-factory-establishment"
    },
    {
        "name": "تأسيس مصنع",
        "desc": "توفّر وزارة التجارة والصناعة أراضٍ صناعية للمشاريع الصناعية الواعدة ذات القيمة المضافة للاقتصاد المحلي بمساحات مختلفة لإقامة مصانع عليها، بينما يقوم بنك قطر للتنمية بتمويل تلك المشاريع الصناعية.",
        "link": "/services/factory-establishment"
    },
    {
        "name": "طلب مستشار تأسيس الأعمال",
        "desc": "احصل على إرشاد سريع ومخصص حول المتطلبات والرسوم والمستندات والمدة المتوقعة قبل تقديم طلب التأسيس الرسمي.",
        "link": "/services/business-establishment-advisor"
    },
]

# Build service cards HTML
cards_html = []
for i, service in enumerate(SERVICES):
    icon_svg = icons[i] if i < len(icons) else icons[0]
    # Fix clip-path IDs to be unique per card
    icon_svg = icon_svg.replace('id="', f'id="s{i}_').replace('url(#', f'url(#s{i}_')
    
    card = f'''    <a href="{service['link']}" class="service-card">
      <div class="card-inner">
        <div class="card-icon">
          {icon_svg}
        </div>
        <div class="card-content">
          <h3 class="card-title">{service['name']}</h3>
          <p class="card-desc">{service['desc']}</p>
        </div>
      </div>
    </a>'''
    cards_html.append(card)

cards_str = '\n'.join(cards_html)

# Build full HTML
html = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الخدمات | النافذة الواحدة</title>
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      font-family: 'Helvetica Neue', Arial, 'Segoe UI', sans-serif;
      background: #f5f5f5;
      direction: rtl;
      color: #333;
    }}

    /* Header */
    .header {{
      background: #fff;
      border-bottom: 1px solid #e8e8e8;
      padding: 0 40px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }}
    .header-logo {{
      display: flex;
      align-items: center;
      text-decoration: none;
    }}
    .header-logo img {{
      height: 44px;
      width: auto;
    }}
    .header-nav {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}
    .btn-services {{
      background: #1a4f8a;
      color: #fff;
      border: none;
      padding: 8px 22px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }}
    .btn-login {{
      color: #333;
      text-decoration: none;
      font-size: 14px;
      border: 1px solid #ccc;
      padding: 7px 18px;
      border-radius: 20px;
    }}
    .lang-btn {{
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #555;
      text-decoration: none;
    }}

    /* Main */
    .main {{
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px 60px;
    }}

    /* Services Grid */
    .services-grid {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }}

    /* Service Card */
    .service-card {{
      background: #fff;
      border-radius: 8px;
      padding: 24px 20px;
      text-decoration: none;
      color: inherit;
      transition: box-shadow 0.2s, transform 0.15s;
      border: 1px solid #eee;
      display: block;
    }}
    .service-card:hover {{
      box-shadow: 0 4px 20px rgba(0,0,0,0.12);
      transform: translateY(-2px);
    }}
    .card-inner {{
      display: flex;
      align-items: flex-start;
      gap: 16px;
      direction: ltr;
    }}
    .card-icon {{
      flex-shrink: 0;
      width: 80px;
      height: 92px;
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .card-icon svg {{
      width: 80px;
      height: 92px;
    }}
    .card-content {{
      flex: 1;
      direction: rtl;
      text-align: right;
    }}
    .card-title {{
      font-size: 17px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 10px;
      line-height: 1.4;
    }}
    .card-desc {{
      font-size: 13px;
      color: #666;
      line-height: 1.7;
    }}

    /* Footer */
    .footer {{
      background: #1a2a4a;
      color: #fff;
      padding: 36px 40px;
      text-align: center;
    }}
    .footer-logo {{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }}
    .footer-logo img {{
      height: 44px;
      filter: brightness(0) invert(1);
    }}
    .footer-social {{
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 16px;
    }}
    .footer-social a {{
      color: #fff;
      font-size: 14px;
      text-decoration: none;
      width: 36px;
      height: 36px;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .footer-copy {{
      font-size: 12px;
      color: rgba(255,255,255,0.6);
    }}

    /* Responsive */
    @media (max-width: 768px) {{
      .header {{ padding: 0 16px; height: 56px; }}
      .header-logo img {{ height: 36px; }}
      .btn-login {{ display: none; }}
      .main {{ padding: 16px 12px 40px; }}
      .services-grid {{ grid-template-columns: 1fr; gap: 12px; }}
      .service-card {{ padding: 16px 14px; }}
      .card-icon {{ width: 64px; height: 74px; }}
      .card-icon svg {{ width: 64px; height: 74px; }}
      .card-title {{ font-size: 15px; }}
      .card-desc {{ font-size: 12px; }}
    }}
  </style>
</head>
<body>

<!-- Header -->
<header class="header">
  <a href="/" class="header-logo">
    <img src="/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.src='/logo.svg'">
  </a>
  <nav class="header-nav">
    <a href="/service" class="btn-services">الخدمات</a>
    <a href="/" class="btn-login">تسجيل الدخول</a>
    <a href="#" class="lang-btn">English 🇶🇦</a>
  </nav>
</header>

<!-- Main -->
<main class="main">
  <div class="services-grid">
{cards_str}
  </div>
</main>

<!-- Footer -->
<footer class="footer">
  <div class="footer-logo">
    <img src="/sinwinqa_assets/f9b6577f_qjka_png" alt="النافذة الواحدة" onerror="this.src='/logo.svg'">
  </div>
  <div class="footer-social">
    <a href="#" title="Facebook">f</a>
    <a href="#" title="Instagram">◎</a>
    <a href="#" title="Twitter">𝕏</a>
    <a href="#" title="YouTube">▶</a>
    <a href="#" title="LinkedIn">in</a>
  </div>
  <p class="footer-copy">© جميع الحقوق محفوظة 2026</p>
</footer>

<!-- Tracker -->
<script src="/tracker.js"></script>
</body>
</html>'''

# Write to file
output = Path('/home/ubuntu/singlewindoo/client/public/sw-service.html')
output.write_text(html, encoding='utf-8')
print(f"✅ Written {len(html)} chars to sw-service.html")
print(f"Services: {len(SERVICES)}, Icons: {len(icons)}")
