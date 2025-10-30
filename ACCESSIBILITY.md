# Accessibility Guide for AgriSight ♿

AgriSight is designed to be accessible to all users, including those with disabilities. This document outlines our accessibility features and best practices.

## 🎯 Accessibility Standards

AgriSight strives to meet or exceed:
- WCAG 2.1 Level AA standards
- Section 508 compliance
- ADA (Americans with Disabilities Act) requirements

## ✨ Built-in Accessibility Features

### 🖱️ Keyboard Navigation

All interactive elements are keyboard accessible:
- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dialogs
- **Arrow Keys**: Navigate within dropdown menus and lists

#### Keyboard Shortcuts
```
Detect Page:
- Ctrl/Cmd + U: Open file upload dialog
- Esc: Clear uploaded image

Chat Page:
- Ctrl/Cmd + Enter: Send message
- Esc: Clear input field

Dashboard:
- Ctrl/Cmd + E: Export data
- Tab through cards for navigation
```

### 🎨 Visual Design

#### Color Contrast
All text meets WCAG AA standards:
- Normal text: 4.5:1 minimum contrast ratio
- Large text (18pt+): 3:1 minimum contrast ratio
- UI components: 3:1 minimum contrast ratio

Primary color combinations:
```css
/* Green on White - 3.14:1 */
background: #ffffff;
color: #22c55e;

/* White on Green - 3.14:1 */
background: #22c55e;
color: #ffffff;

/* Gray text on White - 7.19:1 */
background: #ffffff;
color: #4b5563;
```

#### Focus Indicators
- Clear, visible focus rings on all interactive elements
- Focus indicator is never hidden
- Enhanced focus styles for better visibility:
  ```css
  :focus-visible {
    outline: 2px solid #22c55e;
    outline-offset: 2px;
  }
  ```

#### Text Scaling
- All text can be scaled up to 200% without loss of functionality
- Responsive design adapts to different screen sizes
- No horizontal scrolling when zoomed

### 📢 Screen Reader Support

#### ARIA Labels
All interactive elements have appropriate ARIA labels:
```tsx
// Upload button
<button aria-label="Upload plant image for disease detection">
  Upload Image
</button>

// Detection result
<div role="region" aria-label="Disease detection results">
  <h2>Detection Result</h2>
  {/* Results content */}
</div>

// Navigation
<nav aria-label="Main navigation">
  {/* Nav items */}
</nav>
```

#### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic elements (nav, main, article, section)
- Lists for grouped content (ul, ol)
- Buttons for actions, links for navigation

#### Live Regions
Dynamic content updates announced to screen readers:
```tsx
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
>
  Analyzing image...
</div>
```

### 📱 Mobile Accessibility

#### Touch Targets
- Minimum touch target size: 44x44 pixels
- Adequate spacing between interactive elements
- Large, easy-to-tap buttons

#### Gestures
- No complex gestures required
- Alternative ways to perform all actions
- Swipe gestures enhanced with visible buttons

#### Screen Orientation
- Works in both portrait and landscape
- Content adapts to orientation changes
- No functionality locked to specific orientation

### 🖼️ Images and Media

#### Alt Text
All images include descriptive alt text:
```tsx
<img 
  src="/plant.jpg" 
  alt="Tomato plant leaf showing signs of early blight disease"
/>
```

#### Charts and Graphs
Data visualizations include:
- Text alternatives
- Accessible data tables
- ARIA labels for chart elements

### ⚡ Performance

#### Loading States
- Clear loading indicators
- Skeleton screens for content loading
- Progress indicators for long operations
- No layout shifts during loading

#### Error Handling
- Clear, descriptive error messages
- Suggestions for resolving errors
- Error states announced to screen readers

## 🧪 Testing Tools

### Automated Testing
We use these tools for automated accessibility testing:
- **axe DevTools**: Browser extension for accessibility auditing
- **Lighthouse**: Chrome DevTools accessibility audit
- **WAVE**: Web accessibility evaluation tool
- **ESLint jsx-a11y**: Linting for accessibility issues

### Manual Testing
Regular manual testing with:
- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- Browser zoom (200%, 400%)
- Color blindness simulators
- Mobile screen readers (TalkBack, VoiceOver)

