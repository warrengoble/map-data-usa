import React, { useState, useMemo } from "react";
import { map } from "lodash/fp";
import { Shape } from "three";
import svgPathToThreePath from "../../helpers/svgPathToThreePath";

import { counties as usaCounties } from "convert-counties-svg2json";

const County = ({ id, color = "red", fillOpacity = 1 }) => {
  const [hovered, set] = useState(false);

  const shapes = useMemo(() => {
    const { [id]: { path, state, name } = {} } = usaCounties;

    if (!path) {
      return null;
    }

    return map((path) => new Shape(path.getPoints()))(svgPathToThreePath(path));
  }, [id]);

  if (!shapes) {
    return null;
  }

  return (
    <mesh onPointerOver={(e) => set(true)} onPointerOut={() => set(false)}>
      <meshBasicMaterial
        color={hovered ? "green" : color}
        opacity={hovered ? 1.0 : fillOpacity}
        depthWrite={false}
        transparent
      />
      <shapeGeometry args={[shapes]} />
    </mesh>
  );
};

export default County;
