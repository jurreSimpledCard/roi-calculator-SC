import { useState } from 'react';
import { type CalculatorInputs, type CalculatorResults, formatCurrency, formatNumber } from '../utils/calculations';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { HubSpotForm } from './HubSpotForm';

// HubSpot configuration
const HUBSPOT_PORTAL_ID = '144358486';
const HUBSPOT_FORM_ID = 'a8821348-285c-4977-9197-0c85de88dd64';
const HUBSPOT_REGION = 'eu1';

const SOLUTION_LABELS: Record<CalculatorInputs['currentSolution'], string> = {
  voorschot_declaratie: 'Voorschot en declaratie',
  bankpas_creditcard: 'Bankpas/Creditcard',
  declaratie_tool: 'Declaratie oplossing/Tool',
};

interface ResultsPreviewProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
  onBack: () => void;
}

interface AnimatedValueProps {
  value: number;
  format: 'currency' | 'number' | 'percentage';
  decimals?: number;
}

function AnimatedValue({ value, format, decimals = 0 }: AnimatedValueProps) {
  const animatedValue = useAnimatedCounter(value, true, { duration: 1200 });

  if (format === 'currency') {
    return <>{formatCurrency(Math.round(animatedValue))}</>;
  }
  if (format === 'percentage') {
    return <>{formatNumber(Math.round(animatedValue))}%</>;
  }
  return <>{formatNumber(animatedValue, decimals)}</>;
}

export function ResultsPreview({ inputs, results, onBack }: ResultsPreviewProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const hiddenFields = {
    calculator_employees: inputs.employees,
    calculator_monthly_spend: inputs.monthlySpend,
    calculator_hours_per_month: inputs.hoursPerMonth,
    calculator_current_solution: SOLUTION_LABELS[inputs.currentSolution],
    calculator_estimated_savings: results.totalYearlySavings,
    calculator_current_annual_cost: results.currentAnnualCost,
    calculator_simpledcard_annual_cost: results.simplecardAnnualCost,
    calculator_net_yearly_savings: results.netYearlySavings,
    calculator_per_employee_savings: results.perEmployeeSavings,
  };

  return (
    <div className="results-preview">
      <div className="results-header">
        <button className="btn-back" onClick={onBack} type="button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M15.833 10H4.167M10 15.833L4.167 10 10 4.167"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Terug
        </button>
        <span className="step-badge">Stap 2 van 2</span>
      </div>

      <div className="results-content">
        <h2>Je geschatte besparing</h2>
        <p className="results-subtitle">
          Op basis van je gegevens kan SimpledCard je het volgende opleveren:
        </p>

        <div className="results-highlight">
          <div className="highlight-card highlight-primary">
            <span className="highlight-label">Jaarlijkse besparing</span>
            <span className="highlight-value">
              <AnimatedValue value={results.totalYearlySavings} format="currency" />
            </span>
          </div>
          <div className="highlight-card">
            <span className="highlight-label">Maandelijkse besparing</span>
            <span className="highlight-value">
              <AnimatedValue value={results.totalMonthlySavings} format="currency" />
            </span>
          </div>
          <div className="highlight-card">
            <span className="highlight-label">ROI</span>
            <span className="highlight-value highlight-roi">
              <AnimatedValue value={results.roi} format="percentage" />
            </span>
          </div>
        </div>

        {!isSubmitted ? (
          <div className="report-gate">
            <div className="report-gate-header">
              <h3>Ontvang je rapport</h3>
              <p>Vul je gegevens in voor de volledige breakdown van je besparing:</p>
            </div>

            <ul className="report-benefits">
              <li>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Gedetailleerde kostenanalyse per categorie
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Netto besparing na aftrek van SimpledCard-kosten
              </li>
            </ul>

            <HubSpotForm
              portalId={HUBSPOT_PORTAL_ID}
              formId={HUBSPOT_FORM_ID}
              region={HUBSPOT_REGION}
              hiddenFields={hiddenFields}
              onSubmitted={() => setIsSubmitted(true)}
            />
          </div>
        ) : (
          <div className="report-sent">
            <div className="report-sent-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <h3>Bedankt!</h3>
            <p>Je ontvangt je persoonlijke besparingsrapport per e-mail met een volledige breakdown van je besparing.</p>
          </div>
        )}
      </div>
    </div>
  );
}
