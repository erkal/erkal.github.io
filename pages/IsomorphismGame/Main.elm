module IsomorphismGame.Main exposing (main)

import Css exposing (active, backgroundColor, border3, borderBottom, borderRadius, borderRight, borderTop, color, fixed, fontSize, height, hover, margin, marginLeft, marginTop, overflow, overflowY, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, position, property, px, right, solid, top, width)
import Css.Global
import Css.Transitions
import DesignSystem.Color exposing (..)
import Html
import Html.Styled exposing (Html, button, div, fromUnstyled, input, p, pre, span, text, textarea)
import Html.Styled.Attributes exposing (checked, cols, css, for, id, name, rows, value)
import Html.Styled.Events exposing (onClick)
import Icons
import Illuminance
import IsomorphismGame.GeometryHelpers as GeometryHelpers exposing (Point, lerp)
import IsomorphismGame.Graph as Graph exposing (Graph, VertexData, VertexId)
import IsomorphismGame.HardcodedLevels exposing (hardcodedLevels)
import IsomorphismGame.Level as Level exposing (BaseGraph, Level, PlayerGraph)
import IsomorphismGame.Level.Decode
import IsomorphismGame.Level.Encode
import Levels exposing (Levels)
import LuminousFlux
import Play exposing (..)
import Playground.Tape exposing (Message(..))
import Scene3d
import Scene3d.Light
import Scene3d.Material exposing (matte)
import SceneWebGL exposing (..)
import SceneWebGL.Camera as Camera exposing (Camera, perspectiveWithOrbit)
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
    { editorIsOn : Bool
    , levels : Levels Level
    , pointerXY : Point
    , gameState : GameState
    , editorState : EditorState
    }


type GameState
    = Idle
    | DraggingPlayerVertex
        { dragged : VertexId
        , maybeTargetIdOnBaseGraph : Maybe VertexId
        }


type EditorState
    = EditorIdle
    | DraggingBaseVertex { vertexId : VertexId }
    | DraggingBaseEdge { sourceId : VertexId }



-- INIT


initialConfigurations : Configurations
initialConfigurations =
    [ configBlock "Camera"
        [ floatConfig "camera distance" ( 3, 40 ) 20
        , floatConfig "camera azimuth" ( 0, 2 * pi ) 0
        , floatConfig "camera elevation" ( -pi / 2, pi / 2 ) 0
        ]
    , configBlock "Light"
        [ floatConfig "sunlight azimuth" ( -pi, pi ) -0.5
        , floatConfig "sunlight elevation" ( -pi, pi ) -2.7
        , floatConfig "azimuth for third light" ( -pi, pi ) 1
        , floatConfig "elevation for third light" ( -pi, pi ) -2
        , floatConfig "azimuth for fourth light" ( -pi, pi ) 1
        , floatConfig "elevation for fourth light" ( -pi, pi ) -2
        ]
    , configBlock "Pointer"
        [ boolConfig "pointer view on/off" True
        , colorConfig "pointer color" yellow
        , floatConfig "pointer reach" ( 0.5, 2 ) 1
        ]
    , configBlock "Base"
        [ colorConfig "game background" blue
        , colorConfig "base" red200
        , floatConfig "base height" ( 0.01, 5 ) 0.4
        , floatConfig "base vertex radius" ( 0.2, 2 ) 0.5
        , floatConfig "base edge width" ( 0.2, 1.5 ) 1
        ]
    , configBlock "Player CodeGraph"
        [ colorConfig "player" white
        , floatConfig "player vertex radius" ( 0.1, 0.6 ) 0.35
        , floatConfig "player edge width" ( 0.05, 0.6 ) 0.25
        ]
    ]


init : Computer -> Model
init computer =
    { editorIsOn = False
    , levels =
        Levels.init
            IsomorphismGame.Level.Encode.encode
            IsomorphismGame.Level.Decode.decoder
            { name = "level 1", level = Level.exampleLevel }
            []
            |> Levels.importJSON hardcodedLevels
    , pointerXY = Point 0 0 0
    , gameState = Idle
    , editorState = EditorIdle
    }



-- UPDATE


mapCurrentBaseGraph : (BaseGraph -> BaseGraph) -> Model -> Model
mapCurrentBaseGraph up model =
    { model
        | levels = Levels.mapCurrent (Level.mapBaseGraph up) model.levels
    }


mapCurrentPlayerGraph : (PlayerGraph -> PlayerGraph) -> Model -> Model
mapCurrentPlayerGraph up model =
    { model
        | levels = Levels.mapCurrent (Level.mapPlayerGraph up) model.levels
    }


