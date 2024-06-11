import React, { useState } from "react";
import classNames from "classnames";
import Body from "./Body";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const ReadOffering = () => {
  const location = useLocation();

  const {dataKey} = location.state || {};
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
            <Body data = {dataKey} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOffering;