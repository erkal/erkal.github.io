module RedFacedCube.Main exposing (main)

import Animation exposing (wave)
import Color
import Css
import DesignSystem.Color exposing (..)
import Ease
import Geometry3d exposing (Point, Vector)
import Html.Styled exposing (Attribute, Html, br, button, div, fromUnstyled, input, label, p, pre, span, text, textarea)
import Html.Styled.Attributes exposing (checked, cols, css, for, id, name, placeholder, rows, type_, value)
import Html.Styled.Events exposing (onCheck, onClick, onMouseEnter, onMouseLeave)
import Icons
import Illuminance
import Levels exposing (Levels)
import LuminousFlux
import Play exposing (..)
import Playground.Tape exposing (Message(..))
import RedFacedCube.Cell exposing (Cell, RollDirection(..))
import RedFacedCube.Cube as Cube exposing (Axis(..), Cube(..), RedFaceDirection(..), Sign(..))
import RedFacedCube.Editor as Editor exposing (Editor)
import RedFacedCube.HardcodedLevels exposing (hardcodedLevels)
import RedFacedCube.Path as Path exposing (Path)
import RedFacedCube.Swipe as Swipe exposing (Swipe)
import RedFacedCube.Wall exposing (Wall(..), WallDirection(..))
import RedFacedCube.World as World exposing (RollResultForLevelEditing(..), Rule(..), StepResult(..), World)
import RedFacedCube.World.Decode
import RedFacedCube.World.Encode
import Scene3d
import Scene3d.Light
import Scene3d.Material exposing (matte)
import SceneWebGL exposing (..)
import SceneWebGL.Camera as Camera exposing (Camera, perspectiveWithOrbit)
import SceneWebGL.Light as Light
import Temperature



{-
   Eight Rolling Cubes Puzzle from John Harris.
   As in the following book of Martin Gardner:
   "Time Travel and Other Mathematical Bewilderments" (page 118)
-}


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
    { state : State
    , levels : Levels World
    , editor : Editor
    , cellUnderPointer : Cell
    , swipe : Swipe
    }


type State
    = NoAnimation
    | AnimatingRoll
        { startedAt : Float
        , startPosition : ( Int, Int )
        , rollDirection : RollDirection
        , willBeSolved : Bool
        , newWorld : World
        }
    | AnimatingMistake
        { startedAt : Float
        , violatedRule : Rule
        , startPosition : ( Int, Int )
        , rollDirection : RollDirection
        }
    | CongratulationsAnimation



-- INIT


initialConfigurations : Configurations
initialConfigurations =
    [ configBlock "Camera"
        [ floatConfig "camera distance" ( 3, 60 ) 20
        , floatConfig "camera azimuth" ( -pi, pi ) 0
        , floatConfig "camera elevation" ( -pi / 2, pi / 2 ) -0.15
        ]
    , configBlock "Parameters"
        [ floatConfig "cubes side length" ( 0.5, 1 ) 0.95
        , floatConfig "height of following lights" ( 0.1, 8 ) 5
        , floatConfig "duration of step animation" ( 0.1, 1 ) 0.23
        , floatConfig "duration of mistake animation" ( 0.1, 1 ) 0.5
        ]
    , configBlock "Colors and light"
        [ floatConfig "lumens of following lights" ( 40000, 120000 ) 100000
        , colorConfig "background color" gray300
        , colorConfig "color 1" red500
        , colorConfig "color 2" yellow400
        , colorConfig "path color" red500
        , colorConfig "board color" (Color.hsl 0 0.2 0.75)
        , colorConfig "finish mark color" green400
        , colorConfig "wall color" blue900
        ]
    ]


init : Computer -> Model
init computer =
    { state = NoAnimation
    , levels =
        Levels.init
            RedFacedCube.World.Encode.encodeWorld
            RedFacedCube.World.Decode.decodeWorld
            { name = "level 1", level = World.levelFromBook }
            []
            |> Levels.importJSON hardcodedLevels
    , editor = Editor.init
    , cellUnderPointer = ( 0, 0 )
    , swipe = Swipe.init
    }



-- UPDATE


