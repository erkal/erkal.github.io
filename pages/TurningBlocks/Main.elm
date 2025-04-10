module TurningBlocks.Main exposing (main)

import Animation exposing (wave)
import Color exposing (gray, hsl, rgba)
import Html.Styled exposing (Html, fromUnstyled)
import Illuminance
import LuminousFlux
import Play exposing (..)
import Playground.Tape exposing (Message(..))
import Scene3d
import Scene3d.Light
import Scene3d.Material exposing (matte)
import SceneWebGL exposing (..)
import SceneWebGL.Camera as Camera exposing (Camera, perspective)
import SceneWebGL.Light as Light
import Temperature


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


init : Computer -> Model
init computer =
    {}


initialConfigurations : Configurations
initialConfigurations =
    [ configBlock "Parameters"
        [ floatConfig "a" ( 0, 3 ) 1
        ]
    , configBlock "Colors and light"
        [ floatConfig "lux" ( 2, 5 ) 5
        , floatConfig "intensity above" ( 0, 300 ) 60
        , floatConfig "intensity below" ( 0, 300 ) 290
        ]
    ]



-- UPDATE


update : Computer -> Message Never -> Model -> Model
update computer message model =
    model



-- VIEW


view : Computer -> Model -> Html Never
view computer model =
    let
        firstLight : Scene3d.Light.Light coordinates Bool
        firstLight =
            Light.point
                { position = { x = -45, y = 30, z = 45 }
                , chromaticity = Scene3d.Light.incandescent
                , intensity = LuminousFlux.lumens 6000
                }

        secondLight : Scene3d.Light.Light coordinates Bool
        secondLight =
            Light.point
                { position = { x = -45, y = -30, z = 45 }
                , chromaticity = Scene3d.Light.fluorescent
                , intensity = LuminousFlux.lumens 6000
                }

        thirdLight : Scene3d.Light.Light coordinates Bool
        thirdLight =
            Light.directional
                { azimuth = getFloat "azimuth for third light" computer
                , elevation = getFloat "elevation for third light" computer
                , chromaticity = Scene3d.Light.colorTemperature (Temperature.kelvins 2000)
                , intensity = Illuminance.lux (10 ^ getFloat "lux" computer)
                }

        fourthLight : Scene3d.Light.Light coordinates Never
        fourthLight =
            Light.soft
                { azimuth = getFloat "azimuth for fourth light" computer
                , elevation = getFloat "elevation for fourth light" computer
                , chromaticity = Scene3d.Light.fluorescent
                , intensityAbove = Illuminance.lux (getFloat "intensity above" computer)
                , intensityBelow = Illuminance.lux (getFloat "intensity below" computer)
                }
    in
    fromUnstyled <|
        SceneWebGL.custom
            { devicePixelRatio = computer.devicePixelRatio
            , screen = computer.screen
            , camera = camera computer
            , lights =
                Scene3d.fourLights
                    firstLight
                    secondLight
                    thirdLight
                    fourthLight
            , clipDepth = 0.1
            , exposure = Scene3d.exposureValue 6
            , toneMapping = Scene3d.hableFilmicToneMapping -- See ExposureAndToneMapping.elm for details
            , whiteBalance = Scene3d.Light.fluorescent
            , antialiasing = Scene3d.multisampling
            , backgroundColor = rgba 0 0 0 0.7
            }
            (shapes computer model)


camera : Computer -> Camera
camera computer =
    perspective
        { focalPoint = { x = 0, y = 0, z = 0 }
        , eyePoint =
            { x = 10
            , y = wave -20 20 20 computer.clock
            , z = 60
            }
        , upDirection = { x = 0, y = 1, z = 0 }
        }


shapes : Computer -> Model -> List Shape
shapes computer model =
    [ yellowBlocks computer
    ]


yellowBlocks : Computer -> Shape
yellowBlocks computer =
    let
        delay : Int -> Float
        delay i =
            0.1 * toFloat i

        wavy : Int -> Float
        wavy i =
            wave 0 1 4 (computer.clock + delay i)

        oneBlock : Int -> Shape
        oneBlock i =
            block (matte (hsl (wavy i) 0.6 0.8)) ( 1, 3, 1 )
                |> scale (getFloat "a" computer * toFloat i)
                |> moveX (getFloat "a" computer * toFloat i)
                |> rotateY (wavy i)
                |> rotateX (wavy i)
                |> rotateZ (wavy i)
                |> moveX (1.4 * toFloat i)
    in
    group
        (List.range -10 10
            |> List.map oneBlock
        )
