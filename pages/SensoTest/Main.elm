module SensoTest.Main exposing (main)

import Color
import Css
import Css.Global
import Css.Transitions
import DesignSystem.Color exposing (..)
import Html.Styled exposing (Html, div, fromUnstyled, text)
import Html.Styled.Attributes exposing (css)
import Play exposing (..)
import Playground.Senso as Senso
import Playground.Tape exposing (Message(..))
import Round
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


initialConfigurations : Configurations
initialConfigurations =
    [ configBlock "Camera"
        [ floatConfig "camera azimuth" ( 0, 2 * pi ) 0
        , floatConfig "camera elevation" ( -pi / 2, pi / 2 ) 0
        ]
    , configBlock "Other things"
        [ optionsConfig "some options" ( [ "option 1", "option 2" ], "option 3", [ "option 4", "option 5" ] )
        ]
    ]


type alias Model =
    {}


init : Computer -> Model
init computer =
    {}


update : Computer -> Message Never -> Model -> Model
update computer message model =
    case message of
        Tick ->
            model

        _ ->
            model


camera : Computer -> Camera
camera computer =
    perspectiveWithOrbit
        { focalPoint = { x = 0, y = 0, z = 0 }
        , azimuth = getFloat "camera azimuth" computer
        , elevation = getFloat "camera elevation" computer
        , distance = 2
        }


view : Computer -> Model -> Html Never
view computer model =
    div []
        [ viewSensoAsText computer
        , viewSensoAsDrawing computer model
        ]


viewSensoAsText : Computer -> Html Never
viewSensoAsText { senso } =
    let
        viewArea name { x, y, f } =
            div [ css [ Css.backgroundColor (setOpacity 0.1 white |> toCssColor), Css.padding (Css.px 16) ] ]
                [ div [] [ text name ]
                , div [ css [ Css.paddingLeft (Css.px 16) ] ]
                    [ div [] [ text <| "x: " ++ Round.floorCom 3 x ]
                    , div [] [ text <| "y: " ++ Round.floorCom 3 y ]
                    , div [] [ text <| "f: " ++ Round.floorCom 3 f ]
                    ]
                ]
    in
    div
        [ css
            [ Css.position Css.absolute
            , Css.margin (Css.px 64)
            , Css.padding (Css.px 64)
            , Css.backgroundColor (setOpacity 0.1 white |> toCssColor)
            , Css.displayFlex
            , Css.flexDirection Css.column
            , Css.property "gap" "32px"
            ]
        ]
        [ div [] [ text "current:" ]
        , div [ css [ Css.displayFlex, Css.flexDirection Css.row, Css.property "gap" "32px" ] ]
            [ viewArea "center:" senso.center
            , viewArea "right:" senso.right
            , viewArea "up:" senso.up
            , viewArea "left:" senso.left
            , viewArea "down:" senso.down
            ]
        , div [] [ text "target:" ]
        , div [ css [ Css.displayFlex, Css.flexDirection Css.row, Css.property "gap" "32px" ] ]
            [ viewArea "center:" senso.target.center
            , viewArea "right:" senso.target.right
            , viewArea "up:" senso.target.up
            , viewArea "left:" senso.target.left
            , viewArea "down:" senso.target.down
            ]
        , div [] [ text "unified:" ]
        , div []
            [ viewArea "x:" (senso |> Senso.getUnifiedPress)
            ]
        ]



--


viewSensoAsDrawing : Computer -> Model -> Html Never
viewSensoAsDrawing computer model =
    fromUnstyled <|
        SceneWebGL.sunny
            { devicePixelRatio = computer.devicePixelRatio
            , screen = computer.screen
            , camera = camera computer
            , backgroundColor = gray900
            , sunlightAzimuth = -(degrees 135)
            , sunlightElevation = -(degrees 45)
            }
            [ viewSenso computer model
            , axes
            ]


axes : Shape
axes =
    group
        [ line red ( 100, 0, 0 ) -- x axis
        , line green ( 0, 100, 0 ) -- y axis
        , line blue ( 0, 0, 100 ) -- z axis
        ]


viewSenso : Computer -> Model -> Shape
viewSenso { senso } model =
    let
        { x, y, f } =
            senso |> Senso.getUnifiedPress
    in
    sphere (matte blue) f
        |> moveX x
        |> moveY y



--|> moveZ f
