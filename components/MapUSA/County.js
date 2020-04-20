import React from "react";

import { counties as usaCounties } from "convert-counties-svg2json";

export default ({ id, ...props }) => {
  const { [id]: { path, state, name } = {} } = usaCounties;

  return path ? (
    <path
      d={path}
      strokeWidth={0.1}
      strokeOpacity={0.2}
      stroke="black"
      {...props}
    >
      <title>{`${name}, ${state}`}</title>
    </path>
  ) : null;
};
