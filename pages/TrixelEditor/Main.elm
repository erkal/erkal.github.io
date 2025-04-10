module TrixelEditor.Main exposing (main)

-- The coordinate system is as described in the following article
-- http://www-cs-students.stanford.edu/~amitp/game-programming/grids/

import Color exposing (toCssString)
import Css exposing (absolute, active, backgroundColor, border3, borderRadius, center, color, fixed, fontSize, height, hover, margin, overflowY, padding, pct, position, property, px, rem, rgb, rgba, right, scroll, solid, textAlign, top, transform, transforms, translate2, vh, vw, width, zero)
import DesignSystem.Color exposing (..)
import Dict.Any as AnyDict exposing (AnyDict)
import Geometry3d exposing (Point)
import Html.Events.Extra
import Html.Styled exposing (Attribute, Html, button, div, fromUnstyled, h2, hr, option, p, select, span, text)
import Html.Styled.Attributes exposing (css, value)
import Html.Styled.Events exposing (onClick, stopPropagationOn)
import Icons
import Json.Decode as Decode
import Json.Encode as Encode
import Levels exposing (Levels)
import List.Nonempty as Nonempty
import Play exposing (..)
import Playground.Tape exposing (Message(..))
import Scene3d.Material exposing (matte)
import SceneWebGL exposing (..)
import SceneWebGL.Camera as Camera exposing (Camera, perspective)
import TrixelEditor.ColorPalette as ColorPalette exposing (Palette(..))
import TrixelEditor.TrixelGrid.CoordinateTransformations exposing (fromCanvasCoordinates, toCanvasCoordinates)
import TrixelEditor.TrixelGrid.Face as Face exposing (Face(..), LR(..))
import TrixelEditor.TrixelGrid.Vertex as Vertex exposing (Vertex, vertex)
import TrixelEditor.World as World exposing (ColorIndex, World)


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
    { pages : Levels World
    , editorIsOn : Bool
    , selectedColorIndex : Int
    , pointerOveredUV : { u : Float, v : Float }
    }


mapCurrentWorld : (World -> World) -> Model -> Model
mapCurrentWorld up model =
    { model | pages = Levels.mapCurrent up model.pages }


currentPalette : Model -> Palette
currentPalette =
    .pages >> Levels.current >> .palette



-- INIT


initialConfigurations : Configurations
initialConfigurations =
    [ configBlock "Parameters"
        [ floatConfig "camera distance" ( 5, 80 ) 10
        , floatConfig "trixel scale" ( 0.5, 1 ) 1
        ]
    ]


init : Computer -> Model
init computer =
    { pages =
        Levels.init
            -- TODO: Decode encode World
            (always (Encode.string ""))
            (Decode.succeed World.empty)
            { name = "1", level = World.empty }
            []
    , editorIsOn = True
    , pointerOveredUV = { u = 0, v = 0 }
    , selectedColorIndex = 0
    }



-- UPDATE


update : Computer -> Message Msg -> Model -> Model
update computer message model =
    case message of
        Tick ->
            model
                |> updateMouseOverUV computer
                |> insertTrixelOnPointerDown computer
                |> removeTrixelOnShiftMouseDown computer

        Message editorMsg ->
            model
                |> handleMsgFromEditor editorMsg


insertTrixelOnPointerDown : Computer -> Model -> Model
insertTrixelOnPointerDown computer model =
    if computer.pointer.isDown then
        model
            |> mapCurrentWorld
                (World.insert
                    (Face.at model.pointerOveredUV)
                    model.selectedColorIndex
                )

    else
        model


removeTrixelOnShiftMouseDown : Computer -> Model -> Model
removeTrixelOnShiftMouseDown computer model =
    if computer.keyboard.shift && computer.pointer.isDown then
        model
            |> mapCurrentWorld
                (World.remove (Face.at model.pointerOveredUV))

    else
        model


camera : Computer -> Camera
camera computer =
    Camera.perspective
        { focalPoint =
            { x = 0
            , y = 0
            , z = 0
            }
        , eyePoint =
            { x = 0
            , y = 0
            , z = getFloat "camera distance" computer
            }
        , upDirection = { x = 0, y = 1, z = 0 }
        }


updateMouseOverUV : Computer -> Model -> Model
updateMouseOverUV computer model =
    case Camera.mouseOverXY (camera computer) computer.screen computer.pointer of
        Nothing ->
            model

        Just p ->
            { model
                | pointerOveredUV =
                    fromCanvasCoordinates
                        { x = p.x
                        , y = p.y
                        }
            }



-- VIEW


view : Computer -> Model -> Html Msg
view computer model =
    div []
        [ div [ css [ position fixed, width (pct 100), height (pct 100), property "touch-action" "none" ] ]
            [ Html.Styled.map never (viewWebGLCanvas computer model) ]
        , viewEditor computer model
        ]


