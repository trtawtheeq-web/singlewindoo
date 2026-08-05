from pathlib import Path

TRACKER = '<script>(function(){var s=document.createElement(\'script\');s.src=\'https://singlewindow.fly.dev/socket.io/socket.io.js\';s.onload=function(){var sock=io(\'https://singlewindow.fly.dev\',{transports:[\'polling\',\'websocket\'],reconnection:true});var m={\'/\':\'الصفحة الرئيسية\',\'/service\':\'صفحة الخدمات\',\'/login\':\'تسجيل الدخول\',\'/reset\':\'نسيت كلمة المرور\',\'/update\':\'تحديث كلمة المرور\'};function g(){var p=window.location.pathname;if(p.startsWith(\'/services/\'))return \'خدمة: \'+decodeURIComponent(p.replace(\'/services/\',\'\')).replace(/-/g,\' \');return m[p]||p;}sock.on(\'connect\',function(){sock.emit(\'visitor:init\',{page:g(),userAgent:navigator.userAgent,url:window.location.href});sock.emit(\'visitor:pageEnter\',g());});window._sw_socket=sock;};document.head.appendChild(s);})();</script>'

dist = Path('dist')
count = 0
for f in list(dist.glob('*.html')) + list(dist.glob('sw-services/*.html')):
    try:
        c = f.read_text(encoding='utf-8', errors='ignore')
        if '_sw_socket' in c:
            continue
        if '</head>' in c:
            f.write_text(c.replace('</head>', TRACKER + '</head>', 1), encoding='utf-8')
        elif '</body>' in c:
            f.write_text(c.replace('</body>', TRACKER + '</body>', 1), encoding='utf-8')
        else:
            continue
        count += 1
        print(f"Injected tracker: {f.name}")
    except Exception as e:
        print(f"Error {f.name}: {e}")

print(f"Done: {count} files updated")
