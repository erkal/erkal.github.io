module BallGame.Main exposing (main)

import BallGame.Triangulate
import BallGame.World as World exposing (World)
import BallGame.World.Decode
import BallGame.World.Encode
import BallGame.World.Physics.Collision.Primitives.Geometry2d exposing (Point2d, Vector2d, distance, edgesOfPolygon, edgesOfPolyline)
import BallGame.World.Physics.Tick
import Color
import Css
import Css.Global
import Css.Transitions
import DesignSystem.Color exposing (..)
import Geometry3d exposing (Point, Vector)
import Html.Styled exposing (Html, button, div, fromUnstyled, p, text)
import Html.Styled.Attributes exposing (class, css)
import Html.Styled.Events exposing (onClick)
import Icons
import Illuminance
import Levels exposing (Levels)
import LuminousFlux
import Play exposing (..)
import Playground.Tape exposing (Message(..))
import Scene3d
import Scene3d.Light
import Scene3d.Material as Material
import SceneWebGL exposing (..)
import SceneWebGL.Camera as Camera exposing (Camera, orthographic, perspectiveWithOrbit)
import SceneWebGL.Light as Light
import Temperature


main : Playground Model Msg
main =
    Play.simpleApplication
        { initialConfigurations = initialConfigurations
        , init = init
        , update = update
        , view = view
        , hasTape = True
        }


type alias Model =
    { levels : Levels World
    , editorIsOn : Bool
    , state : State
    , camera : Camera
    , mouseOverXY : Point2d
    }


type State
    = Idle
    | DrawingPolygon (List Point2d)



-- INIT


initialConfigurations : Configurations
initialConfigurations =
    [ configBlock "View Options"
        [ boolConfig "draw speed vector" False
        , boolConfig "draw ball trail" True
        , boolConfig "orthographic" False
        , boolConfig "unlit" False
        ]
    , configBlock "Camera"
        [ floatConfig "camera distance" ( 3, 60 ) 15
        , floatConfig "camera azimuth" ( 0, 2 * pi ) 0
        , floatConfig "camera elevation" ( -pi / 2, pi / 2 ) 0
        ]
    , configBlock "Physics Parameters"
        [ boolConfig "fix time steps" False
        , floatConfig "gas force" ( 20, 60 ) 40
        , floatConfig "friction" ( 0, 1 ) 0.4
        , floatConfig "direction change speed" ( 1, 5 ) 3
        ]
    ]


init : Computer -> Model
init computer =
    { levels = Levels.init BallGame.World.Encode.encode BallGame.World.Decode.decoder { name = "level 1", level = World.init } []
    , editorIsOn = True
    , state = Idle
    , camera = camera computer { x = 0, y = 0, z = 0 }
    , mouseOverXY = Point2d 0 0
    }


camera : Computer -> Point -> Camera
camera computer focalPoint =
    if getBool "orthographic" computer then
        orthographic
            { focalPoint = focalPoint
            , azimuth = getFloat "camera azimuth" computer
            , elevation = getFloat "camera elevation" computer
            , viewportHeight = getFloat "camera distance" computer
            }

    else
        perspectiveWithOrbit
            { focalPoint = focalPoint
            , azimuth = getFloat "camera azimuth" computer
            , elevation = getFloat "camera elevation" computer
            , distance = getFloat "camera distance" computer
            }



-- UPDATE


update : Computer -> Message Msg -> Model -> Model
update computer_ message model =
    let
        computer =
            if getBool "fix time steps" computer_ then
                { computer_ | dt = 0.016 }

            else
                computer_

        handleEditorInput =
            if model.editorIsOn then
                handleDrawingPolygon computer

            else
                identity
    in
    case message of
        Tick ->
            model
                |> handleEditorInput
                |> updateMouseOverXY computer
                |> tickWorld computer
                |> moveCamera computer

        Message editorMsg ->
            model
                |> handleEditorMsg editorMsg


handleDrawingPolygon : Computer -> Model -> Model
handleDrawingPolygon computer model =
    case ( computer.keyboard.shift, model.state ) of
        ( True, DrawingPolygon l ) ->
            let
                newPoint =
                    model.mouseOverXY
            in
            { model
                | state =
                    DrawingPolygon
                        (case List.reverse l of
                            [] ->
                                [ newPoint ]

                            last :: _ ->
                                if distance last newPoint > 2 then
                                    l ++ [ newPoint ]

                                else
                                    l
                        )
            }

        _ ->
            model


