import React from "react";

import usaCounties from "./usaCounties";

export default ({ id, ...props }) => {
  const { [id]: { path, state, name } = {} } = usaCounties;

  return path ? (
    <path
      d={path}
      strokeWidth={1}
      strokeOpacity={0.2}
      stroke="black"
      {...props}
    >
      <title>{`${name}, ${state}`}</title>
    </path>
  ) : null;
};
