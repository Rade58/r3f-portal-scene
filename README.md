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

# So we are going to access `nodes` property of the model we get from useGLTF

And what is great is that nodes have names we gave them in blender

That way it is easy to destructure the object and to get specific Mesh we named in Blender

# We are not going to use `<primitive>`

Because we want to apply our own materials to the Meshs of the model

# For positioning (centering), I'm not going to use `Center` component

We need to access mesh from nodes, then we use `position` property to position object, and `rotation` property

This way we will center our model, or each part of our model since we are adding separate parts of our model

# toneMapping

toneMapping is usually welcome and colors look better with it, but, in our case, we don't want it because our scene has been baked from Blender and Blender already applies tone mapping with its color management system We want to get the exact same color as the one we baked in Blender

So set boolean `flat` propery on `<Canvas>` component

this will set toneMaping to be `THREE.NoToneMapping`

**When setting this I didn't notice any change, only change that I can notice is when I change tone maping exposure or change toneMapping to Cineon or something else, so I assume that `flat={true}` is default**

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

# Fireflies particles with `Sparkles` helper from drei

This is the first time we are dealing with particles within r3f

We can use our custom shaders with particles, but we didn't since these sparkles are similar to fireflies

Check the docs: <https://drei.docs.pmnd.rs/staging/sparkles#sparkles> if you want to add your custom shader
