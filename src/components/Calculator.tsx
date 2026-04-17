import { useState, useMemo } from 'react';
import { InputForm } from './InputForm';
import { ResultsPreview } from './ResultsPreview';
import { EmailGate } from './EmailGate';
import { type CalculatorInputs, calculateROI } from '../utils/calculations';

type Step = 'input' | 'results' | 'email';

const DEFAULT_INPUTS: CalculatorInputs = {
  employees: 0,
  monthlySpend: 0,
  hoursPerMonth: 0,
  currentSolution: 'manual',
};

export function Calculator() {
  const [step, setStep] = useState<Step>('input');
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);

  const results = useMemo(() => calculateROI(inputs), [inputs]);

  const handleInputChange = (newInputs: CalculatorInputs) => {
    setInputs(newInputs);
  };

  const handleCalculate = () => {
    setStep('results');
  };

  const handleUnlock = () => {
    setStep('email');
  };

  const handleBackToInput = () => {
    setStep('input');
  };

  const handleBackToResults = () => {
    setStep('results');
  };

  return (
    <div className="calculator">
      <div className="calculator-container">
        {step === 'input' && (
          <InputForm
            values={inputs}
            onChange={handleInputChange}
            onSubmit={handleCalculate}
          />
        )}

        {step === 'results' && (
          <ResultsPreview
            results={results}
            onBack={handleBackToInput}
            onUnlock={handleUnlock}
          />
        )}

        {step === 'email' && (
          <EmailGate
            inputs={inputs}
            results={results}
            onBack={handleBackToResults}
          />
        )}
      </div>

      <footer className="calculator-footer">
        <a href="https://simpledcard.com" target="_blank" rel="noopener noreferrer">
          Powered by SimpledCard
        </a>
      </footer>
    </div>
  );
}
