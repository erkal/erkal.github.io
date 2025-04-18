module DesignSystem exposing (..)

import Color exposing (Color)
import Color.Convert
import Css exposing (..)
import Css.Global exposing (descendants, typeSelector)
import Css.Media
import DesignSystem.Color exposing (..)
import Html.Styled exposing (Html, a, div, fromUnstyled, input, label, text)
import Html.Styled.Attributes as HA exposing (css, for, href, id, type_, value)
import Html.Styled.Events as HE exposing (onCheck, onClick, onInput)
import Icons
import Json.Decode as Decode
import Markdown
import SelectList exposing (SelectList)


withHomePageHeader : Html msg -> Html msg
withHomePageHeader content =
    div
        [ css
            [ position absolute
            , zIndex (int 1)
            , width (pct 100)
            , height (pct 100)
            , backgroundColor (toCssColor gray900)
            , overflow auto
            , property "user-select" "text"
            ]
        ]
        [ div
            [ css
                [ margin2 zero auto
                , maxWidth (px 860)
                , padding4 zero (px 16) zero (px 16)
                , displayFlex
                , flexDirection column
                ]
            ]
            [ div
                [ css
                    [ width (pct 100)
                    , margin4 zero zero (px 48) zero
                    , displayFlex
                    , justifyContent flexEnd
                    , alignItems center
                    , borderBottom3 (px 1) solid (toCssColor whiteAlpha400)
                    ]
                ]
                [ a
                    [ css
                        [ padding (px 16)
                        , width (px 80)
                        , height (px 80)
                        , color (toCssColor whiteAlpha600)
                        , hover [ color (toCssColor whiteAlpha900) ]
                        ]
                    , href "../index.html"
                    , HA.title "Home"
                    ]
                    [ Icons.icons.home ]
                , a
                    [ css
                        [ padding (px 16)
                        , width (px 80)
                        , height (px 80)
                        , color (toCssColor whiteAlpha600)
                        , hover [ color (toCssColor whiteAlpha900) ]
                        ]
                    , href "https://twitter.com/AzizErkalSelman"
                    , HA.target "_blank"
                    , HA.title "Twitter"
                    ]
                    [ Icons.icons.twitter ]
                , a
                    [ css
                        [ padding (px 16)
                        , width (px 80)
                        , height (px 80)
                        , color (toCssColor whiteAlpha600)
                        , hover [ color (toCssColor whiteAlpha900) ]
                        ]
                    , href "https://github.com/erkal"
                    , HA.target "_blank"
                    , HA.title "GitHub"
                    ]
                    [ Icons.icons.githubCat ]
                ]
            , content
            ]
        ]


