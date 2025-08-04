# WebXR UI Library - Progressive Web App

This project has been converted into a Progressive Web App (PWA) with the following features:

## PWA Features

- ✅ **Web App Manifest** - Defines app metadata and icons
- ✅ **Service Worker** - Enables offline functionality and caching
- ✅ **Install Prompt** - Allows users to install the app on their device
- ✅ **Offline Support** - App works without internet connection
- ✅ **App-like Experience** - Full-screen mode and native app feel

## Installation

### For Users

1. **Install on Desktop (Chrome/Edge)**

   - Visit the app in Chrome or Edge
   - Click the install icon in the address bar
   - Or use the "Install App" button in the bottom-right corner

2. **Install on Mobile (Android)**

   - Open the app in Chrome
   - Tap the menu (⋮) and select "Add to Home screen"
   - Or use the "Install App" button

3. **Install on iOS**
   - Open the app in Safari
   - Tap the share button and select "Add to Home Screen"

### For Developers

1. **Generate Icons**

   ```bash
   # Open the icon generator in your browser
   # Navigate to: http://localhost:3000/icons/generate-icons.html
   # Download the generated icons and place them in public/icons/
   ```

2. **Build for Production**

   ```bash
   npm run build
   npm start
   ```

3. **Test PWA Features**
   - Use Chrome DevTools > Application tab
   - Check "Manifest" and "Service Workers" sections
   - Test offline functionality

## PWA Configuration

### Manifest File (`public/manifest.json`)

- App name and description
- Icon definitions for different sizes
- Display mode (standalone)
- Theme colors
- Orientation settings

### Service Worker (`public/sw.js`)

- Caches essential resources
- Handles offline fallbacks
- Manages cache updates

### PWA Install Component (`components/PWAInstall.tsx`)

- Detects install prompts
- Provides install button
- Handles installation flow

## Development

### Adding New Icons

1. Generate icons using the provided HTML tool
2. Place icons in `public/icons/`
3. Update `manifest.json` if needed

### Updating Service Worker

1. Modify `public/sw.js`
2. Update cache version in `CACHE_NAME`
3. Test offline functionality

### PWA Testing

- Use Lighthouse in Chrome DevTools
- Check PWA score (should be 90+)
- Test on different devices

## Browser Support

- ✅ Chrome/Chromium (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (iOS 11.3+)
- ⚠️ Safari (Desktop - limited support)

## Performance Optimizations

- Service worker caching
- Image optimization
- CSS/JS compression
- Lazy loading of components
- Offline-first architecture

## Troubleshooting

### App Not Installing

- Ensure HTTPS is enabled (required for PWA)
- Check if service worker is registered
- Verify manifest.json is accessible

### Offline Not Working

- Check service worker registration
- Verify cached resources
- Clear browser cache and retry

### Icons Not Showing

- Ensure all icon sizes are present
- Check file paths in manifest.json
- Verify icon format (PNG recommended)

## Next Steps

1. Add custom icons for your brand
2. Implement push notifications
3. Add background sync capabilities
4. Optimize for specific device types
5. Add analytics for PWA usage
