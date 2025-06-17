module SceneWebGL exposing
    ( Shape, block, cube, cylinder, group, line, sphere, triangle, square, convexPolygon
    , move, moveX, moveY, moveZ, rotateX, rotateY, rotateZ, rotateAround, scale, scaleAround
    , custom, sunny, unlit
    , ngon, ngonWithWalls, rectangle
    , axes
    )

{-|


# Shapes

@docs Shape, block, cube, cylinder, group, line, sphere, triangle, square, convexPolygon


# Moving Shapes

@docs move, moveX, moveY, moveZ, rotateX, rotateY, rotateZ, rotateAround, scale, scaleAround


# Scenes

@docs custom, sunny, unlit


# Special Shapes

@docs axes, ngon, ngonWithWalls, rectangle

-}

import Angle exposing (Angle)
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import Color exposing (Color)
import Cylinder3d exposing (Cylinder3d)
import Direction3d exposing (Direction3d)
import Geometry3d exposing (Point)
import Html exposing (Html)
import Length exposing (Length, Meters)
import LineSegment3d exposing (LineSegment3d)
import Pixels
import Point3d exposing (Point3d)
import Scene3d exposing (Antialiasing, Exposure, Lights, ToneMapping)
import Scene3d.Light exposing (Chromaticity, Light)
import Scene3d.Material as Material exposing (Material, uniform)
import SceneWebGL.Camera exposing (Camera)
import SceneWebGL.ModifiedFromScene3d.Scenes
import Sphere3d exposing (Sphere3d)
import Triangle3d exposing (Triangle3d)
import Vector3d


sunny :
    { devicePixelRatio : Float
    , screen : { screen | width : Float, height : Float }
    , camera : Camera
    , sunlightAzimuth : Float
    , sunlightElevation : Float
    , backgroundColor : Color
    }
    -> List Shape
    -> Html Never
sunny arguments shapes =
    SceneWebGL.ModifiedFromScene3d.Scenes.sunnyWithDevicePixelRatio
        { devicePixelRatio = arguments.devicePixelRatio
        , camera = arguments.camera
        , clipDepth = Length.centimeters 0.5
        , dimensions =
            ( Pixels.int (round arguments.screen.width)
            , Pixels.int (round arguments.screen.height)
            )
        , background = Scene3d.backgroundColor arguments.backgroundColor
        , entities = shapes
        , shadows = True
        , upDirection = Direction3d.z
        , sunlightDirection =
            Direction3d.xyZ
                (Angle.radians arguments.sunlightAzimuth)
                (Angle.radians arguments.sunlightElevation)
        }


unlit :
    { devicePixelRatio : Float
    , screen : { screen | width : Float, height : Float }
    , camera : Camera
    , clipDepth : Float
    , background : Color
    }
    -> List Shape
    -> Html Never
unlit arguments shapes =
    SceneWebGL.ModifiedFromScene3d.Scenes.unlitWithDevicePixelRatio
        { devicePixelRatio = arguments.devicePixelRatio
        , dimensions =
            ( Pixels.int (round arguments.screen.width)
            , Pixels.int (round arguments.screen.height)
            )
        , camera = arguments.camera
        , clipDepth = Length.meters arguments.clipDepth
        , background = Scene3d.backgroundColor arguments.background
        , entities = shapes
        }


custom :
    { devicePixelRatio : Float
    , screen : { screen | width : Float, height : Float }
    , camera : Camera
    , lights : Lights ()
    , clipDepth : Float
    , exposure : Exposure
    , toneMapping : ToneMapping
    , whiteBalance : Chromaticity
    , antialiasing : Antialiasing
    , backgroundColor : Color
    }
    -> List Shape
    -> Html Never
custom arguments shapes =
    SceneWebGL.ModifiedFromScene3d.Scenes.customWithDevicePixelRatio
        { devicePixelRatio = arguments.devicePixelRatio
        , lights = arguments.lights
        , camera = arguments.camera
        , clipDepth = Length.meters arguments.clipDepth
        , exposure = arguments.exposure
        , toneMapping = arguments.toneMapping
        , whiteBalance = arguments.whiteBalance
        , antialiasing = arguments.antialiasing
        , dimensions =
            ( Pixels.int (round arguments.screen.width)
            , Pixels.int (round arguments.screen.height)
            )
        , background = Scene3d.backgroundColor arguments.backgroundColor
        , entities = shapes
        }



