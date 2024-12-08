module DesignSystem.Color exposing
    ( toCssColor, setOpacity
    , viewColorPalette
    , black, white
    , blue, red, green, purple, orange, cyan, yellow, rose, gray
    , blue100, blue200, blue300, blue400, blue500, blue600, blue700, blue800, blue900
    , red100, red200, red300, red400, red500, red600, red700, red800, red900
    , green100, green200, green300, green400, green500, green600, green700, green800, green900
    , purple100, purple200, purple300, purple400, purple500, purple600, purple700, purple800, purple900
    , orange100, orange200, orange300, orange400, orange500, orange600, orange700, orange800, orange900
    , cyan100, cyan200, cyan300, cyan400, cyan500, cyan600, cyan700, cyan800, cyan900
    , yellow100, yellow200, yellow300, yellow400, yellow500, yellow600, yellow700, yellow800, yellow900
    , rose100, rose200, rose300, rose400, rose500, rose600, rose700, rose800, rose900
    , gray100, gray200, gray300, gray400, gray500, gray600, gray700, gray800, gray900
    , whiteAlpha100, whiteAlpha200, whiteAlpha300, whiteAlpha400, whiteAlpha500, whiteAlpha600, whiteAlpha700, whiteAlpha800, whiteAlpha900
    , blackAlpha100, blackAlpha200, blackAlpha300, blackAlpha400, blackAlpha500, blackAlpha600, blackAlpha700, blackAlpha800, blackAlpha900
    )

{-| Color System for Retro Game UI

This module provides a comprehensive color system optimized for retro-style game interfaces.
The colors are designed with the following principles:

  - High contrast for UI elements while maintaining the retro aesthetic
  - Distinct states for interactive elements (hover, active, pressed)
  - Comfortable viewing for extended gaming sessions
  - Clear hierarchy for system messages and notifications


# Color Usage Guide


## Primary UI Elements (Blue family)

Use blues for main interactive elements like buttons, menu items, and selections.
The 500 shade is your primary color, with lighter shades (100-400) for hover states
and darker shades (600-900) for pressed states.


## System Messages

  - Reds: Errors, warnings, and critical states
  - Greens: Success messages and progression indicators
  - Orange: Attention-grabbing elements and notifications
  - Cyan: Information and tooltips


## Special Elements

  - Purple: Special items, power-ups, and unique UI elements
  - Gold: Achievements, rewards, and rare items
  - Rose: Decorative elements and aesthetic accents


## System UI

  - Gray: Basic UI elements, disabled states, and backgrounds
  - White/Black Alpha: Overlays, modals, and layered UI elements


# Color Utilities

@docs toCssColor, setOpacity


# Visualization

@docs viewColorPalette


# Base Colors

@docs black, white


# Main Colors

Each main color represents the 500 variant of its respective color family.

@docs blue, red, green, purple, orange, cyan, yellow, rose, gray


# Color Variants

Each color family includes nine shades, from lightest (100) to darkest (900).
The 500 variant is considered the main color of each family.


## Blues (Primary UI)

@docs blue100, blue200, blue300, blue400, blue500, blue600, blue700, blue800, blue900


## Reds (Warnings & Errors)

@docs red100, red200, red300, red400, red500, red600, red700, red800, red900


## Greens (Success & Progress)

@docs green100, green200, green300, green400, green500, green600, green700, green800, green900


## Purples (Special Elements)

@docs purple100, purple200, purple300, purple400, purple500, purple600, purple700, purple800, purple900


## Oranges (Attention & Notifications)

@docs orange100, orange200, orange300, orange400, orange500, orange600, orange700, orange800, orange900


## Cyans (Information)

@docs cyan100, cyan200, cyan300, cyan400, cyan500, cyan600, cyan700, cyan800, cyan900


## Golds (Achievements)

@docs yellow100, yellow200, yellow300, yellow400, yellow500, yellow600, yellow700, yellow800, yellow900


## Roses (Decoration)

@docs rose100, rose200, rose300, rose400, rose500, rose600, rose700, rose800, rose900


## Grays (System UI)

@docs gray100, gray200, gray300, gray400, gray500, gray600, gray700, gray800, gray900


# Alpha Variants

Colors with varying levels of transparency.


## White Alpha

@docs whiteAlpha100, whiteAlpha200, whiteAlpha300, whiteAlpha400, whiteAlpha500, whiteAlpha600, whiteAlpha700, whiteAlpha800, whiteAlpha900


## Black Alpha

@docs blackAlpha100, blackAlpha200, blackAlpha300, blackAlpha400, blackAlpha500, blackAlpha600, blackAlpha700, blackAlpha800, blackAlpha900

-}

