module DesignSystem exposing (..)

import Color exposing (Color)
import Color.Convert
import Html exposing (Html, a, div, input, label, text)
import Html.Attributes as HA exposing (checked, class, for, href, id, style, target, type_, value)
import Html.Events as HE
import Html.Events.Extra
import Icons
import Markdown
import SelectList exposing (SelectList)


withHomePageHeader : Html msg -> Html msg
withHomePageHeader content =
    div
        [ class "absolute w-full h-full z-10"
        , class "bg-[#303030]"
        , class "overflow-y-auto"
        ]
        [ div
            [ class "mx-auto container max-w-5xl px-4 sm:px-12"
            , class "flex flex-col gap-0"
            ]
            [ div
                [ class "w-full sm:mt-4 sm:mb-24 mt-0 mb-12"
                , class "flex justify-end items-center"
                , class "border-b border-gray-200 border-opacity-50"
                ]
                [ a
                    [ class "p-4 w-20 h-20"
                    , class "text-white/40 hover:text-white/80"
                    , href "../index.html"
                    , HA.title "Home"
                    ]
                    [ Icons.icons.home ]
                , a
                    [ class "p-4 w-20 h-20"
                    , class "text-white/40 hover:text-white/80"
                    , href "https://twitter.com/AzizErkalSelman"
                    , target "_blank"
                    , HA.title "Twitter"
                    ]
                    [ Icons.icons.twitter ]
                , a
                    [ class "p-4 w-20 h-20"
                    , class "text-white/40 hover:text-white/80"
                    , href "https://github.com/erkal"
                    , target "_blank"
                    , HA.title "GitHub"
                    ]
                    [ Icons.icons.githubCat ]
                ]
            , content
            ]
        ]


markdownBlock : String -> Html msg
markdownBlock =
    Markdown.toHtmlWith
        { githubFlavored = Just { tables = True, breaks = True }
        , defaultHighlighting = Nothing
        , sanitize = True
        , smartypants = True
        }
        [ class "prose prose-gruvbox lg:prose-xl max-w-none"
        , class "select-text"
        ]


buttonWithIcon :
    { name : String
    , icon : Html msg
    , onClick : msg
    }
    -> Html msg
buttonWithIcon { onClick, name, icon } =
    div
        [ HA.title name
        , class "w-12 h-12 p-2"
        , class "rounded-full shadow-lg"
        , class "cursor-pointer"
        , class "bg-white/60 text-black"
        , class "hover:bg-black/60 hover:text-white active:bg-black active:text-white/60"
        , class "transition-all"
        , HE.onClick onClick
        ]
        [ icon ]


textInput :
    { name : String
    , value : String
    , onChange : String -> msg
    }
    -> Html msg
textInput { name, value, onChange } =
    div [ class "flex flex-col gap-2" ]
        [ label [ for name ]
            [ inputLabel name ]
        , div []
            [ input
                [ class "p-2 w-full text-gray-900 bg-white/60 font-mono font-bold"
                , class "focus:outline-none focus:ring focus:ring-2 focus:ring-black"
                , HE.onInput onChange
                , HA.value value
                ]
                []
            , div [ class "w-full h-1 bg-black" ] []
            ]
        ]


inputLabel : String -> Html msg
inputLabel str =
    div [ class "text-xs font-bold" ]
        [ text str ]


checkbox :
    { name : String
    , value : Bool
    , onCheck : Bool -> msg
    }
    -> Html msg
checkbox { name, value, onCheck } =
    div
        [ class "flex flex-row items-center gap-2"
        , class "cursor-pointer"
        ]
        [ Html.input
            [ type_ "checkbox"
            , class "w-4 h-4"
            , class "cursor-pointer"
            , id name
            , HA.name name
            , HE.onCheck onCheck
            , checked value
            ]
            []
        , label
            [ for name
            , class "cursor-pointer"
            ]
            [ inputLabel name ]
        ]


optionSelection :
    { name : String
    , options : SelectList option
    , optionToString : option -> String
    , onChange : String -> msg
    }
    -> Html msg
optionSelection { name, options, optionToString, onChange } =
    let
        optionWith : String -> Html msg
        optionWith optionStr =
            Html.option
                [ HA.value optionStr ]
                [ text optionStr ]
    in
    div []
        [ div [ class "mb-2" ]
            [ label [ for name ]
                [ inputLabel name ]
            ]
        , Html.select
            [ class "w-fit px-2 py-1 rounded bg-white text-black"
            , id name
            , HA.name name
            , Html.Events.Extra.onChange onChange
            , HA.value (options |> SelectList.getCurrent |> optionToString)
            ]
            (options |> SelectList.toList |> List.map (optionToString >> optionWith))
        ]


slider :
    { name : String
    , value : Float
    , min : Float
    , max : Float
    , step : Float
    , onChange : Float -> msg
    }
    -> Html msg
slider { name, value, min, max, step, onChange } =
    div [ class "flex flex-col gap-2" ]
        [ label
            [ for name ]
            [ div [ class "relative w-full" ]
                [ div [ class "inline-block" ] [ inputLabel name ]
                , div [ class "inline-block float-right" ] [ text (String.fromFloat value) ]
                ]
            ]
        , input
            [ type_ "range"
            , style "width" "100%"
            , id name
            , HA.name name
            , HA.min (String.fromFloat min)
            , HA.max (String.fromFloat max)
            , HA.value (String.fromFloat value)
            , HA.step (String.fromFloat step)
            , HE.onInput (String.toFloat >> Maybe.withDefault 42 >> onChange)
            ]
            []
        ]


colorPicker :
    { name : String
    , value : Color
    , onChange : Color -> msg
    }
    -> Html msg
colorPicker { name, value, onChange } =
    div []
        [ div [ class "mb-2" ]
            [ label
                [ for name ]
                [ inputLabel name ]
            ]
        , Html.input
            [ type_ "color"
            , class "w-full h-8 p-0 cursor-pointer"
            , id name
            , HA.name name
            , HE.onInput (Color.Convert.hexToColor >> Result.withDefault Color.black >> onChange)
            , HA.value (Color.Convert.colorToHex value)
            ]
            []
        ]
