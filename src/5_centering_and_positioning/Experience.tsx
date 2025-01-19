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
      {/* We can wrap this mesh in Center but we wont
      we will use position and rotation*/}
      <mesh
        geometry={baked.geometry}
        position={baked.position}
        rotation={baked.rotation}
      >
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>

      <mesh
        geometry={lampGlassOne.geometry}
        position={lampGlassOne.position}
        rotation={lampGlassOne.rotation}
      ></mesh>
      <mesh
        geometry={lampGlassTwo.geometry}
        position={lampGlassTwo.position}
        rotation={lampGlassTwo.rotation}
      ></mesh>
      <mesh
        geometry={portalCircle.geometry}
        position={portalCircle.position}
        rotation={portalCircle.rotation}
      ></mesh>
    </>
  );
}

useGLTF.preload("/models/portal/scene.glb");
