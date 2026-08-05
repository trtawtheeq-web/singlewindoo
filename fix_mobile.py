from pathlib import Path
import re

MOBILE_CSS = """<style id="sw-mobile-fix">
html, body {
  margin: 0 !important;
  padding: 0 !important;
}
#sw-scale-wrapper {
  transform-origin: top center;
  position: relative;
}
</style>
<script id="sw-mobile-script">
(function() {
  var SITE_WIDTH = 980;

  function applyMobileScale() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    if (screenWidth >= SITE_WIDTH) return; // Desktop - no scaling needed

    var scale = screenWidth / SITE_WIDTH;

    // Find the main Wix container
    var container = document.getElementById('SITE_CONTAINER') ||
                    document.getElementById('site-root') ||
                    document.getElementById('masterPage') ||
                    document.body;

    // Wrap in a scaler div if not already done
    var wrapper = document.getElementById('sw-scale-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'sw-scale-wrapper';
      container.parentNode.insertBefore(wrapper, container);
      wrapper.appendChild(container);
    }

    // Apply scale
    wrapper.style.transformOrigin = 'top center';
    wrapper.style.transform = 'scale(' + scale + ')';
    wrapper.style.width = SITE_WIDTH + 'px';
    wrapper.style.marginLeft = 'auto';
    wrapper.style.marginRight = 'auto';

    // Fix body height to match scaled content
    setTimeout(function() {
      var contentHeight = wrapper.scrollHeight * scale;
      document.body.style.height = contentHeight + 'px';
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflowX = 'hidden';
    }, 100);
  }

  // Apply after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(applyMobileScale, 200);
    });
  } else {
    setTimeout(applyMobileScale, 200);
  }

  // Apply after full load (images etc)
  window.addEventListener('load', function() {
    setTimeout(applyMobileScale, 300);
  });

  // Apply on resize
  window.addEventListener('resize', applyMobileScale);
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
