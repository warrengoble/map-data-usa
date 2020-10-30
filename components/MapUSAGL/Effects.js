import React, { useRef, useMemo, useEffect } from "react";
import { Vector2 } from "three";
import { extend, useThree, useFrame } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
});

export default function Effects() {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ]);
  useFrame(() => composer.current.render(), 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 0.4, 4, 0]} />
    </effectComposer>
  );
}