import Color exposing (Color, rgb255, rgba)
import Css exposing (int, px)
import Html.Styled exposing (Html, div, text)
import Html.Styled.Attributes exposing (css)


{-| Convert a Color to Css.Color while preserving its original alpha value.
This is useful when working with elm-css and you need to convert colors from elm-color format.

    -- Creating a CSS color from a base color
    buttonBackground =
        css [ backgroundColor (toCssColor blue500) ]

-}
toCssColor : Color -> Css.Color
toCssColor color =
    let
        c =
            Color.toRgba color
    in
    Css.rgba
        (round (c.red * 255))
        (round (c.green * 255))
        (round (c.blue * 255))
        c.alpha


{-| Helper function to set the opacity of any color. Useful for creating hover states
or disabled appearances without defining new colors.

    -- Creating a semi-transparent overlay
    overlay =
        setOpacity 0.5 black

-}
setOpacity : Float -> Color -> Color
setOpacity opacity color =
    let
        c =
            Color.toRgba color
    in
    Color.fromRgba
        { red = c.red
        , green = c.green
        , blue = c.blue
        , alpha = opacity
        }


{-| Display an interactive color palette showing all available colors in the design system.
This is useful for:

  - Visualizing the complete color system

  - Finding the right color for your use case

  - Checking color values (hover over colors to see RGB values)

    main =
    div [][ h1 [] [ text "Game UI Colors" ]
    , viewColorPalette
    ]

-}
viewColorPalette : Html msg
viewColorPalette =
    let
        colorBox : String -> Color -> Html msg
        colorBox name color =
            div
                [ css
                    [ Css.position Css.relative
                    , Css.width (Css.px 48)
                    , Css.height (Css.px 48)
                    , Css.backgroundColor (toCssColor color)
                    , Css.borderRadius (Css.px 6)
                    , Css.boxShadow5 Css.zero (Css.px 2) (Css.px 4) Css.zero (Css.rgba 0 0 0 0.1)
                    , Css.fontSize (px 16)
                    , Css.cursor Css.pointer
                    , Css.hover
                        [ Css.zIndex (int 2)
                        , Css.before
                            [ Css.property "content" ("\"" ++ name ++ "\"")
                            , Css.position Css.absolute
                            , Css.top (Css.pct 50)
                            , Css.left (Css.pct 50)
                            , Css.transform (Css.translate2 (Css.pct -50) (Css.pct -50))
                            , Css.color (toCssColor white)
                            , Css.backgroundColor (Css.rgba 0 0 0 0.7)
                            , Css.padding2 (Css.px 4) (Css.px 6)
                            , Css.borderRadius (Css.px 3)
                            ]
                        ]
                    ]
                ]
                []

        colorFamily : String -> List ( String, Color ) -> Html msg
        colorFamily familyName colors =
            div
                [ css
                    [ Css.marginBottom (Css.px 8)
                    , Css.displayFlex
                    , Css.alignItems Css.flexStart
                    ]
                ]
                [ div
                    [ css
                        [ Css.width (Css.px 120)
                        , Css.fontSize (Css.px 14)
                        , Css.fontWeight (Css.int 600)
                        , Css.color (toCssColor gray100)
                        , Css.paddingTop (Css.px 12)
                        ]
                    ]
                    [ text familyName ]
                , div
                    [ css
                        [ Css.displayFlex
                        , Css.flexWrap Css.wrap
                        , Css.property "gap" "8px"
                        ]
                    ]
                    (List.map
                        (\( name, color ) ->
                            colorBox name color
                        )
                        colors
                    )
                ]

        colorRange : String -> List Color -> List ( String, Color )
        colorRange name colors =
            List.map2
                (\num color ->
                    ( name ++ String.fromInt num, color )
                )
                [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ]
                colors

        alphaRange : String -> List Color -> List ( String, Color )
        alphaRange name colors =
            List.map2
                (\num color ->
                    ( name ++ "Alpha" ++ String.fromInt num, color )
                )
                [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ]
                colors
    in
    div
        [ css
            [ Css.maxWidth (Css.px 1200)
            , Css.margin2 Css.zero Css.auto
            , Css.padding (Css.px 16)
            , Css.fontFamilies [ "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif" ]
            ]
        ]
        [ colorFamily "Base Colors" [ ( "white", white ), ( "black", black ), ( "blue", blue ), ( "red", red ), ( "green", green ), ( "purple", purple ), ( "orange", orange ), ( "cyan", cyan ), ( "yellow", yellow ), ( "rose", rose ), ( "gray", gray ) ]
        , colorFamily "Blues" (colorRange "blue" [ blue100, blue200, blue300, blue400, blue500, blue600, blue700, blue800, blue900 ])
        , colorFamily "Reds" (colorRange "red" [ red100, red200, red300, red400, red500, red600, red700, red800, red900 ])
        , colorFamily "Greens" (colorRange "green" [ green100, green200, green300, green400, green500, green600, green700, green800, green900 ])
        , colorFamily "Purples" (colorRange "purple" [ purple100, purple200, purple300, purple400, purple500, purple600, purple700, purple800, purple900 ])
        , colorFamily "Oranges" (colorRange "orange" [ orange100, orange200, orange300, orange400, orange500, orange600, orange700, orange800, orange900 ])
        , colorFamily "Cyans" (colorRange "cyan" [ cyan100, cyan200, cyan300, cyan400, cyan500, cyan600, cyan700, cyan800, cyan900 ])
        , colorFamily "Golds" (colorRange "yellow" [ yellow100, yellow200, yellow300, yellow400, yellow500, yellow600, yellow700, yellow800, yellow900 ])
        , colorFamily "Roses" (colorRange "rose" [ rose100, rose200, rose300, rose400, rose500, rose600, rose700, rose800, rose900 ])
        , colorFamily "Grays" (colorRange "gray" [ gray100, gray200, gray300, gray400, gray500, gray600, gray700, gray800, gray900 ])
        , colorFamily "White Alpha" (alphaRange "white" [ whiteAlpha100, whiteAlpha200, whiteAlpha300, whiteAlpha400, whiteAlpha500, whiteAlpha600, whiteAlpha700, whiteAlpha800, whiteAlpha900 ])
        , colorFamily "Black Alpha" (alphaRange "black" [ blackAlpha100, blackAlpha200, blackAlpha300, blackAlpha400, blackAlpha500, blackAlpha600, blackAlpha700, blackAlpha800, blackAlpha900 ])
        ]


