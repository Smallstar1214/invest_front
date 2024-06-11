import React from "react";
import { investmentSummaryItems, opportunityItems } from "./data";

const ThePitch = () => {
  return (
    <>
      <div className="title title-lg">
        <h5>Investment Summary</h5>
      </div>
      <ul className="list-ul ps-3">
        {investmentSummaryItems.map((item) => (
          <li key={item.id} className="mb-1">
            <span>{item.listItem}</span>
          </li>
        ))}
      </ul>
        <div className="title title-lg mt-6">
          <h5 style={{ fontSize: "1.1rem" }}>The Opportunity</h5>
        </div>
        <ul className="list-ul ps-3">
          {opportunityItems.map((item) => (
            <li key={item.id} className="mb-1">
              <span>{item.listItem}</span>
            </li>
          ))}
        </ul>
    </>
  );
};

export default ThePitch;