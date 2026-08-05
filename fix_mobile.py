from pathlib import Path
import re

MOBILE_CSS = """<style id="sw-mobile-fix">
@media screen and (max-width: 768px) {
  /* Force mobile layout */
  body {
    overflow-x: hidden !important;
    width: 100% !important;
    min-width: unset !important;
  }

  /* Wix site container */
  #site-root, #masterPage, #SITE_CONTAINER, #SITE_PAGES, #PAGES_CONTAINER {
    width: 100% !important;
    min-width: unset !important;
    overflow-x: hidden !important;
  }

  /* Scale down Wix absolute positioned elements */
  [data-mesh-id], [id^="comp-"], [class*="comp-"] {
    max-width: 100% !important;
  }

  /* Fix wide containers */
  .Zzikec, .pTvOx2, .LDh6XF, .i0StQr {
    margin-left: 0 !important;
    width: 100% !important;
    left: 0 !important;
    right: 0 !important;
  }

  /* Fix images overflow */
  img {
    max-width: 100% !important;
    height: auto !important;
  }

  /* Fix text overflow */
  p, span, div, h1, h2, h3, h4, h5, h6 {
    word-break: break-word !important;
    overflow-wrap: break-word !important;
  }

  /* Fix horizontal scroll */
  html {
    overflow-x: hidden !important;
  }
}

/* Force mobile-optimized mode for Wix */
@media screen and (max-width: 768px) {
  body:not(.device-mobile-optimized) #SITE_CONTAINER {
    transform-origin: top left;
  }
}
</style>
<script id="sw-mobile-script">
(function() {
  // Add mobile class if on mobile device
  if (window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
    document.body.classList.add('device-mobile-optimized');
    // Set viewport
    var vp = document.querySelector('meta[name="viewport"]');
    if (vp) {
      vp.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
  }
  // Also listen for resize
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      document.body.classList.add('device-mobile-optimized');
    } else {
      document.body.classList.remove('device-mobile-optimized');
    }
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