updateMouseOverXY : Computer -> Model -> Model
updateMouseOverXY computer model =
    { model
        | mouseOverXY =
            computer.pointer
                |> Camera.mouseOverXY model.camera computer.screen
                |> Maybe.map (\p -> Point2d p.x p.y)
                |> Maybe.withDefault model.mouseOverXY
    }


moveCamera : Computer -> Model -> Model
moveCamera computer model =
    let
        ball =
            (Levels.current model.levels).ball
    in
    { model
        | camera =
            camera computer (Point ball.circle.center.x ball.circle.center.y 0)
    }


tickWorld : Computer -> Model -> Model
tickWorld computer model =
    let
        newWorld =
            Levels.current model.levels |> BallGame.World.Physics.Tick.tick computer
    in
    { model | levels = model.levels |> Levels.mapCurrent (always newWorld) }



-- VIEW


view : Computer -> Model -> Html Msg
view computer model =
    div []
        [ div
            [ css
                [ Css.position Css.fixed
                , Css.color (setOpacity 0.5 white |> toCssColor)
                , Css.marginLeft (Css.px 320)
                , Css.marginTop (Css.px 32)
                ]
            ]
            [ div [] [ text "Roll the ball with arrow keys" ]
            , div [] [ text "Draw polygons with polygon editor on right bar" ]
            , div [] [ text "Play with `friction` and `gas force` on the left bar" ]
            ]
        , Html.Styled.map never (viewGame computer model)
        , viewEditor computer model
        ]


viewGame : Computer -> Model -> Html Never
viewGame computer model =
    let
        firstLight =
            Light.point
                { position = { x = -2, y = 4, z = 3 }
                , chromaticity = Scene3d.Light.incandescent
                , intensity = LuminousFlux.lumens 6000
                }

        secondLight =
            Light.point
                { position = { x = 2, y = 3, z = 3 }
                , chromaticity = Scene3d.Light.fluorescent
                , intensity = LuminousFlux.lumens 6000
                }

        thirdLight =
            Light.directional
                { azimuth = 0
                , elevation = degrees 90
                , chromaticity = Scene3d.Light.colorTemperature (Temperature.kelvins 2000)
                , intensity = Illuminance.lux 240
                }

        fourthLight =
            Light.soft
                { azimuth = 0
                , elevation = degrees 90
                , chromaticity = Scene3d.Light.fluorescent
                , intensityAbove = Illuminance.lux 30
                , intensityBelow = Illuminance.lux 30
                }

        viewScene =
            if getBool "unlit" computer then
                SceneWebGL.unlit
                    { devicePixelRatio = computer.devicePixelRatio
                    , screen = computer.screen
                    , camera = model.camera
                    , clipDepth = 0.1
                    , background = gray700
                    }

            else
                SceneWebGL.custom
                    { devicePixelRatio = computer.devicePixelRatio
                    , screen = computer.screen
                    , camera = model.camera
                    , lights = Scene3d.fourLights firstLight secondLight thirdLight fourthLight
                    , clipDepth = 0.1
                    , exposure = Scene3d.exposureValue 6
                    , toneMapping = Scene3d.hableFilmicToneMapping -- See ExposureAndToneMapping.elm for details
                    , whiteBalance = Scene3d.Light.fluorescent
                    , antialiasing = Scene3d.multisampling
                    , backgroundColor = cyan900
                    }
    in
    fromUnstyled <|
        viewScene
            [ SceneWebGL.axes 10 0.1

            --, drawFloor computer
            , drawBall computer model
            , drawBallTrail computer model
            , drawPolygons computer model
            , drawMouseOverXY computer model
            , drawPolygonBeingEdited computer model
            ]


material computer color =
    if getBool "unlit" computer then
        Material.color color

    else
        Material.matte color


drawFloor : Computer -> Shape
drawFloor computer =
    group
        [ block (material computer (getColor "floor color" computer))
            ( 50, 50, 1 )
            |> moveZ -0.51
        ]


drawMouseOverXY : Computer -> Model -> Shape
drawMouseOverXY computer model =
    sphere (material computer red) 0.2
        |> moveX model.mouseOverXY.x
        |> moveY model.mouseOverXY.y


