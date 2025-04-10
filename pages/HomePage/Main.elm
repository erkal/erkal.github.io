module HomePage.Main exposing (main)

import Css exposing (..)
import Css.Global exposing (descendants)
import Css.Media
import Css.Transitions as Transitions exposing (easeInOut)
import DesignSystem exposing (withHomePageHeader)
import DesignSystem.Color exposing (..)
import Html.Styled exposing (Html, a, div, img, text)
import Html.Styled.Attributes as HA exposing (css, href, src)
import Icons
import Play exposing (..)


main : Playground Model Never
main =
    Play.simpleApplication
        { initialConfigurations = []
        , init = \_ -> {}
        , update = \_ _ _ -> {}
        , view = view
        , hasTape = False
        }


type alias Model =
    {}


view : Computer -> Model -> Html Never
view computer model =
    withHomePageHeader (cards computer model)


cards : Computer -> Model -> Html Never
cards computer model =
    div
        [ css
            [ property "display" "grid"
            , property "grid-template-columns" "repeat(1, minmax(0, 1fr))"
            , property "gap" "2rem"
            , marginBottom (rem 6)
            , color (toCssColor whiteAlpha800)
            , fontSize (rem 1.25)
            , Css.Media.withMedia [ Css.Media.only Css.Media.screen [ Css.Media.minWidth (px 768) ] ]
                [ property "grid-template-columns" "repeat(2, minmax(0, 1fr))" ]
            ]
        ]
        [ card
            { exampleLink = "https://erkal.github.io/kite/"
            , imageLink = "./assets/kite.png"
            , sourceCodeLink = "https://github.com/erkal/kite"
            }
            "Kite: An Interactive Visualization Tool for Graph Theory"
        , cardWithInternalLink "UndoRedo" "Implementing safe undo/redo in Elm. A blog post with interactive explanations"
        , cardWithInternalLink "TrixelEditor" "A trixel editor"
        , cardWithInternalLink "RedFacedCube" "The Red-Faced Cube: One of the puzzles from Martin Gardner's column. It has a unique solution!"
        , cardWithInternalLink "WaveInWave" "A Creative coding example"
        , cardWithInternalLink "ColorShower" "A Creative coding example"
        , cardWithInternalLink "DancingCubes" "A Creative coding example"
        , cardWithInternalLink "BallGame" "Continuous collision detection for circle to polygon. Roll the ball with arrow keys"
        , cardWithInternalLink "Carousel" "A carousel that works with mouse, keyboard and touch"
        , cardWithInternalLink "HappyBirthdayAndrey" "This was a birthday card made for Andrey Kuzmin"
        , cardWithInternalLink "IsomorphismGame" "A prototype for a game on graph isomorphism"
        , cardWithInternalLink "JohnHarrisEightRollingCubes" "One of the puzzles from Martin Gardner's column"
        , cardWithInternalLink "MultipleShadowsFromIanMackenzie" "Using the lighting from an example by Ian Mackenzie"
        , cardWithInternalLink "PlanetarySystem" "Simple example for grouping objects"
        , cardWithInternalLink "RecursiveRotation" "Simple example for recursion"
        , cardWithInternalLink "RecursiveTree" "Simple example for recursion"
        , cardWithInternalLink "TheSomaCube" "Just a start for a puzzle game. It is not working yet"
        , cardWithInternalLink "GooeyEffect" "An example showing the use of GLSL shaders"
        , cardWithInternalLink "Vortex" "A Creative coding example"
        , cardWithInternalLink "TurningBlocks" "A Creative coding example"
        , cardWithInternalLink "CubeAndCube" "Another simple example with pastel colors"
        , cardWithInternalLink "CanvasExample" "An elm-playground-like API on top of joakin/elm-canvas"
        ]


cardWithInternalLink : String -> String -> Html Never
cardWithInternalLink exampleName =
    card
        { exampleLink = "../" ++ exampleName ++ "/index.html"
        , imageLink = "../" ++ exampleName ++ "/image.png"
        , sourceCodeLink = "https://github.com/erkal/erkal.github.io/tree/main/pages/" ++ exampleName
        }


card : { exampleLink : String, imageLink : String, sourceCodeLink : String } -> String -> Html Never
card { exampleLink, imageLink, sourceCodeLink } descriptionText =
    a
        [ href exampleLink
        , css
            [ padding (rem 1.5)
            , borderRadius (rem 1.5)
            , border3 (px 1) solid (toCssColor black)
            , boxShadow5 zero (px 8) (px 12) (px -3) (rgba 0 0 0 0.3)
            , backgroundColor (toCssColor blackAlpha600)
            , color (toCssColor whiteAlpha800)
            , textDecoration none
            , displayFlex
            , flexDirection column
            , alignItems center
            , property "gap" "2rem"
            , cursor pointer
            , property "isolation" "isolate"
            , Transitions.transition
                [ Transitions.backgroundColor 300
                , Transitions.boxShadow 300
                ]
            , hover
                [ backgroundColor (toCssColor blackAlpha500)
                , boxShadow5 zero (px 12) (px 16) (px -3) (rgba 0 0 0 0.4)
                ]
            ]
        ]
        [ div [ css [ position relative ] ]
            [ img
                [ src imageLink
                , css [ borderRadius (rem 0.75), maxWidth (pct 100) ]
                ]
                []
            ]
        , div
            [ css
                [ flexGrow (num 1)
                ]
            ]
            [ text descriptionText ]
        , a
            [ css
                [ display inlineBlock
                , paddingLeft (rem 1.5)
                , paddingRight (rem 1.5)
                , paddingTop (rem 0.5)
                , paddingBottom (rem 0.5)
                , borderRadius (rem 0.5)
                , Transitions.transition [ Transitions.backgroundColor 100 ]
                , backgroundColor (toCssColor blackAlpha900)
                , color (toCssColor yellow)
                , border3 (px 1) solid (toCssColor black)
                , hover
                    [ backgroundColor (toCssColor black)
                    , color (toCssColor yellow100)
                    , border3 (px 1) solid (toCssColor yellow100)
                    ]
                , textDecoration none
                ]
            , href sourceCodeLink
            ]
            [ text "Source code" ]
        ]
