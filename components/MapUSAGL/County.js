import React, { useState, useMemo, useContext } from "react";
import { map } from "lodash/fp";
import { Shape, BufferGeometry } from "three";
import svgPathToThreePath from "../../helpers/svgPathToThreePath";

import { counties as usaCounties } from "convert-counties-svg2json";
import { ParamContext } from "./";

const County = ({ id, color = "red", fillOpacity = 1 }) => {
  // const { tiltFactor } = useContext(ParamContext);
  const tiltFactor = 0.5;
  const [hovered, setHovered] = useState(false);

  const ret = useMemo(() => {
    const { [id]: { path, state, name } = {} } = usaCounties;

    if (!path) {
      return null;
    }

    const shapes = map((path) => new Shape(path.getPoints()))(
      svgPathToThreePath(path)
    );

    return {
      shapes,
      countyBordersLines: shapes.map((path) =>
        new BufferGeometry().setFromPoints(path.getPoints())
      ),
    };
  }, [id]);

  if (!ret) {
    return null;
  }

  const { shapes, countyBordersLines } = ret;

  return (
    <group>
      <mesh
        onPointerOver={(e) => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          attach="material"
          color={hovered ? "green" : color}
          opacity={hovered ? 1 : fillOpacity}
          depthTest={false}
          depthWrite={false}
          transparent
        />
        <shapeGeometry args={[shapes]} />
      </mesh>
      {/* <mesh >
        <meshStandardMaterial
          attach="material"
          color={hovered ? "green" : color}
          opacity={hovered ? 1 : fillOpacity}
          depthTest={false}
          depthWrite={false}
          transparent
        />
        <extrudeBufferGeometry
          args={[
            shapes,
            {
              steps: 1,
              depth: 50 * fillOpacity * tiltFactor + 1,
              bevelEnabled: false,
            },
          ]}
        />
      </mesh> */}
      {map((geometry) => (
        <line key={geometry.uuid} geometry={geometry}>
          <lineBasicMaterial
            attach="material"
            color="#444444"
            linewidth={1}
            depthTest={false}
            depthWrite={false}
            transparent
          />
        </line>
      ))(countyBordersLines)}
    </group>
  );
};

export default County;

// <mesh onPointerOver={(e) => set(true)} onPointerOut={() => set(false)}>
