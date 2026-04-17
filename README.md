# SimpledCard ROI Calculator

A lead generation tool that calculates potential savings from using SimpledCard for expense management. Built with React + TypeScript + Vite.

## Live Demo

https://jurresimpledcard.github.io/roi-calculator-SC/

## Features

- 3-step wizard: Input → Results Preview → Email Gate
- ROI calculation based on current expense solution
- HubSpot form integration for lead capture
- Auto-deploy to GitHub Pages

## Development

```bash
npm install
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Deployment

Automatically deploys to GitHub Pages on push to `main` via GitHub Actions.

## Embedding

```html
<iframe
  src="https://jurresimpledcard.github.io/roi-calculator-SC/"
  width="100%"
  height="800"
  style="border: none;">
</iframe>
```

## Calculator Inputs

| Field | Description |
|-------|-------------|
| Medewerkers | Employees who expense more than 1x/month |
| Gemiddeld bedrag | Average expense amount per employee |
| Uren per maand | Hours spent on expense processing |
| Huidige oplossing | Current solution (3 options) |

## Solution Options & Savings

| Option | Efficiency Multiplier |
|--------|----------------------|
| Voorschot en declaratie | 0.75 (highest savings) |
| Bankpas / Creditcard | 0.65 |
| Declaratie oplossing / Tool | 0.50 |

## HubSpot Integration

Form submissions include hidden fields with calculator data:
- `calculator_employees`
- `calculator_monthly_spend`
- `calculator_hours_per_month`
- `calculator_current_solution`
- `calculator_estimated_savings`
