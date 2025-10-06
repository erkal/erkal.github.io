module SelectList exposing
    ( init, singleton, create
    , getCurrent, getBeforeReversed, getAfter, getCurrentIndex, toList, size, isAtStart, isAtEnd, member
    , goTo, goToNext, goToPrevious, goToStart, goToEnd, selectNextOccurrenceOf
    , mapCurrent, setCurrent, map, mapAt, moveCurrentToIndex, moveElement
    , add, duplicateCurrent, removeCurrent, removeAfter, removeBefore, moveElementDown, moveElementUp
    , insertAt
    , SelectList
    )

{-| `SelectList` is a data structure that allows you to store and browse a list of elements, in which always one element is selected.


# Creation

@docs init, singleton, create


# Query

@docs getCurrent, getBeforeReversed, getAfter, getCurrentIndex, toList, size, isAtStart, isAtEnd, member


# Navigation

@docs goTo, goToNext, goToPrevious, goToStart, goToEnd, selectNextOccurrenceOf


# Update

@docs mapCurrent, setCurrent, map, mapAt, moveCurrentToIndex, moveElement


# Add and Remove

@docs add, duplicateCurrent, removeCurrent, removeAfter, removeBefore, moveElementDown, moveElementUp


# Insertion

@docs insertAt

-}

import List.Extra


type SelectList a
    = SelectList
        { beforeReversed : List a
        , current : a
        , after : List a
        }


{-| Initialize a SelectList with a first element and a list of remaining elements.
The first element becomes the selected element.

    init ( 1, [ 2, 3, 4 ] ) --> SelectList with 1 selected, followed by 2, 3, 4

-}
init : ( a, List a ) -> SelectList a
init ( first, rest ) =
    SelectList
        { beforeReversed = []
        , current = first
        , after = rest
        }


{-| Create a SelectList with a single element.

    singleton 1 --> SelectList with only 1

-}
singleton : a -> SelectList a
singleton el =
    init ( el, [] )


{-| Create a SelectList with elements before, the current element, and elements after.
This gives you full control over the initial state of the SelectList.

    create ( [ 1, 2 ], 3, [ 4, 5 ] ) --> SelectList with 1, 2 before, 3 selected, and 4, 5 after

-}
create : ( List a, a, List a ) -> SelectList a
create ( before, current, after ) =
    SelectList
        { beforeReversed = before |> List.reverse
        , current = current
        , after = after
        }



-- QUERY


