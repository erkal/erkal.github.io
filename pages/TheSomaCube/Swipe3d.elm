module TheSomaCube.Swipe3d exposing
    ( SwipeState
    , init
    , swipedToXNegative
    , swipedToXPositive
    , swipedToYNegative
    , swipedToYPositive
    , swipedToZNegative
    , swipedToZPositive
    )

import Dict
import Play as Playground exposing (Computer)
import SceneWebGL.Camera as Camera exposing (Camera)


type SwipeState
    = Idle
    | SwipingStartedAt PixelCoordinates
    | Swiped SwipeDirection


type SwipeDirection
    = X_Positive
    | X_Negative
    | Y_Positive
    | Y_Negative
    | Z_Positive
    | Z_Negative


type alias PixelCoordinates =
    { x : Float
    , y : Float
    }


init : SwipeState
init =
    Idle



--GET


swipedToXPositive : SwipeState -> Bool
swipedToXPositive =
    (==) (Swiped X_Positive)


swipedToXNegative : SwipeState -> Bool
swipedToXNegative =
    (==) (Swiped X_Negative)


swipedToYPositive : SwipeState -> Bool
swipedToYPositive =
    (==) (Swiped Y_Positive)


swipedToYNegative : SwipeState -> Bool
swipedToYNegative =
    (==) (Swiped Y_Negative)


swipedToZPositive : SwipeState -> Bool
swipedToZPositive =
    (==) (Swiped Z_Positive)


swipedToZNegative : SwipeState -> Bool
swipedToZNegative =
    (==) (Swiped Z_Negative)
