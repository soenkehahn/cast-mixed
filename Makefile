export PATH := ./node_modules/.bin:$(PATH)

dist: setup.phony test.phony dist/cast-mixed.js

test.phony: flow.phony build/tests/cast-mixed_test.js build/src/cast-mixed.js
	mocha build/tests/cast-mixed_test.js --color

build/%.js: %.js
	babel --out-dir build $<

flow.phony:
	flow

setup.phony:
	yarn install

dist/%.js: src/%.js
	babel --no-babelrc --out-dir dist $< \
		--plugins transform-flow-comments
	mv dist/src/$*.js dist
	rmdir dist/src

clean:
	rm -rf build dist
