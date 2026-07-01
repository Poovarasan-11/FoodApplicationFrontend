import { useState, useEffect } from 'react';
import '../styles/SuccessPage.css';

const STEPS = [
  { id: 1, icon: '🧾', label: 'Order Placed',      desc: 'Your order has been received',       time: 0    },
  { id: 2, icon: '👨‍🍳', label: 'Being Prepared',    desc: 'Chef is preparing your food',        time: 4000 },
  { id: 3, icon: '🛵', label: 'Out for Delivery',  desc: 'Rider is on the way to you',          time: 8000 },
  { id: 4, icon: '🏠', label: 'Delivered',          desc: 'Enjoy your meal!',                   time: 12000},
];

export default function SuccessPage({ onGoHome }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderId]     = useState(() => 'FH' + Date.now().toString().slice(-6));

  useEffect(() => {
    const timers = STEPS.slice(1).map(step =>
      setTimeout(() => setCurrentStep(step.id), step.time)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const progressWidth = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="success-body">
      <div className="success-card">

        <div className="success-header">
          <div className="success-checkmark">
            {currentStep === STEPS.length ? '🎉' : '⏳'}
          </div>
          <h1>
            {currentStep === STEPS.length ? 'Order Delivered!' : 'Order Confirmed!'}
          </h1>
          <p className="order-id">Order ID: <strong>#{orderId}</strong></p>
        </div>

        <div className="progress-bar-wrap">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        <div className="steps-container">
          {STEPS.map((step, idx) => {
            const isDone    = currentStep > step.id;
            const isActive  = currentStep === step.id;
            const isPending = currentStep < step.id;

            return (
              <div key={step.id} className={`step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''} ${isPending ? 'pending' : ''}`}>

                {idx > 0 && (
                  <div className={`connector ${isDone ? 'done' : ''}`} />
                )}

                <div className="step-circle">
                  {isDone ? '✓' : step.icon}
                </div>

                <div className="step-info">
                  <span className="step-label">{step.label}</span>
                  <span className="step-desc">{step.desc}</span>
                  {isActive && (
                    <span className="step-live">
                      <span className="live-dot" /> Live
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        <div className="eta-box">
          <span>🕐</span>
          <div>
            <p className="eta-title">Estimated Delivery</p>
            <p className="eta-time">30 – 45 minutes</p>
          </div>
        </div>
        <button className="go-home-btn" onClick={onGoHome}>
          🍔 Order More Food
        </button>

      </div>
    </div>
  );
}