white : Color
white =
    rgba 0.98 0.96 0.9 1


black : Color
black =
    rgba 0.08 0.08 0.12 1



-- Base colors (500 variants)


blue : Color
blue =
    blue500


red : Color
red =
    red500


green : Color
green =
    green500


purple : Color
purple =
    purple500


orange : Color
orange =
    orange500


cyan : Color
cyan =
    cyan500


yellow : Color
yellow =
    yellow500


rose : Color
rose =
    rose500


gray : Color
gray =
    gray500



-- Blue variants (8-bit console style blues)


blue100 : Color
blue100 =
    rgba 0.75 0.9 1.0 1


blue200 : Color
blue200 =
    rgba 0.6 0.8 1.0 1


blue300 : Color
blue300 =
    rgba 0.45 0.7 1.0 1


blue400 : Color
blue400 =
    rgba 0.3 0.6 1.0 1


blue500 : Color
blue500 =
    rgba 0.15 0.45 0.9 1


blue600 : Color
blue600 =
    rgba 0.1 0.35 0.8 1


blue700 : Color
blue700 =
    rgba 0.05 0.25 0.7 1


blue800 : Color
blue800 =
    rgba 0.02 0.15 0.6 1


blue900 : Color
blue900 =
    rgba 0.0 0.08 0.45 1



-- Red variants (classic console reds)


