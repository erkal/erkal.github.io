module UndoRedo.Main exposing (main)

import Html exposing (Html, a, div, input, label, text, textarea)
import Html.Attributes as HA exposing (class, href, target, value)
import Html.Events exposing (onClick, onMouseDown, preventDefaultOn)
import Json.Decode as Decode
import Markdown
import Playground.Icons as Icons
import Playground.Playground as Playground exposing (..)
import Playground.Tape exposing (Message(..))
import Tools.HtmlHelpers.HtmlHelpers exposing (classIf)
import Tools.StyledElements.StyledElements exposing (iconButton, markdownBlock, textInput, withHomePageHeader)
import UndoRedo.UndoList as UndoList exposing (UndoList)


main : Playground Model Msg
main =
    Playground.simpleApplication
        { initialConfigurations = []
        , init = init
        , update = update
        , view = view
        , hasTape = False
        }


type alias Model =
    { undoListUsual : UndoList String
    , undoListSafe : UndoList String
    , undoListSafeConcise : UndoList String
    , lastSelectedInteractive : InteractiveID
    }


init : Computer -> Model
init computer =
    { undoListUsual = undoListExample
    , undoListSafe = undoListExample
    , undoListSafeConcise = undoListExample
    , lastSelectedInteractive = UndoRedoUsual
    }


mapUndoList : (UndoList String -> UndoList String) -> InteractiveID -> Model -> Model
mapUndoList f interactiveID model =
    case interactiveID of
        UndoRedoUsual ->
            { model | undoListUsual = f model.undoListUsual }

        UndoRedoSafe ->
            { model | undoListSafe = f model.undoListSafe }

        UndoRedoSafeConcise ->
            { model | undoListSafeConcise = f model.undoListSafeConcise }


undoListExample : UndoList String
undoListExample =
    UndoList [ "ABC", "AB", "A" ] "ABCD" [ "ABCDE", "ABCDEF" ]



-- UPDATE


type InteractiveID
    = UndoRedoUsual
    | UndoRedoSafe
    | UndoRedoSafeConcise


type Msg
    = NoOp
    | SelectedInteractive InteractiveID
    | PressedUndoButton InteractiveID
    | PressedRedoButton InteractiveID
    | PressedResetInteractiveButton InteractiveID
    | EditedTextArea InteractiveID String


update : Computer -> Message Msg -> Model -> Model
update computer message model =
    case message of
        Tick ->
            model
                |> handleKeyboardShortcutsForUndoRedo computer

        Message msg ->
            model
                |> handleSelectingInteractive msg
                |> handleEditingTextArea msg
                |> handleUndoRedoButtons msg
                |> handleResetButton msg


handleKeyboardShortcutsForUndoRedo : Computer -> Model -> Model
handleKeyboardShortcutsForUndoRedo computer model =
    if pressedKeyboardShortcutForUndo computer then
        model |> mapUndoList UndoList.undo model.lastSelectedInteractive

    else if pressedKeyboardShortcutForRedo computer then
        model |> mapUndoList UndoList.redo model.lastSelectedInteractive

    else
        model


handleSelectingInteractive : Msg -> Model -> Model
handleSelectingInteractive msg model =
    case msg of
        SelectedInteractive interactiveID ->
            { model | lastSelectedInteractive = interactiveID }

        _ ->
            model


handleEditingTextArea : Msg -> Model -> Model
handleEditingTextArea msg model =
    case msg of
        EditedTextArea interactiveID str ->
            case interactiveID of
                UndoRedoUsual ->
                    { model | undoListUsual = model.undoListUsual |> UndoList.new str }

                UndoRedoSafe ->
                    { model | undoListSafe = model.undoListSafe |> UndoList.newSafe str }

                UndoRedoSafeConcise ->
                    { model | undoListSafeConcise = model.undoListSafeConcise |> UndoList.newSafeConcise str }

        _ ->
            model


handleUndoRedoButtons : Msg -> Model -> Model
handleUndoRedoButtons msg model =
    case msg of
        PressedUndoButton interactiveID ->
            model |> mapUndoList UndoList.undo interactiveID

        PressedRedoButton interactiveID ->
            model |> mapUndoList UndoList.redo interactiveID

        _ ->
            model


handleResetButton : Msg -> Model -> Model
handleResetButton msg model =
    case msg of
        PressedResetInteractiveButton interactiveID ->
            model |> mapUndoList (always undoListExample) interactiveID

        _ ->
            model


pressedKeyboardShortcutForUndo : Computer -> Bool
pressedKeyboardShortcutForUndo computer =
    List.all identity
        [ computer.keyboard.control
        , not computer.keyboard.shift
        , List.member "KeyZ" computer.keyboard.downs
        ]


pressedKeyboardShortcutForRedo : Computer -> Bool
pressedKeyboardShortcutForRedo computer =
    List.all identity
        [ computer.keyboard.control
        , computer.keyboard.shift
        , List.member "KeyZ" computer.keyboard.downs
        ]



-- VIEW


