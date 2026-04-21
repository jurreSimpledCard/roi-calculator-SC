import { useEffect, useRef, useState } from 'react';

// Extend Window interface for HubSpot globals
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: HubSpotFormConfig) => void;
      };
    };
  }
}

interface HubSpotFormConfig {
  region: string;
  portalId: string;
  formId: string;
  target: string;
  onFormReady?: ($form: HTMLFormElement) => void;
  onFormSubmitted?: () => void;
}

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
  hiddenFields: {
    calculator_employees: number;
    calculator_monthly_spend: number;
    calculator_hours_per_month: number;
    calculator_current_solution: string;
    calculator_estimated_savings: number;
    calculator_current_annual_cost: number;
    calculator_simpledcard_annual_cost: number;
    calculator_net_yearly_savings: number;
    calculator_per_employee_savings: number;
  };
  onSubmitted?: () => void;
}

export function HubSpotForm({
  portalId,
  formId,
  region = 'eu1',
  hiddenFields,
  onSubmitted,
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const formCreatedRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (formCreatedRef.current) return;

    const containerId = 'hubspot-form-container';

    const createForm = () => {
      if (!window.hbspt || formCreatedRef.current) return;

      formCreatedRef.current = true;

      window.hbspt.forms.create({
        region,
        portalId,
        formId,
        target: `#${containerId}`,
        onFormReady: ($form: HTMLFormElement) => {
          // Populate hidden fields with calculator data
          const setHiddenField = (name: string, value: string) => {
            const input = $form.querySelector(`input[name="${name}"]`) as HTMLInputElement;
            if (input) {
              input.value = value;
            }
          };

          setHiddenField('calculator_employees', String(hiddenFields.calculator_employees));
          setHiddenField('calculator_monthly_spend', String(hiddenFields.calculator_monthly_spend));
          setHiddenField('calculator_hours_per_month', String(hiddenFields.calculator_hours_per_month));
          setHiddenField('calculator_current_solution', hiddenFields.calculator_current_solution);
          setHiddenField('calculator_estimated_savings', String(hiddenFields.calculator_estimated_savings));
          setHiddenField('calculator_current_annual_cost', String(hiddenFields.calculator_current_annual_cost));
          setHiddenField('calculator_simpledcard_annual_cost', String(hiddenFields.calculator_simpledcard_annual_cost));
          setHiddenField('calculator_net_yearly_savings', String(hiddenFields.calculator_net_yearly_savings));
          setHiddenField('calculator_per_employee_savings', String(hiddenFields.calculator_per_employee_savings));

          setIsLoading(false);
        },
        onFormSubmitted: () => {
          onSubmitted?.();
        },
      });
    };

    // Load HubSpot script if not already loaded
    const existingScript = document.querySelector('script[src*="hsforms.net"]');

    if (existingScript && window.hbspt) {
      // Script already loaded, create form directly
      createForm();
    } else {
      // Load script first
      const script = document.createElement('script');
      script.src = `//js-${region}.hsforms.net/forms/embed/v2.js`;
      script.charset = 'utf-8';
      script.async = true;

      script.onload = () => {
        createForm();
      };

      script.onerror = () => {
        setError('Kon het formulier niet laden. Probeer het later opnieuw.');
        setIsLoading(false);
      };

      document.body.appendChild(script);
    }
  }, [portalId, formId, region, hiddenFields, onSubmitted]);

  if (error) {
    return (
      <div className="hubspot-form-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="hubspot-form-wrapper">
      {isLoading && (
        <div className="hubspot-form-loading">
          <div className="loading-spinner" />
          <span>Formulier laden...</span>
        </div>
      )}
      <div
        id="hubspot-form-container"
        ref={containerRef}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}
