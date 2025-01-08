module Camera exposing
    ( Camera
    , init
    , getViewPoint, getViewportAspectRatio
    , getX, getY, getZ, getXY
    , left, bottom, right, top
    , topAtZ, bottomAtZ, leftAtZ, rightAtZ
    , width, height
    , getFOVBoundingBoxAtZ
    , getZoomFactor
    , setX, setY, setZ, setXY
    , mapX, mapY, mapZ, mapXY
    , moveXY, moveX, moveY, moveZ
    , lerp, lerpX, lerpY, lerpZ
    , zoomAround
    , reverseIfYIsUp, screenCoordinatesToCanvasCoordinates, setViewPoint, zoomToFit
    )

{-| A Camera type that is used for rendering objects with correct position and size.


# Camera

@docs Camera


# Create

@docs init


# Get

@docs getViewPoint, getViewportAspectRatio, getVerticalAngleOfView
@docs getX, getY, getZ, getXY
@docs left, bottom, right, top
@docs topAtZ, bottomAtZ, leftAtZ, rightAtZ
@docs width, height
@docs getFOVBoundingBoxAtZ
@docs getZoomFactor
@docs screenCoordinatesToFOVCoordinates


# Modify

@docs setCoordinates, setX, setY, setZ, setXY
@docs mapX, mapY, mapZ, mapXY
@docs moveXY, moveX, moveY, moveZ
@docs lerp, lerpX, lerpY, lerpZ
@docs zoomAround

-}

import Geometry.BoundingBox as BoundingBox exposing (BoundingBox)


{-| TODO: This will be replaced by <https://package.elm-lang.org/packages/ianmackenzie/elm-3d-camera/latest/Camera3d> when elm-3d-scene starts to use this.
-}
type Camera
    = Camera
        { viewPoint : { x : Float, y : Float, z : Float }
        , yIsUp : Bool
        , horizontalAngleOfView : Float
        , viewportAspectRatio : Float
        }


{-|

    The only way to create a camera.
    Assume, for example you created a camera by
    ```
    init { aspectRatio = 2, fOVWidth = 10 }
    ```
    Then,
    - the aspect ratio of your viewport will be 2 and
    - the full width of the canvas is going to be considered as 10 units.



    `horizontalAngleOfView` is set to `2 * atan 0.5`
        so that if the z-coordinate of the camera is the same as screen width,
        we see the XY plane in screen pixel coordinates!

-}
init : { aspectRatio : Float, fOVWidth : Float, yIsUp : Bool } -> Camera
init { aspectRatio, fOVWidth, yIsUp } =
    Camera
        { viewPoint = { x = 0, y = 0, z = fOVWidth }
        , yIsUp = yIsUp
        , horizontalAngleOfView = 2 * Basics.atan 0.5
        , viewportAspectRatio = aspectRatio
        }



-- GET


{-|

    The argument is in canvas coordinates where

      - the canvas width is considered to be 1
      - the origin is the top left corner and
      - the positive y-axis is directed downwards

-}
screenCoordinatesToCanvasCoordinates : Camera -> { a | x : Float, y : Float } -> { x : Float, y : Float }
screenCoordinatesToCanvasCoordinates (Camera camera) { x, y } =
    let
        c =
            camera.viewPoint
    in
    { x = (x - 0.5) * c.z + c.x
    , y = ((y - 0.5) |> reverseIfYIsUp (Camera camera)) * c.z + c.y
    }


getZoomFactor : Camera -> { canvasWidth : Float } -> Float
getZoomFactor (Camera camera) { canvasWidth } =
    let
        cameraDistanceForZoomFactorEqualOne =
            (canvasWidth / 2) / tan (camera.horizontalAngleOfView / 2)
    in
    cameraDistanceForZoomFactorEqualOne / camera.viewPoint.z


getViewPoint : Camera -> { x : Float, y : Float, z : Float }
getViewPoint (Camera camera) =
    camera.viewPoint


getXY : Camera -> { x : Float, y : Float }
getXY (Camera camera) =
    { x = camera.viewPoint.x
    , y = camera.viewPoint.y
    }


getX : Camera -> Float
getX =
    getViewPoint >> .x


getY : Camera -> Float
getY =
    getViewPoint >> .y


getZ : Camera -> Float
getZ =
    getViewPoint >> .z


getHorizontalAngleOfView : Camera -> Float
getHorizontalAngleOfView (Camera camera) =
    camera.horizontalAngleOfView


getViewportAspectRatio : Camera -> Float
getViewportAspectRatio (Camera camera) =
    camera.viewportAspectRatio


reverseIfYIsUp : Camera -> Float -> Float
reverseIfYIsUp (Camera camera) v =
    if camera.yIsUp then
        -v

    else
        v


