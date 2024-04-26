import React, { useState } from "react";
import classNames from "classnames";
import Body from "./Body";

const ReadOffering = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="hk-pg-body p-0">
      <div
        className={classNames("integrationsapp-wrap", {
          "integrationsapp-sidebar-toggle": !showSidebar,
        })}
      >
        <div style={{ left: 0 }} className="integrationsapp-content">
          <div className="integrationsapp-detail-wrap">
            <Body />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOffering;
