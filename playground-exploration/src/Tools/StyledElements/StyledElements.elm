module Tools.StyledElements.StyledElements exposing (..)

import Html exposing (Html, a, div, input, label)
import Html.Attributes as HA exposing (class, href, target, value)
import Html.Events exposing (onClick)
import Markdown
import Playground.Icons as Icons


withHomePageHeader : Html msg -> Html msg
withHomePageHeader content =
    div
        [ class "absolute w-full h-full z-10"
        , class "bg-[#303030]"
        , class "overflow-y-auto"
        ]
        [ div
            [ class "mx-auto container max-w-5xl px-4 sm:px-12"
            , class "flex flex-col gap-0"
            ]
            [ div
                [ class "w-full sm:mt-4 sm:mb-24 mt-0 mb-12"
                , class "flex justify-end items-center"
                , class "border-b border-gray-200 border-opacity-50"
                ]
                [ a
                    [ class "p-4 w-20 h-20"
                    , class "text-white/40 hover:text-white/80"
                    , href "../index.html"
                    , HA.title "Home"
                    ]
                    [ Icons.icons.home ]
                , a
                    [ class "p-4 w-20 h-20"
                    , class "text-white/40 hover:text-white/80"
                    , href "https://twitter.com/AzizErkalSelman"
                    , target "_blank"
                    , HA.title "Twitter"
                    ]
                    [ Icons.icons.twitter ]
                , a
                    [ class "p-4 w-20 h-20"
                    , class "text-white/40 hover:text-white/80"
                    , href "https://github.com/erkal"
                    , target "_blank"
                    , HA.title "GitHub"
                    ]
                    [ Icons.icons.githubCat ]
                ]
            , content
            ]
        ]


markdownBlock : String -> Html msg
markdownBlock =
    Markdown.toHtmlWith
        { githubFlavored = Just { tables = True, breaks = True }
        , defaultHighlighting = Nothing
        , sanitize = True
        , smartypants = True
        }
        [ class "prose prose-gruvbox lg:prose-xl max-w-none"
        , class "select-text"
        ]


iconButton : msg -> String -> Html msg -> Html msg
iconButton msg title icon =
    div
        [ HA.title title
        , class "w-12 h-12 p-2"
        , class "rounded-full shadow-lg"
        , class "cursor-pointer"
        , class "bg-white/60 text-black"
        , class "hover:bg-black/60 hover:text-white active:bg-black active:text-white/60"
        , class "transition-all"
        , onClick msg
        ]
        [ icon ]


textInput : (String -> msg) -> String -> String -> Html msg
textInput msg label_ value_ =
    div [ class "flex flex-col gap-2" ]
        [ label []
            [ markdownBlock label_ ]
        , div []
            [ input
                [ class "p-2 w-full text-gray-900 bg-white/60 font-mono font-bold"
                , class "focus:outline-none focus:ring focus:ring-2 focus:ring-black"
                , Html.Events.onInput msg
                , value value_
                ]
                []
            , div [ class "w-full h-1 bg-black" ] []
            ]
        ]