update : Computer -> Message Msg -> Model -> Model
update computer message model =
    let
        playerCube =
            (Levels.current model.levels).playerCube

        levelEditingCube =
            (Levels.current model.levels).levelEditingCube

        handleUserInput =
            case inputToRollDirection computer model of
                Nothing ->
                    identity

                Just rollDirection ->
                    if model.editor.isOn then
                        attemptRollForLevelEditing rollDirection (Cube.getCell levelEditingCube) computer

                    else
                        attemptRollForPlayer rollDirection (Cube.getCell playerCube) computer
    in
    case message of
        Tick ->
            model
                |> updateSwipe computer
                |> updateCellUnderPointer computer
                |> handleUserInput
                |> stopAnimation computer

        Message editorMsg ->
            model
                |> handleMsgFromEditor editorMsg


inputToRollDirection : Computer -> Model -> Maybe RollDirection
inputToRollDirection computer model =
    case
        ( swipeInputToRollDirection model.swipe
        , keyboardInputToRollDirection computer.keyboard
        )
    of
        ( Just r1, _ ) ->
            Just r1

        ( _, Just r2 ) ->
            Just r2

        _ ->
            Nothing


updateCellUnderPointer : Computer -> Model -> Model
updateCellUnderPointer computer model =
    { model
        | cellUnderPointer =
            Camera.mouseOverXY (camera computer model) computer.screen computer.pointer
                |> Maybe.map (\{ x, y } -> ( round x, round y ))
                |> Maybe.withDefault model.cellUnderPointer
    }


updateSwipe : Computer -> Model -> Model
updateSwipe computer model =
    { model | swipe = Swipe.update computer { threshold = 20 } model.swipe }


keyboardInputToRollDirection : Keyboard -> Maybe RollDirection
keyboardInputToRollDirection keyboard =
    case [ keyboard.up, keyboard.down, keyboard.left, keyboard.right ] of
        [ True, False, False, False ] ->
            Just Up

        [ False, True, False, False ] ->
            Just Down

        [ False, False, True, False ] ->
            Just Left

        [ False, False, False, True ] ->
            Just Right

        _ ->
            Nothing


swipeInputToRollDirection : Swipe -> Maybe RollDirection
swipeInputToRollDirection swipe =
    if Swipe.swipedUp swipe then
        Just Up

    else if Swipe.swipedDown swipe then
        Just Down

    else if Swipe.swipedLeft swipe then
        Just Left

    else if Swipe.swipedRight swipe then
        Just Right

    else
        Nothing


attemptRollForPlayer : RollDirection -> Cell -> Computer -> Model -> Model
attemptRollForPlayer rollDirection startCell computer model =
    case Levels.current model.levels |> World.step rollDirection of
        ViolatesRule CannotCrossPath ->
            model

        ViolatesRule MustBeInsideBoard ->
            model

        ViolatesRule TopFaceCannotBeRed ->
            model
                |> startMistakeAnimation computer TopFaceCannotBeRed startCell rollDirection

        ViolatesRule MustVisitEachCellBeforeReachingFinishCell ->
            model
                |> startMistakeAnimation computer MustVisitEachCellBeforeReachingFinishCell startCell rollDirection

        RollForward newWorld ->
            model
                |> startRollAnimation computer startCell rollDirection False newWorld

        RollBack newWorld ->
            model
                |> startRollAnimation computer startCell rollDirection False newWorld

        RollAndSolve newWorld ->
            model
                |> startRollAnimation computer startCell rollDirection True newWorld


attemptRollForLevelEditing : RollDirection -> Cell -> Computer -> Model -> Model
attemptRollForLevelEditing rollDirection startCell computer model =
    case Levels.current model.levels |> World.stepForLevelEditing rollDirection of
        CannotRoll_LevelFinishedBecauseTopFaceIsRed ->
            model

        CannotRoll_CannotCrossPath ->
            model

        RollAndEditLevelPath newWorld ->
            model
                |> startRollAnimation computer startCell rollDirection False newWorld


stopAnimation : Computer -> Model -> Model
stopAnimation computer model =
    case model.state of
        AnimatingRoll { startedAt, newWorld, willBeSolved } ->
            if computer.clock - startedAt > getFloat "duration of step animation" computer then
                { model
                    | state =
                        if willBeSolved then
                            CongratulationsAnimation

                        else
                            NoAnimation
                    , levels = model.levels |> Levels.mapCurrent (always newWorld)
                }

            else
                model

        AnimatingMistake { startedAt } ->
            if computer.clock - startedAt > getFloat "duration of mistake animation" computer then
                { model | state = NoAnimation }

            else
                model

        _ ->
            model