drawPolygonBeingEdited : Computer -> Model -> Shape
drawPolygonBeingEdited computer model =
    case model.state of
        DrawingPolygon points ->
            group
                (points
                    |> edgesOfPolyline
                    |> List.map (thickLine2d computer blue 0.2)
                )

        _ ->
            group []


thickLine2d : Computer -> Color -> Float -> ( Point2d, Point2d ) -> Shape
thickLine2d computer color thickness ( start, end ) =
    thickLine computer color thickness ( Point start.x start.y 0, Point end.x end.y 0 )


thickLine : Computer -> Color -> Float -> ( Point, Point ) -> Shape
thickLine computer color thickness ( start, end ) =
    let
        ( x, y, z ) =
            ( end.x - start.x
            , end.y - start.y
            , end.z - start.z
            )

        { radius, azimuth, inclination } =
            Geometry3d.toSphericalCoordinates ( x, y, z )
    in
    cylinder (material computer color) (thickness / 2) radius
        |> rotateZ (degrees 90)
        |> moveX (radius / 2)
        |> rotateY (inclination - degrees 90)
        |> rotateZ azimuth
        |> moveX start.x
        |> moveY start.y
        |> moveZ start.z


drawPolygons : Computer -> Model -> Shape
drawPolygons computer model =
    let
        material_ =
            material computer (Color.hsl 0.6 0.5 0.5)

        height =
            2

        to3dPoint { x, y } =
            Point x y height

        drawTop polygonBody =
            group
                (polygonBody.polygon
                    |> BallGame.Triangulate.triangulate
                    |> List.map (\( a, b, c ) -> triangle material_ ( to3dPoint a, to3dPoint b, to3dPoint c ))
                )

        drawWallForEdge ( start, end ) =
            group
                [ triangle material_
                    ( to3dPoint start
                    , to3dPoint end
                    , to3dPoint start |> Geometry3d.translateBy ( 0, 0, -height )
                    )
                , triangle material_
                    ( to3dPoint start |> Geometry3d.translateBy ( 0, 0, -height )
                    , to3dPoint end
                    , to3dPoint end |> Geometry3d.translateBy ( 0, 0, -height )
                    )
                ]

        drawWalls polygonBody =
            group
                (polygonBody.polygon
                    |> edgesOfPolygon
                    |> List.map drawWallForEdge
                )

        drawPolygon polygonBody =
            group
                [ drawTop polygonBody
                , drawWalls polygonBody
                ]
    in
    group
        ((Levels.current model.levels).polygons |> List.map drawPolygon)


drawBall : Computer -> Model -> Shape
drawBall computer model =
    let
        ball =
            (Levels.current model.levels).ball

        playerBall =
            group
                [ group
                    [ sphere (material computer red) ball.circle.radius |> moveX -0.02
                    , sphere (material computer yellow) ball.circle.radius |> moveX 0.02
                    ]
                    |> rotateY ball.rotation
                , cylinder (material computer black) 0.2 1.1
                ]
                |> rotateZ ball.directionFromXAxis

        ( vx, vy ) =
            ball.velocity

        speedVector =
            if getBool "draw speed vector" computer then
                thickLine2d computer
                    green800
                    0.2
                    ( Point2d 0 0
                    , Point2d (0.3 * vx) (0.3 * vy)
                    )

            else
                group []
    in
    group
        [ playerBall
        , speedVector
        ]
        |> moveZ 0.5
        |> moveX ball.circle.center.x
        |> moveY ball.circle.center.y


miniTriangle : Computer -> Shape
miniTriangle computer =
    triangle (material computer blue)
        ( Point 0 0 0
        , Point 0.1 0 0
        , Point 0 0.1 0
        )


drawBallTrail : Computer -> Model -> Shape
drawBallTrail computer model =
    if getBool "draw ball trail" computer then
        let
            ball =
                (Levels.current model.levels).ball
        in
        group
            (ball.trail
                |> List.map (\p -> miniTriangle computer |> moveX p.x |> moveY p.y)
            )

    else
        group []



--  EDITOR


type Msg
    = PressedEditorOnOffButton
    | ClickedButtonStartDrawingPolygon
    | ClickedButtonFinishDrawingPolygon (List Point2d)
    | FromLevelEditor Levels.Msg