-- SHAPES


type alias Material_ =
    Material () { normals : () }


type alias Shape =
    Scene3d.Entity ()


type alias Vector =
    ( Float, Float, Float )


triangle : Material_ -> ( Point, Point, Point ) -> Shape
triangle material_ ( p, q, r ) =
    Scene3d.facetWithShadow material_
        (Triangle3d.from
            (Point3d.meters p.x p.y p.z)
            (Point3d.meters q.x q.y q.z)
            (Point3d.meters r.x r.y r.z)
        )


{-| Create a convex polygon from a list of 3D points.

Requirements:

  - Points must form a convex polygon and be coplanar
  - Points must be in counter-clockwise order (determines front face via right-hand rule)

Uses fan triangulation with first point as center.

-}
convexPolygon : Material_ -> List Point -> Shape
convexPolygon material_ vertices =
    case vertices of
        p1 :: p2 :: p3 :: rest ->
            group
                (List.map2
                    (\p q -> triangle material_ ( p1, p, q ))
                    (p2 :: p3 :: rest)
                    -- the list below is shorter than the list above by 1 element. the last element of the list above is dropped by List.map2
                    (p3 :: rest)
                )

        _ ->
            group []


polygonWalls : Material_ -> List Point -> Float -> Shape
polygonWalls material_ vertices height =
    case vertices of
        [] ->
            group []

        first :: rest ->
            group
                (List.map2
                    (\p q ->
                        convexPolygon material_
                            [ p
                            , q
                            , q |> Geometry3d.translateBy ( 0, 0, -height )
                            , p |> Geometry3d.translateBy ( 0, 0, -height )
                            ]
                    )
                    vertices
                    (rest ++ [ first ])
                )


{-| Create a regular ngon on XY plane with a corner at Y direction
-}
ngon : Int -> Material_ -> Float -> Shape
ngon n material_ radius =
    let
        alpha : Float
        alpha =
            2 * pi / toFloat n

        vertices : List Point
        vertices =
            List.range 0 (n - 1)
                |> List.map
                    (\i ->
                        Point 0 radius 0
                            |> Geometry3d.rotateZ (alpha * toFloat i)
                    )
    in
    convexPolygon material_ vertices


{-| Create a regular ngon on XY plane with a corner at Y direction, with walls into -Z direction of heights
-}
ngonWithWalls : Int -> Material_ -> Float -> Float -> Shape
ngonWithWalls n material_ radius height =
    let
        alpha : Float
        alpha =
            2 * pi / toFloat n

        vertices : List Point
        vertices =
            List.range 0 (n - 1)
                |> List.map
                    (\i ->
                        Point 0 radius 0
                            |> Geometry3d.rotateZ (alpha * toFloat i)
                    )
    in
    group
        [ convexPolygon material_ vertices
        , polygonWalls material_ vertices height
        ]


rectangle : Material_ -> Float -> Float -> Shape
rectangle material_ width height =
    let
        wh : Float
        wh =
            width / 2

        hh : Float
        hh =
            height / 2

        upperLeftTriangle : Shape
        upperLeftTriangle =
            triangle material_ ( Point -wh -hh 0, Point wh hh 0, Point -wh hh 0 )
    in
    group
        [ upperLeftTriangle
        , upperLeftTriangle |> rotateZ pi
        ]


square : Material_ -> Float -> Shape
square material_ sideLength =
    let
        h : Float
        h =
            sideLength / 2

        upperLeftTriangle : Shape
        upperLeftTriangle =
            triangle material_ ( Point -h -h 0, Point h h 0, Point -h h 0 )
    in
    group
        [ upperLeftTriangle
        , upperLeftTriangle |> rotateZ pi
        ]


