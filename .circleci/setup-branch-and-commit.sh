#!/bin/bash
git checkout $1 2>/dev/null || git checkout -b $1

### start of getting version
VERSION="$(jq -r '.version' ./package.json)"
if [ "$VERSION" == "0.0.0" ]
then
  VERSION="dev"
else
  VERSION="v$VERSION"
fi
echo "add deploy for $VERSION"
### end of getting version

git config --global user.email "data@first-mile.co.kr"
git config --global user.name "FirstMile Data"

cp .gitignore .gitignore_original