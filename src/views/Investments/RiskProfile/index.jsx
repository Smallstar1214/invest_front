import React, { useState } from "react";
import CustomSlider from "./CustomSlider";
import Stocks from "./Stocks";
import Bonds from "./Bonds";
import OtherInvestments from "./OtherInvestments";
import StockInfo from "./StockInfo";
import { Button } from "react-bootstrap";
import { message } from "antd";

const RiskProfile = () => {
  const [riskScore, setRiskScore] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [title, setTitle] = useState("");

  const handleChange = (item) => {
    let newScore;
    if(item.isSelected) {
      newScore = riskScore + item.riskScore;
    } else {
      newScore = riskScore - item.riskScore;
    }
    setRiskScore(newScore);
  };

  const handleToggleInfo = (stockTitle) => {
    setTitle(stockTitle);
    setShowInfo(!showInfo);
  }

  const handleSave = () => {
    message.success('Risk Profile Saved Successfully !');
  }

  return (
    <>
      {/* header */}
      <header className="contact-header">
        <div className="d-flex align-items-center">
          <div className="contactapp-title link-dark">
            <h1>Risk Profile</h1>
          </div>
        </div>
      </header>

      {/* body */}
      <div className="p-4">
          <div className="d-flex justify-content-end">
            <Button onClick={handleSave} className="btn-soft-primary border-primary">
              Save Profile
            </Button>
          </div>

        {/* custom slider */}
        <CustomSlider riskScore={riskScore} />

        {/* cards for type of investments */}
        <Stocks onChange={handleChange} toggleInfo={handleToggleInfo} />
        <Bonds onChange={handleChange} toggleInfo={handleToggleInfo} />
        <OtherInvestments onChange={handleChange} toggleInfo={handleToggleInfo} />

        {/* stock info */}
        {showInfo &&
          <StockInfo open={showInfo} title={title} onClose={() => setShowInfo(false)} />
        }
      </div>
    </>
  );
};

export default RiskProfile;
