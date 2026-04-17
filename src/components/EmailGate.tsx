import { useState } from 'react';
import { type CalculatorInputs, type CalculatorResults, formatCurrency } from '../utils/calculations';
import { HubSpotForm } from './HubSpotForm';

// HubSpot configuration
const HUBSPOT_PORTAL_ID = '144358486';
const HUBSPOT_FORM_ID = 'a8821348-285c-4977-9197-0c85de88dd64';
const HUBSPOT_REGION = 'eu1';

// Map current solution values to readable labels for HubSpot
const SOLUTION_LABELS: Record<CalculatorInputs['currentSolution'], string> = {
  bankpas_creditcard: 'Bankpas/Creditcard',
  declaratie_tool: 'Declaratie oplossing/Tool',
};

interface EmailGateProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
  onBack: () => void;
}

export function EmailGate({ inputs, results, onBack }: EmailGateProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hidden fields for HubSpot
  const hiddenFields = {
    calculator_employees: inputs.employees,
    calculator_monthly_spend: inputs.monthlySpend,
    calculator_hours_per_month: inputs.hoursPerMonth,
    calculator_current_solution: SOLUTION_LABELS[inputs.currentSolution],
    calculator_estimated_savings: results.totalYearlySavings,
  };

  const handleFormSubmitted = () => {
    setIsSubmitted(true);
  };

  // Success state after form submission
  if (isSubmitted) {
    return (
      <div className="email-gate">
        <div className="email-gate-content">
          <div className="email-gate-success">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h2>Bedankt voor uw aanvraag!</h2>
            <p className="success-message">
              Uw persoonlijke besparingsrapport is onderweg naar uw inbox.
            </p>
            <div className="success-summary">
              <span className="summary-label">Geschatte jaarlijkse besparing:</span>
              <span className="summary-value">{formatCurrency(results.totalYearlySavings)}</span>
            </div>
            <p className="success-note">
              Een van onze specialisten neemt binnen 24 uur contact met u op om uw mogelijkheden te bespreken.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="email-gate">
      <div className="email-gate-header">
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
      </div>

      <div className="email-gate-content">
        <div className="email-gate-summary">
          <div className="summary-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <h2>Uw persoonlijke rapport is klaar</h2>
          <p className="summary-highlight">
            Geschatte jaarlijkse besparing: <strong>{formatCurrency(results.totalYearlySavings)}</strong>
          </p>
        </div>

        <div className="email-gate-form">
          <h3>Ontvang uw volledige rapport</h3>
          <p>Vul uw gegevens in om het complete besparingsrapport te ontvangen met:</p>

          <ul className="report-benefits">
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Gedetailleerde kostenanalyse
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Vergelijking met uw huidige oplossing
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Implementatie-roadmap
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Persoonlijk adviesgesprek (optioneel)
            </li>
          </ul>

          <HubSpotForm
            portalId={HUBSPOT_PORTAL_ID}
            formId={HUBSPOT_FORM_ID}
            region={HUBSPOT_REGION}
            hiddenFields={hiddenFields}
            onSubmitted={handleFormSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
