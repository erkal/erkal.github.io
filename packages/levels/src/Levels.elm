module Levels exposing
    ( Levels
    , Msg
    , current
    , importJSON
    , init
    , mapCurrent
    , update
    , view
    )

import Html exposing (Html, button, div, input, pre, text, textarea)
import Html.Attributes exposing (autocomplete, class, cols, placeholder, rows, style, title, value)
import Html.Events exposing (onClick, onInput, onMouseDown)
import Icons
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import SelectList exposing (SelectList)


type Levels level
    = Levels
        { selectList : SelectList (Item level)

        --
        , encodeLevel : level -> Value
        , levelDecoder : Decoder level
        , textAreaContentForExportingJson : String
        , textAreaContentForImportingJson : String
        }


type alias Item level =
    { name : String
    , level : level
    }


init : (level -> Value) -> Decoder level -> Item level -> List (Item level) -> Levels level
init encodeLevel levelDecoder first rest =
    Levels
        { selectList = SelectList.init ( first, rest )

        --
        , encodeLevel = encodeLevel
        , levelDecoder = levelDecoder
        , textAreaContentForExportingJson = ""
        , textAreaContentForImportingJson = ""
        }


current : Levels level -> level
current (Levels p) =
    p.selectList |> SelectList.getCurrent |> .level



--


type Msg
    = PressedAddLevelButton
    | PressedRemoveLevelButton
    | PressedMoveLevelDownButton
    | PressedMoveLevelUpButton
    | ChangedCurrentLevelsNameTo String
    | MouseDownOnLevelItem Int
      --
    | ClickedExportLevelsButton
    | ClickedImportLevelsButton
    | EditedTextAreaForImportingLevels String


update : Msg -> Levels level -> Levels level
update msg selectListComponent =
    selectListComponent
        |> addNewLevel msg
        |> removeCurrentLevel msg
        |> moveLevelOneDown msg
        |> moveLevelOneUp msg
        |> selectLevel msg
        |> changeLevelName msg
        |> handleImportExport msg


mapSelectList : (SelectList (Item level) -> SelectList (Item level)) -> Levels level -> Levels level
mapSelectList up (Levels p) =
    Levels { p | selectList = up p.selectList }


mapCurrent : (level -> level) -> Levels level -> Levels level
mapCurrent up =
    mapSelectList
        (SelectList.mapCurrent (\item -> { item | level = up item.level }))


changeLevelName : Msg -> Levels level -> Levels level
changeLevelName msg (Levels p) =
    case msg of
        ChangedCurrentLevelsNameTo newName ->
            Levels p
                |> mapSelectList
                    (SelectList.mapCurrent (\item -> { item | name = newName }))

        _ ->
            Levels p


handleImportExport : Msg -> Levels level -> Levels level
handleImportExport msg (Levels p) =
    case msg of
        ClickedExportLevelsButton ->
            Levels
                { p
                    | textAreaContentForExportingJson =
                        JE.encode 2
                            (p.selectList
                                |> SelectList.toList
                                |> JE.list
                                    (\item ->
                                        JE.object
                                            [ ( "name", JE.string item.name )
                                            , ( "level", p.encodeLevel item.level )
                                            ]
                                    )
                            )
                }

        ClickedImportLevelsButton ->
            Levels p
                |> importJSON p.textAreaContentForImportingJson

        EditedTextAreaForImportingLevels string ->
            Levels { p | textAreaContentForImportingJson = string }

        _ ->
            Levels p


importJSON : String -> Levels level -> Levels level
importJSON json (Levels p) =
    Levels
        { p
            | selectList =
                let
                    itemDecoder : Decoder (Item level)
                    itemDecoder =
                        JD.map2
                            Item
                            (JD.field "name" JD.string)
                            (JD.field "level" p.levelDecoder)
                in
                json
                    |> JD.decodeString
                        (JD.list itemDecoder
                            |> JD.andThen
                                (\l ->
                                    case l of
                                        [] ->
                                            JD.fail "List of levels is empty"

                                        first :: rest ->
                                            JD.succeed (SelectList.init ( first, rest ))
                                )
                        )
                    |> Result.withDefault p.selectList
        }


selectLevel : Msg -> Levels level -> Levels level
selectLevel msg (Levels p) =
    case msg of
        MouseDownOnLevelItem index ->
            Levels p
                |> mapSelectList (SelectList.goTo index)

        _ ->
            Levels p


removeCurrentLevel : Msg -> Levels level -> Levels level
removeCurrentLevel msg (Levels p) =
    case msg of
        PressedRemoveLevelButton ->
            Levels p
                |> mapSelectList SelectList.removeCurrent

        _ ->
            Levels p


