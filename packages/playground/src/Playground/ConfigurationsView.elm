module Playground.ConfigurationsView exposing (..)

import Css exposing (..)
import DesignSystem
import Html.Styled exposing (Html, div, input, label, text)
import Html.Styled.Attributes as HA exposing (checked, css, for, id, name, type_)
import Playground.Configurations exposing (..)


viewConfigurations : Configurations -> Html Msg
viewConfigurations configurations =
    div
        [ css
            [ padding (rem 1.5)
            , color (rgba 255 255 255 0.7) -- text-gray-300 equivalent
            , displayFlex
            , flexDirection column
            , property "gap" "3rem" -- gap-12
            ]
        ]
        (List.map viewBlock configurations)


viewBlock : Block -> Html Msg
viewBlock block =
    div
        [ css
            [ displayFlex
            , flexDirection column
            , property "gap" "1rem" -- gap-4
            ]
        ]
        [ div
            [ css
                [ fontSize (rem 1.5) -- text-2xl
                , fontWeight bold
                ]
            ]
            [ text block.name ]
        , div
            [ css
                [ fontSize (rem 0.875) -- text-sm
                , displayFlex
                , flexDirection column
                , property "gap" "1rem" -- gap-4
                ]
            ]
            (block.configs |> List.map viewConfig)
        ]


viewConfig : ( String, Config ) -> Html Msg
viewConfig ( name, config ) =
    case config of
        BoolConfig value ->
            DesignSystem.checkbox
                { name = name
                , value = value
                , onCheck = SetBool name
                }

        StringConfig value ->
            DesignSystem.textInput
                { name = name
                , value = value
                , onChange = SetString name
                }

        FloatConfig ( min, max ) value ->
            DesignSystem.slider
                { name = name
                , value = value
                , min = min
                , max = max
                , step = 0.01 * (max - min)
                , onChange = SetFloat name
                }

        IntConfig ( min, max ) value ->
            DesignSystem.slider
                { name = name
                , value = toFloat value
                , min = toFloat min
                , max = toFloat max
                , step = 1
                , onChange = Basics.round >> SetInt name
                }

        ColorConfig value ->
            DesignSystem.colorPicker
                { name = name
                , value = value
                , onChange = SetColor name
                }

        OptionsConfig options ->
            DesignSystem.optionSelection
                { name = name
                , options = options
                , optionToString = identity
                , onChange = SetOption name
                }
