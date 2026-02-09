# Responsive Design Checklist

Use this checklist before starting any UI work and when reviewing designs. This project uses **mobile-first** responsive design for all features.

## Before Starting UI Work

- [ ] **Mobile-first:** Start with mobile layout (no breakpoint prefix = mobile)
- [ ] **Build order:** Mobile experience first, then enhance for larger screens
- [ ] **Breakpoints:** default (mobile), `md:` 768px+, `lg:` 1024px+
- [ ] **Never:** Build desktop-first and add mobile as an afterthought

## Design Review (Check FIRST)

### Responsive Design
- [ ] **Mobile-first approach used** (no-prefix classes for mobile, breakpoint prefixes for larger)
- [ ] **All three layouts considered:** Mobile (default), Tablet (md), Desktop (lg)
- [ ] **Spacing scales consistently:** e.g. `p-4 md:p-5 lg:p-6`
- [ ] **Typography scales consistently:** e.g. `text-xs md:text-sm`
- [ ] **Touch targets minimum 44x44px** on mobile (e.g. `h-11` for buttons)
- [ ] **Tested at key sizes:** 375px (mobile), 768px (tablet), 1024px (desktop)
- [ ] **No horizontal scroll** at any breakpoint
- [ ] **Content prioritized** for mobile (most important content first)

### Accessibility
- [ ] Keyboard accessible (tab through entire interface)
- [ ] Screen reader friendly (test with VoiceOver/NVDA)
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators visible on all interactive elements

### Device Testing
- [ ] Test on actual mobile device (not just DevTools)
- [ ] Test in both portrait and landscape
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)

## Quick Reference

- **Tailwind breakpoints:** default, `sm:` 640px, `md:` 768px, `lg:` 1024px, `xl:` 1280px, `2xl:` 1536px
- **Key breakpoints for this project:** default (mobile), `md:` (tablet), `lg:` (desktop)
- **UI guidelines:** `.cursor/rules/ui-design-guidelines.mdc` (full patterns and examples)
