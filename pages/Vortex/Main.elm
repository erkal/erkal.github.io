module Vortex.Main exposing (main)

import Animation exposing (..)
import Color exposing (blue, green, hsl, rgb255, white, yellow)
import Color.Oklch exposing (oklch, toColor)
import Html exposing (Html)
import Play exposing (..)
import Playground.Tape exposing (Message(..))
import Scene3d.Material exposing (matte)
import SceneWebGL exposing (..)
import SceneWebGL.Camera as Camera exposing (Camera, perspectiveWithOrbit)


main : Playground () Never
main =
    Play.simpleApplication
        { initialConfigurations = initialConfigurations
        , init = \_ -> ()
        , update = \_ _ -> identity
        , view = view
        , hasTape = True
        }



-- INIT


initialConfigurations : Configurations
initialConfigurations =
    [ configBlock "Camera"
        [ floatConfig "camera distance" ( 3, 100 ) 50
        , floatConfig "camera azimuth" ( 0, 2 * pi ) 0
        , floatConfig "camera elevation" ( -pi / 2, pi / 2 ) 0.5
        ]
    ]



-- VIEW


camera : Computer -> Camera
camera computer =
    perspectiveWithOrbit
        { focalPoint = { x = 0, y = 0, z = 0 }
        , azimuth = getFloat "camera azimuth" computer
        , elevation = getFloat "camera elevation" computer
        , distance = getFloat "camera distance" computer
        }


scene : Computer -> List Shape -> Html Never
scene computer =
    SceneWebGL.sunny
        { devicePixelRatio = computer.devicePixelRatio
        , screen = computer.screen
        , camera = camera computer
        , backgroundColor = rgb255 38 35 54
        , sunlightAzimuth = -(degrees 135)
        , sunlightElevation = -(degrees 45)
        }



--


view : Computer -> () -> Html Never
view ({ clock } as computer) model =
    scene computer
        (List.range 0 n |> List.map (vortex clock))


n =
    1200


vortex clock i =
    let
        s =
            (toFloat i / toFloat n) + sin (0.01 * clock)

        color =
            oklch 0.95 0.2 s |> toColor
    in
    block (matte color) ( 2, 4, 2 )
        |> scale (0.5 + s)
        |> moveX (10 * s)
        |> rotateY (0.1 * s * clock)
        |> rotateX (toFloat i * 0.01 * s)
        |> rotateY (s * 2 * pi)