update : Computer -> Message Msg -> Model -> Model
update computer message model =
    let
        handleInput =
            if model.editorIsOn then
                handleInputForEditor computer

            else
                handlePlayerInput computer
    in
    case message of
        Tick ->
            model
                |> updatePointerPosition computer
                |> updateDragTarget computer
                |> tickPlayerVertices computer
                |> tickBaseVertices computer
                |> handleInput

        Message editorMsg ->
            model
                |> handleMsgFromEditor editorMsg


updateDragTarget : Computer -> Model -> Model
updateDragTarget computer model =
    case model.gameState of
        DraggingPlayerVertex dragData ->
            { model
                | gameState =
                    DraggingPlayerVertex
                        { dragData | maybeTargetIdOnBaseGraph = nearestBaseVertex computer model }
            }

        _ ->
            model


tickPlayerVertices : Computer -> Model -> Model
tickPlayerVertices computer model =
    let
        baseGraph =
            (Levels.current model.levels).baseGraph

        playerGraph =
            (Levels.current model.levels).playerGraph

        lerpToBaseVertex vertexId vertexData =
            case model.gameState of
                DraggingPlayerVertex { dragged, maybeTargetIdOnBaseGraph } ->
                    if vertexId == dragged then
                        { vertexData
                            | position =
                                model.pointerXY
                                    |> (\p -> Point p.x p.y p.z)
                        }

                    else if Just vertexData.data.mappedToBaseVertex == maybeTargetIdOnBaseGraph then
                        let
                            target =
                                Graph.getPosition vertexData.data.mappedToBaseVertex baseGraph
                                    |> lerp 0.3
                                        -- this lerp is not applied on every tick but just once!
                                        (Graph.getPosition
                                            (Graph.getData dragged playerGraph
                                                |> Maybe.map .mappedToBaseVertex
                                                |> Maybe.withDefault 0
                                            )
                                            baseGraph
                                        )
                        in
                        { vertexData
                            | position =
                                vertexData.position
                                    |> lerp 0.1
                                        (target
                                            |> (\p -> Point p.x p.y (p.z + 1))
                                        )
                        }

                    else
                        { vertexData
                            | position =
                                vertexData.position
                                    |> lerp 0.1
                                        (Graph.getPosition vertexData.data.mappedToBaseVertex
                                            baseGraph
                                        )
                        }

                _ ->
                    { vertexData
                        | position =
                            vertexData.position
                                |> lerp 0.1
                                    (Graph.getPosition vertexData.data.mappedToBaseVertex
                                        baseGraph
                                    )
                    }
    in
    model
        |> mapCurrentPlayerGraph (Graph.mapVertices lerpToBaseVertex)


handlePlayerInput : Computer -> Model -> Model
handlePlayerInput computer model =
    model
        |> startDraggingPlayerVertex computer
        |> endDraggingPlayerVertex computer


handleInputForEditor : Computer -> Model -> Model
handleInputForEditor computer model =
    model
        |> insertVertex computer
        |> startDraggingBaseVertex computer
        |> startDraggingBaseEdge computer
        |> insertBaseEdge computer
        |> endDraggingBaseVertex computer


nearestBaseVertex : Computer -> Model -> Maybe VertexId
nearestBaseVertex computer model =
    Graph.nearestVertex model.pointerXY (Levels.current model.levels).baseGraph


playerVertexOnTheNearestBaseVertex : Computer -> Model -> Maybe VertexId
playerVertexOnTheNearestBaseVertex computer model =
    let
        v =
            nearestBaseVertex computer model
    in
    Graph.vertices (Levels.current model.levels).playerGraph
        |> List.filter (\( _, { data } ) -> Just data.mappedToBaseVertex == v)
        |> List.head
        |> Maybe.map Tuple.first


startDraggingBaseEdge : Computer -> Model -> Model
startDraggingBaseEdge computer model =
    if computer.keyboard.shift && not computer.keyboard.alt && computer.pointer.isDown then
        case
            ( model.editorState
            , nearestBaseVertex computer model
            )
        of
            ( EditorIdle, Just vertexId ) ->
                { model | editorState = DraggingBaseEdge { sourceId = vertexId } }

            _ ->
                model

    else
        model


