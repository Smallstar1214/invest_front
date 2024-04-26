import React from "react";
import { Drawer } from "antd";

const StockInfo = ({ open, title, onClose = () => {} }) => {

  return (
    <>
      <Drawer title={title} width={500} onClose={() => onClose()} open={open}>
        <p>Some contents...</p>
        <p>Lorem ipsum in metus vulputate eu scelerisque felis imperdiet proin. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae.</p>
      </Drawer>
    </>
  );
};
export default StockInfo;
