module CanvasExample.Main exposing (main)

import Camera exposing (Camera)
import Color exposing (black, blue, darkBlue, darkGreen, darkPurple, gray, green, lightBlue, lightGray, lightGreen, lightPurple, lightYellow, purple, red, rgb255, white)
import Geometry2d exposing (..)
import Html exposing (Html)
import Play exposing (..)
import Playground.Tape exposing (Message(..))
import SceneCanvas2D exposing (..)


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
    { pointerInGameCoordinates : Point2d }



-- INIT


initialConfigurations : Configurations
initialConfigurations =
    []


init : Computer -> Model
init computer =
    { pointerInGameCoordinates = Point2d 0 0 }



-- UPDATE


update : Computer -> Message Never -> Model -> Model
update computer message model =
    case message of
        Tick ->
            { model
                | pointerInGameCoordinates =
                    Point2d
                        (0.5 + computer.pointer.x / computer.screen.width)
                        (0.5 - computer.pointer.y / computer.screen.width)
                        |> Camera.screenCoordinatesToCanvasCoordinates (camera computer)
            }

        Message appMsg ->
            model


camera : Computer -> Camera
camera computer =
    Camera.init
        { aspectRatio = computer.screen.width / computer.screen.height
        , fOVWidth = 20
        , yIsUp = False
        }



-- VIEW


view : Computer -> Model -> Html Never
view computer model =
    SceneCanvas2D.toHtml
        { sceneWidthInPixels = round computer.screen.width
        , camera = camera computer
        }
        [ rectangle 25 25 purple
        , rectangle 4 4 lightBlue
        , rectangle 2 2 lightGray
            |> moveX 3
            |> moveY 3
        , group
            [ circle 1.5 lightPurple
            , circle 0.5 darkPurple
                |> moveY (sin (3 * computer.clock))
            ]
            |> moveX (sin (3 * computer.clock))
        , circle 0.2 white
            |> moveX model.pointerInGameCoordinates.x
            |> moveY model.pointerInGameCoordinates.y
        ]
