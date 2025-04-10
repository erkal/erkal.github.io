module GithubRepoFetcher exposing (Model, Msg, initialModel, update, view)

import Base64
import Browser
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (disabled, style, type_, value)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode exposing (Decoder, bool, field, list, string)



-- MODEL


type alias Model =
    { owner : String
    , repo : String
    , defaultBranch : Maybe String
    , commitSha : Maybe String
    , state : State
    , error : Maybe String
    }


type State
    = Idle
    | FetchingTree
    | ErrorAtFetchingTree
    | FetchingContent (Dict String TreeItem)


type alias TreeItem =
    { itemState : ItemState
    , mode : String
    , type_ : String
    , size : Maybe Int
    , sha : String
    , url : String
    }


type ItemState
    = Directory
    | NotToBeFetched
    | ToBeFetched
    | Fetching
    | FailedWhenFetching String
    | SuccessfullyFetched String


initialModel : Model
initialModel =
    { owner = "elm"
    , repo = "bytes"
    , defaultBranch = Nothing
    , commitSha = Nothing
    , state = Idle
    , error = Nothing
    }



-- CONSTANTS


targetExtensions : List String
targetExtensions =
    [ ".elm", ".md" ]



-- UPDATE


type Msg
    = UpdateOwner String
    | UpdateRepo String
    | FetchTree
    | GotRepoInfo (Result Http.Error RepoInfo)
    | GotBranchInfo (Result Http.Error BranchInfo)
    | GotTreeInfo (Result Http.Error TreeResponse)
    | GotFileContent String (Result Http.Error String)


type alias RepoInfo =
    { defaultBranch : String
    }


type alias BranchInfo =
    { commitSha : String
    }


type alias TreeResponse =
    { sha : String
    , truncated : Bool
    , tree : List ApiTreeItem
    }



-- Temporary type to handle the API response format before conversion


type alias ApiTreeItem =
    { path : String
    , mode : String
    , type_ : String
    , size : Maybe Int
    , sha : String
    , url : String
    }


update : Msg -> Model -> ( Model, Maybe (List ( String, String )), Cmd Msg )
update msg model =
    case msg of
        UpdateOwner owner ->
            ( { model | owner = owner }
            , Nothing
            , Cmd.none
            )

        UpdateRepo repo ->
            ( { model | repo = repo }
            , Nothing
            , Cmd.none
            )

        FetchTree ->
            ( { model
                | state = FetchingTree
                , error = Nothing
              }
            , Nothing
            , fetchRepoInfo model.owner model.repo
            )

        GotRepoInfo result ->
            case result of
                Ok repoInfo ->
                    ( { model | defaultBranch = Just repoInfo.defaultBranch }
                    , Nothing
                    , fetchBranchInfo model.owner model.repo repoInfo.defaultBranch
                    )

                Err error ->
                    ( { model | state = ErrorAtFetchingTree, error = Just (errorToString error) }
                    , Nothing
                    , Cmd.none
                    )

        GotBranchInfo result ->
            case result of
                Ok branchInfo ->
                    ( { model | commitSha = Just branchInfo.commitSha }
                    , Nothing
                    , fetchTreeInfo model.owner model.repo branchInfo.commitSha
                    )

                Err error ->
                    ( { model | state = ErrorAtFetchingTree, error = Just (errorToString error) }
                    , Nothing
                    , Cmd.none
                    )

        GotTreeInfo result ->
            case result of
                Ok treeResponse ->
                    let
                        itemsDict =
                            treeResponse.tree
                                |> List.map (\apiItem -> ( apiItem.path, convertApiItemToTreeItem apiItem ))
                                |> Dict.fromList

                        itemsToFetch =
                            itemsDict
                                |> Dict.filter (\_ item -> item.itemState == ToBeFetched)
                                |> Dict.toList
                    in
                    ( { model
                        | state = FetchingContent itemsDict
                      }
                    , Nothing
                    , Cmd.batch (List.map (\( path, item ) -> fetchFileContent model.owner model.repo path item) itemsToFetch)
                    )

                Err error ->
                    ( { model | state = ErrorAtFetchingTree, error = Just (errorToString error) }
                    , Nothing
                    , Cmd.none
                    )

        GotFileContent path result ->
            case model.state of
                FetchingContent tree ->
                    let
                        updatedTree =
                            Dict.update path
                                (\maybeItem ->
                                    case maybeItem of
                                        Just item ->
                                            case result of
                                                Ok content ->
                                                    Just { item | itemState = SuccessfullyFetched content }

                                                Err error ->
                                                    Just { item | itemState = FailedWhenFetching (errorToString error) }

                                        Nothing ->
                                            Nothing
                                )
                                tree

                        -- Count files in each state
                        totalToFetch =
                            countTotalFetchable updatedTree

                        alreadyFetched =
                            countFetched updatedTree

                        failedFetches =
                            countFailed updatedTree

                        stillPending =
                            countPendingFetch updatedTree

                        -- All files have been processed when:
                        -- 1. No files are still pending AND
                        -- 2. The sum of fetched + failed equals the total that were marked for fetching
                        allProcessed =
                            stillPending == 0 && (alreadyFetched + failedFetches) == totalToFetch && totalToFetch > 0

                        -- Only send the message when all files have been processed
                        messageToParent =
                            if allProcessed then
                                collectFetchedFiles updatedTree

                            else
                                Nothing
                    in
                    ( { model | state = FetchingContent updatedTree }
                    , messageToParent
                    , Cmd.none
                    )

                _ ->
                    ( model
                    , Nothing
                    , Cmd.none
                    )


