#!/bin/sh

echo "Building for Netlify."
npm install
ls -al
./node_modules/.bin/build-storybook -c .storybook -o docs