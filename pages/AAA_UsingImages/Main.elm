module AAA_UsingImages.Main exposing (main)

import Css exposing (..)
import Html.Styled exposing (Html, div)
import Html.Styled.Attributes exposing (class, css, style)
import Play exposing (..)
import Playground.Tape exposing (Message(..))


main : Playground Model Never
main =
    Play.simpleApplication
        { initialConfigurations = initialConfigurations
        , init = init
        , update = update
        , view = view
        , hasTape = False
        }


type alias Model =
    {}



-- INIT


initialConfigurations : Configurations
initialConfigurations =
    []


init : Computer -> Model
init computer =
    {}



-- UPDATE


update : Computer -> Message Never -> Model -> Model
update computer message model =
    model



-- VIEW


view : Computer -> Model -> Html Never
view computer model =
    div
        [ css
            [ position fixed
            , width (pct 100)
            , height (pct 100)
            , backgroundImage (url "./assets/canvas-background.jpg")
            , backgroundSize2 (px 320) (px 200)
            , backgroundRepeat repeat
            ]
        ]
        []
