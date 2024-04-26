import React, { useEffect, useState } from "react";
import { Slider, Space } from "antd";
import { Row, Col } from "react-bootstrap";

const CustomSlider = ({ riskScore }) => {

  const [inputValue, setInputValue] = useState(0);
  const [sliderBackground, setSliderBackground] = useState("");

  useEffect(() => {
    setInputValue(riskScore);
  }, [riskScore]);

  useEffect(() => {
    if(inputValue <= 10) {
      setSliderBackground("info");
    } else if(inputValue <= 20) {
      setSliderBackground("blue");
    } else if(inputValue <= 30) {
      setSliderBackground("success");
    } else if(inputValue <= 40) {
      setSliderBackground("orange");
    } else if(inputValue <= 45) {
      setSliderBackground("warning");
    } else {
      setSliderBackground("danger");
    }
  }, [inputValue]);

  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Space
      style={{
        width: "100%",
      }}
      direction="vertical"
    >
      <Row>
        <Col lg={6} md={6} sm={6} xs={6} style={{ border: "2px solid #eee" }} className={`p-3 bg-${sliderBackground}-light-5 me-3`}>
          <h6 className="ps-2"><span className="fw-normal">Risk Score :</span> {inputValue}</h6>
          <Row>
            <Col>
              <Slider
                min={1}
                max={50}
                onChange={onChange}
                value={typeof inputValue === "number" ? inputValue : 0}
                step={0.5}
              />
            </Col>
          </Row>
        </Col>
        <Col lg={4} md={4} sm={4} xs={4} style={{ border: "2px solid #eee" }} className="p-3 d-flex justify-content-evenly bg-light">
          <div>
            <p className="text-center">Potential Returns (Yearly)</p>
            <h3 className="text-center">12.99<span className="fs-5 text-muted"> %</span></h3>
          </div>
          <div>
            <p className="text-center">Average Hold Time</p>
            <h3 className="text-center">47<span className="fs-6 text-muted"> months</span></h3>
          </div>
        </Col>
      </Row>
    </Space>
  );
};
export default CustomSlider;
