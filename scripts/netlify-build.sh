#!/bin/sh

echo "Building for Netlify."
npm install
ls -al node_modules/
./node_modules/@storybook/react/bin/build.js -c .storybook -o docs