insertBaseEdge : Computer -> Model -> Model
insertBaseEdge computer model =
    if not computer.pointer.isDown then
        case ( model.editorState, nearestBaseVertex computer model ) of
            ( DraggingBaseEdge { sourceId }, Just targetId ) ->
                if
                    distanceXY (Graph.getPosition targetId (Levels.current model.levels).baseGraph) model.pointerXY
                        < getFloat "pointer reach" computer
                then
                    model
                        |> mapCurrentBaseGraph (Graph.insertEdge sourceId targetId)

                else
                    model
                        |> mapCurrentBaseGraph
                            (Graph.insertEdgeAndVertex () sourceId model.pointerXY)

            _ ->
                model

    else
        model


insertVertex : Computer -> Model -> Model
insertVertex computer model =
    if computer.pointer.isDown && computer.keyboard.alt then
        case model.editorState of
            EditorIdle ->
                let
                    positionOfNearestVertex : Point
                    positionOfNearestVertex =
                        case nearestBaseVertex computer model of
                            Nothing ->
                                Point 0 0 0

                            Just vertexId ->
                                Graph.getPosition vertexId (Levels.current model.levels).baseGraph
                in
                if
                    distanceXY positionOfNearestVertex model.pointerXY
                        > getFloat "pointer reach" computer
                then
                    model
                        |> mapCurrentBaseGraph (Graph.insertVertex () model.pointerXY)

                else
                    model

            _ ->
                model

    else
        model


distanceXY : Point -> Point -> Float
distanceXY p q =
    sqrt ((q.x - p.x) ^ 2 + (q.y - p.y) ^ 2)


startDraggingPlayerVertex : Computer -> Model -> Model
startDraggingPlayerVertex computer model =
    if computer.pointer.isDown && not computer.keyboard.shift then
        case ( model.gameState, playerVertexOnTheNearestBaseVertex computer model ) of
            ( Idle, Just vertexId ) ->
                if
                    distanceXY (Graph.getPosition vertexId (Levels.current model.levels).playerGraph) model.pointerXY
                        < getFloat "pointer reach" computer
                then
                    { model
                        | gameState =
                            DraggingPlayerVertex
                                { dragged = vertexId
                                , maybeTargetIdOnBaseGraph = Nothing
                                }
                    }

                else
                    model

            _ ->
                model

    else
        model



-- QUERY


startDraggingBaseVertex : Computer -> Model -> Model
startDraggingBaseVertex computer model =
    if computer.pointer.isDown && not computer.keyboard.shift then
        case
            ( model.editorState
            , nearestBaseVertex computer model
            )
        of
            ( EditorIdle, Just vertexId ) ->
                if
                    distanceXY (Graph.getPosition vertexId (Levels.current model.levels).baseGraph) model.pointerXY
                        < getFloat "pointer reach" computer
                then
                    { model | editorState = DraggingBaseVertex { vertexId = vertexId } }

                else
                    model

            _ ->
                model

    else
        model


tickBaseVertices : Computer -> Model -> Model
tickBaseVertices computer model =
    case model.editorState of
        DraggingBaseVertex { vertexId } ->
            let
                moveToPointerPosition vertexData =
                    { vertexData | position = model.pointerXY }
            in
            model
                |> mapCurrentBaseGraph (Graph.mapVertex vertexId moveToPointerPosition)

        _ ->
            model


endDraggingPlayerVertex : Computer -> Model -> Model
endDraggingPlayerVertex computer model =
    if not computer.pointer.isDown then
        case model.gameState of
            DraggingPlayerVertex dragData ->
                case dragData.maybeTargetIdOnBaseGraph of
                    Just targetIdOnBaseGraph ->
                        let
                            setMappedVertexTo vertexId data =
                                { data | mappedToBaseVertex = vertexId }

                            newTargetIdOnBaseGraph vertexId vertexData =
                                if vertexId == dragData.dragged then
                                    { vertexData
                                        | data =
                                            vertexData.data
                                                |> setMappedVertexTo targetIdOnBaseGraph
                                    }

                                else if vertexData.data.mappedToBaseVertex == targetIdOnBaseGraph then
                                    { vertexData
                                        | data =
                                            vertexData.data
                                                |> setMappedVertexTo
                                                    (Graph.getData dragData.dragged (Levels.current model.levels).playerGraph
                                                        |> Maybe.map .mappedToBaseVertex
                                                        |> Maybe.withDefault 0
                                                    )
                                    }

                                else
                                    vertexData
                        in
                        { model
                            | gameState = Idle
                        }
                            |> mapCurrentPlayerGraph (Graph.mapVertices newTargetIdOnBaseGraph)

                    Nothing ->
                        { model
                            | gameState = Idle
                        }

            _ ->
                model

    else
        model