red100 : Color
red100 =
    rgba 1.0 0.85 0.85 1


red200 : Color
red200 =
    rgba 1.0 0.7 0.7 1


red300 : Color
red300 =
    rgba 1.0 0.55 0.55 1


red400 : Color
red400 =
    rgba 1.0 0.4 0.4 1


red500 : Color
red500 =
    rgba 0.95 0.2 0.2 1


red600 : Color
red600 =
    rgba 0.85 0.15 0.15 1


red700 : Color
red700 =
    rgba 0.75 0.1 0.1 1


red800 : Color
red800 =
    rgba 0.65 0.05 0.05 1


red900 : Color
red900 =
    rgba 0.55 0.0 0.0 1



-- Green variants (Game Boy style greens)


green100 : Color
green100 =
    rgba 0.85 1.0 0.85 1


green200 : Color
green200 =
    rgba 0.7 0.95 0.7 1


green300 : Color
green300 =
    rgba 0.55 0.9 0.55 1


green400 : Color
green400 =
    rgba 0.4 0.85 0.4 1


green500 : Color
green500 =
    rgba 0.25 0.75 0.25 1


green600 : Color
green600 =
    rgba 0.2 0.65 0.2 1


green700 : Color
green700 =
    rgba 0.15 0.55 0.15 1


green800 : Color
green800 =
    rgba 0.1 0.45 0.1 1


green900 : Color
green900 =
    rgba 0.05 0.35 0.05 1



-- Purple variants (8-bit era purples)


purple100 : Color
purple100 =
    rgba 1.0 0.85 1.0 1


purple200 : Color
purple200 =
    rgba 0.95 0.7 1.0 1


purple300 : Color
purple300 =
    rgba 0.9 0.55 1.0 1


purple400 : Color
purple400 =
    rgba 0.85 0.4 1.0 1


purple500 : Color
purple500 =
    rgba 0.8 0.25 0.95 1


purple600 : Color
purple600 =
    rgba 0.7 0.2 0.85 1


purple700 : Color
purple700 =
    rgba 0.6 0.15 0.75 1


purple800 : Color
purple800 =
    rgba 0.5 0.1 0.65 1


purple900 : Color
purple900 =
    rgba 0.4 0.05 0.55 1



-- Orange variants (early console oranges)


orange100 : Color
orange100 =
    rgba 1.0 0.9 0.8 1


orange200 : Color
orange200 =
    rgba 1.0 0.8 0.65 1


orange300 : Color
orange300 =
    rgba 1.0 0.7 0.5 1


orange400 : Color
orange400 =
    rgba 1.0 0.6 0.35 1


orange500 : Color
orange500 =
    rgba 1.0 0.5 0.2 1


orange600 : Color
orange600 =
    rgba 0.9 0.4 0.15 1


orange700 : Color
orange700 =
    rgba 0.8 0.3 0.1 1


orange800 : Color
orange800 =
    rgba 0.7 0.2 0.05 1


orange900 : Color
orange900 =
    rgba 0.6 0.1 0.0 1



-- Cyan variants (8-bit cyan tones)


cyan100 : Color
cyan100 =
    rgba 0.8 1.0 1.0 1


cyan200 : Color
cyan200 =
    rgba 0.65 0.95 1.0 1


cyan300 : Color
cyan300 =
    rgba 0.5 0.9 1.0 1


cyan400 : Color
cyan400 =
    rgba 0.35 0.85 1.0 1


cyan500 : Color
cyan500 =
    rgba 0.2 0.8 0.95 1


cyan600 : Color
cyan600 =
    rgba 0.15 0.7 0.85 1


cyan700 : Color
cyan700 =
    rgba 0.1 0.6 0.75 1


cyan800 : Color
cyan800 =
    rgba 0.05 0.5 0.65 1


cyan900 : Color
cyan900 =
    rgba 0.0 0.4 0.55 1



-- Yellow variants (NES-style golds)


yellow100 : Color
yellow100 =
    rgba 1.0 1.0 0.8 1


yellow200 : Color
yellow200 =
    rgba 1.0 0.95 0.65 1


yellow300 : Color
yellow300 =
    rgba 1.0 0.9 0.5 1


