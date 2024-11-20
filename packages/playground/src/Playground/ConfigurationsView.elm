module Playground.ConfigurationsView exposing (..)

import DesignSystem
import Html exposing (Html, div, input, label, text)
import Html.Attributes as HA exposing (checked, class, for, id, name, style, type_)
import Playground.Configurations exposing (..)


viewConfigurations : Configurations -> Html Msg
viewConfigurations configurations =
    div
        [ class "p-6 text-gray-300"
        , class "flex flex-col gap-12"
        ]
        (List.map viewBlock configurations)


viewBlock : Block -> Html Msg
viewBlock block =
    div [ class "flex flex-col gap-4" ]
        [ div [ class "text-2xl font-bold" ] [ text block.name ]
        , div
            [ class "text-sm"
            , class "flex flex-col gap-4"
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
                , onChange = round >> SetInt name
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