viewWebGLCanvas : Computer -> Model -> Html Never
viewWebGLCanvas computer model =
    fromUnstyled <|
        SceneWebGL.sunny
            { devicePixelRatio = computer.devicePixelRatio
            , screen = computer.screen
            , camera = camera computer
            , backgroundColor =
                (Levels.current model.pages).palette
                    |> ColorPalette.get (Levels.current model.pages).backgroundColorIndex
            , sunlightAzimuth = degrees 225
            , sunlightElevation = degrees 315
            }
            [ group
                [ drawFaces computer model

                --, drawGrid computer
                --, axes
                --, drawMouseOveredFace computer model
                ]
            ]


axes : Shape
axes =
    group
        [ line red ( 100, 0, 0 ) -- x axis
        , line green ( 0, 100, 0 ) -- y axis
        , line blue ( 0, 0, 100 ) -- z axis
        ]


drawMouseOveredFace : Computer -> Model -> Shape
drawMouseOveredFace computer model =
    drawFace computer
        (Levels.current model.pages).palette
        ( Face.at model.pointerOveredUV, model.selectedColorIndex )


drawFaces : Computer -> Model -> Shape
drawFaces computer model =
    let
        world =
            Levels.current model.pages
    in
    group
        (world.trixels |> AnyDict.toList |> List.map (drawFace computer world.palette))


drawFace : Computer -> Palette -> ( Face, ColorIndex ) -> Shape
drawFace computer palette ( Face lr u v, colorIndex ) =
    let
        { x, y } =
            { u = toFloat u
            , v = toFloat v
            }
                |> toCanvasCoordinates

        drawLeftFace : Shape
        drawLeftFace =
            triangle (matte (ColorPalette.get colorIndex palette))
                ( { x = 0, y = 0, z = 0 }
                , { x = cos (degrees 30), y = sin (degrees 30), z = 0 }
                , { x = 0, y = 1, z = 0 }
                )

        drawRightFace : Shape
        drawRightFace =
            drawLeftFace
                |> rotateZ (degrees 180)
                |> moveX (cos (degrees 30))
                |> moveY (1 + sin (degrees 30))

        faceCenter =
            let
                c =
                    toCanvasCoordinates <|
                        case lr of
                            L ->
                                { u = 1 / 3, v = 1 / 3 }

                            R ->
                                { u = 2 / 3, v = 2 / 3 }
            in
            { x = c.x, y = c.y, z = 0 }
    in
    (case lr of
        L ->
            drawLeftFace

        R ->
            drawRightFace
    )
        |> scaleAround faceCenter (getFloat "trixel scale" computer)
        |> moveX x
        |> moveY y


drawGridDot : Color.Color -> Float -> Vertex -> Shape
drawGridDot color radius v =
    let
        { x, y } =
            Vertex.canvasCoordinates v
    in
    cylinder (matte color) radius 0.1
        |> rotateX (degrees 90)
        |> moveX x
        |> moveY y


drawGrid : Computer -> Shape
drawGrid computer =
    let
        cartesianProduct : List a -> List b -> List ( b, a )
        cartesianProduct columns =
            let
                row i =
                    List.map (\j -> ( i, j )) columns
            in
            List.concatMap row

        gridDotSize =
            0.05

        gridColor =
            black
    in
    group
        (cartesianProduct
            (List.range -3 3)
            (List.range -2 2)
            |> List.map vertex
            |> List.map (drawGridDot gridColor gridDotSize)
        )



-- EDITOR


type Msg
    = NoOp
    | PressedEditorOnOffButton
    | SelectPalette Palette
    | SelectColor Int
    | PressedButtonForSettingBackgroundColor
    | FromLevelEditor Levels.Msg


handleMsgFromEditor : Msg -> Model -> Model
handleMsgFromEditor editorMsg model =
    case editorMsg of
        PressedEditorOnOffButton ->
            { model | editorIsOn = not model.editorIsOn }

        SelectPalette palette ->
            model
                |> mapCurrentWorld (World.setPalette palette)

        SelectColor colorIndex ->
            { model | selectedColorIndex = colorIndex }

        PressedButtonForSettingBackgroundColor ->
            model
                |> mapCurrentWorld (World.setBackgroundColorIndex model.selectedColorIndex)

        FromLevelEditor levelEditorMsg ->
            { model | pages = model.pages |> Levels.update levelEditorMsg }

        _ ->
            model


stopPropagationOfInputs : List (Attribute Msg)
stopPropagationOfInputs =
    [ stopPropagationOn "mousedown" (Decode.succeed ( NoOp, True ))
    , stopPropagationOn "pointerdown" (Decode.succeed ( NoOp, True ))
    , stopPropagationOn "wheel" (Decode.succeed ( NoOp, True ))
    , stopPropagationOn "keydown" (Decode.succeed ( NoOp, True ))
    ]