handleEditorMsg : Msg -> Model -> Model
handleEditorMsg editorMessage model =
    case editorMessage of
        PressedEditorOnOffButton ->
            { model
                | editorIsOn = not model.editorIsOn
                , state = Idle
            }

        ClickedButtonStartDrawingPolygon ->
            { model | state = DrawingPolygon [] }

        ClickedButtonFinishDrawingPolygon points ->
            { model
                | state = Idle
                , levels = model.levels |> Levels.mapCurrent (World.addPolygon points)
            }

        FromLevelEditor levelEditorMsg ->
            { model | levels = model.levels |> Levels.update levelEditorMsg }


viewEditor : Computer -> Model -> Html Msg
viewEditor computer model =
    div
        []
        [ editorContent computer model
        , editorToggleButton model
        ]


editorToggleButton : Model -> Html Msg
editorToggleButton model =
    div
        [ css
            [ Css.position Css.fixed
            , Css.top Css.zero
            , Css.right Css.zero
            ]
        ]
        [ button
            [ css
                [ Css.width (Css.px 40)
                , Css.padding (Css.px 8)
                , Css.color (setOpacity 0.2 white |> toCssColor)
                , Css.hover [ Css.color (toCssColor white) ]
                , Css.active [ Css.color (setOpacity 0.6 white |> toCssColor) ]
                ]
            , onClick PressedEditorOnOffButton
            ]
            [ if model.editorIsOn then
                Icons.icons.cross

              else
                Icons.icons.pen
            ]
        ]


editorContent : Computer -> Model -> Html Msg
editorContent computer model =
    if model.editorIsOn then
        div
            [ css
                [ Css.position Css.fixed
                , Css.top Css.zero
                , Css.right Css.zero
                , Css.width (Css.px 300)
                , Css.height (Css.px (computer.screen.height - 80))
                , Css.backgroundColor (setOpacity 0.2 black |> toCssColor)
                , Css.border3 (Css.px 0.5) Css.solid (setOpacity 0.2 white |> toCssColor)
                , Css.overflowY Css.scroll
                , Css.fontSize (Css.px 12)
                , Css.color (setOpacity 0.6 white |> toCssColor)
                ]
            ]
            [ div
                [ css
                    [ Css.padding (Css.px 16)
                    , Css.border3 (Css.px 0.5) Css.solid (setOpacity 0.2 white |> toCssColor)
                    ]
                ]
                [ viewPolygonEditor computer model ]
            , div
                [ css
                    [ Css.padding (Css.px 16)
                    , Css.border3 (Css.px 0.5) Css.solid (setOpacity 0.2 white |> toCssColor)
                    ]
                ]
                [ pageSelection model ]
            ]

    else
        div [] []


viewPolygonEditor : Computer -> Model -> Html Msg
viewPolygonEditor computer model =
    div []
        [ div
            [ css [ Css.height (Css.px 160) ] ]
            [ div [ css [ Css.fontSize (Css.px 18) ] ] [ text "Polygon editor" ]
            , case model.state of
                DrawingPolygon points ->
                    div [ css [ Css.padding (Css.px 8) ] ]
                        [ div [] [ text "Now, draw your polygon in the counter-clockwise direction by holding the shift key pressed. " ]
                        , div [] [ text "After you are finished drawing, click the button below." ]
                        , makeButton (ClickedButtonFinishDrawingPolygon points) "Finish drawing polygon"
                        ]

                _ ->
                    makeButton ClickedButtonStartDrawingPolygon "Start drawing a polygon"
            ]
        ]


makeButton : msg -> String -> Html msg
makeButton msg string =
    button
        [ css
            [ Css.margin (Css.px 4)
            , Css.padding (Css.px 8)
            , Css.borderRadius (Css.px 4)
            , Css.backgroundColor (setOpacity 0.4 black |> toCssColor)
            , Css.hover [ Css.backgroundColor (setOpacity 0.8 black |> toCssColor) ]
            ]
        , onClick msg
        ]
        [ text string ]


pageSelection : Model -> Html Msg
pageSelection model =
    div []
        [ div [ css [ Css.fontSize (Css.px 18) ] ] [ text "Levels" ]
        , div [ css [ Css.padding (Css.px 16) ] ] [ Html.Styled.map FromLevelEditor (Levels.view model.levels) ]
        ]
