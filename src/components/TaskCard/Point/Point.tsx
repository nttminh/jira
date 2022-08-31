import React from "react";
type Props = {
  value: number;
};
const Priority = (props: Props) => {
  return (
    <div className="py-1 px-3 rounded-lg bg-slate-300 inline-block h-fit">
      <span className="text-base font-semibold text-black">{props.value}</span>
    </div>
  );
};

export default Priority;
