module Compiler.Compile exposing (..)

import Compiler.AST.Canonical as Can
import Compiler.AST.Optimized as Opt
import Compiler.AST.Source as Src
import Compiler.Canonicalize.Module as Canonicalize
import Compiler.Data.Name as Name
import Compiler.Elm.Interface as I
import Compiler.Elm.ModuleName as ModuleName
import Compiler.Elm.Package as Pkg
import Compiler.Nitpick.PatternMatches as PatternMatches
import Compiler.Optimize.Module as Optimize
import Compiler.Reporting.Error as E
import Compiler.Reporting.Render.Type.Localizer as Localizer
import Compiler.Reporting.Result as R
import Compiler.Type.Constrain.Module as Type
import Compiler.Type.Solve as Solve
import Extra.System.IO.Pure as IO
import Extra.Type.Either as Either exposing (Either(..))
import Extra.Type.Map as Map


type Artifacts
    = Artifacts
        --{ modul : Can.Module
        --, types : Map.Map Name.Name Can.Annotation
        --, graph : Opt.LocalGraph
        --}
        Can.Module
        (Map.Map Name.Name Can.Annotation)
        Opt.LocalGraph


compile : Pkg.Name -> Map.Map ModuleName.Raw I.Interface -> Src.Module -> Either E.Error Artifacts
compile pkg ifaces modul =
    Either.bind (canonicalize pkg ifaces modul) <|
        \canonical ->
            Either.bind (typeCheck modul canonical) <|
                \annotations ->
                    Either.bind (nitpick canonical) <|
                        \() ->
                            Either.bind (optimize modul annotations canonical) <|
                                \objects ->
                                    Right (Artifacts canonical annotations objects)


{-| The alternative to `Either E.Error Artifacts` which is the return type of Compiler.Compile.compile
-}
type ModuleCompilationDataForElmViz
    = FailedAtCanonicalize E.Error
    | FailedAtTypeCheck    E.Error Can.Module
    | FailedAtNitpick      E.Error Can.Module (Map.Map Name.Name Can.Annotation)
    | FailedAtOptimize     E.Error Can.Module (Map.Map Name.Name Can.Annotation)
    | Success                      Can.Module (Map.Map Name.Name Can.Annotation) Opt.LocalGraph


{-|

    This is the alternative to Compiler.Compile.compile
    The difference is that it returns the intermediate results even if it errors.
    This feature we need for our purposes.

-}
compile_ForElmViz : Pkg.Name -> Map.Map ModuleName.Raw I.Interface -> Src.Module -> ModuleCompilationDataForElmViz
compile_ForElmViz pkg ifaces modul =
    case canonicalize pkg ifaces modul of
        Left err ->
            FailedAtCanonicalize err

        Right canonical ->
            case typeCheck modul canonical of
                Left err ->
                    FailedAtTypeCheck err canonical

                Right annotations ->
                    case nitpick canonical of
                        Left err ->
                            FailedAtNitpick err canonical annotations

                        Right _ ->
                            case optimize modul annotations canonical of
                                Left err ->
                                    FailedAtOptimize err canonical annotations

                                Right objects ->
                                    Success canonical annotations objects


-- PHASES


canonicalize : Pkg.Name -> Map.Map ModuleName.Raw I.Interface -> Src.Module -> Either E.Error Can.Module
canonicalize pkg ifaces modul =
    case Tuple.second <| R.run <| Canonicalize.canonicalize pkg ifaces modul of
        Right canonical ->
            Right canonical
                |> Debug.log "hehey!"

        Left errors ->
            Left <| E.BadNames errors


typeCheck : Src.Module -> Can.Module -> Either E.Error (Map.Map Name.Name Can.Annotation)
typeCheck modul canonical =
    case IO.performIO (IO.andThen Solve.run <| Type.constrain canonical) Solve.init of
        Right annotations ->
            Right annotations

        Left errors ->
            Left (E.BadTypes (Localizer.fromModule modul) errors)


nitpick : Can.Module -> Either E.Error ()
nitpick canonical =
    case PatternMatches.check canonical of
        Right () ->
            Right ()

        Left errors ->
            Left (E.BadPatterns errors)


optimize : Src.Module -> Map.Map Name.Name Can.Annotation -> Can.Module -> Either E.Error Opt.LocalGraph
optimize modul annotations canonical =
    case Tuple.second <| R.run <| Optimize.optimize annotations canonical of
        Right localGraph ->
            Right localGraph

        Left errors ->
            Left (E.BadMains (Localizer.fromModule modul) errors)
