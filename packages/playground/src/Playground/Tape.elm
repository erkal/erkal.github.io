module Playground.Tape exposing
    ( Message(..)
    , Msg
    , Tape
    , currentAppModel
    , currentComputer
    , getCurrentFrameIndex
    , init
    , initNoTape
    , isNoTape
    , isPaused
    , isPlaying
    , isRecording
    , startRecording
    , updateConfigurations
    , updateOnAppMsg
    , updateOnTapeMsg
    , updateOnTick
    , view
    )

import Css exposing (..)
import DesignSystem.Color exposing (..)
import Html.Styled exposing (Attribute, Html, button, div, input, text)
import Html.Styled.Attributes as HA exposing (css, disabled, type_)
import Html.Styled.Events exposing (onClick)
import Icons
import Playground.Computer as Computer exposing (Computer, Inputs)
import Playground.Configurations as Configurations
import SelectList exposing (SelectList)


type Tape appModel
    = Tape State (SelectList ( Computer, appModel ))


type State
    = NoTape
    | Recording
    | Paused
    | Playing { tapeClock : Float }



--  INIT


initNoTape : Computer -> appModel -> Tape appModel
initNoTape initialComputer initialAppModel =
    Tape NoTape
        (SelectList.singleton ( initialComputer, initialAppModel ))


init : Computer -> appModel -> Tape appModel
init initialComputer initialAppModel =
    Tape Recording
        (SelectList.singleton ( initialComputer, initialAppModel ))



-- QUERY


currentComputer : Tape appModel -> Computer
currentComputer (Tape _ timeline) =
    timeline
        |> SelectList.getCurrent
        |> Tuple.first


currentAppModel : Tape appModel -> appModel
currentAppModel (Tape _ timeline) =
    timeline
        |> SelectList.getCurrent
        |> Tuple.second


isRecording : Tape appModel -> Bool
isRecording (Tape state _) =
    state == Recording


isNoTape : Tape appModel -> Bool
isNoTape (Tape state _) =
    state == NoTape


isPaused : Tape appModel -> Bool
isPaused (Tape state _) =
    state == Paused


isPlaying : Tape appModel -> Bool
isPlaying (Tape state _) =
    case state of
        Playing _ ->
            True

        _ ->
            False


getCurrentFrameIndex : Tape appModel -> Int
getCurrentFrameIndex (Tape _ timeline) =
    SelectList.getCurrentIndex timeline


getTotalSize : Tape appModel -> Int
getTotalSize (Tape _ timeline) =
    SelectList.size timeline



-- UPDATE


type Message appMsg
    = Tick
    | Message appMsg


updateConfigurations : Configurations.Msg -> Tape appModel -> Tape appModel
updateConfigurations configurationsMsg (Tape state timeLine) =
    Tape state
        (timeLine |> SelectList.mapCurrent (Tuple.mapFirst (Computer.updateConfigurations configurationsMsg)))


updateOnTick : (Computer -> Message appMsg -> appModel -> ( appModel, Cmd appMsg )) -> Inputs -> Tape appModel -> ( Tape appModel, Cmd appMsg )
updateOnTick updateApp inputs ((Tape state timeLine) as tape) =
    case state of
        Paused ->
            ( tape, Cmd.none )

        Playing { tapeClock } ->
            ( Tape (Playing { tapeClock = tapeClock + inputs.dt }) timeLine
                |> (if tapeClock + inputs.dt > (currentComputer tape).clock then
                        goToNext >> Maybe.withDefault (Tape Paused timeLine)

                    else
                        identity
                   )
            , Cmd.none
            )

        Recording ->
            let
                ( lastComputer, lastAppModel ) =
                    SelectList.getCurrent timeLine

                newComputer =
                    lastComputer |> Computer.tick inputs

                ( newAppModel, cmd ) =
                    lastAppModel |> updateApp newComputer Tick
            in
            ( Tape Recording
                (timeLine
                    |> SelectList.add ( newComputer, newAppModel )
                    |> SelectList.removeAfter
                )
            , cmd
            )

        NoTape ->
            let
                ( lastComputer, lastAppModel ) =
                    SelectList.getCurrent timeLine

                newComputer =
                    lastComputer |> Computer.tick inputs

                ( newAppModel, cmd ) =
                    lastAppModel |> updateApp newComputer Tick
            in
            ( Tape NoTape
                (timeLine
                    |> SelectList.setCurrent ( newComputer, newAppModel )
                )
            , cmd
            )


updateOnAppMsg : (Computer -> Message appMsg -> appModel -> ( appModel, Cmd appMsg )) -> appMsg -> Tape appModel -> ( Tape appModel, Cmd appMsg )
updateOnAppMsg updateApp appMsg (Tape state timeLine) =
    let
        ( computer, appModel ) =
            SelectList.getCurrent timeLine

        ( newAppModel, cmd ) =
            appModel |> updateApp computer (Message appMsg)
    in
    ( Tape state (timeLine |> SelectList.setCurrent ( computer, newAppModel ))
    , cmd
    )



-- Update on Tape Control Messages


