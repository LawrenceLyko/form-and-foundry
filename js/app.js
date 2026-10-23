// Form & Foundry Interactive Brand Guideline Site Controller
// Master Edition — Powered by Official SVGs & Artboards 1-12
document.addEventListener('DOMContentLoaded', () => {
  const DATA = window.BRAND_DATA;
  const OFFICIAL = window.OFFICIAL_LOGOS;

  if (!DATA || !OFFICIAL) {
    console.error('Brand data or official logos not loaded!');
    return;
  }

  // Application State
  const state = {
    theme: localStorage.getItem('ff_theme') || 'dark',
    activeSection: 'intro',
    currentPage: 1,
    logoBg: 'charcoal',
    logoType: 'primary',
    logoColorway: 'auto', // 'auto', 'charcoal', 'offwhite', 'orange'
    logoClearSpace: false,
    logoScale: 200,
    heroArtboard: 'artboard_1',
    artboardOverlayMode: 'logo', // 'none', 'logo', 'mark'
    patternScale: 140,
    photoFilter: 'all',
    typeFamily: 'Sora',
    typeWeight: 700,
    typeSize: 48,
    typeLineHeight: 1.15,
    typeTracking: -0.02,
    typeCase: 'none',
    activeDecision: 0
  };

  // DOM Elements
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const searchTriggerBtn = document.getElementById('search-trigger-btn');
  const searchModal = document.getElementById('search-modal');
  const searchField = document.getElementById('search-field');
  const searchResults = document.getElementById('search-results');
  const toast = document.getElementById('toast');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  // Header & Footer Dynamic Logo Elements
  const headerMarkContainer = document.getElementById('header-official-mark');
  const footerLogoContainer = document.getElementById('footer-official-logo');
  const heroCardMarkContainer = document.getElementById('hero-card-official-mark');

  // --- 1. Theme Management (Strict Contrast Compliance) ---
  // Charcoal on bright/white grounds, Off-white on dark/black grounds
  function applyTheme(theme) {
    state.theme = theme;
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      `;
      themeToggleBtn.title = 'Switch to Dark Mode';

      // On bright/white background: Use LOGO CHARCOAL
      if (headerMarkContainer) {
        headerMarkContainer.innerHTML = OFFICIAL['Logomark Charcoal.svg'];
      }
      if (footerLogoContainer) {
        footerLogoContainer.innerHTML = OFFICIAL['Sec Logo Charcoal.svg'];
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      `;
      themeToggleBtn.title = 'Switch to Off-White Light Mode';

      // On dark/black background: Use LOGO OFF-WHITE
      if (headerMarkContainer) {
        headerMarkContainer.innerHTML = OFFICIAL['Logomark Off white.svg'];
      }
      if (footerLogoContainer) {
        footerLogoContainer.innerHTML = OFFICIAL['Sec Logo Off white.svg'];
      }
    }
    localStorage.setItem('ff_theme', theme);
  }

  themeToggleBtn.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });
  applyTheme(state.theme);

  // --- 2. Toast Notification ---
  function showToast(message, icon = '✓') {
    toast.innerHTML = `<span style="color:var(--color-orange);font-weight:bold;">${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
  window.showToast = showToast;

  // --- 3. Clipboard Helper ---
  window.copyText = function(text, label = 'Copied') {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label}: ${text}`);
    }).catch(err => {
      showToast(`Copy failed`, '✕');
    });
  };

  // --- 4. Navigation & Active Section Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateNav() {
    let current = '';
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- 5. Hero Artboard Background Switcher ---
  const heroCard = document.getElementById('hero-showcase-card');
  const heroArtboardPills = document.querySelectorAll('.hero-artboard-pill');

  function updateHeroArtboard(artboardKey) {
    state.heroArtboard = artboardKey;
    heroArtboardPills.forEach(p => p.classList.toggle('active', p.dataset.artboard === artboardKey));

    if (artboardKey === 'dark') {
      heroCard.style.backgroundImage = 'none';
      heroCard.style.backgroundColor = '#1C1B1A';
      // On dark ground: Use OFF-WHITE LOGO
      if (heroCardMarkContainer) {
        heroCardMarkContainer.innerHTML = OFFICIAL['Logo Off white.svg'];
      }
    } else {
      heroCard.style.backgroundImage = `url('assets/backgrounds/${artboardKey}.png')`;
      // On bright/warm glossy artboards: Use CHARCOAL LOGO
      // On glossy warm artboards: Use OFF-WHITE LOGO (user design rule override)
      if (heroCardMarkContainer) {
        heroCardMarkContainer.innerHTML = OFFICIAL['Logo Off white.svg'];
      }
    }
  }

  heroArtboardPills.forEach(pill => {
    pill.addEventListener('click', () => {
      updateHeroArtboard(pill.dataset.artboard);
    });
  });
  // Default hero to artboard_1 with Charcoal Logo
  updateHeroArtboard('artboard_1');

  // --- 6. Search & Command Palette ---
  const searchIndex = [
    { title: '01 Brand Introduction', cat: 'Section', target: '#intro', meta: 'overview story mission vision promise audience' },
    { title: '02 Brand Strategy', cat: 'Section', target: '#strategy', meta: 'positioning value proposition pillars voice sliders' },
    { title: '03 Logo System & Architecture', cat: 'Section', target: '#logo-system', meta: 'primary secondary stacked logomark wordmark clearspace' },
    { title: '04 Colour System & WCAG', cat: 'Section', target: '#colour-system', meta: 'charcoal warm orange off white ratio contrast wcag' },
    { title: '05 Typography (Sora & Inter)', cat: 'Section', target: '#typography', meta: 'sora inter weights hierarchy font pairing display' },
    { title: '06 Graphic Language & Brand Pattern', cat: 'Section', target: '#graphic-language', meta: 'shapes patterns modular blocks clipped corners grid' },
    { title: '06B Glossy Imagery (Artboards 1–12)', cat: 'Section', target: '#glossy-artboards', meta: 'artboards glossy 3d molten fluid liquid backgrounds' },
    { title: '07 Photography Direction', cat: 'Section', target: '#photography', meta: 'objects form light pattern silhouette monochrome' },
    { title: '08 Brand Voice & Tone', cat: 'Section', target: '#brand-voice', meta: 'writing principles vocabulary do dont taglines' },
    { title: '09 Brand Applications & Mockups', cat: 'Section', target: '#applications', meta: 'mockups citylight poster horizontal sign id badge wax seal' },
    { title: '10 Illustrator Rebuild Decisions', cat: 'Section', target: '#rebuild-decisions', meta: 'decision container corners contrast orange text sections ampersand' },
    { title: '11 Master 42-Page Guideline Inspector', cat: 'Section', target: '#guideline-inspector', meta: '42 pages pdf slide viewer notes layout' },
    { title: '12 Asset Station & Downloads', cat: 'Section', target: '#assets-hub', meta: 'download svg png pdf zip master vector' },
    { title: 'Official Logo Charcoal (SVG)', cat: 'Asset', target: '#logo-system', action: () => selectPlaygroundLogo('primary', 'offwhite') },
    { title: 'Official Logo Off White (SVG)', cat: 'Asset', target: '#logo-system', action: () => selectPlaygroundLogo('primary', 'charcoal') },
    { title: 'Official Brand Pattern (SVG)', cat: 'Asset', target: '#graphic-language' },
    { title: 'Official Brand Icons (Sheet)', cat: 'Asset', target: '#graphic-language' },
    { title: 'Charcoal #1C1B1A', cat: 'Colour', target: '#colour-system', action: () => copyText('#1C1B1A', 'HEX Copied') },
    { title: 'Warm Orange #FF6B35', cat: 'Colour', target: '#colour-system', action: () => copyText('#FF6B35', 'HEX Copied') },
    { title: 'Off White #F7F5F0', cat: 'Colour', target: '#colour-system', action: () => copyText('#F7F5F0', 'HEX Copied') },
    { title: 'Shade 1 (Accessible Orange) #D25B30', cat: 'Colour', target: '#colour-system', action: () => copyText('#D25B30', 'HEX Copied') },
    { title: 'Clear Space Rule (1/6th of Mark)', cat: 'Logo Rule', target: '#logo-system' },
    { title: 'Minimum Logo Sizes (Digital 28px / 90px / 140px)', cat: 'Logo Rule', target: '#logo-system' },
    { title: 'Tagline: "We forge brands."', cat: 'Messaging', target: '#brand-voice' },
    { title: 'Sign-Off Line: "Let’s form your future"', cat: 'Messaging', target: '#brand-voice' }
  ];

  DATA.pages.forEach(p => {
    searchIndex.push({
      title: `Page ${p.page}: ${p.title}`,
      cat: 'Guideline Page',
      target: '#guideline-inspector',
      action: () => selectPage(p.page),
      meta: p.change_note
    });
  });

  function openSearch() {
    searchModal.classList.add('open');
    searchField.value = '';
    searchField.focus();
    renderSearchResults('');
  }

  function closeSearch() {
    searchModal.classList.remove('open');
  }

  function renderSearchResults(query) {
    const q = query.trim().toLowerCase();
    const filtered = !q 
      ? searchIndex.slice(0, 8)
      : searchIndex.filter(item => 
          item.title.toLowerCase().includes(q) || 
          item.cat.toLowerCase().includes(q) || 
          (item.meta && item.meta.toLowerCase().includes(q))
        ).slice(0, 10);

    if (filtered.length === 0) {
      searchResults.innerHTML = `<li style="padding:1.5rem;text-align:center;color:var(--text-muted);">No brand rules or pages matching "${query}"</li>`;
      return;
    }

    searchResults.innerHTML = filtered.map((item, idx) => `
      <li class="search-result-item ${idx === 0 ? 'selected' : ''}" data-target="${item.target}" data-idx="${idx}">
        <div>
          <div class="result-title">${item.title}</div>
          <div class="result-category">${item.cat}</div>
        </div>
        <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600;">Jump ↵</span>
      </li>
    `).join('');

    searchResults.querySelectorAll('.search-result-item').forEach((li, idx) => {
      li.addEventListener('click', () => {
        const item = filtered[idx];
        closeSearch();
        if (item.action) item.action();
        if (item.target) {
          const el = document.querySelector(item.target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  searchTriggerBtn.addEventListener('click', openSearch);
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });
  searchField.addEventListener('input', (e) => renderSearchResults(e.target.value));

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchModal.classList.contains('open') ? closeSearch() : openSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
      closeLightbox();
    }
  });

  // --- 7. Core Values Interactive Grid ---
  const valueCards = document.querySelectorAll('.value-pill-card');
  const valueDetailBox = document.getElementById('value-detail-box');
  if (valueCards.length && valueDetailBox) {
    valueCards.forEach((card, i) => {
      card.addEventListener('click', () => {
        valueCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const v = DATA.core_values[i];
        valueDetailBox.innerHTML = `
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
            <span class="value-num" style="font-size:1.1rem;margin:0;">0${i+1}</span>
            <h4 style="font-size:1.5rem;font-weight:800;">${v.title}</h4>
          </div>
          <p style="font-size:1.125rem;color:var(--text-secondary);line-height:1.6;margin-bottom:1rem;">${v.desc}</p>
          <div style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,107,53,0.1);padding:0.35rem 0.75rem;border-radius:var(--radius-pill);font-size:0.8rem;color:var(--color-orange);font-weight:700;">
            Guideline Principle: Always design with intent before execution.
          </div>
        `;
      });
    });
  }

  // --- 8. Interactive Logo Playground (Official Logos & Strict Contrast) ---
  const stage = document.getElementById('logo-stage');
  const logoWrapper = document.getElementById('logo-wrapper');
  const clearSpaceBox = document.getElementById('clear-space-overlay');
  const minSizeBadge = document.getElementById('min-size-indicator');
  const sizeSlider = document.getElementById('logo-size-slider');
  const sizeValueLabel = document.getElementById('logo-size-val');
  const downloadLogoBtn = document.getElementById('download-active-logo-btn');
  const groundContrastNote = document.getElementById('ground-contrast-note');

  function getOfficialSvgKey() {
    // Contrast Logic:
    // Off-white mark on: dark/charcoal grounds AND glossy warm artboards (design override)
    // Charcoal mark on: off-white / orange / bright solid grounds
    const isArtboardGround = state.logoBg.startsWith('artboard-');
    const isDarkGround = (state.logoBg === 'charcoal') || isArtboardGround;

    if (state.logoType === 'primary') {
      if (state.logoColorway === 'orange') return 'Logo Orange.svg';
      return isDarkGround ? 'Logo Off white.svg' : 'Logo Charcoal.svg';
    } else if (state.logoType === 'horizontal') {
      if (state.logoColorway === 'orange') return 'Sec Logo Orange.svg';
      return isDarkGround ? 'Sec Logo Off white.svg' : 'Sec Logo Charcoal.svg';
    } else { // 'mark'
      if (state.logoColorway === 'orange') return 'Logomark Orange.svg';
      return isDarkGround ? 'Logomark Off white.svg' : 'Logomark Charcoal.svg';
    }
  }

  function updateLogoPlayground() {
    const isArtboard = state.logoBg.startsWith('artboard-');
    
    // Set Stage Background
    if (isArtboard) {
      const artNum = state.logoBg.replace('artboard-', '');
      stage.style.backgroundImage = `url('assets/backgrounds/artboard_${artNum}.png')`;
      stage.style.backgroundSize = 'cover';
      stage.style.backgroundPosition = 'center';
      stage.className = 'playground-stage';
      if (groundContrastNote) {
        groundContrastNote.innerHTML = `<strong>Glossy Artboard ${artNum}</strong>: Warm molten texture. Rule applied: <strong>Logo Off White</strong> (design override — Off White on warm artboards).`;
      }
    } else {
      stage.style.backgroundImage = 'none';
      stage.className = `playground-stage bg-${state.logoBg}`;
      if (groundContrastNote) {
        if (state.logoBg === 'charcoal') {
          groundContrastNote.innerHTML = `<strong>Charcoal Ground (#1C1B1A)</strong>: Deep matte dark. Rule applied: <strong>Logo Off White</strong>.`;
        } else if (state.logoBg === 'offwhite') {
          groundContrastNote.innerHTML = `<strong>Off White Ground (#F7F5F0)</strong>: Warm paper canvas. Rule applied: <strong>Logo Charcoal</strong>.`;
        } else {
          groundContrastNote.innerHTML = `<strong>Warm Orange Ground (#FF6B35)</strong>: High energy ground. Rule applied: <strong>Logo Charcoal</strong>.`;
        }
      }
    }

    // Aspect ratio calibration
    let width = state.logoScale;
    let height = state.logoScale;
    if (state.logoType === 'horizontal') {
      width = state.logoScale * (1011.05 / 245.48); // Official aspect ~4.12:1
    }

    logoWrapper.style.width = `${width}px`;
    logoWrapper.style.height = `${height}px`;

    const svgKey = getOfficialSvgKey();
    const rawSvg = OFFICIAL[svgKey] || OFFICIAL['Logo Charcoal.svg'];
    logoWrapper.innerHTML = rawSvg;

    // Minimum Size Verification (Page 13 rules)
    let minPx = 28;
    let label = 'Standalone Mark min: 28px (print: 10mm)';
    if (state.logoType === 'primary') {
      minPx = 90;
      label = 'Stacked Logo min: 90px (print: 25mm)';
    } else if (state.logoType === 'horizontal') {
      minPx = 140;
      label = 'Horizontal Logo min: 140px (print: 35mm)';
    }

    if (width < minPx) {
      minSizeBadge.className = 'min-size-badge warning';
      minSizeBadge.innerHTML = `⚠️ Below Minimum Size: ${Math.round(width)}px < ${minPx}px threshold!`;
    } else {
      minSizeBadge.className = 'min-size-badge pass';
      minSizeBadge.innerHTML = `✓ Compliant: ${Math.round(width)}px (${label})`;
    }

    sizeValueLabel.textContent = `${Math.round(width)}px`;

    // Clear Space Overlay toggle
    if (state.logoClearSpace) {
      clearSpaceBox.classList.add('visible');
    } else {
      clearSpaceBox.classList.remove('visible');
    }
  }

  function selectPlaygroundLogo(type, bg) {
    state.logoType = type;
    state.logoBg = bg;
    document.querySelectorAll('[data-logotype]').forEach(b => b.classList.toggle('active', b.dataset.logotype === type));
    document.querySelectorAll('[data-logobg]').forEach(b => b.classList.toggle('active', b.dataset.logobg === bg));
    updateLogoPlayground();
  }

  document.querySelectorAll('[data-logotype]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-logotype]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.logoType = btn.dataset.logotype;
      updateLogoPlayground();
    });
  });

  document.querySelectorAll('[data-logobg]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-logobg]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.logoBg = btn.dataset.logobg;
      updateLogoPlayground();
    });
  });

  // Colorway selector (Auto vs Orange)
  document.querySelectorAll('[data-logocolorway]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-logocolorway]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.logoColorway = btn.dataset.logocolorway;
      updateLogoPlayground();
    });
  });

  const clearSpaceToggle = document.getElementById('clearspace-toggle');
  if (clearSpaceToggle) {
    clearSpaceToggle.addEventListener('click', () => {
      state.logoClearSpace = !state.logoClearSpace;
      clearSpaceToggle.classList.toggle('active', state.logoClearSpace);
      updateLogoPlayground();
    });
  }

  if (sizeSlider) {
    sizeSlider.addEventListener('input', (e) => {
      state.logoScale = parseInt(e.target.value);
      updateLogoPlayground();
    });
  }

  if (downloadLogoBtn) {
    downloadLogoBtn.addEventListener('click', () => {
      const svgKey = getOfficialSvgKey();
      const rawSvg = OFFICIAL[svgKey];
      const blob = new Blob([rawSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = svgKey;
      a.click();
      URL.revokeObjectURL(url);
      showToast(`Downloaded official ${svgKey}`);
    });
  }

  updateLogoPlayground();

  // --- 9. Glossy Artboards 1–12 Showcase Section Controller ---
  const artboardGrid = document.getElementById('artboards-1-12-grid');
  const artboardModeBtns = document.querySelectorAll('.artboard-mode-btn');

  function renderArtboardGrid() {
    if (!artboardGrid) return;

    let html = '';
    for (let i = 1; i <= 12; i++) {
      html += `
        <div class="artboard-card cut-corner" data-artboard="${i}">
          <img class="artboard-card-img" src="assets/backgrounds/artboard_${i}.png" alt="Artboard ${i}" loading="lazy"/>
          
          <div class="artboard-logo-overlay" id="artboard-overlay-${i}">
            ${state.artboardOverlayMode === 'logo' ? OFFICIAL['Logo Off white.svg'] : 
              state.artboardOverlayMode === 'mark' ? OFFICIAL['Logomark Off white.svg'] : ''}
          </div>

          <div class="artboard-card-footer">
            <span class="artboard-num-badge">ARTBOARD ${i < 10 ? '0' + i : i}</span>
            <a href="assets/backgrounds/artboard_${i}.png" download class="artboard-download-icon" title="Download High-Res PNG" onclick="event.stopPropagation();">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
          </div>
        </div>
      `;
    }
    artboardGrid.innerHTML = html;

    // Attach click for lightbox zoom
    artboardGrid.querySelectorAll('.artboard-card').forEach(card => {
      card.addEventListener('click', () => {
        const i = card.dataset.artboard;
        openLightbox(`assets/backgrounds/artboard_${i}.png`, `Form & Foundry — Glossy Molten Fluted Background Artboard ${i} (1440×1080)`);
      });
    });
  }

  artboardModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      artboardModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.artboardOverlayMode = btn.dataset.overlaymode;
      renderArtboardGrid();
    });
  });
  renderArtboardGrid();

  // --- 10. Official Brand Pattern Live Visualizer ---
  const patternBg = document.getElementById('live-brand-pattern-bg');
  const patternScaleSlider = document.getElementById('pattern-scale-slider');
  const patternScaleVal = document.getElementById('pattern-scale-val');

  if (patternScaleSlider && patternBg) {
    patternScaleSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      state.patternScale = val;
      patternBg.style.backgroundSize = `${val}px`;
      if (patternScaleVal) patternScaleVal.textContent = `${val}px`;
    });
  }

  // --- 11. WCAG Contrast Calculator ---
  function getLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function getContrast(rgb1, rgb2) {
    const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  const contrastCustomFg = document.getElementById('contrast-fg');
  const contrastCustomBg = document.getElementById('contrast-bg');
  const customContrastVal = document.getElementById('custom-contrast-ratio');
  const customContrastBadge = document.getElementById('custom-contrast-badge');
  const contrastPreviewBox = document.getElementById('contrast-preview-sample');

  function hexToRgb(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  function updateContrastTest() {
    if (!contrastCustomFg || !contrastCustomBg) return;
    const fg = contrastCustomFg.value;
    const bg = contrastCustomBg.value;
    const ratio = getContrast(hexToRgb(fg), hexToRgb(bg));
    const formatted = ratio.toFixed(1) + ':1';
    customContrastVal.textContent = formatted;

    contrastPreviewBox.style.color = fg;
    contrastPreviewBox.style.backgroundColor = bg;

    if (ratio >= 7.0) {
      customContrastBadge.className = 'contrast-badge pass-aaa';
      customContrastBadge.textContent = 'Pass AAA (Enhanced)';
    } else if (ratio >= 4.5) {
      customContrastBadge.className = 'contrast-badge pass-aa';
      customContrastBadge.textContent = 'Pass AA (Standard)';
    } else if (ratio >= 3.0) {
      customContrastBadge.className = 'contrast-badge pass-aa';
      customContrastBadge.textContent = 'Pass Large Text (3:1+)';
    } else {
      customContrastBadge.className = 'contrast-badge fail';
      customContrastBadge.textContent = 'Fail WCAG (< 3.0:1)';
    }
  }

  if (contrastCustomFg && contrastCustomBg) {
    contrastCustomFg.addEventListener('input', updateContrastTest);
    contrastCustomBg.addEventListener('input', updateContrastTest);
    updateContrastTest();
  }

  // --- 12. Typography Live Sandbox ---
  const typePreview = document.getElementById('type-preview-text');
  const fontSelect = document.getElementById('font-select');
  const weightSelect = document.getElementById('weight-select');
  const sizeInput = document.getElementById('type-size-slider');
  const trackingInput = document.getElementById('type-tracking-slider');
  const caseSelect = document.getElementById('case-select');
  const copyTypeCssBtn = document.getElementById('copy-type-css-btn');

  function updateTypeSandbox() {
    if (!typePreview) return;
    typePreview.style.fontFamily = state.typeFamily;
    typePreview.style.fontWeight = state.typeWeight;
    typePreview.style.fontSize = `${state.typeSize}px`;
    typePreview.style.letterSpacing = `${state.typeTracking}em`;
    typePreview.style.textTransform = state.typeCase;
  }

  if (fontSelect) {
    fontSelect.addEventListener('change', (e) => {
      state.typeFamily = e.target.value;
      updateTypeSandbox();
    });
  }

  if (weightSelect) {
    weightSelect.addEventListener('change', (e) => {
      state.typeWeight = e.target.value;
      updateTypeSandbox();
    });
  }

  if (sizeInput) {
    sizeInput.addEventListener('input', (e) => {
      state.typeSize = e.target.value;
      document.getElementById('type-size-display').textContent = `${e.target.value}px`;
      updateTypeSandbox();
    });
  }

  if (trackingInput) {
    trackingInput.addEventListener('input', (e) => {
      state.typeTracking = e.target.value;
      document.getElementById('type-tracking-display').textContent = `${e.target.value}em`;
      updateTypeSandbox();
    });
  }

  if (caseSelect) {
    caseSelect.addEventListener('change', (e) => {
      state.typeCase = e.target.value;
      updateTypeSandbox();
    });
  }

  if (copyTypeCssBtn) {
    copyTypeCssBtn.addEventListener('click', () => {
      const css = `font-family: '${state.typeFamily}', sans-serif;\nfont-weight: ${state.typeWeight};\nfont-size: ${state.typeSize}px;\nletter-spacing: ${state.typeTracking}em;\ntext-transform: ${state.typeCase};`;
      copyText(css, 'CSS copied');
    });
  }
  updateTypeSandbox();

  // --- 13. Photography Filter & Lightbox ---
  const photoTabs = document.querySelectorAll('.gallery-filter-tab');
  const photoCards = document.querySelectorAll('.photo-card');

  photoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      photoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      photoCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  photoCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.querySelector('.photo-caption') ? card.querySelector('.photo-caption').textContent : '';
      openLightbox(img.src, caption);
    });
  });

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  document.getElementById('lightbox-close-btn').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // --- 14. Master 42-Page Guideline Slide Inspector ---
  const mainSlideImg = document.getElementById('slide-main-img');
  const slidePagePill = document.getElementById('slide-page-num');
  const slideTitle = document.getElementById('slide-title');
  const slideChangeNote = document.getElementById('slide-change-note');
  const slideBlocks = document.getElementById('slide-content-blocks');
  const pageDropdown = document.getElementById('slide-page-select');
  const prevBtn = document.getElementById('slide-prev-btn');
  const nextBtn = document.getElementById('slide-next-btn');
  const thumbScroller = document.getElementById('thumbnail-scroller');

  if (thumbScroller) {
    thumbScroller.innerHTML = DATA.pages.map(p => `
      <div class="thumb-item ${p.page === 1 ? 'active' : ''}" data-page="${p.page}" title="Page ${p.page}: ${p.title}">
        <img src="${p.image}" alt="Page ${p.page}" loading="lazy"/>
        <div class="thumb-page-badge">${p.page}</div>
      </div>
    `).join('');

    thumbScroller.querySelectorAll('.thumb-item').forEach(item => {
      item.addEventListener('click', () => {
        selectPage(parseInt(item.dataset.page));
      });
    });
  }

  if (pageDropdown) {
    pageDropdown.innerHTML = DATA.pages.map(p => `
      <option value="${p.page}">Page ${p.page}: ${p.title.slice(0, 40)}</option>
    `).join('');

    pageDropdown.addEventListener('change', (e) => {
      selectPage(parseInt(e.target.value));
    });
  }

  function selectPage(pageNum) {
    if (pageNum < 1) pageNum = DATA.pages.length;
    if (pageNum > DATA.pages.length) pageNum = 1;
    state.currentPage = pageNum;

    const pageData = DATA.pages.find(p => p.page === pageNum);
    if (!pageData) return;

    mainSlideImg.src = pageData.image;
    slidePagePill.textContent = `Page ${pageData.page} of ${DATA.pages.length}`;
    slideTitle.textContent = pageData.title;

    if (pageData.change_note) {
      slideChangeNote.style.display = 'block';
      slideChangeNote.innerHTML = `<strong>Illustrator Rebuild Note:</strong> ${pageData.change_note}`;
    } else {
      slideChangeNote.style.display = 'none';
    }

    if (pageData.blocks && pageData.blocks.length > 0) {
      slideBlocks.innerHTML = pageData.blocks.map(b => `
        <div class="inspector-block-item">
          <div class="inspector-block-label">${b.label}</div>
          <div class="inspector-block-text">${b.text.replace(/\n/g, '<br>')}</div>
        </div>
      `).join('');
    } else {
      slideBlocks.innerHTML = `
        <div style="color:var(--text-muted);font-style:italic;padding:1rem 0;">
          Visual-only artboard. No text alterations recorded.
        </div>
      `;
    }

    if (pageDropdown) pageDropdown.value = pageNum;

    if (thumbScroller) {
      const thumbs = thumbScroller.querySelectorAll('.thumb-item');
      thumbs.forEach(t => {
        const isActive = parseInt(t.dataset.page) === pageNum;
        t.classList.toggle('active', isActive);
        if (isActive) {
          t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => selectPage(state.currentPage - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => selectPage(state.currentPage + 1));
  selectPage(1);

  if (mainSlideImg) {
    mainSlideImg.addEventListener('click', () => {
      openLightbox(mainSlideImg.src, `Form & Foundry Master Brand Guideline — Page ${state.currentPage}`);
    });
  }

  // --- 15. Rebuild Decisions Tabs ---
  const decisionTabs = document.querySelectorAll('.decision-tab-btn');
  const decisionDetail = document.getElementById('decision-detail-container');

  function renderDecision(index) {
    const d = DATA.decisions[index];
    if (!d || !decisionDetail) return;

    decisionTabs.forEach((tab, i) => tab.classList.toggle('active', i === index));

    decisionDetail.innerHTML = `
      <div style="background-color:var(--bg-secondary);padding:2rem;border-radius:var(--radius-md);border-left:4px solid var(--color-orange);margin-bottom:1.5rem;">
        <span class="card-label">Official Illustrator Rebuild Recommendation</span>
        <h4 style="font-size:1.4rem;font-weight:800;margin:0.5rem 0 1rem;">${d.title}</h4>
        <p style="font-size:1.05rem;line-height:1.6;color:var(--text-primary);">${d.recommendation}</p>
      </div>
      <div>
        <h5 style="font-size:0.85rem;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.06em;margin-bottom:1rem;">Evaluated Alternatives:</h5>
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          ${d.alternatives.map(alt => `
            <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-color);padding:1rem 1.25rem;border-radius:var(--radius-sm);font-size:0.9375rem;color:var(--text-secondary);line-height:1.5;">
              <strong style="color:var(--color-orange);">Alternative:</strong> ${alt}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  decisionTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => renderDecision(i));
  });
  renderDecision(0);

  // --- 16. Brand Voice Tone Simulator ---
  const voiceSliders = document.querySelectorAll('.tone-slider');
  const dynamicVoiceSample = document.getElementById('dynamic-voice-sample');

  function updateVoiceSample() {
    if (!dynamicVoiceSample) return;
    const v1 = parseInt(document.getElementById('slider-formal-casual').value);
    const v2 = parseInt(document.getElementById('slider-serious-energetic').value);

    let copy = "";
    if (v1 > 60 && v2 > 60) {
      copy = "“We forge brands with zero fluff. No corporate theater, no 80-page decks that collect dust. Strategy that ships, and design that punches above its weight.”";
    } else if (v1 < 40 && v2 < 40) {
      copy = "“Form & Foundry delivers comprehensive strategic identity architecture and growth advisory services for established institutions requiring methodological excellence.”";
    } else if (v1 > 60 && v2 <= 50) {
      copy = "“We build brands founders actually use. Practical, grounded in clear market strategy, and made without pretense.”";
    } else {
      copy = "“We forge brands with enough clarity to be understood in seconds, and enough craft to be remembered for years.”";
    }
    dynamicVoiceSample.textContent = copy;
  }

  voiceSliders.forEach(slider => {
    slider.addEventListener('input', updateVoiceSample);
  });

  // --- 17. Vocabulary Filter ---
  const vocabSearch = document.getElementById('vocab-search');
  const vocabItems = document.querySelectorAll('.vocab-row');

  if (vocabSearch) {
    vocabSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      vocabItems.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  console.log('Form & Foundry Master Brand Portal Initialized with Official Vector Logos and Glossy Artboards 1-12.');
});