startMistakeAnimation : Computer -> Rule -> ( Int, Int ) -> RollDirection -> Model -> Model
startMistakeAnimation computer violatedRule startPosition rollDirection model =
    case model.state of
        NoAnimation ->
            { model
                | state =
                    AnimatingMistake
                        { startedAt = computer.clock
                        , violatedRule = violatedRule
                        , startPosition = startPosition
                        , rollDirection = rollDirection
                        }
            }

        _ ->
            model


startRollAnimation : Computer -> ( Int, Int ) -> RollDirection -> Bool -> World -> Model -> Model
startRollAnimation computer startPosition rollDirection willBeSolved newWorld model =
    case model.state of
        NoAnimation ->
            { model
                | state =
                    AnimatingRoll
                        { startedAt = computer.clock
                        , startPosition = startPosition
                        , rollDirection = rollDirection
                        , willBeSolved = willBeSolved
                        , newWorld = newWorld
                        }
            }

        _ ->
            model



-- VIEW


view : Computer -> Model -> Html Msg
view computer model =
    div
        [ css
            [ Css.position Css.fixed
            , Css.width (Css.pct 100)
            , Css.height (Css.pct 100)
            , Css.property "touch-action" "none"
            ]
        ]
        [ div [ css [ Css.position Css.absolute ] ] [ Html.Styled.map never <| viewShapes computer model ]
        , headerText computer model
        , explanationText computer model
        , viewEditor computer model
        ]


explanationText : Computer -> Model -> Html Msg
explanationText computer model =
    let
        animatingMistakeForMustVisitEachCellBeforeReachingFinishCell =
            case model.state of
                AnimatingMistake { startedAt, violatedRule } ->
                    violatedRule == MustVisitEachCellBeforeReachingFinishCell

                _ ->
                    False

        animatingMistakeForTopFaceCannotBeRed =
            case model.state of
                AnimatingMistake { startedAt, violatedRule } ->
                    violatedRule == TopFaceCannotBeRed

                _ ->
                    False
    in
    div
        [ css
            [ Css.position Css.absolute
            , Css.width (Css.pct 100)
            , Css.bottom Css.zero
            , Css.padding (Css.px 32)
            ]
        ]
        [ div
            [ css
                [ Css.margin2 Css.zero Css.auto
                , Css.width (Css.pct 90)
                , Css.maxWidth (Css.px 800)
                , Css.marginTop (Css.px 16)
                , Css.textAlign Css.center
                , Css.fontSize (Css.px 16)
                , Css.fontWeight (Css.int 500)
                , Css.letterSpacing (Css.px 0.3)
                ]
            ]
            [ span
                [ css
                    (if animatingMistakeForMustVisitEachCellBeforeReachingFinishCell then
                        [ Css.backgroundColor (setOpacity 0.5 red |> toCssColor)
                        ]

                     else
                        []
                    )
                ]
                [ text "Visit each cell exactly once. " ]
            , span [] [ text "End with the cube red side up on the (marked) finish cell. " ]
            , span
                [ css
                    (if animatingMistakeForTopFaceCannotBeRed then
                        [ Css.backgroundColor (setOpacity 0.5 red |> toCssColor)
                        ]

                     else
                        []
                    )
                ]
                [ text "At no time during the tour, however, is the cube allowed to rest with the red side up."
                ]
            ]
        ]


