import { useState, useMemo } from 'react';
import { InputForm } from './InputForm';
import { ResultsPreview } from './ResultsPreview';
import { type CalculatorInputs, calculateROI } from '../utils/calculations';

type Step = 'input' | 'results';

const DEFAULT_INPUTS: CalculatorInputs = {
  employees: 25,
  monthlySpend: 250,
  hoursPerMonth: 20,
  currentSolution: 'voorschot_declaratie',
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

  const handleBackToInput = () => {
    setStep('input');
  };

  return (
    <div className="calculator">
      <div className="calculator-container">
        {step === 'input' && (
          <InputForm
            values={inputs}
            onChange={handleInputChange}
            onSubmit={handleCalculate}
            results={results}
          />
        )}

        {step === 'results' && (
          <ResultsPreview
            inputs={inputs}
            results={results}
            onBack={handleBackToInput}
          />
        )}
      </div>

    </div>
  );
}
