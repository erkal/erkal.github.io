port module Play exposing
    ( application, simpleApplication, Configurations, Playground
    , boolConfig, colorConfig, configBlock, stringConfig, floatConfig, intConfig, optionsConfig
    , getBool, getColor, getFloat, getInt, getOption, getString
    , Computer, Keyboard, Pointer, Screen
    , measureAwareElement, measureFrame
    )

{-|


# Create

@docs application, simpleApplication, Configurations, Playground


# Declaring Configurations

@docs boolConfig, colorConfig, configBlock, stringConfig, floatConfig, intConfig, optionsConfig


# Getting Configurations

@docs getBool, getColor, getFloat, getInt, getOption, getString


# Getting Inputs

@docs Computer, Keyboard, Pointer, Screen, toX, toXY, toY


# Measure aware elements

@docs measureAwareElement, measureFrame

-}

import Browser
import Css exposing (..)
import DesignSystem.Color exposing (toCssColor, white)
import Html.Styled exposing (Attribute, Html, a, button, div, fromUnstyled, text, toUnstyled)
import Html.Styled.Attributes as HA exposing (css, href, target)
import Html.Styled.Events exposing (stopPropagationOn)
import Icons
import Json.Decode as Decode
import Playground.Computer as Computer exposing (Computer, Inputs, Wheel)
import Playground.Configurations as Configurations exposing (Block, Config(..), Configurations)
import Playground.ConfigurationsView as ConfigurationsGUI
import Playground.Tape as Tape exposing (Message, Tape, currentAppModel, currentComputer)
import Round
import SelectList



-- FLAGS


type alias Flags =
    { inputs : Inputs }



-- PORTS


port tick : (Inputs -> msg) -> Sub msg



-- API


type alias SimpleApp appModel appMsg =
    { initialConfigurations : Configurations
    , init : Computer -> appModel
    , update : Computer -> Message appMsg -> appModel -> appModel
    , view : Computer -> appModel -> Html appMsg
    , hasTape : Bool
    }


type alias App appModel appMsg =
    { initialConfigurations : Configurations
    , init : Computer -> ( appModel, Cmd appMsg )
    , update : Computer -> Message appMsg -> appModel -> ( appModel, Cmd appMsg )
    , subscriptions : appModel -> Sub appMsg
    , view : Computer -> appModel -> Html appMsg
    , hasTape : Bool
    }



-- Create


simpleApplication : SimpleApp appModel appMsg -> Program Flags (Model appModel) (Msg appMsg)
simpleApplication simpleApp =
    application
        { initialConfigurations = simpleApp.initialConfigurations
        , init = \computer -> ( simpleApp.init computer, Cmd.none )
        , update = \computer msg appModel -> ( simpleApp.update computer msg appModel, Cmd.none )
        , subscriptions = \_ -> Sub.none
        , view = simpleApp.view
        , hasTape = simpleApp.hasTape
        }


application : App appModel appMsg -> Program Flags (Model appModel) (Msg appMsg)
application app =
    Browser.element
        { init = init app
        , update = update app
        , subscriptions = subscriptions app
        , view = view app >> toUnstyled
        }



-- Declaring Configurations


configBlock =
    Configurations.configBlock


boolConfig name value =
    ( name, Configurations.BoolConfig value )


stringConfig name value =
    ( name, Configurations.StringConfig value )


intConfig name ( min, max ) value =
    ( name, Configurations.IntConfig ( min, max ) value )


floatConfig name ( min, max ) value =
    ( name, Configurations.FloatConfig ( min, max ) value )


colorConfig name value =
    ( name, Configurations.ColorConfig value )


optionsConfig name ( optionsBefore, optionSelected, optionsAfter ) =
    ( name, Configurations.OptionsConfig (SelectList.create ( optionsBefore, optionSelected, optionsAfter )) )



-- Getting Configurations


getBool =
    Computer.getBool


getColor =
    Computer.getColor


getInt =
    Computer.getInt


getFloat =
    Computer.getFloat


getString =
    Computer.getString


getOption =
    Computer.getOption



-- Measure Aware Elements


{-| must be used as canvas id.
-}
measureFrame : String
measureFrame =
    "measure-frame"


measureAwareElement : String
measureAwareElement =
    "measure-aware-element"



-- Exposed types


type alias Playground appModel appMsg =
    Program Flags (Model appModel) (Msg appMsg)


type alias Configurations =
    Configurations.Configurations


type alias Computer =
    Computer.Computer


type alias Pointer =
    Computer.Pointer


type alias Screen =
    Computer.Screen


type alias Keyboard =
    Computer.Keyboard



-- INIT


type alias Model appModel =
    { tape : Tape appModel
    , distractionFree : Bool
    , leftBarState : LeftBarState
    }


type LeftBarState
    = ShowingNothing
    | ShowingInputs
    | ShowingConfigurations


