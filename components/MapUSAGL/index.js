import React, { Suspense, useMemo, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { BufferGeometry } from "three";
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

export { County, usaCounties, mapWidth, mapHeight };

// const Wrapper = ({ children }) => {
//   const ref = useRef();
//   useLayoutEffect(() => {
//     const sphere = new Box3()
//       .setFromObject(ref.current)
//       .getBoundingSphere(new Sphere());

//     ref.current.position.set(-sphere.center.x, -sphere.center.y, 0);
//   }, []);

//   return <group ref={ref}>{children}</group>;
// };

const MapUSA = ({ children, transform, width, height }) => {
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
        //   near: 0.1,
        //   far: 10000,
        //   up: [0, 1, 0],
        // }}
        orthographic
        camera={{
          position: [0, 0, 1],
          zoom: 1,
          up: [0, 1, 0],
          near: -10000,
          far: 10000,
        }}
      >
        <Suspense fallback={null}>
          <group scale={[zoom, zoom, zoom]} position={[posX, -posY, 0]}>
            {children}
            {map((geometry) => (
              <line key={geometry.uuid} geometry={geometry}>
                <lineBasicMaterial
                  attach="material"
                  color="black"
                  linewidth={2}
                  depthTest={false}
                  depthWrite={false}
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
      </Canvas>
    </div>
  );
};

export default MapUSA;
