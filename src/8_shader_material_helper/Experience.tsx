import { extend, useFrame } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei";
import {
  Color,
  DoubleSide,
  type ShaderMaterial,
  type Group,
  type Mesh,
} from "three";
import { useRef } from "react";

// import { Perf } from "r3f-perf";

import { useControls } from "leva";

import portalVertexShader from "./portal/vertex.glsl";
import portalFragmentShader from "./portal/fragment.glsl";

const portalUColors = {
  uColorStart: "#89bfcd",
  uColorEnd: "#ecdada",
};

//  -------------------------------------------------------
//  -------------------------------------------------------
const PortalShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new Color(portalUColors.uColorStart),
    uColorEnd: new Color(portalUColors.uColorEnd),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalShaderMaterial });
//  -------------------------------------------------------
//  -------------------------------------------------------

export function Experience() {
  // instead of this
  // const portalMaterialRef = useRef<ShaderMaterial>(null);
  const portalMaterialRef = useRef<typeof PortalShaderMaterial>(null);

  /* const portalControls = */ useControls("portal", {
    uColorStart: {
      value: portalUColors.uColorStart,
      onChange(val) {
        // instead of this
        if (portalMaterialRef.current) {
          // instead of this
          // portalMaterialRef.current.uniforms["uColorStart"].value.set(val);
          // we do this
          // @ts-expect-error uniform type not there
          portalMaterialRef.current["uColorStart"].set(val);
        }
      },
    },
    uColorEnd: {
      value: portalUColors.uColorEnd,
      onChange(val) {
        if (portalMaterialRef.current) {
          // instead of this
          // portalMaterialRef.current.uniforms["uColorEnd"].value.set(val);
          // we do it like this
          // @ts-expect-error uniform type not there
          portalMaterialRef.current["uColorEnd"].set(val);
        }
      },
    },
  });

  const bakedTexture = useTexture("/models/portal/baked.jpg");

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

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    if (portalMaterialRef.current) {
      // instead of this
      // portalMaterialRef.current.uniforms["uTime"].value = elapsed;
      // we do it like this
      // portalMaterialRef.current["uTime"] = elapsed;
      // @ts-expect-error made with extend, uniform not typed
      portalMaterialRef.current["uTime"] += delta;
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
        {/* instead of this */}
        {/*  <shaderMaterial
          ref={portalMaterialRef}
          vertexShader={portalVertexShader}
          fragmentShader={portalFragmentShader}
          side={DoubleSide}
          uniforms={{
            uTime: { value: 0 },
            uColorStart: { value: new Color(portalUColors.uColorStart) },
            uColorEnd: { value: new Color(portalUColors.uColorEnd) },
          }}
        /> */}
        {/* we write this */}
        {/* ------------------------- */}
        {/* @ts-expect-error implemented with extend */}
        <portalShaderMaterial ref={portalMaterialRef} />
        {/* ------------------------- */}
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