endDraggingBaseVertex : Computer -> Model -> Model
endDraggingBaseVertex computer model =
    if not computer.pointer.isDown then
        { model
            | editorState = EditorIdle
        }

    else
        model


updatePointerPosition : Computer -> Model -> Model
updatePointerPosition computer model =
    { model
        | pointerXY =
            computer.pointer
                |> Camera.mouseOverXY (camera computer) computer.screen
                |> Maybe.withDefault model.pointerXY
    }



-- VIEW


camera : Computer -> Camera
camera computer =
    perspectiveWithOrbit
        { focalPoint = { x = 0, y = 0, z = 0 }
        , azimuth = getFloat "camera azimuth" computer
        , elevation = getFloat "camera elevation" computer
        , distance = getFloat "camera distance" computer
        }


view : Computer -> Model -> Html Msg
view computer model =
    --Scene.sunny
    --    { devicePixelRatio = computer.devicePixelRatio
    --    , screen = computer.screen
    --    , camera = camera computer
    --    , backgroundColor = white
    --    , sunlightAzimuth = getFloat "sunlight azimuth" computer
    --    , sunlightElevation = getFloat "sunlight elevation" computer
    --    }
    let
        firstLight =
            Light.point
                { position = { x = -2, y = 4, z = 4 }
                , chromaticity = Scene3d.Light.incandescent
                , intensity = LuminousFlux.lumens 12000
                }

        secondLight =
            Light.point
                { position = { x = 2, y = 3, z = 4 }
                , chromaticity = Scene3d.Light.fluorescent
                , intensity = LuminousFlux.lumens 12000
                }

        thirdLight =
            Light.directional
                { azimuth = getFloat "azimuth for third light" computer
                , elevation = getFloat "elevation for third light" computer
                , chromaticity = Scene3d.Light.colorTemperature (Temperature.kelvins 2000)
                , intensity = Illuminance.lux 120
                }

        fourthLight =
            Light.soft
                { azimuth = getFloat "azimuth for fourth light" computer
                , elevation = getFloat "elevation for fourth light" computer
                , chromaticity = Scene3d.Light.fluorescent
                , intensityAbove = Illuminance.lux 20
                , intensityBelow = Illuminance.lux 10
                }
    in
    div []
        [ div
            [ css
                [ Css.position Css.fixed
                , Css.color (Css.rgba 255 255 255 0.5)
                , Css.marginLeft (Css.px 320)
                , Css.marginTop (Css.px 32)
                ]
            ]
            [ div [] [ text "A game prototype for graph isomorphism problem" ]
            , div [] [ text "Drag vertices to match the edges" ]
            , div [] [ text "Create new levels using the level editor on the top-right" ]
            ]
        , div [ css [ Css.property "touch-action" "none" ] ]
            [ fromUnstyled <|
                Html.map never <|
                    SceneWebGL.custom
                        { devicePixelRatio = computer.devicePixelRatio
                        , screen = computer.screen
                        , camera = camera computer
                        , lights = Scene3d.fourLights firstLight secondLight thirdLight fourthLight
                        , clipDepth = 0.1
                        , exposure = Scene3d.exposureValue 6
                        , toneMapping = Scene3d.hableFilmicToneMapping -- See ExposureAndToneMapping.elm for details
                        , whiteBalance = Scene3d.Light.fluorescent
                        , antialiasing = Scene3d.multisampling
                        , backgroundColor = blue200
                        }
                        [ drawBaseGraph computer model
                        , drawPlayerGraph computer model
                        , drawDraggedBaseEdge computer model

                        --, SceneWebGL.axes 100 0.2
                        --, sphere red 0.1
                        , floor computer
                        , drawPointerReach computer model
                        ]
            ]
        , viewEditor computer model
        ]


floor : Computer -> Shape
floor computer =
    block (matte (getColor "game background" computer)) ( 100, 100, 1 )
        |> moveZ -0.5
        |> moveZ -(getFloat "base height" computer)




drawDraggedBaseEdge : Computer -> Model -> Shape
drawDraggedBaseEdge computer model =
    case model.editorState of
        DraggingBaseEdge { sourceId } ->
            let
                sourcePosition =
                    Graph.getPosition sourceId (Levels.current model.levels).baseGraph

                ( length, rotation ) =
                    toPolar
                        ( model.pointerXY.x - sourcePosition.x
                        , model.pointerXY.y - sourcePosition.y
                        )
            in
            block (matte (getColor "base" computer)) ( length, 0.3, 0.3 )
                |> moveX (length / 2)
                |> rotateZ rotation
                |> moveX sourcePosition.x
                |> moveY sourcePosition.y

        _ ->
            group []


