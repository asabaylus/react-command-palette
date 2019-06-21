if [ "$CI_BRANCH" != "master" ];
then
  npm run chromatic
else
  # We know any changes that make it to master *must* have been approved
  npm run chromatic:ci
fi