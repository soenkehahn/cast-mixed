test: run-tests
	./run-tests

run-tests: run-tests.hs
	./run-tests.hs --no-build
	stack exec --resolver lts-8.9 -- ghc -outputdir build run-tests.hs
