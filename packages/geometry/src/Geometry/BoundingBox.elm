module Geometry.BoundingBox exposing (..)

import Geometry2d exposing (Point2d)


type alias BoundingBox =
    { left : Float
    , right : Float
    , top : Float
    , bottom : Float
    }


width : BoundingBox -> Float
width bb =
    bb.right - bb.left


height : BoundingBox -> Float
height bb =
    abs (bb.bottom - bb.top)


center : BoundingBox -> Point2d
center bb =
    Point2d
        (0.5 * (bb.left + bb.right))
        (0.5 * (bb.top + bb.bottom))


dummyBoundingBox : BoundingBox
dummyBoundingBox =
    { left = 0
    , right = 42
    , top = 0
    , bottom = 42
    }


translate : ( Float, Float ) -> BoundingBox -> BoundingBox
translate ( dx, dy ) bb =
    { bb
        | top = bb.top + dy
        , right = bb.right + dx
        , bottom = bb.bottom + dy
        , left = bb.left + dx
    }


include : Point2d -> BoundingBox -> Bool
include point rect =
    List.all identity
        [ rect.left < point.x
        , rect.right > point.x
        , rect.top < point.y
        , rect.bottom > point.y
        ]


intersect : BoundingBox -> BoundingBox -> Bool
intersect rect1 rect2 =
    List.all identity
        [ rect1.left < rect2.right
        , rect1.right > rect2.left
        , rect1.top < rect2.bottom
        , rect1.bottom > rect2.top
        ]


union : List BoundingBox -> BoundingBox
union bbs =
    case bbs of
        [] ->
            dummyBoundingBox

        first :: rest ->
            List.foldl
                (\bb acc ->
                    { left = min bb.left acc.left
                    , right = max bb.right acc.right
                    , top = min bb.top acc.top
                    , bottom = max bb.bottom acc.bottom
                    }
                )
                first
                rest
