module FpsMeter exposing
    ( FpsMeter
    , init
    , update
    , view
    )

import Deque exposing (Deque)
import Float.Extra
import Html exposing (Html, div, text)
import Html.Attributes exposing (class, style)


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
            div [ class "text-green-300" ]
                [ text "Frame Rate: "
                , text (fps |> Maybe.map (Float.Extra.toFixedDecimalPlaces 0) |> Maybe.withDefault "-")
                ]

        deltaTimeToPixels : Float -> Float
        deltaTimeToPixels dt =
            dt * 1000

        viewBar : Float -> Html msg
        viewBar dt =
            div
                [ class "flex-none bottom-0"
                , class <|
                    if dt < 0.01667 then
                        "bg-green-500"

                    else
                        "bg-red-400"
                , class "ring-[1px] ring-black"
                , style "width" "4px"
                , style "height" (String.fromFloat (deltaTimeToPixels dt) ++ "px")
                ]
                []

        sixtyFpsLine : Html msg
        sixtyFpsLine =
            div
                [ class "absolute w-full h-px -translate-y-1/2 bg-green-300"
                , style "bottom" (String.fromFloat (deltaTimeToPixels (1 / 60)) ++ "px")
                ]
                []

        viewAsBars : Html msg
        viewAsBars =
            div
                [ class "relative h-[50px] bg-neutral-900"
                ]
                [ sixtyFpsLine
                , div [ class "h-full", class "flex flex-row items-end" ]
                    (fpsMeter |> getAll |> List.map viewBar)
                ]
    in
    div
        [ class "flex flex-col gap-2"
        ]
        [ viewAsBars
        , viewAsNumber
        ]
