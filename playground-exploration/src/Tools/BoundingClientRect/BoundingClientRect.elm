module Tools.BoundingClientRect.BoundingClientRect exposing (..)

import Tools.Geometry.Geometry exposing (Point2d)


type alias BoundingClientRect =
    { x : Float
    , y : Float
    , width : Float
    , height : Float
    , top : Float
    , right : Float
    , bottom : Float
    , left : Float
    }


dummyBoundingClientRect : BoundingClientRect
dummyBoundingClientRect =
    { x = 0
    , y = 0
    , width = 42
    , height = 42
    , top = 0
    , right = 0
    , bottom = 0
    , left = 0
    }


translateBoundingBoxBy : ( Float, Float ) -> BoundingClientRect -> BoundingClientRect
translateBoundingBoxBy ( dx, dy ) bb =
    { bb
        | top = bb.top + dy
        , bottom = bb.bottom + dy
        , y = bb.y + dy
        , left = bb.left + dx
        , right = bb.right + dx
        , x = bb.x + dx
    }


includedInBoundingClientRect : BoundingClientRect -> Point2d -> Bool
includedInBoundingClientRect rect point =
    List.all identity
        [ rect.left < point.x
        , rect.right > point.x
        , rect.top < point.y
        , rect.bottom > point.y
        ]


boundingClientRectsIntersect : BoundingClientRect -> BoundingClientRect -> Bool
boundingClientRectsIntersect rect1 rect2 =
    List.all identity
        [ rect1.left < rect2.right
        , rect1.right > rect2.left
        , rect1.top < rect2.bottom
        , rect1.bottom > rect2.top
        ]