drawPointerReach : Computer -> Model -> Shape
drawPointerReach computer model =
    let
        ( color, zShift, radius ) =
            ( getColor "pointer color" computer
            , -(getFloat "base height" computer) + 0.01
            , getFloat "pointer reach" computer
            )
    in
    if getBool "pointer view on/off" computer then
        cylinder (matte color) radius 0.02
            |> rotateX (degrees 90)
            |> moveZ zShift
            |> moveX model.pointerXY.x
            |> moveY model.pointerXY.y
            |> moveZ model.pointerXY.z

    else
        group []



-- DRAWING PLAYER GRAPH


drawPlayerGraph : Computer -> Model -> Shape
drawPlayerGraph computer model =
    group
        [ drawVerticesOfPlayerGraph computer model
        , drawEdgesOfPlayerGraph computer model
        ]


drawVerticesOfPlayerGraph : Computer -> Model -> Shape
drawVerticesOfPlayerGraph computer model =
    group
        (Graph.vertices (Levels.current model.levels).playerGraph
            |> List.map (drawPlayerVertex computer model)
        )


drawPlayerVertex : Computer -> Model -> ( VertexId, { vertexData | position : Point } ) -> Shape
drawPlayerVertex computer model ( vertexId, { position } ) =
    let
        color =
            if playerVertexOnTheNearestBaseVertex computer model == Just vertexId then
                yellow

            else
                getColor "player" computer
    in
    sphere (matte color) (getFloat "player vertex radius" computer)
        |> moveX position.x
        |> moveY position.y
        |> moveZ position.z


drawEdgesOfPlayerGraph : Computer -> Model -> Shape
drawEdgesOfPlayerGraph computer model =
    group
        (model.levels
            |> Levels.current
            |> .playerGraph
            |> Graph.edges
            |> List.map (drawPlayerEdge computer)
        )


drawPlayerEdge :
    Computer
    ->
        { sourcePosition : Point
        , targetPosition : Point
        , sourceId : VertexId
        , targetId : VertexId
        }
    -> Shape
drawPlayerEdge computer { sourcePosition, targetPosition } =
    let
        ( x, y, z ) =
            ( targetPosition.x - sourcePosition.x
            , targetPosition.y - sourcePosition.y
            , targetPosition.z - sourcePosition.z
            )

        { radius, azimuth, inclination } =
            toSphericalCoordinates ( x, y, z )

        width =
            getFloat "player edge width" computer
    in
    cylinder
        (matte (getColor "player" computer))
        (0.5 * width)
        radius
        |> rotateZ (degrees 90)
        --block
        --    (getColor "player" computer)
        --    ( radius, width, width )
        |> moveX (radius / 2)
        |> rotateY (inclination - degrees 90)
        |> rotateZ azimuth
        |> moveX sourcePosition.x
        |> moveY sourcePosition.y
        |> moveZ sourcePosition.z


toSphericalCoordinates ( x, y, z ) =
    let
        r =
            sqrt (x ^ 2 + y ^ 2 + z ^ 2)
    in
    { radius = r
    , azimuth = atan2 y x
    , inclination = acos (z / r)
    }



-- DRAWING BASE GRAPH


drawBaseGraph : Computer -> Model -> Shape
drawBaseGraph computer model =
    group
        [ drawVerticesOfBaseGraph computer model
        , drawEdgesOfBaseGraph computer model
        ]
        |> moveZ -0.2


drawVerticesOfBaseGraph : Computer -> Model -> Shape
drawVerticesOfBaseGraph computer model =
    group
        (Graph.vertices (Levels.current model.levels).baseGraph
            |> List.map (drawBaseVertex computer)
        )


drawBaseVertex : Computer -> ( VertexId, { vertexData | position : Point } ) -> Shape
drawBaseVertex computer ( _, { position } ) =
    cylinder
        (matte (getColor "base" computer))
        (getFloat "base vertex radius" computer)
        (getFloat "base height" computer)
        |> rotateX (degrees 90)
        |> moveZ -(getFloat "base height" computer / 2)
        |> moveX position.x
        |> moveY position.y
        |> moveZ position.z


