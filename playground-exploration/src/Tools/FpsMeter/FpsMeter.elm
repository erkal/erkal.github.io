module Tools.FpsMeter.FpsMeter exposing
    ( FpsMeter
    , get
    , getAll
    , init
    , update
    )

import Deque exposing (Deque)


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