convertApiItemToTreeItem : ApiTreeItem -> TreeItem
convertApiItemToTreeItem apiItem =
    { itemState = categorizeItem apiItem
    , mode = apiItem.mode
    , type_ = apiItem.type_
    , size = apiItem.size
    , sha = apiItem.sha
    , url = apiItem.url
    }


categorizeItem : ApiTreeItem -> ItemState
categorizeItem item =
    if item.type_ == "tree" then
        Directory

    else if item.type_ == "blob" && hasTargetExtension item.path then
        ToBeFetched

    else
        NotToBeFetched


errorToString : Http.Error -> String
errorToString error =
    case error of
        Http.BadUrl url ->
            "Bad URL: " ++ url

        Http.Timeout ->
            "Request timed out"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus 403 ->
            "Rate limit exceeded (403) - try again later or add authentication"

        Http.BadStatus status ->
            "Bad status: " ++ String.fromInt status

        Http.BadBody message ->
            "Bad body: " ++ message



-- HELPERS


hasTargetExtension : String -> Bool
hasTargetExtension path =
    List.any (\ext -> String.endsWith ext path) targetExtensions
        || String.endsWith "/elm.json" path
        || path
        == "elm.json"


countItemsByState : Dict String TreeItem -> (ItemState -> Bool) -> Int
countItemsByState tree predicate =
    Dict.size (Dict.filter (\_ item -> predicate item.itemState) tree)


countPendingFetch : Dict String TreeItem -> Int
countPendingFetch tree =
    countItemsByState tree (\state -> state == ToBeFetched || state == Fetching)


countFetched : Dict String TreeItem -> Int
countFetched tree =
    countItemsByState tree
        (\state ->
            case state of
                SuccessfullyFetched _ ->
                    True

                _ ->
                    False
        )


countFailed : Dict String TreeItem -> Int
countFailed tree =
    countItemsByState tree
        (\state ->
            case state of
                FailedWhenFetching _ ->
                    True

                _ ->
                    False
        )


countTotalFetchable : Dict String TreeItem -> Int
countTotalFetchable tree =
    countItemsByState tree
        (\state ->
            case state of
                ToBeFetched ->
                    True

                Fetching ->
                    True

                SuccessfullyFetched _ ->
                    True

                FailedWhenFetching _ ->
                    True

                _ ->
                    False
        )


collectFetchedFiles : Dict String TreeItem -> Maybe (List ( String, String ))
collectFetchedFiles tree =
    let
        fetchedFiles =
            Dict.toList tree
                |> List.filterMap
                    (\( path, item ) ->
                        case item.itemState of
                            SuccessfullyFetched content ->
                                Just ( path, content )

                            _ ->
                                Nothing
                    )
    in
    if List.isEmpty fetchedFiles then
        Nothing

    else
        Just fetchedFiles



