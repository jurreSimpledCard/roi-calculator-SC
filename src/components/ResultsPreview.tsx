import { type CalculatorResults, formatCurrency, formatNumber } from '../utils/calculations';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

interface ResultsPreviewProps {
  results: CalculatorResults;
  onBack: () => void;
  onUnlock: () => void;
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

export function ResultsPreview({ results, onBack, onUnlock }: ResultsPreviewProps) {
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
        <h2>Uw geschatte besparing</h2>
        <p className="results-subtitle">
          Op basis van uw gegevens kan SimpledCard u het volgende opleveren:
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

        <div className="results-breakdown">
          <h3>Breakdown van uw besparing</h3>

          <div className="breakdown-visible">
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
                  <AnimatedValue value={results.timeSavingsHours} format="number" decimals={1} /> uur/maand
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
                  <AnimatedValue value={results.timeSavingsCost} format="currency" /> /maand
                </span>
              </div>
            </div>
          </div>

          <div className="breakdown-blurred">
            <div className="breakdown-item blurred">
              <div className="breakdown-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="breakdown-content">
                <span className="breakdown-label">Procesoptimalisatie</span>
                <span className="breakdown-value">€ •••</span>
              </div>
            </div>

            <div className="breakdown-item blurred">
              <div className="breakdown-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="breakdown-content">
                <span className="breakdown-label">Geschatte SimpledCard kosten</span>
                <span className="breakdown-value">€ •••</span>
              </div>
            </div>

            <div className="breakdown-item blurred">
              <div className="breakdown-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="3" y="8" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 12v4m-2-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="breakdown-content">
                <span className="breakdown-label">Netto besparing per jaar</span>
                <span className="breakdown-value">€ •••••</span>
              </div>
            </div>

            <div className="blur-overlay">
              <div className="lock-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="unlock-cta">
          <p>Ontvang het volledige rapport met gedetailleerde breakdown en implementatie-advies.</p>
          <button className="btn-primary" onClick={onUnlock} type="button">
            Ontvang volledig rapport
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
        </div>
      </div>
    </div>
  );
}
