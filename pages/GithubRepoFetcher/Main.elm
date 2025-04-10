module GithubRepoFetcher.Main exposing (main)

import Browser
import GithubRepoFetcher


main : Program () GithubRepoFetcher.Model GithubRepoFetcher.Msg
main =
    Browser.element
        { init = \_ -> ( GithubRepoFetcher.initialModel, Cmd.none )
        , update =
            \msg model ->
                GithubRepoFetcher.update msg model
                    |> (\( newModel, _, cmd ) -> ( newModel, cmd ))
        , subscriptions = \_ -> Sub.none
        , view = GithubRepoFetcher.view
        }