drawEdgesOfBaseGraph : Computer -> Model -> Shape
drawEdgesOfBaseGraph computer model =
    group
        (model.levels
            |> Levels.current
            |> .baseGraph
            |> Graph.edges
            |> List.map (drawBaseEdge computer)
        )


drawBaseEdge :
    Computer
    ->
        { sourcePosition : Point
        , targetPosition : Point
        , sourceId : VertexId
        , targetId : VertexId
        }
    -> Shape
drawBaseEdge computer { sourcePosition, targetPosition, sourceId, targetId } =
    let
        ( length, rotation ) =
            toPolar
                ( targetPosition.x - sourcePosition.x
                , targetPosition.y - sourcePosition.y
                )

        baseHeight =
            getFloat "base height" computer
    in
    block (matte (getColor "base" computer))
        ( length
        , getFloat "base edge width" computer
        , baseHeight
        )
        |> moveZ -(baseHeight / 2)
        |> moveX (length / 2)
        |> rotateZ rotation
        |> moveX sourcePosition.x
        |> moveY sourcePosition.y



-- EDITOR


type Msg
    = PressedEditorOnOffButton
    | PressedResetPlayerGraphButton
    | FromLevelEditor Levels.Msg


handleMsgFromEditor : Msg -> Model -> Model
handleMsgFromEditor editorMsg model =
    case editorMsg of
        PressedEditorOnOffButton ->
            { model | editorIsOn = not model.editorIsOn }

        PressedResetPlayerGraphButton ->
            { model | levels = model.levels |> Levels.mapCurrent Level.resetPlayerGraph }

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
        [ css [ Css.position Css.fixed, Css.top (Css.px 0), Css.right (Css.px 0) ] ]
        [ button
            [ css
                [ Css.width (Css.px 40)
                , Css.padding (Css.px 8)
                , Css.color (Css.rgba 255 255 255 0.2)
                , Css.hover
                    [ Css.color (Css.rgb 255 255 255) ]
                , Css.active
                    [ Css.color (Css.rgba 255 255 255 0.6) ]
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
                , Css.top (Css.px 0)
                , Css.right (Css.px 0)
                , Css.width (Css.px 300)
                , Css.height (Css.px (computer.screen.height - 80))
                , Css.backgroundColor (Css.rgba 0 0 0 0.2)
                , Css.border3 (Css.px 0.5) Css.solid (Css.rgba 255 255 255 0.2)
                , Css.overflowY Css.scroll
                , Css.fontSize (Css.px 12)
                , Css.color (Css.rgba 255 255 255 0.6)
                ]
            ]
            [ div [ css [ Css.padding (Css.px 16) ] ]
                [ explanationsForEditor computer model ]
            , div [ css [ Css.padding (Css.px 16), Css.border3 (Css.px 0.5) Css.solid (Css.rgba 255 255 255 0.2) ] ]
                [ makeButton PressedResetPlayerGraphButton "Reset player graph" ]
            , div [ css [ Css.padding (Css.px 16), Css.border3 (Css.px 0.5) Css.solid (Css.rgba 255 255 255 0.2) ] ]
                [ levelSelection model ]
            ]

    else
        div [] []


levelSelection : Model -> Html Msg
levelSelection model =
    div []
        [ div [ css [ Css.fontSize (Css.px 18) ] ] [ text "Levels" ]
        , div [ css [ Css.padding (Css.px 16) ] ] [ Html.Styled.map FromLevelEditor (Levels.view model.levels) ]
        ]


makeButton : msg -> String -> Html msg
makeButton msg string =
    button
        [ css
            [ Css.margin (Css.px 4)
            , Css.padding (Css.px 8)
            , Css.borderRadius (Css.px 4)
            , Css.backgroundColor (Css.rgba 0 0 0 0.4)
            , Css.hover [ Css.backgroundColor (Css.rgba 0 0 0 0.8) ]
            ]
        , onClick msg
        ]
        [ text string ]


explanationsForEditor : Computer -> Model -> Html Msg
explanationsForEditor computer model =
    div []
        [ div [ css [ Css.paddingTop (Css.px 16), Css.paddingBottom (Css.px 16), Css.fontSize (Css.px 18) ] ] [ text "Editing level" ]
        , div [ css [ Css.fontSize (Css.px 12) ] ] [ text "- Hold shift + alt & Press mouse to add vertex" ]
        , div [ css [ Css.fontSize (Css.px 12) ] ] [ text "- To move vertices drag them with mouse" ]
        , div [ css [ Css.fontSize (Css.px 12) ] ] [ text "- Hold shift and drag with mouse to draw an edge" ]
        ]
