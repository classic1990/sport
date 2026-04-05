# SportCut Design System v2.0
## HDR Dark Theme with 3D Layer Architecture

---

## 🎨 Color Palette

### Primary Colors (HDR Enhanced)
```css
/* Base Dark */
--color-bg-primary: #0a0a0f;      /* Deep void black */
--color-bg-secondary: #12121a;    /* Elevated dark */
--color-bg-tertiary: #1a1a25;     /* Card surfaces */

/* HDR Accents - High vibrancy */
--color-accent-gold: #ffd700;      /* HDR Gold - main CTA */
--color-accent-gold-glow: rgba(255, 215, 0, 0.4);
--color-accent-red: #ff3366;       /* HDR Red - danger/actions */
--color-accent-red-glow: rgba(255, 51, 102, 0.4);
--color-accent-cyan: #00f0ff;      /* HDR Cyan - info/highlights */
--color-accent-cyan-glow: rgba(0, 240, 255, 0.3);
--color-accent-purple: #b829dd;    /* HDR Purple - premium */
--color-accent-purple-glow: rgba(184, 41, 221, 0.4);

/* Neutral Scale */
--color-text-primary: #ffffff;
--color-text-secondary: rgba(255, 255, 255, 0.7);
--color-text-tertiary: rgba(255, 255, 255, 0.5);
--color-border-subtle: rgba(255, 255, 255, 0.1);
--color-border-medium: rgba(255, 255, 255, 0.2);
```

---

## 🏗️ 3D Layer Architecture

### Layer Stack (z-index system)
```
Z-0:  Background layers (gradients, meshes)
Z-10: Base content layer
Z-20: Cards and containers
Z-30: Floating elements, modals backdrop
Z-40: Modals, popovers
Z-50: Toasts, notifications
Z-60: Overlays, loading screens
```

### Depth System (CSS Variables)
```css
/* 3D Transform Presets */
--depth-sm: translateZ(10px);
--depth-md: translateZ(20px);
--depth-lg: translateZ(40px);
--depth-xl: translateZ(60px);

/* Perspective Container */
perspective: 1000px;
transform-style: preserve-3d;
```

---

## 🎭 Material Effects

### 1. Glassmorphism (Premium Cards)
```css
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 8px 32px 0 rgba(0, 0, 0, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### 2. Metal/Chrome (Buttons, Headers)
```css
.metal-surface {
  background: linear-gradient(
    180deg,
    #2a2a3a 0%,
    #1a1a25 50%,
    #12121a 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3);
}
```

### 3. Neon Glow (HDR Highlights)
```css
.neon-gold {
  box-shadow:
    0 0 5px var(--color-accent-gold),
    0 0 10px var(--color-accent-gold),
    0 0 20px var(--color-accent-gold-glow),
    0 0 40px var(--color-accent-gold-glow);
}

.neon-cyan {
  box-shadow:
    0 0 5px var(--color-accent-cyan),
    0 0 20px var(--color-accent-cyan-glow);
}
```

---

## 📐 Typography System

### Font Stack
```css
--font-display: 'Inter', 'SF Pro Display', system-ui, sans-serif;
--font-body: 'Inter', 'SF Pro Text', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale (with 3D depth)
```css
/* Hero - Massive impact */
.text-hero {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.5),
    0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Section Headers */
.text-h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Card Titles with depth */
.text-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

---

## ✨ Animation System

### Micro-interactions
```css
/* Hover Lift Effect */
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-4px) translateZ(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* Shine Effect (on hover) */
.shine-effect {
  position: relative;
  overflow: hidden;
}
.shine-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}
.shine-effect:hover::before {
  left: 150%;
}

/* Pulse Glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px var(--color-accent-gold-glow); }
  50% { box-shadow: 0 0 40px var(--color-accent-gold); }
}
```

### 3D Transform Animations
```css
/* Card Flip */
.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-3d:hover {
  transform: rotateY(5deg) rotateX(-5deg) translateZ(20px);
}

/* Floating Animation */
@keyframes float {
  0%, 100% { transform: translateY(0) translateZ(0); }
  50% { transform: translateY(-10px) translateZ(10px); }
}
```

---

## 🎯 Component Patterns

### Hero Section
- Full viewport height
- Layered gradient background (animated mesh)
- 3D floating elements
- HDR text with glow effects

### Cards (Team/League)
- Glassmorphism base
- Metal header strip
- Hover: lift + shine + border glow
- Image with preserve-3d

### Buttons
- Primary: Gold gradient + neon glow
- Secondary: Metal surface + subtle border
- Danger: Red neon + pulse animation

### Navigation
- Floating glass bar
- Blur backdrop
- Active state: underline glow

### Modals/Overlays
- Dark backdrop with blur
- Glass container
- Slide + fade animation
- HDR accent borders

---

## 🌊 Background Effects

### Animated Mesh Gradient
```css
.mesh-gradient {
  background: 
    radial-gradient(at 40% 20%, rgba(255, 215, 0, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(0, 240, 255, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(184, 41, 221, 0.1) 0px, transparent 50%),
    radial-gradient(at 80% 50%, rgba(255, 51, 102, 0.08) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(255, 215, 0, 0.1) 0px, transparent 50%);
  animation: mesh-move 20s ease infinite;
}
```

### Noise Texture Overlay
```css
.noise-overlay::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

---

## 📱 Responsive 3D Adjustments

### Mobile (< 768px)
- Reduce perspective depth by 50%
- Simplify glass effects (performance)
- Disable complex hover animations
- Touch-optimized interactions

### Tablet (768px - 1024px)
- Moderate depth effects
- Simplified parallax

### Desktop (> 1024px)
- Full 3D effects
- Complex animations
- HDR glow at full intensity

---

## 🔧 Implementation Order

1. **Phase 1: Foundation**
   - Set up CSS variables
   - Create base dark theme
   - Implement glass/metal utilities

2. **Phase 2: Components**
   - Redesign cards with 3D effects
   - Update buttons with HDR accents
   - Navigation glass effect

3. **Phase 3: Animation**
   - Micro-interactions
   - Page transitions
   - Loading states

4. **Phase 4: Polish**
   - Background effects
   - Noise texture
   - Performance optimization

---

## ⚡ Performance Guidelines

- Use `will-change` sparingly on animated elements
- Prefer `transform` and `opacity` for animations
- Use CSS containment where possible
- Lazy load complex 3D effects
- Provide `prefers-reduced-motion` alternatives