preventBrowsersDefaultUndoRedoKeyboardShortcuts : Html.Attribute Msg
preventBrowsersDefaultUndoRedoKeyboardShortcuts =
    preventDefaultOn "keydown"
        (Decode.map3
            (\ctrl meta key -> { ctrl = ctrl, meta = meta, key = key })
            (Decode.field "ctrlKey" Decode.bool)
            (Decode.field "metaKey" Decode.bool)
            (Decode.field "code" Decode.string)
            |> Decode.map (\{ ctrl, meta, key } -> ( NoOp, (ctrl || meta) && (key == "KeyZ") ))
        )


view : Computer -> Model -> Html Msg
view computer model =
    withHomePageHeader <|
        div
            [ class "px-4 sm:px-16 mb-32"
            , preventBrowsersDefaultUndoRedoKeyboardShortcuts
            ]
            [ markdownBlock """
# Resolving the "Great Undo-Redo Quandary" in Elm

[Source code of this page](https://github.com/erkal/erkal.github.io/tree/main/pages/UndoRedo)

This post unfolds in two parts: The initial segment showcases the ease of crafting undo/redo functionality using Elm. If you have **already implemented undo/redo in Elm**, feel free to leap forward to the second part. Here, we confront a prevalent issue linked with undo/redo and offer a straightforward and efficient solution.
## Part 1: Implementing Basic Undo/Redo Functionality in Elm

**Implementing undo and redo operations in Elm is surprisingly straightforward**, thanks to the Elm architecture. You can easily add undo/redo functionality to any existing Elm application, even if you hadn't initially planned for it. And the straightforward way of doing it proves to be time and space efficient because Elm uses [persistent data structures](https://en.wikipedia.org/wiki/Persistent_data_structure).

**Elm stands head and shoulders above the rest** when it comes to implementing undo/redo functionality. The language almost hands you this functionality as an out-of-the-box gift.

So, how exactly is this achieved? The answer lies in the use of a simple data structure found within the [elm-community/undo-redo](https://package.elm-lang.org/packages/elm-community/undo-redo/latest/) package. Here's a closer look at how it works.

```elm
type alias UndoList state =
    { past : List state
    , present : state
    , future : List state
    }
```

As an example, let's consider the following `UndoList String`:
```elm
{ past = [ "ABC", "AB", "A" ]
, present = "ABCD"
, future = [ "ABCDE", "ABCDEF" ]
}
```
Note that the list for the `past` is reversed for efficiency purposes. This represents a scenario where the user has typed "ABCDEF" and performed 'undo' twice.

As you click the undo and redo buttons below and edit text in the input area, you will notice that the `UndoList` data structure is rendered as rows; starting with past states, followed by the present state (highlighted by a thick border), and ending with future states.
"""
            , viewUndoListInteractive computer model UndoRedoUsual
            , markdownBlock """
Editing within the input area creates a new undo item via the following function:

```elm
new : state -> UndoList state -> UndoList state
new state { past, present } =
    { past = present :: past
    , present = state
    , future = []
    }
```

Note that when entering a new state into `UndoList`, any existing future states are removed, similar to most applications with undo/redo functionality. This brings us to the second part of this post.

## Part 2: Confronting the Undo/Redo Quandary

In our digital lives, **we frequently encounter a general problem when using undo/redo features in various applications**. This issue arises, for example, when we need to retrieve something that has been previously deleted.

Consider the following scenario: We've deleted some text or an image but soon after realize it's still needed. Now, what do we typically do? **We often resort to performing multiple 'undo' actions until we retrieve the necessary information.** But this method can be nerve-wracking.

Why so? Here's the catch - Any accidental edits during this process could potentially wipe out our 'redo' options. This means if we're not careful, **we stand at risk of losing all redo's**, and this adds an unnecessary layer of stress.

So, the question arises: How do we address this issue? Is there a better way to handle it?

Initially, I believed that *undo trees* were the only viable solution. However, after reading [Resolving the Great Undo-Redo Quandary](https://github.com/zaboople/klonk/blob/404dc90559840684ad16c9ba22f9464622e675d3/TheGURQ.md), I became convinced otherwise. The simpler alternative presented in this resource effectively demonstrates its ease of use and efficiency.

The concept behind this alternative is astonishingly straightforward. If you make edits following a series of 'undo' actions, the `future` - that is, your 'redo' options - are effectively added to your `past`. Additionally, your 'undo' actions become part of your history.

This ensures that **no action is ever truly lost**; everything becomes part of a recoverable history. This allows for more flexibility and less stress.

Below is an interactive demonstration showing how it works.
"""
            , viewUndoListInteractive computer model UndoRedoSafe
            , markdownBlock """
Remarkably, this method is quite simple to implement in Elm. It only requires a minor adjustment to the standard undo/redo implementation. The sole modification we made was **substituting the `new` function with the following `newSafe` function**.

```elm
newSafe : state -> UndoList state -> UndoList state
newSafe state { past, present, future } =
    case List.reverse future of
        [] ->
            { past = present :: past
            , present = state
            , future = []
            }

        head :: tail ->
            { past = present :: List.reverse tail ++ head :: tail ++ present :: past
            , present = state
            , future = []
            }
```

### Making It More Concise

Note that each time we edit following an 'undo' action, the `UndoList` expands by the length of the `future`. This might not be ideal because it could lead to *exponential growth*, as [discussed here](https://github.com/zaboople/klonk/blob/404dc90559840684ad16c9ba22f9464622e675d3/TheGURQ.md#memory-space-usage).

To prevent this from happening, you can **collapse consecutive undos** into a single step:
"""
            , viewUndoListInteractive computer model UndoRedoSafeConcise
            , markdownBlock """
Here is the function that accomplishes this:
```elm
newSafeConcise : state -> UndoList state -> UndoList state
newSafeConcise state { past, present, future } =
    case future of
        [] ->
            { past = present :: past
            , present = state
            , future = []
            }

        _ ->
            { past = present :: List.reverse future ++ present :: past
            , present = state
            , future = []
            }
```

In conclusion, integrating undo/redo functionality into your Elm applications is surprisingly simple. But that's not all - if you already have undo/redo implemented, enhancing it to be safe is as straightforward as adding a few lines of code.
"""
            ]


