BIN = node_modules/.bin

setup:
	npm install

test/bundle.js: test/mediaEmbed-test.js
	$(BIN)/watchify -p proxyquireify/plugin $^ -o $@

example/bundle.js: example/example.js
	$(BIN)/browserify $^ > $@

test: test/bundle.js

clean:
	rm -rf node_modules
	rm test/bundle.js

.PHONY: test clean
