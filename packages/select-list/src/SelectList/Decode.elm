module SelectList.Decode exposing (decoder)

{-| Decode JSON into a SelectList.

@docs decoder

-}

import Json.Decode as JD exposing (Decoder)
import SelectList exposing (SelectList)


{-| Decode JSON into a SelectList.

It expects a JSON object with the internal structure of SelectList:
- `beforeReversed`: a JSON array of elements before the selected item (in reverse order)
- `current`: the currently selected element
- `after`: a JSON array of elements after the selected item

Example:

    import Json.Decode as JD
    import SelectList
    import SelectList.Decode

    json = """
    {
        "beforeReversed": [],
        "current": "a",
        "after": ["b", "c"]
    }
    """

    decoded =
        JD.decodeString (SelectList.Decode.decoder JD.string) json

    -- Results in a SelectList with "a" selected, followed by "b" and "c"

-}
decoder : Decoder a -> Decoder (SelectList a)
decoder elementDecoder =
    JD.map3 create
        (JD.field "beforeReversed" (JD.list elementDecoder))
        (JD.field "current" elementDecoder)
        (JD.field "after" (JD.list elementDecoder))


{-| Helper function to create a SelectList
-}
create : List a -> a -> List a -> SelectList a
create beforeReversed current after =
    SelectList.create ( beforeReversed, current, after )