-- HTTP


fetchRepoInfo : String -> String -> Cmd Msg
fetchRepoInfo owner repo =
    Http.get
        { url = "https://api.github.com/repos/" ++ owner ++ "/" ++ repo
        , expect = Http.expectJson GotRepoInfo repoInfoDecoder
        }


fetchBranchInfo : String -> String -> String -> Cmd Msg
fetchBranchInfo owner repo branch =
    Http.get
        { url = "https://api.github.com/repos/" ++ owner ++ "/" ++ repo ++ "/branches/" ++ branch
        , expect = Http.expectJson GotBranchInfo branchInfoDecoder
        }


fetchTreeInfo : String -> String -> String -> Cmd Msg
fetchTreeInfo owner repo sha =
    Http.get
        { url = "https://api.github.com/repos/" ++ owner ++ "/" ++ repo ++ "/git/trees/" ++ sha ++ "?recursive=1"
        , expect = Http.expectJson GotTreeInfo treeResponseDecoder
        }


fetchFileContent : String -> String -> String -> TreeItem -> Cmd Msg
fetchFileContent owner repo path item =
    if item.type_ == "blob" && hasTargetExtension path then
        Http.get
            { url = "https://api.github.com/repos/" ++ owner ++ "/" ++ repo ++ "/git/blobs/" ++ item.sha
            , expect = Http.expectStringResponse (GotFileContent path) handleBlobResponse
            }

    else
        Cmd.none



-- DECODERS


repoInfoDecoder : Decoder RepoInfo
repoInfoDecoder =
    Decode.map RepoInfo
        (field "default_branch" string)


branchInfoDecoder : Decoder BranchInfo
branchInfoDecoder =
    Decode.map BranchInfo
        (field "commit" (field "sha" string))


treeResponseDecoder : Decoder TreeResponse
treeResponseDecoder =
    Decode.map3 TreeResponse
        (field "sha" string)
        (field "truncated" bool)
        (field "tree" (list apiTreeItemDecoder))


apiTreeItemDecoder : Decoder ApiTreeItem
apiTreeItemDecoder =
    Decode.map6 ApiTreeItem
        (field "path" string)
        (field "mode" string)
        (field "type" string)
        (Decode.maybe (field "size" Decode.int))
        (field "sha" string)
        (field "url" string)


handleBlobResponse : Http.Response String -> Result Http.Error String
handleBlobResponse response =
    case response of
        Http.BadUrl_ url ->
            Err (Http.BadUrl url)

        Http.Timeout_ ->
            Err Http.Timeout

        Http.NetworkError_ ->
            Err Http.NetworkError

        Http.BadStatus_ metadata _ ->
            Err (Http.BadStatus metadata.statusCode)

        Http.GoodStatus_ _ body ->
            -- Parse the JSON response and extract the base64 content
            case Decode.decodeString (field "content" string) body of
                Ok base64Content ->
                    -- GitHub adds newlines to the base64 content for formatting
                    -- We need to remove them before decoding
                    let
                        cleanedBase64 =
                            String.replace "\n" "" base64Content
                    in
                    case Base64.decode cleanedBase64 of
                        Ok decodedContent ->
                            -- The decoded content will have the original file's newlines preserved
                            Ok decodedContent

                        Err error ->
                            Err (Http.BadBody ("Base64 decoding error: " ++ error))

                Err error ->
                    Err (Http.BadBody ("JSON parsing error: " ++ Decode.errorToString error))



-- VIEW


