module Geometry2d exposing (..)


type alias Point2d =
    { x : Float, y : Float }


type alias Vector2d =
    ( Float, Float )


vectorTo : Point2d -> Point2d -> Vector2d
vectorTo end start =
    ( end.x - start.x
    , end.y - start.y
    )


vectorFrom : Point2d -> Point2d -> Vector2d
vectorFrom p q =
    ( q.x - p.x
    , q.y - p.y
    )


scaleAbout : Point2d -> Float -> Point2d -> Point2d
scaleAbout centerPoint scale point =
    vectorFrom centerPoint point
        |> scaleBy scale
        |> (\vec -> translateBy vec centerPoint)


rotate : Float -> Point2d -> Point2d
rotate theta { x, y } =
    { x = x * cos theta - y * sin theta
    , y = x * sin theta + y * cos theta
    }


rotateAround : Point2d -> Float -> Point2d -> Point2d
rotateAround rotationCenter theta p =
    p
        |> translateBy (rotationCenter |> vectorTo (Point2d 0 0))
        |> rotate theta
        |> translateBy (Point2d 0 0 |> vectorTo rotationCenter)


translateBy : Vector2d -> Point2d -> Point2d
translateBy ( dx, dy ) { x, y } =
    { x = x + dx
    , y = y + dy
    }


{-| The angle of the vector from the first point to the second point.
The angle is measured in radians, clockwise from the positive x-axis.
-}
angleOf : Point2d -> Point2d -> Float
angleOf p q =
    atan2 (q.y - p.y) (q.x - p.x)


add : Vector2d -> Vector2d -> Vector2d
add ( x1, y1 ) ( x2, y2 ) =
    ( x1 + x2, y1 + y2 )


scaleBy : Float -> Vector2d -> Vector2d
scaleBy k ( x, y ) =
    ( k * x, k * y )


distance : Point2d -> Point2d -> Float
distance p q =
    length
        ( p.x - q.x
        , p.y - q.y
        )


length : Vector2d -> Float
length v =
    sqrt (dotProduct v v)


dotProduct : Vector2d -> Vector2d -> Float
dotProduct ( x1, y1 ) ( x2, y2 ) =
    x1 * x2 + y1 * y2
