import React from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
type Props = {
  level: number;
};
const Priority = (props: Props) => {
  let icon = null;
  switch (props.level) {
    case 3: {
      icon = <KeyboardDoubleArrowUpIcon color="error" />;
      break;
    }
    case 2: {
      icon = <KeyboardArrowUpIcon color="warning" />;
      break;
    }
    case 1: {
      icon = <DensityMediumIcon color="success" />;
      break;
    }
    default: {
      icon = <DensityMediumIcon color="success" />;
      break;
    }
  }
  console.log("icom", icon);
  return <div className="p-2 inline-block rounded-xl">{icon}</div>;
};

export default Priority;
