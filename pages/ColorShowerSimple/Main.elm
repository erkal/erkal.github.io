module ColorShowerSimple.Main exposing (main)

import Animation exposing (wave)
import Color exposing (hsl)
import Html.Styled exposing (Html, fromUnstyled)
import Play exposing (..)
import Scene3d.Material exposing (matte)
import SceneWebGL exposing (..)
import SceneWebGL.Camera exposing (Camera, perspectiveWithOrbit)


main =
    Play.simpleApplication
        { initialConfigurations = []
        , init = \_ -> {}
        , update = \_ _ _ -> {}
        , view = \computer model -> fromUnstyled <| view computer model
        , hasTape = True
        }


view computer _ =
    SceneWebGL.sunny
        { devicePixelRatio = computer.devicePixelRatio
        , screen = computer.screen
        , camera =
            perspectiveWithOrbit
                { focalPoint = { x = 0, y = 0, z = 0 }
                , azimuth = 0.05
                , elevation = 0.05
                , distance = 50
                }
        , backgroundColor = hsl 0.85 0.32 0.45
        , sunlightAzimuth = -(degrees 135)
        , sunlightElevation = -(degrees 45)
        }
        [ axes 50 0.05
        ]
