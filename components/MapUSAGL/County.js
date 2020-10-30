import React, { useState, useMemo, useContext } from "react";
import { map } from "lodash/fp";
import { Shape, BufferGeometry, Vector3 } from "three";
import { Text } from "drei";

import svgPathToThreePath from "../../helpers/svgPathToThreePath";
import { counties as usaCounties } from "convert-counties-svg2json";

const County = ({ id, color = "red", fillOpacity = 1 }) => {
  const tiltFactor = 0.5;
  const [{ hovered, popupPosition }, setHovered] = useState({
    hovered: false,
    popupPosition: new Vector3(0, 0, 0),
  });

  const { shapes, countyBordersLines, state, name } = useMemo(() => {
    const { [id]: { path, state, name } = {} } = usaCounties;

    if (!path) {
      return {};
    }

    const shapes = map((path) => new Shape(path.getPoints()))(
      svgPathToThreePath(path)
    );

    return {
      shapes,
      countyBordersLines: shapes.map((path) =>
        new BufferGeometry().setFromPoints(path.getPoints())
      ),
      state,
      name,
    };
  }, [id]);

  if (!shapes) {
    return null;
  }

  return (
    <>
      <group>
        <mesh
          onPointerOver={(e) => {
            const {
              intersections: [{ point: popupPosition, object }] = [],
            } = e;

            // TODO Get this through store instead?
            const scale = object.parent?.parent?.scale.x;
            const pos = object.parent?.parent?.position;

            popupPosition.x = (popupPosition.x - pos.x) / scale;
            popupPosition.y = (popupPosition.y - pos.y) / scale;

            popupPosition.y += 35;
            popupPosition.z = 10;

            setHovered({ hovered: true, popupPosition });
          }}
          onPointerOut={() => setHovered({ hovered: false })}
        >
          <meshStandardMaterial
            attach="material"
            color={hovered ? "green" : color}
            opacity={hovered ? 1 : fillOpacity}
            transparent
          />
          <shapeGeometry args={[shapes]} />
        </mesh>
        {map((geometry) => (
          <line key={geometry.uuid} geometry={geometry}>
            <lineBasicMaterial
              attach="material"
              color="#444444"
              linewidth={1}
            />
          </line>
        ))(countyBordersLines)}
        {hovered && (
          <>
            <mesh position={popupPosition}>
              <meshBasicMaterial
                attach="material"
                color="white"
                opacity={0.35}
                transparent
              />
              <planeGeometry args={[100, 30]} />
            </mesh>
            <Text
              position={popupPosition}
              color="black"
              fontSize={10}
              maxWidth={90}
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              anchorX="center"
              anchorY="middle"
            >
              {`${name} - ${state}`}
            </Text>
          </>
        )}
      </group>
    </>
  );
};

export default County;