headerText : Computer -> Model -> Html Msg
headerText computer model =
    div [ css [ Css.position Css.absolute, Css.width (Css.pct 100) ] ]
        [ div
            [ css
                [ Css.margin2 Css.zero Css.auto
                , Css.width (Css.pct 100)
                , Css.marginTop (Css.px 16)
                ]
            ]
            [ div
                [ css
                    [ Css.padding2 Css.zero (Css.px 32)
                    , Css.displayFlex
                    , Css.flexDirection Css.column
                    , Css.alignItems Css.center
                    , Css.property "gap" "12px"
                    ]
                ]
                [ div
                    [ css
                        [ Css.fontSize (Css.px 28)
                        , Css.fontWeight Css.bold
                        , Css.color (setOpacity 0.8 (getColor "color 1" computer) |> toCssColor)
                        , Css.textShadow4 (Css.px 1) (Css.px 1) (Css.px 2) (setOpacity 0.2 black |> toCssColor)
                        , Css.letterSpacing (Css.px 0.5)
                        ]
                    ]
                    [ text "The Red-Faced Cube" ]
                , div
                    [ css
                        [ Css.fontWeight Css.bold
                        , Css.fontStyle Css.italic
                        , Css.fontSize (Css.px 16)
                        , Css.borderBottom3 (Css.px 2) Css.solid (setOpacity 0.3 (getColor "color 1" computer) |> toCssColor)
                        , Css.paddingBottom (Css.px 4)
                        ]
                    ]
                    [ text "A puzzle from the book Mathematical Carnival (1975, Martin Gardner)" ]
                , div
                    [ css
                        [ Css.padding2 (Css.px 4) (Css.px 8)
                        , Css.marginTop (Css.px 8)
                        , Css.fontSize (Css.px 16)
                        ]
                    ]
                    [ text "Roll the cube via swiping or pressing arrow keys" ]
                ]
            ]
        ]


camera : Computer -> Model -> Camera
camera computer model =
    perspectiveWithOrbit
        { focalPoint =
            let
                center =
                    World.center (Levels.current model.levels)
            in
            { x = center.x, y = center.y, z = 0 }
        , azimuth = getFloat "camera azimuth" computer
        , elevation = getFloat "camera elevation" computer
        , distance = getFloat "camera distance" computer
        }


viewShapes : Computer -> Model -> Html Never
viewShapes computer model =
    let
        (Cube ( x, y ) _) =
            (Levels.current model.levels).playerCube

        ( cubeX, cubeY ) =
            -- This is only for the camera follow rolling cube smoothly
            case model.state of
                AnimatingRoll { startedAt, rollDirection } ->
                    let
                        duration =
                            getFloat "duration of step animation" computer

                        passedDurationRatio =
                            (computer.clock - startedAt) / duration

                        ( cameraShiftX, cameraShiftY ) =
                            case rollDirection of
                                Up ->
                                    ( 0, passedDurationRatio )

                                Down ->
                                    ( 0, -passedDurationRatio )

                                Left ->
                                    ( -passedDurationRatio, 0 )

                                Right ->
                                    ( passedDurationRatio, 0 )
                    in
                    ( toFloat x + cameraShiftX
                    , toFloat y + cameraShiftY
                    )

                _ ->
                    ( toFloat x
                    , toFloat y
                    )

        firstLight =
            Light.point
                { position = { x = cubeX + 0.5, y = cubeY + 0.5, z = getFloat "height of following lights" computer }
                , chromaticity = Scene3d.Light.incandescent
                , intensity = LuminousFlux.lumens (getFloat "lumens of following lights" computer)
                }

        secondLight =
            Light.point
                { position = { x = cubeX - 0.5, y = cubeY - 0.5, z = getFloat "height of following lights" computer }
                , chromaticity = Scene3d.Light.fluorescent
                , intensity = LuminousFlux.lumens (getFloat "lumens of following lights" computer)
                }

        thirdLight =
            Light.directional
                { azimuth = getFloat "azimuth for third light" computer
                , elevation = getFloat "elevation for third light" computer
                , chromaticity = Scene3d.Light.colorTemperature (Temperature.kelvins 2000)
                , intensity = Illuminance.lux 100
                }

        fourthLight =
            Light.soft
                { azimuth = getFloat "azimuth for fourth light" computer
                , elevation = getFloat "elevation for fourth light" computer
                , chromaticity = Scene3d.Light.fluorescent
                , intensityAbove = Illuminance.lux 120
                , intensityBelow = Illuminance.lux 40
                }
    in
    fromUnstyled <|
        SceneWebGL.custom
            { devicePixelRatio = computer.devicePixelRatio
            , screen = computer.screen
            , camera = camera computer model
            , lights =
                --Scene3d.fourLights firstLight secondLight thirdLight fourthLight
                Scene3d.twoLights firstLight secondLight
            , clipDepth = 0.1
            , exposure = Scene3d.exposureValue 6
            , toneMapping = Scene3d.hableFilmicToneMapping -- See ExposureAndToneMapping.elm for details
            , whiteBalance = Scene3d.Light.fluorescent
            , antialiasing = Scene3d.multisampling
            , backgroundColor = getColor "background color" computer
            }
            (if model.editor.isOn then
                [ drawBoard computer model
                , drawLevelEditingCube computer model
                , drawWallsForLevelEditingPath computer model
                , drawPointer computer model
                ]

             else
                [ drawBoard computer model
                , drawPlayerCube computer model
                , drawMarkForFinishCell computer model
                , drawWallsForPlayerPath computer model
                , drawPlayerPath computer model
                ]
            )


