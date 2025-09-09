# How to Replace Placeholder Assets

This document outlines the process for replacing the placeholder assets in the game with your own images.

## Asset Locations

All game assets are located in the `public/assets` directory.

- **Coin Image:** `public/assets/et-coin.png` (or `.svg`)
- **Background Image:** `public/assets/bg-hero.jpg`
- **Category Icons:** 
    - `public/assets/icon-real-estate.svg`
    - `public/assets/icon-agriculture.svg`
    - `public/assets/icon-management.svg`
    - `public/assets/icon-tech.svg`
    - `public/assets/icon-politics.svg`
    - `public/assets/icon-health.svg`
    - `public/assets/icon-security.svg`
- **Avatar Placeholder:** `public/assets/avatar-placeholder.png`

## Replacement Steps

1. **Prepare Your Assets:**
   - Ensure your new assets have the **exact same filenames** as the placeholder files listed above.
   - For icons, SVG format is preferred for scalability.
   - For the background image, use a mobile-friendly aspect ratio.

2. **Replace the Files:**
   - Simply overwrite the placeholder files in the `public/assets` directory with your new image files.

## Remote Assets (Firebase Storage)

For assets you wish to manage remotely (e.g., for dynamic updates), you can use the Firebase Storage integration.

1. **Upload to Firebase Storage:**
   - In the Firebase Console, navigate to **Storage**.
   - Upload your images to the `images/` folder.

2. **Update in the Admin Page:**
   - Go to the app's admin page.
   - Paste the **download URL** of the uploaded image into the corresponding field.
   - The app will automatically update to use the new remote image.
