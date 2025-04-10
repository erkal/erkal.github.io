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

import Css
import DesignSystem.Color exposing (..)
import Html.Styled exposing (Html, button, div, input, pre, text, textarea, toUnstyled)
import Html.Styled.Attributes exposing (autocomplete, cols, css, placeholder, rows, title, value)
import Html.Styled.Events exposing (onClick, onInput, onMouseDown)
import Icons
import Json.Decode as JD exposing (Decoder)
import Json.Encode as JE exposing (Value)
import SelectList exposing (SelectList)


type Levels level
    = Levels
        { selectList : SelectList (Item level)

        --
        , encodeLevel : level -> JE.Value
        , levelDecoder : Decoder level
        , textAreaContentForExportingJson : String
        , textAreaContentForImportingJson : String
        }


type alias Item level =
    { name : String
    , level : level
    }


init : (level -> JE.Value) -> Decoder level -> Item level -> List (Item level) -> Levels level
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
                [ css
                    [ Css.display Css.inlineBlock
                    , Css.marginLeft (Css.px 4)
                    , Css.width (Css.px 16)
                    , Css.color (toCssColor whiteAlpha400)
                    , Css.hover [ Css.color (toCssColor whiteAlpha800) ]
                    ]
                , onClick PressedAddLevelButton
                , title "Duplicate Level"
                ]
                [ Icons.icons.plus ]

        deleteCurrentLevelButton =
            div
                [ css
                    [ Css.display Css.inlineBlock
                    , Css.marginLeft (Css.px 4)
                    , Css.width (Css.px 16)
                    , Css.color (toCssColor whiteAlpha400)
                    , Css.hover [ Css.color (toCssColor red) ]
                    ]
                , onClick PressedRemoveLevelButton
                , title "Delete Level"
                ]
                [ Icons.icons.trash ]

        moveLevelDownButton =
            div
                [ css
                    [ Css.display Css.inlineBlock
                    , Css.marginLeft (Css.px 4)
                    , Css.width (Css.px 16)
                    , Css.color (toCssColor whiteAlpha400)
                    , Css.hover [ Css.color (toCssColor whiteAlpha800) ]
                    ]
                , onClick PressedMoveLevelDownButton
                , title "Move Level Down"
                ]
                [ Icons.icons.moveDown ]

        moveLevelUpButton =
            div
                [ css
                    [ Css.display Css.inlineBlock
                    , Css.marginLeft (Css.px 4)
                    , Css.width (Css.px 16)
                    , Css.color (toCssColor whiteAlpha400)
                    , Css.hover [ Css.color (toCssColor whiteAlpha800) ]
                    ]
                , onClick PressedMoveLevelUpButton
                , title "Move Level Up"
                ]
                [ Icons.icons.moveUp ]

        levelItem index levelName =
            button
                [ css
                    [ Css.width (Css.pct 100)
                    , Css.height (Css.px 32)
                    , Css.padding (Css.px 8)
                    , Css.textAlign Css.left
                    , Css.color (setOpacity 0.8 white |> toCssColor)
                    , Css.borderBottom3 (Css.px 1) Css.solid (setOpacity 0.2 white |> toCssColor)
                    , Css.property "transition" "background-color 0.3s ease"
                    , if index == SelectList.getCurrentIndex p.selectList then
                        Css.batch
                            [ Css.backgroundColor (setOpacity 0.4 black |> toCssColor)
                            , Css.hover [ Css.backgroundColor (setOpacity 0.6 black |> toCssColor) ]
                            , Css.active [ Css.backgroundColor (setOpacity 0.8 black |> toCssColor) ]
                            ]

                      else
                        Css.hover [ Css.backgroundColor (setOpacity 0.2 black |> toCssColor) ]
                    ]
                , onMouseDown (MouseDownOnLevelItem index)
                ]
                [ if index == SelectList.getCurrentIndex p.selectList then
                    div []
                        [ input
                            [ css
                                [ Css.width (Css.px 100)
                                , Css.backgroundColor Css.transparent
                                ]
                            , placeholder "Enter Level Name"
                            , value (p.selectList |> SelectList.getCurrent |> .name)
                            , onInput ChangedCurrentLevelsNameTo
                            , autocomplete False
                            ]
                            []
                        , div [ css [ Css.float Css.right ] ]
                            [ addNewLevelButton
                            , moveLevelUpButton
                            , moveLevelDownButton
                            , deleteCurrentLevelButton
                            ]
                        ]

                  else
                    div [ css [ Css.whiteSpace Css.noWrap ] ] [ text levelName ]
                ]
    in
    div
        [ css
            [ Css.width (Css.px 240)
            , Css.fontSize (Css.px 12)
            ]
        ]
        [ div
            [ css
                [ Css.width (Css.pct 100)
                , Css.height (Css.px 200)
                , Css.overflow Css.hidden
                , Css.overflowY Css.scroll
                ]
            ]
            (p.selectList |> SelectList.toList |> List.indexedMap (\index { name } -> levelItem index name))
        , div
            [ css
                [ Css.padding (Css.px 16)
                , Css.border3 (Css.px 0.5) Css.solid (setOpacity 0.2 white |> toCssColor)
                ]
            ]
            [ exportingLevels (Levels p) ]
        , div
            [ css
                [ Css.padding (Css.px 16)
                , Css.border3 (Css.px 0.5) Css.solid (setOpacity 0.2 white |> toCssColor)
                ]
            ]
            [ importingLevels (Levels p) ]
        ]


makeButton : msg -> String -> Html msg
makeButton msg string =
    button
        [ css
            [ Css.margin (Css.px 4)
            , Css.padding (Css.px 8)
            , Css.borderRadius (Css.px 4)
            , Css.color (setOpacity 0.6 white |> toCssColor)
            , Css.backgroundColor (setOpacity 0.4 black |> toCssColor)
            , Css.hover [ Css.backgroundColor (setOpacity 0.8 black |> toCssColor) ]
            , Css.property "transition" "background-color 0.3s ease"
            ]
        , onClick msg
        ]
        [ text string ]


exportingLevels : Levels level -> Html Msg
exportingLevels (Levels p) =
    div []
        [ makeButton ClickedExportLevelsButton "Export"
        , pre
            [ css
                [ Css.width (Css.pct 100)
                , Css.padding (Css.px 8)
                , Css.height (Css.px 112)
                , Css.overflowY Css.scroll
                , Css.color (setOpacity 0.6 white |> toCssColor)
                , Css.fontSize (Css.px 8)
                , Css.lineHeight (Css.px 9)
                , Css.backgroundColor (setOpacity 0.4 black |> toCssColor)
                , Css.property "user-select" "text"
                ]
            ]
            [ text p.textAreaContentForExportingJson ]
        ]


importingLevels : Levels level -> Html Msg
importingLevels (Levels p) =
    div []
        [ makeButton ClickedImportLevelsButton "Import"
        , textarea
            [ css
                [ Css.width (Css.pct 100)
                , Css.padding (Css.px 8)
                , Css.height (Css.px 112)
                , Css.overflowY Css.scroll
                , Css.color (setOpacity 0.6 white |> toCssColor)
                , Css.fontSize (Css.px 8)
                , Css.lineHeight (Css.px 9)
                , Css.backgroundColor (setOpacity 0.4 black |> toCssColor)
                , Css.property "user-select" "text"
                ]
            , rows 150
            , cols 10
            , onInput EditedTextAreaForImportingLevels
            , value p.textAreaContentForImportingJson
            ]
            [ text "todo" ]
        ]
