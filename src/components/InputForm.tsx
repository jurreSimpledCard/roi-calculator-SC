import { type CalculatorInputs, type CalculatorResults, formatCurrency, formatNumber } from '../utils/calculations';

interface InputFormProps {
  values: CalculatorInputs;
  onChange: (values: CalculatorInputs) => void;
  onSubmit: () => void;
  results: CalculatorResults;
}


const CURRENT_SOLUTIONS = [
  { value: 'voorschot_declaratie', label: 'Voorschot en declaratie' },
  { value: 'bankpas_creditcard', label: 'Bankpas / Creditcard' },
  { value: 'declaratie_tool', label: 'Declaratie oplossing / Tool' },
] as const;


function sliderPercent(value: number, min: number, max: number) {
  return `${((value - min) / (max - min)) * 100}%`;
}

export function InputForm({ values, onChange, onSubmit, results }: InputFormProps) {
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

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <span className="step-badge">Stap 1 van 2</span>
        <h2>Bereken je besparing</h2>
        <p>Verschuif de sliders om te zien hoeveel je kunt besparen met SimpledCard.</p>
      </div>

      <div className="slider-fields">
        <div className="slider-group">
          <label className="slider-label">Medewerkers met bedrijfsuitgaven</label>
          <div className="slider-value">
            {values.employees} <span className="slider-unit">personen</span>
          </div>
          <input
            type="range"
            min="1"
            max="500"
            step="1"
            value={values.employees}
            onChange={(e) => handleChange('employees', parseInt(e.target.value))}
            style={{ '--slider-percent': sliderPercent(values.employees, 1, 500) } as React.CSSProperties}
          />
        </div>

        <div className="slider-group">
          <label className="slider-label">Gemiddelde onkosten per medewerker / maand</label>
          <div className="slider-value">
            € {formatNumber(values.monthlySpend)}
          </div>
          <input
            type="range"
            min="50"
            max="5000"
            step="50"
            value={values.monthlySpend}
            onChange={(e) => handleChange('monthlySpend', parseInt(e.target.value))}
            style={{ '--slider-percent': sliderPercent(values.monthlySpend, 50, 5000) } as React.CSSProperties}
          />
        </div>

        <div className="slider-group">
          <label className="slider-label">Uren per maand aan declaratieverwerking</label>
          <div className="slider-value">
            {values.hoursPerMonth} <span className="slider-unit">uur</span>
          </div>
          <input
            type="range"
            min="1"
            max="200"
            step="1"
            value={values.hoursPerMonth}
            onChange={(e) => handleChange('hoursPerMonth', parseInt(e.target.value))}
            style={{ '--slider-percent': sliderPercent(values.hoursPerMonth, 1, 200) } as React.CSSProperties}
          />
        </div>

        <div className="slider-group">
          <label className="slider-label">Huidige oplossing</label>
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

      <div className="live-summary">
        <div className="live-summary-row">
          <span className="live-summary-label">Jouw team verwerkt</span>
          <span className="live-summary-value">{formatCurrency(values.employees * values.monthlySpend * 12)}</span>
          <span className="live-summary-detail">aan onkosten per jaar</span>
        </div>
        <div className="live-summary-divider" />
        <div className="live-summary-row">
          <span className="live-summary-label">En besteedt daaraan</span>
          <span className="live-summary-value-sm">{formatCurrency(results.currentAnnualCost)}</span>
          <span className="live-summary-detail">per jaar aan handmatige verwerking</span>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary"
      >
        Ontdek je besparing
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
