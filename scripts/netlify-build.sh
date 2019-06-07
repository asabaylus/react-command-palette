#!/bin/sh

echo "Building for Netlify."
npm install
./node_modules/.bin/build-storybook -c .storybook -o docs