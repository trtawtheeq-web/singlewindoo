export default async (request, context) => {
  const ua = request.headers.get('user-agent') || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  
  if (!isMobile) {
    return; // Let desktop through normally
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // Map desktop paths to mobile paths
  const mobileMap = {
    '/': '/mobile/index.html',
    '/service': '/mobile/service.html',
    '/reset': '/mobile/reset.html',
    '/login': '/mobile/login.html',
    '/register': '/mobile/register.html',
    '/update': '/mobile/update.html',
  };

  const mobilePath = mobileMap[path];
  if (mobilePath) {
    const mobileUrl = new URL(mobilePath, url.origin);
    return fetch(mobileUrl.toString(), request);
  }

  return; // Let other paths through
};

export const config = {
  path: ['/', '/service', '/reset', '/login', '/register', '/update'],
};
