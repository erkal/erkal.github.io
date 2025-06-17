module SelectList.Encode exposing (encode)

{-| Encode a SelectList to JSON.

@docs encode

-}

import Json.Encode as JE
import SelectList exposing (SelectList)


{-| Encode a SelectList to JSON.

It encodes the list as a JSON object with the internal structure of SelectList:
- `beforeReversed`: a JSON array of elements before the selected item (in reverse order)
- `current`: the currently selected element
- `after`: a JSON array of elements after the selected item

Example:

    import Json.Encode as JE
    import SelectList
    import SelectList.Encode

    selectList =
        SelectList.init ( "a", [ "b", "c" ] )

    encoded =
        SelectList.Encode.encode JE.string selectList

    -- Results in a JSON object like:
    -- { 
    --   "beforeReversed": [], 
    --   "current": "a", 
    --   "after": ["b", "c"]
    -- }

-}
encode : (a -> JE.Value) -> SelectList a -> JE.Value
encode encodeElement selectList =
    JE.object
        [ ( "beforeReversed", JE.list encodeElement (SelectList.getBeforeReversed selectList) )
        , ( "current", encodeElement (SelectList.getCurrent selectList) )
        , ( "after", JE.list encodeElement (SelectList.getAfter selectList) )
        ]