header : InteractiveID -> String
header interactiveID =
    case interactiveID of
        UndoRedoUsual ->
            "### The **usual** undo/redo"

        UndoRedoSafe ->
            "### The **safe** undo/redo"

        UndoRedoSafeConcise ->
            "### The **concise** safe undo/redo"


bgColorForInteractive : InteractiveID -> String
bgColorForInteractive interactiveID =
    case interactiveID of
        UndoRedoUsual ->
            "bg-pink-400/40"

        UndoRedoSafe ->
            "bg-green-400/40"

        UndoRedoSafeConcise ->
            "bg-blue-400/40"


viewUndoListInteractive : Computer -> Model -> InteractiveID -> Html Msg
viewUndoListInteractive computer model interactiveID =
    div
        [ class "relative mx-auto w-full max-w-[640px] my-8 rounded-lg"
        , class "p-4 sm:p-8"
        , class "flex flex-col gap-8"
        , class (bgColorForInteractive interactiveID)
        , class "shadow-2xl"
        , onMouseDown (SelectedInteractive interactiveID)
        , classIf (model.lastSelectedInteractive == interactiveID) "ring-2 ring-black/60"
        ]
        [ div
            [ class "w-full"
            , class "flex flex-row items-center"
            ]
            [ div [ class "grow" ] [ markdownBlock (header interactiveID) ]
            , div [ class "flex-none" ] [ iconButton (PressedResetInteractiveButton interactiveID) "Reset" Icons.icons.reset ]
            ]
        , div [ class "flex flex-col gap-4 sm:flex-row sm:gap-16" ]
            [ div [ class "flex flex-col gap-4" ]
                [ viewButtons computer model interactiveID
                , viewInputArea computer model interactiveID
                ]
            , viewUndoList computer model interactiveID
            ]
        ]


viewButtons : Computer -> Model -> InteractiveID -> Html Msg
viewButtons computer model interactiveID =
    div [ class "flex flex-col gap-2" ]
        [ markdownBlock "Press the undo/redo buttons:"
        , div [ class "p-2 flex-none flex flex-row gap-2" ]
            [ iconButton (PressedUndoButton interactiveID) "Undo" Icons.icons.undo
            , iconButton (PressedRedoButton interactiveID) "Redo" Icons.icons.redo
            ]
        ]


viewInputArea : Computer -> Model -> InteractiveID -> Html Msg
viewInputArea computer model interactiveID =
    textInput (EditedTextArea interactiveID)
        "And edit your `state`:"
        (case interactiveID of
            UndoRedoUsual ->
                model.undoListUsual.present

            UndoRedoSafe ->
                model.undoListSafe.present

            UndoRedoSafeConcise ->
                model.undoListSafeConcise.present
        )


viewUndoList : Computer -> Model -> InteractiveID -> Html Msg
viewUndoList computer model interactiveID =
    let
        undoList =
            case interactiveID of
                UndoRedoUsual ->
                    model.undoListUsual

                UndoRedoSafe ->
                    model.undoListSafe

                UndoRedoSafeConcise ->
                    model.undoListSafeConcise
    in
    div [ class "flex-1 flex flex-col" ]
        [ div [ class "mb-2" ] [ markdownBlock "Current `undoList`:" ]
        , div [ class "flex flex-col" ] (undoList.past |> List.reverse |> List.map viewUndoItem)
        , div [ class "flex flex-col ring-8 ring-black z-10" ] [ undoList.present |> viewUndoItem ]
        , div [ class "flex flex-col" ] (undoList.future |> List.map viewUndoItem)
        ]


viewUndoItem : String -> Html Msg
viewUndoItem str =
    div
        [ class "h-8 px-2 py-1 my-px"
        , class "text-gray-900 bg-white/60 whitespace-pre"
        , class "font-mono font-bold"
        ]
        [ text str ]
