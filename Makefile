BIN = node_modules/.bin

setup:
	npm install

test: test/bundle.js

example: example/bundle.js

test/bundle.js: test/mediaEmbed-test.js
	$(BIN)/watchify -p proxyquireify/plugin $^ -o $@

example/bundle.js: example/example.js
	$(BIN)/browserify $^ -o $@

clean:
	rm -rf node_modules
	rm **/bundle.js

.PHONY: test clean