type Msg
    = SliderMovedTo Int
    | PressedPauseButton
    | PressedRecordButton
    | PressedPlayButton


updateOnTapeMsg : Msg -> Tape appModel -> Tape appModel
updateOnTapeMsg msg tape =
    case msg of
        PressedPauseButton ->
            tape |> pause

        PressedRecordButton ->
            tape |> startRecording

        PressedPlayButton ->
            tape |> startPlaying

        SliderMovedTo tickIndex ->
            tape |> goTo tickIndex


pause : Tape appModel -> Tape appModel
pause (Tape _ timeLine) =
    Tape Paused timeLine


startRecording : Tape appModel -> Tape appModel
startRecording (Tape _ timeLine) =
    Tape Recording timeLine


startPlaying : Tape appModel -> Tape appModel
startPlaying ((Tape _ timeLine) as tape) =
    Tape (Playing { tapeClock = (currentComputer tape).clock }) timeLine


goToNext : Tape appModel -> Maybe (Tape appModel)
goToNext (Tape state timeline) =
    if SelectList.isAtEnd timeline then
        Nothing

    else
        Just
            (Tape state (SelectList.goToNext timeline))


goTo : Int -> Tape appModel -> Tape appModel
goTo tickIndex ((Tape _ timeline) as tape) =
    Tape Paused (timeline |> SelectList.goTo tickIndex)



-- VIEW


view : Tape appModel -> Html Msg
view tape =
    div
        [ css
            [ width (pct 100) -- w-full
            , height (pct 100) -- h-full
            , paddingLeft (rem 0.5) -- px-2
            , paddingRight (rem 0.5) -- px-2
            , borderTopLeftRadius (rem 0.5) -- rounded-tl-lg
            , displayFlex
            , flexDirection row
            , alignItems center
            , property "gap" "1rem" -- gap-4
            , if isNoTape tape then
                display none

              else
                batch []
            ]
        ]
        [ div
            [ css
                [ displayFlex
                , flexDirection row
                , alignItems center
                , property "gap" "0.5rem" -- gap-2
                , if isRecording tape then
                    display none

                  else
                    batch []
                ]
            ]
            [ playPauseButton tape
            , input
                [ type_ "range"
                , css
                    [ width (px 260)
                    , height (px 8)
                    , borderRadius (px 4)
                    , backgroundColor (toCssColor whiteAlpha500)
                    ]
                , HA.min (String.fromInt 0)
                , HA.max (String.fromInt (getTotalSize tape - 1))
                , HA.value (String.fromInt (getCurrentFrameIndex tape))
                , HA.step (String.fromInt 1)
                , Html.Styled.Events.onInput (String.toFloat >> Maybe.withDefault 42 >> Basics.round >> SliderMovedTo)
                ]
                []
            ]
        , tapeToggleButton tape
        ]


tapeToggleButton : Tape appModel -> Html Msg
tapeToggleButton (Tape state timeline) =
    let
        recButton : Msg -> Html Msg -> Html Msg
        recButton msg icon =
            button
                [ css
                    [ width (rem 2) -- w-8
                    , height (rem 2) -- h-8
                    , color (rgba 255 255 255 0.6) -- text-white/60
                    , hover [ color (rgba 255 255 255 0.8) ] -- hover:text-white/80
                    ]
                , onClick msg
                ]
                [ icon ]
    in
    case state of
        NoTape ->
            text ""

        Recording ->
            recButton PressedPauseButton Icons.icons.tape

        Paused ->
            recButton PressedRecordButton Icons.icons.cross

        Playing _ ->
            recButton PressedRecordButton Icons.icons.cross


playPauseButton : Tape appModel -> Html Msg
playPauseButton (Tape state timeline) =
    let
        tapeButtonWithIcon : Bool -> Html msg -> msg -> Html msg
        tapeButtonWithIcon isDisabled icon msg =
            button
                [ css
                    [ padding (rem 0.5) -- p-2
                    , backgroundColor (rgba 0 0 0 0.6) -- bg-black/60
                    , hover [ backgroundColor (rgba 0 0 0 0.8) ] -- hover:bg-black/80
                    , active [ backgroundColor (rgb 0 0 0) ] -- active:bg-black
                    , Css.disabled
                        [ opacity (num 0.3)
                        , backgroundColor (rgba 0 0 0 0.6)
                        ]
                    , borderRadius (rem 0.5) -- rounded-lg
                    ]
                , HA.disabled isDisabled
                , onClick msg
                ]
                [ div
                    [ css
                        [ width (rem 1.5) -- w-6
                        , height (rem 1.5) -- h-6
                        , color (rgba 255 255 255 0.6) -- text-white/60
                        , hover [ color (rgba 255 255 255 0.8) ] -- hover:text-white/80
                        ]
                    ]
                    [ icon ]
                ]
    in
    case state of
        NoTape ->
            text ""

        Recording ->
            text ""

        Paused ->
            tapeButtonWithIcon (SelectList.isAtEnd timeline) Icons.icons.play PressedPlayButton

        Playing _ ->
            tapeButtonWithIcon False Icons.icons.pause PressedPauseButton



-- These helper functions are no longer needed with elm-css