moveLevelOneDown : Msg -> Levels level -> Levels level
moveLevelOneDown msg (Levels p) =
    case msg of
        PressedMoveLevelDownButton ->
            Levels p
                |> mapSelectList SelectList.moveElementDown

        _ ->
            Levels p


moveLevelOneUp : Msg -> Levels level -> Levels level
moveLevelOneUp msg (Levels p) =
    case msg of
        PressedMoveLevelUpButton ->
            Levels p
                |> mapSelectList SelectList.moveElementUp

        _ ->
            Levels p


addNewLevel : Msg -> Levels level -> Levels level
addNewLevel msg (Levels p) =
    case msg of
        PressedAddLevelButton ->
            let
                currentLevel =
                    SelectList.getCurrent p.selectList
            in
            Levels p
                |> mapSelectList (SelectList.add { currentLevel | name = currentLevel.name ++ " copy" })

        _ ->
            Levels p



-- VIEW


view : Levels level -> Html Msg
view (Levels p) =
    let
        addNewLevelButton =
            button
                [ class "inline-block ml-1 w-4 text-white/40 hover:text-white/80"
                , onClick PressedAddLevelButton
                , title "Duplicate Level"
                ]
                [ Icons.icons.plus ]

        deleteCurrentLevelButton =
            div
                [ class "inline-block ml-1 w-4 text-white/40 hover:text-red-400"
                , onClick PressedRemoveLevelButton
                , title "Delete Level"
                ]
                [ Icons.icons.trash ]

        moveLevelDownButton =
            div
                [ class "inline-block ml-1 w-4 text-white/40 hover:text-white/80"
                , onClick PressedMoveLevelDownButton
                , title "Move Level Down"
                ]
                [ Icons.icons.moveDown ]

        moveLevelUpButton =
            div
                [ class "inline-block ml-1 w-4 text-white/40 hover:text-white/80"
                , onClick PressedMoveLevelUpButton
                , title "Move Level Up"
                ]
                [ Icons.icons.moveUp ]

        levelItem index levelName =
            button
                [ class "w-full h-8 p-2 text-left text-white/80 border-b border-white/20"
                , class
                    (if index == SelectList.getCurrentIndex p.selectList then
                        "bg-black/40 hover:bg-black/60 active:bg-black/80"

                     else
                        "hover:bg-black/20"
                    )
                , style "transition" "background-color 0.3s ease"
                , onMouseDown (MouseDownOnLevelItem index)
                ]
                [ if index == SelectList.getCurrentIndex p.selectList then
                    div []
                        [ input
                            [ class "w-[100px] bg-transparent"
                            , placeholder "Enter Level Name"
                            , value (p.selectList |> SelectList.getCurrent |> .name)
                            , onInput ChangedCurrentLevelsNameTo
                            , autocomplete False
                            ]
                            []
                        , div [ class "float-right" ]
                            [ addNewLevelButton
                            , moveLevelUpButton
                            , moveLevelDownButton
                            , deleteCurrentLevelButton
                            ]
                        ]

                  else
                    div [ class "whitespace-nowrap" ] [ text levelName ]
                ]
    in
    div
        [ class "w-60 text-xs"
        ]
        [ div [ class "w-full h-[200px] overflow-hidden overflow-y-scroll" ]
            (p.selectList |> SelectList.toList |> List.indexedMap (\index { name } -> levelItem index name))
        , div [ class "p-4 border-[0.5px] border-white/20" ]
            [ exportingLevels (Levels p) ]
        , div [ class "p-4 border-[0.5px] border-white/20" ]
            [ importingLevels (Levels p) ]
        ]


makeButton : msg -> String -> Html msg
makeButton msg string =
    Html.button
        [ class "m-1 p-2 rounded text-white/60 bg-black/40 hover:bg-black/80"
        , style "transition" "background-color 0.3s ease"
        , Html.Events.onClick msg
        ]
        [ Html.text string ]


exportingLevels : Levels level -> Html Msg
exportingLevels (Levels p) =
    div []
        [ makeButton ClickedExportLevelsButton "Export"
        , pre
            [ class "w-full p-2 h-28 overflow-y-scroll text-white/60 text-[8px] leading-[9px] bg-black/40 select-text" ]
            [ Html.text p.textAreaContentForExportingJson ]
        ]


importingLevels : Levels level -> Html Msg
importingLevels (Levels p) =
    div []
        [ makeButton ClickedImportLevelsButton "Import"
        , textarea
            [ class "w-full p-2 h-28 overflow-y-scroll text-white/60 text-[8px] leading-[9px] bg-black/40 select-text"
            , rows 150
            , cols 10
            , Html.Events.onInput EditedTextAreaForImportingLevels
            , value p.textAreaContentForImportingJson
            ]
            [ Html.text "todo" ]
        ]
