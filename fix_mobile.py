from pathlib import Path
import re

MOBILE_CSS = """<style id="sw-mobile-fix">
@media screen and (max-width: 768px) {
  html, body {
    overflow-x: hidden !important;
    width: 100% !important;
  }
}
</style>
<script id="sw-mobile-script">
(function() {
  function applyMobileScale() {
    var siteWidth = 980; // Wix site width
    var screenWidth = window.innerWidth;
    if (screenWidth < siteWidth) {
      var scale = screenWidth / siteWidth;
      var siteRoot = document.getElementById('SITE_CONTAINER') ||
                     document.getElementById('site-root') ||
                     document.getElementById('masterPage') ||
                     document.querySelector('#SITE_PAGES') ||
                     document.body;
      if (siteRoot) {
        siteRoot.style.transformOrigin = 'top left';
        siteRoot.style.transform = 'scale(' + scale + ')';
        siteRoot.style.width = siteWidth + 'px';
        // Set body height to match scaled content
        var scaledHeight = siteRoot.scrollHeight * scale;
        document.body.style.height = scaledHeight + 'px';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      }
    } else {
      var siteRoot = document.getElementById('SITE_CONTAINER') ||
                     document.getElementById('site-root') ||
                     document.getElementById('masterPage') ||
                     document.querySelector('#SITE_PAGES') ||
                     document.body;
      if (siteRoot) {
        siteRoot.style.transform = '';
        siteRoot.style.width = '';
        document.body.style.height = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }
  }

  // Apply on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(applyMobileScale, 300);
    });
  } else {
    setTimeout(applyMobileScale, 300);
  }

  // Apply on resize
  window.addEventListener('resize', applyMobileScale);
  // Apply again after full load
  window.addEventListener('load', function() {
    setTimeout(applyMobileScale, 500);
  });
})();
</script>"""

# Find all HTML files in sinwinqa
base = Path('/home/ubuntu/singlewindoo/client/public/sinwinqa')
files = list(base.glob('*.html')) + list(base.glob('services/*.html'))

count = 0
for f in files:
    try:
        c = f.read_text(encoding='utf-8', errors='ignore')
        # Remove old mobile fix if exists
        c = re.sub(r'<style id="sw-mobile-fix">.*?</style>\s*<script id="sw-mobile-script">.*?</script>', '', c, flags=re.DOTALL)
        # Inject before </head>
        if '</head>' in c:
            c = c.replace('</head>', MOBILE_CSS + '\n</head>', 1)
            f.write_text(c, encoding='utf-8')
            count += 1
            print(f"Fixed: {f.name}")
        else:
            print(f"No </head> in: {f.name}")
    except Exception as e:
        print(f"Error {f.name}: {e}")

print(f"\nDone: {count} files updated")
