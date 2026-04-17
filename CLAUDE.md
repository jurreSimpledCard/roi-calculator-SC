# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SimpledCard ROI Calculator - a lead generation tool that calculates potential savings from using SimpledCard for expense management. Built with React 19 + TypeScript + Vite. Designed to be embedded via iframe on the SimpledCard WordPress marketing site.

## Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

**3-step wizard flow** managed in `Calculator.tsx`:
1. **InputForm** - Collects: employees, monthly spend, hours/month, current solution
2. **ResultsPreview** - Shows calculated savings (blurred/teaser)
3. **EmailGate** - HubSpot form to unlock full results (lead capture)

**Key files:**
- `src/utils/calculations.ts` - ROI calculation logic with SimpledCard pricing tiers
- `src/components/HubSpotForm.tsx` - Dynamic HubSpot form embed with hidden field population
- `src/components/EmailGate.tsx` - HubSpot config (portal ID, form ID, region)

**Data flow:** User inputs → `calculateROI()` → results displayed → HubSpot form captures lead + calculator data as hidden fields

## Deployment

Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to main.

**Live URL:** https://jurresimpledcard.github.io/roi-calculator-SC/

**Embed:**
```html
<iframe src="https://jurresimpledcard.github.io/roi-calculator-SC/" width="100%" height="800" style="border: none;"></iframe>
```

## HubSpot Integration

Form config in `EmailGate.tsx`. Hidden fields pass calculator data:
- `calculator_employees`
- `calculator_monthly_spend`
- `calculator_hours_per_month`
- `calculator_current_solution`
- `calculator_estimated_savings`

## Language

All UI text is in Dutch (nl-NL). Use informal "je/jouw" not formal "u/uw".
