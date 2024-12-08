module Geometry.BoundingBox exposing (..)

import Geometry2d exposing (Point2d)


type alias BoundingBox =
    { top : Float
    , right : Float
    , bottom : Float
    , left : Float
    }


dummyBoundingBox : BoundingBox
dummyBoundingBox =
    { top = 0
    , right = 42
    , bottom = 42
    , left = 0
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
