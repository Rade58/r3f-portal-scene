import { OrbitControls, useGLTF } from "@react-three/drei";

// import { Perf } from "r3f-perf";

// import { useControls } from "leva";

export function Experience() {
  // const someControls = useControls("_", { test: 1 });

  const model = useGLTF("/models/portal/scene.glb");

  console.log({ model });

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />
    </>
  );
}

// useGLTF.preload("/models/portal/scene.glb");
