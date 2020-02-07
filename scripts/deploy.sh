#!/bin/bash

echo "Deploying command palette..."

if [ "$CI_BRANCH" != "master" ];
then
  echo "Exit: branch is not git master"
  exit
else
  npm version preminor
  git push --tags
  npm publish --dry-run
fi