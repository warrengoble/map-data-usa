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

export const ParamContext = createContext();

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
          position: [0, 0, 1],
          zoom: 1,
          up: [0, 1, 0],
          near: .1,
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
            <directionalLight castShadow intensity={0.5} position={[0, 0, 1]} />
            <pointLight intensity={2} position={[0, 0, 100]} />
            {/* <ParamContext.Provider value={{ tiltFactor: tilt / 45 }}> */}
            {children}
            {/* </ParamContext.Provider> */}
            {map((geometry) => (
              <line key={geometry.uuid} geometry={geometry}>
                <lineBasicMaterial
                  attach="material"
                  color="#777777"
                  linewidth={1.5}
                  depthTest={false}
                  depthWrite={false}
                  transparent
                />
              </line>
            ))(stateBordersLines)}
            {map((geometry) => (
              <line key={geometry.uuid} geometry={geometry}>
                <lineBasicMaterial
                  attach="material"
                  color="#333333"
                  linewidth={3}
                  depthTest={false}
                  depthWrite={false}
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
