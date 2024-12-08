module DesignSystemShowcase.Main exposing (main)

import Browser
import Css exposing (..)
import DesignSystem.Color exposing (..)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css)



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
    {}


init : () -> ( Model, Cmd Msg )
init _ =
    ( {}
    , Cmd.none
    )



-- UPDATE


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( {}
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    div
        [ css
            [ position absolute
            , width (pct 100)
            , height (pct 100)
            , overflow scroll
            , backgroundColor (toCssColor cyan600)
            , color (toCssColor white)
            ]
        ]
        [ viewColorPalette ]
