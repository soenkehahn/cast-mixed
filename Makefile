export PATH := ./node_modules/.bin:$(PATH)

dist: setup.phony test.phony dist/cast-mixed.js dist/cast-mixed.js.flow

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
		--plugins transform-flow-strip-types,transform-es2015-modules-amd
	mv dist/src/$*.js dist
	rmdir dist/src

dist/%.js.flow: src/%.js
	cp src/$*.js dist/$*.js.flow

clean:
	rm -rf build dist
