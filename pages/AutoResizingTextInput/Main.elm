module AutoResizingTextInput.Main exposing (main)

import Browser
import Html exposing (Html, div, h1, input, ol, li, p, text)
import Html.Attributes exposing (style, value)
import Html.Events exposing (onInput)


main : Program () String Msg
main =
    Browser.sandbox
        { init = ""
        , view = view
        , update = \(UpdateInput v) _ -> v
        }


type Msg
    = UpdateInput String


view : String -> Html Msg
view currentValue =
    div
        [ style "display" "flex"
        , style "flex-direction" "column"
        , style "justify-content" "center"
        , style "align-items" "center"
        , style "height" "100vh"
        , style "gap" "32px"
        ]
        [ div
            [ style "position" "relative"
            , style "min-width" "100px"
            , style "max-width" "300px"
            ]
            [ div
                [ style "padding" "8px"
                , style "border" "2px solid transparent"
                , style "box-sizing" "border-box"
                , style "white-space" "pre"
                , style "visibility" "hidden"
                , style "font-size" "inherit"
                , style "font-family" "inherit"
                , style "font-weight" "inherit"
                , style "line-height" "inherit"
                , style "letter-spacing" "inherit"
                ]
                [ text
                    (if String.isEmpty currentValue then
                        "X"

                     else
                        currentValue
                    )
                ]
            , input
                [ style "position" "absolute"
                , style "top" "0"
                , style "left" "0"
                , style "width" "100%"
                , style "height" "100%"
                , style "padding" "8px"
                , style "border" "2px solid black"
                , style "box-sizing" "border-box"
                , style "margin" "0"
                , style "font-size" "inherit"
                , style "font-family" "inherit"
                , style "font-weight" "inherit"
                , style "line-height" "inherit"
                , style "letter-spacing" "inherit"
                , value currentValue
                , onInput UpdateInput
                ]
                []
            ]
        , div
            [ style "max-width" "400px"
            , style "text-align" "center"
            ]
            [ h1 [] [ text "Auto-Resizing Text Input" ]
            , p [ style "margin" "16px 0" ]
                [ text "An input that grows and shrinks based on its content." ]
            , ol
                [ style "text-align" "left"
                , style "padding-left" "20px"
                ]
                [ li [] [ text "Create a hidden div containing the input's text" ]
                , li [] [ text "Position the actual input absolutely on top of it" ]
                , li [] [ text "The hidden div determines the width, the input follows" ]
                , li [] [ text "Use min/max width to constrain the size" ]
                ]
            ]
        ]