init : App appModel appMsg -> Flags -> ( Model appModel, Cmd (Msg appMsg) )
init app flags =
    let
        initialComputer : Computer
        initialComputer =
            Computer.init app.initialConfigurations flags.inputs

        ( initialAppModel, initialAppCmd ) =
            app.init initialComputer
    in
    ( { tape =
            (if app.hasTape then
                Tape.init

             else
                Tape.initNoTape
            )
                initialComputer
                initialAppModel
      , distractionFree = flags.inputs.screen.width < 500
      , leftBarState =
            if flags.inputs.screen.width < 1000 then
                ShowingNothing

            else
                ShowingConfigurations
      }
    , Cmd.map FromApp
        initialAppCmd
    )



-- UPDATE


type Msg appMsg
    = NoOp
    | ClickedDistractionFreeButton
    | ClickedOnShowInputsButton
    | ClickedOnShowConfigurationsButton
    | InputsArrived Inputs
    | FromConfigurationsEditor Configurations.Msg
    | FromApp appMsg
    | FromTapeControls Tape.Msg


update : App appModel appMsg -> Msg appMsg -> Model appModel -> ( Model appModel, Cmd (Msg appMsg) )
update app msg model =
    model
        |> handleClickOnDistractionFreeButton msg
        |> handleClickOnLeftBarButtonsButton msg
        |> handleTapeScreenControls msg
        |> handleConfigurationsMsg msg
        |> handleAppUpdate app msg


handleClickOnDistractionFreeButton : Msg appMsg -> Model appModel -> Model appModel
handleClickOnDistractionFreeButton msg model =
    case msg of
        ClickedDistractionFreeButton ->
            { model | distractionFree = not model.distractionFree }

        _ ->
            model


handleClickOnLeftBarButtonsButton : Msg appMsg -> Model appModel -> Model appModel
handleClickOnLeftBarButtonsButton msg model =
    case msg of
        ClickedOnShowInputsButton ->
            { model
                | leftBarState =
                    case model.leftBarState of
                        ShowingInputs ->
                            ShowingNothing

                        _ ->
                            ShowingInputs
            }

        ClickedOnShowConfigurationsButton ->
            { model
                | leftBarState =
                    case model.leftBarState of
                        ShowingConfigurations ->
                            ShowingNothing

                        _ ->
                            ShowingConfigurations
            }

        _ ->
            model


handleConfigurationsMsg : Msg appMsg -> Model appModel -> Model appModel
handleConfigurationsMsg msg model =
    case msg of
        FromConfigurationsEditor configurationsMsg ->
            { model | tape = model.tape |> Tape.updateConfigurations configurationsMsg }

        _ ->
            model


handleTapeScreenControls : Msg appMsg -> Model appModel -> Model appModel
handleTapeScreenControls msg model =
    case msg of
        FromTapeControls tapeMsg ->
            { model | tape = model.tape |> Tape.updateOnTapeMsg tapeMsg }

        _ ->
            model


