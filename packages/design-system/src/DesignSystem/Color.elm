module DesignSystem.Color exposing
    ( Color
    , black, white, transparent
    , blue, blue100, blue200, blue300, blue400, blue500, blue600, blue700, blue800, blue900
    , green, green100, green200, green300, green400, green500, green600, green700, green800, green900
    , yellow, yellow100, yellow200, yellow300, yellow400, yellow500, yellow600, yellow700, yellow800, yellow900
    , orange, orange100, orange200, orange300, orange400, orange500, orange600, orange700, orange800, orange900
    , red, red100, red200, red300, red400, red500, red600, red700, red800, red900
    , purple, purple100, purple200, purple300, purple400, purple500, purple600, purple700, purple800, purple900
    , rose, rose100, rose200, rose300, rose400, rose500, rose600, rose700, rose800, rose900
    , cyan, cyan100, cyan200, cyan300, cyan400, cyan500, cyan600, cyan700, cyan800, cyan900
    , gray, gray100, gray200, gray300, gray400, gray500, gray600, gray700, gray800, gray900
    , whiteAlpha100, whiteAlpha200, whiteAlpha300, whiteAlpha400, whiteAlpha500, whiteAlpha600, whiteAlpha700, whiteAlpha800, whiteAlpha900
    , blackAlpha100, blackAlpha200, blackAlpha300, blackAlpha400, blackAlpha500, blackAlpha600, blackAlpha700, blackAlpha800, blackAlpha900
    , setOpacity, toCssColor
    , viewColorPalette
    )

{-| A retro-futuristic color system with harmonized brightness levels.


# Types

@docs Color


# Base Colors

@docs black, white, transparent


# Color Scales

Each color comes in 9 harmonized shades (100-900).
Shades are balanced across different hues, meaning blue500 and green500 have similar brightness.

@docs blue, blue100, blue200, blue300, blue400, blue500, blue600, blue700, blue800, blue900
@docs green, green100, green200, green300, green400, green500, green600, green700, green800, green900
@docs yellow, yellow100, yellow200, yellow300, yellow400, yellow500, yellow600, yellow700, yellow800, yellow900
@docs orange, orange100, orange200, orange300, orange400, orange500, orange600, orange700, orange800, orange900
@docs red, red100, red200, red300, red400, red500, red600, red700, red800, red900
@docs purple, purple100, purple200, purple300, purple400, purple500, purple600, purple700, purple800, purple900
@docs rose, rose100, rose200, rose300, rose400, rose500, rose600, rose700, rose800, rose900
@docs cyan, cyan100, cyan200, cyan300, cyan400, cyan500, cyan600, cyan700, cyan800, cyan900
@docs gray, gray100, gray200, gray300, gray400, gray500, gray600, gray700, gray800, gray900


# Alpha Variants

Colors with varying transparency levels, useful for overlays and subtle effects.

@docs whiteAlpha100, whiteAlpha200, whiteAlpha300, whiteAlpha400, whiteAlpha500, whiteAlpha600, whiteAlpha700, whiteAlpha800, whiteAlpha900
@docs blackAlpha100, blackAlpha200, blackAlpha300, blackAlpha400, blackAlpha500, blackAlpha600, blackAlpha700, blackAlpha800, blackAlpha900


# Helpers

@docs setOpacity, toCssColor


# Debug

@docs viewColorPalette


# Usage Guidelines

  - 100-300: Backgrounds, hover states
  - 400-500: Primary UI elements
  - 600-900: Text, borders, emphasis

Common semantic uses:

  - blue: Primary actions, links
  - green: Success states
  - yellow: Important notifications
  - orange: High-energy elements
  - red: Error states, warnings
  - purple: Special features
  - rose: Highlights, badges
  - cyan: Information, help
  - gray: Text, borders, backgrounds

-}

import Color exposing (Color, rgba)
import Css exposing (column, displayFlex, flexDirection, height, int, property, px)
import Html.Styled exposing (Html, div, text)
import Html.Styled.Attributes exposing (css)


