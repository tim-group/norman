#!/bin/bash
HASH=`git rev-parse --short HEAD`
if [ "z$TRAVIS_BUILD_NUMBER" == "z" ];
then
    iteration="0.pre.${HASH}"
else
    iteration=$TRAVIS_BUILD_NUMBER
fi
wd=`pwd`
zipfile="norman-0.0.${iteration}.zip"
fn="${wd}/${zipfile}"

mkdir /tmp/norman-build || exit 1
mkdir -p /tmp/norman-build/_site || exit 1
cp -r app/* /tmp/norman-build/_site/
wd=`pwd`
pushd /tmp/norman-build >/dev/null 2>&1
zip -r ${fn} * >/dev/null 2>&1 || exit 1
popd >/dev/null 2>&1
rm -rf /tmp/norman-build || exit 1
echo $zipfile

