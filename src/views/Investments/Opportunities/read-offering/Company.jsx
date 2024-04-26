import React from "react";
import { Row, Col } from "react-bootstrap";

const Company = () => {
  return (
    <>
      <h5>Overview and Features</h5>
      <p>
        Think classic lorem ipsum is passé? Give your next project a bit more
        edge with these funny and unique text generators. The classic latin
        passage that just never gets old, enjoy as much (or as little) lorem
        ipsum as you can handle with our easy to use filler text generator. It
        will be met with fire and fury like the world has never seen. Does
        everybody know that pig named Lorem Ipsum? An ‘extremely credible
        source’ has called my office and told me that Barack Obama’s placeholder
        text is a fraud.
      </p>
      <Row className="my-7">
        <Col xxl={6}>
          <h6>Kaster Shots</h6>
          <p>
            In case you don't read Twitter, the news, or just can't get enough
            of The Apprentice host's legendary oration, try this Trump lorem
            ipsum generator.
          </p>
        </Col>
        <Col xxl={6} className="mt-xxl-0 mt-3">
          <h6>Kaster Brilliant</h6>
          <p>
            If you haven't seen Game of Thrones, go watch it right now. If you
            have then you'll totally get why this Hodor themed lorem ipsum
            generator is just brilliant.
          </p>
        </Col>
      </Row>
      <h6>More Interesting Features</h6>
      <ul className="list-ul ps-3">
        <li className="mb-1">
          <span>
            Kickstarter is an American public benefit corporation based in
            Brooklyn.
          </span>
        </li>
        <li className="mb-1">
          <span>New York, that maintains a global crowdfunding.</span>
        </li>
        <li className="mb-1">
          <span>
            platform focused on creativity. The company's stated mission.
          </span>
        </li>
        <li className="mb-1">
          <span>Help bring creative projects to life.</span>
        </li>
        <li>
          <span>Kaster try this Trump lorem ipsum generator on for size.</span>
        </li>
      </ul>
    </>
  );
};

export default Company;