drawMarkForFinishCell : Computer -> Model -> Shape
drawMarkForFinishCell computer model =
    let
        ( x, y ) =
            (Levels.current model.levels).levelEditingPath.last
    in
    cylinder (matte (getColor "finish mark color" computer)) 0.3 1
        |> rotateX (degrees 90)
        |> moveZ (wave -0.3 -0.4 0.5 computer.clock)
        |> moveX (toFloat x)
        |> moveY (toFloat y)


drawBoard : Computer -> Model -> Shape
drawBoard computer model =
    let
        drawCellOnPath ( x, y ) =
            cube (matte (getColor "board color" computer)) 1
                |> moveZ -0.495
                |> moveX (toFloat x)
                |> moveY (toFloat y)
    in
    group
        ((Levels.current model.levels).levelEditingPath
            |> Path.cells
            |> List.map drawCellOnPath
        )


drawPointer : Computer -> Model -> Shape
drawPointer computer model =
    let
        ( x, y ) =
            model.cellUnderPointer

        color =
            if computer.pointer.isDown then
                red300

            else
                red700
    in
    sphere (matte color) 0.2
        |> moveX (toFloat x)
        |> moveY (toFloat y)


cartesianProduct : List a -> List b -> List ( b, a )
cartesianProduct columns =
    let
        row i =
            List.map (\j -> ( i, j )) columns
    in
    List.concatMap row


drawWall : Computer -> Wall -> Shape
drawWall computer (Wall ( x, y ) wallDirection) =
    let
        wallWidth =
            1 - getFloat "cubes side length" computer

        southWall =
            block (matte (getColor "wall color" computer))
                ( 1 + wallWidth, wallWidth, wallWidth )
                |> moveY -0.5

        eastWall =
            southWall |> rotateZ (degrees 90)
    in
    (case wallDirection of
        S ->
            southWall

        E ->
            eastWall
    )
        |> moveX (toFloat x)
        |> moveY (toFloat y)


drawWallsForLevelEditingPath : Computer -> Model -> Shape
drawWallsForLevelEditingPath computer model =
    let
        pathToDraw =
            model.editor.mouseOveredSolution
                |> Maybe.withDefault (Levels.current model.levels).levelEditingPath
    in
    group
        (pathToDraw
            |> Path.wallsWithDuplicates
            |> List.filter (\wall -> not (Path.crosses wall pathToDraw))
            |> List.map (drawWall computer)
        )


drawWallsForPlayerPath : Computer -> Model -> Shape
drawWallsForPlayerPath computer model =
    group
        ((Levels.current model.levels).levelEditingPath
            |> Path.wallsWithDuplicates
            |> List.filter (\wall -> not (Path.crosses wall (Levels.current model.levels).playerPath))
            |> List.map (drawWall computer)
        )


drawPlayerPath : Computer -> Model -> Shape
drawPlayerPath computer model =
    let
        color i =
            case model.state of
                CongratulationsAnimation ->
                    Color.hsl (wave 0 1 6 (computer.clock + 0.03 * toFloat i)) 1 0.8

                _ ->
                    white

        animateHeight i =
            case model.state of
                CongratulationsAnimation ->
                    scale 0.9
                        >> moveZ (wave 0.1 0.7 6 (computer.clock + 0.3 * toFloat i))

                _ ->
                    identity

        drawCellOnPath i ( x, y ) =
            cube (matte (color i)) 1
                |> animateHeight i
                |> moveZ -0.49
                |> moveX (toFloat x)
                |> moveY (toFloat y)
    in
    group
        ((Levels.current model.levels).playerPath
            |> Path.cells
            |> List.indexedMap drawCellOnPath
        )


