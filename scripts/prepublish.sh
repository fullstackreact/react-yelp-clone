#!/bin/bash

echo "=> Compiling..."
echo ""
rm -rf ./dist
NODE_ENV=production ./node_modules/.bin/webpack
echo ""
echo "=> Complete"
