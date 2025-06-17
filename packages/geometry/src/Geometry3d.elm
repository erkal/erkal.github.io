module Geometry3d exposing
    ( Point, Vector, Plane
    , pointFromVector, vectorFrom, vectorTo
    , add, length, dotProduct, crossProduct, normalize, scaleBy
    , distance, translateBy, toSphericalCoordinates
    , rotateAround, rotateX, rotateY, rotateZ
    , pointsEqual, vectorsEqual, signedDistanceToPlane
    , Axis
    )

{-| This module provides utilities for working with 3D geometry. It includes
types for representing points, vectors, axes, and planes, along with functions
for performing common operations like translation, rotation, and various geometric
calculations.


# Core Types

@docs Point, Vector, Axis3d, Plane


# Conversions

@docs pointFromVector, vectorFrom, vectorTo


# Vector Operations

@docs add, length, dotProduct, crossProduct, normalize, scaleBy


# Geometric Operations

@docs distance, translateBy, toSphericalCoordinates


# Rotations

@docs rotateAround, rotateX, rotateY, rotateZ


# Comparison

@docs pointsEqual, vectorsEqual, signedDistanceToPlane

-}


{-| A 3D point in space with x, y, and z coordinates.
-}
type alias Point =
    { x : Float
    , y : Float
    , z : Float
    }


{-| A 3D vector represented as a tuple of three floats (x, y, z).
Unlike points, vectors represent direction and magnitude rather than position.
-}
type alias Vector =
    ( Float, Float, Float )


{-| Represents an axis in 3D space, defined by an origin point and a direction vector.
-}
type alias Axis =
    { originPoint : Point
    , direction : Vector
    }


{-| Represents a plane in 3D space, defined by an origin point and a normal vector.

The normal vector defines the orientation of the plane and should be perpendicular to the plane's surface.
Any point on the plane can serve as the origin point.

A plane divides 3D space into two half-spaces. The normal vector points toward the positive half-space.

-}
type alias Plane =
    { originPoint : Point
    , normalDirection : Vector
    }


{-| Compare two points for approximate equality.
Returns True if the points are within epsilon distance of each other.
-}
pointsEqual : Float -> Point -> Point -> Bool
pointsEqual epsilon p1 p2 =
    List.all identity
        [ abs (p1.x - p2.x) < epsilon
        , abs (p1.y - p2.y) < epsilon
        , abs (p1.z - p2.z) < epsilon
        ]


{-| Check if two vectors are equal within a given tolerance.
-}
vectorsEqual : Float -> Vector -> Vector -> Bool
vectorsEqual epsilon ( x1, y1, z1 ) ( x2, y2, z2 ) =
    List.all identity
        [ abs (x1 - x2) < epsilon
        , abs (y1 - y2) < epsilon
        , abs (z1 - z2) < epsilon
        ]


{-| Convert a vector to a point.
-}
pointFromVector : Vector -> Point
pointFromVector ( x, y, z ) =
    Point x y z


{-| Create a vector pointing from the start point to the end point.
-}
vectorTo : Point -> Point -> Vector
vectorTo end start =
    ( end.x - start.x
    , end.y - start.y
    , end.z - start.z
    )


{-| Create a vector pointing from the first point to the second point.
-}
vectorFrom : Point -> Point -> Vector
vectorFrom p q =
    ( q.x - p.x
    , q.y - p.y
    , q.z - p.z
    )


{-| Add two vectors together.
-}
add : Vector -> Vector -> Vector
add ( x1, y1, z1 ) ( x2, y2, z2 ) =
    ( x1 + x2
    , y1 + y2
    , z1 + z2
    )


{-| Convert a Cartesian vector to spherical coordinates.

Returns a record with:

  - radius: the distance from the origin
  - azimuth: the angle in the xy-plane (in radians)
  - inclination: the angle from the z-axis (in radians)

-}
toSphericalCoordinates : Vector -> { radius : Float, azimuth : Float, inclination : Float }
toSphericalCoordinates ( x, y, z ) =
    let
        r : Float
        r =
            length ( x, y, z )
    in
    { radius = r
    , azimuth = atan2 y x
    , inclination = acos (z / r)
    }