drawPlayerCube : Computer -> Model -> Shape
drawPlayerCube computer model =
    let
        (Cube ( x, y ) redFaceDirection) =
            (Levels.current model.levels).playerCube

        s =
            getFloat "cubes side length" computer

        color1 =
            getColor "color 1" computer

        color2 =
            getColor "color 2" computer

        redHalf =
            block (matte color1) ( s, s, s / 2 ) |> moveZ (s / 4)

        yellowHalf =
            --block color2 ( s, s, excitedSideLength / 2 ) |> moveZ -(excitedSideLength / 4)
            block (matte color2) ( s, s, s / 2 ) |> moveZ -(s / 4)

        positionWithRedFaceDirection =
            case redFaceDirection of
                RedFaceDirection Z Positive ->
                    identity

                RedFaceDirection Z Negative ->
                    rotateX (degrees 180)

                RedFaceDirection Y Positive ->
                    rotateX -(degrees 90)

                RedFaceDirection Y Negative ->
                    rotateX (degrees 90)

                RedFaceDirection X Positive ->
                    rotateY (degrees 90)

                RedFaceDirection X Negative ->
                    rotateY -(degrees 90)
    in
    group
        [ redHalf
        , yellowHalf
        ]
        |> positionWithRedFaceDirection
        |> rollingAnimation computer model ( x, y )
        |> moveZ (s / 2)
        |> moveX (toFloat x)
        |> moveY (toFloat y)


drawLevelEditingCube : Computer -> Model -> Shape
drawLevelEditingCube computer model =
    let
        (Cube ( x, y ) redFaceDirection) =
            (Levels.current model.levels).levelEditingCube

        s =
            getFloat "cubes side length" computer

        color1 =
            getColor "color 1" computer

        color2 =
            getColor "color 2" computer

        redHalf =
            block (matte color1) ( s, s, s / 2 ) |> moveZ (s / 4)

        yellowHalf =
            --block color2 ( s, s, excitedSideLength / 2 ) |> moveZ -(excitedSideLength / 4)
            block (matte color2) ( s, s, s / 2 ) |> moveZ -(s / 4)

        positionWithRedFaceDirection =
            case redFaceDirection of
                RedFaceDirection Z Positive ->
                    identity

                RedFaceDirection Z Negative ->
                    rotateX (degrees 180)

                RedFaceDirection Y Positive ->
                    rotateX -(degrees 90)

                RedFaceDirection Y Negative ->
                    rotateX (degrees 90)

                RedFaceDirection X Positive ->
                    rotateY (degrees 90)

                RedFaceDirection X Negative ->
                    rotateY -(degrees 90)
    in
    group
        [ redHalf
        , yellowHalf
        ]
        |> positionWithRedFaceDirection
        |> rollingAnimation computer model ( x, y )
        |> moveZ (s / 2)
        |> moveX (toFloat x)
        |> moveY (toFloat y)


rollingAnimation : Computer -> Model -> ( Int, Int ) -> (Shape -> Shape)
rollingAnimation computer model pos =
    case model.state of
        AnimatingRoll { startedAt, startPosition, rollDirection, newWorld } ->
            if startPosition == pos then
                let
                    duration =
                        getFloat "duration of step animation" computer

                    passedDurationRatio =
                        (computer.clock - startedAt) / duration

                    easedDurationRatio =
                        Ease.inQuad
                            passedDurationRatio

                    rotationDegree =
                        (easedDurationRatio * degrees 90)
                            |> min (degrees 90)

                    rollAxis =
                        case rollDirection of
                            Up ->
                                ( { x = 0.5, y = 0.5, z = -0.5 }, ( -1, 0, 0 ) )

                            Down ->
                                ( { x = -0.5, y = -0.5, z = -0.5 }, ( 1, 0, 0 ) )

                            Left ->
                                ( { x = -0.5, y = 0.5, z = -0.5 }, ( 0, -1, 0 ) )

                            Right ->
                                ( { x = 0.5, y = -0.5, z = -0.5 }, ( 0, 1, 0 ) )
                in
                rotateAround rollAxis rotationDegree

            else
                identity

        AnimatingMistake { startedAt, startPosition, rollDirection } ->
            if startPosition == pos then
                let
                    duration =
                        getFloat "duration of mistake animation" computer

                    passedDurationRatio =
                        (computer.clock - startedAt) / duration

                    easedDurationRatio =
                        sin
                            (pi * passedDurationRatio)

                    rotationDegree =
                        (easedDurationRatio * degrees 45)
                            |> clamp (degrees 0) (degrees 45)

                    rollAxis =
                        case rollDirection of
                            Up ->
                                ( { x = 0.5, y = 0.5, z = -0.5 }, ( -1, 0, 0 ) )

                            Down ->
                                ( { x = -0.5, y = -0.5, z = -0.5 }, ( 1, 0, 0 ) )

                            Left ->
                                ( { x = -0.5, y = 0.5, z = -0.5 }, ( 0, -1, 0 ) )

                            Right ->
                                ( { x = 0.5, y = -0.5, z = -0.5 }, ( 0, 1, 0 ) )
                in
                rotateAround rollAxis rotationDegree

            else
                identity

        _ ->
            identity



