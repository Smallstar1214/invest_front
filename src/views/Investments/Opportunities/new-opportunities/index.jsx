import React from "react";
import Header from "./Header";
import Body from "./Body";
import "./styles.css";

const NewOpportunities = () => {
  return (
    <div className="hk-pg-body py-0">
      <div className="">
        <div style={{ left: 0 }} className="integrationsapp-content">
          <div className="integrationsapp-detail-wrap">
            <Header />
              <div style={{ borderTop: "1px solid #eee" }} />
            <Body />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOpportunities;