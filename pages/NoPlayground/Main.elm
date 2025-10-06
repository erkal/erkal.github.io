module NoPlayground.Main exposing (main)

import Browser
import Browser.Events
import Css exposing (..)
import DesignSystem.Color exposing (..)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css)
import Time exposing (Posix)



-- MAIN


main =
    Browser.element
        { init = init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { time : Posix
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { time = Time.millisToPosix 0 }
    , Cmd.none
    )



-- UPDATE


type Msg
    = Tick Time.Posix


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick posix ->
            ( { model | time = posix }
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrame Tick



-- VIEW


view : Model -> Html Msg
view model =
    div
        [ css
            [ displayFlex
            , justifyContent center
            , alignItems center
            , height (vh 100)
            , width (vw 100)
            , backgroundColor (toCssColor gray900)
            ]
        ]
        [ div
            [ css
                [ fontSize (rem 2)
                , fontWeight bold
                , width (rem 24)
                , backgroundColor (toCssColor yellow)
                , color (toCssColor black)
                , borderRadius (rem 1)
                , padding (rem 2)
                ]
            ]
            [ text (String.fromInt (Time.posixToMillis model.time) ++ " ms") ]
        ]
