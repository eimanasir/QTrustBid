# QTrustBid Design System - Part 8
## Interactions & Animations

---

## 9. INTERACTIONS & MOTION DESIGN

### 9.1 Animation Principles

#### Core Principles
1. **Purposeful**: Every animation serves a functional purpose
2. **Subtle**: Enhance, don't distract (prefer 200-300ms durations)
3. **Consistent**: Use same easing curves throughout
4. **Performant**: Use transform and opacity for smooth 60fps
5. **Respectful**: Honor prefers-reduced-motion settings

#### Easing Curves
- **Ease Out Cubic**: `cubic-bezier(0.33, 1, 0.68, 1)` - Elements entering
- **Ease In Cubic**: `cubic-bezier(0.32, 0, 0.67, 0)` - Elements exiting
- **Ease In Out Cubic**: `cubic-bezier(0.65, 0, 0.35, 1)` - State changes
- **Spring**: For playful interactions (AI recommendations, success states)

---

### 9.2 Component Interactions

#### Button Interactions
**Hover State**:
- Duration: 200ms
- Easing: ease-out
- Transform: scale(1.02)
- Shadow: Elevation increase (0 → 4px blur)
- Background: 10% darker

**Active/Click State**:
- Duration: 100ms
- Easing: ease-in
- Transform: scale(0.98)
- Shadow: Elevation decrease

**Loading State**:
- Spinner animation: 800ms linear infinite
- Button text fades to 0.6 opacity
- Cursor: not-allowed

**Code Example**:
```css
.btn-primary {
  transition: all 0.2s cubic-bezier(0.33, 1, 0.68, 1);
}

.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.btn-primary:active {
  transform: scale(0.98);
  transition-duration: 0.1s;
}
```

---

### 9.3 Page Transitions

#### Screen Enter Animation
**Duration**: 300ms
**Easing**: ease-out
**Effect**: Fade + Slide Up
