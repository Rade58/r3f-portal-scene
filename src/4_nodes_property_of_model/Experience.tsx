import { Center, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { SRGBColorSpace, type Group, type Mesh } from "three";

// import { Perf } from "r3f-perf";

// import { useControls } from "leva";

export function Experience() {
  // const someControls = useControls("_", { test: 1 });
  const bakedTexture = useTexture("/models/portal/baked.jpg");

  // bakedTexture.flipY = false;
  // we don't need these
  // bakedTexture.colorSpace = SRGBColorSpace;
  // bakedTexture.needsUpdate = true;

  const model = useGLTF("/models/portal/scene.glb");
  const { nodes } = model;
  // console.log({ nodes });

  const {
    baked,
    LampGlassOne: lampGlassOne,
    LampGlassTwo: lampGlassTwo,
    // Scene: portalScene,
    PortalCircle: portalCircle,
  }: {
    baked: Mesh;
    LampGlassOne: Mesh;
    LampGlassTwo: Mesh;
    PortalCircle: Mesh;
    Scene: Group;
  } = nodes;

  // console.log({ baked, lampGlassOne, lampGlassTwo });

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />

      {/* --------------------------------------- */}
      {/* --------------------------------------- */}

      <mesh geometry={baked.geometry}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>

      {/* not going to use this */}
      {/* <primitive object={model.scene} /> */}
    </>
  );
}

useGLTF.preload("/models/portal/scene.glb");