{-| Get the currently selected element.

    getCurrent (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> 3

-}
getCurrent : SelectList a -> a
getCurrent (SelectList p) =
    p.current


{-| Get the list of elements before the current element, in reverse order.

    getBeforeReversed (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> [2, 1]

-}
getBeforeReversed : SelectList a -> List a
getBeforeReversed (SelectList p) =
    p.beforeReversed


{-| Get the list of elements after the current element.
-}
getAfter : SelectList a -> List a
getAfter (SelectList p) =
    p.after


{-| Get the index of the currently selected element.

    getCurrentIndex (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> 2

-}
getCurrentIndex : SelectList a -> Int
getCurrentIndex (SelectList p) =
    List.length p.beforeReversed


{-| Convert a SelectList to a regular List.

    toList (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> [1, 2, 3, 4, 5]

-}
toList : SelectList a -> List a
toList (SelectList p) =
    List.reverse p.beforeReversed ++ (p.current :: p.after)


{-| Get the total number of elements in the SelectList.

    size (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> 5

-}
size : SelectList a -> Int
size (SelectList p) =
    1 + List.length p.beforeReversed + List.length p.after


{-| Check if the current element is the first element in the list.

    isAtStart (init ( 1, [ 2, 3 ] )) --> True

    isAtStart (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> False

-}
isAtStart : SelectList a -> Bool
isAtStart (SelectList p) =
    List.isEmpty p.beforeReversed


{-| Check if the current element is the last element in the list.

    isAtEnd (create ( [ 1, 2 ], 3, [] )) --> True

    isAtEnd (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> False

-}
isAtEnd : SelectList a -> Bool
isAtEnd (SelectList p) =
    List.isEmpty p.after


{-| Check if an element exists in the SelectList.

    member 3 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> True

    member 6 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> False

-}
member : a -> SelectList a -> Bool
member element (SelectList p) =
    element == p.current || List.member element p.beforeReversed || List.member element p.after



-- UPDATE


{-| Apply a function to the current element only.

    mapCurrent String.fromInt (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2 before, "3" selected, and 4, 5 after

-}
mapCurrent : (a -> a) -> SelectList a -> SelectList a
mapCurrent up (SelectList p) =
    SelectList { p | current = up p.current }


{-| Replace the current element with a new value.

    setCurrent 99 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2 before, 99 selected, and 4, 5 after

-}
setCurrent : a -> SelectList a -> SelectList a
setCurrent newCurrent (SelectList p) =
    SelectList { p | current = newCurrent }


{-| Apply a function to all elements in the SelectList.

    map String.fromInt (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with "1", "2" before, "3" selected, and "4", "5" after

-}
map : (a -> b) -> SelectList a -> SelectList b
map up (SelectList p) =
    SelectList
        { beforeReversed = p.beforeReversed |> List.map up
        , current = p.current |> up
        , after = p.after |> List.map up
        }


{-| Apply a function to the element at the specified index.

    mapAt 2 String.fromInt (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2 before, "3" selected, and 4, 5 after

    mapAt 0 String.fromInt (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with "1", 2 before, 3 selected, and 4, 5 after

-}
mapAt : Int -> (a -> a) -> SelectList a -> SelectList a
mapAt index up selectList =
    selectList
        |> goTo index
        |> mapCurrent up
        |> goTo (getCurrentIndex selectList)


{-| Insert a new element at the specified index.
The new element becomes selected.

    insertAt 2 99 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2 before, 99 selected, and 3, 4, 5 after

-}
insertAt : Int -> a -> SelectList a -> SelectList a
insertAt targetIndex element =
    goTo (targetIndex - 1)
        >> add element


{-| Move the current element to a different index in the list.
The element remains selected.

    moveCurrentToIndex 0 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 3 selected, followed by 1, 2, 4, 5

-}
moveCurrentToIndex : Int -> SelectList a -> SelectList a
moveCurrentToIndex targetIndex selectList =
    let
        ( before, after ) =
            selectList
                |> removeCurrent
                |> toList
                |> List.Extra.splitAt targetIndex
    in
    SelectList
        { beforeReversed = before |> List.reverse
        , current = getCurrent selectList
        , after = after
        }


{-| Move the element at index i to index j.
The selected element doesn't change. If the element at index i was selected,
it stays selected after being moved to index j.

    moveElement 0 3 (create ( [], 1, [ 2, 3, 4, 5 ] )) --> SelectList with 2, 3, 4 before, 1 selected, and 5 after

    moveElement 1 4 (create ( [ 1 ], 2, [ 3, 4, 5 ] )) --> SelectList with 1, 3, 4, 5 before, 2 selected

-}
moveElement : Int -> Int -> SelectList a -> SelectList a
moveElement fromIndex toIndex selectList =
    let
        currentIndex : Int
        currentIndex =
            getCurrentIndex selectList
    in
    if fromIndex == toIndex then
        selectList

    else if currentIndex == fromIndex then
        selectList
            |> moveCurrentToIndex toIndex

    else
        let
            adjustedCurrentIndex : Int
            adjustedCurrentIndex =
                if fromIndex < currentIndex && toIndex >= currentIndex then
                    currentIndex - 1

                else if fromIndex > currentIndex && toIndex <= currentIndex then
                    currentIndex + 1

                else
                    currentIndex
        in
        selectList
            |> goTo fromIndex
            |> moveCurrentToIndex toIndex
            |> goTo adjustedCurrentIndex


{-| Move to the first element of the list.

    goToStart (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1 selected, followed by 2, 3, 4, 5

-}
goToStart : SelectList a -> SelectList a
goToStart selectList =
    selectList |> goTo 0


{-| Move to the last element of the list.

    goToEnd (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2, 3, 4 before, 5 selected

-}
goToEnd : SelectList a -> SelectList a
goToEnd selectList =
    selectList |> goTo (size selectList - 1)


{-| Move to the element at the specified index.
Uses modBy to handle indices outside the valid range.

    goTo 0 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1 selected, followed by 2, 3, 4, 5

    goTo 4 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2, 3, 4 before, 5 selected

-}
goTo : Int -> SelectList a -> SelectList a
goTo i (SelectList p) =
    let
        l =
            toList (SelectList p)

        i_ =
            i |> modBy (List.length l)
    in
    case List.drop i_ l of
        head :: tail ->
            SelectList
                { beforeReversed = List.reverse (List.take i_ l)
                , current = head
                , after = tail
                }

        [] ->
            SelectList p


{-| Move to the next element in the list. Does nothing if already at the end.

    goToNext (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2, 3 before, 4 selected, and 5 after

    goToNext (create ( [ 1, 2, 3, 4 ], 5, [] )) --> SelectList with 1, 2, 3, 4 before, 5 selected (unchanged)

-}
goToNext : SelectList a -> SelectList a
goToNext (SelectList p) =
    case p.after of
        nextLevel :: rest ->
            SelectList
                { beforeReversed = p.current :: p.beforeReversed
                , current = nextLevel
                , after = rest
                }

        [] ->
            SelectList p


{-| Move to the next occurrence of the specified element. If not found, stays at the current element.

    selectNextOccurrenceOf 5 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2, 3, 4 before, 5 selected

    selectNextOccurrenceOf 3 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2 before, 3 selected, and 4, 5 after (unchanged)

-}
selectNextOccurrenceOf : a -> SelectList a -> Maybe (SelectList a)
selectNextOccurrenceOf a selectList =
    let
        go : SelectList a -> Maybe (SelectList a)
        go sL =
            if getCurrent sL == a then
                Just sL

            else if isAtEnd sL then
                Nothing

            else
                Maybe.andThen go (Just (goToNext sL))
    in
    selectList
        |> goToStart
        |> go


{-| Move to the previous element in the list. Does nothing if already at the start.

    goToPrevious (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1 before, 2 selected, and 3, 4, 5 after

    goToPrevious (create ( [], 1, [ 2, 3 ] )) --> SelectList with 1 selected, followed by 2, 3 (unchanged)

-}
goToPrevious : SelectList a -> SelectList a
goToPrevious (SelectList p) =
    case p.beforeReversed of
        previousLevel :: rest ->
            SelectList
                { beforeReversed = rest
                , current = previousLevel
                , after = p.current :: p.after
                }

        [] ->
            SelectList p


{-| Add a new element after the current element, and select it.

    add 99 (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2, 3 before, 99 selected, and 4, 5 after

-}
add : a -> SelectList a -> SelectList a
add a (SelectList p) =
    SelectList
        { p
            | beforeReversed = p.current :: p.beforeReversed
            , current = a
        }


{-| Remove all elements after the current element.

    removeAfter (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2 before and 3 selected

-}
removeAfter : SelectList a -> SelectList a
removeAfter (SelectList p) =
    SelectList
        { p | after = [] }


{-| Remove all elements before the current element.

    removeBefore (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 3 selected, followed by 4, 5

-}
removeBefore : SelectList a -> SelectList a
removeBefore (SelectList p) =
    SelectList
        { p | beforeReversed = [] }


{-| Add a duplicate of the current element after the current element and select it.

    duplicateCurrent (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2, 3 before, 3 selected, and 4, 5 after

-}
duplicateCurrent : SelectList a -> SelectList a
duplicateCurrent selectList =
    selectList
        |> add (getCurrent selectList)


{-| Remove the current element and select the previous element.
If there is no previous element, select the next element.
If there are no other elements, the SelectList remains unchanged.

    removeCurrent (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1 before, 2 selected, and 4, 5 after

    removeCurrent (create ( [], 1, [ 2, 3 ] )) --> SelectList with 2 selected, followed by 3

-}
removeCurrent : SelectList a -> SelectList a
removeCurrent (SelectList p) =
    case p.beforeReversed of
        x :: xs ->
            SelectList
                { p
                    | beforeReversed = xs
                    , current = x
                }

        [] ->
            case p.after of
                x :: xs ->
                    SelectList
                        { p
                            | current = x
                            , after = xs
                        }

                [] ->
                    SelectList p


{-| Move the current element down in the list (exchange with next element).
If at end, wraps to the beginning.

    moveElementDown (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1, 2, 4 before, 3 selected, and 5 after

    moveElementDown (create ( [ 1, 2 ], 3, [] )) --> SelectList with 3 selected, followed by 2, 1

-}
moveElementDown : SelectList a -> SelectList a
moveElementDown (SelectList p) =
    case p.after of
        next :: rest ->
            SelectList
                { p
                    | beforeReversed = next :: p.beforeReversed
                    , after = rest
                }

        [] ->
            SelectList
                { p
                    | beforeReversed = []
                    , after = List.reverse p.beforeReversed
                }


{-| Move the current element up in the list (exchange with previous element).
If at start, wraps to the end.

    moveElementUp (create ( [ 1, 2 ], 3, [ 4, 5 ] )) --> SelectList with 1 before, 2 selected, and 3, 4, 5 after

    moveElementUp (create ( [], 1, [ 2, 3 ] )) --> SelectList with 2, 3 before, 1 selected

-}
moveElementUp : SelectList a -> SelectList a
moveElementUp (SelectList p) =
    case p.beforeReversed of
        next :: rest ->
            SelectList
                { p
                    | beforeReversed = rest
                    , after = next :: p.after
                }

        [] ->
            SelectList
                { p
                    | beforeReversed = List.reverse p.after
                    , after = []
                }
