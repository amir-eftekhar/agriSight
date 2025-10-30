# Contributing to AgriSight 🌱

Thank you for your interest in contributing to AgriSight! This document provides guidelines and instructions for contributing to the project.

## 🎯 Project Goals

AgriSight aims to:
- Help farmers detect plant diseases early
- Provide accessible agricultural education
- Support sustainable farming practices
- Leverage AI for social good

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS, etc.)

### Suggesting Features

For feature suggestions:
- Check existing issues first
- Describe the feature and its use case
- Explain why it would benefit users
- Consider implementation complexity

### Code Contributions

1. **Fork the Repository**
   ```bash
   git fork https://github.com/yourusername/agrisight
   cd agrisight
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the code style guidelines
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation

4. **Test Your Changes**
   ```bash
   npm run dev
   # Test thoroughly in the browser
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots if UI changes
   - Wait for review

## 📝 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Prefer `const` over `let`
- Use meaningful variable names

```typescript
// Good
const handleImageUpload = async (file: File) => {
  // ...
};

// Avoid
const f = async (x: any) => {
  // ...
};
```

### React Components

- One component per file
- Use descriptive component names
- Include prop types
- Add JSDoc comments for complex components

```typescript
/**
 * ResultCard component displays disease detection results
 * @param result - Detection result from ML model
 * @param aiAnalysis - AI-generated analysis text
 */
export default function ResultCard({ result, aiAnalysis }: ResultCardProps) {
  // ...
}
```

### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use semantic color names

```tsx
// Good
<div className="flex items-center space-x-4 md:space-x-6">

// Avoid
<div className="flex items-center" style={{ gap: '20px' }}>
```

## 🧪 Testing Guidelines

- Test all user interactions
- Verify responsive design
- Check accessibility
- Test with different image formats
- Verify API error handling

## 📚 Documentation

When adding features:
- Update README.md
- Add JSDoc comments
- Update SETUP.md if needed
- Include inline code comments for complex logic

## 🎨 Design Guidelines

- Follow Material Design principles
- Use consistent color palette
- Maintain visual hierarchy
- Ensure minimum touch target size (44x44px)
- Use animations sparingly

### Color Palette

```css
Primary: #22c55e (green-600)
Secondary: #10b981 (emerald-500)
Background: #f0fdf4 (green-50)
Text: #1f2937 (gray-800)
Error: #ef4444 (red-500)
```

## ♿ Accessibility Requirements

All contributions must:
- Include ARIA labels
- Support keyboard navigation
- Maintain color contrast ratios (WCAG AA)
- Work with screen readers
- Include focus indicators

## 🔒 Security

- Never commit API keys
- Validate all user inputs
- Sanitize data before displaying
- Use parameterized queries
- Follow OWASP guidelines

## 📦 Dependencies

When adding dependencies:
- Explain why it's needed
- Check bundle size impact
- Ensure it's actively maintained
- Verify license compatibility

## 🌍 Internationalization

When adding text content:
- Add entries to `lib/translations.ts`
- Include both English and Spanish
- Use translation keys, not hardcoded text

```typescript
// Good
<h1>{t('heroTitle', language)}</h1>

// Avoid
<h1>Detect Plant Diseases Early with AI</h1>
```

## 🚀 Performance

- Optimize images before uploading
- Use lazy loading for images
- Minimize bundle size
- Avoid unnecessary re-renders
- Use React.memo for expensive components

## 📋 Pull Request Checklist

Before submitting:
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] Accessibility verified
- [ ] Works in major browsers

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [Web Accessibility](https://www.w3.org/WAI/fundamentals/)

## 💬 Communication

- Be respectful and constructive
- Explain your reasoning
- Accept feedback gracefully
- Help others learn

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Acknowledged in the project

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Every contribution, no matter how small, helps make AgriSight better for farmers and students around the world!

---

Questions? Open an issue or reach out to the maintainers.