handleAppUpdate : App appModel appMsg -> Msg appMsg -> Model appModel -> ( Model appModel, Cmd (Msg appMsg) )
handleAppUpdate app msg model =
    case msg of
        FromApp appMsg ->
            let
                ( newTape, appCmd ) =
                    model.tape |> Tape.updateOnAppMsg app.update appMsg
            in
            ( { model | tape = newTape }
            , Cmd.map FromApp appCmd
            )

        InputsArrived inputs ->
            let
                ( newTape, appCmd ) =
                    model.tape |> Tape.updateOnTick app.update inputs
            in
            ( { model | tape = newTape }
            , Cmd.map FromApp appCmd
            )

        _ ->
            ( model
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : App appModel appMsg -> Model appModel -> Sub (Msg appMsg)
subscriptions app model =
    Sub.batch
        [ tick InputsArrived
        , Sub.map FromApp (app.subscriptions (Tape.currentAppModel model.tape))
        ]



-- VIEW


view : App appModel appMsg -> Model appModel -> Html (Msg appMsg)
view app model =
    let
        computer =
            currentComputer model.tape
    in
    div
        [ css
            [ position absolute
            , backgroundColor (toCssColor white)
            , overflow hidden
            , width (px computer.screen.width)
            , height (px computer.screen.height)
            ]
        ]
        [ Html.Styled.map FromApp (app.view computer (currentAppModel model.tape))
        , viewHUD computer model
        ]


leftBarButton : Bool -> Bool -> Msg appMsg -> String -> Html (Msg appMsg) -> Html (Msg appMsg)
leftBarButton hidden isSelected msg title icon =
    button
        [ css
            [ padding (rem 0.5)
            , width (rem 3)
            , height (rem 3)
            , color (rgba 255 255 255 0.4)
            , hover [ color (rgba 255 255 255 0.8) ]
            , active [ color (rgb 255 255 255) ]
            , if isSelected then
                backgroundColor (rgba 255 255 255 0.1)

              else
                batch []

            -- bg-white/10 if selected
            , if hidden then
                display none

              else
                batch []
            ]
        , Html.Styled.Events.onClick msg
        , HA.title title
        ]
        [ icon ]


iconLink : String -> String -> Html msg -> Html msg
iconLink title linkAddress icon =
    a
        [ css
            [ padding (rem 0.5) -- p-2
            , width (rem 3) -- w-12
            , height (rem 3) -- h-12
            , color (rgba 255 255 255 0.4) -- text-white/40
            , hover [ color (rgba 255 255 255 0.8) ] -- hover:text-white/80
            ]
        , href linkAddress
        , HA.title title
        ]
        [ icon ]


homeButton : Html msg
homeButton =
    iconLink "Home" "../index.html" Icons.icons.home


twitterLink : Html msg
twitterLink =
    iconLink "Twitter" "https://twitter.com/AzizErkalSelman" Icons.icons.twitter


githubLink : Html msg
githubLink =
    iconLink "GitHub" "https://github.com/erkal" Icons.icons.githubCat


stopPropagationOfInputs : List (Html.Styled.Attribute (Msg appMsg))
stopPropagationOfInputs =
    [ stopPropagationOn "mousedown" (Decode.succeed ( NoOp, True ))
    , stopPropagationOn "pointerdown" (Decode.succeed ( NoOp, True ))
    , stopPropagationOn "wheel" (Decode.succeed ( NoOp, True ))
    , stopPropagationOn "keydown"
        (Decode.andThen
            (\key ->
                if List.member key [ "Meta", "Control", "Shift", "Alt", " " ] then
                    Decode.fail "allow these keys"

                else
                    Decode.succeed ( NoOp, True )
            )
            (Decode.field "key" Decode.string)
        )
    ]


viewHUD : Computer -> Model appModel -> Html (Msg appMsg)
viewHUD computer model =
    let
        yinYangButton : Html (Msg appMsg)
        yinYangButton =
            leftBarButton False False ClickedDistractionFreeButton "Distraction Free Mode" Icons.icons.yinYang

        configurationsButton : Html (Msg appMsg)
        configurationsButton =
            leftBarButton (List.isEmpty (Tape.currentComputer model.tape).configurations) (model.leftBarState == ShowingConfigurations) ClickedOnShowConfigurationsButton "Configurations" Icons.icons.gear

        inputsButton : Html (Msg appMsg)
        inputsButton =
            leftBarButton False (model.leftBarState == ShowingInputs) ClickedOnShowInputsButton "Inputs" Icons.icons.computer

        leftStripe : Html (Msg appMsg)
        leftStripe =
            div
                [ css
                    [ width (rem 3) -- w-12
                    , height (pct 100) -- h-full
                    , backgroundColor (rgba 0 0 0 0.8) -- bg-black/80
                    , displayFlex
                    , flexDirection column
                    , justifyContent spaceBetween
                    ]
                ]
                [ div [ css [ displayFlex, flexDirection column ] ]
                    [ yinYangButton
                    , configurationsButton
                    , div
                        [ css
                            [ if Tape.isNoTape model.tape then
                                display none

                              else
                                batch []
                            ]
                        ]
                        [ inputsButton ]
                    ]
                , div [ css [ displayFlex, flexDirection column ] ]
                    [ twitterLink
                    , githubLink
                    , homeButton
                    ]
                ]

        viewConfigurations : Html (Msg appMsg)
        viewConfigurations =
            div
                [ css
                    [ overflowY auto -- overflow-y-auto
                    , left (rem 3) -- left-12
                    , backgroundColor (rgba 0 0 0 0.4) -- bg-black/40
                    , width (px 260)
                    , height (px computer.screen.height)
                    , if model.leftBarState /= ShowingConfigurations then
                        display none

                      else
                        batch []
                    ]
                ]
                [ Html.Styled.map FromConfigurationsEditor (ConfigurationsGUI.viewConfigurations (currentComputer model.tape).configurations)
                ]

        viewInputs : Html (Msg appMsg)
        viewInputs =
            div
                [ css
                    [ overflowY auto -- overflow-y-auto
                    , left (rem 3) -- left-12
                    , backgroundColor (rgba 0 0 0 0.4) -- bg-black/40
                    , width (px 260)
                    , height (px (Tape.currentComputer model.tape).screen.height)
                    , if model.leftBarState /= ShowingInputs then
                        display none

                      else
                        batch []
                    ]
                ]
                [ viewComputer model
                ]

        viewTape : Html (Msg appMsg)
        viewTape =
            div
                [ css
                    [ position absolute
                    , bottom zero
                    , right zero
                    , maxWidth fitContent
                    , height (rem 3) -- h-12
                    , backgroundColor (rgb 0 0 0) -- bg-black
                    , borderTopLeftRadius (rem 0.5) -- rounded-tl-lg
                    ]
                ]
                [ Html.Styled.map FromTapeControls (Tape.view model.tape) ]
    in
    if model.distractionFree then
        div stopPropagationOfInputs
            [ div
                [ css
                    [ position absolute
                    , top zero
                    , left zero
                    , width (rem 3) -- w-12
                    , height (rem 3) -- h-12
                    ]
                ]
                [ yinYangButton ]
            ]

    else
        div stopPropagationOfInputs
            [ div
                [ css
                    [ position absolute
                    , left zero
                    , top zero
                    , height (pct 100) -- h-full
                    , displayFlex
                    , flexDirection row
                    ]
                ]
                [ leftStripe
                , viewConfigurations
                , viewInputs
                ]
            , div
                [ css
                    [ position absolute
                    , left zero
                    , top zero
                    , if Tape.isRecording model.tape || Tape.isNoTape model.tape then
                        display none

                      else
                        batch []
                    ]
                ]
                [ viewPointer computer model
                ]
            , viewTape
            ]


viewPointer : Computer -> Model appModel -> Html msg
viewPointer computer model =
    div
        [ css
            [ position absolute
            , width (rem 2) -- w-8
            , height (rem 2) -- h-8
            , left (px (computer.pointer.x + 0.5 * computer.screen.width))
            , top (px (-computer.pointer.y + 0.5 * computer.screen.height))
            ]
        ]
        [ div
            [ css
                [ color <|
                    if computer.pointer.isDown then
                        rgba 0 0 0 0.8
                        -- text-black/80

                    else
                        rgba 0 0 0 0.4

                -- text-black/40
                ]
            ]
            [ Icons.icons.pointer ]
        ]


viewComputer : Model appModel -> Html (Msg appMsg)
viewComputer model =
    let
        computer : Computer
        computer =
            currentComputer model.tape

        boolAsText : Bool -> String
        boolAsText bool =
            if bool then
                "True"

            else
                "False"
    in
    div
        [ css
            [ padding (rem 1.5)
            , fontSize (rem 0.875)
            , color (rgba 255 255 255 0.8)
            , displayFlex
            , flexDirection column
            , property "gap" "2rem"
            ]
        ]
        [ div
            [ css
                [ displayFlex
                , flexDirection column
                , property "gap" "0.5rem"
                ]
            ]
            [ div
                [ css
                    [ fontSize (rem 1.5)
                    , fontWeight bold
                    ]
                ]
                [ text "Tape" ]
            , div [] [ text ("frame: " ++ (model.tape |> Tape.getCurrentFrameIndex |> String.fromInt)) ]
            ]
        , div
            [ css
                [ displayFlex
                , flexDirection column
                , property "gap" "0.5rem"
                ]
            ]
            [ div
                [ css
                    [ fontSize (rem 1.5)
                    , fontWeight bold
                    ]
                ]
                [ text "Inputs" ]
            , div [] [ text ("pressedKeys: " ++ (computer.keyboard.pressedKeys |> List.intersperse " " |> String.concat)) ]
            , div [] [ text ("keyboard.shift: " ++ (computer.keyboard.shift |> boolAsText)) ]
            , div [] [ text ("keyboard.control: " ++ (computer.keyboard.control |> boolAsText)) ]
            , div [] [ text ("downs: " ++ (computer.keyboard.downs |> List.intersperse " " |> String.concat)) ]
            , div [] [ text ("delta time: " ++ Round.round 4 computer.dt) ]
            , div [] [ text ("clock: " ++ Round.round 4 computer.clock) ]
            , div []
                [ text
                    ("pointer is down: "
                        ++ (if computer.pointer.isDown then
                                "yes"

                            else
                                "no"
                           )
                    )
                ]
            , div [] [ text ("pointer.x: " ++ Round.round 2 computer.pointer.x) ]
            , div [] [ text ("pointer.y: " ++ Round.round 2 computer.pointer.y) ]
            , div [] [ text ("wheel.deltaX: " ++ String.fromFloat computer.wheel.deltaX) ]
            , div [] [ text ("wheel.deltaY: " ++ String.fromFloat computer.wheel.deltaY) ]
            , div [] [ text ("wheel.pinchDeltaForChrome: " ++ String.fromFloat computer.wheel.pinchDeltaForChrome) ]
            , div [] [ text ("pinchScaleForSafari: " ++ maybeFloatToString computer.wheel.pinchScaleForSafari) ]
            ]
        ]


maybeFloatToString : Maybe Float -> String
maybeFloatToString maybeFloat =
    case maybeFloat of
        Nothing ->
            "Nothing"

        Just f ->
            String.fromFloat f
