export interface CalculatorInputs {
  employees: number;
  monthlySpend: number;
  hoursPerMonth: number;
  currentSolution: 'voorschot_declaratie' | 'bankpas_creditcard' | 'declaratie_tool';
}

export interface CalculatorResults {
  timeSavingsHours: number;
  timeSavingsCost: number;
  processSavings: number;
  totalMonthlySavings: number;
  totalYearlySavings: number;
  roi: number;
  simplecardMonthlyCost: number;
}

// Efficiency multipliers based on current solution (conservative estimates)
const EFFICIENCY_MULTIPLIERS: Record<CalculatorInputs['currentSolution'], number> = {
  voorschot_declaratie: 0.45, // Highest savings - employees pay out-of-pocket, most manual
  bankpas_creditcard: 0.35,   // Moderate savings - bank/credit cards lack expense management
  declaratie_tool: 0.25,      // Lower savings - declaration tools have some automation
};

// Constants
const HOURLY_RATE = 50; // Realistic fully-loaded cost for finance/admin staff in EUR
const PROCESS_SAVINGS_PER_EMPLOYEE = 5; // EUR per employee per month (error reduction, faster approvals)

// SimpledCard Essential + Business Accounts (DGS) pricing (as of 1-7-2025)
// Business Accounts = zakelijke rekeningen met depositogarantiestelsel
const SIMPLEDCARD_BUNDLES = [
  { maxCards: 5, price: 164, name: 'XS' },    // €159 + €5 DGS
  { maxCards: 15, price: 260, name: '1' },    // €249 + €11 DGS
  { maxCards: 25, price: 317, name: '2' },    // €299 + €18 DGS
  { maxCards: 40, price: 435, name: '3' },    // €409 + €26 DGS
  { maxCards: 60, price: 576, name: '4' },    // €539 + €37 DGS
  { maxCards: 80, price: 701, name: '5' },    // €659 + €42 DGS
  { maxCards: 100, price: 812, name: '6' },   // €759 + €53 DGS
  { maxCards: 150, price: 1183, name: '7' },  // €1099 + €84 DGS
  { maxCards: 250, price: 1905, name: '8' },  // €1779 + €126 DGS
  { maxCards: 500, price: 3168, name: '9' },  // €2989 + €179 DGS
] as const;

// Price per extra card outside bundle
const EXTRA_CARD_PRICE = 15;

function getSimplecardMonthlyCost(employees: number): number {
  // Find the smallest bundle that fits
  const bundle = SIMPLEDCARD_BUNDLES.find(b => b.maxCards >= employees);

  if (bundle) {
    return bundle.price;
  }

  // For more than 500 cards, use largest bundle + extra cards
  const largestBundle = SIMPLEDCARD_BUNDLES[SIMPLEDCARD_BUNDLES.length - 1];
  const extraCards = employees - largestBundle.maxCards;
  return largestBundle.price + (extraCards * EXTRA_CARD_PRICE);
}

export function calculateROI(inputs: CalculatorInputs): CalculatorResults {
  const efficiencyMultiplier = EFFICIENCY_MULTIPLIERS[inputs.currentSolution];

  // Time savings: hours reduced based on current solution efficiency
  const timeSavingsHours = inputs.hoursPerMonth * efficiencyMultiplier;

  // Cost of time saved
  const timeSavingsCost = timeSavingsHours * HOURLY_RATE;

  // Process savings: reduced administration per employee
  const processSavings = inputs.employees * PROCESS_SAVINGS_PER_EMPLOYEE;

  // Total savings
  const totalMonthlySavings = timeSavingsCost + processSavings;
  const totalYearlySavings = totalMonthlySavings * 12;

  // SimpledCard cost based on bundle pricing
  const simplecardMonthlyCost = getSimplecardMonthlyCost(inputs.employees);

  // ROI calculation: (savings - cost) / cost * 100
  const netMonthlySavings = totalMonthlySavings - simplecardMonthlyCost;
  const roi = simplecardMonthlyCost > 0
    ? Math.round((netMonthlySavings / simplecardMonthlyCost) * 100)
    : 0;

  return {
    timeSavingsHours: Math.round(timeSavingsHours * 10) / 10,
    timeSavingsCost: Math.round(timeSavingsCost),
    processSavings: Math.round(processSavings),
    totalMonthlySavings: Math.round(totalMonthlySavings),
    totalYearlySavings: Math.round(totalYearlySavings),
    roi,
    simplecardMonthlyCost: Math.round(simplecardMonthlyCost),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}