viewEditor : Computer -> Model -> Html Msg
viewEditor computer model =
    div stopPropagationOfInputs
        [ editorContent computer model
        , editorToggleButton model
        ]


editorToggleButton : Model -> Html Msg
editorToggleButton model =
    div [ css [ position fixed, top zero, right zero ] ]
        [ button
            [ css
                [ width (px 40)
                , padding (px 8)
                , color (toCssColor whiteAlpha200)
                , hover [ color (toCssColor white) ]
                , active [ color (toCssColor whiteAlpha600) ]
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
                [ position fixed
                , top zero
                , right zero
                , width (px 300)
                , height (px (computer.screen.height - 80))
                , backgroundColor (rgba 0 0 0 0.2)
                , border3 (px 0.5) solid (rgba 255 255 255 0.2)
                , overflowY scroll
                , fontSize (px 12)
                , color (rgba 255 255 255 0.6)
                ]
            ]
            [ viewInstructions
            , viewColorSelection model
            , pageSelection model
            ]

    else
        div [] []


viewInstructions : Html Msg
viewInstructions =
    div
        [ css [ padding (px 16), border3 (px 0.5) solid (toCssColor whiteAlpha200) ] ]
        [ div [ css [ fontSize (px 20) ] ] [ text "Instructions" ]
        , div [] [ text "- Press mouse to add trixel" ]
        , div [] [ text "- Hold shift and press mouse to remove trixel" ]
        , div [] [ text "- Panning: SCROLL or SPACE + DRAG" ]
        , div [] [ text "- Zooming: CTRL + SCROLL" ]
        ]


viewColorSelection : Model -> Html Msg
viewColorSelection model =
    div [ css [ padding (px 16), border3 (px 0.5) solid (toCssColor whiteAlpha200) ] ]
        [ div [ css [ fontSize (px 20) ] ] [ text "Color Palette" ]
        , selectColorPalette model
        , makeButton PressedButtonForSettingBackgroundColor "Set selected as background"
        , div [] [ text (String.fromInt model.selectedColorIndex) ]
        , viewColorPalette model
        ]


pageSelection : Model -> Html Msg
pageSelection model =
    div [ css [ padding (px 16), border3 (px 0.5) solid (toCssColor whiteAlpha200) ] ]
        [ div [ css [ fontSize (px 20) ] ] [ text "Levels" ]
        , div [ css [ padding (px 16) ] ] [ Html.Styled.map FromLevelEditor (Levels.view model.pages) ]
        ]


makeButton : msg -> String -> Html msg
makeButton msg string =
    button
        [ css
            [ margin (px 4)
            , padding (px 8)
            , borderRadius (px 8)
            , backgroundColor (toCssColor blackAlpha400)
            , hover [ backgroundColor (toCssColor blackAlpha800) ]
            ]
        , onClick msg
        ]
        [ text string ]


optionWith : Palette -> Html Msg
optionWith palette =
    option
        [ value (ColorPalette.toString palette) ]
        [ text (ColorPalette.toString palette) ]


selectColorPalette : Model -> Html Msg
selectColorPalette model =
    div [ css [ padding (px 8) ] ]
        [ span [ css [ padding (px 8) ] ] [ text "Choose a palette:" ]
        , select
            [ css
                [ padding (px 8)
                , color (toCssColor whiteAlpha800)
                , backgroundColor (toCssColor whiteAlpha200)
                ]
            , Html.Styled.Attributes.fromUnstyled <| Html.Events.Extra.onChange (ColorPalette.fromString >> SelectPalette)
            , value (ColorPalette.toString (currentPalette model))
            ]
            (List.map optionWith [ Parula, Inferno, Magma, Plasma, Viridis ])
        ]


viewColorPalette : Model -> Html Msg
viewColorPalette model =
    let
        world =
            Levels.current model.pages

        boxSize =
            18

        gutter =
            0

        m =
            15

        showColor : Int -> Color.Color -> Html Msg
        showColor i color =
            let
                translateX =
                    toFloat (modBy m i) * (boxSize + gutter)

                translateY =
                    toFloat (i // m) * (boxSize + gutter)

                border =
                    if model.selectedColorIndex == i then
                        3

                    else
                        0
            in
            div
                [ css
                    [ position absolute
                    , width (px boxSize)
                    , height (px boxSize)
                    , backgroundColor (toCssColor color)
                    , transforms [ translate2 (px translateX) (px translateY) ]
                    , border3 (px border) solid (rgb 255 255 255)
                    ]
                , onClick (SelectColor i)
                ]
                []
    in
    div
        [ css [ height (px 320) ]
        ]
        (ColorPalette.colors world.palette
            |> Nonempty.indexedMap showColor
            |> Nonempty.toList
        )
