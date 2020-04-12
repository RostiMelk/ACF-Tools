#!/bin/bash

NAME="acf-tools"
VERSION=$(jq -r .version src/manifest.json)

mkdir -p dist
rm dist/*.zip

# for Chrome
zip -r "dist/${NAME}-${VERSION}-chrome.zip" src -x "*.DS_Store"

# for Firefox
cd src
zip -r "../dist/${NAME}-${VERSION}-firefox.zip" * -x "*.DS_Store"

echo 'Finished build!'