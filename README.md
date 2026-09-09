# LEADS Next Gen Centre — Luxury Keycard Holder

A photorealistic, interactive 3D **Leather Keycard Holder & Executive Pass** built for the **LEADS Next Gen Centre (RUAS)**. Features physical blind-debossed leather craftsmanship, fluid 3D book-fold opening animations, card extraction mechanics, and an interactive 3D flip card displaying executive credential fields.

---

## ✨ Key Features

### 1. 🧵 True Physical Blind-Debossed Leather Logo
- **Seamless Leather Grain Continuity**: The navy leather texture (`dark-blue-leather.jpg`) flows uninterrupted straight through the logo depression using SVG mask definitions (`#leads-deboss-mask`) and CSS blending (`mix-blend-mode: multiply`).
- **Realistic Bevel & Cavity Lighting**: Deep top inner crevice shadows (`rgba(0, 0, 0, 0.95)`) paired with subtle specular lower-edge highlights (`rgba(140, 210, 255, 0.55)`).
- **Pure Blind Deboss**: Free of flat-black sticker overlays, printed inks, foils, or artificial neon glows.

### 2. 📖 Fluid 3D Book-Fold Cover Animation
- **Single-Sweep GPU Rotation**: Clean `0deg` → `-180deg` continuous swing using custom `cubic-bezier(0.2, 0.8, 0.2, 1)` easing with zero mid-way stutters or pauses.
- **Interior Left Flap**: Displays official RUAS executive credentials and tier specifications upon opening.

### 3. 💳 Single-Shot Fluid Card Draw & Extraction
- **One-Motion Extraction**: Tapping or swiping pulls the pass card up and forward out of the curved die-cut leather pocket in a single smooth trajectory.
- **Optimized Vertical QR Alignment**: QR code is positioned in the lower-center section of the pass front, directly above the flip affordance hint.

### 4. 🔄 Interactive 3D Card Flip (Front & Back Faces)
- **Front Face**: Active pass badge, mini LEADS logo, alumni member name, role, phone, email, and high-contrast entry QR code.
- **Back Face**: 5 detailed executive verification fields:
  1. *Access Level* (Tier 1 Executive & Alumni Fellow)
  2. *Pass Serial ID* (`RUAS-LEADS-2026-08842`)
  3. *Validity Period* (Jan 2026 – Dec 2028)
  4. *Issuing Authority* (M. S. Ramaiah Univ. of Applied Sciences)
  5. *Terms & Entry Verification*
- **Front/Back Flip Button**: Easily toggle between the front pass and back details.

### 5. 📱 Touch Gestures & Responsive Layout
- **Swipe-to-Open / Swipe-to-Close**: Intuitive vertical touch swipe support on mobile devices.
- **Responsive Breakpoints**: Tuned scaling for mobile phones, tablets, standard desktops, and ultrawide displays (1440px / 1920px+).

---

## 📁 Repository Structure

```
├── index.html                           # Standalone single-file interactive prototype
├── Card.tsx                             # React component with full state machine & gesture bindings
├── Card.module.css                      # Modular 3D CSS animations, leather styling & layouts
├── TicketCard.tsx                       # Alternative ticket pass variant
├── TicketCard.module.css                # Styling for ticket pass variant
├── ticket.html                          # Ticket view HTML demo
├── wallet-pass.html                     # Apple/Google Wallet pass preview
├── wrangler.toml                        # Cloudflare Pages deployment configuration
└── assets/
    ├── dark-blue-leather.jpg            # Optimized high-DPI navy leather texture
    ├── leads-logo-clean.png             # Clean alpha logo for SVG mask debossing
    ├── leads-logo.png                   # Full color LEADS logo asset
    ├── leads-logo-foil.png              # Foil stamp variant asset
    ├── leather-debossed-logo.png        # Pre-rendered deboss reference asset
    └── leads-qr-code.png                # Entry verification QR code
```

---

## 🚀 Getting Started

### Option 1: Standalone HTML
Simply open `index.html` in any modern web browser (Chrome, Edge, Safari, Firefox). No build step required:
```bash
# Open directly in your browser
start index.html
```

### Option 2: React Component Usage

Import the component and its stylesheet into your React / Next.js application:

```tsx
import React from 'react';
import { InteractiveCardHolder } from './Card';

export default function PassPage() {
  return (
    <InteractiveCardHolder
      memberName="Bhawen Maroo"
      memberRole="Alumni Member"
      phone="+91 9608768647"
      email="bhawenmaroo@gmail.com"
      logoSrc="./leads-logo-clean.png"
      qrUrl="./leads-qr-code.png"
    />
  );
}
```

---

## 🛠️ Tech Stack
- **Languages / Frameworks**: HTML5, TypeScript, React, Vanilla CSS3 (3D CSS Transforms, GPU Compositing).
- **Design System**: High-DPI physical leather simulation, CSS Masks, SVG `<defs>`, and CSS Custom Properties for timing synchronization.

---

## 📄 License
© 2026 LEADS Next Gen Centre — M. S. Ramaiah University of Applied Sciences (RUAS). All rights reserved.
