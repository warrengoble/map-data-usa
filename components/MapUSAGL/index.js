import React, { Suspense, useMemo, createContext } from "react";
import { Canvas } from "react-three-fiber";
import { BufferGeometry, Math as threeMath } from "three";
import { map } from "lodash/fp";

import svgPathToThreePath from "../../helpers/svgPathToThreePath";
import {
  pathBorders,
  pathSeparator,
  mapWidth,
  mapHeight,
  counties as usaCounties,
} from "convert-counties-svg2json";

import County from "./County";
import Effects from "./Effects";

export { County, usaCounties, mapWidth, mapHeight };

const MapUSA = ({ children, transform, tilt = 0 }) => {
  const [zoom, , , , posX, posY] = transform;

  const stateBordersLines = useMemo(
    () =>
      svgPathToThreePath(pathBorders).map((path) =>
        new BufferGeometry().setFromPoints(path.getPoints())
      ),
    []
  );

  const separatorLines = useMemo(
    () =>
      svgPathToThreePath(pathSeparator).map((path) =>
        new BufferGeometry().setFromPoints(path.getPoints())
      ),
    []
  );

  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
            cursor: pointer;
          }
        `}
      </style>

      <Canvas
        // camera={{
        //   position: [0, 0, 350],
        //   fov: 60,
        //   near: 1,
        //   far: 500,
        //   up: [0, 1, 0],
        // }}
        orthographic
        camera={{
          position: [0, 0, 100],
          zoom: 1,
          up: [0, 1, 1],
          near: -10,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <group
            scale={[zoom, zoom, zoom]}
            position={[posX, -posY, 0]}
            rotation={[-threeMath.degToRad(tilt), 0, 0]}
          >
            <directionalLight intensity={0.5} position={[0, 0, 1]} />
            <pointLight intensity={2} position={[0, 0, 100]} />
            {children}
            {map((geometry) => (
              <line key={geometry.uuid} geometry={geometry}>
                <lineBasicMaterial
                  attach="material"
                  color="#555555"
                  linewidth={1.5}
                />
              </line>
            ))(stateBordersLines)}
            {map((geometry) => (
              <line key={geometry.uuid} geometry={geometry}>
                <lineBasicMaterial
                  attach="material"
                  color="#333333"
                  linewidth={3}
                />
              </line>
            ))(separatorLines)}
          </group>
        </Suspense>
        <Effects />
      </Canvas>
    </div>
  );
};

export default MapUSA;