--  EDITOR


type Msg
    = PressedEditorOnOffButton
    | PressedCalculateSolutionsButton
    | MouseEnterSolution Path
    | MouseLeftSolution
    | FromLevelEditor Levels.Msg


handleMsgFromEditor : Msg -> Model -> Model
handleMsgFromEditor editorMsg ({ editor } as model) =
    case editorMsg of
        PressedEditorOnOffButton ->
            { model
                | editor =
                    model.editor
                        |> Editor.toggle
                , levels =
                    model.levels
                        |> Levels.mapCurrent World.reset
                , state =
                    NoAnimation
            }

        PressedCalculateSolutionsButton ->
            { model
                | levels =
                    model.levels
                        |> Levels.mapCurrent
                            (\world ->
                                { world
                                    | calculatedSolutions =
                                        Levels.current model.levels |> World.calculateSolutions
                                }
                            )
            }

        MouseEnterSolution p ->
            { model
                | editor =
                    { editor | mouseOveredSolution = Just p }
            }

        MouseLeftSolution ->
            { model
                | editor =
                    { editor | mouseOveredSolution = Nothing }
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
            [ if model.editor.isOn then
                Icons.icons.cross

              else
                Icons.icons.pen
            ]
        ]


editorContent : Computer -> Model -> Html Msg
editorContent computer model =
    if model.editor.isOn then
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
            [ div [ css [ Css.padding (Css.px 16) ] ]
                [ viewSolutions computer model ]
            , div
                [ css
                    [ Css.padding (Css.px 16)
                    , Css.border3 (Css.px 0.5) Css.solid (setOpacity 0.2 white |> toCssColor)
                    ]
                ]
                [ levelSelection model ]
            ]

    else
        div [] []


viewSolutions : Computer -> Model -> Html Msg
viewSolutions computer model =
    div []
        [ div [ css [ Css.height (Css.px 160) ] ]
            [ div [ css [ Css.fontSize (Css.px 18) ] ] [ text "Solution Calculator" ]
            , makeButton PressedCalculateSolutionsButton "Calculate all solutions"
            , div []
                (Levels.current model.levels
                    |> .calculatedSolutions
                    |> List.indexedMap
                        (\i p ->
                            div
                                [ css
                                    [ Css.margin (Css.px 8)
                                    , Css.padding (Css.px 8)
                                    , Css.width (Css.px 96)
                                    , Css.backgroundColor (setOpacity 0.6 black |> toCssColor)
                                    , Css.hover [ Css.backgroundColor (toCssColor black) ]
                                    , Css.cursor Css.crosshair
                                    ]
                                , onMouseEnter (MouseEnterSolution p)
                                , onMouseLeave MouseLeftSolution
                                ]
                                [ text ("Solution " ++ String.fromInt i) ]
                        )
                )
            ]
        ]


makeCheckBox : (Bool -> msg) -> Bool -> String -> Html msg
makeCheckBox msg isChecked string_ =
    div []
        [ input
            [ css [ Css.verticalAlign Css.bottom ]
            , type_ "checkbox"
            , id string_
            , name string_
            , onCheck msg
            , checked isChecked
            ]
            []
        , label
            [ css [ Css.paddingLeft (Css.px 8), Css.fontWeight Css.bold ]
            , for string_
            ]
            [ text string_ ]
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


levelSelection : Model -> Html Msg
levelSelection model =
    div []
        [ div [ css [ Css.fontSize (Css.px 18) ] ] [ text "Levels" ]
        , div [ css [ Css.padding (Css.px 16) ] ] [ Html.Styled.map FromLevelEditor (Levels.view model.levels) ]
        ]
