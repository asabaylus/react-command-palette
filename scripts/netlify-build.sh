#!/bin/sh

echo "Building for Netlify."

pushd docs
npm install
popd
npm run docs