getFOVBoundingBoxAtZ : Float -> Camera -> { left : Float, right : Float, top : Float, bottom : Float }
getFOVBoundingBoxAtZ z camera =
    let
        angle : Float
        angle =
            getHorizontalAngleOfView camera

        halfWidthAtZ : Float
        halfWidthAtZ =
            (getZ camera - z) * tan (0.5 * angle)

        halfHeightAtZ : Float
        halfHeightAtZ =
            (getZ camera - z) * tan (0.5 * angle) / getViewportAspectRatio camera
    in
    { left = getX camera - halfWidthAtZ
    , right = getX camera + halfWidthAtZ
    , top = getY camera - (halfHeightAtZ |> reverseIfYIsUp camera)
    , bottom = getY camera + (halfHeightAtZ |> reverseIfYIsUp camera)
    }


topAtZ : Float -> Camera -> Float
topAtZ z camera =
    (getFOVBoundingBoxAtZ z camera).top


top : Camera -> Float
top =
    topAtZ 0


bottomAtZ : Float -> Camera -> Float
bottomAtZ z camera =
    (getFOVBoundingBoxAtZ z camera).bottom


bottom : Camera -> Float
bottom =
    bottomAtZ 0


leftAtZ : Float -> Camera -> Float
leftAtZ z camera =
    (getFOVBoundingBoxAtZ z camera).left


left : Camera -> Float
left =
    leftAtZ 0


rightAtZ : Float -> Camera -> Float
rightAtZ z camera =
    (getFOVBoundingBoxAtZ z camera).right


right : Camera -> Float
right =
    rightAtZ 0


width : Camera -> Float
width camera =
    right camera - left camera


height : Camera -> Float
height camera =
    top camera - bottom camera



-- MODIFY


mapCoordinates : ({ x : Float, y : Float, z : Float } -> { x : Float, y : Float, z : Float }) -> Camera -> Camera
mapCoordinates up (Camera camera) =
    Camera { camera | viewPoint = up camera.viewPoint }


mapXY : ({ x : Float, y : Float } -> { x : Float, y : Float }) -> Camera -> Camera
mapXY up camera =
    camera |> setXY (camera |> getXY |> up)


mapX : (Float -> Float) -> Camera -> Camera
mapX up =
    mapCoordinates (\p -> { p | x = up p.x })


mapY : (Float -> Float) -> Camera -> Camera
mapY up =
    mapCoordinates (\p -> { p | y = up p.y })


mapZ : (Float -> Float) -> Camera -> Camera
mapZ up =
    mapCoordinates (\p -> { p | z = up p.z })


moveXY : ( Float, Float ) -> Camera -> Camera
moveXY ( dx, dy ) =
    moveX dx >> moveY dy


moveX : Float -> Camera -> Camera
moveX d =
    mapX ((+) d)


moveY : Float -> Camera -> Camera
moveY d =
    mapY ((+) d)


moveZ : Float -> Camera -> Camera
moveZ d =
    mapZ ((+) d)


zoomAround :
    { target : { x : Float, y : Float, z : Float }
    , dz : Float
    , minZ : Float
    , maxZ : Float
    }
    -> Camera
    -> Camera
zoomAround { target, dz, minZ, maxZ } camera =
    let
        c : { x : Float, y : Float, z : Float }
        c =
            getViewPoint camera

        newZ : Float
        newZ =
            (c.z + dz) |> clamp minZ maxZ

        correctedDz : Float
        correctedDz =
            newZ - c.z

        ratio : Float
        ratio =
            correctedDz / (c.z - target.z)
    in
    camera
        |> moveX (ratio * (c.x - target.x))
        |> moveY (ratio * (c.y - target.y))
        |> moveZ correctedDz



--


setViewPoint : { x : Float, y : Float, z : Float } -> Camera -> Camera
setViewPoint p (Camera camera) =
    Camera { camera | viewPoint = p }


setXY : { x : Float, y : Float } -> Camera -> Camera
setXY { x, y } =
    setX x >> setY y


setX : Float -> Camera -> Camera
setX x =
    mapX (always x)


setY : Float -> Camera -> Camera
setY y =
    mapY (always y)


setZ : Float -> Camera -> Camera
setZ z =
    mapZ (always z)



--


lerp : Float -> Float -> Float -> Float
lerp rate target v =
    v + rate * (target - v)


lerpX : Float -> Float -> Camera -> Camera
lerpX rate target =
    mapX (lerp rate target)


lerpY : Float -> Float -> Camera -> Camera
lerpY rate target =
    mapY (lerp rate target)


lerpZ : Float -> Float -> Camera -> Camera
lerpZ rate target =
    mapZ (lerp rate target)


zoomToFit : BoundingBox -> Camera -> Camera
zoomToFit bb camera =
    let
        ( w, h ) =
            ( BoundingBox.width bb
            , BoundingBox.height bb
            )

        setZThatFitsTheWidth : Float -> Camera -> Camera
        setZThatFitsTheWidth w_ =
            setZ (w_ / 2 / tan (getHorizontalAngleOfView camera / 2))
    in
    camera
        |> setXY (BoundingBox.center bb)
        |> (if (w / h) > getViewportAspectRatio camera then
                -- fit the width
                setZThatFitsTheWidth w

            else
                -- fit the height
                setZThatFitsTheWidth (h * getViewportAspectRatio camera)
           )
