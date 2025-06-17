module Carousel.Main exposing (main)

import Carousel.Carousel as Carousel exposing (Carousel)
import Color exposing (Color, blue, charcoal, darkBlue, gray, green, lightBlue, lightBrown, orange, purple, red, rgb255)
import Css
import Html.Styled exposing (Html, div, fromUnstyled, text, toUnstyled)
import Html.Styled.Attributes exposing (css)
import Play exposing (..)
import Playground.Tape exposing (Message(..))
import Scene3d.Material exposing (matte)
import SceneWebGL exposing (..)
import SceneWebGL.Camera as Camera exposing (Camera, perspective)


main : Playground Model Never
main =
    Play.simpleApplication
        { initialConfigurations = initialConfigurations
        , init = init
        , update = update
        , view = view
        , hasTape = False
        }


type alias Model =
    Carousel Color



-- INIT


initialConfigurations : Configurations
initialConfigurations =
    []


init : Computer -> Model
init computer =
    Carousel.init lightBrown [ purple, charcoal, darkBlue, lightBlue, gray, orange ]



-- UPDATE


update : Computer -> Message Never -> Model -> Model
update computer message model =
    case message of
        Tick ->
            model
                |> handleKeyPresses computer
                |> tickCarousel computer

        _ ->
            model


handleKeyPresses : Computer -> Model -> Model
handleKeyPresses { keyboard } =
    if keyboard.left then
        Carousel.animateToPrevious

    else if keyboard.right then
        Carousel.animateToNext

    else
        identity


tickCarousel : Computer -> Model -> Model
tickCarousel ({ pointer } as computer) model =
    let
        { x, y } =
            pointer
                |> Camera.mouseOverXY camera computer.screen
                |> Maybe.withDefault { x = 0, y = 0, z = 0 }

        computerWithCorrectedPointerPosition : Computer
        computerWithCorrectedPointerPosition =
            { computer | pointer = { pointer | x = x, y = y } }
    in
    model
        |> Carousel.tick computerWithCorrectedPointerPosition



-- VIEW


camera : Camera
camera =
    perspective
        { focalPoint = { x = 0, y = 0, z = 0 }
        , eyePoint = { x = 0, y = -0.2, z = 1 }
        , upDirection = { x = 0, y = 1, z = 0 }
        }


view : Computer -> Model -> Html Never
view computer model =
    div
        [ css
            [ Css.position Css.absolute
            , Css.property "touch-action" "none"
            ]
        ]
        [ div
            [ css
                [ Css.position Css.absolute
                , Css.padding (Css.rem 1)
                , Css.color (Css.rgba 255 255 255 0.8)
                , Css.property "display" "grid"
                , Css.property "place-items" "center"
                , Css.width (Css.pct 100)
                ]
            ]
            [ div [] [ text "Swipe or press left/right arrow keys" ]
            ]
        , viewScene computer model
        ]


viewScene : Computer -> Model -> Html Never
viewScene computer model =
    fromUnstyled <|
        SceneWebGL.sunny
            { devicePixelRatio = computer.devicePixelRatio
            , screen = computer.screen
            , camera = camera
            , backgroundColor = rgb255 46 46 46
            , sunlightAzimuth = -(degrees 15)
            , sunlightElevation = -(degrees 45)
            }
            [ drawCarousel computer model

            -- , SceneWebGL.axes 100 0.2
            ]




drawCarousel : Computer -> Carousel Color -> Shape
drawCarousel computer carousel =
    let
        selectedCardWithDataForEfficientDrawing : { card : Color, index : Int, normalizedXToDraw : Float }
        selectedCardWithDataForEfficientDrawing =
            Carousel.getSelectedCardData carousel

        middleCardX : Float
        middleCardX =
            selectedCardWithDataForEfficientDrawing.normalizedXToDraw

        i : Int
        i =
            selectedCardWithDataForEfficientDrawing.index

        centerXOf : Int -> Float
        centerXOf j =
            middleCardX + (toFloat (j - i) * Carousel.constants.distanceBetweenCardCenters)

        drawCardAtIndex : Int -> Shape
        drawCardAtIndex j =
            drawCard computer (Carousel.getCardAt j carousel).card
                |> scale (1 - 0.7 * abs (centerXOf j))
                |> moveY -(0.1 * abs (centerXOf j))
                |> moveX (centerXOf j)
    in
    group
        (List.range (i - 3) (i + 3)
            |> List.map drawCardAtIndex
        )


drawCard : Computer -> Color -> Shape
drawCard computer color =
    block (matte color) ( 0.2, 0.3, 0.3 )