view : Model -> Html Msg
view model =
    div
        [ style "width" "100%"
        , style "min-height" "100vh"
        , style "background-color" "lightgray"
        , style "display" "flex"
        , style "justify-content" "center"
        , style "align-items" "flex-start"
        , style "padding" "16px"
        , style "box-sizing" "border-box"
        ]
        [ div
            [ style "width" "100%"
            , style "max-width" "800px"
            , style "display" "flex"
            , style "flex-direction" "column"
            , style "gap" "16px"
            , style "background-color" "rgb(190,190,190)"
            , style "border-radius" "8px"
            , style "padding" "40px"
            , style "box-shadow" "0 2px 10px rgba(0,0,0,0.1)"
            ]
            [ div
                [ style "display" "flex"
                , style "flex-direction" "row"
                , style "align-items" "center"
                , style "gap" "2px"
                , style "font-size" "16px"
                , style "font-family" "monospace"
                , style "flex-wrap" "wrap"
                , style "justify-content" "center"
                ]
                [ div [] [ text "github.com/" ]
                , input_with_auto_resize UpdateOwner model.owner
                , div [] [ text "/" ]
                , input_with_auto_resize UpdateRepo model.repo
                ]
            , div
                [ style "display" "flex"
                , style "justify-content" "center"
                , style "margin-top" "10px"
                ]
                [ button
                    [ onClick FetchTree
                    , disabled (model.owner == "" || model.repo == "" || isLoading model.state)
                    , style "width" "100%"
                    , style "max-width" "240px"
                    , style "padding" "8px 16px"
                    , style "background-color" "#4CAF50"
                    , style "border-radius" "8px"
                    , style "color" "white"
                    , style "border" "none"
                    , style "cursor" "pointer"
                    ]
                    [ text
                        (if isLoading model.state then
                            statusText model.state

                         else
                            "Fetch Repository"
                        )
                    ]
                ]
            , div
                [ style "text-align" "center"
                , style "margin" "10px 0"
                ]
                [ viewStatus model ]
            , case model.state of
                FetchingContent tree ->
                    if not (Dict.isEmpty tree) then
                        viewTreeStructure tree

                    else
                        text ""

                _ ->
                    text ""
            ]
        ]


input_with_auto_resize : (String -> Msg) -> String -> Html Msg
input_with_auto_resize msg value_ =
    div
        [ style "position" "relative"
        , style "display" "inline-block"
        ]
        [ -- invisible layer for sizing
          div
            [ style "width" "fit-content"
            , style "padding" "2px 4px"
            , style "visibility" "hidden"
            , style "border" "1px solid black"
            , style "white-space" "pre"
            ]
            [ text
                (if String.isEmpty value_ then
                    " "

                 else
                    value_
                )
            ]
        , input
            [ type_ "text"
            , value value_
            , style "position" "absolute"
            , style "top" "0"
            , style "left" "0"
            , style "width" "100%"
            , style "padding" "2px 4px"
            , style "background-color" "white"
            , style "border" "1px solid black"
            , style "border-radius" "4px"
            , style "box-sizing" "border-box"
            , onInput msg
            ]
            []
        ]


viewStatus : Model -> Html Msg
viewStatus model =
    case model.state of
        Idle ->
            text ""

        FetchingTree ->
            text "Loading repository data..."

        ErrorAtFetchingTree ->
            div
                [ style "color" "#F44336"
                , style "background-color" "black"
                , style "padding" "32px"
                , style "word-break" "break-word"
                , style "border-radius" "8px"
                ]
                [ text ("Failed to load repository: " ++ Maybe.withDefault "Unknown error" model.error) ]

        FetchingContent tree ->
            let
                pending =
                    countPendingFetch tree

                fetched =
                    countFetched tree

                failed =
                    countFailed tree
            in
            div []
                [ text "Repository tree loaded. "
                , text ("Fetched " ++ String.fromInt fetched ++ " files, ")
                , text (String.fromInt pending ++ " pending, ")
                , text (String.fromInt failed ++ " failed.")
                ]


isLoading : State -> Bool
isLoading state =
    case state of
        FetchingTree ->
            True

        FetchingContent _ ->
            True

        _ ->
            False


statusText : State -> String
statusText state =
    case state of
        FetchingTree ->
            "Fetching repository tree..."

        FetchingContent tree ->
            let
                total =
                    countTotalFetchable tree

                fetched =
                    countFetched tree
            in
            "Fetching files: " ++ String.fromInt fetched ++ "/" ++ String.fromInt total

        _ ->
            "Loading..."


viewTreeStructure : Dict String TreeItem -> Html Msg
viewTreeStructure items =
    let
        -- Organize items by their directory structure
        pathDict =
            buildPathDictionary items
    in
    div
        [ style "width" "100%"
        , style "max-height" "60vh"
        , style "overflow-y" "auto"
        , style "background-color" "white"
        , style "border-radius" "4px"
        , style "padding" "10px"
        , style "box-shadow" "0 2px 4px rgba(0,0,0,0.1)"
        , style "margin-top" "10px"
        , style "word-break" "break-word"
        ]
        [ viewTreeNode "/" (Dict.get "/" pathDict) pathDict ]


