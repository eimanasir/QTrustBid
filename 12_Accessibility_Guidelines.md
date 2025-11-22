# QTrustBid Design System - Part 12
## Accessibility Guidelines

---

## 13. ACCESSIBILITY (WCAG 2.1 AA Compliance)

### 13.1 Color Contrast Requirements

#### Text Contrast Ratios
**Normal Text (< 18px)**:
- Minimum ratio: 4.5:1
- Light mode: `#1A1A1A` on `#FFFFFF` = 16.1:1 ✓
- Dark mode: `#E0E0E0` on `#1A1A1A` = 11.4:1 ✓

**Large Text (≥ 18px or 14px bold)**:
- Minimum ratio: 3:1
- All heading combinations meet this requirement

**UI Components**:
- Buttons, borders, icons: 3:1 minimum
- Primary button: `#2196F3` on `#FFFFFF` = 3.1:1 ✓
- Focus indicators: High contrast, 3:1 minimum

#### Color-Blind Friendly
- Never rely on color alone for information
- Use icons + text labels
- Patterns/textures for charts
- Status indicators use shape + color:
  - Success: Green + checkmark ✓
  - Error: Red + X icon ✗
  - Warning: Orange + exclamation !
  - Info: Blue + i icon ℹ

---

### 13.2 Keyboard Navigation

#### Focus Management
**Focus Indicator**:
- Visible outline: 2px solid primary color
- Offset: 2px from element
- Border radius: matches element
- Never remove focus styles

**Tab Order**:
1. Skip to main content link (first tab)
2. Logo/home link
3. Main navigation (left to right)
4. Search bar
5. User menu
6. Main content (top to bottom, left to right)
7. Footer links

**Keyboard Shortcuts**:
- `/` - Focus search bar
- `Esc` - Close modals/dropdowns
- `Enter` - Activate buttons/links
- `Space` - Toggle checkboxes
- `Arrow keys` - Navigate lists/carousels
- `Tab` - Next focusable element
- `Shift + Tab` - Previous focusable element

---

### 13.3 Screen Reader Support

#### Semantic HTML
```html
<!-- Use proper heading hierarchy -->
<h1>Property Listing</h1>
  <h2>Filters</h2>
  <h2>Results</h2>
    <h3>Property Title</h3>

<!-- Landmark regions -->
<header role="banner">
<nav role="navigation" aria-label="Main">
<main role="main">
<aside role="complementary" aria-label="Filters">
<footer role="contentinfo">
```