{-| Calculate the length (magnitude) of a vector.
-}
length : Vector -> Float
length ( x, y, z ) =
    sqrt (x ^ 2 + y ^ 2 + z ^ 2)


{-| Calculate the distance between two points.
-}
distance : Point -> Point -> Float
distance p q =
    length (vectorFrom p q)


{-| Calculate the dot product of two vectors.
-}
dotProduct : Vector -> Vector -> Float
dotProduct ( x1, y1, z1 ) ( x2, y2, z2 ) =
    x1 * x2 + y1 * y2 + z1 * z2


{-| Scale a vector by a scalar factor.
-}
scaleBy : Float -> Vector -> Vector
scaleBy k ( dx, dy, dz ) =
    ( k * dx
    , k * dy
    , k * dz
    )


{-| Translate a point by a vector.
-}
translateBy : Vector -> Point -> Point
translateBy ( dx, dy, dz ) p =
    { x = p.x + dx
    , y = p.y + dy
    , z = p.z + dz
    }


{-| Calculate the cross product of two vectors.
-}
crossProduct : Vector -> Vector -> Vector
crossProduct ( x1, y1, z1 ) ( x2, y2, z2 ) =
    ( y1 * z2 - z1 * y2
    , z1 * x2 - x1 * z2
    , x1 * y2 - y1 * x2
    )


{-| Normalize a vector to have a length of 1.
-}
normalize : Vector -> Vector
normalize vec =
    let
        len =
            length vec
    in
    scaleBy (1 / len) vec


{-| Rotate a point around an arbitrary axis by a given angle (in radians).

This uses Rodrigues' rotation formula for rotating a point around an axis.

-}
rotateAround : Axis -> Float -> Point -> Point
rotateAround axis angle point =
    let
        -- Move point relative to axis origin
        toLocal =
            ( -axis.originPoint.x, -axis.originPoint.y, -axis.originPoint.z )

        toGlobal =
            ( axis.originPoint.x, axis.originPoint.y, axis.originPoint.z )

        -- Convert point to local coordinates (relative to axis origin)
        localPoint =
            translateBy toLocal point

        -- Convert Point to Vector for calculations
        localVec =
            ( localPoint.x, localPoint.y, localPoint.z )

        -- Normalize axis direction
        axisDir =
            normalize axis.direction

        -- Apply Rodrigues rotation formula using components
        cosA =
            cos angle

        sinA =
            sin angle

        dotP =
            dotProduct axisDir localVec

        -- Rodrigues rotation formula: v' = v*cos(θ) + (k×v)*sin(θ) + k(k·v)(1-cos(θ))
        rotatedVec =
            add
                (scaleBy cosA localVec)
                (add
                    (scaleBy sinA (crossProduct axisDir localVec))
                    (scaleBy (1 - cosA) (scaleBy dotP axisDir))
                )
    in
    -- Convert vector back to point and move to world coordinates
    rotatedVec
        |> pointFromVector
        |> translateBy toGlobal


{-| Rotate a point around the X-axis by a given angle (in radians).
-}
rotateX : Float -> Point -> Point
rotateX =
    rotateAround { originPoint = Point 0 0 0, direction = ( 1, 0, 0 ) }


{-| Rotate a point around the Y-axis by a given angle (in radians).
-}
rotateY : Float -> Point -> Point
rotateY =
    rotateAround { originPoint = Point 0 0 0, direction = ( 0, 1, 0 ) }


{-| Rotate a point around the Z-axis by a given angle (in radians).
-}
rotateZ : Float -> Point -> Point
rotateZ =
    rotateAround { originPoint = Point 0 0 0, direction = ( 0, 0, 1 ) }


{-| Calculate the signed distance from a point to a plane.
Positive value means the point is on the side of the plane that the normal points to.
Negative value means the point is on the opposite side.
Zero means the point is on the plane.
-}
signedDistanceToPlane : Plane -> Point -> Float
signedDistanceToPlane plane point =
    let
        -- Get the vector from the plane's origin to the point
        pointVector : Vector
        pointVector =
            vectorFrom plane.originPoint point
    in
    -- The signed distance is the dot product of the normal and the point vector
    dotProduct plane.normalDirection pointVector
