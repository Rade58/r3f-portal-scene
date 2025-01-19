# R3F Workshops - Redoing portal scene

Original portal scene, built with pure threejs: <https://github.com/Rade58/portal_scene>

We are not going to build new model, we will use one we already built, also we are going te reuse all shaders we already built

- Bootstraped with:

```
pnpm create vite
```

- dependancies

```
pnpm add three @react-three/fiber @react-three/drei leva@0.9.34
```

```
pnpm add -D r3f-perf @types/three
```

# Leva @0.9.34

latest version has bug I think, unable to use joystick and color picker (maybe because I'm using react 18)

# We will not going to load whole model at once

The model is composed of multiple parts

- The baked model to which we need to apply a MeshBasicMaterial with the baked texture
- Two pole lights Meshes to which we need to apply a MeshBasicMaterial
- The portal to which we need to apply a ShaderMaterial

So we are going to access `nodes` property of the model we get from useGLTF

And what is great is that nodes have names we gave them in blender

That way it is easy to destructure the object

# We are not going to use `<primitive>` because we want to apply our own material to the Mesh

# For positioning (centering), I'm not going to use `Center` component

We need to access mesh from nodes, then we use `position` property to position object, and `rotation` property

This way we will center our model, or each part of our model since we are adding separate parts of our model

# We didn't reuse materials for pole light meshes

Since there is only two of them, there is almost no impact on performance at all

# Shaders - portal shader

I installed `"vite-plugin-glslify"`, and added plugin to vite configuration, I also added global.d.ts file to cover importing of shaders

Also don't forget to install noise functions if you want to import them with #pragma syntax

I installed `"glsl-noise"` because in fragment shader I'm using 3d noise

I also defined and set uniforms

and inside useFrame, i;m updating uTime uniform

I also define color change of some uniforms in leva (color) but this didn't work

**So I use onChange callback for setting these color uniforms**

check `src/6_portal/Experience.tsx` so you can see what I did
