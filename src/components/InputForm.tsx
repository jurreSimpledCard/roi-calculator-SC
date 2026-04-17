import type { CalculatorInputs } from '../utils/calculations';

interface InputFormProps {
  values: CalculatorInputs;
  onChange: (values: CalculatorInputs) => void;
  onSubmit: () => void;
}

const CURRENT_SOLUTIONS = [
  { value: 'manual', label: 'Handmatig / Excel' },
  { value: 'bankcard', label: 'Bankpas' },
  { value: 'prepaid', label: 'Andere prepaid kaart' },
  { value: 'creditcard', label: 'Creditcard' },
] as const;

export function InputForm({ values, onChange, onSubmit }: InputFormProps) {
  const handleChange = (field: keyof CalculatorInputs, value: string | number) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const isValid = values.employees > 0 && values.monthlySpend > 0 && values.hoursPerMonth > 0;

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <span className="step-badge">Stap 1 van 2</span>
        <h2>Bereken je besparing</h2>
        <p>Vul onderstaande gegevens in om te zien hoeveel je kunt besparen met SimpledCard.</p>
      </div>

      <div className="form-fields">
        <div className="form-group">
          <label htmlFor="employees">
            Aantal medewerkers met betaalkaarten
          </label>
          <input
            type="number"
            id="employees"
            min="1"
            max="10000"
            placeholder="bijv. 25"
            value={values.employees || ''}
            onChange={(e) => handleChange('employees', parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="monthlySpend">
            Gemiddelde maandelijkse uitgaven
          </label>
          <div className="input-with-prefix">
            <span className="input-prefix">€</span>
            <input
              type="number"
              id="monthlySpend"
              min="100"
              max="10000000"
              placeholder="bijv. 15.000"
              value={values.monthlySpend || ''}
              onChange={(e) => handleChange('monthlySpend', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="hoursPerMonth">
            Uren per maand aan declaratieverwerking
          </label>
          <div className="input-with-suffix">
            <input
              type="number"
              id="hoursPerMonth"
              min="1"
              max="500"
              placeholder="bijv. 20"
              value={values.hoursPerMonth || ''}
              onChange={(e) => handleChange('hoursPerMonth', parseInt(e.target.value) || 0)}
            />
            <span className="input-suffix">uur</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="currentSolution">
            Huidige oplossing
          </label>
          <select
            id="currentSolution"
            value={values.currentSolution}
            onChange={(e) => handleChange('currentSolution', e.target.value)}
          >
            {CURRENT_SOLUTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={!isValid}
      >
        Bereken mijn besparing
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
