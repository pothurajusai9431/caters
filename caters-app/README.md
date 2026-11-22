# Caters: editable source and APK build

## Where to edit (all inside www/)
- index.html      page structure (header, 3D stage, bottom cart bar, navigation)
- css/styles.css  all styling. Colours are variables at the top (:root).
- js/data.js      YOUR CONTENT: app name, brand colour, areas, dishes, caterers, FAQs, support phone/email
- js/core.js      app state, helpers, logo, Find (location search) screen
- js/plate3d.js   the 3D thali: plate, lighting, wood table, banana leaf, each dish
- js/menu.js      dish list, filters, add/remove, price summary, booking, bookings screen
- js/auth.js      sign in, register, help (FAQs and contact), account screen
- js/app.js       rendering, navigation, animations, start-up
- three.min.js    3D library (do not edit)

Scripts load in the order listed in index.html. Keep that order if you add files.
To test on your computer, open www/index.html in a browser.

## Build the APK (no Android tools needed)
1. Change appId in capacitor.config.json to your own (for example com.yourname.caters).
2. Push this whole folder, including the hidden .github folder, to a GitHub repository.
3. Open the Actions tab. "Build Android APK" runs by itself (5 to 8 minutes).
4. Download the artifact "Caters-APK", unzip it, and install app-debug.apk on your Android phone.
   Every push builds a fresh APK.

## iPhone
Needs a Mac-based build and an Apple Developer account. Run "Build iOS archive" from the Actions tab.
Add your signing certificate and provisioning profile as repository secrets to get a signed .ipa.

## Before you publish or sell
- Replace sample caterers, dishes, support contact and FAQs in js/data.js.
- Sign-in is a demo stored on the device. Add a real backend for accounts, bookings, messages and payments.
- The debug APK is for testing. The Play Store needs a signed release build.
