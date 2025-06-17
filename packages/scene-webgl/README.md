# SceneWebGL

A high-level Elm package for 3D graphics rendering built on top of elm-3d-scene.

## Overview

SceneWebGL provides a simplified API for creating 3D scenes in Elm applications. It offers a set of basic shapes, transformations, camera options, and lighting setups that make 3D graphics more accessible while still allowing for complex visualizations.

## Features

- **Simple Shape Primitives**: Create cubes, spheres, cylinders, blocks, triangles, and lines
- **Easy Transformations**: Move, rotate, and scale shapes with simple functions
- **Flexible Camera Options**: Perspective, orthographic, and orbit camera controls
- **Mouse Interaction**: Utilities to convert screen coordinates to 3D world coordinates
- **Lighting System**: Directional lights, point lights, and soft ambient lighting with shadow support
- **Scene Types**:
  - `sunny`: Daylight-simulated scene with sunlight
  - `unlit`: Basic scene without lighting
  - `custom`: Fully customizable scene
- **Play Framework Integration**: Designed to work with the Play playground framework

## Usage Example

```elm
import SceneWebGL exposing (..)
import SceneWebGL.Camera as Camera
import Scene3d.Material exposing (matte)
import Color

main =
    SceneWebGL.sunny
        { devicePixelRatio = 1.0
        , screen = { width = 800, height = 600 }
        , camera = Camera.perspectiveWithOrbit
            { focalPoint = { x = 0, y = 0, z = 0 }
            , azimuth = 0.6
            , elevation = 0.4
            , distance = 10
            }
        , sunlightAzimuth = 5.5
        , sunlightElevation = -1
        , backgroundColor = Color.black
        }
        [ cube (matte Color.red) 1
            |> moveX 2
        , sphere (matte Color.blue) 1
            |> moveX -2
        ]
```

## Package Structure

- **Main Module**: Basic shapes, transformations, and scene rendering
- **Camera Module**: Camera definitions and mouse interaction utilities
- **Light Module**: Light source definitions
- **ModifiedFromScene3d/Scenes**: Scene rendering with different lighting setups

## Dependencies

This package builds upon:
- elm-3d-scene
- elm-units
- elm-geometry

## Contributing

This package is part of the [erkal.github.io](https://erkal.github.io) project. Check out the main repository for contribution guidelines.