block : Material_ -> Vector -> Shape
block material_ ( xDim, yDim, zDim ) =
    let
        ( hXDim, hYDim, hZDim ) =
            ( xDim / 2, yDim / 2, zDim / 2 )
    in
    Scene3d.blockWithShadow material_
        (Block3d.from
            (Point3d.meters -hXDim -hYDim -hZDim)
            (Point3d.meters hXDim hYDim hZDim)
        )


cube : Material_ -> Float -> Shape
cube material_ width =
    block material_ ( width, width, width )


cylinder : Material_ -> Float -> Float -> Shape
cylinder material_ radius length =
    Scene3d.cylinderWithShadow material_
        (Cylinder3d.centeredOn Point3d.origin
            Direction3d.positiveY
            { radius = Length.meters radius
            , length = Length.meters length
            }
        )


sphere : Material_ -> Float -> Shape
sphere material_ radius =
    Scene3d.sphereWithShadow (uniform material_)
        (Sphere3d.withRadius (Length.meters radius) Point3d.origin)


line : Color -> Vector -> Shape
line color vector =
    Scene3d.lineSegment (Material.color color)
        (LineSegment3d.fromPointAndVector Point3d.origin
            (Vector3d.fromTuple Length.meters vector)
        )


group : List Shape -> Shape
group =
    Scene3d.group



-- MODIFY


rotateAround : ( Point, Vector ) -> Float -> Shape -> Shape
rotateAround ( axisOrigin, ( dx, dy, dz ) ) angle =
    Scene3d.rotateAround
        (Axis3d.through (Point3d.fromMeters axisOrigin)
            (Direction3d.unsafe { x = dx, y = dy, z = dz })
        )
        (Angle.radians angle)


rotateX : Float -> Shape -> Shape
rotateX angle shape =
    Scene3d.rotateAround Axis3d.x (Angle.radians angle) shape


rotateY : Float -> Shape -> Shape
rotateY angle shape =
    Scene3d.rotateAround Axis3d.y (Angle.radians angle) shape


rotateZ : Float -> Shape -> Shape
rotateZ angle shape =
    Scene3d.rotateAround Axis3d.z (Angle.radians angle) shape


scaleAround : Point -> Float -> Shape -> Shape
scaleAround { x, y, z } factor =
    move ( -x, -y, -z ) >> scale factor >> move ( x, y, z )


scale : Float -> Shape -> Shape
scale =
    Scene3d.scaleAbout Point3d.origin


move : Vector -> Shape -> Shape
move ( x, y, z ) =
    Scene3d.translateBy (Vector3d.meters x y z)


moveX : Float -> Shape -> Shape
moveX x =
    move ( x, 0, 0 )


moveY : Float -> Shape -> Shape
moveY y =
    move ( 0, y, 0 )


moveZ : Float -> Shape -> Shape
moveZ z =
    move ( 0, 0, z )


{-| Create 3D coordinate axes with cylinders. The axes are color-coded:
  - Red for X axis
  - Green for Y axis  
  - Blue for Z axis
  
The length parameter determines how long each axis is, and the thickness parameter
controls the visual thickness of the cylinders.

    -- Standard axes with length 10 and thickness 0.2
    axes 10 0.2
-}
axes : Float -> Float -> Shape
axes length thickness =
    group
        [ thickLine (Material.matte Color.red) thickness ( Point 0 0 0, Point length 0 0 ) -- x axis
        , thickLine (Material.matte Color.green) thickness ( Point 0 0 0, Point 0 length 0 ) -- y axis
        , thickLine (Material.matte Color.blue) thickness ( Point 0 0 0, Point 0 0 length ) -- z axis
        ]


thickLine : Material_ -> Float -> ( Point, Point ) -> Shape
thickLine material_ thickness ( start, end ) =
    let
        ( x, y, z ) =
            ( end.x - start.x
            , end.y - start.y
            , end.z - start.z
            )

        { radius, azimuth, inclination } =
            Geometry3d.toSphericalCoordinates ( x, y, z )
    in
    cylinder material_ (thickness / 2) radius
        |> rotateZ (degrees 90)
        |> moveX (radius / 2)
        |> rotateY (inclination - degrees 90)
        |> rotateZ azimuth
        |> moveX start.x
        |> moveY start.y
        |> moveZ start.z