{-| So that the user oif this package doesn't need to import the `Color` package
-}
type alias Color =
    Color.Color


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
        (Basics.round (c.red * 255))
        (Basics.round (c.green * 255))
        (Basics.round (c.blue * 255))
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
            , displayFlex
            , flexDirection column
            , property "gap" "32px"
            ]
        ]
        [ colorFamily "Base Colors"
            [ ( "white", white )
            , ( "black", black )
            , ( "gray", gray )
            , ( "yellow", yellow )
            , ( "green", green )
            , ( "purple", purple )
            , ( "red", red )
            , ( "rose", rose )
            , ( "blue", blue )
            , ( "cyan", cyan )
            ]
        , div [ css [ displayFlex, flexDirection column, property "gap" "2px" ] ]
            [ colorFamily "Gray" (colorRange "gray" [ gray100, gray200, gray300, gray400, gray500, gray600, gray700, gray800, gray900 ])
            , colorFamily "Yellow" (colorRange "yellow" [ yellow100, yellow200, yellow300, yellow400, yellow500, yellow600, yellow700, yellow800, yellow900 ])
            , colorFamily "Green" (colorRange "green" [ green100, green200, green300, green400, green500, green600, green700, green800, green900 ])
            , colorFamily "Purple" (colorRange "purple" [ purple100, purple200, purple300, purple400, purple500, purple600, purple700, purple800, purple900 ])
            , colorFamily "Orange" (colorRange "orange" [ orange100, orange200, orange300, orange400, orange500, orange600, orange700, orange800, orange900 ])
            , colorFamily "Red" (colorRange "red" [ red100, red200, red300, red400, red500, red600, red700, red800, red900 ])
            , colorFamily "Rose" (colorRange "rose" [ rose100, rose200, rose300, rose400, rose500, rose600, rose700, rose800, rose900 ])
            , colorFamily "Blue" (colorRange "blue" [ blue100, blue200, blue300, blue400, blue500, blue600, blue700, blue800, blue900 ])
            , colorFamily "Cyan" (colorRange "cyan" [ cyan100, cyan200, cyan300, cyan400, cyan500, cyan600, cyan700, cyan800, cyan900 ])
            ]
        , div [ css [ displayFlex, flexDirection column, property "gap" "2px" ] ]
            [ colorFamily "White Alpha" (alphaRange "white" [ whiteAlpha100, whiteAlpha200, whiteAlpha300, whiteAlpha400, whiteAlpha500, whiteAlpha600, whiteAlpha700, whiteAlpha800, whiteAlpha900 ])
            , colorFamily "Black Alpha" (alphaRange "black" [ blackAlpha100, blackAlpha200, blackAlpha300, blackAlpha400, blackAlpha500, blackAlpha600, blackAlpha700, blackAlpha800, blackAlpha900 ])
            ]
        ]


white : Color
white =
    rgba 1 1 1 1


black : Color
black =
    rgba 0 0 0 1


transparent : Color
transparent =
    rgba 0 0 0 0



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


orange : Color
orange =
    orange500


purple : Color
purple =
    purple500


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



-- Blue variants (unchanged)


blue100 : Color
blue100 =
    rgba 0.63 0.84 0.95 1


blue200 : Color
blue200 =
    rgba 0.43 0.74 0.9 1


blue300 : Color
blue300 =
    rgba 0.33 0.64 0.85 1


blue400 : Color
blue400 =
    rgba 0.23 0.54 0.8 1


blue500 : Color
blue500 =
    rgba 0.03 0.44 0.75 1


blue600 : Color
blue600 =
    rgba 0.03 0.39 0.65 1


blue700 : Color
blue700 =
    rgba 0.03 0.34 0.55 1


blue800 : Color
blue800 =
    rgba 0.03 0.29 0.45 1


blue900 : Color
blue900 =
    rgba 0.03 0.24 0.35 1



-- Green variants (unchanged)


green100 : Color
green100 =
    rgba 0.4 0.94 0.86 1


green200 : Color
green200 =
    rgba 0.3 0.87 0.78 1


green300 : Color
green300 =
    rgba 0.2 0.8 0.7 1


green400 : Color
green400 =
    rgba 0.1 0.73 0.62 1


green500 : Color
green500 =
    rgba 0 0.66 0.54 1



-- This is #00A88A


green600 : Color
green600 =
    rgba 0 0.59 0.46 1


green700 : Color
green700 =
    rgba 0 0.52 0.38 1


green800 : Color
green800 =
    rgba 0 0.45 0.3 1


green900 : Color
green900 =
    rgba 0 0.38 0.22 1



-- Yellow variants (keeping your original yellow)


yellow100 : Color
yellow100 =
    rgba 1.0 0.95 0.4 1


yellow200 : Color
yellow200 =
    rgba 1.0 0.9 0.3 1


yellow300 : Color
yellow300 =
    rgba 1.0 0.85 0.15 1


yellow400 : Color
yellow400 =
    rgba 1.0 0.79 0 1



-- This is #FFC900


yellow500 : Color
yellow500 =
    rgba 0.9 0.71 0 1


yellow600 : Color
yellow600 =
    rgba 0.8 0.63 0 1


yellow700 : Color
yellow700 =
    rgba 0.7 0.55 0 1


yellow800 : Color
yellow800 =
    rgba 0.6 0.47 0 1


