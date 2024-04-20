module Tools.HtmlHelpers.HtmlHelpers exposing (..)

import Html exposing (Attribute, Html, div, text)
import Html.Attributes exposing (class, style)
import Html.Events.Extra.Pointer exposing (onWithOptions)
import Tools.Geometry.Geometry exposing (Point2d)


hiddenIf : Bool -> Attribute msg
hiddenIf condition =
    styleIf condition "display" "none"


showIf : Bool -> Attribute msg
showIf condition =
    hiddenIf (not condition)


classIf : Bool -> String -> Attribute msg
classIf condition className =
    if condition then
        class className

    else
        class ""


styleIf : Bool -> String -> String -> Attribute msg
styleIf condition styleName style_ =
    if condition then
        style styleName style_

    else
        style "" ""



--


onPointerDownWithoutPropagation : msg -> Attribute msg
onPointerDownWithoutPropagation msg =
    onWithOptions "pointerdown" { stopPropagation = True, preventDefault = False } (\_ -> msg)
