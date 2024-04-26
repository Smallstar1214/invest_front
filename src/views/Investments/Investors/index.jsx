import React from "react";
import InvestorCardsBody from "./InvestorCardsBody";
import InvestorsPageHeader from "./InvestorsPageHeader";

const ContactCards = () => {
  return (
    <div className="hk-pg-body py-0">
      <div className="contactapp-wrap">
        <div>
          <div className="contactapp-detail-wrap">
            <InvestorsPageHeader />
            <InvestorCardsBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
