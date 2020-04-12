#!/bin/bash

# Colors
error='\033[0;31m'
warning='\033[0;33m'
success='\033[0;32m'
end='\033[0m'

if brew ls --versions jq > /dev/null; then
    NAME="acf-tools"
    VERSION=$(jq -r .version src/manifest.json)

    mkdir -p dist
    rm dist/*.zip

    # for Chrome
    zip -r "dist/${NAME}-v${VERSION}-chrome.zip" src -x "*.DS_Store"

    # for Firefox
    cd src
    zip -r "../dist/${NAME}-v${VERSION}-firefox.zip" * -x "*.DS_Store"

    echo ""
    echo "${success}✅ Finished build!${end}"
else
    echo ""
    echo "${error}❌ package jq not found.${end}"
    echo "${warning}Try running: brew install jq${end}"
fi

