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
                Aanbevolen SimpledCard-bundel voor jouw organisatie
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
          <div className="report-unlocked">
            <div className="report-unlocked-header">
              <div className="success-badge">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Rapport ontgrendeld
              </div>
              <h3>Volledige breakdown</h3>
            </div>

            <div className="breakdown-list">
              <div className="breakdown-item">
                <div className="breakdown-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="breakdown-content">
                  <span className="breakdown-label">Tijdsbesparing</span>
                  <span className="breakdown-value">
                    {formatNumber(results.timeSavingsHours, 1)} uur/maand
                  </span>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="breakdown-content">
                  <span className="breakdown-label">Besparing op tijdskosten</span>
                  <span className="breakdown-value">
                    {formatCurrency(results.timeSavingsCost)} /maand
                  </span>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="breakdown-content">
                  <span className="breakdown-label">Procesoptimalisatie</span>
                  <span className="breakdown-value">
                    {formatCurrency(results.processSavings)} /maand
                  </span>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="breakdown-content">
                  <span className="breakdown-label">SimpledCard kosten ({results.recommendedBundle})</span>
                  <span className="breakdown-value breakdown-value-cost">
                    -{formatCurrency(results.simplecardMonthlyCost)} /maand
                  </span>
                </div>
              </div>

              <div className="breakdown-divider" />

              <div className="breakdown-item breakdown-item-total">
                <div className="breakdown-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="3" y="8" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 12v4m-2-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="breakdown-content">
                  <span className="breakdown-label">Netto jaarlijkse besparing</span>
                  <span className="breakdown-value breakdown-value-total">
                    {formatCurrency(results.netYearlySavings)}
                  </span>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="breakdown-content">
                  <span className="breakdown-label">Besparing per medewerker</span>
                  <span className="breakdown-value">
                    {formatCurrency(results.perEmployeeSavings)} /jaar
                  </span>
                </div>
              </div>
            </div>

            <p className="report-note">
              Een van onze specialisten neemt binnenkort contact met je op om je mogelijkheden te bespreken.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
