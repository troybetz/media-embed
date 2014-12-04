BIN = node_modules/.bin

setup:
	npm install
	mkdir example/build

test: test/bundle.js


example: example/build/bundle.js example/build/bundle.css

example/build/bundle.js: example/example.js
	$(BIN)/browserify $^ -o $@

example/build/bundle.css: example/example.css
	$(BIN)/autoprefixer $^ -o $@

test/bundle.js: test/mediaEmbed-test.js
	$(BIN)/watchify -p proxyquireify/plugin $^ -o $@

example/bundle.js: example/example.js
	$(BIN)/browserify $^ -o $@

clean:
	rm -rf node_modules
	rm **/bundle.js

.PHONY: setup test example clean gh-pages
