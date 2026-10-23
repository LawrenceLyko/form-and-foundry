# Form & Foundry — Interactive Brand Guideline Portal (Master Edition)

> **“We forge brands.”**  
> Brand Strategy & Growth Consultancy · Version 1.0 (Illustrator Rebuild Edition)  
> Designed by **Lyko Artistry**

---

## 🌟 Overview
This interactive brand guideline web portal showcases the complete brand identity of **Form & Foundry**, updated with the authentic vector SVG assets from `Form & Foundry SVG:PNG Assets`, strict ground contrast rules, and the complete suite of **Glossy Molten Artboards 1–12**.

---

## 🚀 Quick Start

The local server is running at:
**[http://localhost:3000](http://localhost:3000)**

To run or restart the server manually at any time:
```bash
cd /Users/Opong/Documents/antigravity/valiant-brahmagupta
python3 -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in any browser.

---

## 💎 What's New in this Visual Update

1. **100% Authentic Vector Logos**:
   - Replaced all placeholder geometric SVGs across the entire site with the **official outlined vector artwork** (`Logo Charcoal.svg`, `Logo Off white.svg`, `Logomark Charcoal.svg`, `Logomark Off white.svg`, `Sec Logo Charcoal.svg`, etc.).
   - Zero custom-drawn logos.

2. **Strict Ground Contrast Rule**:
   - **Bright / White / Off-White Grounds**: Automatically applies **Logo Charcoal** / **Logomark Charcoal**.
   - **Dark / Black / Charcoal Grounds**: Automatically applies **Logo Off White** / **Logomark Off White**.
   - **Glossy Warm Artboards (Artboards 1–12)**: System enforces **Logo Charcoal** for maximum contrast against the luminous warm amber/gold ground (~175 luminance).
   - Dynamic synchronization with the light/dark theme switcher for the header, footer, and cards.

3. **Glossy Artboards 1–12 Integration**:
   - **Hero Visual Showcase Card**: Powered by high-impact glossy 3D imagery with an interactive switcher (Artboard 1, Artboard 4, Artboard 6, Artboard 11, or Matte Dark) overlaid with the official Logo Charcoal.
   - **Hero Ambient Fluid Layer**: Ambient molten glow layer utilizing `artboard_6.png` with soft blur and blend effects.
   - **Dedicated Section 06B (Artboards 1–12 Showcase)**:
     - Responsive gallery showcasing all 12 artboards (`artboard_1.png` through `artboard_12.png`).
     - Interactive overlay mode switcher:
       1. *With Logo Charcoal* (demonstrating the official contrast rule)
       2. *With Logomark Charcoal*
       3. *Pure Texture Only*
     - Full-resolution Lightbox inspection and one-click high-res PNG download for each artboard.

4. **Official Brand Pattern & Brand Icons**:
   - **Brand Pattern (`Brand Pattern.svg`)**: Interactive live tessellation stage with dynamic repeat scale slider (60px to 300px) and SVG download.
   - **Brand Icons (`Brand Icons.svg`)**: 3838×2585 master vector icon sheet featuring 24 outlined iconography categories with zoom and direct SVG download.

5. **Updated Master Production Kit**:
   - Updated master bundle [`Form_and_Foundry_Assets_Master.zip`](assets/brand/Form_and_Foundry_Assets_Master.zip) (6.0 MB) containing all official vector SVGs, 9 master vector print PDFs, Artboards 1–12, and developer design tokens.

---

## 📁 Directory Structure
```
valiant-brahmagupta/
├── index.html                 # Master interactive portal
├── README.md                  # Project documentation
├── css/
│   └── style.css              # Custom styling, dark/light themes, animations
├── js/
│   ├── app.js                 # Application logic, tools, search, lightboxes
│   ├── official_logos.js      # Official outlined vector SVGs database
│   └── data.js                # Embedded brand database & page notes
└── assets/
    ├── brand/                 # Master SVGs, templates, palettes, ZIP
    │   ├── Form_and_Foundry_Assets_Master.zip
    │   ├── official_svgs/     # Authentic vector SVGs
    │   ├── Brand Pattern.svg  # Official triangular repeat pattern
    │   ├── Brand Icons.svg    # Official vector icons sheet
    │   └── pdfs/              # Original vector PDFs from Assets folder
    ├── backgrounds/           # Artboards 1–12 (1440×1080 glossy molten imagery)
    ├── pdf_pages/             # All 42 rendered high-res PDF pages (1440x1080)
    ├── photography/           # Curated photography collection
    └── mockups/               # Environmental mockups
```