yellow400 : Color
yellow400 =
    rgba 1.0 0.85 0.35 1


yellow500 : Color
yellow500 =
    rgba 1.0 0.8 0.2 1


yellow600 : Color
yellow600 =
    rgba 0.9 0.7 0.15 1


yellow700 : Color
yellow700 =
    rgba 0.8 0.6 0.1 1


yellow800 : Color
yellow800 =
    rgba 0.7 0.5 0.05 1


yellow900 : Color
yellow900 =
    rgba 0.6 0.4 0.0 1



-- Rose variants (8-bit pink tones)


rose100 : Color
rose100 =
    rgba 1.0 0.85 0.9 1


rose200 : Color
rose200 =
    rgba 1.0 0.7 0.8 1


rose300 : Color
rose300 =
    rgba 1.0 0.55 0.7 1


rose400 : Color
rose400 =
    rgba 1.0 0.4 0.6 1


rose500 : Color
rose500 =
    rgba 1.0 0.25 0.5 1


rose600 : Color
rose600 =
    rgba 0.9 0.2 0.4 1


rose700 : Color
rose700 =
    rgba 0.8 0.15 0.3 1


rose800 : Color
rose800 =
    rgba 0.7 0.1 0.2 1


rose900 : Color
rose900 =
    rgba 0.6 0.05 0.1 1



-- Gray variants (classic console grays)


gray100 : Color
gray100 =
    rgba 0.98 0.98 0.98 1


gray200 : Color
gray200 =
    rgba 0.9 0.9 0.9 1


gray300 : Color
gray300 =
    rgba 0.8 0.8 0.8 1


gray400 : Color
gray400 =
    rgba 0.7 0.7 0.7 1


gray500 : Color
gray500 =
    rgba 0.6 0.6 0.6 1


gray600 : Color
gray600 =
    rgba 0.5 0.5 0.5 1


gray700 : Color
gray700 =
    rgba 0.4 0.4 0.4 1


gray800 : Color
gray800 =
    rgba 0.3 0.3 0.3 1


gray900 : Color
gray900 =
    rgba 0.2 0.2 0.2 1



-- White alpha variants


whiteAlpha100 : Color
whiteAlpha100 =
    rgba 0.98 0.96 0.9 0.04


whiteAlpha200 : Color
whiteAlpha200 =
    rgba 0.98 0.96 0.9 0.08


whiteAlpha300 : Color
whiteAlpha300 =
    rgba 0.98 0.96 0.9 0.16


whiteAlpha400 : Color
whiteAlpha400 =
    rgba 0.98 0.96 0.9 0.24


whiteAlpha500 : Color
whiteAlpha500 =
    rgba 0.98 0.96 0.9 0.36


whiteAlpha600 : Color
whiteAlpha600 =
    rgba 0.98 0.96 0.9 0.48


whiteAlpha700 : Color
whiteAlpha700 =
    rgba 0.98 0.96 0.9 0.64


whiteAlpha800 : Color
whiteAlpha800 =
    rgba 0.98 0.96 0.9 0.8


whiteAlpha900 : Color
whiteAlpha900 =
    rgba 0.98 0.96 0.9 0.92



-- Black alpha variants


blackAlpha100 : Color
blackAlpha100 =
    rgba 0.08 0.08 0.12 0.04


blackAlpha200 : Color
blackAlpha200 =
    rgba 0.08 0.08 0.12 0.08


blackAlpha300 : Color
blackAlpha300 =
    rgba 0.08 0.08 0.12 0.16


blackAlpha400 : Color
blackAlpha400 =
    rgba 0.08 0.08 0.12 0.24


blackAlpha500 : Color
blackAlpha500 =
    rgba 0.08 0.08 0.12 0.36


blackAlpha600 : Color
blackAlpha600 =
    rgba 0.08 0.08 0.12 0.48


blackAlpha700 : Color
blackAlpha700 =
    rgba 0.08 0.08 0.12 0.64


blackAlpha800 : Color
blackAlpha800 =
    rgba 0.08 0.08 0.12 0.8


blackAlpha900 : Color
blackAlpha900 =
    rgba 0.08 0.08 0.12 0.92