buildPathDictionary : Dict String TreeItem -> Dict String (List ( String, TreeItem ))
buildPathDictionary items =
    Dict.foldl
        (\path item dict ->
            let
                dirPath =
                    case List.reverse (String.split "/" path) of
                        [] ->
                            "/"

                        fileName :: dirs ->
                            if List.isEmpty dirs then
                                "/"

                            else
                                String.join "/" (List.reverse dirs) ++ "/"

                currentItems =
                    Dict.get dirPath dict |> Maybe.withDefault []
            in
            Dict.insert dirPath (currentItems ++ [ ( path, item ) ]) dict
        )
        Dict.empty
        items


viewTreeNode : String -> Maybe (List ( String, TreeItem )) -> Dict String (List ( String, TreeItem )) -> Html Msg
viewTreeNode path maybeItems pathDict =
    case maybeItems of
        Nothing ->
            text ""

        Just items ->
            div
                [ style "margin-left"
                    (if path == "/" then
                        "0"

                     else
                        "20px"
                    )
                ]
                (items
                    |> List.sortBy (\( itemPath, _ ) -> String.toLower itemPath)
                    |> List.map (viewTreeItem pathDict)
                )


viewTreeItem : Dict String (List ( String, TreeItem )) -> ( String, TreeItem ) -> Html Msg
viewTreeItem pathDict ( itemPath, item ) =
    let
        isDirectory =
            item.itemState == Directory

        -- Extract just the filename or directory name from the full path
        displayName =
            case List.reverse (String.split "/" itemPath) of
                [] ->
                    itemPath

                name :: _ ->
                    name

        statusColor =
            case item.itemState of
                Directory ->
                    "#333"

                NotToBeFetched ->
                    "#999"

                ToBeFetched ->
                    "#FF9800"

                Fetching ->
                    "#2196F3"

                FailedWhenFetching _ ->
                    "#F44336"

                SuccessfullyFetched _ ->
                    "#4CAF50"

        itemTypeIcon =
            if isDirectory then
                "📁 "

            else
                "📄 "

        statusIcon =
            case item.itemState of
                Directory ->
                    " 📂"

                NotToBeFetched ->
                    " 🔒"

                ToBeFetched ->
                    " ⏳"

                Fetching ->
                    " 🔄"

                FailedWhenFetching _ ->
                    " ❌"

                SuccessfullyFetched _ ->
                    " ✅"

        sizeInfo =
            case item.itemState of
                SuccessfullyFetched content ->
                    " (" ++ String.fromInt (String.length content) ++ " characters)"

                _ ->
                    case item.size of
                        Just size ->
                            " (" ++ String.fromInt size ++ " bytes on remote)"

                        Nothing ->
                            ""

        errorInfo =
            case item.itemState of
                FailedWhenFetching err ->
                    div [ style "color" "#F44336", style "margin-left" "20px", style "font-style" "italic", style "word-break" "break-word" ]
                        [ text ("Error: " ++ err) ]

                _ ->
                    text ""
    in
    div []
        [ div
            [ style "display" "flex"
            , style "align-items" "center"
            , style "padding" "4px"
            , style "margin" "2px 0"
            , style "border-radius" "4px"
            , style "background-color"
                (if isDirectory then
                    "rgba(0,0,0,0.05)"

                 else
                    "transparent"
                )
            , style "word-break" "break-word"
            , style "flex-wrap" "wrap"
            ]
            [ span
                [ style "color" statusColor
                , style "font-weight"
                    (if isDirectory then
                        "bold"

                     else
                        "normal"
                    )
                , style "title" itemPath -- Add full path as tooltip
                ]
                [ text (itemTypeIcon ++ displayName ++ statusIcon ++ sizeInfo) ]
            ]
        , errorInfo
        , if isDirectory then
            viewTreeNode (itemPath ++ "/") (Dict.get (itemPath ++ "/") pathDict) pathDict

          else
            text ""
        ]
