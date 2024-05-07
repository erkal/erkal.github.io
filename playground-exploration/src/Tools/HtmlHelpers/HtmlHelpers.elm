module Tools.HtmlHelpers.HtmlHelpers exposing (..)

import Html exposing (Attribute, Html, div, text)
import Html.Attributes exposing (class, style)


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
