module Tree.Address exposing
    ( Address, fromString, toString, next, parent
    , commonAncestor, firstChild, isAncestorOf, isDescendantOf, length, previous
    )

{-| The path of a `Tree` node is represented as a `List Int`.

This module provides functions for path manipulation.

@docs Address, fromString, toString, next, parent, ancestor
@docs commonAncestor, firstChild, isAncestorOf, isDescendantOf, length, previous

-}

import Basics.Extra exposing (flip)
import List.Extra


type alias Address =
    List Int


length : Address -> Int
length address =
    List.length address


toString : Address -> String
toString address =
    address
        |> List.map String.fromInt
        |> String.join addressSeparator


fromString : String -> Address
fromString string =
    string
        |> String.split addressSeparator
        |> List.filterMap String.toInt


addressSeparator : String
addressSeparator =
    "-"


{-| Increment last element of the path.

    next [ 1, 2, 3 ] == [ 1, 2, 4 ]

-}
next : List Int -> List Int
next path =
    case List.reverse path of
        [] ->
            []

        idx :: rest ->
            List.reverse (idx + 1 :: rest)


{-| Decrement last element of the path.

    previous [ 1, 2, 3 ] == [ 1, 2, 2 ]

-}
previous : List Int -> List Int
previous path =
    case List.reverse path of
        [] ->
            []

        idx :: rest ->
            List.reverse (idx - 1 :: rest)


{-| Obtain the parent path.

    parent [ 1, 2, 3 ] == [ 1, 2 ]

-}
parent : List Int -> List Int
parent path =
    case List.reverse path of
        [] ->
            []

        _ :: rest ->
            List.reverse rest


{-| Obtain first child path.

    child [ 1, 2, 3 ] == [ 1, 2, 3, 0 ]

-}
firstChild : List Int -> List Int
firstChild path =
    path ++ [ 0 ]


{-| Check if the second path is a descendant of the first path.

    descendantOf [ 1, 2 ] [ 1, 2, 3 ] == True

-}
isDescendantOf : Address -> Address -> Bool
isDescendantOf =
    List.Extra.isPrefixOf


{-| Check if the second path is an ancestor of the first path.

    ancestorOf [ 1, 2, 3 ] [ 1, 2 ] == True

-}
isAncestorOf : Address -> Address -> Bool
isAncestorOf =
    flip isDescendantOf


{-| Find a common ancestor path for a list of paths.

    parent [ [ 0, 1, 0, 1 ], [ 0, 1, 1, 0 ], [ 0, 1, 2, 3 ] ] == [ 0, 1 ]

-}
commonAncestor : List (List Int) -> List Int
commonAncestor lists =
    case lists of
        [] ->
            []

        headList :: tailLists ->
            commonAncestorHelp headList tailLists


commonAncestorHelp : List Int -> List (List Int) -> List Int
commonAncestorHelp common lists =
    case lists of
        [] ->
            common

        headList :: tailLists ->
            commonAncestorHelp (findCommonPrefix common headList) tailLists


findCommonPrefix : List Int -> List Int -> List Int
findCommonPrefix list1 list2 =
    case ( list1, list2 ) of
        ( [], _ ) ->
            []

        ( _, [] ) ->
            []

        ( head1 :: tail1, head2 :: tail2 ) ->
            if head1 == head2 then
                head1 :: findCommonPrefix tail1 tail2

            else
                []
