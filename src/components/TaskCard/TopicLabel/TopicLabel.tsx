import React from "react";
import Box from "@mui/material/Box";
type Props = {
  value: string;
  color: string;
};
const Priority = (props: Props) => {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className="h-8 px-3 inline-block w-fit"
    >
      <span className="block text-sm font-normal text-black leading-8">
        {props.value}
      </span>
    </div>
  );
};

export default Priority;
