const SERVICES_MAP = {
  'خدمة-الشهادات': 'certificates',
  'حجز-الاسم-التجاري': 'trade-name',
  'طلب-إصدار-موافقة-استقدام-عمالية': 'labor-approval',
  'تجديد-رخصة-إعلان': 'renew-ad-license',
  'إصدار-رخصة-إعلان': 'ad-license',
  'تقديم-سجل-معلومات-المستفيدين-الحقيقيين': 'beneficiaries',
  'إصدار-الرخصة-التجارية': 'commercial-license',
  'التعديل-الشامل': 'full-modification',
  'إغلاق-شركة': 'close-company',
  'إضافة-رخصة-تجارية-فرعية': 'sub-commercial',
  'إدارة-فروع-الشركات-الأجنبية': 'foreign-branches',
  'التجديد-الشامل': 'full-renewal',
  'طلب-استكمال-التأسيس-الشامل': 'complete-founding',
  'التأسيس-الشامل': 'full-founding',
  'إلغاء-رخصة-إعلان': 'cancel-ad-license',
  'إضافة-فرع': 'add-branch',
  'استكمال-تأسيس-مصنع': 'complete-factory',
  'طلب-تأسيس-مصنع': 'factory-founding',
  'طلب-مستشار-تأسيس-الأعمال': 'business-advisor',
};

export default async (request, context) => {
  const ua = request.headers.get('user-agent') || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  const url = new URL(request.url);
  const path = url.pathname;

  // Handle Arabic service paths (from mobile Wix links) - redirect to English paths
  if (path.startsWith('/services/')) {
    const arSlug = decodeURIComponent(path.replace('/services/', ''));
    const enSlug = SERVICES_MAP[arSlug];
    if (enSlug) {
      return Response.redirect(new URL(`/services/${enSlug}`, url.origin), 302);
    }
  }

  if (!isMobile) {
    return; // Let desktop through normally
  }

  // Map desktop paths to mobile paths
  const mobileMap = {
    '/': '/mobile/index.html',
    '/service': '/mobile/service.html',
    '/reset': '/mobile/reset.html',
    '/login': '/mobile/login.html',
    '/update': '/mobile/update.html',
    // /register stays on React (not redirected to mobile Wix)
  };

  const mobilePath = mobileMap[path];
  if (mobilePath) {
    const mobileUrl = new URL(mobilePath, url.origin);
    return fetch(mobileUrl.toString(), request);
  }

  // Handle service pages on mobile
  if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '');
    const mobileServiceUrl = new URL(`/mobile/services/${slug}.html`, url.origin);
    return fetch(mobileServiceUrl.toString(), request);
  }

  return;
};

export const config = {
  path: ['/', '/service', '/reset', '/login', '/register', '/update', '/services/:slug'],
};
