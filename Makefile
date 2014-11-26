BIN = node_modules/.bin

setup:
	npm install

test: test/bundle.js

example: example/bundle.js

gh-pages: example/bundle.js
	git checkout gh-pages
	git merge master
	git push origin gh-pages
	git checkout master

test/bundle.js: test/mediaEmbed-test.js
	$(BIN)/watchify -p proxyquireify/plugin $^ -o $@

example/bundle.js: example/example.js
	$(BIN)/browserify $^ -o $@

clean:
	rm -rf node_modules
	rm **/bundle.js

.PHONY: setup test example clean gh-pages
