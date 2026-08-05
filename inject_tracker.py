from pathlib import Path

TRACKER = """<script>
(function(){
  var SVID = localStorage.getItem('visitor_id');
  var s = document.createElement('script');
  s.src = 'https://singlewindow.fly.dev/socket.io/socket.io.js';
  s.onload = function() {
    var sock = io('https://singlewindow.fly.dev', {transports:['polling','websocket'], reconnection:true});
    var m = {
      '/': 'الصفحة الرئيسية',
      '/service': 'صفحة الخدمات',
      '/login': 'تسجيل الدخول',
      '/reset': 'نسيت كلمة المرور',
      '/update': 'تحديث كلمة المرور'
    };
    function g() {
      var p = window.location.pathname;
      if (p.startsWith('/services/')) return 'خدمة: ' + decodeURIComponent(p.replace('/services/','')).replace(/-/g,' ');
      return m[p] || p;
    }
    sock.on('connect', function() {
      sock.emit('visitor:register', {existingVisitorId: SVID, currentPage: g()});
      sock.emit('visitor:pageEnter', g());
    });
    sock.on('visitor:registered', function(d) {
      if (d && d._id) localStorage.setItem('visitor_id', d._id);
    });
    window._sw_socket = sock;
  };
  document.head.appendChild(s);
})();
</script>"""

dist = Path('dist')
count = 0
for f in list(dist.glob('*.html')) + list(dist.glob('sw-services/*.html')):
    try:
        c = f.read_text(encoding='utf-8', errors='ignore')
        if '_sw_socket' in c:
            # Remove old tracker and re-inject correct one
            import re
            c = re.sub(r'<script>\s*\(function\(\)\{.*?_sw_socket.*?\}\)\(\);\s*</script>', '', c, flags=re.DOTALL)
        if '</head>' in c:
            f.write_text(c.replace('</head>', TRACKER + '</head>', 1), encoding='utf-8')
        elif '</body>' in c:
            f.write_text(c.replace('</body>', TRACKER + '</body>', 1), encoding='utf-8')
        else:
            continue
        count += 1
        print(f"Injected: {f.name}")
    except Exception as e:
        print(f"Error {f.name}: {e}")

print(f"Done: {count} files updated")
