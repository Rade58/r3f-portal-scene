import {
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  Sparkles,
} from "@react-three/drei";
import {
  Color,
  DoubleSide,
  type ShaderMaterial,
  SRGBColorSpace,
  type Group,
  type Mesh,
} from "three";

// import { Perf } from "r3f-perf";

import { useControls } from "leva";

import portalVertexShader from "./portal/vertex.glsl";
import portalFragmentShader from "./portal/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const portalUColors = {
  uColorStart: "#89bfcd",
  uColorEnd: "#ecdada",
};

export function Experience() {
  const portalMaterialRef = useRef<ShaderMaterial>(null);

  /* const portalControls = */ useControls("portal", {
    uColorStart: {
      value: portalUColors.uColorStart,
      onChange(val) {
        if (portalMaterialRef.current) {
          portalMaterialRef.current.uniforms["uColorStart"].value.set(val);
        }
      },
    },
    uColorEnd: {
      value: portalUColors.uColorEnd,
      onChange(val) {
        if (portalMaterialRef.current) {
          portalMaterialRef.current.uniforms["uColorEnd"].value.set(val);
        }
      },
    },
  });

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

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (portalMaterialRef.current) {
      portalMaterialRef.current.uniforms["uTime"].value = elapsed;
    }
  });

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />

      {/* --------------------------------------- */}
      {/* --------------------------------------- */}

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
      >
        <meshBasicMaterial color={0xfffdfb} />
      </mesh>
      <mesh
        geometry={lampGlassTwo.geometry}
        position={lampGlassTwo.position}
        rotation={lampGlassTwo.rotation}
      >
        <meshBasicMaterial color={0xfffdfb} />
      </mesh>
      <mesh
        geometry={portalCircle.geometry}
        position={portalCircle.position}
        rotation={portalCircle.rotation}
      >
        <shaderMaterial
          ref={portalMaterialRef}
          vertexShader={portalVertexShader}
          fragmentShader={portalFragmentShader}
          side={DoubleSide}
          uniforms={{
            uTime: { value: 0 },
            // as you can see we used color we extracted
            // and some other color, a white
            uColorStart: { value: new Color(portalUColors.uColorStart) },
            uColorEnd: { value: new Color(portalUColors.uColorEnd) },
          }}
        />
      </mesh>
      {/* --------------------------------------------------- */}
      {/* --------------------------------------------------- */}
      {/* fireflies */}
      <Center>
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={42}
        />
      </Center>
    </>
  );
}

useGLTF.preload("/models/portal/scene.glb");
