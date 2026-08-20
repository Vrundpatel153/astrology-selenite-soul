# Selenite Soul — Awwwards-Caliber Upgrade Checklist

Inspired by [Astrology & Numerology (Awwwards Honorable Mention)](https://www.awwwards.com/sites/astrology-numerology#elements).

---

## ✦ Core Design Pillars
1. **Bespoke Mystical Art & Visuals**: Golden sacred geometry, concentric celestial orbits, gold foil tarot and zodiac illustrations.
2. **Interactive Awwwards-Caliber Micro-Interactions**:
   - Interactive 3D Tarot card deck with realistic flip/draw animations & spread reveals.
   - Interactive Celestial Zodiac Wheel & element-coded cosmic explorer with drag/wheel rotation.
   - Pythagorean Numerology step-by-step calculator with animated number breakdowns and master number highlights.
   - Kundali / Vedic Jyotish mandala explorer with planetary glyphs and house alignments.
3. **Typography & Layout**:
   - Elegant Playfair Display italics paired with tracked uppercase subheadings and clean mono coordinates.
   - High-contrast, editorial magazine layouts with responsive luxury styling on both PC & Mobile.
4. **Performance & Clean Code**:
   - Pure WebP image assets for ultra-fast loading.
   - Zero hydration errors (no nested `<a>` elements).
   - Fluid GSAP ScrollTrigger transitions and Lenis smooth momentum scrolling.

---

## 📋 Comprehensive Upgrade Task Checklist

### Phase 1: Interactive Celestial Components
- [x] Generate luxury Tarot card back (`public/tarot-card-back.webp`)
- [x] Generate Major Arcana cards (`The Sun`, `The High Priestess`, `The Star`, `The Magician`, `Wheel of Fortune`)
- [x] Generate Zodiac celestial wheel artwork (`public/zodiac-wheel-artwork.webp`)
- [x] Build **`InteractiveTarotDeck.tsx`** (Astrala-Inspired 3D Curved Arc & Deck Fan):
  - [x] Horizontal 3D fanned arc deck with dynamic rotation and curved elevation
  - [x] Pick-and-place interactive dealing animation (from fan into spread slots)
  - [x] 3D Card Flip animation (`rotateY(180deg)`) with realistic shadow depth & perspective
  - [x] Single Daily Card Draw & 3-Card Past/Present/Future Spread
  - [x] Card revelation modal with intuitive meanings, affirmations & crystal recommendations
  - [x] Interactive shuffle and reveal controls
- [x] Build **`InteractiveZodiacWheel.tsx`**:
  - [x] Concentric rotating celestial rings with continuous orbit motion
  - [x] Interactive 12-sign dial selector (Aries to Pisces)
  - [x] Instant breakdown: Element, Modality, Ruling Planet, Crystal Ally, Shadow & Light traits
  - [x] Direct link to curated crystal prescription for selected sign
- [x] Build **`InteractiveNumerologyMatrix.tsx`**:
  - [x] Real-time name and birthdate decoder
  - [x] Animated calculation steps (Letter values → Reduction → Destiny / Life Path)
  - [x] Master Numbers (11, 22, 33) highlighted with golden celestial aura
  - [x] In-depth archetype dossier with soul mission and crystal remedies

### Phase 2: Page-by-Page Awwwards Level Refactor
- [x] **Home Page (`src/views/Home.tsx`)**:
  - [x] Integrated `InteractiveTarotDeck` preview in Tarot section
  - [x] Integrated `InteractiveZodiacWheel` in Astrology section
  - [x] Integrated `InteractiveNumerologyMatrix` in Numerology section
  - [x] Enhanced Ekta's Story, Brand Philosophy, and Kundali sections with golden geometry
  - [x] Verified zero console hydration errors and zero cheap star symbols
- [x] **Tarot Portal (`src/views/Tarot.tsx`)**:
  - [x] Full-featured 3D interactive reading suite (Daily Card & 3-Card spread)
  - [x] Major Arcana guide with flip cards
  - [x] Luxury booking consultation flow with time slot selection
- [x] **Numerology Portal (`src/views/Numerology.tsx`)**:
  - [x] Full interactive Pythagorean matrix & compatibility analyzer
  - [x] Life Path + Name Number calculator with real-time reduction visualization
  - [x] Crystal remedies matching for each numerology vibration
- [x] **Kundali Portal (`src/views/Kundali.tsx`)**:
  - [x] Elevated chart visualization with animated concentric mandala
  - [x] Clean, high-contrast What You Receive cards and Dasha timeline breakdown
- [x] **Shop & Product Carousels (`ShopByAstrologyCarousel.tsx`, `TabbedProductCarousel.tsx`)**:
  - [x] Clean, responsive product cards with quick-add micro-interaction
  - [x] Gold foil badges, high-contrast prices, and smooth drag-scroll

### Phase 3: Final Optimization & Verification
- [x] Run full `npm run typecheck`
- [x] Verify responsive layouts on Mobile (375px), Tablet (768px), and Desktop (1440px)
- [x] Ensure all local assets use `.webp`
- [x] Strictly adhere to user requirement: NO `git push` performed
