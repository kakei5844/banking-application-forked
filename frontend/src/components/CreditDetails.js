import React from "react";

const CreditDetails = ({ card }) => {
  const calculateUsagePercentage = (spent, limit) => {
    return (spent / limit) * 100;
  };

  const usagePercentage = calculateUsagePercentage(
    card.spent,
    card.limit
  ).toFixed(2);
  const remainingCredit = card.limit - card.spent;

  const circumference = 2 * Math.PI * 70;
  const dashOffset = circumference - (usagePercentage / 100) * circumference;

  return (
    <div className="card-details p-3 rounded text-center bg-primary bg-gradient ms-5">
      <h4 className="text-light">Card Usage</h4>

      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          id="svg"
          r="70"
          cx="80"
          cy="80"
          fill="transparent"
          stroke="#e0e0e0"
          stroke-width="12px"
        ></circle>
        <circle
          r="70"
          cx="80"
          cy="80"
          fill="transparent"
          stroke="#60e6a8"
          stroke-linecap="round"
          stroke-width="12px"
          stroke-dasharray={circumference}
          stroke-dashoffset={dashOffset}
        ></circle>
        <text
          x="50%"
          y="50%"
          transform="rotate(90 78 78)"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="32px"
          fontWeight="bold"
          fill="#333"
        >
          {usagePercentage}%
        </text>
      </svg>

      <div className="spent-credit text-center lh-lg text-light">
        You have spent:
      </div>
      <div className="spent-credit text-center fw-bold lh-lg text-light">
        ${card.spent}
      </div>

      <div className="availble-credit text-center lh-lg text-light">
        Available credit:
      </div>
      <div className="availble-credit text-center fw-bold lh-lg text-light">
        ${remainingCredit}
      </div>
    </div>
  );
};

export default CreditDetails;