markdownBlock : String -> Html msg
markdownBlock content =
    div
        [ css
            [ -- Base typography styles
              color (toCssColor whiteAlpha800)
            , fontSize (px 16)
            , lineHeight (num 1.5)
            , maxWidth none

            -- Headers
            , descendants
                [ typeSelector "h1"
                    [ fontSize (px 36)
                    , fontWeight bold
                    , marginTop (px 48)
                    , marginBottom (px 16)
                    , color (toCssColor whiteAlpha900)
                    ]
                , typeSelector "h2"
                    [ fontSize (px 30)
                    , fontWeight bold
                    , marginTop (px 48)
                    , marginBottom (px 16)
                    , color (toCssColor whiteAlpha900)
                    ]
                , typeSelector "h3"
                    [ fontSize (px 24)
                    , fontWeight bold
                    , marginTop (px 48)
                    , marginBottom (px 16)
                    , color (toCssColor whiteAlpha900)
                    ]
                , typeSelector "h4"
                    [ fontSize (px 20)
                    , fontWeight bold
                    , marginTop (px 48)
                    , marginBottom (px 16)
                    , color (toCssColor whiteAlpha900)
                    ]

                -- Paragraphs
                , typeSelector "p"
                    [ marginTop (px 16)
                    , marginBottom (px 16)
                    ]

                -- Lists
                , typeSelector "ul"
                    [ listStyleType disc
                    , paddingLeft (px 24)
                    , marginTop (px 16)
                    , marginBottom (px 16)
                    ]
                , typeSelector "ol"
                    [ listStyleType decimal
                    , paddingLeft (px 24)
                    , marginTop (px 16)
                    , marginBottom (px 16)
                    ]
                , typeSelector "li"
                    [ marginTop (px 4)
                    , marginBottom (px 4)
                    ]

                -- Blockquotes
                , typeSelector "blockquote"
                    [ borderLeft3 (px 4) solid (toCssColor cyan700)
                    , paddingLeft (px 16)
                    , fontStyle italic
                    , color (toCssColor whiteAlpha700)
                    ]

                -- Code blocks
                , typeSelector "pre"
                    [ backgroundColor (toCssColor blackAlpha600)
                    , lineHeight (num 1.34)
                    , overflow auto
                    , padding2 (px 16) (px 24)
                    , borderRadius (px 8)
                    , marginLeft (px 16)
                    , marginRight (px 16)
                    , marginTop (px 16)
                    , marginBottom (px 24)
                    , color (toCssColor cyan300)
                    ]
                , typeSelector "code"
                    [ fontFamilies [ "monospace" ]
                    , fontSize (pct 74)
                    ]

                -- Tables
                , typeSelector "table"
                    [ width (pct 100)
                    , borderCollapse collapse
                    , marginTop (px 16)
                    , marginBottom (px 16)
                    ]
                , typeSelector "th"
                    [ textAlign left
                    , padding (px 8)
                    , borderBottom3 (px 2) solid (toCssColor cyan700)
                    , fontWeight bold
                    ]
                , typeSelector "td"
                    [ textAlign left
                    , padding (px 8)
                    , borderBottom3 (px 1) solid (toCssColor whiteAlpha300)
                    ]

                -- Links
                , typeSelector "a"
                    [ color (toCssColor yellow)
                    , textDecoration underline
                    , fontWeight bold
                    , hover [ color (toCssColor yellow300) ]
                    ]

                -- Images
                , typeSelector "img"
                    [ maxWidth (pct 100)
                    , height auto
                    , marginTop (px 16)
                    , marginBottom (px 16)
                    ]

                -- Horizontal rules
                , typeSelector "hr"
                    [ borderTop3 (px 1) solid (toCssColor whiteAlpha400)
                    , marginTop (px 24)
                    , marginBottom (px 24)
                    ]
                ]

            -- Responsive styles for larger screens (equivalent to lg:prose-xl)
            , Css.Media.withMedia [ Css.Media.only Css.Media.screen [ Css.Media.minWidth (px 1024) ] ]
                [ fontSize (px 20)
                , descendants
                    [ typeSelector "h1"
                        [ fontSize (px 48)
                        , marginTop (px 32)
                        , marginBottom (px 24)
                        ]
                    , typeSelector "h2"
                        [ fontSize (px 36)
                        , marginTop (px 32)
                        , marginBottom (px 24)
                        ]
                    , typeSelector "h3"
                        [ fontSize (px 30)
                        , marginTop (px 32)
                        , marginBottom (px 24)
                        ]
                    , typeSelector "h4"
                        [ fontSize (px 24)
                        , marginTop (px 32)
                        , marginBottom (px 24)
                        ]
                    , typeSelector "p"
                        [ marginTop (px 24)
                        , marginBottom (px 24)
                        ]
                    ]
                ]
            ]
        ]
        [ fromUnstyled <|
            Markdown.toHtmlWith
                { githubFlavored = Just { tables = True, breaks = True }
                , defaultHighlighting = Nothing
                , sanitize = True
                , smartypants = True
                }
                [-- style "pointer-events" "auto"
                 --, style "user-select" "text"
                ]
                content
        ]


