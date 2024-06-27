import { Button } from "@mui/material";
import React from "react";

const DynamicButtons = ({ numberOfButtons, onButtonClick }) => {
  const buttonsArray = Array.from(
    { length: numberOfButtons },
    (_, index) => index + 1
  );

  return (
    <div className="space-x-4">
      {buttonsArray.map((buttonNumber) => (
        <Button
          variant="contained"
          key={buttonNumber}
          onClick={() => onButtonClick(buttonNumber)}
        >
          {buttonNumber}
        </Button>
      ))}
    </div>
  );
};

export default DynamicButtons;
