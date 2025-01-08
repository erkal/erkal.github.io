module Playground.Computer exposing (..)

import Color exposing (Color)
import Geometry.BoundingBox exposing (BoundingBox)
import Playground.Configurations as Configurations exposing (Configurations)
import Playground.Senso as Senso exposing (Senso, SensoState)


type alias Inputs =
    { operatingSystem : String
    , dt : Float
    , clock : Float
    , keyboard : Keyboard
    , pointer : Pointer
    , wheel : Wheel
    , screen : Screen
    , devicePixelRatio : Float
    , boundingClientRects : List { id : String, boundingClientRect : BoundingBox }
    , sensoState : SensoState
    }



--


type alias Computer =
    { operatingSystem : OperatingSystem
    , dt : Float
    , clock : Float
    , keyboard : Keyboard
    , pointer : Pointer
    , wheel : Wheel
    , screen : Screen
    , devicePixelRatio : Float
    , senso : Senso
    , boundingClientRects : List { id : String, boundingClientRect : BoundingBox }

    --
    , configurations : Configurations
    }


type OperatingSystem
    = Windows
    | Mac
    | Linux
    | Android
    | Ios
    | UnknownOperatingSystem


type alias Keyboard =
    { -- states
      pressedKeys : List String
    , control : Bool
    , alt : Bool
    , shift : Bool
    , left : Bool
    , right : Bool
    , up : Bool
    , down : Bool
    , -- actions
      downs : List String
    }


type alias Pointer =
    { -- states
      x : Float
    , y : Float
    , isDown : Bool
    , -- actions
      down : Bool
    , elementIdsForLastDown :
        -- The list of the ids of the ancestors starting with self id
        -- This is useful for detecting if pointer down happened outside of an element
        -- Use this in combination with `down` or `isDown` because this doesn't get cleaned up
        List String
    , move : Bool
    , up : Bool
    , rightDown : Bool
    , rightUp : Bool
    }


type alias Wheel =
    { deltaX : Float
    , deltaY : Float
    , pinchDeltaForChrome : Float
    , pinchScaleForSafari : Maybe Float
    }


type alias Screen =
    { width : Float
    , height : Float
    }


operatingSystemFromString : String -> OperatingSystem
operatingSystemFromString str =
    case str of
        "windows" ->
            Windows

        "mac" ->
            Mac

        "linux" ->
            Linux

        "android" ->
            Android

        "ios" ->
            Ios

        _ ->
            UnknownOperatingSystem


init : Configurations -> Inputs -> Computer
init initialConfigurations inputs =
    { operatingSystem = operatingSystemFromString inputs.operatingSystem
    , dt = inputs.dt
    , clock = inputs.clock
    , keyboard = inputs.keyboard
    , pointer = inputs.pointer
    , wheel = inputs.wheel
    , senso = Senso.init
    , screen = inputs.screen
    , devicePixelRatio = inputs.devicePixelRatio
    , boundingClientRects = []
    , configurations = initialConfigurations
    }


tick : Inputs -> Computer -> Computer
tick inputs computer =
    { computer
        | dt = inputs.dt
        , clock =
            -- Note that we don't use the clock from the inputs! This is important for the `Tape` work correctly.
            computer.clock + inputs.dt
        , keyboard = inputs.keyboard
        , pointer = inputs.pointer
        , wheel = inputs.wheel
        , senso = computer.senso |> Senso.update inputs.sensoState
        , screen = inputs.screen
        , boundingClientRects = inputs.boundingClientRects
        , devicePixelRatio = inputs.devicePixelRatio
    }


updateConfigurations : Configurations.Msg -> Computer -> Computer
updateConfigurations configurationsMsg computer =
    { computer | configurations = computer.configurations |> Configurations.update configurationsMsg }



-- CONFIGURATIONS


getBool : String -> Computer -> Bool
getBool name computer =
    computer.configurations |> Configurations.getBool name


getInt : String -> Computer -> Int
getInt name computer =
    computer.configurations |> Configurations.getInt name


getFloat : String -> Computer -> Float
getFloat name computer =
    computer.configurations |> Configurations.getFloat name


getString : String -> Computer -> String
getString name computer =
    computer.configurations |> Configurations.getString name


getColor : String -> Computer -> Color
getColor name computer =
    computer.configurations |> Configurations.getColor name


getOption : String -> Computer -> String
getOption name computer =
    computer.configurations |> Configurations.getOption name
