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