buttonWithIcon : { name : String, icon : Html msg, onClick : msg } -> Html msg
buttonWithIcon { onClick, name, icon } =
    div
        [ HA.title name
        , css
            [ width (px 48)
            , height (px 48)
            , padding (px 8)
            , borderRadius (pct 100)
            , boxShadow5 zero (px 2) (px 4) zero (rgba 0 0 0 0.3)
            , cursor pointer
            , backgroundColor (toCssColor yellow)
            , color (toCssColor blackAlpha900)
            , hover
                [ backgroundColor (toCssColor yellow300)
                ]
            , active
                [ backgroundColor (toCssColor yellow400)
                ]
            ]
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
    div [ css [ displayFlex, flexDirection column, property "gap" "8px" ] ]
        [ label [ for name ]
            [ inputLabel name ]
        , div []
            [ input
                [ css
                    [ padding (px 8)
                    , width (pct 100)
                    , color (toCssColor whiteAlpha900)
                    , backgroundColor (toCssColor blackAlpha600)
                    , fontFamilies [ "monospace" ]
                    , fontWeight bold
                    , borderRadius (px 4)
                    , outline none
                    , borderBottom3 (px 2) solid (toCssColor whiteAlpha400)
                    , focus [ borderBottom3 (px 2) solid (toCssColor whiteAlpha700) ]
                    ]
                , onInput onChange
                , HA.value value
                ]
                []
            ]
        ]


inputLabel : String -> Html msg
inputLabel str =
    div [ css [ fontSize (px 12), fontWeight bold, color (toCssColor whiteAlpha700) ] ]
        [ text str ]


checkbox :
    { name : String
    , value : Bool
    , onCheck : Bool -> msg
    }
    -> Html msg
checkbox { name, value, onCheck } =
    div
        [ css
            [ displayFlex
            , flexDirection row
            , alignItems center
            , property "gap" "8px"
            , cursor pointer
            ]
        ]
        [ Html.Styled.input
            [ type_ "checkbox"
            , css
                [ width (px 16)
                , height (px 16)
                , cursor pointer
                ]
            , id name
            , HA.name name
            , HA.checked value
            , HE.onCheck onCheck
            ]
            []
        , label
            [ for name
            , css [ cursor pointer, color (toCssColor whiteAlpha800) ]
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
            Html.Styled.option
                [ value optionStr ]
                [ text optionStr ]
    in
    div []
        [ div [ css [ marginBottom (px 8) ] ]
            [ label [ for name ]
                [ inputLabel name ]
            ]
        , Html.Styled.select
            [ css
                [ maxWidth fitContent
                , padding2 (px 4) (px 8)
                , borderRadius (px 4)
                , backgroundColor (toCssColor blackAlpha600)
                , color (toCssColor whiteAlpha900)
                , border3 (px 1) solid (toCssColor whiteAlpha400)
                ]
            , id name
            , HA.name name
            , HE.on "change"
                (HE.targetValue
                    |> Decode.map onChange
                )
            , value (options |> SelectList.getCurrent |> optionToString)
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
    div
        [ css
            [ width (pct 100)
            , displayFlex
            , flexDirection column
            , property "gap" "8px"
            ]
        ]
        [ label
            [ for name ]
            [ div [ css [ position relative, width (pct 100) ] ]
                [ div [ css [ display inlineBlock, color (toCssColor whiteAlpha700) ] ] [ inputLabel name ]
                , div [ css [ display inlineBlock, float right, color (toCssColor cyan400) ] ] [ text (String.fromFloat value) ]
                ]
            ]
        , input
            [ type_ "range"
            , css
                [ width (pct 100)
                , height (px 8)
                , backgroundColor (toCssColor blackAlpha600)
                , cursor pointer
                , borderRadius (px 4)
                ]
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
    , value : Color.Color
    , onChange : Color.Color -> msg
    }
    -> Html msg
colorPicker { name, value, onChange } =
    div []
        [ div [ css [ marginBottom (px 8) ] ]
            [ label
                [ for name ]
                [ inputLabel name ]
            ]
        , Html.Styled.input
            [ type_ "color"
            , css
                [ width (pct 100)
                , height (px 32)
                , padding zero
                , cursor pointer
                , border3 (px 1) solid (toCssColor whiteAlpha400)
                , borderRadius (px 4)
                ]
            , id name
            , HA.name name
            , HE.onInput (Color.Convert.hexToColor >> Result.withDefault Color.black >> onChange)
            , HA.value (Color.Convert.colorToHex value)
            ]
            []
        ]
