# Screenshot Setup Guide

## Option 1: Free Online Screenshot Services (Recommended)

### Method 1: Screenshot.guru (Free)
1. Visit: https://screenshot.guru/
2. Enter website URL
3. Click "Take Screenshot"
4. Download image
5. Save in `images/` folder
6. Update HTML with image path

### Method 2: WebCapture (Free)
1. Visit: https://webcapture.net/
2. Enter URL
3. Select size (1920x1080 recommended)
4. Download and save

### Method 3: Screenshots.cloud (Free)
1. Visit: https://screenshots.cloud/
2. Enter URL
3. Download screenshot

## Option 2: Browser Extension (Easiest)

### Chrome Extensions:
1. **Full Page Screen Capture**
   - Install from Chrome Web Store
   - Click extension icon
   - Select "Capture visible area" or "Capture entire page"
   - Save image

2. **Awesome Screenshot**
   - Install extension
   - Click icon → Capture visible area
   - Save as JPG

3. **Fireshot**
   - Install extension
   - Right-click → Take screenshot
   - Save image

## Option 3: Online Screenshot API (For Automatic)

### ScreenshotOne API (Free Tier Available)
1. Sign up at: https://screenshotone.com/
2. Get API key
3. Use in HTML:
```html
<img src="https://api.screenshotone.com/take?access_key=YOUR_KEY&url=WEBSITE_URL&viewport_width=1920&viewport_height=1080">
```

### Alternative APIs:
- **ScreenshotAPI.net** - Free tier
- **Page2Images** - Free tier
- **URLBox** - Paid but reliable

## Quick Steps to Add Screenshots:

1. **Create images folder:**
   ```
   mkdir images
   ```

2. **Capture screenshots** using any method above

3. **Save with these names:**
   - loyaltree.jpg
   - lbcarservice.jpg
   - hotel-laspezia.jpg
   - andysellschicago.jpg
   - koiwellness.jpg
   - corporationcapital.jpg
   - capiwise.jpg
   - nexusmedical.jpg
   - homeorganizers.jpg
   - stonemate.jpg
   - casablanca.jpg
   - smatalozie.jpg

4. **Update HTML** - Replace icon divs with:
```html
<img src="images/loyaltree.jpg" alt="Loyal Tree Website" class="w-full h-full object-cover">
```

## Recommended Image Specs:
- **Width:** 1200px - 1920px
- **Height:** 600px - 800px
- **Format:** JPG (smaller size) or WebP (better quality)
- **Size:** Max 500KB per image
- **Aspect Ratio:** 16:9 or 3:2

## Quick Capture Script (If you have Node.js):

```javascript
// Install: npm install puppeteer
const puppeteer = require('puppeteer');

const websites = [
    'https://loyaltree.ca/',
    'https://lbcarservice.net/',
    // ... add all URLs
];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    for (const url of websites) {
        await page.goto(url, { waitUntil: 'networkidle0' });
        const name = url.split('//')[1].split('/')[0].replace(/\./g, '');
        await page.screenshot({ path: `images/${name}.jpg`, fullPage: false });
    }
    
    await browser.close();
})();
```

## Best Free Tool Recommendation:
**Screenshot.guru** - Easiest and fastest way to get screenshots!

