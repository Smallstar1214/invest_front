import React from "react";
import { offeringListItems } from "./data";

const Offering = () => {

  return (
    <>
      <div className="title title-lg">
        <h5>Highlights</h5>
      </div>
      <ul className="list-ul ps-3">
        {offeringListItems.map((item) => (
          <li className="mb-1">
            <span>{item.listItem}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Offering;
