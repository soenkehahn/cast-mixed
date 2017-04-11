#!/usr/bin/env stack
{- stack --install-ghc --resolver lts-8.9 runghc
  --package shake
-}

import Development.Shake
import Development.Shake.FilePath

main :: IO ()
main = shakeArgs shakeOptions $ do
  want ["run the tests"]

  phony "run the tests" $ do
    unit $ cmd "flow"
    jsSources <- getDirectoryFiles "." ["src//*.js", "tests//*.js"]
    let jsCompiled = map ("build" </>) jsSources
    need jsCompiled
    unit $ cmd "mocha" jsCompiled "--color"

  "build//*.js" %> \out -> do
    let sourceFile = dropDirectory1 out
    need [sourceFile]
    unit $ cmd "babel --plugins transform-es2015-modules-commonjs --out-dir build"
      sourceFile