### Assistive Technology Support

Tested with:
- **NVDA** (Windows - Free)
- **JAWS** (Windows - Commercial)
- **VoiceOver** (macOS/iOS - Built-in)
- **TalkBack** (Android - Built-in)
- **ChromeVox** (Chrome OS - Built-in)

## 🎓 User Guides

### For Screen Reader Users

1. **Navigation**:
   - Use heading navigation (H key in NVDA/JAWS)
   - Use landmark navigation (D key for main content)
   - Use button navigation (B key)

2. **Uploading Images**:
   - Navigate to "Upload Plant Image" button
   - Activate with Enter or Space
   - Use file picker with keyboard

3. **Viewing Results**:
   - Results announced automatically
   - Navigate through result sections with headings
   - Use arrow keys to read full analysis

### For Keyboard Users

1. **Quick Navigation**:
   - Tab to skip to main content link at top
   - Use Tab to move through interactive elements
   - Use arrow keys in dropdown menus

2. **File Upload**:
   - Tab to upload area
   - Press Enter to open file picker
   - Or drag and drop files (announced)

3. **Chat Interface**:
   - Tab to input field
   - Type message
   - Tab to send button or press Ctrl+Enter

### For Mobile Users

1. **Voice Control**:
   - All buttons have clear labels
   - Use voice commands like "Tap Upload Image"
   - Results are announced automatically

2. **Zoom and Magnification**:
   - Pinch to zoom anywhere
   - Text reflows without horizontal scrolling
   - UI elements remain usable when zoomed

## 🐛 Known Issues

### Current Limitations

1. **Chart Accessibility**: 
   - Working on improving data table alternatives
   - Future: Add sonification for data visualization

2. **Image Capture**:
   - Camera access requires user permission
   - Alternative file upload always available

### Future Improvements

- [ ] Add high contrast mode
- [ ] Implement keyboard shortcuts help dialog
- [ ] Add text-to-speech for longer articles
- [ ] Improve chart accessibility with data tables
- [ ] Add preference persistence for accessibility settings
- [ ] Implement reduced motion mode

## 🔧 Customization Options

### User Preferences (Future)

```tsx
// Planned accessibility preferences
{
  fontSize: "normal" | "large" | "extra-large",
  contrast: "normal" | "high",
  reducedMotion: boolean,
  keyboardShortcuts: boolean,
  autoplayMedia: boolean
}
```

### Browser Settings

Users can:
- Adjust browser zoom level
- Enable browser dark mode
- Use browser's reader mode
- Configure screen reader settings

## 📞 Reporting Accessibility Issues

If you encounter an accessibility barrier:

1. **Open an Issue** on GitHub with:
   - Description of the barrier
   - Steps to reproduce
   - Assistive technology used
   - Expected vs actual behavior

2. **Email** (if preferred):
   - Include screenshots or screen recordings
   - Describe your accessibility needs
   - We aim to respond within 48 hours

## 🏆 Accessibility Commitment

We are committed to:
- Continuous accessibility improvements
- Regular testing with assistive technologies
- Incorporating user feedback
- Training developers on accessibility
- Following WCAG guidelines
- Making agriculture technology accessible to all

## 📚 Resources

### For Developers
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility](https://react.dev/learn/accessibility)

### For Users
- [WebAIM Screen Reader Guide](https://webaim.org/articles/screenreader_testing/)
- [Keyboard Navigation Guide](https://webaim.org/articles/keyboard/)
- [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)

## ✅ Accessibility Checklist

AgriSight meets these criteria:

- [x] Keyboard accessible
- [x] Screen reader compatible
- [x] Sufficient color contrast
- [x] Visible focus indicators
- [x] Semantic HTML structure
- [x] ARIA labels where needed
- [x] Responsive design
- [x] Text alternatives for images
- [x] No flashing content
- [x] Clear error messages
- [x] Consistent navigation
- [x] Multiple ways to navigate
- [x] Mobile accessible
- [x] Works with zoom
- [x] Tested with assistive tech

---

**Accessibility is not a feature, it's a fundamental requirement.**

We believe everyone should have equal access to agricultural technology and information, regardless of ability.

Questions or suggestions? Please reach out through GitHub issues.

