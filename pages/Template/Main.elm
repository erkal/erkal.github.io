module Template.Main exposing (main)

import Animation exposing (..)
import Color exposing (hsl, rgb255)
import Html exposing (Html)
import Play exposing (..)
import Playground.Tape exposing (Message(..))
import Scene3d.Material exposing (matte)
import SceneWebGL exposing (..)
import SceneWebGL.Camera as Camera exposing (Camera, perspectiveWithOrbit)


main : Playground Model Never
main =
    Play.simpleApplication
        { initialConfigurations = initialConfigurations
        , init = init
        , update = update
        , view = view
        , hasTape = True
        }


type alias Model =
    {}



-- INIT


initialConfigurations : Configurations
initialConfigurations =
    [ configBlock "Camera"
        [ floatConfig "camera distance" ( 3, 8 ) 8
        , floatConfig "camera azimuth" ( 0, 2 * pi ) 0
        , floatConfig "camera elevation" ( -pi / 2, pi / 2 ) 0.5
        ]
    , configBlock "Color"
        [ colorConfig "cube color" (hsl 0 0.36 0.5)
        ]
    , configBlock "Time"
        [ floatConfig "period" ( 0.1, 5 ) 0.7
        ]
    ]


init : Computer -> Model
init computer =
    {}



-- UPDATE


update : Computer -> Message Never -> Model -> Model
update computer message model =
    model



-- VIEW


camera : Computer -> Camera
camera computer =
    perspectiveWithOrbit
        { focalPoint = { x = 0, y = 0, z = 0 }
        , azimuth = getFloat "camera azimuth" computer
        , elevation = getFloat "camera elevation" computer
        , distance = getFloat "camera distance" computer
        }


view : Computer -> Model -> Html Never
view computer model =
    SceneWebGL.sunny
        { devicePixelRatio = computer.devicePixelRatio
        , screen = computer.screen
        , camera = camera computer
        , backgroundColor = rgb255 26 46 46
        , sunlightAzimuth = -(degrees 135)
        , sunlightElevation = -(degrees 45)
        }
        [ wavingCube computer
        , wavingCube computer |> moveX -2
        , wavingCube computer |> moveX 2
        ]


wavingCube : Computer -> Shape
wavingCube computer =
    block (matte (getColor "cube color" computer)) ( 1, 1, 1 )
        |> scale (wave 1 1.1 (getFloat "period" computer) computer.clock)
