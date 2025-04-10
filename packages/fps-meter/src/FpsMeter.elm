module FpsMeter exposing
    ( FpsMeter
    , init
    , update
    , view
    )

import Css exposing (..)
import Deque exposing (Deque)
import DesignSystem.Color exposing (blackAlpha500, gray900, green, green300, red, toCssColor)
import Float.Extra
import Html.Styled exposing (Html, div, text)
import Html.Styled.Attributes exposing (css)


type FpsMeter
    = FpsMeter
        { deque : Deque Float

        -- Although `length` and `averageDeltaTime` can be derived from `deque`, they are stored separately for performance reasons.
        , length : Int
        , averageDeltaTime :
            -- this is `Nothing` when the length of the deque is less than `length`
            Maybe Float
        }


{-| the length must be bigger than 1
-}
init : Int -> FpsMeter
init length =
    FpsMeter
        { deque = Deque.empty
        , length = length
        , averageDeltaTime = Nothing
        }


get : FpsMeter -> Maybe Float
get (FpsMeter d) =
    d.averageDeltaTime
        |> Maybe.map (\x -> 1 / x)


getAll : FpsMeter -> List Float
getAll (FpsMeter { deque }) =
    deque
        |> Deque.toList


update : Float -> FpsMeter -> FpsMeter
update dt (FpsMeter d) =
    -- This is written to be efficient, not to be readable.
    case d.averageDeltaTime of
        Nothing ->
            if Deque.length d.deque < d.length - 1 then
                -- We haven't reached the desired length of the deque yet.
                FpsMeter
                    { d | deque = d.deque |> Deque.pushBack dt }

            else
                -- We reach the desired length of the deque for the first time. Equality holds here by construction.
                -- This case is executed only once in the lifetime of the FpsMeter.
                let
                    newDeque =
                        d.deque |> Deque.pushBack dt
                in
                FpsMeter
                    { d
                        | deque = newDeque
                        , averageDeltaTime = Just (Deque.foldl (+) 0 newDeque / toFloat d.length)
                    }

        Just averageDeltaTime ->
            -- Here, we already have the desired length of the deque.
            let
                ( front, poppedDeque ) =
                    d.deque
                        |> Deque.popFront
                        |> Tuple.mapFirst (Maybe.withDefault {- this never happens because the length is bigger than 1 -} 0)
            in
            FpsMeter
                { d
                    | deque = poppedDeque |> Deque.pushBack dt
                    , averageDeltaTime = Just (averageDeltaTime + (dt - front) / toFloat d.length)
                }


view : FpsMeter -> Html msg
view fpsMeter =
    let
        fps : Maybe Float
        fps =
            fpsMeter
                |> get

        viewAsNumber : Html msg
        viewAsNumber =
            div [ css [ color (toCssColor green300) ] ]
                [ text "Frame Rate: "
                , text (fps |> Maybe.map (Float.Extra.toFixedDecimalPlaces 0) |> Maybe.withDefault "-")
                ]

        deltaTimeToPixels : Float -> Float
        deltaTimeToPixels dt =
            dt * 1000

        viewBar : Float -> Html msg
        viewBar dt =
            div
                [ css
                    [ flex none
                    , width (px 4)
                    , height (px (deltaTimeToPixels dt))
                    , bottom zero
                    , if dt < 1 / 60 + 0.0001 then
                        backgroundColor (toCssColor green)

                      else
                        backgroundColor (toCssColor red)
                    ]
                ]
                []

        sixtyFpsLine : Html msg
        sixtyFpsLine =
            div
                [ css
                    [ position absolute
                    , width (pct 100)
                    , height (px 1)
                    , transforms [ translateY (pct -50) ]
                    , backgroundColor (toCssColor green300)
                    , bottom (px (deltaTimeToPixels (1 / 60)))
                    ]
                ]
                []

        viewAsBars : Html msg
        viewAsBars =
            div
                [ css
                    [ position relative
                    , height (px 50)
                    , backgroundColor (toCssColor gray900)
                    ]
                ]
                [ sixtyFpsLine
                , div
                    [ css
                        [ height (pct 100)
                        , displayFlex
                        , flexDirection row
                        , alignItems flexEnd
                        ]
                    ]
                    (fpsMeter |> getAll |> List.map viewBar)
                ]
    in
    div
        [ css
            [ displayFlex
            , flexDirection column
            , property "gap" "8px"
            , padding (px 8)
            , backgroundColor (toCssColor blackAlpha500)
            ]
        ]
        [ viewAsBars
        , viewAsNumber
        ]