yellow900 : Color
yellow900 =
    rgba 0.5 0.39 0 1



-- New Orange variants


orange100 : Color
orange100 =
    rgba 1.0 0.82 0.77 1


orange200 : Color
orange200 =
    rgba 1.0 0.72 0.65 1


orange300 : Color
orange300 =
    rgba 1.0 0.62 0.53 1


orange400 : Color
orange400 =
    rgba 1.0 0.52 0.43 1


orange500 : Color
orange500 =
    rgba 1.0 0.42 0.33 1


orange600 : Color
orange600 =
    rgba 0.9 0.37 0.28 1


orange700 : Color
orange700 =
    rgba 0.8 0.32 0.23 1


orange800 : Color
orange800 =
    rgba 0.7 0.27 0.18 1


orange900 : Color
orange900 =
    rgba 0.6 0.22 0.13 1



-- Red variants (unchanged)


red100 : Color
red100 =
    rgba 1.0 0.6 0.7 1


red200 : Color
red200 =
    rgba 1.0 0.45 0.6 1


red300 : Color
red300 =
    rgba 1.0 0.3 0.5 1


red400 : Color
red400 =
    rgba 1.0 0.15 0.4 1


red500 : Color
red500 =
    rgba 1.0 0 0.3 1


red600 : Color
red600 =
    rgba 0.9 0 0.27 1


red700 : Color
red700 =
    rgba 0.8 0 0.24 1


red800 : Color
red800 =
    rgba 0.7 0 0.21 1


red900 : Color
red900 =
    rgba 0.6 0 0.18 1



-- Purple variants


purple100 : Color
purple100 =
    rgba 0.85 0.6 1.0 1


purple200 : Color
purple200 =
    rgba 0.75 0.5 0.95 1


purple300 : Color
purple300 =
    rgba 0.65 0.4 0.9 1


purple400 : Color
purple400 =
    rgba 0.55 0.3 0.85 1


purple500 : Color
purple500 =
    rgba 0.45 0.2 0.8 1


purple600 : Color
purple600 =
    rgba 0.35 0.15 0.7 1


purple700 : Color
purple700 =
    rgba 0.25 0.1 0.6 1


purple800 : Color
purple800 =
    rgba 0.15 0.05 0.5 1


purple900 : Color
purple900 =
    rgba 0.1 0 0.4 1



-- Rose variants


rose100 : Color
rose100 =
    rgba 1.0 0.75 0.85 1


rose200 : Color
rose200 =
    rgba 0.95 0.65 0.75 1


rose300 : Color
rose300 =
    rgba 0.9 0.55 0.65 1


rose400 : Color
rose400 =
    rgba 0.85 0.45 0.55 1


rose500 : Color
rose500 =
    rgba 0.8 0.35 0.45 1


rose600 : Color
rose600 =
    rgba 0.7 0.25 0.35 1


rose700 : Color
rose700 =
    rgba 0.6 0.15 0.25 1


rose800 : Color
rose800 =
    rgba 0.5 0.1 0.15 1


rose900 : Color
rose900 =
    rgba 0.4 0.05 0.1 1



-- Cyan variants (unchanged)


cyan100 : Color
cyan100 =
    rgba 0.52 0.93 0.89 1


cyan200 : Color
cyan200 =
    rgba 0.42 0.88 0.84 1


cyan300 : Color
cyan300 =
    rgba 0.32 0.83 0.79 1


cyan400 : Color
cyan400 =
    rgba 0.22 0.78 0.74 1


cyan500 : Color
cyan500 =
    rgba 0.12 0.73 0.69 1


cyan600 : Color
cyan600 =
    rgba 0.11 0.63 0.59 1


cyan700 : Color
cyan700 =
    rgba 0.1 0.53 0.49 1


cyan800 : Color
cyan800 =
    rgba 0.09 0.43 0.39 1


cyan900 : Color
cyan900 =
    rgba 0.08 0.33 0.29 1



-- Gray variants


gray100 : Color
gray100 =
    rgba 0.96 0.96 0.96 1


gray200 : Color
gray200 =
    rgba 0.89 0.89 0.89 1


gray300 : Color
gray300 =
    rgba 0.82 0.82 0.82 1


gray400 : Color
gray400 =
    rgba 0.65 0.65 0.65 1


gray500 : Color
gray500 =
    rgba 0.47 0.5 0.52 1


gray600 : Color
gray600 =
    rgba 0.4 0.42 0.44 1


gray700 : Color
gray700 =
    rgba 0.33 0.35 0.37 1


gray800 : Color
gray800 =
    rgba 0.26 0.28 0.3 1


gray900 : Color
gray900 =
    rgba 0.19 0.21 0.23 1
