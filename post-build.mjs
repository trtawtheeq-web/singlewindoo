import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');
const SRC = join(__dirname, 'client/public/sinwinqa');
const ASSETS_SRC = join(__dirname, 'client/public/sinwinqa_assets');
const ASSETS_DIST = join(DIST, 'sinwinqa_assets');

// خريطة الأسماء العربية -> الإنجليزية
const PAGE_MAP = {
  'index.html':    { dist: 'index.html',    path: '/' },
  'service.html':  { dist: 'sw-service.html', path: '/service' },
  'register.html': { dist: 'sw-register.html', path: '/register' },
  'reset.html':    { dist: 'sw-reset.html',    path: '/reset' },
  'update.html':   { dist: 'sw-update.html',   path: '/update' },
  'login.html':    { dist: 'sw-login.html',    path: '/login' },
};

const SERVICES_MAP = {
  'خدمة-الشهادات.html':                              'sw-s-certificates.html',
  'طلب-إصدار-موافقة-استقدام-عمالية.html':            'sw-s-labor-approval.html',
  'إصدار-رخصة-إعلان.html':                           'sw-s-ad-license.html',
  'إصدار-الرخصة-التجارية.html':                      'sw-s-commercial-license.html',
  'إغلاق-شركة.html':                                 'sw-s-close-company.html',
  'إضافة-رخصة-تجارية-فرعية.html':                   'sw-s-sub-commercial.html',
  'إدارة-فروع-الشركات-الأجنبية.html':               'sw-s-foreign-branches.html',
  'التجديد-الشامل.html':                             'sw-s-full-renewal.html',
  'طلب-استكمال-التأسيس-الشامل.html':                'sw-s-complete-founding.html',
  'التأسيس-الشامل.html':                             'sw-s-full-founding.html',
  'حجز-الاسم-التجاري.html':                          'sw-s-trade-name.html',
  'تجديد-رخصة-إعلان.html':                          'sw-s-renew-ad-license.html',
  'تقديم-سجل-معلومات-المستفيدين-الحقيقيين.html':    'sw-s-beneficiaries.html',
  'التعديل-الشامل.html':                             'sw-s-full-modification.html',
  'إلغاء-رخصة-إعلان.html':                          'sw-s-cancel-ad-license.html',
  'إضافة-فرع.html':                                  'sw-s-add-branch.html',
  'استكمال-تأسيس-مصنع.html':                        'sw-s-complete-factory.html',
  'طلب-تأسيس-مصنع.html':                            'sw-s-factory-founding.html',
  'طلب-مستشار-تأسيس-الأعمال.html':                  'sw-s-business-advisor.html',
};

function fixAssetPaths(html) {
  // إصلاح مسارات الأصول
  return html
    .replace(/\/sinwinqa_assets\//g, '/sinwinqa_assets/')
    .replace(/assets\//g, '/sinwinqa_assets/');
}

// نسخ مجلد assets
try { mkdirSync(ASSETS_DIST, { recursive: true }); } catch(e) {}
for (const f of readdirSync(ASSETS_SRC)) {
  copyFileSync(join(ASSETS_SRC, f), join(ASSETS_DIST, f));
}
console.log('✅ Assets copied');

// نسخ الصفحات الرئيسية
for (const [src, { dist }] of Object.entries(PAGE_MAP)) {
  const srcPath = join(SRC, src);
  const distPath = join(DIST, dist);
  try {
    let html = readFileSync(srcPath, 'utf-8');
    html = fixAssetPaths(html);
    writeFileSync(distPath, html, 'utf-8');
    console.log(`✅ ${src} -> ${dist}`);
  } catch(e) {
    console.log(`⚠️ ${src}: ${e.message}`);
  }
}

// نسخ صفحات الخدمات
const servicesDistDir = join(DIST, 'sw-services');
try { mkdirSync(servicesDistDir, { recursive: true }); } catch(e) {}

for (const [arabicName, englishName] of Object.entries(SERVICES_MAP)) {
  const srcPath = join(SRC, 'services', arabicName);
  const distPath = join(servicesDistDir, englishName);
  try {
    let html = readFileSync(srcPath, 'utf-8');
    html = fixAssetPaths(html);
    writeFileSync(distPath, html, 'utf-8');
    console.log(`✅ services/${arabicName} -> sw-services/${englishName}`);
  } catch(e) {
    console.log(`⚠️ ${arabicName}: ${e.message}`);
  }
}

console.log('\n✅ Post-build complete!');
